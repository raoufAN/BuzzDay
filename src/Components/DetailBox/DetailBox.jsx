import { useDispatch, useSelector } from "react-redux";
import { setShowDetailsEvent, startEditEvent } from "../../Redux/EventSlice";
import { HiX } from "react-icons/hi";
import noImage from "../../assets/no-image.jpeg";
import { IoTimeOutline } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import WrapperShowBoxes from "../WrapperShowBoxes/WrapperShowBoxes";
import { deleteSingleEvent, setShowInputFields } from "../../Redux/EventSlice";

const DetailBox = () => {
  const dispatch = useDispatch();
  const { detailsEvent, eventTypeColors } = useSelector((state) => state.event);

  const getEventColor = (type) => {
    const match = eventTypeColors.find((el) => el.type === type);
    return match?.bg || "#d1d5db";
  };

  return (
    <WrapperShowBoxes>
      <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
        <h1 className="font-bold text-gray-800">{detailsEvent.name}</h1>
        <HiX
          size={20}
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={() => dispatch(setShowDetailsEvent(false))}
        />
      </div>
      <div
        className="h-60 mb-5"
        style={{ background: `url(${noImage})`, backgroundPosition: "center" }}>
        <img
          src={detailsEvent.image || noImage}
          alt={detailsEvent.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{detailsEvent.name}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <IoTimeOutline className="mr-2" />
          <span className="mr-2.5">{detailsEvent.startTime}</span>
          To <span className="ml-2.5">{detailsEvent.endTime || "There’s no End Time"}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <IoLocationSharp className="mr-2" />
          <span>{detailsEvent.location || "There’s no Location"}</span>
        </div>
        <div className="text-gray-600 text-sm mb-4">
          <p>{detailsEvent.description || "There’s no Description"}</p>
        </div>
        <div className="flex  items-center justify-between mb-4 ">
          <span
            className="text-white text-xs font-medium px-2 py-1 rounded"
            style={{ background: getEventColor(detailsEvent.type) }}>
            {detailsEvent.type || "There’s no Type"}
          </span>
          <span className="px-2 py-1 shadow-md">{detailsEvent.date}</span>
        </div>
        <div
          className="flex justify-center items-center
          gap-5 text-white font-bold mt-4">
          <span
            className="flex items-center py-1 px-2 rounded-sm bg-[#6366F1] cursor-pointer"
            onClick={() => {
              dispatch(startEditEvent({ name: detailsEvent.name, date: detailsEvent.date }));
              dispatch(setShowDetailsEvent(false));
              dispatch(setShowInputFields(true));
            }}>
            <FaEdit className="mr-0.5 mb-0.5" size={18} />
            Edite
          </span>

          <span
            className="flex items-center py-1 px-2 rounded-sm bg-red-500 cursor-pointer"
            onClick={() => {
              dispatch(deleteSingleEvent({ name: detailsEvent.name, date: detailsEvent.date }));
              dispatch(setShowDetailsEvent(false));
            }}>
            <FaTrash size={14} className="mr-0.5 mb-0.5" />
            Delete
          </span>
        </div>
      </div>
    </WrapperShowBoxes>
  );
};

export default DetailBox;
