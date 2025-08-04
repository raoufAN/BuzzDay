import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import ShowSearchResault from "../showSearchResault/showSearchResault";

const SearchBar = () => {
  const { events } = useSelector((state) => state.event);
  const [reasult, setresault] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (reasult.length > 0) {
      const filteringSearch = events.filter((el) =>
        el.name.toLowerCase().includes(reasult.toLowerCase())
      );
      setFilteredData(filteringSearch);
    }
  }, [events, reasult]);

  return (
    <div className="flex  w-[220px] md:w-[400px] relative">
      <input
        type="text"
        placeholder="Search events...."
        className="flex w-full rounded-md border-input px-3 py-2 text-base ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-white/95 border-0 focus:ring-2 focus:ring-white/50 placeholder:text-muted-foreground"
        onChange={(e) => setresault(e.target.value)}
        name="resault"
        value={reasult}
      />
      <span className="h-full absolute left-[10px] top-0 flex justify-center items-center">
        <FaSearch className="text-[#14b8a6] " />
      </span>
      {reasult.length > 0 && (
        <ShowSearchResault filteredData={filteredData} setresault={setresault} />
      )}
    </div>
  );
};

export default SearchBar;
