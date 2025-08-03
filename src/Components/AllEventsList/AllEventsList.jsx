import SingleEventBox from "../../Components/singleEventBox/SingleEventBox";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import GridForBoxes from "../GridForBoxes/GridForBoxes";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { getFilterEvent } from "../../Redux/EventSlice";
import ShowHideBoxesButton from "../showHideBoxesButton/showHideBoxesButton";

const howManyBoxIsShowing = 3;
const AllEventsList = () => {
  const dispatch = useDispatch();
  const { eventsFiltering, eventTypes } = useSelector((state) => state.event);
  const [showMoreBox, setShowMoreBox] = useState(howManyBoxIsShowing);
  const [type, setType] = useState("");

  return (
    <div className="w-full">
      <div className="w-full flex items-center relative my-4">
        <h1 className="text-xl md:text-2xl font-bold pr-2.5">
          Upcoming Event ({eventsFiltering.length})
        </h1>
        <hr className="flex-grow h-0.5 border-none bg-black" />
      </div>

      {eventsFiltering.length > 0 ? (
        <>
          <div className="w-full flex justify-center md:justify-end my-4">
            <Menu as="div" className="relative inline-block w-[80%] md:w-[300px] ">
              <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-[#14b8a6] px-3 py-2 text-sm font-semibold text-white shadow-xs">
                {type !== "" ? (
                  type
                ) : (
                  <span className="flex items-center  font-bold">
                    <FaFilter className="mr-2" />
                    Filters
                  </span>
                )}

                <FaChevronDown aria-hidden="true" className="-mr-1 size-5 text-white" />
              </MenuButton>

              <MenuItems
                transition
                className="w-[100%] md:w-[300px] absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in cursor-pointer">
                <div className="py-1 max-h-55 overflow-y-auto">
                  {[...eventTypes, "Date"].map((el, index) => (
                    <MenuItem key={index}>
                      <span
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        onClick={() => {
                          setType(el);
                          dispatch(getFilterEvent(el));
                        }}>
                        {el}
                      </span>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
          <GridForBoxes>
            {eventsFiltering.slice(0, showMoreBox).map((el, index) => (
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
            events={eventsFiltering}
            setShowMoreBox={setShowMoreBox}
            showMoreBox={showMoreBox}
          />
        </>
      ) : (
        <div className="w-full h-60 flex flex-col justify-center items-center  space-y-2 text-center">
          <span className="text-4xl">📭</span>
          <span className="font-semibold text-gray-500 text-lg md:text-xl">
            There are no events scheduled yet.
          </span>
        </div>
      )}
    </div>
  );
};

export default AllEventsList;
