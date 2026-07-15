import React from "react";
import { Key, Clock, Tv, Grid, BookOpen, Globe, Award, Wrench } from "lucide-react";

const getIcon = (label) => {
  switch (label?.toLowerCase()) {
    case "access":
      return <Key className="w-5 h-5 text-[#1a73e8]" />;
    case "duration":
      return <Clock className="w-5 h-5 text-[#1a73e8]" />;
    case "learning format":
      return <Tv className="w-5 h-5 text-[#1a73e8]" />;
    case "modules":
      return <Grid className="w-5 h-5 text-[#1a73e8]" />;
    case "lessons":
      return <BookOpen className="w-5 h-5 text-[#1a73e8]" />;
    case "language":
      return <Globe className="w-5 h-5 text-[#1a73e8]" />;
    case "prerequisites":
      return <Award className="w-5 h-5 text-[#1a73e8]" />;
    case "tools covered":
      return <Wrench className="w-5 h-5 text-[#1a73e8]" />;
    default:
      return <BookOpen className="w-5 h-5 text-[#1a73e8]" />;
  }
};

const Snapshot = ({ data }) => {
  return (
    <div className="snapshot-grid">
      {data.snapshot?.map((item, idx) => (
        <div key={idx} className="snapshot-item">
          <div className="snapshot-icon-wrapper">
            {getIcon(item.label)}
          </div>
          <div className="snapshot-text-wrapper">
            <span className="meta-label">{item.label}</span>
            <span className="meta-value">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Snapshot;
