import { useSelector } from "react-redux";
import SingleEventBox from "../singleEventBox/SingleEventBox";

const ShowEventPerDay = () => {
  const { today, monthOfYear, events } = useSelector((state) => state.event);
  const calnderDayOfEvent = `${today.year}-${String(today.month + 1).padStart(2, "0")}-${String(
    today.day
  ).padStart(2, "0")}`;
  const getFilterPerDate = events.filter((el) => {
    const dateA = new Date(calnderDayOfEvent).getTime();
    const dateB = new Date(el.date).getTime();
    return dateA === dateB;
  });

  return (
    <div className="w-full lg:w-[65%]   lg:h-[600px]    rounded-xl shadow-2xl  bg-white  p-6 flex flex-col">
      <div className="text-2xl font-bold text-[#14b8a6]">
        <span>Event for </span>
        <span className="ml-2">{monthOfYear[today.month]}</span>
        <span className="ml-2">
          {today.day}, {today.year}
        </span>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2  mt-2.5 gap-3.5  overflow-y-auto md:p-2.5">
        {getFilterPerDate.map((el, index) => (
          <div key={index} className="items-stretch">
            <SingleEventBox
              key={index}
              name={el.name}
              image={el.image}
              startTime={el.startTime}
              endTime={el.endTime}
              location={el.location}
              type={el.type}
              date={el.date}
              description={el.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowEventPerDay;
