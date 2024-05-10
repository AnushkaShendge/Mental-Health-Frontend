import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke, faAngleDown, faSun, faMoon } from "@fortawesome/free-solid-svg-icons"; // Import the sun and moon icons

export const SearchBar = ({ value, handleSearch, clearSearch, formSubmit, categories, filteredCategories, toggleTheme, theme }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);
  const inputField = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current || !showDropdown || !inputField.current) return;
  
      // Check if the click target is outside the dropdown and trigger
      const isOutsideDropdown = !dropdown.current.contains(target);
      const isOutsideTrigger = !trigger.current.contains(target);
      const isOutsideInput = !inputField.current.contains(target);
      // If the click target is outside the dropdown and trigger, close the dropdown
      if (isOutsideDropdown && isOutsideTrigger && isOutsideInput) {
        setShowDropdown(false);
      }
    };
  
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [showDropdown]);
  
  
  

  // Close dropdown if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!showDropdown || keyCode !== 27) return;
      setShowDropdown(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [showDropdown]);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCategorySelect = (category) => {
    handleSearch({ target: { value: category } });
    setShowDropdown(false);
  };

  return (
    <div className='search-bar'>
      <form onSubmit={formSubmit}>
        <div className="dropdown">
          <div className="search-input-wrapper">
            <input
              className='searchText'
              type="text"
              value={value}
              onFocus={() => setShowDropdown(true)} // Show dropdown on focus
              onChange={(value) => handleSearch(value)}
              placeholder='Search By Category'
              ref={inputField}
            />
            {showDropdown && (
              <div className="dropdown-menu" ref={dropdown}>
                {filteredCategories.map((category, index) => (
                  <div key={index} className="dropdown-item" onClick={() => handleCategorySelect(category)}>{category}</div>
                ))}
              </div>
            )}
          </div>
          <div className="dropdown-arrow" onClick={handleToggleDropdown} ref={trigger}>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          {value && <span onClick={clearSearch}>X</span>}
          <button>Go</button>
        </div>
      </form>
      <div className='icon' onClick={toggleTheme}>
        {/* Conditionally render the sun or moon icon based on the current theme */}
        {theme === 'light' ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
      </div>
    </div>
  );
};
