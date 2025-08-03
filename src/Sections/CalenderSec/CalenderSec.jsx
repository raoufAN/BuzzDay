import Calender from "../../Components/calender/Calender";
import ShowEventPerDay from "../../Components/showEventPerDay/ShowEventPerDay";

const CalenderSec = () => {
  return (
    <div className="w-full ">
      <div className="container mx-auto px-2  flex justify-between flex-col lg:flex-row gap-5">
        <Calender />
        <ShowEventPerDay />
      </div>
    </div>
  );
};

export default CalenderSec;
