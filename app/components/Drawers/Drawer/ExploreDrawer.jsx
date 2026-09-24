import { useEffect, useState } from 'react'
import { groupProgramsByCategory, sortVerticalProgramsByStatus } from '../../../helpers/common.helpers';
import programs from "../../Assets/programs.json"
import Drawer from "@mui/material/Drawer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Clock, MapPin, X } from 'lucide-react';
import { STREAMS } from '../../Assets/constants';


const ExploreDrawer = ({ isOpen, onClose }) => {

  const [openAccordion, setOpenAccordion] = useState(false);
  const [categorizedPrograms, setCategorizedPrograms] = useState({});
  const [managementSubcategories, setManagementSubcategories] = useState([]);
  const [selectedManagementSubcategory, setSelectedManagementSubcategory] = useState("");

  // Define management subcategories
  const MANAGEMENT_SUBCATEGORIES = [
    "senior management",
    "general management",
    "business management"
  ];

  const sortedStreams = STREAMS.slice()
    .filter((val) => val.category.toLowerCase() !== "free courses")
    .sort((a, b) => a.order - b.order);

  // Move Microsoft to right after PG Diploma
  const microsoftIndex = sortedStreams.findIndex(
    (val) => val.category.toLowerCase() === "microsoft",
  );
  if (microsoftIndex !== -1) {
    const [microsoftStream] = sortedStreams.splice(microsoftIndex, 1);
    const pgDiplomaIndex = sortedStreams.findIndex(
      (val) => val.category.toLowerCase() === "pg diploma",
    );
    sortedStreams.splice(pgDiplomaIndex + 1, 0, microsoftStream);
  }

  useEffect(() => {
    const fetchPrograms = groupProgramsByCategory(programs)
    const sortedPrograms = sortVerticalProgramsByStatus(fetchPrograms)
    setCategorizedPrograms(sortedPrograms || [])

    // Filter management subcategories that have programs
    const availableSubcategories = MANAGEMENT_SUBCATEGORIES.filter(subcat => {
      const programs = sortedPrograms[subcat.toLowerCase()];
      return programs && programs.length > 0;
    });
    setManagementSubcategories(availableSubcategories);

    if (availableSubcategories.length > 0) {
      setSelectedManagementSubcategory(availableSubcategories[0]);
    }
  }, [])

  // Check if there are any management programs at all
  const hasManagementPrograms = managementSubcategories.length > 0;

  // SORT categories based on stream order and prepare for management insertion
  const getVerticalsList = () => {
    const verticals = [];

    sortedStreams.forEach((stream) => {
      // Skip management subcategories in main list
      if (MANAGEMENT_SUBCATEGORIES.includes(stream.category.toLowerCase())) {
        return;
      }

      const key = stream.category.toLowerCase();
      const items = categorizedPrograms[key] || [];

      if (items.length > 0) {
        verticals.push({
          type: 'regular',
          category: stream.category,
          items: items,
          order: stream.order
        });
      }
    });

    // Insert management vertical at position 4 (index 3)
    if (hasManagementPrograms) {
      const insertPosition = Math.min(3, verticals.length);

      verticals.splice(insertPosition, 0, {
        type: 'management',
        category: 'Management',
        subcategories: managementSubcategories,
        items: [] // Items handled dynamically via state
      });
    }

    return verticals;
  };

  const sortedCategories = getVerticalsList();

  const toggleAccordion = (category) => {
    setOpenAccordion(openAccordion === category ? null : category);
  };

  const handleClose = () => {
    onClose();
    setOpenAccordion(null);
  }

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        className: "custom-scrollbar",
        sx: {
          width: "100%",            // full screen drawer
          maxWidth: "420px",        // match screenshot width
          height: "100vh",
          padding: "20px",
        },
      }}
    >
      <div className='flex justify-between items-center'>
        {/* Header */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Courses
        </Typography>
        <button onClick={handleClose}>
          <X />
        </button>
      </div>

      {/* Domains */}
      <Typography
        variant="h3"
        sx={{
          fontSize: "24px",
          fontWeight: 600,
          color: "#000",
          marginBottom: "12px",
        }}
      >
        Domains
      </Typography>

      {/* Accordions */}
      {sortedCategories.map(({ category, items, type, subcategories }) => {
        const isActive = openAccordion === category;

        return (
          <Accordion
            key={category}
            expanded={isActive}
            onChange={() => toggleAccordion(category)}
            disableGutters
            elevation={0}
            square
            sx={{
              borderBottom: "1px solid #e5e5e5",
              "&:before": { display: "none" },
              backgroundColor: "#fff",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                paddingX: 0,
                minHeight: "46px",
              }}
            >
              <Typography
                sx={{ fontSize: "16px", fontWeight: 500, color: "#222", textTransform: "capitalize" }}
              >
                {category}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ paddingLeft: "6px", paddingRight: 0 }}>
              {/* Section title */}
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#444",
                  marginTop: "10px",
                  marginBottom: "8px",
                }}
              >
                {category.toUpperCase()} PROGRAMS
              </Typography>

              {/* Management Tabs */}
              {type === 'management' && (
                <div className="flex items-center gap-3 mb-4 overflow-x-auto custom-scrollbar pb-2">
                  {subcategories.map((subcat) => (
                    <button
                      key={subcat}
                      onClick={() => setSelectedManagementSubcategory(subcat)}
                      className={`capitalize px-3 py-1 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${selectedManagementSubcategory === subcat
                        ? "bg-[#1a73e8] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      {subcat}
                    </button>
                  ))}
                </div>
              )}

              {/* Program list */}
              {(type === 'management'
                ? (categorizedPrograms[selectedManagementSubcategory?.toLowerCase()] || [])
                : items
              ).map((item, index) => {

                // Skip headers if they exist in legacy data (though we redesigned management to not use headers here)
                // But simplified logic: just render programs. 
                // Management programs from categorizedPrograms don't have isHeader.

                const val = item;
                return (
                  <a href={val.category?.toLowerCase() === "free courses" || val.category?.toLowerCase() === "microsoft" || val.id === "transform-business-workflows-with-generative-ai" ? `/free-courses/${val.id}` : `/programs/${val.id}`} className="w-full" key={index} type="div">
                    <div className="relative flex mb-4 flex-col px-2 py-2 h-full min-h-[120px] transition-all duration-300 cursor-pointer overflow-hidden group bg-card rounded hover:bg-accent/5 hover:bg-blue-500/5 shadow-sm border border-transparent hover:border-gray-100">
                      {/* Blue Line */}
                      <div className="absolute top-0 left-0 h-[3px] bg-[#1a73e8] w-0 transition-all duration-300 ease-out group-hover:w-full"></div>
                      {/* TOP SECTION */}
                      <div>
                        <div className="mb-3">
                          <div className="flex ml-1 items-center gap-3">
                            <img
                              src={val.university_image}
                              alt={val.university_name}
                              className="w-6 h-6 object-contain flex-shrink-0"
                            />
                            <p className="text-[13px] font-medium text-gray-700">
                              {val.university_name}
                            </p>
                          </div>
                          <h3 className="font-semibold ml-1 text-[14px] max-w-[90%] w-full leading-tight mt-1">
                            {val.program_name}
                          </h3>
                        </div>
                      </div>
                      {/* BOTTOM SECTION */}
                      <div className="border-t border-gray-100 pt-2 ml-1 max-w-[96%] w-full flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
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
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${val.status.toLowerCase() === "admission closed"
                            ? "bg-red-100 text-red-500"
                            : "text-[#3366ff] bg-[#e8f0ff]"
                            } whitespace-nowrap capitalize`}
                        >
                          {val.status}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Drawer>
  )
}

export default ExploreDrawer