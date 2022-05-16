import Image from "next/image";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HeaderLink from "./HeaderLink";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex  items-center justify-around py-1.5 px-3 focus-within:shadow-lg">
      {/* left */}
      <div className="flex items-center w-full max-w-xs space-x-2">
        {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <Image src="https://rb.gy/bizvqj" width={45} height={45} />
            ) : (
              <Image src="https://rb.gy/dpmd9s" width={55} height={55} />
            )}
          </>
        )}
        <div className="flex items-center w-full  dark:md:bg-gray-700  rounded-full py-2.5 px-4 space-x-1">
          <SearchRoundedIcon />
          <input
            className="flex-grow hidden text-sm bg-transparent placeholder-black/70 md:inline-flex focus:outline-none dark:placeholder-white/75"
            placeholder="Search"
          />
        </div>
      </div>
      {/* right */}
      <div className="flex items-center space-x-6">
        <HeaderLink Icon={HomeRoundedIcon} Text="Home" feed active />
        <HeaderLink Icon={GroupIcon} Text="My Network" feed />
        <HeaderLink Icon={BusinessCenterIcon} Text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} Text="Messaging" feed />
        <HeaderLink Icon={NotificationsIcon} Text="Notifications" feed />
        <HeaderLink Icon={Avatar} Text="Me" feed avatar hidden />
        <HeaderLink Icon={AppsOutlinedIcon} Text="Work" feed hidden />
        {/* Dark mode toggle */}
        {mounted && (
          <div
            className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
              resolvedTheme === "dark" ? "justify-end" : "justify-start"
            }`}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <span className="absolute left-0">🌜</span>
            <motion.div
              className="z-40 w-5 h-5 bg-white rounded-full"
              layout
              transition={spring}
            />

            <span className="absolute right-0.5">🌞</span>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
