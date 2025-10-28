import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { getCategoryStyle } from "../../utils/helpers";

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
  customValue = false,
  addCustomPlaceholder = "Tekan Enter untuk menambah:",
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

  const handleAddCustomValue = (customText) => {
    if (!customText.trim() || disabled) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (!currentValues.includes(customText.trim())) {
        onChange([...currentValues, customText.trim()]);
      }
    } else {
      onChange(customText.trim());
    }
    setSearchTerm("");
    if (!multiple) {
      setIsDropdownOpen(false);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && customValue && searchTerm.trim()) {
      e.preventDefault();
      handleAddCustomValue(searchTerm);
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
      return currentValues.map((val) => {
        const option = options.find((opt) => opt.value === val);
        return option || { value: val, label: val, color: null };
      });
    } else {
      if (value) {
        const option = options.find((opt) => opt.value === value);
        return option ? [option] : [{ value, label: value, color: null }];
      }
      return [];
    }
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasSelectedItems = multiple
    ? Array.isArray(value) && value.length > 0
    : value !== null && value !== undefined && value !== "" && String(value).trim() !== "";

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
        <label className="font-bold text-gray-800">
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
                    style={getCategoryStyle(item.color)}
                    className={`inline-flex items-center gap-1 ${
                      item.color
                        ? `bg-${item.color}-100 text-${item.color}-700`
                        : "bg-orange-100 text-orange-700"
                    } px-2.5 py-1 rounded-full text-sm font-medium`}
                  >
                    {item.label}
                    {!disabled && (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.value);
                        }}
                        className="hover:bg-orange-200 rounded-full p-0.5 transition-colors cursor-pointer"
                        aria-label={`Hapus ${item.label}`}
                      >
                        <IoMdClose className="text-sm" />
                      </span>
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
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    clearAll(e);
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1 transition-colors cursor-pointer"
                  aria-label="Hapus semua"
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
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            {/* Search Input */}
            {(options.length > 5 || customValue) && (
              <div className="p-2 border-b border-gray-200">
                <input
                  type="text"
                  placeholder={customValue ? `${searchPlaceholder} atau ${addCustomPlaceholder}` : searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
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
              {/* Custom Value Option */}
              {customValue && searchTerm.trim() && 
               !filteredOptions.find(opt => opt.label.toLowerCase() === searchTerm.toLowerCase()) &&
               !(multiple ? (Array.isArray(value) && value.includes(searchTerm.trim())) : value === searchTerm.trim()) && (
                <div
                  onClick={() => handleAddCustomValue(searchTerm)}
                  className="px-4 py-2.5 cursor-pointer transition-colors flex items-center gap-3 text-blue-600 hover:bg-blue-50 border-b border-gray-100"
                  role="option"
                >
                  <span className="text-blue-500">+</span>
                  <span>Tambah "{searchTerm.trim()}"</span>
                </div>
              )}

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
              ) : !customValue || !searchTerm.trim() ? (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  {searchTerm
                    ? `Tidak ada hasil untuk "${searchTerm}"`
                    : "Tidak ada pilihan tersedia"}
                </div>
              ) : null}
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
