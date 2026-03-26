import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io'

import './ExploreDropDown.css';
import ExpTail from './ExpTail';

const ExploreDropDown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className="explore-butt-container"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <button className="explore-2-butt hidden md:flex items-center gap-1 px-[18px] py-[8px] bg-universal hover:bg-darkBlue rounded-md text-white font-medium text-base text-nowrap">
        Courses
        <IoIosArrowDown className="button-explore-icon" />
      </button>
      <ExpTail isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setDropdownOpen} />
    </div>
  );
};

export default ExploreDropDown;
