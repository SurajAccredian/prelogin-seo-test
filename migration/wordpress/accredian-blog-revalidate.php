<?php
/**
 * Plugin Name: Accredian Blog Revalidate
 * Description: Tells accredian.com to refresh its cached /blog pages whenever blog content changes.
 *
 * Install: save as wp-content/mu-plugins/accredian-blog-revalidate.php (a "must-use" plugin: no activation).
 *
 * Then add these two lines to wp-config.php (above "That's all, stop editing!"):
 *
 *   define('ACCREDIAN_REVALIDATE_URL',    'https://accredian.com/api/revalidate');
 *   define('ACCREDIAN_REVALIDATE_SECRET', '<exactly the value of BLOG_REVALIDATE_SECRET on the Next.js side>');
 *
 * The call it makes:  POST https://accredian.com/api/revalidate
 *                     Content-Type: application/json
 *                     x-revalidate-secret: <secret>
 *                     {"tag":"blog"}
 * Next.js answers 200 {"status":"success","revalidated":true,"tag":"blog"}, 401 for a wrong/missing secret,
 * or 503 if BLOG_REVALIDATE_SECRET is not set there.
 */
if (!defined('ABSPATH')) {
    exit;
}

const ACCREDIAN_REVALIDATE_EVENT = 'accredian_blog_revalidate_now';
const ACCREDIAN_REVALIDATE_DELAY = 30;     // seconds: many saves in a row become ONE call
const ACCREDIAN_REVALIDATE_RETRY = 300;    // seconds before a failed call is retried
const ACCREDIAN_REVALIDATE_MAX_ATTEMPTS = 3;

function accredian_blog_schedule_revalidate() {
    if (!defined('ACCREDIAN_REVALIDATE_URL') || !defined('ACCREDIAN_REVALIDATE_SECRET')) {
        return;
    }
    // Debounce: if a call is already queued, the pending one will pick up this change too.
    if (!wp_next_scheduled(ACCREDIAN_REVALIDATE_EVENT)) {
        wp_schedule_single_event(time() + ACCREDIAN_REVALIDATE_DELAY, ACCREDIAN_REVALIDATE_EVENT);
    }
}

// Posts: publishing, editing a published post, unpublishing, trashing (anything that touches a live post).
add_action('transition_post_status', function ($new_status, $old_status, $post) {
    if ($post->post_type === 'post' && ($new_status === 'publish' || $old_status === 'publish')) {
        accredian_blog_schedule_revalidate();
    }
}, 10, 3);
add_action('deleted_post', function ($post_id) {
    if (get_post_type($post_id) === 'post') {
        accredian_blog_schedule_revalidate();
    }
});

// Categories (they drive /blog/category, /blog/spotlight and the navigation) and authors (names, bios).
foreach (['created_category', 'edited_category', 'delete_category', 'profile_update', 'deleted_user'] as $hook) {
    add_action($hook, 'accredian_blog_schedule_revalidate');
}

// The actual call, run by WP-Cron.
add_action(ACCREDIAN_REVALIDATE_EVENT, function () {
    $response = wp_remote_post(ACCREDIAN_REVALIDATE_URL, [
        'timeout' => 10,
        'headers' => [
            'Content-Type'        => 'application/json',
            'x-revalidate-secret' => ACCREDIAN_REVALIDATE_SECRET,
        ],
        'body'    => wp_json_encode(['tag' => 'blog']),
    ]);

    $ok = !is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200;
    $attempts = (int) get_transient('accredian_revalidate_attempts');

    if ($ok) {
        delete_transient('accredian_revalidate_attempts');
        return;
    }

    $reason = is_wp_error($response) ? $response->get_error_message() : 'HTTP ' . wp_remote_retrieve_response_code($response);
    error_log('[accredian-blog-revalidate] call failed (' . $reason . '), attempt ' . ($attempts + 1));

    if ($attempts + 1 < ACCREDIAN_REVALIDATE_MAX_ATTEMPTS) {
        set_transient('accredian_revalidate_attempts', $attempts + 1, HOUR_IN_SECONDS);
        wp_schedule_single_event(time() + ACCREDIAN_REVALIDATE_RETRY, ACCREDIAN_REVALIDATE_EVENT);
    } else {
        delete_transient('accredian_revalidate_attempts');   // give up; listings refresh within the 1 h cache TTL anyway
    }
});
