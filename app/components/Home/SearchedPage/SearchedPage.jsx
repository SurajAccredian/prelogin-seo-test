"use client";
import { useEffect, useState, Suspense } from "react";
import PROGRAMS from "../../Assets/programs.json";
import "../Programs/Programs.css";
import Program from "./Program";
import ProgramFilters from "../../Inputs/Filters/ProgramFilters";
import HomePageWrapper from "../../Wrapper/HomePageWrapper";
import FilterModal from "../../Modals/FilterModal/FilterModal";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { programActions } from "../../../store/reducers/program";
import { VscListFilter } from "react-icons/vsc";
import { useDisclosure } from "@chakra-ui/react";
import FilterPageDrawer from "../../Drawers/FilterPageDrawer/FilterPageDrawer";
import DownloadBrochure from "../../CTA_Modal/download_brochure";
import { useSearchParams, useRouter } from "next/navigation";
import { sortPrograms } from "../../../helpers/common.helpers";
import { useProgramStatuses } from "../../../helpers/useProgramStatuses";

const SearchedPageInner = () => {
  const dispatch = useDispatch();
  const { checkedCategories, checkedTags } = useSelector((state) => state.program);
  const { getProgramStatus } = useProgramStatuses();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [brotureDownloadInfo, setBrotureDownloadInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);

  const categories = [...new Set(PROGRAMS.map((item) => item.category.toLocaleLowerCase()))];
  const tags = [...new Set(PROGRAMS.flatMap((item) => item.tags))];

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClose = () => setOpen(false);

  const parseUrlParams = () => {
    const urlCategories = searchParams.get("verticals")?.split(",") || [];
    const urlTags = searchParams.get("tags")?.split(",") || [];
    dispatch(programActions.setCheckedCategories(urlCategories));
    dispatch(programActions.setCheckedTags(urlTags));
  };

  const handleClickOpenFilterDrawer = () => onOpen();

  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (checkedCategories.length > 0) params.set("verticals", checkedCategories.join(","));
    if (checkedTags.length > 0) params.set("tags", checkedTags.join(","));
    router.replace(`/programs?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (event) => {
    dispatch(programActions.setCheckedCategories(
      event.target.checked
        ? [...checkedCategories, event.target.value]
        : checkedCategories.filter((c) => c !== event.target.value)
    ));
  };

  const handleTagChange = (event) => {
    dispatch(programActions.setCheckedTags(
      event.target.checked
        ? [...checkedTags, event.target.value]
        : checkedTags.filter((t) => t !== event.target.value)
    ));
  };

  useEffect(() => {
    const programfilteredArray = PROGRAMS.filter((item) =>
      checkedCategories.includes(item.category.toLowerCase()) ||
      item.tags.some((tag) => checkedTags.includes(tag))
    );
    setFilteredArray(programfilteredArray);
  }, [checkedCategories, checkedTags]);

  useEffect(() => {
    if (modalCategory) setIsFilterModalOpen(true);
  }, [modalCategory]);

  const handleRemoveCategory = (category) => dispatch(programActions.setCheckedCategories(checkedCategories.filter((c) => c !== category)));
  const handleRemoveTag = (tag) => dispatch(programActions.setCheckedTags(checkedTags.filter((t) => t !== tag)));
  const handleClearClose = () => {
    dispatch(programActions.setCheckedCategories([]));
    dispatch(programActions.setCheckedTags([]));
  };

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }, []);
  useEffect(() => { parseUrlParams(); }, [searchParams]);
  useEffect(() => { updateUrlParams(); }, [checkedCategories, checkedTags]);

  const sortedPrograms = sortPrograms([...(filteredArray.length > 0 ? filteredArray : PROGRAMS)]);

  return (
    <>
      <HomePageWrapper>
        <div className="search-page w-full min-h-screen py-16 flex justify-center font-circular xl:px-12 px-4">
          <div className="max-w-[85rem] w-full">
            <div className="flex items-center">
              <div className="flex-[0.3] lg:block hidden">
                <h2 className="font-semibold text-lg">Filter by</h2>
              </div>
              <div className="flex-1 lg:px-3 flex items-center justify-between">
                <h1 className="text-3xl md:text-[44px] mt-2 font-medium capitalize">Browse Courses</h1>
                <button onClick={handleClickOpenFilterDrawer} className="px-4 py-2 text-nowrap bg-universal/10 rounded-md lg:hidden flex items-center gap-1">
                  <VscListFilter size={20} />
                  Filters{" "}
                  {(checkedCategories.length > 0 || checkedTags.length > 0) && `(${checkedCategories.length + checkedTags.length})`}
                </button>
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="flex-[0.3] py-8 hidden lg:flex flex-col gap-4">
                <ProgramFilters checked={checkedCategories} title="Verticals" categories={categories} onFilterChange={handleCategoryChange} setModalOpen={setModalCategory} />
                <ProgramFilters checked={checkedTags} title="Skills" categories={tags} onFilterChange={handleTagChange} setModalOpen={setModalCategory} />
              </div>
              <div className="flex-1">
                <div className="w-full hidden lg:flex md:flex-wrap items-center gap-2 mt-4 md:overflow-y-auto md:max-h-[200px] md:custom-scrollbar">
                  {checkedCategories?.map((category, index) => (
                    <button key={index} className="py-1 px-2 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium capitalize text-neutral-700 flex items-center gap-1 text-nowrap" onClick={() => handleRemoveCategory(category)}>
                      <span className="pl-1">{category}</span>
                      <IoIosClose size={20} />
                    </button>
                  ))}
                  {checkedTags?.map((tag, index) => (
                    <button key={index} className="py-1 px-2 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium capitalize text-neutral-700 flex items-center gap-1 text-nowrap" onClick={() => handleRemoveTag(tag)}>
                      <span className="pl-1">{tag}</span>
                      <IoIosClose size={20} />
                    </button>
                  ))}
                  {(checkedTags.length > 0 || checkedCategories.length > 0) && (
                    <button className="py-1 px-2 rounded-2xl bg-slate-50 border border-universal text-sm font-medium capitalize text-neutral-700 flex items-center gap-1 text-nowrap" onClick={handleClearClose}>
                      <span className="pl-1 text-universal">clear all</span>
                      <IoIosClose size={20} className="text-universal" />
                    </button>
                  )}
                </div>
                <div className="w-full grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 py-8">
                  {sortedPrograms.map((program, index) => (
                    <Program
                      program={program}
                      key={index}
                      setBrotureDownloadInfo={setBrotureDownloadInfo}
                      setOpen={setOpen}
                      getProgramStatus={getProgramStatus}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomePageWrapper>

      <FilterModal
        handleChange={modalCategory?.toLowerCase() === "verticals" ? handleCategoryChange : handleTagChange}
        setModalCategory={setModalCategory}
        categories={modalCategory?.toLowerCase() === "verticals" ? categories : tags}
        open={isFilterModalOpen}
        setOpen={setIsFilterModalOpen}
        checked={modalCategory?.toLowerCase() === "verticals" ? checkedCategories : checkedTags}
        setChecked={modalCategory?.toLowerCase() === "verticals" ? programActions.setCheckedCategories : programActions.setCheckedTags}
        title={modalCategory?.toLowerCase() === "verticals" ? "Verticals" : "Skills"}
      />

      <FilterPageDrawer
        onTagsChange={handleTagChange}
        onCategoriesChange={handleCategoryChange}
        categories={categories}
        tags={tags}
        onClose={onClose}
        isOpen={isOpen}
      />

      {brotureDownloadInfo && (
        <DownloadBrochure
          open={open}
          handleClose={handleClose}
          source={brotureDownloadInfo.brochure?.source}
          campaign_name={brotureDownloadInfo.brochure?.campaign_name}
          program={brotureDownloadInfo.category}
          pdf={brotureDownloadInfo.brochure?.pdf}
          image={brotureDownloadInfo.brochureHeader}
        />
      )}
    </>
  );
};

export default function SearchedPage() {
  return (
    <Suspense fallback={null}>
      <SearchedPageInner />
    </Suspense>
  );
}