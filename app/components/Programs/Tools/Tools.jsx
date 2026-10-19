import { useSelector } from "react-redux";
import "./Tools.css"

const Tools = ({ data: propData }) => {
  const reduxProgram = useSelector(state => state.program);
  const data = propData || reduxProgram.data;

  if (!data?.tools || data.tools.length === 0) {
    return null;
  }

  return (
    <div id="tools" className='tools w-full overflow-hidden flex flex-col items-center py-12 xl:px-12 px-4'>
      <div className="w-full max-w-[85rem] text-center">
        <h4 className="text-base font-medium">Key <span className="text-universal">{data?.short_title}</span> tools</h4>
        <h2 className='text-2xl md:text-3xl mt-2 font-semibold capitalize'>Essential <span className="text-universal">Tools</span> For Unlocking <span className="text-universal">Growth</span></h2>
      </div>
      <div className="w-full max-w-[85rem] hidden md:flex flex-wrap justify-center gap-4 mt-12">
        {data?.tools?.map((tool, index) => (
          <div className="p-5 rounded-2xl bg-white drop-shadow-xl border flex flex-col items-center justify-center min-h-[4rem] max-w-[9rem] w-full" key={index}>
            <div className="md:w-12 w-8 md:h-12 h-8 flex-shrink-0">
              <img className="w-full h-full object-contain" src={tool?.icon} alt={tool?.title} />
            </div>
            <h4 className="text-sm font-semibold capitalize mt-3 text-nowrap">{tool?.title}</h4>
          </div>
        ))}
      </div>
      <div className="w-full max-w-[85rem] md:hidden grid grid-cols-3 justify-center gap-4 mt-12">
        {data?.tools?.slice(0, 9).map((tool, index) => (
          <div className="p-5 rounded-2xl bg-white drop-shadow-xl border flex flex-col items-center justify-center min-h-[4rem] max-w-[9rem] w-full" key={index}>
            <div className="md:w-12 w-8 md:h-12 h-8 flex-shrink-0">
              <img className="w-full h-full object-contain" src={tool?.icon} alt={tool?.title} />
            </div>
            <h4 className="text-sm font-semibold capitalize mt-3 text-nowrap">{tool?.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
