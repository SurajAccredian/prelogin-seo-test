export default function SkeletonWL() {
  return (
    <div className="flex flex-col gap-2 w-full animate-pulse">
      <div className="mb-[30px] bg-gray-200 w-full h-[80px] rounded-sm" />
      <div className="mx-[35px] my-[10px] bg-gray-200 w-[95%] h-[500px] rounded-lg" />
    </div>
  );
}