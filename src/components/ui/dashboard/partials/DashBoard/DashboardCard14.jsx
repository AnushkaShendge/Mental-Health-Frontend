import React, { useState } from 'react';
import Icon from '../../../../../assets/images/blog.jpg';
import Icon1 from '../../../../../assets/images/blog1.mp4';
import { useNavigate } from 'react-router-dom';

function DashboardCard14() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-3xl border border-slate-200 dark:border-slate-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="px-5 pt-5">
        <header className="flex justify-between align-center items-start mb-2">
          {/* Conditional rendering based on isHovered state */}
          {isHovered ? (
            <video
              src={Icon1}
              autoPlay
              loop
              muted
              className="object-cover flex justify-center items-center" // Center the video
              style={{ height: '190px', width: '400px' }}
            />
          ) : (
            <img
              src={Icon}
              style={{ height: '180px', width: '400px'}}
              alt="Icon 01"
              className="opacity-100"
            />
          )}
        </header>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 text-center font-serif">
          Fresh Insight
        </h2>
        <div className='text-gray-400 font-semibold text-center'>"Reading makes feel better. Boost your mental health with lifestyle tips"</div>
        <div className='flex justify-center m-4'><button className='bg-white border-lime-600 border-3 p-1 text-center text-black rounded-md' onClick={() => navigate('/blog')}>Explore</button></div>
      </div>
    </div>
  );
}

export default DashboardCard14;
