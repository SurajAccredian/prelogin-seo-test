import React from "react";

const Instructor = ({ data }) => {
  const { instructor } = data;
  if (!instructor) return null;

  return (
    <div className="instructor-card" data-cms="instructor">
      <div className="instructor-photo">
        <img src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Faculty/prateek_kumar.webp" alt={instructor.name} />
      </div>
      <div>
        <h3 className="instructor-name" data-cms="instructor.name">{instructor.name}</h3>
        <p className="instructor-title" data-cms="instructor.title">{instructor.title}</p>
        <div className="instructor-facts">
          <div className="instructor-fact">
            <strong>Experience</strong>
            <span data-cms="instructor.experience">{instructor.experience}</span>
          </div>
          <div className="instructor-fact">
            <strong>Certifications</strong>
            <span data-cms="instructor.certifications">{instructor.certifications}</span>
          </div>
        </div>
        <p className="instructor-bio" data-cms="instructor.bio">{instructor.bio}</p>
      </div>
    </div>
  );
};

export default Instructor;
