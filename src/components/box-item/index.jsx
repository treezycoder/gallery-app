import { useContext } from "react";
import { GlobalContext } from "../../context";

export default function BoxItem({ data, onClose }) {
  const { favourites, removeFromFav, addToFav } = useContext(GlobalContext);

  return (
    <div
      id="boxItem"
      className={`relative scale-in-center border rounded-md shadow-xl z-[300] bg-white/5 w-[80%] max-w-[800px] h-[400px] md:h-[430px] lg:h-[500px] p-2 pt-12`}
    >
      <span
        onClick={onClose}
        className="absolute top-2 right-2 active:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 stroke-red-700 cursor-pointer hover:stroke-red-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </span>
      <div id="box-image" className="w-full h-[80%]">
        <img
          src={data[0].urls.regular}
          className="h-full w-full object-fill rounded-t-sm"
        />
      </div>
      <div
        id="icons"
        className="flex bg-[maroon] flex-row justify-center items-center w-full h-[20%] rounded-b-sm gap-x-2"
      >
        <button
          onClick={
            favourites.some((item) => item.id === data[0].id)
              ? () => removeFromFav(data[0])
              : () => addToFav(data[0])
          }
          className="rounded-lg border-2 border-red-900 w-40 h-10 text-white bg-red-800 hover:bg-red-600 active:scale-110"
        >
          {favourites.some((item) => item.id === data[0].id) ? "Remove" : "Add"}
        </button>
        <span id="download-fav-image" className="mr-2">
          <a
            id="downloadButton"
            target="_blank"
            href={data[0].links.download}
            download={data[0].alt_description || data[0].slug}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="grey"
              className="size-8 dark:hover:fill-slate-300 hover:fill-slate-950 hover:scale-105 active:scale-110"
            >
              <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
              <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
            </svg>
          </a>
        </span>
      </div>
    </div>
  );
}
