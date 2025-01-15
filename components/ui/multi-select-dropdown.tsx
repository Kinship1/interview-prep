import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";

interface MultiSelectDropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  options: string[];
  onChange: (selected: string[]) => void;
  label?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  isOpen,
  setIsOpen,
  options,
  onChange,
  label,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="text-sm font-medium">{label}</label>
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 mt-2 text-left bg-white border rounded shadow-sm flex items-center justify-between"
      >
        {selectedOptions.length > 0
          ? `${selectedOptions.length} selected`
          : "Select options..."}
        <ChevronDown className="float-right h-4 w-4 opacity-50" />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                selectedOptions.includes(option)
                  ? "bg-gray-100 font-semibold"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedOptions.includes(option)}
                readOnly
              />
              {option}
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedOptions.map((option) => (
          <div
            key={option}
            className="flex items-center px-2 py-1 text-sm bg-gray-200 rounded"
          >
            {option}
            <button
              onClick={() => handleSelect(option)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
