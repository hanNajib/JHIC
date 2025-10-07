const Drop = ({ label, name, options, value, onChange, placeholder, showPlaceholder }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-bold text-gray-800">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg 
                   focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
      >
        {/* hanya tampilkan placeholder kalau diaktifkan */}
        {showPlaceholder && <option value="">{placeholder || "-- Pilih --"}</option>}

        {/* cek apakah options berupa array string atau array objek */}
        {options.map((opt, index) =>
          typeof opt === "string" ? (
            <option key={index} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.id} value={opt.id}>
              {opt.kategori}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default Drop;