import { TfiAgenda } from "react-icons/tfi";
import { MdOutlineAdd } from "react-icons/md";
import SearchBar from "../SearchBar/SearchBar";
import { setShowInputFields } from "../../Redux/EventSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <div className="bg-[#14b8a6] h-[76px] w-full shadow-xl">
      <div className="container mx-auto px-2 h-full flex items-center justify-between">
        <div className="logo flex items-center space-x-2.5 text-white  text-[24px] md:text-[30px]">
          <TfiAgenda className="mb-0.5" />
          <span className="font-['Bebas_Neue'] font-bold">BuzzDay</span>
        </div>
        <SearchBar />
        <div className="hidden md:flex">
          <button
            type="button"
            onClick={() => dispatch(setShowInputFields(true))}
            className="flex items-center px-5 py-2  font-bold text-[#14b8a6] bg-[white] rounded-2xl cursor-pointer hover:bg-[#f0fdfc] ">
            <MdOutlineAdd size={22} className="mr-1" />
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
