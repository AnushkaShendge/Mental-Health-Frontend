import React, { useEffect, useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/DashBoard/WelcomeBanner';
import DashboardAvatars from '../partials/DashBoard/DashboardAvatars';
import FilterButton from '../jsx/DropdownFilter';
import Datepicker from '../jsx/Datepicker';
import Loading from '../../../../assets/images/loading1.mp4';
import DashboardCard01 from '../partials/DashBoard/DashboardCard01';
import DashboardCard02 from '../partials/DashBoard/DashboardCard02';
import DashboardCard03 from '../partials/DashBoard/DashboardCard03';
import DashboardCard04 from '../partials/DashBoard/DashboardCard04';
import DashboardCard05 from '../partials/DashBoard/DashboardCard05';
import DashboardCard06 from '../partials/DashBoard/DashboardCard06';
import DashboardCard07 from '../partials/DashBoard/DashboardCard07';
import DashboardCard08 from '../partials/DashBoard/DashboardCard08';
import DashboardCard09 from '../partials/DashBoard/DashboardCard09';
import DashboardCard10 from '../partials/DashBoard/DashboardCard10';
import DashboardCard11 from '../partials/DashBoard/DashboardCard11';
import DashboardCard12 from '../partials/DashBoard/DashboardCard12';
import DashboardCard13 from '../partials/DashBoard/DashboardCard13';
import Banner from '../partials/Banner';

function Dashboard() {
  const username = sessionStorage.getItem('username');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array ensures useEffect runs only on mount

  return (
    <div className="flex h-screen overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <video autoPlay loop muted className="w-full">
            <source src={Loading} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <>
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main>
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                {/* Welcome banner */}
                <WelcomeBanner username={username} />

                {/* Dashboard actions */}
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                  {/* Left: Avatars */}
                  <DashboardAvatars />

                  {/* Right: Actions */}
                  <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    {/* Filter button */}
                    <FilterButton />
                    {/* Datepicker */}
                    <Datepicker />
                    {/* Add view button */}
                    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                      <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                      </svg>
                      <span className="hidden xs:block ml-2">Add view</span>
                    </button>
                  </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-12 gap-6">
                  <DashboardCard01 />
                  <DashboardCard02 />
                  <DashboardCard03 />
                  <DashboardCard04 />
                  <DashboardCard05 />
                  <DashboardCard06 />
                  <DashboardCard07 />
                  <DashboardCard08 />
                  <DashboardCard09 />
                  <DashboardCard10 />
                  <DashboardCard11 />
                  <DashboardCard12 />
                  <DashboardCard13 />
                </div>
              </div>
            </main>

            <Banner />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
