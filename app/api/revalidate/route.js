import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { BLOG_TAG, handleBlogRevalidation } from "../../lib/blog/revalidate";

// Regex for valid program status tag format: program-status-<numeric-pid>
const VALID_TAG_REGEX = /^program-status-\d+$/;

/**
 * Authenticates the revalidation request against server-side secret environment variables.
 *
 * @param {Request} request
 * @param {string|null} [querySecret]
 * @param {string|null} [bodySecret]
 * @returns {{ authenticated: boolean, error?: string }}
 */
function authenticateRevalidationRequest(request, querySecret = null, bodySecret = null) {
  const configuredSecret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET

  // If a secret is configured in the environment, enforce authentication
  if (configuredSecret && configuredSecret.trim() !== "") {
    const authHeader = request.headers.get("authorization");
    let bearerToken = null;
    if (authHeader) {
      const parts = authHeader.split(" ");
      bearerToken = parts.length === 2 && parts[0].toLowerCase() === "bearer" ? parts[1] : authHeader;
    }

    const headerSecret =
      request.headers.get("x-revalidate-secret") ||
      request.headers.get("x-revalidate-token") ||
      bearerToken;

    const providedSecret = headerSecret || querySecret || bodySecret;

    if (!providedSecret || providedSecret.trim() !== configuredSecret.trim()) {
      return {
        authenticated: false,
        error: "Unauthorized: Invalid or missing revalidation secret.",
      };
    }
  }

  return { authenticated: true };
}

/**
 * Validates that the requested cache tag conforms to the required PID format.
 *
 * @param {string|null} tag
 * @returns {{ valid: boolean, cleanTag?: string, error?: string }}
 */
function validateCacheTag(tag) {
  if (!tag || typeof tag !== "string" || tag.trim() === "") {
    return {
      valid: false,
      error: "Missing 'tag' parameter. Example: /api/revalidate?tag=program-status-171",
    };
  }

  const cleanTag = tag.trim();
  if (!VALID_TAG_REGEX.test(cleanTag)) {
    return {
      valid: false,
      error: `Invalid tag format '${cleanTag}'. Only 'program-status-<numeric-pid>' is permitted.`,
    };
  }

  return { valid: true, cleanTag };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");
    const querySecret = searchParams.get("secret") || searchParams.get("token");

    console.log(`[NextRevalidate] Incoming GET revalidation request for tag: "${tag || "N/A"}"`);

    // 1. Authenticate Request
    const auth = authenticateRevalidationRequest(request, querySecret);
    if (!auth.authenticated) {
      console.warn(`[NextRevalidate] Unauthorized revalidation request rejected.`);
      return NextResponse.json(
        { status: "error", message: auth.error },
        { status: 401 }
      );
    }

    // 2. Validate Tag Format
    const tagValidation = validateCacheTag(tag);
    if (!tagValidation.valid) {
      console.warn(`[NextRevalidate] Validation Error: ${tagValidation.error}`);
      return NextResponse.json(
        { status: "error", message: tagValidation.error },
        { status: 400 }
      );
    }

    const { cleanTag } = tagValidation;

    // 3. Invalidate exact PID tag
    console.log(`[NextRevalidate] Invalidating cache tag: "${cleanTag}"`);
    revalidateTag(cleanTag, { expire: 0 });
    console.log(`[NextRevalidate] Successfully invalidated cache tag: "${cleanTag}"`);

    return NextResponse.json({
      status: "success",
      revalidated: true,
      tag: cleanTag,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[NextRevalidate] Internal Error during GET revalidation:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to revalidate cache tag",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { searchParams } = new URL(request.url);
    const tag = body.tag || searchParams.get("tag");
    const querySecret = searchParams.get("secret") || searchParams.get("token");
    const bodySecret = body.secret || body.token;

    // Blog webhook (WordPress): its own fail-closed, header-only authentication. Program tags continue below.
    if (tag === BLOG_TAG) return handleBlogRevalidation(request);

    console.log(`[NextRevalidate] Incoming POST revalidation request for tag: "${tag || "N/A"}"`);

    // 1. Authenticate Request
    const auth = authenticateRevalidationRequest(request, querySecret, bodySecret);
    if (!auth.authenticated) {
      console.warn(`[NextRevalidate] Unauthorized revalidation request rejected.`);
      return NextResponse.json(
        { status: "error", message: auth.error },
        { status: 401 }
      );
    }

    // 2. Validate Tag Format
    const tagValidation = validateCacheTag(tag);
    if (!tagValidation.valid) {
      console.warn(`[NextRevalidate] Validation Error: ${tagValidation.error}`);
      return NextResponse.json(
        { status: "error", message: tagValidation.error },
        { status: 400 }
      );
    }

    const { cleanTag } = tagValidation;

    // 3. Invalidate exact PID tag
    console.log(`[NextRevalidate] Invalidating cache tag: "${cleanTag}"`);
    revalidateTag(cleanTag, { expire: 0 });
    console.log(`[NextRevalidate] Successfully invalidated cache tag: "${cleanTag}"`);

    return NextResponse.json({
      status: "success",
      revalidated: true,
      tag: cleanTag,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[NextRevalidate] Internal Error during POST revalidation:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to revalidate cache tag",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
