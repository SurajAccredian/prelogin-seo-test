import { universityFaqTemplates } from '../components/Assets/universityFaqTemplates';
// import { getTemplateData } from './templateDataMapping';
const extractCareerSessions = (billingPoints) => {
    if (!billingPoints || !Array.isArray(billingPoints)) {
        return "4"; // fallback default
    }

    // Look for a point that mentions "Career Sessions"
    const careerPoint = billingPoints.find(point =>
        point.toLowerCase().includes('career session')
    );

    if (careerPoint) {
        // Extract the number from the string (e.g., "4 Career Sessions by Accredian")
        const match = careerPoint.match(/(\d+)\s+career\s+session/i);
        return match ? match[1] : "NA"; // return the number or "NA" if not found
    }

    return "NA"; // fallback default
};
const extractJobOpportunities = (overviewContent) => {
    if (!overviewContent || !Array.isArray(overviewContent)) {
        return "NA";
    }

    // Find the "job opportunities" section
    const jobSection = overviewContent.find(section =>
        section.title.toLowerCase().includes('job opportunities')
    );

    if (jobSection && jobSection.points) {
        // Take first 5 jobs and join with comma
        return jobSection.points.slice(0, 5).join(', ');
    }

    return "NA";
};
// Helper function to extract hours from key_features
const extractHours = (keyFeatures) => {
  if (!keyFeatures || !Array.isArray(keyFeatures)) {
    return "NA";
  }
  
  // Find the hours feature
  const hoursFeature = keyFeatures.find(feature => 
    feature.title.toLowerCase() === 'hours'
  );
  
  if (hoursFeature && hoursFeature.count) {
    return `${hoursFeature.count}`;
  }
  
  return "NA"; // fallback
};

const extractModules = (keyFeatures) => {
  if (!keyFeatures || !Array.isArray(keyFeatures)) {
    return "NA";
  }

  // Find the hours feature
  const moduleFeature = keyFeatures.find(feature => 
    feature.title.toLowerCase() === 'modules' || feature.title.toLowerCase() === 'core modules'
  );
  
  console.log(moduleFeature)
  if (moduleFeature && moduleFeature.text) {
    return `${moduleFeature.text}`;
  }
  
  return "NA"; // fallback
};
// Helper function to extract key topics from program snapshot
// Helper function to extract key topics from program snapshot (first element)
const extractKeyTopics = (overviewContent) => {
  if (!overviewContent || !Array.isArray(overviewContent)) {
    return "NA";
  }
  
  // Find the program snapshot section
  const snapshotSection = overviewContent.find(section => 
    section.title.toLowerCase().includes('program snapshot')
  );
  
  if (snapshotSection && snapshotSection.points && snapshotSection.points.length > 0) {
    // Take the first element (modules info is always at top)
    const modulesPoint = snapshotSection.points[0];
    
    // Split by " - " and take everything after
    const parts = modulesPoint.split(' - ');
    if (parts.length > 1) {
      return parts.slice(1).join(' - ');
    }
  }
  
  return "NA";
};

const extractDomain = (overviewContent) => {
  if (!overviewContent || !Array.isArray(overviewContent)) {
    return "NA";
  }
  
  // Find the program snapshot section
  const snapshotSection = overviewContent.find(section => 
    section.title.toLowerCase().includes('program snapshot')
  );
  
  if (snapshotSection && snapshotSection.points && snapshotSection.points.length > 0) {
    // Take the first element (modules info is always at top)
    const modulesPoint = snapshotSection.points[0];
    console.log(modulesPoint)
    // Split by " - " and take everything after
    const parts = modulesPoint.split(' - ');
    if (parts.length > 1) {
      const countPart = parts.toString().split(" ")
      console.log(countPart)
      return countPart[0];

    }
  }
  
  return "NA";
};
// Helper function to extract campus immersion duration from key_features
const extractCampusImmersionDuration = (keyFeatures) => {
  console.log("Key Features:", keyFeatures);
  
  if (!keyFeatures || !Array.isArray(keyFeatures)) {
    console.log("No key features or not an array");
    return null;
  }
  
  // Find the campus immersion feature with more flexible matching
  const campusFeature = keyFeatures.find(feature => {
    if (!feature.title) return false;
    
    const titleLower = feature.title.toLowerCase();
    console.log("Checking title:", titleLower);
    
    // Check for various immersion patterns
    return titleLower.includes('campus immersion') || 
           titleLower.includes('immersion at') ||
           (titleLower.includes('immersion') && !titleLower.includes('int.'));
  });

  console.log("Found campus feature:", campusFeature);
  
  if (campusFeature) {
    const duration = campusFeature.text || campusFeature.count;
    console.log("Extracted duration:", duration);
    return duration || null;
  }
  
  console.log("No campus immersion found");
  return null;
};

