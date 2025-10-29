import parse from "html-react-parser";

const CardFE = ({ data1, data2, data3, data4 }) => {
  return (
    <div className="bg-white w-full  lg:w-full rounded-2xl block shadow-lg transition-all duration-300 lg:hover:-translate-y-3 min-h-52 h-full">
      <img
        src={data1}
        alt={data2}
        className="rounded-t-2xl h-36 lg:h-60 w-full object-cover"
      />
      <div className="flex flex-col items-center justify-center p-2 lg:p-5 gap-1 lg:gap-3">
        <h3 className="text-base lg:text-2xl font-bold text-gray-800 text-center">
          {data2}
        </h3>
        <h5 className="text-orange-500 text-sm lg:text-lg font-semibold">
          {data3}
        </h5>
        <div className="text-center text-xs lg:text-base text-gray-600 line-clamp-4">
          {parse(data4)}
        </div>
      </div>
    </div>
  );
};

export default CardFE;
