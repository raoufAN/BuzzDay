import AllEventsList from "../../Components/AllEventsList/AllEventsList";
import TodayEventsList from "../../Components/TodayEventsList/TodayEventsList";

const ListSec = () => {
  return (
    <div className="w-full ">
      <div className="container mx-auto px-2 ">
        <TodayEventsList />
        <AllEventsList />
      </div>
    </div>
  );
};

export default ListSec;
