import React, { useEffect, useState } from 'react';
import '../../../../../style.css';
import { Link, useParams } from 'react-router-dom';
import { Chip } from '../../Common/Chip';

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
    <div>
      <Link className='go-back' to='/'>
        <span>←</span> Go Back
      </Link>
      {isLoading ? (
        <div>Loading...</div>
      ) : blog ? (
        <div className='blog-wrap'>
          <header>
            <p className='blog-date'>Published {blog.createdAt}</p>
            <h1 className='text-3xl'>{blog.title}</h1>
            <div className='blog-subcategory'>
              { blog.subcategory && blog.subcategory.map((category) => (
                <div key={category}>
                  <Chip label={category} />
                </div>
              ))}
            </div>
          </header>
          <img src={blog.cover} alt='cover' className='w-1/2' />
          <p className='blog-description'>{blog.description}</p>
        </div>
      ) : (
        <div className='blog-not-found'>
          <h1>Error: Blog Not Found...</h1>
        </div>
      )}
    </div>
  );
};