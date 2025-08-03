import { useSelector, useDispatch } from "react-redux";
import { setShowListOrCalender, deleteAll } from "../../Redux/EventSlice";
import { SlCalender } from "react-icons/sl";
import { FaList } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const SwitchCalenderList = () => {
  const { showListOrCalender } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  return (
    <div className="container py-6 flex flex-col space-y-5 md:flex-row justify-between items-center px-2  mx-auto">
      <div className="flex items-center   rounded-2xl border-1 border-[#14b8a6]">
        <div
          className={`w-[150px] flex  items-center justify-center space-x-2.5 font-bold cursor-pointer  ${
            showListOrCalender ? "bg-[#14b8a6] text-white" : "bg-[#f8fafc] text-black"
          }  px-5 py-2 rounded-l-2xl transition-colors duration-300`}
          onClick={() => dispatch(setShowListOrCalender(true))}>
          <FaList size={20} />
          <span>List</span>
        </div>
        <div
          className={`w-[150px] flex flex-1 items-center justify-center space-x-2.5 font-bold cursor-pointer ${
            !showListOrCalender ? "bg-[#14b8a6] text-white" : "bg-[#f8fafc] text-black "
          }  px-5 py-2 rounded-r-2xl   transition-colors duration-300`}
          onClick={() => dispatch(setShowListOrCalender(false))}>
          <SlCalender size={20} />
          <span>Calender</span>
        </div>
      </div>
      <button
        className={`bg-[#14b8a6] text-white w-[302px]  md:w-[150px] ${
          showListOrCalender ? "flex" : "hidden"
        }  items-center justify-center space-x-2.5 font-bold cursor-pointer px-5 py-2.5 rounded-2xl hover:bg-red-600 transition-colors duration-300  `}
        onClick={(e) => {
          e.preventDefault();
          dispatch(deleteAll());
        }}>
        <MdDelete size={20} />
        <span>Delete All</span>
      </button>
    </div>
  );
};

export default SwitchCalenderList;
