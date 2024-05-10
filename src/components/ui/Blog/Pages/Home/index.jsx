import React, { useState, useEffect,useContext } from "react";
import { Header } from "../../Common/Home/Header";
import { SearchBar } from "../../Common/Home/SearchBar";
import { BlogList } from "../../Common/Home/BlogList";
import './styles.css'
import { ThemeBgContext } from "../../../landingPage/Components/ContextWrapper/ThemeContext"; // Import the ThemeBgContext


export const Home = () => {
  const API_URL = 'http://localhost:3500/blogs';

  const [blogs, setBlogs] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]); // State to store categories
  const [filteredCategories, setFilteredCategories] = useState([]); // State for filtered categories
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  

  // Function to fetch categories from blogs
  const fetchCategories = (blogs) => {
    const allCategories = blogs.reduce((acc, blog) => {
      return [...acc, blog.category]; // Use category property instead of subCategory
    }, []);
    const uniqueCategories = [...new Set(allCategories)]; // Get unique categories
    setCategories(uniqueCategories);
    setFilteredCategories(uniqueCategories);
  };

  // Function to handle search
  const handleSearch = (e) => {
    const inputValue = e.target.value.toLowerCase().trim(); // Extract input value and trim whitespace
    setSearchKey(inputValue); // Set the searchKey state with the input value
    
    // Filter categories based on the input value
    const filtered = categories.filter(category => category.toLowerCase().includes(inputValue));
    setFilteredCategories(filtered); // Set filtered categories
    
    // Update showDropdown state based on the length of filtered categories and input value
    setShowDropdown(filtered.length > 0 && inputValue.length > 0); // Open dropdown if there are matching categories and the input value is not empty
  };
  
  

  // Function to handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredBlogs = blogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  // Function to clear search
  const handleClearSearch = () => {
    // Reset search key and fetch all blogs again
    setSearchKey('');
    fetchData();
  };

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw Error('Failed to fetch data');
      }
      const data = await response.json();
      setBlogs(data);
      fetchCategories(data); // Fetch categories from fetched blogs
      setFetchError(null);
    } catch (error) {
      console.error(error.message);
      setFetchError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data when component mounts
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <Header />
      <SearchBar
        value={searchKey}
        handleSearch={handleSearch}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchSubmit}
        categories={categories}
        filteredCategories={filteredCategories}
        showDropdown={showDropdown}
      />

      {isLoading ? (
        <div>Loading...</div>
      ) : fetchError ? (
        <div>Error: {fetchError}</div>
      ) : (
        <BlogList blogs={blogs} />
      )}
  </div>
  );
};
