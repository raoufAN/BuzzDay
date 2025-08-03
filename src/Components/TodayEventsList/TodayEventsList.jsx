import SingleEventBox from "../singleEventBox/SingleEventBox";
import { useSelector } from "react-redux";
import { useState } from "react";
import GridForBoxes from "../GridForBoxes/GridForBoxes";
import ShowHideBoxesButton from "../showHideBoxesButton/showHideBoxesButton";

const howManyBoxIsShowing = 3;
const TodayEventsList = () => {
  const { events, today } = useSelector((state) => state.event);
  const [showMoreBox, setShowMoreBox] = useState(howManyBoxIsShowing);

  const todayDateStr = `${today.year}-${String(today.month + 1).padStart(2, "0")}-${String(
    today.day
  ).padStart(2, "0")}`;

  const todayEventsandSort = events
    .filter((el) => {
      const eventDateStr = el.date;
      return eventDateStr === todayDateStr;
    })
    .sort((a, b) => {
      const timeA = Number(a.startTime.split(":")[0]) * 60 + Number(a.startTime.split(":")[1]);
      const timeB = Number(b.startTime.split(":")[0]) * 60 + Number(b.startTime.split(":")[1]);
      return timeA - timeB;
    });
  return (
    <div className="w-full">
      <div className="w-full flex items-center relative my-4">
        <h1 className="text-xl md:text-2xl font-bold pr-2.5">
          Today Events ({todayEventsandSort.length})
        </h1>
        <hr className="flex-grow h-0.5 border-none bg-black" />
      </div>
      {todayEventsandSort.length > 0 ? (
        <>
          <GridForBoxes>
            {todayEventsandSort.slice(0, showMoreBox).map((el, index) => (
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
            ))}
          </GridForBoxes>
          <ShowHideBoxesButton
            events={todayEventsandSort}
            setShowMoreBox={setShowMoreBox}
            showMoreBox={showMoreBox}
          />
        </>
      ) : (
        <div className="w-full h-60 flex flex-col justify-center items-center  space-y-2 text-center">
          <span className="text-4xl">📭</span>
          <span className="font-semibold text-gray-500 text-lg md:text-xl">
            There’s no event scheduled for today.
          </span>
        </div>
      )}
    </div>
  );
};

export default TodayEventsList;
