import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SideNav({
  showSideNav,
  setShowSideNav,
  handleDarkMode,
  handleScrollTop,
  handleScrollBottom,
  setSearchTerm,
  darkMode,
  handleSearch,
  sideNavSearchRef,
}) {
  return (
    <div
      id="side-nav"
      style={{ transition: `width 0.5s ease-in-out` }}
      className={` overflow-hidden ${
        showSideNav ? "w-screen" : "w-0"
      }  bg-black/50 z-[50] md:hidden slide-in-left backdrop-blur-lg absolute left-0 top-0 text-white h-screen border-r-2 border-red-500/10 pt-[70px]`}
    >
      <div className="space-y-2 p-6 font-sans  relative flex flex-col gap-10 justify-center items-center">
        <div id="search-container" className="relative">
          <form
            id={`side-nav-search`}
            onSubmit={(event) => {
              handleSearch(event);
            }}
          >
            <input
              style={{
                transition: "all 0.2s ease-in",
                transform: `${showSideNav ? "scale(1)" : "scale(0)"}`,
                opacity: `${showSideNav ? "1" : "0"}`,
              }}
              ref={sideNavSearchRef}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="search photos.."
              className={`peer text-[3vw] focus:scale-105 placeholder:text-slate-300 dark:placeholder:text-white placeholder:text-[3vw] text-center placeholder:truncate placeholder:capitalize  focus:outline-none border-0 border-transparent  rounded-full  bg-white/0 py-3 px-5dd shadow-sm shadow-slate-400`}
            ></input>
          </form>
        </div>
        <ul
          id="side-nav-list"
          className={` w-full flex flex-col justify-center items-center gap-y-2 py-4 rounded-md text-[5vw] text-slate-400`}
        >
          <Link to={`/`}>
            <li
              style={{
                transition: "all 0.5s ease-in",
                transform: `${
                  showSideNav
                    ? "scale(1) translateY(0)"
                    : "scale(0) translateY(50px)"
                }`,
                opacity: `${showSideNav ? "1" : "0"}`,
              }}
              onClick={() => setShowSideNav(false)}
              className={` cursor-pointer hover:text-white hover:scale-110`}
            >
              Home
            </li>
          </Link>
          <Link to={`/favourites`}>
            {" "}
            <li
              style={{
                transition: "all 0.5s ease-in",
                transform: `${
                  showSideNav
                    ? "scale(1) translateY(0)"
                    : "scale(0) translateY(50px)"
                }`,
                opacity: `${showSideNav ? "1" : "0"}`,
              }}
              onClick={() => setShowSideNav(false)}
              className="cursor-pointer hover:text-white hover:scale-110"
            >
              Favourites
            </li>
          </Link>
          {/* <li
            style={{
              transition: "all 0.5s ease-in",
              transform: `${
                showSideNav
                  ? "scale(1) translateY(0)"
                  : "scale(0) translateY(50px)"
              }`,
              opacity: `${showSideNav ? "1" : "0"}`,
            }}
            onClick={handleDarkMode}
            className="cursor-pointer hover:text-white hover:scale-110 "
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </li> */}
          <li
            style={{
              transition: "all 0.5s ease-in",
              transform: `${
                showSideNav
                  ? "scale(1) translateY(0)"
                  : "scale(0) translateY(50px)"
              }`,
              opacity: `${showSideNav ? "1" : "0"}`,
            }}
          >
            {" "}
            <div
              id="side-nav-icons-container"
              className="flex flex-row gap-x-2 text-4xl"
            >
              <span
                id="scroll-to-bottom-icon"
                onClick={() => {
                  setShowSideNav(false);
                  handleScrollBottom();
                }}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="maroon"
                  className="border dark:fill-red-600 shadow-lg shadow-red-300/20 hover:shadow-2xl hover:shadow-red-200 border-red-300 rounded-full size-[8vw] lg:size-9 xl:size-10 hover:scale-105 active:scale-110 hover:fill-red-600"
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
                onClick={() => {
                  setShowSideNav(false);
                  handleScrollTop();
                }}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="maroon"
                  className="dark:fill-red-600 shadow-lg shadow-red-300/20 hover:shadow-2xl hover:shadow-red-200 border  border-red-300 rounded-full size-[8vw] lg:size-9 xl:size-10 hover:scale-105 active:scale-110 hover:fill-red-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
