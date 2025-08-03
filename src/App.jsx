import Header from "./Components/header/Header";
import SwitchCalenderList from "./Components/SwitchCalenderList/SwitchCalenderList";
import { IoAddCircle } from "react-icons/io5";
import ListSec from "./Sections/ListSec/ListSec";
import { useSelector } from "react-redux";
import InputFields from "./Components/InputFields/InputFields";
import { setShowInputFields } from "./Redux/EventSlice";
import { useDispatch } from "react-redux";
import CalenderSec from "./Sections/CalenderSec/CalenderSec";
import DetailBox from "./Components/DetailBox/DetailBox";

function App() {
  const dispatch = useDispatch();
  const { showInputFields, showListOrCalender, showDetailsEvent } = useSelector(
    (state) => state.event
  );
  return (
    <div className="w-full relative">
      <div
        className="fixed bottom-5 right-5 block md:hidden text-[#14b8a6] z-20"
        onClick={() => dispatch(setShowInputFields(true))}>
        <IoAddCircle size={60} />
      </div>
      {showInputFields && <InputFields />}
      {showDetailsEvent && <DetailBox />}
      <Header />
      <SwitchCalenderList />
      {showListOrCalender ? <ListSec /> : <CalenderSec />}
    </div>
  );
}

export default App;
