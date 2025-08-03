import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setEventPerDate } from "../../Redux/EventSlice";
const Calender = () => {
  const dispatch = useDispatch();
  const { monthOfYear, events } = useSelector((state) => state.event);
  const daysOfWeeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const CurrentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(CurrentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(CurrentDate.getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };
  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
  };

  const handleBackGroundCalander = (year, month, day) => {
    const m = String(month).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    const dateA = new Date(`${year}-${m}-${d}`).getTime();
    const background = events.find((el) => {
      const dateB = new Date(el.date).getTime();
      return dateA === dateB;
    });

    return background ? "#14b8a6" : "";
  };

  return (
    <div className="w-full  lg:w-[35%] h-[550px] lg:h-[600px] rounded-xl shadow-2xl  bg-white p-2  md:p-6 flex flex-col">
      <div className="w-full flex justify-between items-center mb-[24px] md:pl-[16px]">
        <h2 className="text-2xl font-bold text-[#14b8a6]">{monthOfYear[currentMonth]}</h2>
        <h2 className="text-2xl font-bold text-[#14b8a6]">, {currentYear}</h2>

        <div className="flex gap-[16px] ml-auto">
          <span
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#14b8a6] rounded-full text-2xl text-white cursor-pointer"
            onClick={prevMonth}>
            <FaChevronLeft />
          </span>

          <span
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#14b8a6] rounded-full text-2xl text-white cursor-pointer"
            onClick={nextMonth}>
            <FaChevronRight />
          </span>
        </div>
      </div>

      <div className="w-full flex my-[16px]">
        {daysOfWeeks.map((day) => (
          <span
            key={day}
            className="w-[calc(100%/7)] md:text-xl font-bold uppercase text-[#14b8a6] tracking-[1.6px] flex justify-center">
            {day}
          </span>
        ))}
      </div>

      <div className="w-full flex flex-wrap">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <span key={`empty-${index}`} className="w-[calc(100%/7)] p-5"></span>
        ))}

        {[...Array(daysInMonth).keys()].map((day) => (
          <div
            key={day + 1}
            className={`w-[calc(100%/7)]   text-[#134e48] p-3 flex justify-center items-center cursor-pointer`}
            style={{
              background: `${handleBackGroundCalander(currentYear, currentMonth + 1, day + 1)}`,
            }}
            onClick={() =>
              dispatch(setEventPerDate({ year: currentYear, month: currentMonth, day: day + 1 }))
            }>
            <span
              className={`py-2.5 px-5 ${
                day + 1 === CurrentDate.getDate() &&
                currentMonth === CurrentDate.getMonth() &&
                currentYear === CurrentDate.getFullYear()
                  ? "text-white   bg-[#134e48] rounded-full  scale-70"
                  : ""
              }`}>
              {day + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calender;
