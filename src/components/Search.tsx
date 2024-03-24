import { useRef, useState } from "react";
import { findAll } from "../third-party/backend";

type SearchResult = {
  id: string;
  title: string;
  url: string;
  description: string;
  category: "VIDEOS" | "PLAYLISTS" | "BLOG_POSTS";
};

const categoryColor = {
  PLAYLISTS: "blue",
  BLOG_POSTS: "red",
  VIDEOS: "green",
};

function Search() {
  const search = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const res = await findAll({ search: search.current?.value });
    setData(res);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto">
      <form className="w-full justify-center flex" onSubmit={handleSubmit}>
        <input
          ref={search}
          className={`bg-slate-100 rounded-l-lg p-4 w-2/4`}
          name="search"
        />
        <button
          disabled={isLoading}
          className={`rounded-r-lg bg-slate-200 p-2  ${
            isLoading && "text-slate-300"
          }`}
        >
          Search
        </button>
      </form>
      <div className="flex gap-4 justify-center mb-10">
        <div
          className={`p-2 text-white  rounded-lg bg-${categoryColor["VIDEOS"]}-700 text-xs my-2`}
        >
          VIDEOS
        </div>
        <div
          className={`p-2 text-white  rounded-lg bg-${categoryColor["BLOG_POSTS"]}-700 text-xs my-2`}
        >
          BLOG POSTS
        </div>
        <div
          className={`p-2 text-white rounded-lg bg-${categoryColor["PLAYLISTS"]}-700 text-xs my-2`}
        >
          PLAYLISTS
        </div>
      </div>
      {isLoading ? (
        <>
          <div className="p-4 bg-slate-50 w-full justify-center flex">
            Searching...
          </div>
        </>
      ) : (
        <>
          {!data.length && (
            <div className="p-4 bg-slate-50 w-full justify-center flex">
              No results
            </div>
          )}
          <div className="columns-3 gap-4">
            {data.map((item) => {
              return (
                <a
                  key={item.id}
                  className={`bg-slate-50 p-2 rounded-md hover:bg-slate-100 border-b-${
                    categoryColor[item.category]
                  }-700 border-b-4 w-full flex-col flex mb-4`}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h1 className="text-xl">{item.title}</h1>
                  <p>{item.description}</p>
                </a>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
