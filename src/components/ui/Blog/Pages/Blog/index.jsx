import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Chip } from '../../Common/Chip';
import './styles.css'; // Import the updated CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"; // Import icon variables


export const Blog = () => {
  const API_URL = 'http://localhost:3500/blogs';
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw Error('Failed to fetch blog');
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
        setBlog(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div className="blog-wrap">
      <Link className="go-back" to="/blog">
        <span>←</span> Go Back
      </Link>
      {isLoading ? (
        <div>Loading...</div>
      ) : blog ? (
        <div>
          <header>
            <p className="blog-date">Published {blog.createdAt}</p>
            <h1>{blog.title}</h1>
            <div className="blog-subcategory">
              {blog.subcategory &&
                blog.subcategory.map((category) => (
                  <div key={category}>
                    <Chip label={category} />
                  </div>
                ))}
            </div>
          </header>
          <img src={blog.cover} alt="cover" className="w-full" />
          <p className="blog-description">{blog.description}</p>
        </div>
      ) : (
        <div className="blog-not-found">
          <h1>Error: Blog Not Found...</h1>
        </div>
      )}
      
    </div>
  );
};
