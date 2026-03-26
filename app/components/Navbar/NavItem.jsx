"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import React from "react";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";

const NavItem = ({ item }) => {
  return (
    <>
      {item.children ? (
        <Popover trigger="hover" openDelay={100}>
          <PopoverTrigger>
            <h2
              key={item.label}
              className="font-medium cursor-pointer capitalize"
            >
              <div className="flex justify-center items-center gap-1">
                {item.label}
                <span className="inline-block">
                  <FaChevronDown size={15} />
                </span>
              </div>
            </h2>
          </PopoverTrigger>
          <PopoverContent left={"30%"} top={4} className="pop-content">
            {item.children.map((child, index) => {
              return (
                <div key={`nav_child_${index}`}>
                  {child.children ? (
                    <Popover openDelay={100} trigger="hover">
                      <PopoverTrigger>
                        <div className="px-4 py-2 hover:text-universal hover:bg-universal/15 rounded-md flex items-center justify-between cursor-pointer">
                          <h2 className="font-medium capitalize">
                            {child.label}
                          </h2>
                          <FaAngleRight />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent left="40%" top={-5} className="pop-content">
                        {child.children.map((inner_child, index) => (
                          <div
                            key={index}
                            className="py-2 px-4 hover:text-universal hover:bg-universal/15 rounded-md cursor-pointer"
                          >
                            {inner_child?.redirect ? (
                              <a rel="noreferrer" target="_blank" href={inner_child.href}>
                                <h2 className="font-medium capitalize">
                                  {inner_child.label}
                                </h2>
                              </a>
                            ) : (
                              <Link href={inner_child.href}>
                                <h2 className="font-medium capitalize">
                                  {inner_child.label}
                                </h2>
                              </Link>
                            )}
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <div className="w-full py-2 px-4 hover:text-universal hover:bg-universal/15 rounded-md cursor-pointer">
                      {child?.redirect ? (
                        <a rel="noreferrer" target="_blank" href={child.href}>
                          <h2 className="font-medium capitalize">
                            {child.label}
                          </h2>
                        </a>
                      ) : (
                        <Link href={child.href}>
                          <h2 className="font-medium capitalize">
                            {child.label}
                          </h2>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </PopoverContent>
        </Popover>
      ) : (
        <h2 key={item.label} className="font-medium cursor-pointer capitalize">
          {item.redirect ? (
            <a rel="noreferrer" target="_blank" href={item.href}>
              {item.label}
            </a>
          ) : (
            <Link href={item.href}>{item.label}</Link>
          )}
        </h2>
      )}
    </>
  );
};

export default NavItem;
