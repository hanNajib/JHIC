import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, useRef, useEffect } from "react";

const Multiselect = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Pilih...",
  searchPlaceholder = "Cari...",
  error = "",
  label = "",
  required = false,
  multiple = true,
  disabled = false,
  className = "",
  color = "",
}) => {
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleToggle = (optionValue) => {
    if (disabled) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const isSelected = currentValues.includes(optionValue);

      if (isSelected) {
        onChange(currentValues.filter((v) => v !== optionValue));
      } else {
        onChange([...currentValues, optionValue]);
      }
    } else {
      if (value === optionValue) {
        onChange(null); 
      } else {
        onChange(optionValue);
      }
      setIsDropdownOpen(false);
      setSearchTerm("");
    }
  };

  const removeItem = (optionValue) => {
    if (disabled) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      onChange(currentValues.filter((v) => v !== optionValue));
    } else {
      onChange(null);
    }
  };

  const clearAll = (e) => {
    e.stopPropagation();
    if (disabled) return;
    onChange(multiple ? [] : null);
  };

  const getSelectedItems = () => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      return options.filter((opt) => currentValues.includes(opt.value));
    } else {
      return value ? options.filter((opt) => opt.value === value) : [];
    }
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasSelectedItems = multiple
    ? Array.isArray(value) && value.length > 0
    : value !== null && value !== undefined && value !== "";

  const selectedCount = multiple
    ? Array.isArray(value)
      ? value.length
      : 0
    : value
    ? 1
    : 0;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="font-bold text-gray-800 mb-1">
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
            <div className="flex flex-wrap gap-2 flex-1 min-h-[24px]">
              {hasSelectedItems ? (
                getSelectedItems().map((item) => (
                  <span
                    key={item.value}
                    className={`inline-flex items-center gap-1 ${item.color ? `bg-${item.color}-100 text-${item.color}-700` : 'bg-orange-100 text-orange-700'} px-2.5 py-1 rounded-full text-sm font-medium`}
                  >
                    {item.label}
                    {!disabled && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.value);
                        }}
                        className="hover:bg-orange-200 rounded-full p-0.5 transition-colors"
                        aria-label={`Hapus ${item.label}`}
                      >
                        <IoMdClose className="text-sm" />
                      </button>
                    )}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm py-0.5">
                  {placeholder}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 ml-2">
              {hasSelectedItems && !disabled && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
                  aria-label="Hapus semua"
                >
                  <IoMdClose className="text-lg" />
                </button>
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
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            {/* Search Input */}
            {options.length > 5 && (
              <div className="p-2 border-b border-gray-200">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </div>
            )}

            {/* Options List */}
            <div
              className="max-h-60 overflow-y-auto"
              role="listbox"
              aria-label="Daftar pilihan"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = multiple
                    ? Array.isArray(value) && value.includes(option.value)
                    : value === option.value;

                  return (
                    <div
                      key={option.value}
                      onClick={() => handleToggle(option.value)}
                      className={`px-4 py-2.5 cursor-pointer transition-colors flex items-center gap-3 ${
                        isSelected
                          ? "bg-orange-50 text-orange-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {multiple && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 accent-orange-500 cursor-pointer"
                          tabIndex={-1}
                          aria-hidden="true"
                        />
                      )}
                      <span className={isSelected ? "font-medium" : ""}>
                        {option.label}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  {searchTerm
                    ? `Tidak ada hasil untuk "${searchTerm}"`
                    : "Tidak ada pilihan tersedia"}
                </div>
              )}
            </div>

            {/* Footer - Selected Count */}
            {multiple && selectedCount > 0 && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                {selectedCount} item dipilih
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

export default Multiselect;