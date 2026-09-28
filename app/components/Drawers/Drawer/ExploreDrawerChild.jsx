import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoChevronBackOutline, IoClose } from 'react-icons/io5'
import { groupProgramsByCategory, sortVerticalProgramsByStatus } from '../../../helpers/common.helpers'
import programs from "../../../Assets/constants/programs.json"
import { Clock, MapPin } from 'lucide-react'

const ExploreDrawerChild = ({ innerIsOpen, innerOnClose, streamWithTab, handleCloseAll }) => {

  const [categorizedPrograms, setCategorizedPrograms] = useState([])

  useEffect(() => {
    const fetchPrograms = groupProgramsByCategory(programs)
    const sortedPrograms = sortVerticalProgramsByStatus(fetchPrograms)
    setCategorizedPrograms(sortedPrograms || [])
  }, [])

  return (
    <Drawer onClose={innerOnClose} isOpen={innerIsOpen} size={"full"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <div className='flex-1 py-[26px] font-circular'>
            <div className='w-full py-2 flex items-center justify-between'>
              <button className='flex items-center gap-1 font-medium py-1' onClick={() => innerOnClose()}>
                <IoChevronBackOutline />
                Back
              </button>
              <button className='flex items-center gap-1 font-medium py-1 px-1 text-lg hover:bg-neutral-300/30' onClick={handleCloseAll}>
                <IoClose />
              </button>
            </div>
            {streamWithTab && (
              <>
                <h1 className='font-bold text-2xl capitalize mt-2 mx-1'>{streamWithTab}</h1>
                <div className='w-full flex flex-wrap mt-4 py-2 max-h-[70vh] px-1 overflow-y-scroll gap-4 custom-scrollbar'>
                  {categorizedPrograms &&
                    categorizedPrograms[streamWithTab.toLowerCase()]?.map((val, index) => (
                      <a
                        onClick={handleCloseAll}
                        href={val.category?.toLowerCase() === "free courses" || val.category?.toLowerCase() === "microsoft" || val.id === "transform-business-workflows-with-generative-ai" || val.id === "transform-ideas-into-impact-with-product-management" ? `/free-courses/${val.id}` : `/programs/${val.id}`}
                        className='w-full'
                        key={index}
                        type='div'
                      >
                        <div className="relative flex flex-col px-6 py-4 w-full h-full transition-all duration-300 cursor-pointer overflow-hidden group bg-card rounded hover:bg-accent/5 hover:bg-blue-500/5">
                          {/* Blue Line */}
                          <div className="absolute top-0 left-0 h-[3px] bg-[#1a73e8] w-0 transition-all duration-300 ease-out group-hover:w-full"></div>

                          {/* TOP SECTION */}
                          <div>
                            <div className="flex items-start gap-3 mb-3">
                              <img
                                src={val.university_image}
                                alt={val.university_name}
                                className="w-12 h-12 object-contain flex-shrink-0"
                              />

                              <div>
                                <p className="text-sm font-medium text-[#9aa0b5]">
                                  {val.university_name}
                                </p>

                                <h3 className="font-semibold text-base leading-tight mt-2">
                                  {val.program_name}
                                </h3>
                              </div>
                            </div>
                          </div>

                          {/* BOTTOM SECTION */}
                          <div className="border-t pt-2 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2 text-xs text-[#9aa0b5]">
                              {val.duration && (
                                <div className="flex items-center gap-0.5 text-nowrap">
                                  <Clock className="w-4 h-4" />
                                  <span>{val.duration}</span>
                                </div>
                              )}

                              {val.batch_type && (
                                <div className="flex items-center gap-0.5 text-nowrap">
                                  <MapPin className="w-4 h-4" />
                                  <span>{val.batch_type}</span>
                                </div>
                              )}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs ${val.status.toLowerCase() === "admission closed" ? "bg-red-100 text-red-500" : "text-[#3366ff] bg-[#e8f0ff]"} whitespace-nowrap capitalize`}>
                              {val.status}
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                </div>
              </>
            )}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default ExploreDrawerChild