"use client";
import React from "react";
import Wrapper from "../Wrapper/HomePageWrapper";
import { Mail, Phone, Calendar, Clock, MapPin, ExternalLink, Shield } from "lucide-react";

const AppPrivacyPolicy = () => {
  return (
    <Wrapper>
      <div className="bg-slate-50/50 min-h-screen pt-20 md:pt-12 pb-24 font-sans">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-8">
          
          {/* Header Section */}
          <div className="text-left mb-12">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              Privacy Policy
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 tracking-tight">
              Accredian Mobile App
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-6 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Last Updated: June 26, 2026</span>
              <span className="hidden sm:block text-slate-300">•</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Effective Date: June 26, 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Content Column */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-10">
              
              {/* Intro */}
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p>
                  Accredian (operated by <strong>FullStack Education Pvt Ltd.</strong>) is committed to protecting your privacy. This Privacy Policy explains what information we collect when you use the Accredian mobile application ("the App"), how we use it, with whom we share it, and what rights you have over your data.
                </p>
                <p className="mt-4">
                  Please read this policy carefully. By using the App, you agree to the practices described below. If you do not agree, please discontinue use of the App.
                </p>
              </div>

              {/* 1. Who We Are */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">1. Who We Are</h2>
                <div className="text-slate-600 space-y-4">
                  <p>The Accredian App is operated by:</p>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-semibold text-slate-800">FullStack Education Pvt Ltd.</p>
                    <p className="flex items-start gap-2 mt-2 text-sm">
                      <MapPin className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                      <span>Address: 4th Floor, 250, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana, India</span>
                    </p>
                  </div>
                  <p>For any privacy-related queries, you may contact our designated Privacy Contact at: <a href="mailto:info@accredian.com" className="text-blue-600 font-medium hover:underline">info@accredian.com</a> [Support Number: 7969547220]</p>
                </div>
              </section>

              {/* 2. What Information We Collect */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">2. What Information We Collect</h2>
                <p className="text-slate-600 mb-6">We collect information in the following categories:</p>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 text-blue-900/90">2.1 Information You Provide Directly</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-700">Account & Identity Information</h4>
                        <p className="text-slate-600 mt-1 mb-2 text-sm">When you log in to the App, we access the account information you registered with on Accredian's platform, including:</p>
                        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                          <li>Full name</li>
                          <li>Email address</li>
                          <li>Phone number</li>
                          <li>Profile photograph (if uploaded)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-700">Program & Enrollment Information</h4>
                        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 mt-1">
                          <li>The program(s) you are enrolled in</li>
                          <li>Cohort name and batch details</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-700">Event RSVPs</h4>
                        <p className="text-slate-600 mt-1 mb-2 text-sm">When you register for a live session, masterclass, fireside chat, or workshop, we collect:</p>
                        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                          <li>Your RSVP confirmation and selected event details</li>
                          <li>Calendar integration data (if you add an event to your calendar)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 text-blue-900/90">2.2 Information Collected Automatically</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-700">Learning Progress & Engagement Data</h4>
                        <p className="text-slate-600 mt-1 mb-2 text-sm">As you use the App, we automatically record:</p>
                        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                          <li>Modules completed and in-progress</li>
                          <li>Completion percentage per module and overall program</li>
                          <li>Resources viewed, downloaded, or shared</li>
                          <li>Daily challenge responses and XP points earned</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-700">Device & Technical Information</h4>
                        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 mt-1">
                          <li>App version number</li>
                          <li>Time zone</li>
                          <li>App crash logs and error reports</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 text-blue-900/90">2.3 Information from Third Parties</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-700">Zoom (Live Class Integration)</h4>
                        <p className="text-sm text-slate-600 mt-1">When you join a live class through the App, you are redirected to Zoom. The App records that you initiated a session join, but your actual video/audio call is governed by Zoom's own Privacy Policy. We do not collect or store your audio, video, or in-call chat from Zoom.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-700">Google Meet</h4>
                        <p className="text-sm text-slate-600 mt-1">Select events use Google Meet. The App records your RSVP and session participation intent. Audio/video during the call is governed by Google's Privacy Policy.</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-700">Google Calendar</h4>
                        <p className="text-sm text-slate-600 mt-1">If you add an event to your calendar via the RSVP feature, we interact with your device's native calendar. We do not store your full calendar data — only the specific event detail is written.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">3. How We Use Your Information</h2>
                <p className="text-slate-600 mb-4">We use the information we collect for the following purposes:</p>
                
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 font-semibold w-1/2 border-r border-slate-200">Purpose</th>
                        <th className="px-4 py-3 font-semibold w-1/2">Data Used</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-600 bg-white">
                      <tr>
                        <td className="px-4 py-3 border-r border-slate-200">Authenticate your login and display your personalised dashboard</td>
                        <td className="px-4 py-3">Account information, enrollment data</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-r border-slate-200">Track and display your learning progress</td>
                        <td className="px-4 py-3">Module completion, resource access, XP</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-r border-slate-200">Deliver live class notifications and session access</td>
                        <td className="px-4 py-3">Enrollment</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-r border-slate-200">Enable event RSVP and send reminders</td>
                        <td className="px-4 py-3">Event registrations</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-r border-slate-200">Personalise content recommendations ("Recommended for You")</td>
                        <td className="px-4 py-3">Learning history, program track</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-r border-slate-200">Comply with legal obligations</td>
                        <td className="px-4 py-3">As required under applicable Indian law</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-r border-slate-200">Respond to your support requests</td>
                        <td className="px-4 py-3">Account information, query details</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="text-slate-600 font-medium bg-blue-50/50 p-4 rounded-xl border border-blue-100">We do <strong>not</strong> use your data to serve third-party advertisements. The App is ad-free.</p>
              </section>

              {/* 4. How We Share Your Information */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">4. How We Share Your Information</h2>
                <p className="text-slate-600 mb-6">We do <strong>not</strong> sell your personal data. We share information only in the following limited circumstances:</p>
                
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">4.1 With Zoom and Google</h3>
                    <p className="text-sm text-slate-600">When you use live class or event features, minimal data (such as a meeting link) is passed to Zoom or Google Meet. These companies have their own independent privacy policies and are not under our control for in-call data.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">4.2 For Legal Compliance</h3>
                    <p className="text-sm text-slate-600">We may disclose your information if required to do so by law, court order, or governmental authority, or where we believe in good faith that disclosure is necessary to protect our legal rights, enforce our Terms of Service, or protect the safety of users.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">4.3 In a Business Transfer</h3>
                    <p className="text-sm text-slate-600">If Accredian undergoes a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change in control and any choices you may have.</p>
                  </div>
                </div>
              </section>

              {/* 5. Data Retention */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">5. Data Retention</h2>
                <div className="text-slate-600">
                  <p className="mb-2">We retain your personal data for as long as:</p>
                  <ul className="list-disc pl-5 mb-6 space-y-1">
                    <li>Your account remains active on Accredian's platform, or</li>
                    <li>It is necessary to provide you with the services of the App, or</li>
                    <li>It is required by law or for legitimate business purposes.</li>
                  </ul>
                  
                  <p className="font-semibold text-slate-800 mb-3">Specific retention periods:</p>
                  <div className="overflow-x-auto rounded-xl border border-slate-200 mb-4">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 font-semibold w-1/2 border-r border-slate-200">Data Type</th>
                          <th className="px-4 py-3 font-semibold w-1/2">Retention Period</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-600 bg-white">
                        <tr>
                          <td className="px-4 py-3 border-r border-slate-200">Account & identity information</td>
                          <td className="px-4 py-3">Duration of your enrollment + 3 years</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 border-r border-slate-200">Learning progress & module data</td>
                          <td className="px-4 py-3">Duration of your program + 2 years</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 border-r border-slate-200">Career tool inputs</td>
                          <td className="px-4 py-3">Until you delete them, or account closure</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 border-r border-slate-200">Crash logs and error reports</td>
                          <td className="px-4 py-3">90 days</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 border-r border-slate-200">Support correspondence</td>
                          <td className="px-4 py-3">2 years from resolution</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <p className="text-sm">After the applicable retention period, data is securely deleted or anonymised.</p>
                </div>
              </section>

              {/* 6. Your Rights */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">6. Your Rights</h2>
                <p className="text-slate-600 mb-5">Depending on your location, you have the following rights regarding your personal data:</p>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                    <p className="text-sm text-slate-600"><strong>Right to Access</strong> — You may request a copy of the personal data we hold about you.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                    <p className="text-sm text-slate-600"><strong>Right to Correction</strong> — You may request that we correct inaccurate or incomplete information about you.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                    <p className="text-sm text-slate-600"><strong>Right to Deletion</strong> — You may request deletion of your personal data, subject to our legal and contractual obligations. Note that deleting your account may affect access to your enrolled program.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                    <p className="text-sm text-slate-600"><strong>Right to Data Portability</strong> — You may request your data in a structured, commonly used format.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                    <p className="text-sm text-slate-600"><strong>Right to Withdraw Consent</strong> — Where we process your data based on consent (e.g., push notifications), you may withdraw consent at any time without affecting the lawfulness of prior processing. You can manage notification preferences under App Settings.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                    <p className="text-sm text-slate-600"><strong>Right to Object</strong> — You may object to certain types of processing, including analytics tracking.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                    <p className="text-sm text-slate-600"><strong>Right to Lodge a Complaint</strong> — If you believe we have processed your data unlawfully, you have the right to lodge a complaint with the relevant data protection authority in your jurisdiction.</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-slate-700 text-sm mb-1">To exercise any of the above rights, please contact us at: <a href="mailto:info@accredian.com" className="text-blue-600 font-medium hover:underline">info@accredian.com</a></p>
                  <p className="text-slate-500 text-sm">We will respond to all verified requests within 30 days.</p>
                </div>
              </section>

              {/* 7. Push Notifications */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">7. Push Notifications</h2>
                <div className="text-slate-600 text-sm">
                  <p className="mb-2">The App sends push notifications to alert you about:</p>
                  <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>Upcoming live classes and sessions</li>
                    <li>New events, masterclasses, and workshops</li>
                    <li>Daily challenge reminders</li>
                    <li>New resources added to your program</li>
                  </ul>
                  <p>You may enable or disable push notifications at any time through your device's notification settings or within the App under Settings {'>'} Notifications. Disabling notifications does not affect your access to the App or your learning content.</p>
                </div>
              </section>

              {/* 8. Data Security */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">8. Data Security</h2>
                <div className="text-slate-600 text-sm">
                  <p className="mb-2">We implement industry-standard technical and organisational measures to protect your personal data, including:</p>
                  <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>Encrypted data transmission (HTTPS/TLS) between the App and our servers</li>
                    <li>Encrypted storage of sensitive information at rest</li>
                    <li>Access controls limiting data access to authorised personnel only</li>
                    <li>Regular security assessments and vulnerability monitoring</li>
                    <li>Incident response procedures in the event of a data breach</li>
                  </ul>
                  <p>While we take every reasonable precaution, no method of transmission over the internet is 100% secure. In the event of a data breach that is likely to result in a risk to your rights, we will notify you as required by applicable law.</p>
                </div>
              </section>

              {/* 9. Children's Privacy */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">9. Children's Privacy</h2>
                <div className="text-slate-600 text-sm space-y-3">
                  <p>The Accredian App is intended solely for use by individuals who are <strong>18 years of age or older</strong>. We do not knowingly collect personal data from anyone under the age of 18.</p>
                  <p>If you believe that a minor has provided us with personal data without parental consent, please contact us at <a href="mailto:info@accredian.com" className="text-blue-600 hover:underline">info@accredian.com</a> and we will take immediate steps to delete that information.</p>
                </div>
              </section>

              {/* 10. Third-Party Links and Services */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">10. Third-Party Links and Services</h2>
                <div className="text-slate-600 text-sm space-y-3">
                  <p>The App may contain links to external websites or integrate with third-party services (e.g., Zoom, Google Meet). This Privacy Policy applies only to data processed by the Accredian App. We encourage you to review the privacy policies of any third-party services you use through or alongside the App.</p>
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">Third-party privacy policies referenced:</p>
                    <ul className="space-y-1.5 mt-2">
                      <li>
                        <a href="https://zoom.us/privacy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 hover:underline">
                          <ExternalLink className="w-3.5 h-3.5" />
                          Zoom Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 hover:underline">
                          <ExternalLink className="w-3.5 h-3.5" />
                          Google Privacy Policy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 11. Changes to This Privacy Policy */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">11. Changes to This Privacy Policy</h2>
                <div className="text-slate-600 text-sm space-y-3">
                  <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will:</p>
                  <ul className="list-disc pl-5">
                    <li>Update the "Last Updated" date at the top of this page</li>
                    <li>Display an in-app notice notifying you of the update</li>
                    <li>For significant changes, seek your renewed consent where required by law</li>
                  </ul>
                  <p>We encourage you to review this page periodically. Your continued use of the App after any changes constitutes your acceptance of the updated policy.</p>
                </div>
              </section>

              <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 text-center">
                This Privacy Policy was last updated on June 26, 2026. It applies to the Accredian mobile application available on the Apple App Store and Google Play Store.
              </div>

            </div>

            {/* Right Column - Contact Stack */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-slate-900/10">
                <h2 className="text-2xl font-bold mb-2">12. Contact Us</h2>
                <p className="text-slate-300 text-sm mb-6">For any questions, concerns, or requests related to this Privacy Policy or your personal data.</p>
                
                <div className="space-y-6">
                  {/* Privacy & Data */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200">Privacy & Data Queries</h3>
                      <a href="mailto:info@accredian.com" className="text-base font-bold hover:text-blue-300 transition-colors">info@accredian.com</a>
                    </div>
                  </div>

                  {/* General App Support */}
                  <div className="flex gap-4 items-start pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-green-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200 mb-1">General App Support</h3>
                      <a href="mailto:academics@accredian.com" className="block text-sm font-medium hover:text-blue-300 transition-colors">academics@accredian.com</a>
                      <a href="tel:+917969547220" className="block text-sm font-medium mt-1 hover:text-blue-300 transition-colors">+91 7969547220</a>
                      <p className="text-xs text-slate-400 mt-2">Mon – Sat, 9:00 AM – 7:00 PM IST</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-4 items-start pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200 mb-1">Registered Address</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        FullStack Education Pvt Ltd.<br />
                        4th Floor, 250, Phase IV,<br />
                        Udyog Vihar, Sector 18,<br />
                        Gurugram, Haryana, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Other links */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm">
                <p className="text-sm text-slate-500 mb-3">Looking for something else?</p>
                <div className="flex flex-col gap-2">
                  <a href="/app-support" className="text-sm font-bold text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-xl transition-colors">
                    Visit App Support Center
                  </a>
                  <a href="https://accredian.com/account-deletion" className="text-sm font-bold text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-xl transition-colors">
                    Account Deletion
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Back Home Link */}
          <div className="text-left mt-12">
            <a
              href="/"
              className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
            >
              ← Back to accredian.com
            </a>
          </div>

        </div>
      </div>
    </Wrapper>
  );
};

export default AppPrivacyPolicy;
