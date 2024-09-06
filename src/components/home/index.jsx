import { useContext } from "react";
import { GlobalContext } from "../../context";

export default function Home({}) {
  const {
    pages,
    error,
    loading,
    totalPages,
    searchEmpty,
    handleLoadMore,
    handleReload,
    loadingNext,
    nextError,
    nextPage,
  } = useContext(GlobalContext);

  return (
    <section
      id="home-content"
      className={`pt-[110px] relative px-2 dark:bg-slate-950 box-border`}
    >
      {!loading && !searchEmpty && pages.length === 0 ? (
        <h1 className=" flex flex-row justify-center items-center w-full h-[81.9vh]">
          <span className="capitalize text-lg md:text-2xl text-slate-600">
            Nothing to show yet
          </span>
        </h1>
      ) : searchEmpty ? (
        <h1 className=" flex flex-row justify-center items-center h-[81.9vh] ">
          <span className="capitalize text-lg md:text-2xl text-slate-600">
            Seems like we found nothing
          </span>
        </h1>
      ) : null}
      {loading && (
        <div className="w-full h-[81.9vh] flex flex-row items-center justify-center">
          <div className="animate-pulse">
            <p className="loading"></p>
          </div>
        </div>
      )}
      {!loading && pages && pages.length > 0 ? (
        pages.map((item) => item)
      ) : error ? (
        <p className="flex flex-row justify-center items-center h-[100vh] overflow-hidden">
          <span className="text-red-400 capitalize text-2xl">
            An Error occured while fetching
          </span>
        </p>
      ) : null}
      {loadingNext && (
        <p className="flex flex-row justify-center pt-1">
          <span className="text-green-400">Fetching...</span>
        </p>
      )}
      {nextError && (
        <p className="flex flex-row justify-center pt-1">
          <span className="text-red-400">An Error Occured!</span>
        </p>
      )}
      <div className="flex flex-row justify-center py-2">
        {!loadingNext &&
        !loading &&
        !nextError &&
        pages &&
        pages.length > 0 &&
        nextPage < totalPages ? (
          <button
            className="w-[100px] border-2 rounded-md mx-auto font-mono font-semibold text-slate-600 shadow-sm hover:bg-slate-200 active:scale-105"
            disabled={totalPages === 1 || nextPage === totalPages}
            onClick={handleLoadMore}
          >
            Load More
          </button>
        ) : nextError && !loadingNext ? (
          <svg
            onClick={handleReload}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="darkslategray"
            className="size-6 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
              clipRule="evenodd"
            />
          </svg>
        ) : nextPage === totalPages || totalPages === 1 ? (
          <p className="text-sm text-slate-600">
            Seems Like You Have Reach The End
          </p>
        ) : null}
      </div>
    </section>
  );
}
