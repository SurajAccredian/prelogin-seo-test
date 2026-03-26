import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper/HomePageWrapper";
import { POLICIES } from "../Assets/admission-policies";
import parse from "html-react-parser";

import "./Policy.css";
import Link from "next/link"; import { useParams } from "next/navigation";
import { useDisclosure } from "@chakra-ui/react";
import { TiDocumentText } from "react-icons/ti";
import PolicyDrawer from "../Drawers/PolicyDrawer/PolicyDrawer";

const Admission = () => {
  const { id } = useParams();

  const [policyWithTab, setPolicyWithTab] = useState(null);

  useEffect(() => {
    const data = POLICIES.find((policy) => policy.tab === id);

    setPolicyWithTab(data);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [id]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Wrapper>
      <div className="w-full min-h-screen flex justify-center xl:px-12 px-4 font-circular">
        <div className="max-w-[85rem] w-full py-8">
          {/* upper section */}
          <div className="w-full flex md:gap-4 xl:gap-12">
            <div className="flex-[0.32] lg:block hidden">
              <div className="w-full xl:px-5 rounded">
                <h1 className="text-lg font-semibold text-neutral-600">
                  Admission Policies
                </h1>
              </div>
            </div>
            <div className="flex-1">
              <div className="lg:hidden flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-semibold">
                  Admission Policies
                </h1>
                <button
                  onClick={() => onOpen()}
                  className="px-4 py-2 bg-universal/10 rounded-md lg:hidden flex items-center gap-1"
                  title={"Select Policies"}
                >
                  <TiDocumentText className="text-neutral-700" size={20} />
                  <h1 className="text-nowrap truncate">Select Policies</h1>
                </button>
              </div>
              <h1 className="lg:mt-0 mt-6 text-xl text-neutral-700 text-start font-semibold lg:text-center">
                {policyWithTab?.title}
              </h1>
            </div>
          </div>
          {/* down section */}
          <div className="w-full flex md:gap-4 xl:gap-12">
            <div className="flex-[0.32] py-2 lg:block hidden">
              <div className="w-full xl:px-5 rounded">
                <div className="flex flex-col gap-1 mt-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
                  {POLICIES.map((policy, index) => (
                    <Link
                      href={`/policies/${policy.tab}`}
                      className={`w-full ${
                        id === policy.tab
                          ? "bg-universal drop-shadow text-white rounded"
                          : "border-b border-dashed border-universal text-neutral-600"
                      } px-3 py-2  mt-2 cursor-pointer flex items-center justify-between gap-4`}
                      key={index}
                    >
                      <h1 className="font-medium text-base">{policy.title}</h1>
                      <div className="w-5 h-5 flex-shrink-0">
                        <svg
                          className="w-full h-full"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 6L15 12L9 18"
                            stroke={id === policy.tab ? "#fff" : "#1A73E8"}
                            strokeWidth="1.3"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="policy-inner w-full py-0 md:py-2 lg:py-8 mt-4 lg:overflow-y-auto custom-scrollbar lg:max-h-[65vh] lg:px-4">
                {policyWithTab && parse(policyWithTab?.body)}
              </div>
              <p className="mt-10">
                <span className="font-semibold">Disclaimer:</span> The timing,
                duration, instructors, and curriculum mentioned above are
                subject to change or revision based on prevailing circumstances
                and at the discretion of the concerned Institute or Accredian.
              </p>
            </div>
          </div>
        </div>
      </div>
      <PolicyDrawer onClose={onClose} isOpen={isOpen} id={id} />
    </Wrapper>
  );
};

export default Admission;
