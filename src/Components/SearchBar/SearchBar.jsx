import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex  w-[220px] md:w-[400px] relative">
      <input
        type="text"
        placeholder="Search events...."
        className="bg-white w-full px-4 py-1 md:px-5 md:py-2 rounded-md placeholder:text-[#14b8a6] outline-0"
      />
      <span className="h-full absolute right-[10px] top-0 flex justify-center items-center">
        <FaSearch className="text-[#14b8a6] " />
      </span>
    </div>
  );
};

export default SearchBar;
