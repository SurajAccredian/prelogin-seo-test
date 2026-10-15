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
        <div className="w-full">
          <div className="grid grid-cols-1 md:flex md:justify-center p-4 gap-6 md:gap-10 rounded-xl">
            {data.stats.map((stats, index) => {
              const isLast = index === data.stats.length - 1;
              return (
                <div
                  key={index}
                  className={`flex flex-row md:flex-col justify-start md:justify-center items-center text-left md:text-center gap-4 ${
                    isLast
                      ? "border-b-0 md:border-r-0 pr-0"
                      : "border-b-2 md:border-b-0 md:border-r-2 pb-4 md:pb-0 pr-0 md:pr-4"
                  }`}
                >
                  <div className="flex justify-center items-center text-universal text-center font-semibold w-16 h-16 md:w-20 md:h-16 bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <h2 className="text-base md:text-2xl">{stats.text}</h2>
                  </div>
                  <div>
                    <p className="text-sm md:text-base max-w-[300px] text-gray-700">{stats.title}</p>
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
