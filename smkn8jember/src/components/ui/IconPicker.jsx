import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown, MdSearch } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";

const IconPicker = ({
  value = null,
  onChange,
  placeholder = "Pilih ikon...",
  searchPlaceholder = "Cari ikon...",
  error = "",
  label = "",
  required = false,
  disabled = false,
  className = "",
  iconSize = 20,
  iconLibraries = ["io5", "md", "fa", "ai", "bi", "bs", "fi", "hi", "ri"],
}) => {
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLibrary, setSelectedLibrary] = useState("all");

  // Combine all icon libraries
  const allIcons = {
    io: IoIcons,
    io5: Io5Icons,
    md: MdIcons,
    fa: FaIcons,
    ai: AiIcons,
    bi: BiIcons,
    bs: BsIcons,
    fi: FiIcons,
    hi: HiIcons,
    ri: RiIcons,
  };

  const libraryLabels = {
    io: "Ionicons 4",
    io5: "Ionicons 5",
    md: "Material Design",
    fa: "Font Awesome",
    ai: "Ant Design",
    bi: "BoxIcons",
    bs: "Bootstrap",
    fi: "Feather",
    hi: "Heroicons",
    ri: "Remix Icon",
  };

  // Get available icons based on selected libraries
  const getAvailableIcons = () => {
    const icons = [];
    const librariesToUse = iconLibraries.length > 0 ? iconLibraries : Object.keys(allIcons);

    librariesToUse.forEach((lib) => {
      if (allIcons[lib]) {
        Object.entries(allIcons[lib]).forEach(([name, Icon]) => {
          if (typeof Icon === "function" && name !== "IconContext") {
            icons.push({ name, Icon, library: lib });
          }
        });
      }
    });

    return icons;
  };

  const availableIcons = getAvailableIcons();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isDropdownOpen) {
        setIsDropdownOpen(false);
        setSearchTerm("");
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isDropdownOpen]);

  const handleSelect = (iconName) => {
    if (disabled) return;
    onChange(iconName);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    if (disabled) return;
    onChange(null);
  };

  const getIconComponent = (iconName) => {
    if (!iconName) return null;
    
    for (const lib of Object.values(allIcons)) {
      if (lib[iconName]) {
        return lib[iconName];
      }
    }
    return null;
  };

  const SelectedIcon = value ? getIconComponent(value) : null;

  // Filter icons based on search and library
  const filteredIcons = availableIcons.filter((icon) => {
    const matchesSearch = icon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLibrary = selectedLibrary === "all" || icon.library === selectedLibrary;
    return matchesSearch && matchesLibrary;
  });

  // Get unique libraries from available icons
  const availableLibraries = [...new Set(availableIcons.map(icon => icon.library))];

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="font-bold text-gray-800 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative" ref={dropdownRef}>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
          disabled={disabled}
          className={`w-full min-h-[42px] px-3 py-2 border rounded-lg text-left focus:outline-none focus:ring-2 transition-all ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-orange-200 focus:border-orange-500"
          } ${
            isDropdownOpen ? "ring-2 ring-orange-200 border-orange-500" : ""
          } ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""}`}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          aria-label={label || placeholder}
          aria-disabled={disabled}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 flex-1 min-h-[24px]">
              {SelectedIcon ? (
                <>
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-lg">
                    <SelectedIcon size={iconSize} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {value}
                  </span>
                </>
              ) : (
                <span className="text-gray-400 text-sm py-0.5">
                  {placeholder}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 ml-2">
              {value && !disabled && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={clearSelection}
                  className="text-gray-400 hover:text-gray-600 p-1 transition-colors cursor-pointer"
                  aria-label="Hapus pilihan"
                >
                  <IoMdClose className="text-lg" />
                </span>
              )}
              <MdKeyboardArrowDown
                className={`text-xl text-gray-500 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && !disabled && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-w-2xl">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200 space-y-2">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </div>

              {/* Library Filter */}
              {availableLibraries.length > 1 && (
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedLibrary("all")}
                    className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                      selectedLibrary === "all"
                        ? "bg-orange-100 text-orange-700 font-medium"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Semua
                  </button>
                  {availableLibraries.map((lib) => (
                    <button
                      type="button"
                      key={lib}
                      onClick={() => setSelectedLibrary(lib)}
                      className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                        selectedLibrary === lib
                          ? "bg-orange-100 text-orange-700 font-medium"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {libraryLabels[lib] || lib.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Icons Grid */}
            <div
              className="max-h-80 overflow-y-auto p-3"
              role="listbox"
              aria-label="Daftar ikon"
            >
              {filteredIcons.length > 0 ? (
                <div className="grid grid-cols-6 gap-2">
                  {filteredIcons.slice(0, 150).map((icon) => {
                    const isSelected = value === icon.name;
                    const IconComponent = icon.Icon;

                    return (
                      <button
                        type="button"
                        key={icon.name}
                        onClick={() => handleSelect(icon.name)}
                        className={`group flex flex-col items-center justify-center p-3 rounded-lg transition-all hover:scale-105 ${
                          isSelected
                            ? "bg-orange-100 text-orange-700 ring-2 ring-orange-500"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                        role="option"
                        aria-selected={isSelected}
                        title={icon.name}
                      >
                        <IconComponent 
                          size={iconSize + 4} 
                          className="transition-transform group-hover:scale-110"
                        />
                        <span className="text-[9px] mt-1 text-center truncate w-full opacity-0 group-hover:opacity-100 transition-opacity">
                          {icon.name.replace(/^(Io|Io5|Md|Fa|Ai|Bi|Bs|Fi|Hi|Ri)/, '')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="px-4 py-12 text-center text-gray-500 text-sm">
                  {searchTerm
                    ? `Tidak ada ikon untuk "${searchTerm}"`
                    : "Tidak ada ikon tersedia"}
                </div>
              )}

              {filteredIcons.length > 150 && (
                <div className="mt-3 text-center text-xs text-gray-500">
                  Menampilkan 150 dari {filteredIcons.length} ikon. Gunakan pencarian untuk hasil lebih spesifik.
                </div>
              )}
            </div>

            {/* Footer */}
            {value && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                Dipilih: <span className="font-medium text-gray-800">{value}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <span className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default IconPicker;