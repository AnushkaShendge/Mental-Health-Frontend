import React, { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import apiRequest from './apiRequest';

const NewPost = ({ handleAddBlog, blogs, setBlogs, setFetchError }) => {
  const API_URL = 'http://localhost:3500/blogs';
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postCategory, setPostCategory] = useState('');
  const [postSubCategory, setPostSubCategory] = useState('');
  const [postAuthorName, setPostAuthorName] = useState('');
  const [coverURL, setCoverURL] = useState('');
  const [authorAvatarURL, setAuthorAvatarURL] = useState('');
  const navigate = useNavigate();

  const addBlog = async (newBlog) => {
    const Bloglist = [...blogs, newBlog];
    setBlogs(Bloglist);
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = blogs.length ? blogs[blogs.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newBlog = {
      id: id,
      title: postTitle,
      category: postCategory,
      subCategory: postSubCategory,
      description: postBody,
      authorName: postAuthorName,
      createdAt: datetime,
      cover: coverURL,
      authorAvatar: authorAvatarURL
    };
    addBlog(newBlog);
    navigate('/');
  }

  return (
    <div className='bg-gradient-to-r from-indigo-500 to-blue-400 min-h-screen flex items-center justify-center'>
      <div className="w-[35%] mx-auto p-8 border border-gray-200 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">New Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="postTitle" className="block font-semibold">Title:</label>
            <input
              id="postTitle"
              type="text"
              className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              required
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="postBody" className="block font-semibold">Post:</label>
            <textarea
              id="postBody"
              className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              required
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="postCategory" className="block font-semibold">Category:</label>
            <input
              id="postCategory"
              type="text"
              className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              required
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="postSubCategory" className="block font-semibold">Sub Category:</label>
            <input
              id="postSubCategory"
              type="text"
              className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              required
              value={postSubCategory}
              onChange={(e) => setPostSubCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="postAuthorName" className="block font-semibold">Author Name:</label>
            <input
              id="postAuthorName"
              type="text"
              className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              required
              value={postAuthorName}
              onChange={(e) => setPostAuthorName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="coverURL" className="block font-semibold">Cover URL:</label>
            <input
              id="coverURL"
              type="text"
              className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              required
              value={coverURL}
              onChange={(e) => setCoverURL(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="authorAvatarURL" className="block font-semibold">Author Avatar URL:</label>
            <input
              id="authorAvatarURL"
              type="text"
              className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              required
              value={authorAvatarURL}
              onChange={(e) => setAuthorAvatarURL(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
