import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import logo from "../../assets/5.png";
type MainMenuProps = {
  children: React.ReactNode;
};

const active = "bg-blue-400";
const notActive = "";

export const Navbar: React.FC<MainMenuProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isActive, setActive] = useState(window.location.pathname);
  const navigate = useNavigate();

  const navigateHome = (id: string) => {
    setActive(id);
    navigate(id);
  };
  return (
    <>
      <div className="flex flex-col min-h-screen border-b border-gray-300 drop-shadow-xl">
        <div className="flex flex-col md:flex-row border-black grow ">
          <div className="bg-white w-full order-first">{children}</div>
        </div>

        <div
          className="flex flex-row items-center bg-white w-full h-full md:h-[4rem] order-first
                    justify-between p-2 md:p-6 border-b border-gray-300 drop-shadow-lg"
        >
          <div className="flex gap-4 pl-8">
            <a className="" href="/#">
              <img src={logo} alt="" className="w-32" />
            </a>
          </div>
          <div className="flex gap-4 pr-8">
            <div
              onClick={() => navigateHome("/")}
              className={`${isActive === "/" ? active : notActive} 
                            hidden cursor-pointer hover:bg-gray-200 hover:border-gray-200 w-[6rem] p-2 rounded-lg md:flex items-center 
                            justify-center`}
            >
              <span className={"text-xs sm:block md:text-lg font-bold"}>
                {" "}
                Home{" "}
              </span>
            </div>
            <div
              onClick={() => navigateHome("/about")}
              className={`${isActive === "/about" ? active : notActive} 
                            hidden cursor-pointer hover:bg-gray-200 hover:border-gray-200 p-2 rounded-lg md:flex items-center 
                            justify-center`}
            >
              <span className={"text-xs sm:block md:text-lg font-bold"}>
                {" "}
                About Us{" "}
              </span>
            </div>
            <div
              onClick={() => navigateHome("/faq")}
              className={`${isActive === "/faq" ? active : notActive} 
                            hidden cursor-pointer hover:bg-gray-200 hover:border-gray-200 w-[6rem] p-2 rounded-lg md:flex items-center 
                            justify-center`}
            >
              <span className={"text-xs sm:block md:text-lg font-bold"}>
                {" "}
                FAQ{" "}
              </span>
            </div>

            <div
              onClick={() => navigateHome("/sign-in")}
              className={`${isActive === "class" ? active : notActive} 
                            hidden cursor-pointer hover:bg-blue-400 w-[6rem] p-2 rounded-lg md:flex items-center justify-center bg-blue-300 `}
            >
              <span className={"text-xs sm:block md:text-lg font-bold"}>
                {" "}
                Sign-in{" "}
              </span>
            </div>
            <div
              onClick={() => navigateHome("/sign-up")}
              className={`${isActive === "class" ? active : notActive} 
                            hidden cursor-pointer hover:bg-gray-200 hover:border-gray-200 w-[6rem] p-2 rounded-lg md:flex items-center 
                            justify-center border border-blue-200`}
            >
              <span className={"text-xs sm:block md:text-lg font-bold"}>
                {" "}
                Sign-up{" "}
              </span>
            </div>
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className="relative block md:hidden z-50 pointer-events-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-12 text-black cursor-pointer rounded-full hover:bg-gray-200 p-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              {collapsed && (
                <div className="absolute bg-white w-[15rem] right-0 ">
                  <ul className="space-y-1 p-2">
                    <li>
                      <a
                        href="/"
                        className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                      >
                        Home
                      </a>
                    </li>

                    <li>
                      <a
                        href="/about"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        About Us
                      </a>
                    </li>

                    <li>
                      <a
                        href="/faq"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        FAQ
                      </a>
                    </li>

                    <li>
                      <a
                        href="/sign-in"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Sign-in
                      </a>
                    </li>

                    <li>
                      <a
                        href="/sign-up"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Sign-up
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
