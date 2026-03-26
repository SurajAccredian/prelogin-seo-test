import React from "react";
import { useSelector } from "react-redux";
import FaqTemplateVersion from "./FaqTemplateVersion";
import FaqOld from "./FaqOld";

const FAQ = () => {
  const { data } = useSelector(state => state.program);

  if (data?.short_university_name === 'iimv' || data?.short_university_name === 'iitk' || data?.short_university_name === 'xlri' || data?.short_university_name === 'iiml' || data?.short_university_name === 'iim-trichy' || data?.id == 'executive-program-in-strategic-hr-leadership' || data?.id == 'executive-program-in-strategic-project-management-and-leadership' || data?.id == 'executive-program-in-generative-ai-for-leaders' || data?.id == 'professional-certificate-in-applied-generative-ai') {
    return <FaqTemplateVersion data={data} />;
  }

  return <FaqOld data={data} />;
};

export default FAQ;
