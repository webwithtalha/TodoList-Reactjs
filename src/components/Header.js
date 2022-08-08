import React, { useEffect, useState } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [userData, setUserData] = useState([]);
  const router = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/getMe`);
        setUserData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const logoutUser = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/logout`);
      localStorage.removeItem('token');
      router('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap min-w-screen">
        <section className="relative w-full ">
          <nav className="flex justify-between bg-brand-5 text-white ">
            <div className="justify-between px-5 xl:px-12 py-6 flex w-full items-center">
              <a className="text-3xl font-bold font-heading" href="/">
                Todo List
              </a>
              <div>
                {' '}
                <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                  <li>
                    <a className="hover:text-gray-200" href="/">
                      Daily Task
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-gray-200" href="/">
                      Paragraph
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-gray-200" href="/">
                      Notes
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex gap-10 items-center">
                <span className="font-poppins uppercase">{userData.name}</span>
                <div title="logout" className="hidden xl:flex items-center space-x-5">
                  <BiLogOutCircle onClick={logoutUser} className="text-[25px]" />
                </div>
              </div>
            </div>

            <a className="navbar-burger self-center mr-12 xl:hidden" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </a>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default Header;
