import Search from "./components/Search";

function App() {
  return (
    <div className="">
      <header className=" flex flex-col">
        <div className="flex justify-center text-4xl text-slate-500 m-10">
          Search UI Challenge
        </div>
        <Search />
      </header>
    </div>
  );
}

export default App;
