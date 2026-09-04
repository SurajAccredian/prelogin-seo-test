import React from "react";
import { useSelector } from "react-redux";
import FaqTemplateVersion from "./FaqTemplateVersion";
import FaqOld from "./FaqOld";


// app/components/Programs/FAQ/FAQ.jsx
const FAQ = () => {
  const { data } = useSelector(state => state.program);

  if (
    data?.short_university_name === 'iimv' ||
    data?.short_university_name === 'iitk' ||
    data?.short_university_name === 'xlri' ||
    data?.short_university_name === 'iiml' ||
    data?.short_university_name === 'iim-trichy' ||
    data?.short_university_name === 'iim-amritsar' ||
    data?.short_university_name === 'iim-kashipur' ||
    data?.short_university_name === 'iim-ranchi' ||
    data?.short_university_name === 'iit-jammu' ||
    data?.id == 'executive-program-in-strategic-hr-leadership' ||
    data?.id == 'executive-program-in-strategic-project-management-and-leadership' ||
    data?.id == 'executive-program-in-generative-ai-for-leaders' ||
    data?.id == 'professional-certificate-in-applied-generative-ai' ||
    data?.id == 'professional-certificate-in-ai-for-leaders' ||
    data?.id == 'sp-jain-executive-program-in-leadership-with-ai' ||
    data?.id == 'executive-development-programme-for-emerging-chief-technology-officers-the-cto-programme' ||
    data?.id == "iith-professional-certificate-program-in-strategic-project-management" ||
    data?.id == "iith-executive-program-in-design-thinking-and-innovation-for-strategic-leadership" ||
    data?.id == "iiml-executive-program-in-strategic-project-management-leadership" ||
    data?.id == "iiml-chief-digital-ai-officer-programme-the-cdaio-program"
  ) {
    return <FaqTemplateVersion data={data} />;
  }

  return <FaqOld data={data} />;
};

export default FAQ;
