import { useDispatch } from "react-redux";
import { setDetailsEvent, setShowDetailsEvent } from "../../Redux/EventSlice";

const ShowSearchResault = ({ filteredData, setresault }) => {
  const dispatch = useDispatch();
  return (
    <>
      {filteredData.length > 0 ? (
        <ul className="w-[280px] md:w-[400px] mt-2 max-h-40  overflow-y-auto  rounded shadow absolute top-[40px] right-0 z-50 bg-white">
          {filteredData.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 border-b-1 border-gray-300 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                dispatch(
                  setDetailsEvent({
                    name: item.name,
                    image: item.image,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    location: item.location,
                    description: item.description,
                    type: item.type,
                    date: item.date,
                  })
                );
                dispatch(setShowDetailsEvent(true));
                setresault([]);
              }}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-[220px] md:w-[400px] mt-2 h-[50px]  overflow-y-auto  rounded shadow absolute top-[40px] left-0 z-50 bg-white">
          <p className="text-sm text-gray-500 mt-2 px-4 py-2">No results found.</p>
        </div>
      )}
    </>
  );
};

export default ShowSearchResault;
