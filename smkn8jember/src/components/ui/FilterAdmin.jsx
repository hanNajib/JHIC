import React, { useState, useMemo } from "react";
import { IoMdAdd } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineVerified } from "react-icons/md";

const SoftDeleteSegmentedButton = ({ value, onChange }) => {
  const options = [
    { value: 'active', label: 'Aktif' },
    { value: 'deleted', label: 'Nonaktif' }
  ];

  return (
    <div className="inline-flex bg-gray-50 border border-gray-200 p-1 rounded-lg shadow-sm">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 font-medium text-sm rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 ${value === option.value
              ? 'bg-orange-500 text-white shadow-md scale-105'
              : 'text-gray-600 hover:bg-white hover:text-orange-500 hover:shadow-sm'
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};


const FilterAdmin = ({
  search,
  setSearch,
  handleReset,
  linkTambah,
  descHalaman,
  titleHalaman,
  titleBTN,
  handleRefresh,
  hasSoftDelete = true,
  softDeleteFilter,
  setSoftDeleteFilter,
  filterOptions = {},
  ...props
}) => {
  const [isRotating, setIsRotating] = useState(false);

  const dynamicFilters = useMemo(() => {
    const filterProps = {};
    const setterProps = {};

    Object.keys(props).forEach(key => {
      if (key.startsWith('filter')) {
        const setterName = `set${key.charAt(0).toUpperCase() + key.slice(1)}`;
        if (props[setterName]) {
          filterProps[key] = props[key];
          setterProps[key] = props[setterName];
        }
      }
    });

    return { filterProps, setterProps };
  }, [props]);

  const handleClickRefresh = () => {
    setIsRotating(true);
    handleReset();
    if (handleRefresh) {
      handleRefresh();
    }
    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
        <div>
          <h1 className="font-bold text-gray-900 text-2xl md:text-3xl">
            {titleHalaman}
          </h1>
          <p className="text-gray-600 mt-1 text-base">{descHalaman}</p>
        </div>

        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleClickRefresh}
            className="flex h-11 justify-center items-center gap-2 px-4 text-gray-700 bg-white text-base font-medium border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            title="Refresh Data"
          >
            <BiRefresh
              className={`text-xl transition-transform duration-500 ${isRotating ? "animate-spin-reverse" : ""
                }`}
            />
          </button>

          {linkTambah && (
            <Link
              to={linkTambah}
              className="flex h-11 justify-center items-center gap-2 px-5 text-white bg-orange-500 text-base font-bold rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {titleBTN === "Verifikasi" ? (
                <MdOutlineVerified className="text-xl" />
              ) : (
                <IoMdAdd className="text-xl" />
              )}
              <span>{titleBTN}</span>
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="relative flex-grow min-w-[250px] sm:min-w-[300px]">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
          <input
            type="text"
            placeholder="Cari Data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md"
          />
        </div>

        {/* Filter Dinamis (Select/Dropdown) */}
        {Object.keys(dynamicFilters.filterProps).map((filterName) => {
          const filterValue = dynamicFilters.filterProps[filterName];
          const setterFunction = dynamicFilters.setterProps[filterName];
          const options = filterOptions[filterName] || [];

          // Generate label yang lebih user-friendly
          const getLabelForFilter = (filterName) => {
            const labelMap = {
              'filterMajorId': 'Jurusan',
              'filterCategoryId': 'Kategori',
              'filterStatus': 'Status',
              'filterType': 'Tipe',
              'filterLevel': 'Level',
              'filterYear': 'Tahun'
            };

            return labelMap[filterName] || filterName
              .replace('filter', '')
              .replace(/([A-Z])/g, ' $1')
              .trim();
          };

          const label = getLabelForFilter(filterName);

          const allOptions = [
            { value: 'Semua', label: `Semua ${label}` },
            ...options.map(option => ({
              value: typeof option === 'string' ? option : option.value,
              label: typeof option === 'string' ? option : option.label
            }))
          ];

          return (
            <div key={filterName} className="flex flex-col gap-2 min-w-[160px]">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                {label}
              </label>
              <select
                value={filterValue}
                onChange={(e) => setterFunction(e.target.value)}
                className="h-11 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md bg-white text-sm font-medium text-gray-700 cursor-pointer"
              >
                {allOptions.map((option, i) => (
                  <option key={`${filterName}-${i}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        })}

        {hasSoftDelete && (
          <div className="flex flex-col gap-2 min-w-[140px]">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Status Data
            </label>
            <SoftDeleteSegmentedButton
              value={softDeleteFilter}
              onChange={setSoftDeleteFilter}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterAdmin;