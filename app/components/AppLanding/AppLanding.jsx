"use client";
import React from "react";
import Wrapper from "../Wrapper/HomePageWrapper";
import { Video, BookOpen, Calendar, Star, GraduationCap } from "lucide-react";
import WatchStoriesV2 from "../success-stories/watch-stories/watch-stories-v2";

const AppLanding = () => {
  return (
    <Wrapper>
      <div className="bg-slate-50/40 min-h-screen pt-20 md:pt-0 font-sans overflow-hidden">

        {/* HERO SECTION */}
        <section className="relative pt-8 pb-16 md:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content (Text + CTAs) */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full text-blue-600 text-xs md:text-sm font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                Accredian Mobile App
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                Your IIT & IIM Program. <br />
                <span className="text-blue-600">Now in Your Pocket.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Track progress, join live classes, access resources, and build your career - all from the Accredian app. Experience high-impact learning on the go.
              </p>

              {/* App Availability Text */}
              <div className="pt-4 flex flex-col sm:flex-row items-center lg:justify-start gap-2.5">
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
                  🍏 Available on iOS App Store
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
                  🤖 Available on Google Play Store
                </span>
              </div>
            </div>

            {/* Right Content (Sleek App Dashboard Panels) */}
            <div className="lg:col-span-5 flex flex-col gap-6 relative">

              {/* Panel 1 - Live Class Session */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-md transform hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">LIVE</span>
                    <h4 className="font-bold text-slate-800 text-sm mt-1">Live Class: Strategy Formulation</h4>
                    <p className="text-xs text-slate-400">Join now with Dr. Vance (IIM-B)</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl transition-colors">
                    Open Zoom Session
                  </button>
                </div>
              </div>

              {/* Panel 2 - My Progress */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-md transform hover:-translate-y-1 transition-transform lg:translate-x-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">COO Executive Program</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm font-bold text-slate-800">Program Progress</span>
                      <span className="text-sm font-extrabold text-blue-600">72%</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3.5">
                  <div className="bg-blue-600 h-full rounded-full w-[72%]" />
                </div>
              </div>

              {/* Panel 3 - Study Resources */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-md transform hover:-translate-y-1 transition-transform">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Study Resources</h5>
                  <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold">Offline Ready</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-medium text-slate-700 truncate max-w-[200px]">Strategic Management Slides.pdf</span>
                    <span className="text-[10px] text-blue-600 font-bold">Downloaded</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-medium text-slate-700 truncate max-w-[200px]">Case Study: Operations Scaling.pdf</span>
                    <span className="text-[10px] text-blue-600 font-bold">Downloaded</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-20 bg-white border-t border-slate-100 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-8">

            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Accredian Features
              </h2>
              <p className="text-base text-slate-500 mt-2">
                All features built to support your learning goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center space-y-3 p-6 bg-slate-50 rounded-2xl border border-slate-50">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">📊 Live Classes</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Join IIM & IIT faculty-led live webinars with a single tap. Interact, ask questions, and chat.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center space-y-3 p-6 bg-slate-50 rounded-2xl border border-slate-50">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">📚 Course Materials</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Access curriculum resources, slides, readings, and PDF files. Save materials offline.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center space-y-3 p-6 bg-slate-50 rounded-2xl border border-slate-50">
                <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">📅 Events & Workshops</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Register for exclusive masterclasses, career workshops, and industry panel events.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SOCIAL PROOF SECTION */}
        <section className="py-20 bg-slate-50 border-t border-slate-100 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-8">

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center pb-12 border-b border-slate-200/60">
              <div>
                <p className="text-3xl font-black text-slate-900">48+</p>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mt-1">Professional Programs</p>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">10+</p>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mt-1">Partner Institutions</p>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">320+</p>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mt-1">Alumni Network</p>
              </div>
            </div>

            {/* Alumni success stories component */}
            <div className="mt-8 border-t border-slate-200/60 pt-6">
              <WatchStoriesV2 />
            </div>

          </div>
        </section>

        {/* BOTTOM DOWNLOAD CTA BANNER */}
        <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-[85rem] mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-lg text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Start learning with India's top institutes today.
            </h2>
            <p className="text-blue-100 text-sm max-w-xl mx-auto leading-relaxed">
              Take the first step toward career advancement. Download the Accredian app on your iOS or Android device and unlock your learning potential.
            </p>

            {/* App Availability Text */}
            <div className="flex justify-center gap-6 pt-4 text-sm font-semibold tracking-wide uppercase text-blue-100">
              <span>🍏 Available on iOS App Store</span>
              <span className="text-blue-300">•</span>
              <span>🤖 Available on Google Play Store</span>
            </div>
          </div>
        </section>

      </div>
    </Wrapper>
  );
};

export default AppLanding;
