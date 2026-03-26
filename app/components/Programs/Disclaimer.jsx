import React from "react";

function Disclaimer({ ClassName }) {
  return (
    <div>
      <p className={`italic p-3  font-normal md:font-medium ${ClassName}`}>
        *Brochure serves as the primary source for comprehensive information
        about the program.
      </p>
    </div>
  );
}

export default Disclaimer;