const extractCampusImmersionFromSnapshot = (overviewContent) => {
  console.log("Content")
  console.log(overviewContent)
    if (!overviewContent) return null;
    
    const snapshotSection = overviewContent.find(
        section => section.title?.toLowerCase() === 'program snapshot'
    );
    
    if (!snapshotSection?.points) return null;
    
    const immersionPoint = snapshotSection.points.find(
        point => point.toLowerCase().includes('campus immersion')
    );
    
    if (!immersionPoint) return null;
    
    // Extract the second half after the colon for IIMV
    const parts = immersionPoint.split(':');
    if (parts.length > 1) {
        return parts[1].trim(); // Returns "Two Campus Immersions of 2 days each"
    }
    
    return immersionPoint;
};

// const extractModules = (keyFeatures) => {
//   if (!keyFeatures || !Array.isArray(keyFeatures)) {
//     return null;
//   }
  
//   // Find the campus immersion feature (title contains "campus immersion")
//   const campusFeature = keyFeatures.find(feature => 
//     feature.title && feature.title.toLowerCase().includes('campus immersion')
//   );
  
//   if (campusFeature) {
//     // Check for both 'text' and 'count' properties
//     return campusFeature.text || campusFeature.count || null;
//   }
  
//   return null;
// };

const extractInternationalImmersion = (keyFeatures) => {
  console.log("=== DEBUG: extractInternationalImmersion ===");
  console.log("Input keyFeatures:", keyFeatures);
  
  if (!keyFeatures || !Array.isArray(keyFeatures)) {
    console.log("RETURN: null - no keyFeatures or not array");
    return {
      hasInternationalImmersion: false,
      isOptional: false,
      duration: null,
      location: null
    };
  }
  
  // Find international immersion feature
  const intImmersionFeature = keyFeatures.find(feature => {
    if (!feature.title) return false;
    
    const titleLower = feature.title.toLowerCase();
    return titleLower.includes('int.') || 
           titleLower.includes('international') ||
           (titleLower.includes('immersion') && titleLower.includes('dubai'));
  });

  console.log("Found international immersion feature:", intImmersionFeature);
  
  if (intImmersionFeature) {
    const text = intImmersionFeature.text || intImmersionFeature.count;
    const isOptional = text && text.toString().toLowerCase().includes('opt');
    
    // Extract duration (remove "opt" if present)
    const duration = text ? text.toString().replace(/\s*\(opt\)/i, '').trim() : null;
    
    // Extract location from title
    let location = null;
    const titleLower = intImmersionFeature.title.toLowerCase();
    if (titleLower.includes('dubai')) {
      location = 'Dubai';
    } else if (titleLower.includes('singapore')) {
      location = 'Singapore';
    } else if (titleLower.includes('london')) {
      location = 'London';
    }
    
    const result = {
      hasInternationalImmersion: true,
      isOptional: isOptional,
      duration: duration,
      location: location
      
    };
    
    console.log("RETURN:", result);
    return result;
  }
  
  const result = {
    hasInternationalImmersion: false,
    isOptional: false,
    duration: null,
    location: null
  };
  
  console.log("RETURN:", result);
  return result;
};

