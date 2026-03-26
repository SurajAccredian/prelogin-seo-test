"use client"
import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { categoriesWithContacts } from "../../Assets/constants"

const categoryOrder = [
    "Enrolled Students",
    "Program Enquiry",
    "PG Diploma",
    "cxo leadership",
    "strategy & leadership",
    "senior management",
    "general management",
    "business management",
    "artificial intelligence",
    "finance",
    "human resource",
    "project management",
    "product management",
    "strategic management",
    "digital transformation",
    "cybersecurity",
    "data science",
];

const GetInTouch = () => {
    const [showEnrolledModal, setShowEnrolledModal] = useState(false);
    const [showProgramModal, setShowProgramModal] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showMediaModal, setShowMediaModal] = useState(false);

    const programContacts = [
        { category: "Program Enquiry", contact: "+91 7619555873" },
        ...categoriesWithContacts,
    ].sort((a, b) => {
        const indexA = categoryOrder.indexOf(a.category);
        const indexB = categoryOrder.indexOf(b.category);
        return indexA - indexB;
    });

    return (
        <>
            {/* Main Section */}
            <div className="w-full overflow-hidden">
                <div className="relative w-full bg-gray-50 flex flex-col lg:flex-row items-stretch overflow-hidden">

                    {/* Left Side - Heading + Cards */}
                    <div className="w-full lg:w-[58%] flex flex-col py-8 lg:py-10 px-6 lg:px-10 xl:px-12">

                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-8">
                            Reach Out to Us
                        </h1>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Box 1 - Need Help Choosing a Program */}
                            <div className="bg-white rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                                <div className="inline-block bg-universal text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 self-start">
                                    5-10 mins wait
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                    Need Help Choosing a Program?
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base mb-6 flex-grow">
                                    Connect with experts to find the right program fit.
                                </p>
                                <button
                                    onClick={() => setShowProgramModal(true)}
                                    className="flex items-center gap-2 text-blue-600 font-semibold text-sm md:text-base hover:gap-3 transition-all mt-auto"
                                >
                                    View contact numbers
                                    <ArrowRight size={20} />
                                </button>
                            </div>

                            {/* Box 2 - For Enrolled Learners */}
                            <div className="bg-white rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                                <div className="inline-block bg-universal text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 self-start">
                                    5-10 mins wait
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                    For Enrolled Learners
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base mb-6 flex-grow">
                                    Get prompt support for your ongoing learning journey.
                                </p>
                                <button
                                    onClick={() => setShowEnrolledModal(true)}
                                    className="flex items-center gap-2 text-blue-600 font-semibold text-sm md:text-base hover:gap-3 transition-all mt-auto"
                                >
                                    View contact details
                                    <ArrowRight size={20} />
                                </button>
                            </div>

                            {/* Box 3 - Apply at Accredian */}
                            <div className="bg-white rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                                <div className="inline-block bg-universal text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 self-start">
                                    24-48 hrs wait
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                    Apply at Accredian
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base mb-6 flex-grow">
                                    Explore career opportunities and join the Accredian team.
                                </p>
                                <button
                                    onClick={() => setShowApplyModal(true)}
                                    className="flex items-center gap-2 text-blue-600 font-semibold text-sm md:text-base hover:gap-3 transition-all mt-auto"
                                >
                                    View email IDs
                                    <ArrowRight size={20} />
                                </button>
                            </div>

                            {/* Box 4 - Media, Partnerships & Other Enquiries */}
                            <div className="bg-white rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                                <div className="inline-block bg-universal text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 self-start">
                                    24-48 hrs wait
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                    For Media, Partnerships &amp; Other Enquiries
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base mb-6 flex-grow">
                                    Contact us for collaborations, media queries, and partnerships.
                                </p>
                                <button
                                    onClick={() => setShowMediaModal(true)}
                                    className="flex items-center gap-2 text-blue-600 font-semibold text-sm md:text-base hover:gap-3 transition-all mt-auto"
                                >
                                    View email IDs
                                    <ArrowRight size={20} />
                                </button>
                            </div>

                        </div>

                        {/* Mobile image */}
                        {/* <div className="w-full mt-8 lg:hidden">
                            <div className="w-full h-[280px] md:h-[360px] overflow-hidden">
                                <img
                                    src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/contact-us-updated-image-v5.png"
                                    alt="Support team"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </div> */}

                    </div>

                    {/* Right Side - Image flush to right/top/bottom edge */}
                    <div className="hidden md:flex flex-1 min-w-0 overflow-hidden items-center justify-center">
                        <img
                            src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/contact-us-updated-image-v6.png"
                            alt="Support team"
                            className="w-full h-full object-contain object-center"
                        />
                    </div>

                </div>
            </div>

            {/* ── Modal 1: For Enrolled Learners ── */}
            {showEnrolledModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setShowEnrolledModal(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            For Enrolled Learners
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-blue-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors">
                                <p className="text-gray-600 text-sm mb-2">Call us</p>
                                <a href="tel:07969547220" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                                    07969547220
                                </a>
                            </div>
                            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between group hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm mb-2">Email us</p>
                                    <a href="mailto:academics@accredian.com" className="text-base md:text-lg font-semibold text-blue-600 hover:underline">
                                        academics@accredian.com
                                    </a>
                                </div>
                                <ArrowRight className="text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Modal 2: Need Help Choosing a Program ── */}
            {showProgramModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-3xl w-full p-8 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setShowProgramModal(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <div className="max-h-[80vh] overflow-y-scroll custom-scrollbar" data-lenis-prevent>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Talk to us
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {programContacts.map((item, index) => (
                                    <div key={index} className="bg-blue-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors">
                                        <p className="text-gray-600 text-lg mb-2 capitalize">
                                            For {item.category === "cxo leadership" ? "CXO Leadership" : item.category}
                                        </p>
                                        <a href={`tel:${item.contact}`} className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                                            {item.contact}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Modal 3: Apply at Accredian ── */}
            {showApplyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-50 rounded-3xl max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowApplyModal(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 pr-10">
                            Apply at Accredian
                        </h2>
                        <div className="space-y-3">
                            <div className="bg-white rounded-2xl p-4 flex items-center justify-between group hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm mb-2">For career opportunities</p>
                                    <a href="mailto:careers@accredian.com" className="text-base md:text-lg font-semibold text-blue-600 hover:underline">
                                        careers@accredian.com
                                    </a>
                                </div>
                                <ArrowRight className="text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Modal 4: Media, Partnerships & Other Enquiries ── */}
            {showMediaModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-50 rounded-3xl max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowMediaModal(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 pr-10">
                            Contact us
                        </h2>
                        <div className="space-y-3">
                            <div className="bg-white rounded-2xl p-4 flex items-center justify-between group hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm mb-2">Email us</p>
                                    <a href="mailto:contactus@accredian.com" className="text-base md:text-lg font-semibold text-blue-600 hover:underline">
                                        contactus@accredian.com
                                    </a>
                                </div>
                                <ArrowRight className="text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GetInTouch;
