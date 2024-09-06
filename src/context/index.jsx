import axios from "axios";
import { createContext, useState } from "react";
import PageContent from "../components/page-content";
export const GlobalContext = createContext();

export default function GlobalState({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const [boxImage, setBoxImage] = useState(null);
  const [nextPage, setNextPage] = useState(2);
  const [loadingNext, setLoadingNext] = useState(false);
  const [nextError, setNextError] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  function handleOpenBox(itemId, images) {
    setOpenBox(!openBox);
    const boxItem = images.filter((item) => item.id === itemId);
    console.log(boxItem);
    setBoxImage(boxItem);
  }

  function handleSideNavCloseOutside(event) {
    const sideNav = document.getElementById("side-nav");
    if (!sideNav.contains(event.target) && showSideNav === true) {
      setShowSideNav(false);
    }
  }

  function handleLoadMore() {
    if (pages.length === 0) return;
    fetchNextImages(nextPage);
    if (nextPage <= totalPages && !nextError) {
      setNextPage((prevPage) => prevPage + 1);
    }
  }

  function handleReload() {
    fetchNextImages(nextPage);
  }

  function addToFav(imageToAdd) {
    const newFavourites = [...favourites];
    const checkImage = newFavourites.some(
      (favourite) => favourite.id === imageToAdd.id
    );
    if (!checkImage) {
      newFavourites.unshift({ ...imageToAdd });
      setFavourites(newFavourites);
    }
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
  }

  function removeFromFav(imageToRemove) {
    const indexToRemove = favourites.findIndex(
      (favourite) => favourite.id === imageToRemove.id
    );
    const newFavourites = [...favourites];
    newFavourites.splice(indexToRemove, 1);
    setFavourites(newFavourites);
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
  }

  async function fetchNextImages(pageToFetch) {
    setLoadingNext(true);
    setNextError(false);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: searchTerm,
            page: pageToFetch,
            per_page: 30,
          },
          headers: {
            Authorization: `Client-ID PhhCADJfMZnHTkRsdkp7Tz1jxAS3koC8tFuh-vs9JhA`,
          },
        }
      );
      console.log(response);
      setPages([...pages, <PageContent images={response.data.results} />]);
      // Extract total pages from Link headers
    } catch (error) {
      console.log(error.message);
      setNextError(true);
    } finally {
      setLoadingNext(false);
    }
  }

  async function fetchImages(pageToFetch) {
    setLoading(true);
    setError(false);
    setSearchEmpty(false);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: searchTerm,
            page: pageToFetch,
            per_page: 30,
          },
          headers: {
            Authorization: `Client-ID PhhCADJfMZnHTkRsdkp7Tz1jxAS3koC8tFuh-vs9JhA`,
          },
        }
      );
      console.log(response);
      if (response.data.results.length === 0) setSearchEmpty(true);
      setPages([<PageContent images={response.data.results} />]);
      // Extract total pages from Link headers
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        pages,
        setPages,
        fetchImages,
        fetchNextImages,
        error,
        setError,
        loading,
        setLoading,
        totalPages,
        searchEmpty,
        setSearchEmpty,
        openBox,
        setOpenBox,
        handleOpenBox,
        handleLoadMore,
        handleReload,
        boxImage,
        setBoxImage,
        loadingNext,
        setLoadingNext,
        nextError,
        setNextError,
        nextPage,
        setNextPage,
        showSideNav,
        setShowSideNav,
        handleSideNavCloseOutside,
        favourites,
        setFavourites,
        darkMode,
        setDarkMode,
        addToFav,
        removeFromFav,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
