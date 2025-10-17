const CardGK = ({ data1, data2, data3 }) => {
  return (
    <div className="bg-white w-full rounded-2xl flex flex-col justify-center items-center shadow-lg transition-all duration-300 lg:hover:-translate-y-3 gap-2 p-5">
      <img
        src={data3}
        alt={data1}
        className=" h-30 w-30 lg:h-60 lg:w-60 object-cover rounded-full"
      />
      <h3 className="text-base lg:text-xl font-bold text-gray-800 text-center">
        {data1}
      </h3>
      <h5 className="text-orange-500 text-xs lg:text-lg font-semibold">
        {data2}
      </h5>
    </div>
  );
};

export default CardGK;
