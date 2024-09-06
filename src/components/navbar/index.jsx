import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideNav from "./side-nav";

export default function NavBar({
  scrollPercentage,
  handleScrollBottom,
  handleScrollTop,
}) {
  const {
    searchTerm,
    setSearchTerm,
    fetchImages,
    setNextError,
    setNextPage,
    showSideNav,
    setShowSideNav,
    darkMode,
    setDarkMode,
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const sideNavSearchRef = useRef(null);

  function handleDarkMode() {
    const mode = !darkMode;
    setDarkMode(mode);
    localStorage.setItem("darkmode", JSON.stringify(mode));
  }

  function handleSideNavOpen() {
    if (sideNavSearchRef.current) {
      sideNavSearchRef.current.focus();
    }
    setShowSideNav(true);
  }

  function handleSearch(event) {
    setShowSideNav(false);
    navigate("/");
    event.preventDefault();
    if (searchTerm.length === 0) return;
    setNextPage(2);
    setNextError(false);
    fetchImages(1);
  }

  useEffect(() => {
    if (showSideNav) {
      document.body.classList.add("modal-is-opened");
    } else {
      document.body.classList.remove("modal-is-opened");
    }
  }, [showSideNav]);

  return (
    <div
      id="navbar"
      className="z-10 fixed flex justify-center w-full bg-red-600 dark:bg-[maroon] h-[100px] shadow-lg"
    >
      <div className={`w-[100%] relative flex justify-center items-center`}>
        <SideNav
          darkMode={darkMode}
          showSideNav={showSideNav}
          setShowSideNav={setShowSideNav}
          handleDarkMode={handleDarkMode}
          handleScrollTop={handleScrollTop}
          handleScrollBottom={handleScrollBottom}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          sideNavSearchRef={sideNavSearchRef}
        />
        <span
          id="bar-icon"
          onClick={handleSideNavOpen}
          className="absolute md:hidden z-[100] cursor-pointer left-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill=""
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke=""
            className={`size-8 hover:scale-105 active:scale-110 ${
              showSideNav ? "stroke-red-200" : "stroke-red-950"
            } `}
          >
            <path
              style={{
                transition: "transform 0.3s ease-out",
                transformOrigin: "center",

                transform: `${
                  showSideNav ? "rotate(45deg) translate(0px, 3px)" : ""
                }`,
              }}
              className={`path1`}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5"
            />
            <path
              style={{
                transition: "transform 0.3s ease-out",
                transformOrigin: "center",
                transform: `${
                  showSideNav ? "rotate(-45deg) translate(0, -3.5px)" : ""
                }`,
              }}
              className={`path2`}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 15.75h16.5"
            />
          </svg>
        </span>
        <span
          style={{
            transition: "all 0.5s ease-out",
            transform: `${
              showSideNav
                ? "translateY(10px) scale(0)"
                : "translateY(0) scale(1)"
            }`,
            opacity: `${showSideNav ? "0" : "1"}`,
          }}
          id={`search-icon-side`}
          onClick={handleSideNavOpen}
          className={`absolute md:hidden z-[100] cursor-pointer right-16 `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-5 hover:scale-105 active:scale-110 ${
              showSideNav ? "stroke-red-600" : "stroke-red-950"
            } `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
        <span
          id="light-dark-icon-side"
          className={`absolute md:hidden z-[100] cursor-pointer right-5 rounded-full p-2`}
          onClick={handleDarkMode}
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`size-7 hover:scale-105 hover:stroke-white active:scale-110 ${
                showSideNav ? "stroke-red-600" : "stroke-red-950"
              } `}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
            <svg
              style={{ transition: "all 0.5s ease-out" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`size-6 hover:scale-105 fill-red-600 hover:fill-black hover:stroke-red-950 active:scale-110 ${
                showSideNav ? "stroke-red-600" : "stroke-red-950"
              } `}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </span>
        <span
          id="scroll-to-bottom-icon"
          onClick={handleScrollBottom}
          className="hidden md:inline absolute cursor-pointer right-[20%] xl:right-[17%]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="maroon"
            className="dark:fill-red-600 size-8 lg:size-9 xl:size-10 hover:scale-105 active:scale-110 hover:fill-red-950"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span
          id="scroll-to-top-icon"
          onClick={handleScrollTop}
          className="hidden md:block absolute cursor-pointer right-[25%] xl:right-[20%]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="maroon"
            className="dark:fill-red-600 size-8 lg:size-9 xl:size-10 hover:scale-105 active:scale-110 hover:fill-red-950"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span
          id="favourites-icon"
          className="hidden md:block absolute mt-1 left-[25%] xl:left-[20%]"
        >
          <Link to="/favourites" className={``}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="maroon"
              className={`${
                location.pathname === "/favourites" ? "active" : null
              } size-8 lg:size-9 xl:size-10 hover:scale-105 hover:fill-red-950 dark:fill-red-600 active:scale-110`}
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </Link>
        </span>

        <span
          id="home-icon"
          className="hidden md:inline absolute left-[20%] xl:left-[17%]"
        >
          <Link to="/" className={``}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="maroon"
              className={`${
                location.pathname === "/" ? "active" : null
              }  dark:fill-red-600 size-8 lg:size-9 xl:size-10 hover:scale-105 active:scale-110 hover:fill-red-950`}
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
          </Link>
        </span>
        <span
          onClick={handleDarkMode}
          id="light-dark-btn"
          className="cursor-pointer hover:bg-red-950 hidden md:inline absolute text-sm lg:text-md right-[6%] lg:right-[10%] px-3 lg:px-4 py-1 text-red-300 hover:text-white shadow-lg shadow-red-300/20 hover:shadow-2xl hover:shadow-red-200 border-2 border-red-300 rounded-full bg-[maroon] active:scale-105"
        >
          {darkMode ? "Light" : "Dark"}
        </span>
        <form onSubmit={handleSearch} id="search-box" className="">
          <div className="relative hidden md:block">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="search photos.."
              className="peer focus:scale-105 placeholder:text-md placeholder:truncate placeholder:capitalize px-4 pr-7  py-2 focus:outline-none ring-2 ring-red-500 bg-red-200 dark:bg-red-300 shadow-md rounded-full w-[150px] md:w-full"
            ></input>
            <span
              id="search-icon"
              className="absolute right-[10px] top-3 peer-focus:invisible"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="grey"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </form>
      </div>
      <div
        id="scroll-container"
        className="h-1 bg-red-300 absolute bottom-0 w-full"
      >
        <div
          id="scroll-indicator"
          style={{ width: `${scrollPercentage}%` }}
          className={`h-full bg-red-600 dark:bg-[maroon]`}
        ></div>
      </div>
    </div>
  );
}
