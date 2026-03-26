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
                            "- **Completion Certificate will be issued only if:** Attendance is 70% or above.",
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
                            "Structured across 12 months comprising 42 courses, covering all core aspects of management: finance, operations, organizational behavior, and business transformation.",
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
                            "- **Diploma will be awarded only if:** Attendance is 75% or above and the participant achieves a minimum CGPA of 2.75 in the overall assessment."
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
                            "- The program fee is INR 4,82,500.",
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
                            "- The program fee is INR 1,50,000 + GST.",
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
                        title: "What is the SP Jain School of Global Management Executive Program in Generative AI for Leaders about?",
                        content: [
                            "The Executive Program in Generative AI for Leaders is a 6-month program offered by SP Jain School of Global Management. It is designed to equip learners with core Artificial Intelligence skills."
                        ]
                    },
                    {
                        title: "What is the structure and format of the program, including topics, duration, class format, and timings?",
                        content: [
                            "Structured across 6 months comprising 7 modules, covering all core aspects of GenAI Strategy, Applied Tools, & Leadership-Driven Transformation.",
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
                        title: "Will I get any alumni benefits or networking opportunities with SP Jain School of Global Management?",
                        content: [
                            "Yes. Participants will receive SP Jain School of Global Management Executive Alumni Status. It is included in the program fees."
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
                            "- The program fee is INR 1,50,000 + GST.",
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
                            "- The program fee is INR 1,20,000 + GST.",
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
    }
};