// More flexible EMI duration extractor
const extractEmiDuration = (overviewContent) => {
  if (!overviewContent || !Array.isArray(overviewContent)) {
    return "12"; // Default fallback
  }
  
  const snapshotSection = overviewContent.find(section => 
    section.title.toLowerCase().includes('program snapshot')
  );
  
  if (snapshotSection?.points) {
    const emiPoint = snapshotSection.points.find(point => {
      const lowerPoint = point.toLowerCase();
      return (lowerPoint.includes('no cost emi') || 
              lowerPoint.includes('emi upto') )
    
            });

            console.log(emiPoint)
    
    if (emiPoint) {
      // Try different patterns for extracting numbers
      const patterns = [
        /no cost emi upto (\d+)/i
      ];
      
      for (const pattern of patterns) {
        const match = emiPoint.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
    }
  }
  
  return "12"; // Default fallback
};


// Function to generate templte of the FAQ
const getTemplateData = (programData) => {
    // Extract dynamic values from your existing program data
    const baseUrl = window.location.origin || 'https://yourdomain.com';
    // const policyPath = '/policies/iit-kanpur';
    // const fullPolicyUrl = `${baseUrl}${policyPath}`;
    const universityCode = programData.short_university_name || 'iitk';
    let policyPath;
    if (universityCode.toLowerCase() === 'xlri') {
        policyPath = '/policies/xlri-delhi-policy';
    } else if(universityCode.toLowerCase() === 'iimv'){ 
      policyPath = '/policies/iimv-policy'
    } else if(universityCode.toLowerCase() === 'iim-trichy'){ 
      policyPath = '/policies/iim-trichy-policy'
    }else if(universityCode.toLowerCase() === 'spjain'){
        policyPath = '/policies/spj-policy';
    }else { 
        policyPath = '/policies/iit-kanpur';
    }
    

    const fullPolicyUrl = `${baseUrl}${policyPath}`;
    const hasCampusImmersion = universityCode.toLowerCase() === 'iimv' || universityCode.toLowerCase() === 'iim-trichy' || universityCode.toLowerCase() === 'iitk'  || universityCode.toLowerCase() === 'xlri'?   extractCampusImmersionFromSnapshot(programData.overview.content) :  extractCampusImmersionDuration(programData.key_features);
    console.log("Campus Immersion:", hasCampusImmersion);
        const intImmersionInfo = extractInternationalImmersion(programData.key_features);
let internationalImmersionMainAnswer = "";
let internationalImmersionFeeDetails = "";

console.log(intImmersionInfo)
if (intImmersionInfo.hasInternationalImmersion) {
    if (intImmersionInfo.isOptional) {
        internationalImmersionMainAnswer = `Yes, but **it's optional**. A ${intImmersionInfo.duration} ${intImmersionInfo.location} Immersion is offered at an **additional fee of INR ${Number(programData.campusImmersionCost)?.toLocaleString('en-IN')} + GST**, payable at the time of scheduling. Dates will be shared at least 90 days in advance, subject to hotel availability.`;
        
        internationalImmersionFeeDetails = `**The additional international immersion fee includes double occupancy, boarding, and lodging only.** Participants will need to make their own arrangements and bear the costs for travel, visa, and immigration documentation.`;
    } else {
        internationalImmersionMainAnswer = `Yes, the program includes a ${intImmersionInfo.duration} ${intImmersionInfo.location} Immersion included in the program fee. The dates for the ${intImmersionInfo.location} Immersion will be confirmed at least 90 days before the event, subject to hotel availability.`;
        
        internationalImmersionFeeDetails = `**The program fee includes double occupancy, boarding, and lodging only.** Participants will need to make their own arrangements and bear the costs for travel, visa, and immigration documentation.`;
    }
}
    return {
        instituteName: programData.university_name || null,
        verticalName: programData.short_title || null,
        expirenceTitle: programData.vertical == "cxo leadership" ? "executive leadership" : programData.short_title, 
        programName: programData.title || null,
        duration: programData.duration || null,
        // keyLearnings: programData.key_learnings || null,
        terms: programData?.domain == "term" ? extractDomain(programData.overview?.content) + " Terms" : programData?.domain == "pillar" ? extractDomain(programData.overview?.content) + " Pillars" : programData.duration   || null,
        modules: extractModules(programData.key_features)|| null,
        keyTopics:extractKeyTopics(programData.overview?.content) || null,
        hours: extractHours(programData.key_features) || null,
        workExperienceYears: programData.required_years_experience == 0 || programData.required_years_experience == 1 ? "1 Year" : programData.required_years_experience + " years" || null,
   applicationLink: programData.external_enroll ? `[Link](${programData.external_enroll})` : "[Link](#)",
        careerAssistanceSessions: extractCareerSessions(programData.billing?.points) || null,
        jobOpportunities: extractJobOpportunities(programData.overview?.content) || null,
        fees: programData?.billing?.total?.toLocaleString('en-IN') || null,
        policyLink: `[Policy Details](${fullPolicyUrl})` || null,
                campusImmersionExists: hasCampusImmersion 
            ? `Yes, the program has  ${hasCampusImmersion}`
            : "No, this program does not include campus immersion.",
        campusImmersionDuration: universityCode.toLowerCase() === 'iimv' || universityCode.toLowerCase() === 'iim-trichy' || universityCode.toLowerCase() === 'iitk' || universityCode.toLowerCase() === 'xlri'? extractCampusImmersionFromSnapshot(programData.overview.content) : extractCampusImmersionDuration(programData.key_features),
        campusImmersionText: programData.optionalCampusImmersionCost ?  `at an additional cost of INR ${programData.optionalCampusImmersionCost?.toLocaleString('en-IN')} + GST` : `included in the program fee`,
        campusImmersionfeeType:  programData.optionalCampusImmersionCost ?  `campus immersion` : `program`,
        campusImmersionCost: programData.campusImmersionCost?.toLocaleString('en-IN') || null,
            hasInternationalImmersion: intImmersionInfo.hasInternationalImmersion,
    internationalImmersionMainAnswer: internationalImmersionMainAnswer,
    internationalImmersionFeeDetails: internationalImmersionFeeDetails,
    internationalImmersionLocation: intImmersionInfo.location,
    emiDuration: extractEmiDuration(programData.overview?.content) || "12",
    attendancePercent: programData?.attendancePercent || "75",
    iitkCampusImmersionNoteText: hasCampusImmersion ?  " " : "  ",
        shouldShowCXOQuestion: programData.id  == 'global-senior-leadership-program',
        isAlumniStatusText: programData.isAlumniStatus == "no" ? `No, ${programData.university_name} Executive Alumni Status will **NOT be conferred**. However, learners can network with peers and ${programData.university_name} faculty during the program.` :  programData.isAlumniStatus == "opt"  ? `Yes, but it's optional. Participants will receive ${programData.university_name} Executive Alumni Status at an additional cost of INR 10,000 + GST.` : `Yes. Participants will receive ${programData.university_name} Executive Alumni Status. It is included in the program fees`
    };
};



// Function to check if question should be rendered
const shouldRenderQuestion = (question, templateData) => {
    const questionTitle = question.title.toLowerCase();
    
    // Campus immersion questions
    if (questionTitle.includes('is there a campus immersion') || 
        questionTitle.includes('campus immersion include')) {
        const hasDynamicImmersionPlaceholder = question.content?.some(item => 
            item.includes('{campusImmersion')
        );
        if (hasDynamicImmersionPlaceholder) {
            return templateData.campusImmersionDuration !== null;
        }
        return true;
    }
    
    // International immersion questions
    if (questionTitle.includes('international immersion')) {
        return templateData.hasInternationalImmersion === true;
    }
     if (questionTitle.includes('cxo specialization')) {
        return templateData.shouldShowCXOQuestion === true;
    }
    
    return true; // Render all other questions by default
};

// Function to check if content contains null/undefined values
const hasNullValues = (content, data) => {
    return content.some(item => {
        const processedItem = item.replace(/\{(\w+)\}/g, (match, key) => {
            const value = data[key];
            if (value === null || value === undefined || value === "NA" || value === "") {
                return match;
            }
            return value;
        });
        return processedItem.includes('{') && processedItem.includes('}');
    });
};



export const generateFAQFromTemplate = (programData) => {
    console.log("Program Data:", programData.required_years_experience); // Debugging line    
        
    const universityCode =
    programData.id == "executive-program-in-generative-ai-for-business-leaders" || programData.id == "chief-human-resource-officer-programme"
        ? "iimv-v2"
        : programData.id == "post-graduate-diploma-in-management-for-working-executives"
        ? "iimv-diploma"
        : programData.id == "executive-general-management-program"
        ? "iiml_egmp"
        : programData.id == "executive-program-in-strategic-hr-leadership"
        ? "spj_hr"
        : programData.id == "executive-program-in-strategic-project-management-and-leadership"
        ? "spj_pm"
        : programData.id == "executive-program-in-generative-ai-for-leaders"
        ? "spj_genai"
        : programData.id == "professional-certificate-in-applied-generative-ai"
        ? "spj_applied_genai"
        : programData.id == "iith-professional-certificate-program-in-strategic-project-management"
        ? "iith_strategic_project_management"
        : programData.id == "iith-executive-program-in-design-thinking-and-innovation-for-strategic-leadership"
        ? "iith_design_thinking_innovation"
        : programData.id == "iiml-executive-program-in-strategic-project-management-leadership"
        ? "iiml_strategic_project_management_leadership"
        : programData.id == "iiml-chief-digital-ai-officer-programme-the-cdaio-program"
        ? "iiml_chief_digital_ai_officer_programme"
        : programData.id == "executive-development-programme-for-emerging-chief-technology-officers-the-cto-programme"
        ? "xlri_cto_program"
        : programData.id == "iim-ranchi-senior-management-program"
        ? "iimr_senior_management_program"

        // Newly added FAQ template mappings
        : programData.id == "iima-senior-management-program"
        ? "iim_amritsar_smp"
        : programData.id == "iiml-chief-human-resource-officer-programme-the-chro-program"
        ? "iiml_chro"
        : programData.id == "iit-jammu-executive-program-in-leadership-with-ai"
        ? "iit_jammu_leadership_ai"
        : programData.id == "iim-kashipur-chief-operating-officer-program"
        ? "iim_kashipur_coo"
        : programData.id == "iimr-chief-human-resource-officer-programme-the-chro-program"
        ? "iim_ranchi_chro"
        : programData.id == "iim-ranchi-executive-program-in-leadership-with-ai"
        ? "iim_ranchi_leadership_ai"
        : programData.id == "iimr-executive-program-in-generative-ai-agentic-ai-for-leaders"
        ? "iim_ranchi_genai_agentic_ai"
        : programData.id == "iimr-executive-program-in-strategic-hr-leadership"
        ? "iim_ranchi_strategic_hr"
        : programData.id == "iimr-executive-program-in-strategy-leadership"
        ? "iim_ranchi_strategy_leadership"
        : programData.id == "iimt-certificate-programme-in-leadership-with-ai"
        ? "iim_trichy_leadership_ai"
        : programData.id == "iit-jammu-advanced-certificate-in-ai-for-leaders"
        ? "iit_jammu_ai_leaders"
        : programData.id == "iit-jammu-advanced-certificate-in-generative-ai-for-leaders"
        ? "iit_jammu_genai_leaders"
        : programData.id == "iit-jammu-executive-program-in-generative-ai-and-agentic-ai-for-business-leaders"
        ? "iit_jammu_genai_agentic_ai"
        : programData.id == "professional-certificate-in-ai-for-leaders"
        ? "spj_ai_leaders"
        : programData.id == "sp-jain-executive-program-in-leadership-with-ai"
        ? "spj_leadership_ai"

        : programData.id == "iims-executive-program-in-leadership-with-ai"
        ? "iim_sirmaur_leadership_ai"
        : programData.id == "iims-executive-programme-in-strategy-leadership-and-innovation-in-ai-era"
        ? "iim_sirmaur_strategy_leadership_innovation_ai"

        : 'iitk';
        
    const template = universityFaqTemplates[universityCode];
    console.log(template)
    if (!template) {
        console.error(`Template not found for university: ${universityCode}`);
        return null;
    }


    const templateData = getTemplateData(programData);

    console.log(templateData)


    // Function to replace placeholders in text
    const replacePlaceholders = (text, data) => {
        return text.replace(/\{(\w+)\}/g, (match, key) => {
            const value = data[key];
            if (value === null || value === undefined || value === "NA" || value === "") {
                return match;
            }
            return value;
        });
    };

    // Function to check if text contains unresolved placeholders
    const containsNullPlaceholders = (text, data) => {
        const processed = replacePlaceholders(text, data);
        return processed.includes('{') && processed.includes('}');
    };

    // Process the template and replace placeholders
    const processedSections = template.sections
        .map(section => {
            // Filter out questions that contain null values OR should not render
            const validQuestions = section.questions.filter(question => {
                // Check if title has null values
                const titleHasNulls = containsNullPlaceholders(question.title, templateData);
                
                // Check if any content item has null values
                const contentHasNulls = hasNullValues(question.content, templateData);
                
                // Add conditional rendering check for specific questions
                const shouldRender = shouldRenderQuestion(question, templateData);
                
                return !titleHasNulls && !contentHasNulls && shouldRender;
            });

            return {
                title: replacePlaceholders(section.title, templateData),
                content: validQuestions.map(question => ({
                    title: replacePlaceholders(question.title, templateData),
                    content: question.content.map(contentItem =>
                        replacePlaceholders(contentItem, templateData)
                    )
                }))
            };
        })
        // Filter out sections that have no valid questions left
        .filter(section => section.content.length > 0);


    return {
        programId: programData.programId,
        points: processedSections
    };
};



// export const generateFAQFromTemplate = (programData) => {
//     console.log("Program Data:", programData.required_years_experience); // Debugging line    
//     const universityCode = programData.short_university_name || 'iitk';
//     const template = universityFaqTemplates[universityCode];

//     if (!template) {
//         console.error(`Template not found for university: ${universityCode}`);
//         return null;
//     }

//     const templateData = getTemplateData(programData);

//     // Function to replace placeholders in text
//     const replacePlaceholders = (text, data) => {
//         return text.replace(/\{(\w+)\}/g, (match, key) => {
//             return data[key] || match;
//         });
//     };

//     // Process the template and replace placeholders
//     const processedSections = template.sections.map(section => ({
//         title: replacePlaceholders(section.title, templateData),
//         content: section.questions.map(question => ({
//             title: replacePlaceholders(question.title, templateData),
//             content: question.content.map(contentItem =>
//                 replacePlaceholders(contentItem, templateData)
//             )
//         }))
//     }));

//     return {
//         programId: programData.programId,
//         points: processedSections
//     };
// };


// export const generateFAQFromTemplate = (programData) => {
//     console.log("Program Data:", programData.required_years_experience); // Debugging line    
//     const universityCode = programData.short_university_name || 'iitk';
//     const template = universityFaqTemplates[universityCode];

//     if (!template) {
//         console.error(`Template not found for university: ${universityCode}`);
//         return null;
//     }

//     const templateData = getTemplateData(programData);

//     // Function to replace placeholders in text
//     const replacePlaceholders = (text, data) => {
//         return text.replace(/\{(\w+)\}/g, (match, key) => {
//             const value = data[key];
//             // Return the placeholder if value is null, undefined, "NA", or empty string
//             if (value === null || value === undefined || value === "NA" || value === "") {
//                 return match;
//             }
//             return value;
//         });
//     };

//     // Function to check if text contains unresolved placeholders (indicating null values)
//     const containsNullPlaceholders = (text, data) => {
//         const processed = replacePlaceholders(text, data);
//         return processed.includes('{') && processed.includes('}');
//     };

//     // Process the template and replace placeholders
//     const processedSections = template.sections
//         .map(section => {
//             // Filter out questions that contain null values
//             const validQuestions = section.questions.filter(question => {
//                 // Check if title has null values
//                 const titleHasNulls = containsNullPlaceholders(question.title, templateData);
                
//                 // Check if any content item has null values
//                 const contentHasNulls = question.content.some(contentItem => 
//                     containsNullPlaceholders(contentItem, templateData)
//                 );
                
//                 return !titleHasNulls && !contentHasNulls;
//             });

//             return {
//                 title: replacePlaceholders(section.title, templateData),
//                 content: validQuestions.map(question => ({
//                     title: replacePlaceholders(question.title, templateData),
//                     content: question.content.map(contentItem =>
//                         replacePlaceholders(contentItem, templateData)
//                     )
//                 }))
//             };
//         })
//         // Filter out sections that have no valid questions left
//         .filter(section => section.content.length > 0);

//     return {
//         programId: programData.programId,
//         points: processedSections
//     };
// };