import { IoTimeOutline } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import noImage from "../../assets/no-image.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { setShowDetailsEvent, setDetailsEvent } from "../../Redux/EventSlice";

const SingleEventBox = ({ name, image, startTime, endTime, location, description, type, date }) => {
  const { eventTypeColors } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const getEventColor = (type) => {
    const match = eventTypeColors.find((el) => el.type === type);
    return match?.bg || "#d1d5db";
  };

  return (
    <div
      className="bg-white relative rounded-lg shadow-sm overflow-hidden animate-fade-in border-b-3 "
      style={{
        borderColor: getEventColor(type),
      }}>
      <div
        className="h-40  relative"
        style={{ background: `url(${noImage})`, backgroundPosition: "center" }}>
        <img src={image || noImage} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{name}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <IoTimeOutline className="mr-2" />
          <span className="mr-2.5">{startTime}</span>
          To <span className="ml-2.5">{endTime || "There’s no End Time"}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <IoLocationSharp className="mr-2" />
          <span>{location || "There’s no Loaction"}</span>
        </div>
        <div className="text-gray-600 text-sm mb-4 line-clamp-1">
          <p>{description || "There’s no Description"}</p>
        </div>
        <div className="flex  items-center justify-between ">
          <span
            className="text-white text-xs font-medium px-2 py-1 rounded"
            style={{ background: getEventColor(type) }}>
            {type || "There’s no Type"}
          </span>
          <FaArrowRight
            className="text-[#14b8a6] cursor-pointer"
            size={22}
            onClick={() => {
              dispatch(setShowDetailsEvent(true));
              dispatch(
                setDetailsEvent({
                  name: name,
                  image: image,
                  startTime: startTime,
                  endTime: endTime,
                  location: location,
                  description: description,
                  type: type,
                  date: date,
                })
              );
            }}
          />
        </div>
      </div>

      <span className="text-[#14b8a6] absolute top-3 right-3 bg-white bg-opacity-90 rounded-md px-2 py-1 text-sm font-medium">
        {date}
      </span>
    </div>
  );
};

export default SingleEventBox;
