import { useContext } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";

export default function Favourites() {
  const { favourites, removeFromFav } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <section
      id="favourites-content"
      className={`pt-[110px] relative px-2 pb-4 dark:bg-slate-950 h-full dark:text-white`}
    >
      {favourites && favourites.length > 0 ? (
        <div className="dark:bg-slate-950 scroll-content w-full flex flex-col mb-2 md:grid md:grid-cols-2 gap-4 xl:grid-cols-3 pt-[2px] pb-1">
          {favourites.map((image) => (
            <div
              key={image.id}
              className="fade-in w-full min-w-[230px] h-[375px] border dark:border-black shadow-md hover:shadow-red-500/10 dark:hover:shadow-black/10 rounded-md p-2 dark:bg-slate-800 bg-white"
            >
              <img
                className="cursor-pointer object-cover w-full border-0 rounded-t h-[280px]"
                src={image.urls.regular}
                alt={image.alt_description}
              />
              <div id="descriptions" className="bg-black/10 rounded-b pb-2">
                <p className="truncate capitalize text-sm h-[35px] text-slate-600 p-2">
                  {image.alt_description}
                </p>
                <div id="icons" className=" flex flex-row justify-between">
                  <button
                    onClick={() => removeFromFav(image)}
                    className="ml-2 rounded-lg border border-slate-500 w-20 text-white bg-red-800 hover:bg-red-600 active:scale-110"
                  >
                    Remove
                  </button>
                  <span id="download-fav-image" className="mr-2">
                    <a
                      id="downloadButton"
                      target="_blank"
                      href={image.links.download}
                      download={image.alt_description || image.slug}
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
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center h-[81.9vh]">
          <h1 className="capitalize text-lg md:text-2xl text-slate-600 ">
            Nothing to show yet
          </h1>
          <p>
            <button
              className="border rounded-md p-1 px-2 dark:hover:text-black dark:hover:bg-slate-200 hover:bg-slate-900 hover:text-white mt-2"
              onClick={() => navigate("/")}
            >
              Explore Images
            </button>
          </p>
        </div>
      )}
    </section>
  );
}
