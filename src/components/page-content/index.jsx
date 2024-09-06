import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";

export default function PageContent({ images }) {
  const { handleOpenBox, favourites, addToFav, removeFromFav } =
    useContext(GlobalContext);
  function checkImagePresent(imageToCheck, imageList) {
    return imageList.some((image) => image.id === imageToCheck.id);
  }

  console.log(images, favourites);
  return (
    <div className="scroll-content w-full flex flex-col mb-2 md:grid md:grid-cols-2 gap-4 xl:grid-cols-3 pt-[2px] pb-1">
      {images.map((image) => (
        <div
          key={image.id}
          className="fade-in w-full peer-active:scale-[99%] min-w-[230px] h-[375px] border dark:border-black shadow-md hover:shadow-red-500/10 dark:hover:shadow-black/10 rounded-md p-2 dark:bg-slate-800 bg-white"
        >
          <img
            loading="lazy"
            onClick={() => handleOpenBox(image.id, images)}
            className="cursor-pointer object-cover w-full border-0 rounded-t h-[280px]"
            src={image.urls.regular}
            alt={image.alt_description}
          />
          <div id="descriptions" className="bg-black/10 rounded-b pb-2">
            <p className="truncate capitalize text-sm h-[35px] text-slate-600 p-2">
              {image.alt_description}
            </p>
            <div id="icons" className=" flex flex-row justify-between">
              <p className={`pl-2 text-lg text-blue-500 h-[35px]  `}>
                Likes:{" "}
                <span className="text-black dark:text-slate-300 tracking-tighter">
                  {image.likes}
                </span>
              </p>
              <p className="flex-1 flex flex-row justify-end gap-x-2">
                <span
                  onClick={
                    checkImagePresent(image, favourites)
                      ? () => removeFromFav(image)
                      : () => addToFav(image)
                  }
                  id="add-to-favorite"
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="grey"
                    className={`${
                      checkImagePresent(image, favourites)
                        ? "fill-red-500"
                        : null
                    } size-8 heart-icon active:scale-105`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </span>
                <span
                  id="view-more"
                  onClick={() => handleOpenBox(image.id, images)}
                  className="mr-1 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="grey"
                    className="size-8 plus-icon active:scale-105 hover:stroke-slate-950 dark:hover:stroke-slate-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
