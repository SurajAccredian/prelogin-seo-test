import { useSelector } from "react-redux";

const Stats = ({ data: propData }) => {
  const { data: reduxData } = useSelector((state) => state.program);
  const data = propData || reduxData;

  if (!data?.stats) return null;

  return (
    <div
      id="stats"
      className="tools w-full overflow-hidden flex flex-col items-center py-12 xl:px-12 px-4 capitalize"
    >
      <div className="w-full max-w-[85rem] flex justify-center p-4 text-center">
        <div>
          <div className="hidden md:flex justify-start  p-4 gap-10 rounded-xl">
            {data.stats.map((stats, index) => {
              return (
                <div
                  key={index}
                  className={`flex flex-col justify-start gap-4    items-center ${
                    index === 2 ? "border-r-0 pr-4" : "border-r-2 pr-4"
                  } `}
                >
                  <div className="text-2xl text-universal font-semibold w-20 h-15 bg-blue-100 p-2 rounded-full">
                    <h2>{stats.text}</h2>
                  </div>
                  <div>
                    <p className="max-w-[300px]">{stats.title}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="md:hidden grid grid-cols-1  p-4 gap-10 rounded-xl">
            {data.stats.map((stats, index) => {
              return (
                <div
                  key={index}
                  className={`flex justify-start items-center text-left  gap-4 ${
                    index === 2 ? "border-b-0 pr-4" : "border-b-2 pb-4"
                  } `}
                >
                  <div className="flex justify-center items-center text-universal text-center font-semibold w-full max-w-[70px] bg-blue-100 p-2 rounded-full">
                    <h2 className="text-md md:text-2xl">{stats.text}</h2>
                  </div>
                  <div>
                    <p className="text-md md:text-2xl">{stats.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
