import React, { useState } from "react";

type MainMenuProps = {
  name: string;
  children: React.ReactNode;
};

export const Accordion: React.FC<MainMenuProps> = ({ name, children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleExpand = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="overflow-hidden">
      <div
        className="flex items-center rounded-t-md h-[3rem] px-4 py-2 cursor-pointer gap-4 overflow-x-auto"
        onClick={handleExpand}
      >
        {collapsed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        )}
        <span className="text-md">{name}</span>
      </div>
      <div
        className={` ${
          collapsed ? "max-h-0 overflow-hidden" : "max-h-full"
        } rounded-b-md w-[1000px] md:w-full overflow-x-auto`}
      >
        {children}
      </div>
    </div>
  );
};
