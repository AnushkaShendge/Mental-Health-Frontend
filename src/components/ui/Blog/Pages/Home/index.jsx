import React, { useState } from "react";
import { Header } from "../../Common/Home/Header";
import { SearchBar } from "../../Common/Home/SearchBar";
import { BlogList } from "../../Common/Home/BlogList";
import { useEffect } from "react";
import './styles.css'


export const Home = () => {

  const API_URL = 'http://localhost:3500/blogs';

  const [blogs, setBlogs] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const [fetchError,setFetchError] = useState(null);
  const [isLoading,setIsLoading] = useState(true);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchResults();
  }

  const handleSearchResults = () => {
    const filteredBlogs = blogs.filter((blog) => blog.category.toLowerCase().includes(searchKey.toLowerCase().trim()));
    setBlogs(filteredBlogs);
  }

  const handleClearSearch = () => {
    setBlogs(blogs);
    setSearchKey('');
  }

  useEffect(()=>{ //useEffect has asynchronous behaviour
    // localStorage.setItem('shoppinglist',JSON.stringify(items));
    const fetchItems = async ()=>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Did not receive expected data');
        const bloglist = await response.json();
        setBlogs(bloglist);
        setFetchError(null);
      } catch (err){
        console.log(err.message);
      } finally{
        setIsLoading(false);
      }
    }
    setTimeout(()=>{
      (async ()=> await fetchItems())();
    },2000)
  },[])




  return (
    <div className="p-4">
      <Header />
      <SearchBar value={searchKey} clearSearch={handleClearSearch} formSubmit={handleSearchSubmit} handleSearch={(e) => setSearchKey(e.target.value)} />
      <BlogList blogs={blogs} />
    </div>
  );
};
