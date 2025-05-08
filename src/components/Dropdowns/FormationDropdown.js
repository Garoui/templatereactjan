import React, { useState, useEffect, useRef } from "react";

export default function FormationDropdown({ 
  formations, 
  selectedFormation,  // Changé pour une seule formation
  setSelectedFormation // Changé pour un setter simple
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectFormation = (formation) => {
    setSelectedFormation(formation);
    setOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border px-3 py-2 rounded text-left bg-white"
      >Selection une seul formation    :
        {selectedFormation 
          ? selectedFormation.titre
          : "Sélectionnez une formation"}
        <span className="float-right">▼</span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white border rounded shadow-lg">
          {formations.map(({ categorie, formations: list }, idx) => (
            <div key={idx} className="p-2 border-b last:border-b-0">
              <div className="font-semibold text-blueGray-700 mb-1">
                {categorie}
              </div>
              <ul>
                {list.map(formation => (
                  <li 
                    key={formation._id} 
                    className={`p-1 cursor-pointer hover:bg-blueGray-100 ${
                      selectedFormation?._id === formation._id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => selectFormation(formation)}
                  >
                    {formation.titre}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}