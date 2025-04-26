import React, { useState, useEffect, useRef } from "react";

export default function FormationDropdown({ formations, selectedFormations, setSelectedFormations }) {
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

  // Toggle selection
  const toggleFormation = (id) => {
    if (selectedFormations.includes(id)) {
      setSelectedFormations(selectedFormations.filter(f => f !== id));
    } else {
      setSelectedFormations([...selectedFormations, id]);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border px-3 py-2 rounded text-left bg-white"
      >
        {selectedFormations.length === 0
          ? "Sélectionnez des formations"
          : `${selectedFormations.length} formation(s) sélectionnée(s)`}
        <span className="float-right">▼</span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white border rounded shadow-lg">
          {formations.map(({ categorie, formations: list }, idx) => (
            <div key={idx} className="p-2 border-b last:border-b-0">
              <div className="font-semibold text-blueGray-700 mb-1">{categorie}</div>
              <ul>
                {list.map(formation => (
                  <li key={formation._id || formation.titre} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      id={formation._id || formation.titre}
                      checked={selectedFormations.includes(formation._id || formation.titre)}
                      onChange={() => toggleFormation(formation._id || formation.titre)}
                      className="mr-2"
                    />
                    <label htmlFor={formation._id || formation.titre} className="cursor-pointer">
                      {formation.titre}
                    </label>
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
