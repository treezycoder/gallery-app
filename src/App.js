import { useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import BoxItem from "./components/box-item";
import Home from "./components/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Favourites from "./components/favourites";
import NavBar from "./components/navbar";
import { GlobalContext } from "./context";

export default function App() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const scrollBottomRef = useRef(null);
  const {
    openBox,
    setOpenBox,
    pages,
    setShowSideNav,
    showSideNav,
    handleSideNavCloseOutside,
    boxImage,
    setFavourites,
    darkMode,
    setDarkMode,
    searchTerm,
  } = useContext(GlobalContext);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const scrollProgress = (scrolled / (totalHeight - viewportHeight)) * 100;
    setScrollPercentage(scrollProgress);
  };

  useEffect(() => {
    const mode = localStorage.getItem("darkmode");
    if (mode) {
      setDarkMode(JSON.parse(mode));
    }

    return () => {};
  }, []);

  useEffect(() => {
    const container = window || document.documentElement; // Handle both window and document element
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll); // Cleanup function
  }, []);

  useEffect(() => {
    //when component mounts
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
    return () => {};
  }, [pages]);

  useEffect(() => {
    if (darkMode === true) {
      document.body.style.backgroundColor = "rgb(2, 6, 23)";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [darkMode]);

  function handleScrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function handleScrollBottom() {
    scrollBottomRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  function handleCloseBox() {
    setOpenBox(!openBox);
  }

  function handleOutsideCloseBox(event) {
    const boxItem = document.getElementById("boxItem");
    console.log(boxItem, event.target === boxItem);
    if (!boxItem.contains(event.target)) {
      setOpenBox(!openBox);
    }
  }

  function handleSideNavCloseOutsideScroll(event) {
    const sideNav = document.getElementById("side-nav");
    console.log(sideNav, event.target === sideNav);
    if (event.target !== sideNav && showSideNav === true) {
      setShowSideNav(false);
    }
  }

  return (
    <>
      {openBox ? (
        <div
          id="boxItemContainer"
          onClick={handleOutsideCloseBox}
          className="backdrop-blur-sm fixed w-full h-[100vh] z-[400] flex justify-center items-center"
        >
          <BoxItem data={boxImage} onClose={handleCloseBox} />
        </div>
      ) : null}
      <div className={`${darkMode ? "dark" : null}`}>
        <div
          id="main-container"
          onClick={handleSideNavCloseOutside}
          onScroll={handleSideNavCloseOutsideScroll}
          className={`dark:bg-slate-950 relative scrolling h-full`}
        >
          <BrowserRouter>
            <section id="header">
              <NavBar
                scrollPercentage={scrollPercentage}
                handleScrollBottom={handleScrollBottom}
                handleScrollTop={handleScrollTop}
              />
            </section>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favourites" element={<Favourites />} />
            </Routes>
          </BrowserRouter>
          <div id="" ref={scrollBottomRef}></div>
        </div>
      </div>
    </>
  );
}
