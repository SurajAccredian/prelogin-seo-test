export const universityFaqTemplates = {
    iitk: {
        templateId: "iitk_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the {instituteName} {verticalName} Program about?",
                        content: [
                            "The {programName} is a {duration} program offered by {instituteName}. It is designed to equip learners with core {verticalName} skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across {terms} comprising {modules} modules, covering all core aspects of {verticalName}: {keyTopics}.",
                            "- **Duration:** {duration}",
                            "- **Learning Format:** {hours}+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of {workExperienceYears} is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in {verticalName} to enroll?",
                        content: [
                            "Prior {verticalName} experience is not required."
                        ]
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from {instituteName} after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from {instituteName}, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if**",
                            "attendance is 70% or above.",
                            "",
                            "- **Participation Certificate** will be issued if attendance is below 70% **(no Completion Certificate)**.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy).",
                            "",
                            "{iitkCampusImmersionNoteText}"
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by {instituteName}."
                        ]
                    },
                    {
                        title: "Will I get any alumni status or networking opportunities with {instituteName}?",
                        content: [
                            "No, {instituteName} alumni status will **NOT be conferred.** However, learners can network with peers and industry experts during the program."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from {instituteName} confirming my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by industry experts with extensive hands-on experience."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is **not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through {careerAssistanceSessions} dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that **no placement assistance or assurance** is provided as part of the program."
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as {jobOpportunities}, etc."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR {fees} + GST.", "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    }
                    ,
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "{campusImmersionExists} at additional cost."
                        ]
                    },
                    {
                        title: "What does the {instituteName} campus immersion include, and how is it scheduled?",
                        content: [
                            "{campusImmersionDuration}  at {instituteName} is available at an additional cost of INR {campusImmersionCost} + GST per day.",
                            "- Food and accommodation are included in the immersion fee.",
                            "- Travel cost is not included and must be arranged by the participant.",
                            "- {instituteName} will provide prior notice of the schedule so participants can plan travel and work in advance."
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [

                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines {instituteName}'s academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in {keyTopics}, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    },

                ]
            }
        ]
    },
    xlri: {
        templateId: "xlri_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the {instituteName} {verticalName} Program about?",
                        content: [
                            "The {programName} is a {duration} program offered by {instituteName}. It is designed to equip learners with core {verticalName} skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across {terms} comprising {modules} modules, covering all core aspects of {verticalName}: {keyTopics}.",
                            "- **Duration:** {duration}",
                            "- **Learning Format:** {hours}+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of {workExperienceYears} is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in {verticalName} to enroll?",
                        content: [
                            "No. Prior {verticalName} experience is not mandatory."
                        ]
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from {instituteName} after completing the program?",
                        content: [
                            "Participants will receive a Completion Certificate from {instituteName}, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is {attendancePercent}% or above along with Project participation and mandatory Assessments",
                            "",
                            "- **Participation Certificate will be issued if:** Attendance is below {attendancePercent}% and above 50% (no Completion Certificate in this case)",
                            "",
                            "- **No Completion or Participation Certificate will be issued if:** Attendance is below 50%"
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and how is it recognized by employers?",
                        content: [
                            "This is a Certificate program from {instituteName}, one of India's most reputed B-schools, and is widely recognized by employers across industries."
                        ]
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with {instituteName}?",
                        content: [
                            "Yes. Participants can opt for Executive Alumni Status by paying a one-time fee of **INR 20,000 + GST** upon program completion. This grants lifetime membership, access to the Executive Alumni Directory, and exclusive networking opportunities."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from {instituteName} confirming my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching in the program?",
                        content: [
                            "The program is taught by {instituteName} faculty and industry experts."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through {careerAssistanceSessions} dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles, industries, or leadership opportunities can I target after completing this program?",
                        content: [
                            "Students can explore roles such as {jobOpportunities}, etc."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR {fees} + GST.", "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "{campusImmersionExists}."
                        ]
                    },
                    {
                        title: "What does the {instituteName} campus immersion include, and how is it scheduled?",
                        content: [
                            "{campusImmersionDuration} at {instituteName}; included in the program fee.",
                            "- Food and accommodation are included in the program fee",
                            "- Travel cost is not included and must be arranged by the participant",
                            "- {instituteName} will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "International Immersion & Features",
                questions: [
                    {
                        title: "Is there an International Immersion included in the program?",
                        content: [
                            "{internationalImmersionMainAnswer}",
                            "",
                            "- {internationalImmersionFeeDetails}",
                            "- The {internationalImmersionLocation} Immersion may include activities like conferences, competitions, yacht cruise, desert safari, etc.",
                            "- **The itinerary and activities will be subject to the schedule and may change based on local conditions and availability.**"
                        ]
                    },
                    {
                        title: "What are the features of the International Immersion?",
                        content: [
                            "Some unique features of the international immersion include:",
                            "- International Networking Opportunities",
                            "- Leadership Dialogues & Panel Discussions",
                            "- Cultural & Business Exposure to Dubai's Ecosystem"
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [

                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines {instituteName}'s academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in {keyTopics}, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    },

                ]
            }
        ]
    },
    iimv: {
        templateId: "iimv_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the {instituteName} {verticalName} Program about?",
                        content: [
                            "The {programName} is a {duration} program offered by {instituteName}. It is designed to equip learners with core {verticalName} skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across {terms} comprising {modules} modules, covering all core aspects of {verticalName}: {keyTopics}.",
                            "- **Duration:** {duration}",
                            "- **Learning Format:** {hours}+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of {workExperienceYears} is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in {expirenceTitle} to enroll?",
                        content: [
                            "Prior {expirenceTitle} experience is not mandatory."
                        ]
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "- Click the **“Enroll Now”** button at the top of the webpage.",
                            "- Fill the application form and pay the fees.",
                            "- Selected Candidates will receive Admission Confirmation Letter from the institute."

                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from {instituteName} after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Visakhapatnam upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 70% or above AND Score in Overall Assessment is 50% or above.",
                            "",
                            "- **Participation Certificate will be issued if:** Attendance is below 70% (no Completion Certificate in this case)",
                            "",
                            "- **Physical Copy of Program Completion Certificate:** Applicable for campus immersion participants, subject to minimum attendance."
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by {instituteName}."
                        ]
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with {instituteName}?",
                        content: [
                            "{isAlumniStatusText}"
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from {instituteName} confirming my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    },
                    {
                        title: "Is a separate certificate awarded for the CXO Specialization Module?",
                        content: [
                            "Yes. The program offers dual certification - one for the core modules and another for the chosen CXO Specialization Module. This ensures that learners are formally recognized for both their foundational learning and their domain-specific expertise."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by {instituteName} Faculty and industry experts with extensive hands-on experience."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and  capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through {careerAssistanceSessions} dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Graduates can explore roles such as {jobOpportunities}, etc."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR {fees} + GST.", "- {emiDuration}-month no-cost EMI option is available.", "- Standard EMI options (with additional interest charges) are also available after {emiDuration} months."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "{campusImmersionExists}."
                        ]
                    },
                    {
                        title: "What does the {instituteName} campus immersion include, and how is it scheduled?",
                        content: [
                            "{campusImmersionDuration} at {instituteName}; {campusImmersionText}.",
                            "- Food and accommodation are included in the {campusImmersionfeeType} fee",
                            "- Travel cost is not included and must be arranged by the participant",
                            "- {instituteName} will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "International Immersion & Features",
                questions: [
                    {
                        title: "Is there an International Immersion included in the program?",
                        content: [
                            "{internationalImmersionMainAnswer}",
                            "",
                            "- {internationalImmersionFeeDetails}",
                            "- The {internationalImmersionLocation} Immersion may include activities like conferences, competitions, yacht cruise, desert safari, etc.",
                            "- **The itinerary and activities will be subject to the schedule and may change based on local conditions and availability.**"
                        ]
                    },
                    {
                        title: "What are the features of the International Immersion?",
                        content: [
                            "Some unique features of the international immersion include:",
                            "- International Networking Opportunities",
                            "- Leadership Dialogues & Panel Discussions",
                            "- Cultural & Business Exposure to Dubai's Ecosystem"
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [

                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines {instituteName}'s academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in {keyTopics}, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    },

                ]
            }
        ]
    },
    "iimv-v2": {
        templateId: "iimv_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the {instituteName} {verticalName} Program about?",
                        content: [
                            "The {programName} is a {duration} program offered by {instituteName}. It is designed to equip learners with core {verticalName} skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across {terms} comprising {modules} modules, covering all core aspects of {verticalName}: {keyTopics}.",
                            "- **Duration:** {duration}",
                            "- **Learning Format:** {hours}+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of {workExperienceYears} is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in {expirenceTitle} to enroll?",
                        content: [
                            "Prior {expirenceTitle} experience is not mandatory."
                        ]
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "- Click the **“Enroll Now”** button at the top of the webpage.",
                            "- Fill the application form and pay the fees.",
                            "- Selected Candidates will receive Admission Confirmation Letter from the institute."

                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from {instituteName} after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Visakhapatnam upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 70% or above, along with a 50% score in the overall assessment.",
                            "",
                            "- **Participation Certificate will be issued if:** Attendance is below 70% (no Completion Certificate in this case)",
                            "",
                            "- **Physical Copy of Program Completion Certificate:** Applicable for campus immersion participants, subject to minimum attendance."
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by {instituteName}."
                        ]
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with {instituteName}?",
                        content: [
                            "{isAlumniStatusText}"
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from {instituteName} confirming my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    },
                    {
                        title: "Is a separate certificate awarded for the CXO Specialization Module?",
                        content: [
                            "Yes. The program offers dual certification - one for the core modules and another for the chosen CXO Specialization Module. This ensures that learners are formally recognized for both their foundational learning and their domain-specific expertise."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by {instituteName} Faculty and industry experts with extensive hands-on experience."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and  capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through {careerAssistanceSessions} dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Graduates can explore roles such as {jobOpportunities}, etc."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR {fees} + GST.", "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "{campusImmersionExists}."
                        ]
                    },
                    {
                        title: "What does the {instituteName} campus immersion include, and how is it scheduled?",
                        content: [
                            "{campusImmersionDuration} at {instituteName}; {campusImmersionText}.",
                            "- Food and accommodation are included in the {campusImmersionfeeType} fee",
                            "- Travel cost is not included and must be arranged by the participant",
                            "- {instituteName} will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "International Immersion & Features",
                questions: [
                    {
                        title: "Is there an International Immersion included in the program?",
                        content: [
                            "{internationalImmersionMainAnswer}",
                            "",
                            "- {internationalImmersionFeeDetails}",
                            "- The {internationalImmersionLocation} Immersion may include activities like conferences, competitions, yacht cruise, desert safari, etc.",
                            "- **The itinerary and activities will be subject to the schedule and may change based on local conditions and availability.**"
                        ]
                    },
                    {
                        title: "What are the features of the International Immersion?",
                        content: [
                            "Some unique features of the international immersion include:",
                            "- International Networking Opportunities",
                            "- Leadership Dialogues & Panel Discussions",
                            "- Cultural & Business Exposure to Dubai's Ecosystem"
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [

                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines {instituteName}'s academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in {keyTopics}, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    },

                ]
            }
        ]
    },
    "iim-trichy": {
        templateId: "iimv_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the {instituteName} {verticalName} Program about?",
                        content: [
                            "The {programName} is a {duration} program offered by {instituteName}. It is designed to equip learners with core {verticalName} skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across {terms} comprising {modules} modules, covering all core aspects of {verticalName}: {keyTopics}.",
                            "- **Duration:** {duration}",
                            "- **Learning Format:** {hours}+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of {workExperienceYears} is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in {expirenceTitle} to enroll?",
                        content: [
                            "Prior {expirenceTitle} experience is not mandatory."
                        ]
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "- Click the **“Enroll Now”** button at the top of the webpage.",
                            "- Fill the application form and pay the fees.",
                            "- Selected Candidates will receive Admission Confirmation Letter from the institute."

                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from {instituteName} after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from {instituteName} upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 70% or above AND Score in Overall Assessment is 50% or above.",
                            "",
                            "- **Participation Certificate will be issued if:** Attendance is below 70% (no Completion Certificate in this case).",
                            "",
                            "- **Physical Copy of Program Completion Certificate:** Applicable for campus immersion participants, subject to minimum attendance."
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by {instituteName}."
                        ]
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with {instituteName}?",
                        content: [
                            "No, {instituteName} Executive Alumni Status will **NOT be conferred.** However, learners can network with peers and IIM Tiruchirappalli faculty during the program."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from {instituteName} confirming my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by {instituteName} Faculty with extensive hands-on experience."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through {careerAssistanceSessions} dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Graduates can explore roles such as {jobOpportunities}, etc."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR {fees} + GST.", "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "{campusImmersionExists}."
                        ]
                    },
                    {
                        title: "What does the {instituteName} campus immersion include, and how is it scheduled?",
                        content: [
                            "{campusImmersionDuration} at {instituteName}; included in the program fee.",
                            "- Food and accommodation are included in the program fee",
                            "- Travel cost is not included and must be arranged by the participant",
                            "- {instituteName} will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "International Immersion & Features",
                questions: [
                    {
                        title: "Is there an International Immersion included in the program?",
                        content: [
                            "{internationalImmersionMainAnswer}",
                            "",
                            "- {internationalImmersionFeeDetails}",
                            "- The {internationalImmersionLocation} Immersion may include activities like conferences, competitions, yacht cruise, desert safari, etc.",
                            "- **The itinerary and activities will be subject to the schedule and may change based on local conditions and availability.**"
                        ]
                    },
                    {
                        title: "What are the features of the International Immersion?",
                        content: [
                            "Some unique features of the international immersion include:",
                            "- International Networking Opportunities",
                            "- Leadership Dialogues & Panel Discussions",
                            "- Cultural & Business Exposure to Dubai's Ecosystem"
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [

                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines {instituteName}'s academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in {keyTopics}, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    },

                ]
            }
        ]
    },
    "iimv-diploma": {
        templateId: "iimv_diploma_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Visakhapatnam PGDMEx about?",
                        content: [
                            "The Post Graduate Diploma in Management for Working Executives (PGDMEx) is a 12-month program offered by IIM Visakhapatnam. It is designed to equip learners with core management skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 12 months comprising 21 courses, covering all core aspects of management: finance, operations, organizational behavior, and business transformation.",
                            "- **Duration:** 12 months",
                            "- **Learning Format:** 480+ hours of live online sessions",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available in case a session is missed"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants must hold a bachelor's degree in any discipline with a minimum of 50% marks. A minimum of three years of prior work experience is mandatory."
                        ]
                    },
                    {
                        title: "Do I need prior experience in management to enroll?",
                        content: [
                            "Prior management experience is not mandatory."
                        ]
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "- Click the **Enroll Now** button at the top of the webpage.",
                            "- Fill out the application form, pay the fees, and provide all the required documents.",
                            "- Shortlisted candidates will be invited to take the MAST and appear for a Personal Interview.",
                            "- If selected, you will receive your offer letter."
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a diploma from IIM Visakhapatnam after completing the program?",
                        content: [
                            "Yes. Participants will receive a Post Graduate Diploma from IIM Visakhapatnam upon fulfilling all program requirements.",
                            "",
                            "- **Diploma will be awarded only if:** Attendance is 75% or above and the participant achieves a minimum CGPA of 2.15 in the overall assessment."
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a Post Graduate Diploma awarded by IIM Visakhapatnam and recognized by employers."
                        ]
                    },
                    {
                        title: "Will I get any alumni status or networking opportunities with IIM Visakhapatnam?",
                        content: [
                            "Yes. Participants will receive IIM Visakhapatnam Executive Alumni Status, which is included in the program fees."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital ID or an official email from IIM Visakhapatnam confirming my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Visakhapatnam Faculty and industry experts with extensive hands-on experience."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and a capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "The program does not offer placement support. However, participants benefit from IIM Visakhapatnam's strong academic and professional reputation."
                        ]
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Graduates can pursue leadership and managerial roles such as General Manager, Operations Manager, Business Development Manager, Sales Manager, and Project Manager across diverse sectors including IT, Manufacturing, Consulting, BFSI, and Services."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 4,84,300.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program has a 3-day campus immersion."
                        ]
                    },
                    {
                        title: "What does the IIM Visakhapatnam campus immersion include, and how is it scheduled?",
                        content: [
                            "One campus immersion of 3 days at IIM Visakhapatnam is included in the program fee.",
                            "- Food and accommodation are included in the program fee",
                            "- Travel cost is not included and must be arranged by the participant",
                            "- IIM Visakhapatnam will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "International Immersion & Features",
                questions: [
                    {
                        title: "Is there an International Immersion included in the program?",
                        content: [
                            "Yes, but it is optional. An International Immersion is offered at an additional fee of INR 60,000 + GST, subject to a maximum variation of 20% based on the final destination, payable at the time of scheduling.",
                            "",
                            "- The final destination (Dubai, Thailand, or another international location) and detailed itinerary will be announced at least 90 days in advance.",
                            "- The additional International Immersion fee covers double occupancy accommodation, boarding, and lodging only.",
                            "- Participants are required to make their own arrangements and bear the costs for travel, visa, and immigration documentation."
                        ]
                    },
                    {
                        title: "What are the features of the International Immersion?",
                        content: [
                            "Some unique features of the international immersion include:",
                            "- International Networking Opportunities",
                            "- Leadership Dialogues & Panel Discussions",
                            "- Cultural & Business Ecosystem Exposure"
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "The PGDMEx from IIM Visakhapatnam combines the institute's academic excellence with an industry-driven approach tailored for experienced professionals. It offers a comprehensive management curriculum enriched with real-world case studies, peer learning, and industry insights—delivered through a flexible format that includes online sessions and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will gain a deep understanding of Strategy, Finance, Leadership, and Digital Transformation. They will learn to make data-driven decisions, lead cross-functional teams effectively, and address contemporary business challenges with innovative, practical solutions. The program ensures a balance of conceptual clarity and actionable managerial skills."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes. The PGDMEx is designed for working professionals who wish to upskill without taking a career break. With weekend live sessions and a flexible blended learning format, participants can manage work, study, and personal commitments efficiently while engaging deeply with the program."
                        ]
                    }
                ]
            }
        ]
    },
    "accredian-genai-6-months": {
        templateId: "accredian_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the Accredian Generative AI Program about?",
                        content: [
                            "The Professional Certificate in Applied GenAI is a 6-month program offered by Accredian. It is designed to equip learners with core Applied GenAI skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 6 terms comprising 24 modules, covering all core aspects of GenAI: prompt engineering, GenAI in business, no-code tools. Learners will gain hands-on experience with 50+ GenAI tools such as ChatGPT, Perplexity, NotebookLM, and Gemini, along with other platforms used across business, design, and technology applications.",
                            "- **Duration:** 6 months",
                            "- **Learning Format:** 72+ hours of live online sessions",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available in case a session is missed"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants must hold a bachelor's degree in any discipline with a minimum of 50% marks. Prior work experience of 1 Year is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in Artificial Intelligence to enroll?",
                        content: [
                            "Prior Artificial Intelligence experience is not required."
                        ]
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "- Click the **Enroll Now** button at the top of the webpage.",
                            "- Fill the application form and pay the fees.",
                            "- Selected Candidates will receive Admission Confirmation Letter.",
                            "- If selected, you will receive your offer letter."
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from Accredian after completing the program?",
                        content: [
                            "Yes. Participants will receive a certificate from Accredian upon fulfilling all program requirements."
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a certificate awarded by Accredian and recognized by employers."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by industry experts with extensive hands-on experience."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and a capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as AI/ML Engineer, Data Scientist, AI Product Manager, Business Intelligence Analyst, AI Consultant, etc."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,38,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "The Generative AI Program from Accredian combines academic excellence with an industry-driven approach tailored for experienced professionals. It offers a comprehensive GenAI curriculum enriched with real-world case studies, peer learning, and industry insights—delivered in a flexible online format designed to fit your schedule."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will gain a deep understanding of prompt engineering, GenAI in business, no-code tools. They will learn to make data-driven decisions and address contemporary business challenges with innovative, practical solutions. The program ensures a balance of conceptual clarity and actionable GenAI skills."
                        ]
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Graduates can pursue leadership and managerial roles such as AI/ML Engineer, Data Scientist, AI Product Manager, Business Intelligence Analyst, AI Consultant, etc."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes. The Generative AI Program is designed for working professionals who wish to upskill without taking a career break. With weekend live sessions and a flexible blended learning format, participants can manage work, study, and personal commitments efficiently while engaging deeply with the program."
                        ]
                    }
                ]
            }
        ]
    },
    "accredian-genai-4-months": {
        templateId: "accredian_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the Accredian Generative AI Program about?",
                        content: [
                            "The Advanced Certificate in Applied GenAI is a 4-month program offered by Accredian. It is designed to equip learners with core Applied GenAI skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 4 terms comprising 16 modules, covering all core aspects of GenAI: prompt engineering, GenAI in business, no-code tools. Learners will gain hands-on experience with 30+ GenAI tools such as ChatGPT, Perplexity, NotebookLM, and Gemini, along with other platforms used across business, design, and technology applications.",
                            "- **Duration:** 4 months",
                            "- **Learning Format:** 48+ hours of live online sessions",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available in case a session is missed"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants must hold a bachelor's degree in any discipline with a minimum of 50% marks. Prior work experience of 1 Year is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in Artificial Intelligence to enroll?",
                        content: [
                            "Prior Artificial Intelligence experience is not required."
                        ]
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "- Click the **Enroll Now** button at the top of the webpage.",
                            "- Fill the application form and pay the fees.",
                            "- Selected Candidates will receive Admission Confirmation Letter.",
                            "- If selected, you will receive your offer letter."
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from Accredian after completing the program?",
                        content: [
                            "Yes. Participants will receive a certificate from Accredian upon fulfilling all program requirements."
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a certificate awarded by Accredian and recognized by employers."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by industry experts with extensive hands-on experience."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and a capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as AI/ML Engineer, Data Scientist, AI Product Manager, Business Intelligence Analyst, AI Consultant, etc."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 98,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "The Generative AI Program from Accredian combines academic excellence with an industry-driven approach tailored for experienced professionals. It offers a comprehensive GenAI curriculum enriched with real-world case studies, peer learning, and industry insights—delivered in a flexible online format designed to fit your schedule."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will gain a deep understanding of prompt engineering, GenAI in business, no-code tools. They will learn to make data-driven decisions and address contemporary business challenges with innovative, practical solutions. The program ensures a balance of conceptual clarity and actionable GenAI skills."
                        ]
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Graduates can pursue leadership and managerial roles such as AI/ML Engineer, Data Scientist, AI Product Manager, Business Intelligence Analyst, AI Consultant, etc."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes. The Generative AI Program is designed for working professionals who wish to upskill without taking a career break. With weekend live sessions and a flexible blended learning format, participants can manage work, study, and personal commitments efficiently while engaging deeply with the program."
                        ]
                    }
                ]
            }
        ]
    },
    iiml_egmp: {
        templateId: "iiml_egmp_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Lucknow General Management Program about?",
                        content: [
                            "The Executive General Management Program is an 11-month program offered by IIM Lucknow. It is designed to equip learners with core General Management skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 11 Months, comprising 17 Modules, covering all core aspects of General Management: Strategy, Finance, and Digital Transformation.",
                            "- **Duration:** 11 Months",
                            "- **Learning Format:** 186+ Hours of live online sessions, with study materials available up to 3 months from the class delivery, at the faculty's discretion",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 1+ is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in General Management to enroll?",
                        content: [
                            "Prior General Management experience is not mandatory."
                        ]
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "- Click the **`Enroll Now`** button at the top of the webpage.",
                            "- Fill the application form and pay the fees.",
                            "- Selected Candidates will receive an Admission Confirmation Letter from the institute."
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Lucknow after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Lucknow upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 75% or above.",
                            "",
                            "- **Participation Certificate will be issued if:** Attendance is below 75% and above 40% (no Completion Certificate in this case)",
                            "",
                            "- **No Completion or Participation Certificate will be issued if:** Attendance is below 40%",
                            "",
                            "- **Physical Copy of Program Completion Certificate:** Applicable for campus immersion participants, subject to minimum attendance."
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Lucknow."
                        ]
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with IIM Lucknow?",
                        content: [
                            "Yes. Participants can opt for Executive Alumni Status by paying a one-time fee of INR 10,000 + GST for a lifetime membership of IIML Executive Alumni Status, payable directly to IIM Lucknow upon program completion."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Lucknow confirming my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Lucknow faculty and industry experts with extensive hands-on experience."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and a capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 4,25,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program has two campus immersions of 5 days each."
                        ]
                    },
                    {
                        title: "What does the IIM Lucknow campus immersion include, and how is it scheduled?",
                        content: [
                            "Two campus immersions of 5 days each at IIM Lucknow, included in the program fee.",
                            "- Food and accommodation are included in the program fee",
                            "- Travel cost is not included and must be arranged by the participant",
                            "- IIM Lucknow will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Lucknow's academic credibility with Accredian's practical support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Strategy, Finance, and Digital Transformation, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ]
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Graduates can explore roles such as General Manager, Operations Manager, Business Development Manager, Sales Manager, Project Manager, etc."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions and flexible online learning, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },
    spj_hr: {
        templateId: "spj_hr_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the SP Jain School of Global Management Strategic HR Leadership Program about?",
                        content: [
                            "The Executive Program in Strategic HR Leadership is a 6-month program offered by SP Jain School of Global Management. It is designed to equip learners with core Human Resource skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 6 months comprising 7 modules, covering all core aspects of Human Resource: HR Strategy, Analytics, and GenAI.",
                            "- **Duration:** 6 months",
                            "- **Learning Format:** 72+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in Human Resource to enroll?",
                        content: [
                            "No. Prior Human Resource experience is not mandatory."
                        ]
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "- Click the **'Enroll Now'** button at the top of the webpage.",
                            "- Fill the application form and pay the fees.",
                            "- Selected Candidates will receive an Admission Confirmation Letter from the institute."
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from SP Jain School of Global Management after completing the program?",
                        content: [
                            "Participants will receive a Certificate from SP Jain School of Global Management upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 75% or above, along with Project participation and mandatory Assessments"
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and how is it recognized by employers?",
                        content: [
                            "This is a Certificate program from SP Jain School of Global Management, one of India's most reputed B-schools, and is widely recognized by employers across industries."
                        ]
                    },
                    {
                        title: "Will I get any alumni benefits or networking opportunities with SP Jain School of Global Management?",
                        content: [
                            "Yes. Participants will receive SP Jain School of Global Management Executive Alumni Status. It is included in the program fees."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official confirmation from SP Jain School of Global Management for my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching in the program?",
                        content: [
                            "The program is taught by SP Jain School of Global Management faculty and industry experts."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, simulations)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 4 dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles, industries, or leadership opportunities can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Chief Human Resources Officer (CHRO), HR Director, Talent Management Head, Learning and Development Director, Organizational Development Consultant, etc."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,60,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines SP Jain School of Global Management's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in HR Strategy, Analytics, and GenAI, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },
    spj_pm: {
        templateId: "spj_pm_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the SP Jain School of Global Management Executive Program in Strategic Project Management & Leadership about?",
                        content: [
                            "The Executive Program in Strategic Project Management & Leadership is a 6-month program offered by SP Jain School of Global Management. It is designed to equip learners with core Project Management skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 6 months comprising 15 modules, covering all core aspects of Project Planning, Risk Management, and Project Procurement.",
                            "- **Duration:** 6 months",
                            "- **Learning Format:** 72+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in Project Management to enroll?",
                        content: [
                            "No. Prior Project Management experience is not mandatory."
                        ]
                    },
                    {
                        title: "How do I apply for the program?",
                        content: [
                            "- Click the **'Enroll Now'** button at the top of the webpage.",
                            "- Fill the application form and pay the fees.",
                            "- Selected Candidates will receive an Admission Confirmation Letter from the institute."
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from SP Jain School of Global Management after completing the program?",
                        content: [
                            "Participants will receive a Certificate from SP Jain School of Global Management upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 75% or above, along with Project participation and mandatory Assessments"
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and how is it recognized by employers?",
                        content: [
                            "This is a Certificate program from SP Jain School of Global Management, one of India's most reputed B-schools, and is widely recognized by employers across industries."
                        ]
                    },
                    {
                        title: "Will I get any alumni benefits or networking opportunities with SP Jain School of Global Management?",
                        content: [
                            "Yes. Participants will receive SP Jain School of Global Management Executive Alumni Status. It is included in the program fees."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official confirmation from SP Jain School of Global Management for my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching in the program?",
                        content: [
                            "The program is taught by SP Jain School of Global Management faculty and industry experts."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, simulations)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 4 dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles, industries, or leadership opportunities can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Project Manager, Program Manager, Project Coordinator, Project Analyst, Project Consultant, etc."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,25,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines SP Jain School of Global Management's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Project Planning, Risk Management, and Project Procurement, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },
    spj_genai: {
        templateId: "spj_genai_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the SP Jain School of Global Management Executive Program in Generative AI & Agentic AI for Leaders about?",
                        content: [
                            "The Executive Program in Generative AI & Agentic AI for Leaders is a 7-month program offered by SP Jain School of Global Management. It is designed to equip learners with core Artificial Intelligence skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 7 months comprising 8 modules, covering all core aspects of GenAI Strategy, Applied Tools, & Leadership-Driven Transformation.",
                            "- **Duration:** 7 months",
                            "- **Learning Format:** 84+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in Artificial intelligence to enroll?",
                        content: [
                            "No. Prior Artificial intelligence experience is not mandatory."
                        ]
                    },
                    {
                        title: "How do I apply for the program?",
                        content: [
                            "- Click the **'Enroll Now'** button at the top of the webpage.",
                            "- Fill the application form and pay the fees.",
                            "- Selected Candidates will receive an Admission Confirmation Letter from the institute."
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from SP Jain School of Global Management after completing the program?",
                        content: [
                            "Participants will receive a Certificate from SP Jain School of Global Management upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 75% or above, along with Project participation and mandatory Assessments"
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and how is it recognized by employers?",
                        content: [
                            "This is a Certificate program from SP Jain School of Global Management, one of India’s most reputed B-schools, and is widely recognized by employers across industries."
                        ]
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with SP Jain Global?",
                        content: [
                            "Yes. Participants will receive SP Jain Global Executive Alumni Status. It is included in the program fees"
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official confirmation from SP Jain School of Global Management for my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching in the program?",
                        content: [
                            "The program is taught by SP Jain School of Global Management faculty and industry experts."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, simulations)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 4 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles, industries, or leadership opportunities can I target after completing this program?",
                        content: [
                            "Students can explore roles such as GenAI Program/Transformation Manager, AI Product Manager, AI Project Lead, AI Strategy Consultant, AI Solutions Architect, Automation & Process Improvement Lead, etc."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,60,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines SP Jain School of Global Management's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in GenAI Strategy, Applied Tools, & Leadership-Driven Transformation, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },
    spj_applied_genai: {
        templateId: "spj_applied_genai_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the SP Jain School of Global Management Professional Certificate in Applied Generative AI about?",
                        content: [
                            "The Professional Certificate in Applied Generative AI is a 4-month program offered by SP Jain School of Global Management. It is designed to equip learners with core Artificial Intelligence skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 4 months comprising 4 modules, covering all core aspects of Generative AI Tools, Workflow Automation, and Real-World Enterprise Use Cases.",
                            "- **Duration:** 4 months",
                            "- **Learning Format:** 48+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in Artificial intelligence to enroll?",
                        content: [
                            "No. Prior Artificial intelligence experience is not mandatory."
                        ]
                    },
                    {
                        title: "How do I apply for the program?",
                        content: [
                            "- Click the **'Enroll Now'** button at the top of the webpage.",
                            "- Fill the application form and pay the fees.",
                            "- Selected Candidates will receive an Admission Confirmation Letter from the institute."
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from SP Jain School of Global Management after completing the program?",
                        content: [
                            "Participants will receive a Certificate from SP Jain School of Global Management upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 75% or above, along with Project participation and mandatory Assessments"
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and how is it recognized by employers?",
                        content: [
                            "This is a Certificate program from SP Jain School of Global Management, one of India's most reputed B-schools, and is widely recognized by employers across industries."
                        ]
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with SP Jain Global?",
                        content: [
                            "Yes. Participants will receive SP Jain Global Executive Alumni Status. It is included in the program fees"
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official confirmation from SP Jain School of Global Management for my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching in the program?",
                        content: [
                            "The program is taught by SP Jain School of Global Management faculty and industry experts."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, simulations)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 4 dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles, industries, or leadership opportunities can I target after completing this program?",
                        content: [
                            "Students can explore roles such as GenAI Program/Transformation Manager, AI Product Manager, AI Project Lead, AI Strategy Consultant, AI Solutions Architect, Automation & Process Improvement Lead, etc."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,39,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines SP Jain School of Global Management's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Generative AI Tools, Workflow Automation, and Real-World Enterprise Use Cases, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },

    iith_strategic_project_management: {
        templateId: "iith_strategic_project_management_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the Department of Entrepreneurship and Management, IIT Hyderabad Professional Certificate Program in Strategic Project Management about?",
                        content: [
                            "The Professional Certificate Program in Strategic Project Management is a 6-month program offered by Department of Entrepreneurship and Management, IIT Hyderabad, in collaboration with Accredian. It is designed to equip learners with core project management skills, hands-on exposure to tools, and practical learning experiences, with a focus on emerging areas like Generative AI."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 8 modules, covering all core aspects of project management: strategy, design, development, launch, growth, and AI-driven innovation.",
                            "- **Duration:** 6 months",
                            "- **Learning Format:** 72+ hours of live online sessions, with recordings available for 3 years from the batch start date",
                            "- **Class Timings:** 3 PM – 6 PM IST on Saturdays",
                            "- **Flexibility:** Recordings available in case a session is missed"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline with more than 50% marks. 1+ year of work experience is preferred, but can also be considered on an exceptional basis."
                        ]
                    },
                    {
                        title: "Do I need prior experience in project management or technology to enroll?",
                        content: [
                            "No prior project management experience is required. The program covers fundamentals as well as advanced topics."
                        ]
                    },
                    {
                        title: "How do I apply for the program?",
                        content: [
                            "You can apply through Accredian's application portal at: https://accredian.com/programs/iith-professional-certificate-program-in-strategic-project-management"
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from Department of Entrepreneurship and Management, IIT Hyderabad after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from Department of Entrepreneurship and Management, IIT Hyderabad, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 70% and above",
                            "- **Participation Certificate will be issued if:** Attendance is below 70% (no Completion Certificate in this case)"
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by Department of Entrepreneurship and Management, IIT Hyderabad."
                        ]
                    },
                    {
                        title: "Will I get any alumni benefits or networking opportunities with Department of Entrepreneurship and Management, IIT Hyderabad?",
                        content: [
                            "No, Department of Entrepreneurship and Management, IIT Hyderabad alumni status will not be conferred. However, learners can network with peers and industry experts during the program."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from Department of Entrepreneurship and Management, IIT Hyderabad confirming my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by top Department of Entrepreneurship and Management, IIT Hyderabad faculty, with Master Class sessions led by industry experts."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, industry immersion sessions, case studies, and a capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 4 dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career mentoring is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Graduates can explore roles such as Project Manager, Associate Project Manager, Project Analyst, and Business Strategist across tech, consulting, e-commerce, and other industries."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is ₹1,80,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "What does the Department of Entrepreneurship and Management, IIT Hyderabad campus immersion include, and how is it scheduled?",
                        content: [
                            "A 2-day campus immersion at Department of Entrepreneurship and Management, IIT Hyderabad is available at an additional cost of ₹6,000 + GST for both days.",
                            "",
                            "- **Food and accommodation** are included in the immersion fee",
                            "- **Travel cost** is not included and must be arranged by the participant",
                            "- Department of Entrepreneurship and Management, IIT Hyderabad will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines Department of Entrepreneurship and Management, IIT Hyderabad's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Project Planning, Stakeholder Management, Risk Management, and Strategic Execution, enabling them to make informed project decisions, lead cross-functional teams, and deliver practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and the skills to successfully manage and deliver projects end-to-end."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },
    iith_design_thinking_innovation: {
        templateId: "iith_design_thinking_innovation_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the Department of Entrepreneurship and Management, IIT Hyderabad Executive Certification Program in Design Thinking & Innovation for Strategic Leadership about?",
                        content: [
                            "The Executive Certification Program in Design Thinking & Innovation for Strategic Leadership is a 6-month program offered by Department of Entrepreneurship and Management, IIT Hyderabad in collaboration with Accredian. It is designed to equip learners with core Design Thinking skills, hands-on exposure to innovation frameworks, and practical learning experiences, with a focus on driving strategic leadership and creative problem-solving in real-world business scenarios."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 5 modules, covering all core aspects of Design Thinking: from strategy, design, and development to launch, growth, and AI-driven innovation.",
                            "- **Duration:** 6 months",
                            "- **Learning Format:** 72+ hours of live online sessions, with recordings available for 3 years from the batch start date",
                            "- **Class Timings:** 3 PM – 6 PM IST on Saturdays",
                            "- **Flexibility:** Recordings available in case a session is missed"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline with more than 50% marks. 1+ year of work experience is preferred, but can also be considered on an exceptional basis."
                        ]
                    },
                    {
                        title: "Do I need prior experience in Design Thinking or technology to enroll?",
                        content: [
                            "No prior experience in Design Thinking or innovation is required. The program covers everything from the fundamentals of Design Thinking to advanced strategies for Innovation and Strategic Leadership, making it suitable for both beginners and experienced professionals."
                        ]
                    },
                    {
                        title: "How do I apply for the program?",
                        content: [
                            "You can apply through Accredian's application portal at: https://accredian.com/programs/iith-executive-program-in-design-thinking-and-innovation-for-strategic-leadership"
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from Department of Entrepreneurship and Management, IIT Hyderabad after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from Department of Entrepreneurship and Management, IIT Hyderabad, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 70% and above",
                            "- **Participation Certificate will be issued if:** Attendance is below 70% (no Completion Certificate in this case)"
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is an executive certificate program recognized by employers and issued by Department of Entrepreneurship and Management, IIT Hyderabad."
                        ]
                    },
                    {
                        title: "Will I get any alumni benefits or networking opportunities with Department of Entrepreneurship and Management, IIT Hyderabad?",
                        content: [
                            "No, Department of Entrepreneurship and Management, IIT Hyderabad alumni status will not be conferred. However, learners can network with peers and industry experts during the program."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from Department of Entrepreneurship and Management, IIT Hyderabad confirming my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by top Department of Entrepreneurship and Management, IIT Hyderabad faculty, with Master Class sessions led by industry experts."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, industry immersion sessions, case studies, and a capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 4 dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career mentoring is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Graduates can explore roles such as Design Thinking Consultant, Innovation Strategist, Product Designer, UX Lead, and Business Transformation Manager across industries like tech, consulting, FMCG, e-commerce, healthcare, and more."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is ₹1,79,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "What does the Department of Entrepreneurship and Management, IIT Hyderabad campus immersion include, and how is it scheduled?",
                        content: [
                            "A 2-day campus immersion at Department of Entrepreneurship and Management, IIT Hyderabad is available at an additional cost of ₹6,000 + GST for both days.",
                            "",
                            "- **Food and accommodation** are included in the immersion fee",
                            "- **Travel cost** is not included and must be arranged by the participant",
                            "- Department of Entrepreneurship and Management, IIT Hyderabad will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines Department of Entrepreneurship and Management, IIT Hyderabad's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Design Thinking, Innovation Frameworks, Strategic Leadership, and Creative Problem-Solving, enabling them to tackle complex business challenges, lead innovation-driven teams, and apply human-centered solutions to real-world scenarios. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and the practical skills to drive meaningful change."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },
    iiml_strategic_project_management_leadership: {
        templateId: "iiml_strategic_project_management_leadership_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIML Executive Program in Strategic Project Management & Leadership Program about?",
                        content: [
                            "The Executive Program in Strategic Project Management & Leadership is a 10-month program offered by IIM Lucknow, designed to strengthen strategic thinking, project leadership capabilities, and decision-making skills. The program blends academic rigor with practical application through case studies, simulations, CXO sessions, and a capstone project, equipping professionals to lead and manage complex projects with strategic precision."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across multiple modules covering all core aspects of the Executive Program in Strategic Project Management & Leadership: including strategy, leadership development, organizational transformation, digital business, finance, and business simulations.",
                            "- **Duration:** 10 months",
                            "- **Learning Format:** 120+ hours of live online sessions, with recordings available for 3 months from the class delivery",
                            "- **Class Timings:** 9 AM – 12 PM on Sundays",
                            "- **Flexibility:** Recordings available in case a session is missed"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants must be Graduates or Postgraduates with a minimum of 50% marks (including Diploma equivalents). Additionally, a minimum of 1 year of work experience as of the Programme Start Date (Technical Orientation Date) is required. Screening and selection will be conducted by IIML based on a mandatory Statement of Purpose (SOP), along with the quality and relevance of the applicant's academic and professional background."
                        ]
                    },
                    {
                        title: "Do I need prior experience in strategy or leadership roles to enroll?",
                        content: [
                            "No specific prior experience in strategy or leadership is required. However, a minimum of 1 year of work experience is mandatory. Selection is based on your SOP, academic background, and overall work experience, as evaluated by IIM Lucknow."
                        ]
                    },
                    {
                        title: "How do I apply for the program?",
                        content: [
                            "You can apply through Accredian's application portal at: https://accredian.com/programs/iiml-executive-program-in-strategic-project-management-leadership"
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIML after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Lucknow upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** The participant maintains a minimum attendance of 75% and achieves a Cumulative Overall Percentage of Marks (COPM) of 50% or above",
                            "- **Participation Certificate will be issued if:** Attendance is below 75% and/or COPM (Cumulative Overall Percentage of Marks) is below 50% (no Completion Certificate in this case)"
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and how is it recognized by employers?",
                        content: [
                            "This is a Certificate program from IIM Lucknow, one of India's most reputed IIMs, and is widely recognized by employers across industries."
                        ]
                    },
                    {
                        title: "Will I get any alumni benefits or networking opportunities with IIML?",
                        content: [
                            "Yes. Participants can obtain IIML Executive Education Alumni Status for an additional fee of ₹10,000 + GST (not included in the program fees) for a lifetime membership, payable directly to IIM Lucknow upon completion."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official confirmation from IIML for my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching in the program?",
                        content: [
                            "The program is taught by IIML Faculty and Industry Experts."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, simulations)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, industry immersion sessions, case studies, and a capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring or support available?",
                        content: [
                            "Doubt resolution is done during live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "**No placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career assistance sessions and career support services are not included in this specific program."
                        ]
                    },
                    {
                        title: "What kind of roles, industries, or leadership opportunities can I target after completing this program?",
                        content: [
                            "Graduates of this program can explore project leadership and strategic management roles across a wide range of industries, such as consulting, IT, BFSI, infrastructure, manufacturing, FMCG, and emerging tech sectors."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is ₹2,42,500 + GST.",
                            "- 12 Months EMI available. Standard EMI options are available for more than 12 months (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "No, we do not offer any scholarships or discounts for this program."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "What does the IIML campus immersion include, and how is it scheduled?",
                        content: [
                            "One campus immersion of 3 days at IIM Lucknow is **included in the program fee**.",
                            "",
                            "- **Food and accommodation** are included in the program fee",
                            "- **Travel cost** is not included and must be arranged by the participant",
                            "- IIML will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Lucknow's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop deep expertise in strategic execution, leadership development, digital business, and complex project delivery. This enables them to tackle critical business challenges, align project outcomes with organizational strategy, and apply robust management frameworks to real-world scenarios. The program's mix of academic rigor and hands-on business simulations ensures graduates leave with both conceptual clarity and the practical skills to drive impactful change."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },
    iiml_chief_digital_ai_officer_programme: {
        templateId: "iiml_chief_digital_ai_officer_programme_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the Chief Digital & AI Officer Programme (The CDAIO Program) about?",
                        content: [
                            "The Chief Digital & AI Officer Programme (The CDAIO Program) is an 11-month program offered by IIM Lucknow, designed to strengthen capabilities in digital transformation, AI strategy, and data-driven executive leadership. The program blends academic rigor with practical application through case studies, simulations, CXO sessions, and a capstone project, equipping professionals to lead enterprise-wide digital and AI initiatives with strategic precision."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across multiple modules covering all core aspects of the Chief Digital & AI Officer Programme: including digital transformation strategy, AI integration, data-driven decision making, organizational change management, technology investments, and business simulations.",
                            "- **Duration:** 11 months",
                            "- **Learning Format:** 132+ hours of live online sessions, with recordings available for 3 months from the class delivery",
                            "- **Class Timings:** 10 AM – 1 PM on Sundays",
                            "- **Flexibility:** Recordings available in case a session is missed"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants must be Graduates or Postgraduates with a minimum of 50% marks (including Diploma equivalents). Additionally, a minimum of 7 years of work experience as of the Programme Start Date (Technical Orientation Date) is required. Screening and selection will be conducted by IIML based on a mandatory Statement of Purpose (SOP), along with the quality and relevance of the applicant's academic and professional background."
                        ]
                    },
                    {
                        title: "Do I need prior experience in strategy or leadership roles to enroll?",
                        content: [
                            "While specific prior experience in C-level strategy or leadership is not strictly required, a minimum of 7 years of overall work experience is mandatory. Selection is based on your SOP, academic background, and the quality and relevance of your work experience, as evaluated by IIM Lucknow."
                        ]
                    },
                    {
                        title: "How do I apply for the program?",
                        content: [
                            "You can apply through Accredian's application portal at: https://accredian.com/programs/iiml-chief-digital-ai-officer-programme-the-cdaio-program"
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIML after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Lucknow upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** The participant maintains a minimum attendance of 75% and achieves a Cumulative Overall Percentage of Marks (COPM) of 50% or above",
                            "- **Participation Certificate will be issued if:** Attendance is below 75% and/or COPM (Cumulative Overall Percentage of Marks) is below 50% (no Completion Certificate in this case)"
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and how is it recognized by employers?",
                        content: [
                            "This is a Certificate program from IIM Lucknow, one of India's most reputed IIMs, and is widely recognized by employers across industries."
                        ]
                    },
                    {
                        title: "Will I get any alumni benefits or networking opportunities with IIML?",
                        content: [
                            "Yes. Participants can obtain IIML Executive Education Alumni Status for an additional fee of ₹10,000 + GST (not included in the program fees) for a lifetime membership, payable directly to IIM Lucknow upon completion."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official confirmation from IIML for my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching in the program?",
                        content: [
                            "The program is taught by IIML Faculty and Industry Experts."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, simulations)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, industry immersion sessions, case studies, CXO interactions, and a capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring or support available?",
                        content: [
                            "Doubt resolution is done during live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "**No placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career assistance sessions and career support services are not included in this specific program."
                        ]
                    },
                    {
                        title: "What kind of roles, industries, or leadership opportunities can I target after completing this program?",
                        content: [
                            "Graduates of this program can explore senior digital leadership and AI strategy roles, such as Chief Digital Officer or Head of AI, across a wide range of industries, including consulting, IT, BFSI, infrastructure, manufacturing, FMCG, and emerging tech sectors."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is ₹4,52,500 + GST.",
                            "- 12 Months EMI available. Standard EMI options are available for more than 12 months (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "No, we do not offer any scholarships, discounts, or referral benefits for this program."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "What does the IIML campus immersion include, and how is it scheduled?",
                        content: [
                            "One campus immersion of 3 days at IIM Lucknow is **included in the program fee**.",
                            "",
                            "- **Food and accommodation** are included in the program fee",
                            "- **Travel cost** is not included and must be arranged by the participant",
                            "- IIML will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Lucknow's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop deep expertise in digital transformation, AI strategy, data-driven leadership, and enterprise-wide technology adoption. This enables them to tackle critical business challenges, align digital and AI initiatives with organizational strategy, and apply advanced technology frameworks to real-world scenarios. The program's mix of academic rigor and hands-on business simulations ensures graduates leave with both conceptual clarity and the practical skills to drive impactful change."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },
    xlri_cto_program: {
        templateId: "xlri_cto_program_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the XLRI CTO Program about?",
                        content: [
                            "The Executive Development Program for Emerging Chief Technology Officers (CTO Programme) from XLRI Jamshedpur is an 11-month program designed to develop technology leadership, digital transformation capabilities, and strategic decision-making skills. The program enables professionals to lead large-scale technology initiatives, align technology strategy with business goals, and drive innovation and digital transformation. It combines academic rigor with practical exposure through case studies, simulations, CXO coaching, and a capstone project."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 4 pillars and 12 modules, covering key areas of technology leadership such as digital transformation and innovation, technology strategy and leadership, enterprise systems and architecture, and data-driven decision-making.",
                            "- **Duration:** 11 months",
                            "- **Learning Format:** 132+ hours of live online sessions, with recordings available for 3 years from the program start date",
                            "- **Class Timings:** 9 AM – 12 PM IST on Sundays",
                            "- **Flexibility:** Recordings available in case a session is missed"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Classes are conducted on weekends (Sundays), recordings are available for up to 3 years post program start, and schedules are shared in advance for planning."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have Graduation (10+2+3) or equivalent from a recognized institution. A preferred work experience of 10+ years is recommended."
                        ]
                    },
                    {
                        title: "Do I need prior experience in leadership or technical roles to enroll?",
                        content: [
                            "Yes, this program is designed for experienced professionals. It is ideal for senior technology professionals, engineering leaders and managers, and professionals aspiring for CTO or senior leadership roles."
                        ]
                    },
                    {
                        title: "How do I apply for the program?",
                        content: [
                            "You can apply through Accredian's application portal at: https://accredian.com/programs/xlri-cto-program"
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from XLRI after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from XLRI & XLEAD upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 70% or above, along with Project participation and Assessments",
                            "- **Participation Certificate will be issued if:** Attendance is below 70% and above 50% (no Completion Certificate in this case)",
                            "- **No Certificate will be issued if:** Attendance is below 50%"
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and how is it recognized by employers?",
                        content: [
                            "This is a professional certificate program from XLRI & XLEAD, one of India's most reputed B-schools, and is widely recognized by employers across industries."
                        ]
                    },
                    {
                        title: "Will I get any alumni benefits or networking opportunities with XLRI?",
                        content: [
                            "Yes. Participants can opt for Executive Alumni Status by paying a one-time fee of ₹20,000 + GST upon program completion.",
                            "",
                            "- Access to alumni network",
                            "- Invitations to alumni events",
                            "- Learning resources and webinars",
                            "- Discounts on future programs"
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official confirmation from XLRI for my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching in the program?",
                        content: [
                            "The program is taught by XLRI Faculty and Industry Experts."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, simulations)?",
                        content: [
                            "Learning includes live interactive sessions, case studies, simulations, CXO coaching sessions, industry immersion sessions, and a capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring or support available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career mentoring is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles, industries, or leadership opportunities can I target after completing this program?",
                        content: [
                            "Graduates can explore roles across industries like IT, consulting, BFSI, startups, and digital enterprises."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is ₹3,30,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "Refunds are governed by the official policy. Details are shared during the application process. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "Refunds are not applicable after the defined cooling-off period."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "What does the XLRI campus immersion include, and how is it scheduled?",
                        content: [
                            "The program includes **2 campus immersions of 2 days each** at XLRI, included in the program fee.",
                            "",
                            "- **Food and accommodation** are included in the program fee",
                            "- **Travel cost** is not included and must be arranged by the participant",
                            "- XLRI will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines XLRI's academic excellence with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will build strategic technology leadership skills, learn to drive digital transformation initiatives, understand enterprise systems and innovation, lead high-performing technology teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },
    iimr_senior_management_program: {
        templateId: "iimr_senior_management_program_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIMR Senior Management Program about?",
                        content: [
                            "The Senior Management Program from IIM Ranchi is a 12-month program designed to strengthen strategic thinking, leadership capabilities, and decision-making skills. The program blends academic rigor with practical application through case studies, simulations, CXO sessions, and a capstone project."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across multiple modules covering all core aspects of senior management: including strategy, leadership development, organizational transformation, digital business, finance, and business simulations.",
                            "- **Duration:** 12 months",
                            "- **Learning Format:** 144+ hours of live online sessions",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings available in case a session is missed"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline.  Prior work experience of 10+ years is preferred.",
                            "Diploma Holders are eligible to apply."
                        ]
                    },
                    {
                        title: "Do I need prior experience in strategy or leadership roles to enroll?",
                        content: [
                            "No. Prior management or leadership experience is not mandatory."
                        ]
                    },
                    {
                        title: "How do I apply for the program?",
                        content: [
                            "You can apply through Accredian's application portal at: {applyLink}"
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Ranchi after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Ranchi upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 70% or above"
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and how is it recognized by employers?",
                        content: [
                            "This is a Certificate program from IIM Ranchi, one of India's most reputed IIMs, and is widely recognized by employers across industries."
                        ]
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with IIM Ranchi?",
                        content: [
                            "Yes. Participants will receive IIM Ranchi Executive Alumni Status. It is included in the program fees."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official confirmation from IIM Ranchi for my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching in the program?",
                        content: [
                            "The program is taught by IIM Ranchi Faculty."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, simulations)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, industry immersion sessions, case studies, and a capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring or support available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career mentoring is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles, industries, or leadership opportunities can I target after completing this program?",
                        content: [
                            "Graduates can explore leadership roles across industries such as consulting, IT, BFSI, manufacturing, FMCG, and emerging tech sectors."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is ₹2,60,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "What does the IIM Ranchi campus immersion include, and how is it scheduled?",
                        content: [
                            "One campus immersion of 3 days at IIM Ranchi is **included in the program fee**.",
                            "",
                            "- **Food and accommodation** are included in the program fee",
                            "- **Travel cost** is not included and must be arranged by the participant",
                            "- IIM Ranchi will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "Learner Reviews & Why Choose This Program",
                questions: [
                    {
                        title: "What do past learners say about this program?",
                        content: [
                            "Past learners have highlighted the program's structured curriculum, practical projects, and the opportunity to learn from industry experts. Many found the sessions on corporate business and leadership particularly valuable."
                        ]
                    },
                    {
                        title: "Why choose this program over other senior management programs?",
                        content: [
                            "This program combines IIM Ranchi's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    }
                ]
            }
        ]


    },

    iim_amritsar_smp: {
        templateId: "iim_amritsar_smp_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Amritsar Senior Management Program about?",
                        content: [
                            "The Senior Management Program is a 10 months program offered by IIM Amritsar. It is designed to equip learners with core Strategic Senior Management & Business Leadership skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 10 months comprising 9 modules, covering all core aspects of Senior management including Strategic Leadership, Corporate Strategy, Financial Strategy, Customer & Market Leadership, Operations & Supply Chain, People Leadership, Global Strategy, Digital Transformation, and Generative AI.",
                            "- **Duration:** 10 months",
                            "- **Learning Format:** 120+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in Senior Management to enroll?",
                        content: [
                            "Prior Senior Management experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Amritsar after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Amritsar , upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** attendance is 70% or above.",
                            "",
                            "- **Participation Certificate:** will be issued if attendance is below 70% (no Completion Certificate).",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy)."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Amritsar."
                        ],
                    },
                    {
                        title: "Will I get any Executive alumni status or networking opportunities with IIM Amritsar?",
                        content: [
                            "Yes. Participants will receive IIM Amritsar Executive Alumni Status. It is included in the program fees"
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Amritsar confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Amritsar faculty and industry experts with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Chief Executive Officer (CEO), Chief Operating Officer (COO), Chief Financial Officer (CFO), Chief Marketing Officer (CMO), Senior Vice President (SVP), etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 2,10,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program has Campus Immersion of 2 days at a fee of INR 14,000 + GST, payable at the time of the scheduled immersion dates. Advance notice of the immersion dates will be provided."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Amritsar's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Strategic Leadership, Corporate Strategy, Financial Strategy, Customer & Market Leadership, Operations & Supply Chain, People Leadership, Global Strategy, Digital Transformation, and Generative AI, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iiml_chro: {
        templateId: "iiml_chro_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Lucknow Chief Human Resources Officer Programme (The CHRO Program) about?",
                        content: [
                            "The Chief Human Resources Officer Programme (The CHRO Program) is a 10 months program offered by IIM Lucknow . It is designed to equip learners with core Strategic HR Leadership, Talent Strategy, Leadership Development, Workforce Planning, Digital HR, People Analytics, and AI and Generative AI skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 10 months comprising 14 modules, covering all core aspects of Strategic HR Leadership, Business Excellence, Organization Design and Change Leadership, Talent Strategy and Workforce Planning, Leadership Development and Succession Planning, Performance and Rewards, Culture and Employee Experience, Financial Leadership, Digital HR and People Analytics, and AI and Generative AI.",
                            "- **Duration:** 10 months",
                            "- **Learning Format:** 126+ hours of live online sessions, with study materials available for up to 3 months from the class delivery, at the faculty's discretion",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 8 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in HR or a related field to enroll?",
                        content: [
                            "Prior HR or a related field experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Lucknow after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Lucknow , upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** participants maintain an attendance of 75% or above and achieve a Cumulative Overall Percentage of Marks (COPM) of 50% or above.",
                            "",
                            "- **Participation Certificate:** will be issued if attendance is below 75% and/or COPM is below 50% (no Completion Certificate).No Completion or Participation Certificate for attendance below 40%",
                            "",
                            "**Note**: Physical copies of the Program Completion Certificate are applicable for campus immersion participants, subject to meeting the minimum attendance requirement."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Lucknow"
                        ],
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with IIM Lucknow?",
                        content: [
                            "Yes. Participants will receive IIM Lucknow Executive Alumni Status upon program completion, for an additional fee of INR 10,000 + GST."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Lucknow confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Lucknow faculty and industry experts with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Chief Human Resources Officer (CHRO), HR Director, Senior HR Professional, HR Business Partner, Talent Leader, HR Consultant, and Business Leader, among others"
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 4,00,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program has One Campus Immersion of 3 days, with food and accommodation included, while travel expenses are not included. ."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Lucknow 's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Strategic HR Leadership, Talent Strategy and Workforce Planning, Leadership Development and Succession Planning,Culture and Employee Experience Strategy, Financial Leadership, Digital HR and People Analytics, and AI and Generative AI for CHROs , enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iit_jammu_leadership_ai: {
        templateId: "iit_jammu_leadership_ai_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIT Jammu Executive Program in Leadership with AI about?",
                        content: [
                            "The Leadership with AI is an 8 month program offered by IIT Jammu. It is designed to equip learners with core AI Leadership skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 8 months comprising 8 modules, covering all core aspects of AI Leadership, Generative AI, AI Strategy, and Agentic AI .",
                            "- **Duration:** 08 months",
                            "- **Learning Format:** 96+ hours of live online sessions, with study materials available for up to 6 months from the program completion date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in AI or technology to enroll?",
                        content: [
                            "Prior AI or technology experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIT Jammu after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIT Jammu, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** attendance is 70% or above.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only.Physical copy of the certificate is applicable to campus immersion participants subject to meeting the minimum attendance requirement."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIT Jammu."
                        ],
                    },
                    {
                        title: "Will I get any alumni status or networking opportunities with IIT Jammu?",
                        content: [
                            "No, alumni status will NOT be conferred. However, learners can network with peers and industry experts during the program."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIT Jammu confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIT Jammu faculty and industry experts with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Chief Executive Officer (CEO), Chief Digital Officer (CDO), Chief Technology Officer (CTO), Chief AI Officer (CAIO), Chief Operating Officer (COO), Chief Information Officer (CIO), Head of AI Strategy, Director of Digital Transformation, AI Product Manager, and Senior Vice President (SVP) etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,60,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program has One Campus Immersion of 3 days.Food and lodging will be provided for campus immersion participants with accommodation available in double occupancy rooms. Travel expenses are not included in the program fee."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIT Jammu's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in AI Leadership, Generative AI, AI Strategy, AI Product Management and Agentic AI enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iim_kashipur_coo: {
        templateId: "iim_kashipur_coo_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Kashipur Chief Operating Officer Program (The COO Program) about?",
                        content: [
                            "The Chief Operating Officer Program is a 12-month programme offered by IIM Kashipur.It is designed to equip learners with core Enterprise Operations & Strategic Leadership skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 12 months comprising 12 modules, covering all core aspects of Enterprise Leadership, Operations Strategy, Execution Excellence, Financial Leadership, Digital Transformation, Analytics, AI, Risk Governance, and Organizational Transformation.",
                            "- **Duration:** 12 months",
                            "- **Learning Format:** 144+ hours of live online sessions, with study materials available for 3 months post course completion",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 10 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in operations to enroll?",
                        content: [
                            "Prior operations experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Kashipur after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Kashipur, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** attendance is 75% or above and Overall Assessment Score is 50% or above .",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: The physical copy of the Program Completion Certificate is applicable to campus immersion participants who meet the minimum attendance requirement. ."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Kashipur."
                        ],
                    },
                    {
                        title: "Will I get any Executive alumni status or networking opportunities with IIM Kashipur?",
                        content: [
                            "Yes. Participants will receive IIM Kashipur Executive Alumni Status. It is included in the program fees"
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Kashipur confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Kashipur faculty with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Chief Executive Officer (CEO), Chief Operating Officer (COO), Chief Financial Officer (CFO), Chief Marketing Officer (CMO), Senior Vice President (SVP), etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 2,90,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program has One Campus Immersion of 3 days."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Kashipur's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Executive Leadership, Functional Leadership, Business Strategies, and Analytics, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iim_ranchi_chro: {
        templateId: "iim_ranchi_chro_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Ranchi Chief Human Resource Officer Programme (The CHRO Program) about?",
                        content: [
                            "The Chief Human Resource Officer Programme (The CHRO Program) is a 12 months program offered by IIM Ranchi. It is designed to equip learners with core strategic human resource management and organizational leadership skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 12 months comprising 14 modules, covering all core aspects of strategic human resource management, organizational leadership, talent management, workforce planning, performance management, employee engagement, organizational development, and HR transformation.",
                            "- **Duration:** 12 months",
                            "- **Learning Format:** 144+ hours of live online sessions, with study materials available for up to 1 year from the program completion date.",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 7 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in Human Resources to enroll?",
                        content: [
                            "Prior Human Resources experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Ranchi after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Ranchi, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** attendance is 70% or above.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy). However Physical certificates will be provided to campus immersion participants only, subject to minimum attendance."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Ranchi."
                        ],
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with IIM Ranchi?",
                        content: [
                            "Yes. Participants will receive IIM Ranchi Executive Alumni Status. It is included in the program fees."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Ranchi confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Ranchi Faculty with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Chief Human Resource Officer (CHRO), HR Director, Head of Human Resources, HR Business Partner, Talent Management Leader, Learning & Development Head, and Organizational Development Leader, etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 2,60,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program includes a 3-day campus immersion with food and lodging in double-occupancy rooms. Travel expenses are not included."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Ranchi's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Strategic Human Resource Management, Talent Management, Organizational Leadership, Workforce Planning, Performance Management, Employee Engagement, and HR Transformation, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iim_ranchi_leadership_ai: {
        templateId: "iim_ranchi_leadership_ai_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Ranchi Executive Program in Leadership with AI about?",
                        content: [
                            "The Executive Program in Leadership with AI is an 8 month program offered by IIM Ranchi. It is designed to equip learners with core AI-Driven Leadership and Strategic Decision-Making skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 8 months comprising 09 modules, covering all core aspects of AI-Driven Leadership, Generative AI, AI Strategy, AI Business Models, AI Product Strategy, Applied AI, AI Governance, AI Transformation, and Agentic AI.",
                            "- **Duration:** 08 months",
                            "- **Learning Format:** 96+ hours of live online sessions, with study materials available for up to 1 year from the program completion date.",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred.",
                            "Diploma Holders are eligible to apply."
                        ],
                    },
                    {
                        title: "Do I need prior experience in AI or technology to enroll?",
                        content: [
                            "Prior AI or technology experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Ranchi after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Ranchi, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** attendance is 70% or above.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy). However Physical certificates will be provided to campus immersion participants only, subject to minimum attendance."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Ranchi."
                        ],
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with IIM Ranchi?",
                        content: [
                            "Yes. Participants will receive IIM Ranchi Executive Alumni Status upon program completion, for an additional fee of INR 10,000 + GST."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Ranchi confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Ranchi Faculty with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as AI Strategy Leader, AI Transformation Manager, Digital Transformation Leader, AI Product Manager, Business Strategy Leader, Innovation Manager, and AI Program Manager, etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 2,10,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program includes a 2-day campus immersion with food and lodging in double-occupancy rooms. Travel expenses are not included."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Ranchi's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in AI-Driven Leadership, Generative AI, AI Strategy and Business Models, AI Product Strategy, Applied AI, AI Governance, AI Transformation, and Agentic AI, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iim_ranchi_genai_agentic_ai: {
        templateId: "iim_ranchi_genai_agentic_ai_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Ranchi Executive Program in Generative AI & Agentic AI for Leaders about?",
                        content: [
                            "The Executive Program in Generative AI & Agentic AI for Leaders is a 7 month program offered by IIM Ranchi. It is designed to equip learners with core Generative AI, Agentic AI, and AI Leadership skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 7 months comprising 08 modules, covering all core aspects of Generative AI, Agentic AI, AI Strategy, AI-Driven Decision-Making, AI Transformation, AI Governance, and the practical application of AI in business and leadership.",
                            "- **Duration:** 07 months",
                            "- **Learning Format:** 84+ hours of live online sessions, with study materials available for up to 1 year from the program completion date.",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred.",
                            "Diploma Holders are eligible to apply."
                        ],
                    },
                    {
                        title: "Do I need prior experience in Generative AI or Agentic AI to enroll?",
                        content: [
                            "Prior Generative AI or Agentic AI experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Ranchi after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Ranchi, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** attendance is 70% or above.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy).  However Physical certificates will be provided to campus immersion participants only, subject to minimum attendance."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Ranchi."
                        ],
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with IIM Ranchi?",
                        content: [
                            "Yes. Participants will receive IIM Ranchi Executive Alumni Status upon program completion, for an additional fee of INR 10,000 + GST."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Ranchi confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Ranchi Faculty with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Generative AI Strategy Leader, AI Transformation Leader, Agentic AI Program Manager, AI Innovation Leader, Generative AI Product Manager, Digital Transformation Manager, and AI Strategy Consultant, etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,80,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program includes a 2-day campus immersion with food and lodging in double-occupancy rooms. Travel expenses are not included."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Ranchi's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Generative AI, Agentic AI, AI Strategy and Transformation, AI-Driven Decision-Making, AI Governance, Responsible AI, and the Strategic Application of AI in Business, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iim_ranchi_strategic_hr: {
        templateId: "iim_ranchi_strategic_hr_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Ranchi Executive Program in Strategic HR Leadership about?",
                        content: [
                            "The Executive Program in Strategic HR Leadership is a 10 month program offered by IIM Ranchi. It is designed to equip learners with core Strategic Human Resource Management and HR Leadership skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 10 months comprising 11 modules, covering all core aspects of Strategic Human Resource Management, Talent Management, Organizational Development, Performance Management, Employee Engagement, Workforce Planning, HR Analytics, and Strategic HR Leadership.",
                            "- **Duration:** 10 months",
                            "- **Learning Format:** 120+ hours of live online sessions, with study materials available for up to 1 year from the program completion date.",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 3 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in Strategic HR Management to enroll?",
                        content: [
                            "Prior Strategic HR Management experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Ranchi after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Ranchi, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** attendance is 70% or above.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy). However Physical certificates will be provided to campus immersion participants only, subject to minimum attendance."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Ranchi."
                        ],
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with IIM Ranchi?",
                        content: [
                            "Yes. Participants will receive IIM Ranchi Executive Alumni Status upon program completion, for an additional fee of INR 10,000 + GST."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Ranchi confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Ranchi Faculty with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Strategic HR Leader, HR Business Partner, Talent Management Manager, Organizational Development Manager, HR Strategy Consultant, People & Culture Manager, and Workforce Planning Manager, etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 2,20,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program includes a 2-day campus immersion with food and lodging in double-occupancy rooms. Travel expenses are not included."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Ranchi's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Strategic Human Resource Management, Talent Management, Organizational Development, Performance Management, HR Analytics, Workforce Planning, Employee Engagement, and Strategic HR Leadership, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iim_ranchi_strategy_leadership: {
        templateId: "iim_ranchi_strategy_leadership_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Ranchi Executive Program in Strategy & Leadership about?",
                        content: [
                            "The Executive Program in Strategy & Leadership is a 11 month program offered by IIM Ranchi. It is designed to equip learners with core strategy and leadership skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 11 months comprising 14 modules, covering all core aspects of strategic management, leadership, business decision-making, organizational transformation, innovation, and execution to effectively address complex business challenges and drive sustainable organizational growth.",
                            "- **Duration:** 11 months",
                            "- **Learning Format:** 132+ hours of live online sessions, with study materials available for up to 1 year from the program completion date.",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred.",
                            "Diploma Holders are eligible to apply."
                        ],
                    },
                    {
                        title: "Do I need prior experience in Strategy or Leadership to enroll?",
                        content: [
                            "Prior Strategy or Leadership experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Ranchi after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Ranchi, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** attendance is 70% or above.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy). However Physical certificates will be provided to campus immersion participants only, subject to minimum attendance."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Ranchi."
                        ],
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with IIM Ranchi?",
                        content: [
                            "Yes. Participants will receive IIM Ranchi Executive Alumni Status. It is included in the program fees"
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Ranchi confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Ranchi Faculty with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Strategy Manager, Business Strategy Consultant, Management Consultant, Business Transformation Manager, Strategic Planning Manager, Business Development Manager, etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 2,60,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program includes a 3-day campus immersion with food and lodging in double-occupancy rooms. Travel expenses are not included."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Ranchi's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Strategic Thinking, Business Strategy Formulation and Execution, Leadership and Team Management, Data-Driven Decision-Making, Organizational Transformation, Innovation, and Managing Complex Business Challenges, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iim_trichy_leadership_ai: {
        templateId: "iim_trichy_leadership_ai_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Tiruchirappalli Certificate Programme in Leadership with AI about?",
                        content: [
                            "The Certificate Programme in Leadership with AI is an 8 months program offered by IIM Tiruchirappalli. It is designed to equip learners with core AI Leadership and Transformation skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 8 months comprising 10 modules, covering all core aspects of AI Leadership and Transformation including AI Strategy Generative AI Business Model Innovation AI Products Agentic AI Change Leadership Talent Transformation and Responsible AI.",
                            "- **Duration:** 08 months",
                            "- **Learning Format:** 90+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 3 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in AI-driven business transformation to enroll?",
                        content: [
                            "Prior AI-driven business transformation experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Tiruchirappalli after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Tiruchirappalli, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** participants who maintain an attendance of 70% or above and achieve a minimum score of 35% in the programme assessment.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: The physical copy of the certificate is applicable to campus immersion participants who meet the minimum attendance requirement."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Tiruchirappalli."
                        ],
                    },
                    {
                        title: "Will I get any alumni status or networking opportunities with IIM Tiruchirappalli?",
                        content: [
                            "No, IIM Tiruchirappalli alumni status will NOT be conferred. However, learners can network with peers and industry experts during the program."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Tiruchirappalli confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Tiruchirappalli faculty with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Chief AI Officer (CAIO), Chief Digital Officer (CDO), Chief Technology Officer (CTO), AI Strategy Leader, Digital Transformation Leader, AI Product Leader, and Business Transformation Leader etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 2,09,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "The program has No Campus Immersions."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Tiruchirappalli's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in AI-driven leadership, business transformation, strategic decision-making, and responsible innovation enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iit_jammu_ai_leaders: {
        templateId: "iit_jammu_ai_leaders_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIT Jammu Advanced Certificate in AI for Leaders about?",
                        content: [
                            "The Advanced Certificate in AI for Leaders is a 5-month program offered by IIT Jammu. It is designed to equip learners with core AI Strategy and Leadership ."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 5 months comprising 5 modules, covering all core aspects of AI Foundations for Leaders, Generative AI, AI Applications in Business Functions, AI Strategy and Transformation, and AI Assistants and Copilots.",
                            "- **Duration:** 05 months",
                            "- **Learning Format:** 60+ hours of live online sessions, with study materials available for up to 6 months from the program completion date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in Artificial Intelligence or Machine Learning to enroll?",
                        content: [
                            "Prior Artificial Intelligence or Machine Learning experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIT Jammu after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIT Jammu, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** attendance is 70% or above.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy)."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIT Jammu."
                        ],
                    },
                    {
                        title: "Will I get any alumni status or networking opportunities with IIT Jammu?",
                        content: [
                            "No, IIT Jammu alumni status will NOT be conferred. However, learners can network with peers and industry experts during the program."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIT Jammu confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIT Jammu faculty and industry experts with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 4 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as AI Strategy Manager, AI Transformation Manager, AI Product Manager, AI Business Consultant, Generative AI Consultant, AI Program Manager, and AI Innovation Manager, among others."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,20,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "No, the program has no campus immersion."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIT Jammu's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in AI Foundations, Generative AI, AI Applications in Business Functions, AI Strategy and Transformation, and AI Assistants and Copilots, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iit_jammu_genai_leaders: {
        templateId: "iit_jammu_genai_leaders_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIT Jammu Advanced Certificate in Generative AI for Leaders about?",
                        content: [
                            "The Advanced Certificate in Generative AI for Leaders is a 5-month program offered by IIT Jammu. It is designed to equip learners with core Generative AI and Agentic AI skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 5 months comprising 5 modules, covering all core aspects of Generative AI: Generative AI Foundations, Agentic AI, AI Tools and Prompting, AI Applications, AI Strategy, and Generative AI Product Development.",
                            "- **Duration:** 05 months",
                            "- **Learning Format:** 60+ hours of live online sessions, with study materials available for up to 6 months from the program completion date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in Generative AI leadership roles to enroll?",
                        content: [
                            "Prior Generative AI leadership experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIT Jammu after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIT Jammu, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** attendance is 70% or above.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy)."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIT Jammu."
                        ],
                    },
                    {
                        title: "Will I get any alumni status or networking opportunities with IIT Jammu?",
                        content: [
                            "No, IIT Jammu alumni status will NOT be conferred. However, learners can network with peers and industry experts during the program."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIT Jammu confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIT Jammu faculty and industry experts with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 4 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Chief AI Officer (CAIO), Chief Digital Officer (CDO), Chief Technology Officer (CTO), AI Strategy Consultant, Generative AI Product Manager, AI Transformation Leader, Digital Transformation Leader, and AI Innovation Manager, among others. ."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,20,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "No, the program has no campus immersion."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIT Jammu's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Generative AI, Agentic AI, AI Tools and Prompting, AI Applications, AI Strategy, and Generative AI Product Development , enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iit_jammu_genai_agentic_ai: {
        templateId: "iit_jammu_genai_agentic_ai_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIT Jammu Executive Program in Generative AI & Agentic AI for Leaders about?",
                        content: [
                            "The Executive Program in Generative AI & Agentic AI for Leaders is an 8 month programme offered by IIT Jammu. It is designed to equip learners with core Generative AI and Agentic AI skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 8 months comprising 9 modules, covering all core aspects of Generative AI Foundations, AI Strategy, AI Product Development, Workflow Automation, Agentic AI, AI Transformation, and Responsible AI.",
                            "- **Duration:** 08 months",
                            "- **Learning Format:** 96+ hours of live online sessions, with study materials available for up to 6 months from the program completion date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in Generative AI or Agentic AI to enroll?",
                        content: [
                            "Prior Generative AI or Agentic AI experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIT Jammu after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIT Jammu, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** attendance is 70% or above.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only. A physical copy of the Program Completion Certificate will be applicable to participants attending the campus immersion and meeting the minimum attendance requirement."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIT Jammu."
                        ],
                    },
                    {
                        title: "Will I get any alumni status or networking opportunities with IIT Jammu?",
                        content: [
                            "No, IIT Jammu alumni status will NOT be conferred. However, learners can network with peers and industry experts during the program."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIT Jammu confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIT Jammu faculty and industry experts with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Chief AI Officer (CAIO), Chief Technology Officer (CTO), Chief Digital Officer (CDO), AI Product Manager, AI Strategy Leader, and AI Transformation Leader."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,60,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program has One Campus Immersion of 3 days.Food and lodging will be provided for campus immersion participants with accommodation available in double occupancy rooms. Travel expenses are not included in the program fee."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIT Jammu's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Generative AI, Agentic AI, AI Strategy, Workflow Automation, AI Transformation, and Responsible AI , enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iitm_pravartak_tech_leadership: {
        templateId: "iitm_pravartak_tech_leadership_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IITM Pravartak Executive Program in Technology Leadership & Innovation about?",
                        content: [
                            "The Executive Program in Technology Leadership & Innovation is a 9 month program offered by IITM Pravartak. It is designed to equip learners with core Technology Leadership and Innovation skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 9 months comprising 09 modules, covering all core aspects of Strategic Leadership, Technology Strategy, Digital Transformation, Enterprise Technology & Digital Architecture, AI & Generative AI Strategy, Innovation Systems, and Product & Platform Leadership.",
                            "- **Duration:** 9 months",
                            "- **Learning Format:** 100 hours of live online sessions, with study materials available for 3 years from the program completion date.",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in Technology Leadership to enroll?",
                        content: [
                            "Prior Technology Leadership experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IITM Pravartak after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IITM Pravartak, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** the participant maintains 45% or above attendance and scores 45% or above in the Overall Assessment.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy)."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IITM Pravartak."
                        ],
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with IITM Pravartak?",
                        content: [
                            "No, IITM Pravartak executive alumni status will NOT be conferred. However, learners can network with peers and industry experts during the program."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IITM Pravartak confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by Industry Experts with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Software Professionals, Digital Transformation Leader, Future CTO, Technology Strategy Leader, AI Leadership Professional, Solution Architect, and Product Technology Leader, etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 2,20,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program includes a 2-day campus immersion at IITM Pravartak, with meals included. On-campus accommodation and travel expenses will not be included."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IITM Pravartak's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Technology Strategy, Strategic Leadership, Digital Transformation, Enterprise Technology & Digital Architecture, AI & Generative AI Strategy, Innovation Management, and Product & Platform Leadership, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    spj_ai_leaders: {
        templateId: "spj_ai_leaders_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the SP Jain Global Professional Certificate in AI for Leaders about?",
                        content: [
                            "The Professional Certificate in AI for Leaders is a 4 month program offered by SP Jain Global. It is designed to equip learners with core AI Strategy, AI-Driven Leadership, and Strategic Decision-Making skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 4 months comprising 04 modules, covering all core aspects of AI Strategy, Generative AI, AI-Driven Business Transformation, Strategic Decision-Making, Responsible AI, and AI Leadership.",
                            "- **Duration:** 04 months",
                            "- **Learning Format:** 48+ hours of live online sessions, with study materials available for 3 years from the program completion date.",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in AI Strategy or AI Leadership to enroll?",
                        content: [
                            "Prior AI Strategy or AI Leadership experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from SP Jain Global, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** 75% attendance is maintained and completion of all mandatory projects and assessments is ensured.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy)."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by SP Jain Global."
                        ],
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with SP Jain Global?",
                        content: [
                            "Yes. Participants will receive SP Jain Global Executive Alumni Status. It is included in the program fees"
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from SP Jain Global confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by S.P. Jain Faculty & Industry Experts with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 4 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as AI Strategy Manager, AI Transformation Leader, Digital Transformation Manager, AI Program Manager, Innovation Manager, AI Strategy Consultant, and Business Transformation Leader, etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,30,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "No, there is no campus immersion included in this program."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines SP Jain Global's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in AI Strategy, Generative AI, AI-Driven Business Transformation, Strategic Decision-Making, Responsible AI, and AI Leadership, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    spj_leadership_ai: {
        templateId: "spj_leadership_ai_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the SP Jain Global Executive Program in Leadership with AI about?",
                        content: [
                            "The Executive Program in Leadership with AI is a 7 month program offered by SP Jain Global. It is designed to equip learners with core AI-Driven Leadership and Strategic Decision-Making skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 7 months comprising 09 modules, covering all core aspects of AI-Driven Leadership, AI Strategy, Generative AI, Digital Transformation, Strategic Decision-Making, AI Product Strategy, Responsible AI, and AI Governance.",
                            "- **Duration:** 07 months",
                            "- **Learning Format:** 84+ hours of live online sessions, with study materials available for 3 years from the program completion date.",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in AI-Driven Leadership to enroll?",
                        content: [
                            "Prior AI-Driven Leadership experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from SP Jain Global after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from SP Jain Global, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** 75% attendance is maintained and completion of all mandatory projects and assessments is ensured.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy)."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by SP Jain Global."
                        ],
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with SP Jain Global?",
                        content: [
                            "Yes. Participants will receive SP Jain Global Executive Alumni Status. It is included in the program fees"
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from SP Jain Global confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by S.P. Jain Faculty & Industry Experts with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as AI Strategy Manager, Digital Transformation Leader, AI Program Manager, Innovation Manager, AI Product Manager, Business Transformation Leader, and AI Strategy Consultant, etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,60,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "No, there is no campus immersion included in this program."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines SP Jain Global's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in AI-Driven Leadership, AI Strategy, Generative AI, Digital Transformation, Strategic Decision-Making, AI Product Strategy, Responsible AI, and AI Governance, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },
    iim_sirmaur_leadership_ai: {
        templateId: "iim_sirmaur_leadership_ai_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Sirmaur Executive Program in Leadership with AI about?",
                        content: [
                            "The Executive Program in Leadership with AI is a 6 month program offered by IIM Sirmaur. It is designed to equip learners with core leadership and AI-driven management skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 6 months comprising 07 modules, covering all core aspects of AI-Driven Leadership, Strategic Decision-Making, Generative AI, AI Strategy, Digital Transformation, Business Innovation, Responsible AI, and AI Governance.",
                            "- **Duration:** 6 months",
                            "- **Learning Format:** 70 hours of live online sessions, with study materials available for up to 2 months post program completion",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 2 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in Artificial Intelligence to enroll?",
                        content: [
                            "Prior Artificial Intelligence experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Sirmaur after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Sirmaur, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if** the attendance is 75% or above. Attendance alone does not determine the Certificate of Completion, details will be covered during Academic Orientation.",
                            "",
                            "- **Participation Certificate** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy)."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Sirmaur."
                        ],
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with IIM Sirmaur?",
                        content: [
                            "Yes. Participants will receive IIM Sirmaur Executive Alumni Status upon program completion, for an additional fee of INR 10,000 + GST."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Sirmaur confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Sirmaur Faculty with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as AI Strategy Manager, Digital Transformation Lead, Business Transformation Manager, AI Product Manager, Strategic Planning Manager, and AI Consultant, etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,89,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program includes a 2-day campus immersion with food and lodging in double-occupancy rooms. Travel expenses are not included."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Sirmaur's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in AI-Driven Leadership, AI Strategy, Generative AI, Digital Transformation, Strategic Decision-Making, AI Product Strategy, Responsible AI, and AI Governance, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },
    iim_sirmaur_strategy_leadership_innovation_ai: {
        templateId: "iim_sirmaur_strategy_leadership_innovation_ai_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Sirmaur Executive Programme in Strategy Leadership & Innovation in AI Era about?",
                        content: [
                            "The Executive Programme in Strategy Leadership & Innovation in AI Era is an 8 month program offered by IIM Sirmaur. It is designed to equip learners with core strategic leadership and AI-driven business transformation skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 8 months comprising 09 modules, covering all core aspects of Strategic Leadership, Business Strategy, Innovation, Artificial Intelligence, Digital Transformation, and AI-driven Business Growth.",
                            "- **Duration:** 8 months",
                            "- **Learning Format:** 85 hours of live online sessions, with study materials available for up to 2 months post program completion",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 3 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in Strategy & Leadership to enroll?",
                        content: [
                            "Prior Strategy & Leadership experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal {applicationLink}."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Sirmaur after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Sirmaur, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if** the attendance is 75% or above. Attendance alone does not determine the Certificate of Completion, details will be covered during Academic Orientation.",
                            "",
                            "- **Participation Certificate** will not be issued.",
                            "",
                            "**Note**: Completion and Participation Certificates are provided in digital format only (no physical copy)."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Sirmaur."
                        ],
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with IIM Sirmaur?",
                        content: [
                            "Yes. Participants will receive IIM Sirmaur Executive Alumni Status upon program completion, for an additional fee of INR 10,000 + GST."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Sirmaur confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Sirmaur Faculty with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Strategy Manager, Business Transformation Manager, Innovation Manager, Strategic Planning Manager, Digital Transformation Lead, and AI Strategy Consultant, etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,99,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program includes a 2-day campus immersion with food and lodging in double-occupancy rooms. Travel expenses are not included."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Sirmaur's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in strategic leadership, business strategy, innovation management, AI-driven transformation, strategic decision-making, and emerging technologies, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },

    iim_ranchi_cto_ai_leadership: {
        templateId: "iim_ranchi_cto_ai_leadership_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Ranchi CTO & AI Leadership Program about?",
                        content: [
                            "The CTO & AI Leadership Program is a 12 month program offered by IIM Ranchi. It is designed to equip learners with core Technology leadership and AI strategy skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 12 months comprising 13 modules, covering all core aspects of technology leadership, AI strategy, digital transformation, emerging technologies, data-driven decision-making, cybersecurity, technology innovation, and enterprise transformation.",
                            "- **Duration:** 12 months",
                            "- **Learning Format:** 144+ hours of live online sessions, with study materials available for up to 1 year from the program completion date.",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred.",
                            "Diploma Holders are eligible to apply."
                        ],
                    },
                    {
                        title: "Do I need prior experience in CTO & AI Leadership to enroll?",
                        content: [
                            "Prior CTO & AI Leadership experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal Link."
                        ]
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Ranchi after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Ranchi, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** attendance is 70% or above.",
                            "",
                            "- **Participation Certificate:** will not be issued.",
                            "",
                            "**Note:** Completion and Participation Certificates are provided in digital format only (no physical copy). However Physical certificates will be provided to campus immersion participants only, subject to minimum attendance."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Ranchi."
                        ],
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with IIM Ranchi?",
                        content: [
                            "Yes. Participants will receive IIM Ranchi Executive Alumni Status. It is included in the program fees."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Ranchi confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Ranchi Faculty with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ]
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Chief Technology Officer (CTO), Head of Technology, Chief Digital Officer (CDO), Digital Transformation Leader, Director of Technology, Product & Technology Leader, Vice President of Engineering etc."
                        ]
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 2,60,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program includes a 3-day campus immersion with food and lodging in double-occupancy rooms. Travel expenses are not included."
                        ]
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Ranchi's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in technology leadership, AI strategy, digital transformation, emerging technologies, data-driven decision-making, and technology innovation, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ],
    },
    iim_bodh_gaya_smp: {
        templateId: "iim_bodh_gaya_smp_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Bodh Gaya Senior Management Program about?",
                        content: [
                            "The Senior Management Program is an eleven month program offered by IIM Bodh Gaya. It is designed to equip learners with core Senior Management skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 11 months comprising 13 modules, covering all core aspects of Senior Management: Executive Leadership, Functional Leadership, Business Strategies, and Analytics.",
                            "Duration: 11 months",
                            "Learning Format: 130+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "Class Timings: Conducted on weekends",
                            "Flexibility: Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ],
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ],
                    },
                    {
                        title: "Do I need prior experience in Senior Management to enroll?",
                        content: [
                            "Prior Senior Management experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal Link."
                        ],
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Bodh Gaya after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Bodh Gaya, upon fulfilling the requirements.",
                            "Completion Certificate will be issued only if attendance is 70% or above.",
                            "Participation Certificate will be issued if attendance is below 70% (no Completion Certificate).",
                            "Note: Completion and Participation Certificates are provided in digital format only (no physical copy)."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Bodh Gaya"
                        ],
                    },
                    {
                        title: "Will I get any Executive alumni status or networking opportunities with IIM Bodh Gaya?",
                        content: [
                            "Yes, Executive Alumni Status will be conferred."
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Bodh Gaya confirming my enrollment?",
                        content: [
                            "Physical ID card will NOT be provided. Enrollment confirmation will be shared digitally via email."
                        ],
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Bodh Gaya Faculty and industry experts with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ],
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Chief Executive Officer (CEO), Chief Operating Officer (COO), Chief Financial Officer (CFO), Chief Marketing Officer (CMO), Senior Vice President (SVP), etc."
                        ],
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "The program fee is INR 2,30,000 + GST.",
                            "Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: Policy Details"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ],
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program has One Campus Immersion of 2 days."
                        ],
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Bodh Gaya's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in Executive Leadership, Functional Leadership, Business Strategies, and Analytics, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ],
                    }
                ],
            }
        ],
    },
    iimv_genai_business_leaders: {
        templateId: "iimv_genai_business_leaders_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Visakhapatnam Executive Program in Generative AI for Business Leaders Program about?",
                        content: [
                            "The Executive Program in Generative AI for Business Leaders is a 7 Months program offered by IIM Visakhapatnam. It is designed to equip learners with core Artificial intelligence skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 7 Months comprising 7 modules, covering all core aspects of Artificial intelligence: GenAI Models, Prompt Engineering, and No Code GenAI Tools.",
                            "- **Duration:** 7 Months",
                            "- **Learning Format:** 80+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 5 years is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in Artificial intelligence to enroll?",
                        content: [
                            "Prior Artificial intelligence experience is not mandatory."
                        ]
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "- Click the **“Enroll Now”** button at the top of the webpage.",
                            "- Fill the application form and pay the fees.",
                            "- Selected Candidates will receive Admission Confirmation Letter from the institute."
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Visakhapatnam after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Visakhapatnam upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 70% or above, along with a 50% score in the overall assessment.",
                            "",
                            "- **Participation Certificate will be issued if:** Attendance is below 70% (no Completion Certificate in this case)",
                            "",
                            "- **Physical Copy of Program Completion Certificate:** Applicable for campus immersion participants, subject to minimum attendance."
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Visakhapatnam."
                        ]
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with IIM Visakhapatnam?",
                        content: [
                            "Yes. Participants will receive IIM Visakhapatnam Executive Alumni Status upon program completion, for an additional fee of INR 10,000 + GST."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Visakhapatnam confirming my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Visakhapatnam Faculty and industry experts with extensive hands-on experience."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and  capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Graduates can explore roles such as AI Innovation Strategist, AI Operations Manager, AI Product Manager, Digital Transformation Manager, AI Ethics and Compliance Officer, Data Strategist, AI Solutions Architect, Automation Specialist, Business Intelligence Analyst, GenAI Transformation Manager, etc."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 1,80,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: [Policy Details](https://accredian.com/policies/iimv-policy)"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program has One Campus Immersion of 2 days (Opt.)."
                        ]
                    },
                    {
                        title: "What does the IIM Visakhapatnam campus immersion include, and how is it scheduled?",
                        content: [
                            "Yes. Participants can opt for a 2-day Campus Immersion at IIM Visakhapatnam for an additional fee of INR 15,000 + GST.",
                            "- Food and accommodation are included in the program fee",
                            "- Travel cost is not included and must be arranged by the participant",
                            "- IIM Visakhapatnam will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Visakhapatnam's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in GenAI Models, Prompt Engineering, and No Code GenAI Tools, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },

    xlri_digital_hr: {
        templateId: "xlri_digital_hr",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the XLRI Digital HR Leadership and People Analytics Program about?",
                        content: [
                            "The Executive Development Programme in Digital HR Leadership and People Analytics is a 10 months program offered by XLRI. It is designed to equip learners with core Human Resource, Digital HR, and People Analytics skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 10 months comprising 11 modules, covering all core aspects of Human Resource: HRM Strategy, Change Management, and GenAI.",
                            "- **Duration:** 10 months",
                            "- **Learning Format:** 120+ hours of live online sessions, with study materials available for 3 years from the batch start date",
                            "- **Class Timings:** Conducted on weekends",
                            "- **Flexibility:** Recordings & study materials available"
                        ]
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ]
                    }
                ]
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 3 years is preferred."
                        ]
                    },
                    {
                        title: "Do I need prior experience in Human Resource to enroll?",
                        content: [
                            "No. Prior Human Resource experience is not mandatory."
                        ]
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal [Link](https://vilcorpadmissions.xlri.ac.in/lp/edphrpa.html)."
                        ]
                    }
                ]
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from XLRI after completing the program?",
                        content: [
                            "Participants will receive a Completion Certificate from XLRI, upon fulfilling the requirements.",
                            "",
                            "- **Completion Certificate will be issued only if:** Attendance is 75% or above along with Project participation and mandatory Assessments",
                            "",
                            "- **Participation Certificate will be issued if:** Attendance is below 75% and above 50% (no Completion Certificate in this case)",
                            "",
                            "- **No Completion or Participation Certificate will be issued if:** Attendance is below 50%"
                        ]
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and how is it recognized by employers?",
                        content: [
                            "This is a Certificate program from XLRI, one of India's most reputed B-schools, and is widely recognized by employers across industries."
                        ]
                    },
                    {
                        title: "Will I get any executive alumni status or networking opportunities with XLRI?",
                        content: [
                            "Yes. Participants will receive XLRI Executive Alumni Status upon program completion, for an additional fee of INR 20,000 + GST."
                        ]
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from XLRI confirming my enrollment?",
                        content: [
                            "**No physical ID card will be provided.** Enrollment confirmation will be shared digitally via email."
                        ]
                    }
                ]
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching in the program?",
                        content: [
                            "The program is taught by XLRI faculty and industry experts."
                        ]
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone project."
                        ]
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. **1:1 doubt clearing or mentoring is not available**."
                        ]
                    }
                ]
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, **please note that no placement assistance or assurance is provided as part of the program.**"
                        ]
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ]
                    },
                    {
                        title: "What kind of roles, industries, or leadership opportunities can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Head of HR Technology and Innovation, HR Digital Transformation Manager, Chief People Officer (Digital HR Focus), People Analytics Specialist or Manager, Talent Analytics Lead, etc."
                        ]
                    }
                ]
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "- The program fee is INR 2,40,000 + GST.",
                            "- Standard EMI options are available (with additional interest charges)."
                        ]
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ]
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: {policyLink}"
                        ]
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ]
                    }
                ]
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program includes a 2-day campus immersion at XLRI."
                        ]
                    },
                    {
                        title: "What does the XLRI campus immersion include, and how is it scheduled?",
                        content: [
                            "2-Day immersion at XLRI; included in the program fee.",
                            "- Food and accommodation are included in the program fee",
                            "- Travel cost is not included and must be arranged by the participant",
                            "- XLRI will provide prior notice of the schedule so participants can plan travel and work in advance"
                        ]
                    }
                ]
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines XLRI's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ]
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in HRM Strategy, Change Management, and GenAI, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ]
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ]
                    }
                ]
            }
        ]
    },
    iim_ranchi_cfo: {
        templateId: "iim_ranchi_cfo_standard",
        sections: [
            {
                title: "Program Overview",
                questions: [
                    {
                        title: "What is the IIM Ranchi PG Certificate Program in Chief Financial Officer about?",
                        content: [
                            "The PG Certificate Program in Chief Financial Officer is a 12 month program offered by IIM Ranchi. It is designed to equip learners with core Chief Financial Officer skills."
                        ],
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 12 months comprising 13 modules, covering all core aspects of Strategic Financial Leadership, Financial Reporting, Financial Governance, Risk Management, Finance Transformation and AI & GenAI for CFOs",
                            "Duration: 12 months",
                            "Learning Format: 144+ hours of live online sessions, with study materials available for up to 1 year from the program completion date.",
                            "Class Timings: Conducted on weekends",
                            "Flexibility: Recordings & study materials available"
                        ],
                    },
                    {
                        title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
                        content: [
                            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
                        ],
                    }
                ],
            },
            {
                title: "Eligibility & Admissions",
                questions: [
                    {
                        title: "What are the minimum education and work experience requirements?",
                        content: [
                            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 8 years is preferred.",
                            "Diploma Holders are eligible to apply."
                        ],
                    },
                    {
                        title: "Do I need prior experience in Executive Leadership to enroll?",
                        content: [
                            "Prior Executive Leadership experience is not required."
                        ],
                    },
                    {
                        title: "How do I apply?",
                        content: [
                            "You can apply through the Application Portal Link."
                        ],
                    }
                ],
            },
            {
                title: "Certification & Recognition",
                questions: [
                    {
                        title: "Will I receive a certificate from IIM Ranchi after completing the program?",
                        content: [
                            "Yes. Participants will receive a Completion Certificate from IIM Ranchi, upon fulfilling the requirements.",
                            "Completion Certificate will be issued only if attendance is 70% or above.",
                            "Participation Certificate will not be issued.",
                            "Note: Completion and Participation Certificates are provided in digital format only (no physical copy). However Physical certificates will be provided to campus immersion participants only, subject to minimum attendance."
                        ],
                    },
                    {
                        title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
                        content: [
                            "This is a professional certificate program recognized by employers and issued by IIM Ranchi."
                        ],
                    },
                    {
                        title: "Will I get any Executive Alumni Status or networking opportunities with IIM Ranchi?",
                        content: [
                            "Yes. Participants will receive IIM Ranchi Executive Alumni Status. It is included in the program fees"
                        ],
                    },
                    {
                        title: "Will I receive a physical or digital batch ID or an official email from IIM Ranchi confirming my enrollment?",
                        content: [
                            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
                        ],
                    }
                ],
            },
            {
                title: "Faculty, Learning Experience & Evaluation",
                questions: [
                    {
                        title: "Who will be teaching the program?",
                        content: [
                            "The program is taught by IIM Ranchi Faculty with extensive hands-on experience."
                        ],
                    },
                    {
                        title: "What kind of learning methods are used (case studies, projects, capstones)?",
                        content: [
                            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
                        ],
                    },
                    {
                        title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
                        content: [
                            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
                        ],
                    }
                ],
            },
            {
                title: "Career Support & Outcomes",
                questions: [
                    {
                        title: "Do you provide placement assistance or career services?",
                        content: [
                            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
                        ],
                    },
                    {
                        title: "What is included in the career assistance sessions?",
                        content: [
                            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
                        ],
                    },
                    {
                        title: "What kind of roles or industries can I target after completing this program?",
                        content: [
                            "Students can explore roles such as Chief Financial Officer (CFO), Chief Operating Officer (COO), Vice President of Finance, Corporate Treasurer, Chief Risk Officer (CRO), Finance Director, Senior Financial Consultant, Entrepreneur/Founder, etc."
                        ],
                    }
                ],
            },
            {
                title: "Fees, Payments & Policies",
                questions: [
                    {
                        title: "What is the total program fee, and are EMI or installment options available?",
                        content: [
                            "The program fee is INR 2,90,000 + GST.",
                            "Standard EMI options are available (with additional interest charges)."
                        ],
                    },
                    {
                        title: "Are there any scholarships, discounts, or referral benefits?",
                        content: [
                            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
                        ],
                    },
                    {
                        title: "What is the refund or deferral policy if I cannot continue with the batch?",
                        content: [
                            "A 7-day cooling-off period is applicable. Full details are available at: Policy Details"
                        ],
                    },
                    {
                        title: "What happens if I withdraw mid-program?",
                        content: [
                            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
                        ],
                    }
                ],
            },
            {
                title: "Campus Immersion & Logistics",
                questions: [
                    {
                        title: "Is there a campus immersion in the program?",
                        content: [
                            "Yes, the program includes a 3-day campus immersion with food and lodging in double-occupancy rooms. Travel expenses are not included."
                        ],
                    }
                ],
            },
            {
                title: "Why Choose This Program",
                questions: [
                    {
                        title: "Why choose this program over others?",
                        content: [
                            "This program combines IIM Ranchi's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
                        ],
                    },
                    {
                        title: "What kind of learning outcomes can I expect from this program?",
                        content: [
                            "By the end of the program, participants will develop expertise in strategic financial leadership, financial planning and analysis, financial reporting and controllership, corporate finance, financial governance, risk management, finance transformation, FinTech, AI and GenAI applications in finance, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
                        ],
                    },
                    {
                        title: "Can I balance this program alongside my full-time job?",
                        content: [
                            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
                        ],
                    }
                ],
            }
        ],
    },

    iim_raipur_gslp: {
  templateId: "iim_raipur_gslp_standard",
  sections: [
    {
      title: "Program Overview",
      questions: [
        {
          title: "What is the IIM Raipur Global Senior Leadership Program about?",
          content: [
            "The Global Senior Leadership Program is a 12-month program offered by IIM Raipur. It is designed to equip learners with core strategic and senior leadership skills."
          ]
        },
        {
          title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
          content: [
            "Structured across 12 months comprising 11 core modules (across 3 pillars) and 4 specializations (choose 1 of CEO, COO, CFO or CTO), covering all core aspects of senior leadership: Strategic Leadership, Cross-Functional Leadership, and Innovation, Digital & AI Leadership.",
            "Duration: 12 months",
            "Learning Format: 144 hours of live online sessions, with session recordings available from the first session until one month after program completion.",
            "Class Timings: Conducted on weekends",
            "Flexibility: Recordings & study materials available"
          ]
        },
        {
          title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
          content: [
            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
          ]
        }
      ]
    },
    {
      title: "Eligibility & Admissions",
      questions: [
        {
          title: "What are the minimum education and work experience requirements?",
          content: [
            "Applicants should have a bachelor's degree in any discipline. Prior work experience of a minimum of 8 years is required.",
            "Diploma Holders are eligible to apply."
          ]
        },
        {
          title: "Do I need prior experience in a senior leadership role to enroll?",
          content: [
            "Prior senior leadership experience is not mandatory; however, a minimum of 8 years of overall work experience is required."
          ]
        },
        {
          title: "How do I apply?",
          content: [
            "You can apply through the Application Portal Link."
          ]
        }
      ]
    },
    {
      title: "Certification & Recognition",
      questions: [
        {
          title: "Will I receive a certificate from IIM Raipur after completing the program?",
          content: [
            "Yes. Participants will receive a Completion Certificate from IIM Raipur, upon fulfilling the requirements.",
            "Completion Certificate will be issued only if attendance is 75% or above and the overall assessment score is 50% or above.",
            "Participation Certificate will be issued if the above requirements are not met (no Completion Certificate).",
            "Note: Completion and Participation Certificates are provided in digital format only (no physical copy)."
          ]
        },
        {
          title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
          content: [
            "This is a professional certificate program recognized by employers and issued by IIM Raipur."
          ]
        },
        {
          title: "Will I get any alumni status or networking opportunities with IIM Raipur?",
          content: [
            "Yes, participants will receive Executive Alumni Status from IIM Raipur (the fee is included in the program fee). In addition, learners can network with peers, faculty and industry experts during the program, including the campus and international immersions."
          ]
        },
        {
          title: "Will I receive a physical or digital batch ID or an official email from IIM Raipur confirming my enrollment?",
          content: [
            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
          ]
        }
      ]
    },
    {
      title: "Faculty, Learning Experience & Evaluation",
      questions: [
        {
          title: "Who will be teaching the program?",
          content: [
            "The program is taught by IIM Raipur faculty and industry experts with extensive hands-on experience."
          ]
        },
        {
          title: "What kind of learning methods are used (case studies, projects, capstones)?",
          content: [
            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
          ]
        },
        {
          title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
          content: [
            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
          ]
        }
      ]
    },
    {
      title: "Career Support & Outcomes",
      questions: [
        {
          title: "Do you provide placement assistance or career services?",
          content: [
            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
          ]
        },
        {
          title: "What is included in the career assistance sessions?",
          content: [
            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
          ]
        },
        {
          title: "What kind of roles or industries can I target after completing this program?",
          content: [
            "Students can explore roles such as Chief Executive Officer (CEO), Chief Operating Officer (COO), Chief Financial Officer (CFO), Chief Technology Officer (CTO), Senior Vice President (SVP), General Manager / Business Unit Head, etc."
          ]
        }
      ]
    },
    {
      title: "Fees, Payments & Policies",
      questions: [
        {
          title: "What is the total program fee, and are EMI or installment options available?",
          content: [
            "The program fee is INR 3,39,000 + GST. This includes the study material, the campus immersion, the international immersion in Dubai and Executive Alumni Status. A non-refundable application fee of INR 10,000 + GST is payable at the time of application.",
            "Standard EMI options are available (with additional interest charges)."
          ]
        },
        {
          title: "Are there any scholarships, discounts, or referral benefits?",
          content: [
            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
          ]
        },
        {
          title: "What is the refund or deferral policy if I cannot continue with the batch?",
          content: [
            "A 7-day cooling-off period is applicable. Full details are available at: Policy Details"
          ]
        },
        {
          title: "What happens if I withdraw mid-program?",
          content: [
            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
          ]
        }
      ]
    },
    {
      title: "Campus Immersion & Logistics",
      questions: [
        {
          title: "Is there a campus immersion in the program?",
          content: [
            "Yes, the program has a 2-day campus immersion at IIM Raipur and a 3-day international immersion in Dubai (dates to be announced). The immersion fees are included in the total program fee. The Dubai immersion includes a 3-night stay at a 4- or 5-star property, all meals, a yacht cruise, a desert safari, and access to curated speaker sessions and a conference."
          ]
        }
      ]
    },
    {
      title: "Why Choose This Program",
      questions: [
        {
          title: "Why choose this program over others?",
          content: [
            "This program combines IIM Raipur's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
          ]
        },
        {
          title: "What kind of learning outcomes can I expect from this program?",
          content: [
            "By the end of the program, participants will develop expertise in strategic leadership, cross-functional leadership, and innovation, digital and AI leadership, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
          ]
        },
        {
          title: "Can I balance this program alongside my full-time job?",
          content: [
            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
          ]
        }
      ]
    }
  ]
},
iim_ranchi_coo: {
  templateId: "iim_ranchi_coo_standard",
  sections: [
    {
      title: "Program Overview",
      questions: [
        {
          title: "What is the IIM Ranchi PG Certificate Program in Chief Operating Officer about?",
          content: [
            "The PG Certificate Program in Chief Operating Officer is a 12 month program offered by IIM Ranchi. It is designed to equip learners with core Enterprise Operations & Strategic Leadership skills."
          ]
        },
        {
          title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
          content: [
            "Structured across 12 months comprising 14 modules, covering all core aspects of Boardroom Leadership, Executive Influence, Enterprise Operating Models, Execution Systems, Supply Chain Management, Ecosystem Leadership, Digital Transformation, Technology-Enabled Operations.",
            "Duration: 12 months",
            "Learning Format: 144+ hours of live online sessions, with study materials available for up to 1 year from the program completion date.",
            "Class Timings: Conducted on weekends",
            "Flexibility: Recordings & study materials available"
          ]
        },
        {
          title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
          content: [
            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes must be attended. The schedule for these classes will be shared in advance."
          ]
        }
      ]
    },
    {
      title: "Eligibility & Admissions",
      questions: [
        {
          title: "What are the minimum education and work experience requirements?",
          content: [
            "Applicants should have a bachelor's degree in any discipline. Prior work experience of 8 years is preferred.",
            "Diploma Holders are eligible to apply."
          ]
        },
        {
          title: "Do I need prior experience in Operations to enroll?",
          content: [
            "Prior Operations experience is not required."
          ]
        },
        {
          title: "How do I apply?",
          content: [
            "You can apply through the Application Portal Link."
          ]
        }
      ]
    },
    {
      title: "Certification & Recognition",
      questions: [
        {
          title: "Will I receive a certificate from IIM Ranchi after completing the program?",
          content: [
            "Yes. Participants will receive a Completion Certificate from IIM Ranchi, upon fulfilling the requirements.",
            "Completion Certificate will be issued only if attendance is 70% or above.",
            "Participation Certificate will not be issued.",
            "Note: Completion and Participation Certificates are provided in digital format only (no physical copy). However Physical certificates will be provided to campus immersion participants only, subject to minimum attendance."
          ]
        },
        {
          title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
          content: [
            "This is a professional certificate program recognized by employers and issued by IIM Ranchi."
          ]
        },
        {
          title: "Will I get any Executive Alumni Status or networking opportunities with IIM Ranchi?",
          content: [
            "Yes. Participants will receive IIM Ranchi Executive Alumni Status. It is included in the program fees"
          ]
        },
        {
          title: "Will I receive a physical or digital batch ID or an official email from IIM Ranchi confirming my enrollment?",
          content: [
            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
          ]
        }
      ]
    },
    {
      title: "Faculty, Learning Experience & Evaluation",
      questions: [
        {
          title: "Who will be teaching the program?",
          content: [
            "The program is taught by IIM Ranchi Faculty with extensive hands-on experience."
          ]
        },
        {
          title: "What kind of learning methods are used (case studies, projects, capstones)?",
          content: [
            "Learning includes live sessions, hands-on projects, case studies, and capstone projects."
          ]
        },
        {
          title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
          content: [
            "Doubt resolution is done through live sessions. 1:1 doubt clearing or mentoring is not available."
          ]
        }
      ]
    },
    {
      title: "Career Support & Outcomes",
      questions: [
        {
          title: "Do you provide placement assistance or career services?",
          content: [
            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
          ]
        },
        {
          title: "What is included in the career assistance sessions?",
          content: [
            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
          ]
        },
        {
          title: "What kind of roles or industries can I target after completing this program?",
          content: [
            "Students can explore roles such as Chief Operating Officer (COO), Vice President of Operations, Director of Operations, Operational Excellence Leader, Operations Strategy Consultant, Head of Operations, Business Operations Leader, etc."
          ]
        }
      ]
    },
    {
      title: "Fees, Payments & Policies",
      questions: [
        {
          title: "What is the total program fee, and are EMI or installment options available?",
          content: [
            "The program fee is INR 2,90,000 + GST.",
            "Standard EMI options are available (with additional interest charges)."
          ]
        },
        {
          title: "Are there any scholarships, discounts, or referral benefits?",
          content: [
            "Yes, we do offer scholarships, discounts, and referral benefits from time to time. These opportunities can make the program more affordable and rewarding. For the latest details, we recommend checking the brochure."
          ]
        },
        {
          title: "What is the refund or deferral policy if I cannot continue with the batch?",
          content: [
            "A 7-day cooling-off period is applicable. Full details are available at: Policy Details"
          ]
        },
        {
          title: "What happens if I withdraw mid-program?",
          content: [
            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
          ]
        }
      ]
    },
    {
      title: "Campus Immersion & Logistics",
      questions: [
        {
          title: "Is there a campus immersion in the program?",
          content: [
            "Yes, the program includes a 3-day campus immersion with food and lodging in double-occupancy rooms. Travel expenses are not included."
          ]
        }
      ]
    },
    {
      title: "Why Choose This Program",
      questions: [
        {
          title: "Why choose this program over others?",
          content: [
            "This program combines IIM Ranchi's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion."
          ]
        },
        {
          title: "What kind of learning outcomes can I expect from this program?",
          content: [
            "By the end of the program, participants will develop expertise in Strategic Leadership, Boardroom Decision-Making, Enterprise-Wide Execution, Operating Model Design, Supply Chain Optimisation, Ecosystem Management, Digital Transformation, Technology-Driven Operations, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
          ]
        },
        {
          title: "Can I balance this program alongside my full-time job?",
          content: [
            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate the program into a busy professional schedule without compromising on depth or engagement."
          ]
        }
      ]
    }
  ]
},
iim_kashipur_epgdbm: {
  templateId: "iim_kashipur_epgdbm_standard",
  sections: [
    {
      title: "Program Overview",
      questions: [
        {
          title: "What is the IIM Kashipur Executive Post Graduate Diploma Program in Business Management (EPGDBM) about?",
          content: [
            "The Executive Post Graduate Diploma Program in Business Management (EPGDBM) is a(an) 14 months program offered by IIM Kashipur. It is designed to equip learners with core business management skills."
          ]
        },
        {
          title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
          content: [
            "Structured across 14 months comprising 27 courses across 4 terms (20 credits), covering all core aspects of Business Management: Economics, Finance & Accounting, Marketing, Operations, Human Resources & Organizational Behavior, Strategy, and Business Analytics.",
            "Duration: 14 months (Batch 4: Tech Orientation on 25th April 2027; Batch Inauguration on 16th May 2027)",
            "Learning Format: 500 hours of learning (366 hours of live online sessions and 134 hours of asynchronous learning), with study materials available for 3 months post course completion",
            "Class Timings: Conducted on weekends (Saturdays: 6:00 PM to 9:00 PM IST; Sundays: 10:30 AM to 12:00 PM and 1:00 PM to 2:30 PM IST)",
            "Flexibility: Recordings & study materials available"
          ]
        },
        {
          title: "How many hours per week do I need to commit, and will recordings be available if I miss a class?",
          content: [
            "Ideally, 30 minutes of preparation time is recommended each day, but students can allocate time according to their own schedules. Additionally, live weekend classes (3 hours on Saturdays and 4 hours on Sundays) must be attended. The schedule for these classes will be shared in advance. A minimum of 70% attendance is mandatory in each course, and the camera must be switched on during online classes."
          ]
        }
      ]
    },
    {
      title: "Eligibility & Admissions",
      questions: [
        {
          title: "What are the minimum education and work experience requirements?",
          content: [
            "Applicants should have a bachelor's degree in any discipline (10+2+3) with a minimum of 45% marks or equivalent CGPA (42% for NC-OBC / EWS; 40% for SC / ST / DAP). Prior work experience of 3 years is required (only paid, full-time work experience gained after graduation is counted). Applicants also need a valid CAT / GMAT score, or must appear for the IIM Kashipur Admission Test (EMAT). The program is open to Indian nationals residing in India only."
          ]
        },
        {
          title: "Do I need prior experience in Business Management to enroll?",
          content: [
            "Prior Business Management experience is not required."
          ]
        },
        {
          title: "How do I apply?",
          content: [
            "You can apply through the Application Portal Link. The application fee is INR 5,900 (INR 5,000 + GST), non-refundable. Candidates are selected on a merit score out of 100 (Admission Test: 50 marks; Work Experience: 20 marks; Academic Excellence: 30 marks)."
          ]
        }
      ]
    },
    {
      title: "Certification & Recognition",
      questions: [
        {
          title: "Will I receive a certificate from IIM Kashipur after completing the program?",
          content: [
            "Yes. Participants will receive a Completion Certificate from IIM Kashipur, upon fulfilling the requirements.",
            "Completion Certificate will be issued only if attendance is 75% or above and the overall assessment score is 50% or above.",
            "No Participation Certificate will be issued for this program.",
            "Note: A physical copy of the Completion Certificate is provided to campus immersion participants, subject to minimum attendance."
          ]
        },
        {
          title: "Is this a degree, diploma, or certificate – and is it recognized by employers?",
          content: [
            "This is a post graduate diploma program recognized by employers and issued by IIM Kashipur."
          ]
        },
        {
          title: "Will I get any alumni status or networking opportunities with IIM Kashipur?",
          content: [
            "Yes, IIM Kashipur Executive Alumni Status will be conferred upon program completion (included in the program fee). Benefits include a lifetime digital executive alumni I-card, access to the exclusive Alumni Portal, alumni city meets, invitations to institute events, newsletters, and on-site library access. Learners can also network with peers and industry experts during the program."
          ]
        },
        {
          title: "Will I receive a physical or digital batch ID or an official email from IIM Kashipur confirming my enrollment?",
          content: [
            "No physical ID card will be provided. Enrollment confirmation will be shared digitally via email."
          ]
        }
      ]
    },
    {
      title: "Faculty, Learning Experience & Evaluation",
      questions: [
        {
          title: "Who will be teaching the program?",
          content: [
            "The program is taught by IIM Kashipur faculty and industry experts with extensive hands-on experience. The Program Director is Prof. Ashish Kumar, Associate Professor and Chairperson – Finance and Accounting, IIM Kashipur."
          ]
        },
        {
          title: "What kind of learning methods are used (case studies, projects, capstones)?",
          content: [
            "Learning includes live sessions, asynchronous learning, assignments, quizzes, case studies, industry immersion sessions, and a capstone project."
          ]
        },
        {
          title: "How are doubts resolved during the program? Is 1:1 mentoring available?",
          content: [
            "Doubt resolution is done through live sessions and Virtual Office Hours, which offer one-to-one time with faculty to discuss your queries."
          ]
        }
      ]
    },
    {
      title: "Career Support & Outcomes",
      questions: [
        {
          title: "Do you provide placement assistance or career services?",
          content: [
            "Accredian provides comprehensive career support through 6 dedicated career assistance sessions designed to help learners enhance their professional growth. However, please note that no placement assistance or assurance is provided as part of the program."
          ]
        },
        {
          title: "What is included in the career assistance sessions?",
          content: [
            "Career support includes resume building, interview preparation, and guidance on career pathways. 1:1 career counselling is available for career assistance sessions."
          ]
        },
        {
          title: "What kind of roles or industries can I target after completing this program?",
          content: [
            "Students can explore roles such as General Manager, Business Head, Product Manager, Marketing Manager, Finance Manager, Operations Manager, Strategy Consultant, etc."
          ]
        }
      ]
    },
    {
      title: "Fees, Payments & Policies",
      questions: [
        {
          title: "What is the total program fee, and are EMI or installment options available?",
          content: [
            "The program fee is INR 3,50,900 + GST",
            "Standard EMI options are available (with additional interest charges): 12 months at INR 32,942/month, 18 months at INR 22,840/month, and 24 months at INR 17,748/month."
          ]
        },
        {
          title: "Are there any scholarships, discounts, or referral benefits?",
          content: [
            "No scholarships are currently offered for this program. For the latest details on discounts or referral benefits, we recommend checking the brochure."
          ]
        },
        {
          title: "What is the refund or deferral policy if I cannot continue with the batch?",
          content: [
            "A 7-day cooling-off period is applicable. Full details are available at: Policy Details"
          ]
        },
        {
          title: "What happens if I withdraw mid-program?",
          content: [
            "If you withdraw after the 7-day cooling-off period, refunds are not applicable."
          ]
        }
      ]
    },
    {
      title: "Campus Immersion & Logistics",
      questions: [
        {
          title: "Is there a campus immersion in the program?",
          content: [
            "Yes, the program has a 5-day Campus Immersion: 3 days on campus and a 2-day valedictory ceremony, included in the program fee. Food and lodging (twin-sharing accommodation, subject to availability) are included; travel expenses are not included. Campus immersion dates will be announced. Participants also receive a welcome merchandise kit."
          ]
        }
      ]
    },
    {
      title: "Why Choose This Program",
      questions: [
        {
          title: "Why choose this program over others?",
          content: [
            "This program combines IIM Kashipur's academic credibility with Accredian's practical career support. Learners benefit from a balance of theory, real-world case studies, and industry immersion, along with the flexibility of online learning and campus immersion. IIM Kashipur is an AACSB and EQUIS member, and is ranked #23 in NIRF 2025 (Management) and #26 in IIRF 2025 (Management)."
          ]
        },
        {
          title: "What kind of learning outcomes can I expect from this program?",
          content: [
            "By the end of the program, participants will develop expertise in Economics, Finance & Accounting, Marketing, Operations, Human Resources, Strategy, and Business Analytics, enabling them to make informed strategic decisions, lead cross-functional teams, and apply practical solutions to real-world challenges. The program's mix of academic rigor and hands-on exposure ensures they graduate with both conceptual clarity and actionable skills."
          ]
        },
        {
          title: "Can I balance this program alongside my full-time job?",
          content: [
            "Yes, absolutely. The program is designed specifically for working professionals. With weekend live sessions, flexible online learning, and dedicated academic support, you can continue progressing in your career while pursuing your learning goals. The curriculum pacing and delivery format make it easy to integrate this program into a busy professional schedule without compromising on depth or engagement."
          ]
        }
      ]
    }
  ]
}
};
