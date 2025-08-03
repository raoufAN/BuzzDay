import { HiX } from "react-icons/hi";
import { setShowInputFields } from "../../Redux/EventSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoCloudUpload } from "react-icons/io5";
import { useEffect, useState } from "react";
import WrapperShowBoxes from "../WrapperShowBoxes/WrapperShowBoxes";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { add, finishEditing, stopEditing } from "../../Redux/EventSlice";

const InputFields = () => {
  const dispatch = useDispatch();
  const { eventTypes, events } = useSelector((state) => state.event);
  const [dataInputs, setDatainputs] = useState({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    image: "",
    type: "",
  });
  const [validationInputsErrors, setValidationInputsErrors] = useState({
    name: false,
    date: false,
    startTime: false,
  });
  const [editEvent, setEditEvent] = useState(false);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleInputsFields = (e) => {
    const { name, value } = e.target;

    setDatainputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value !== "" && validationInputsErrors[name]) {
      setValidationInputsErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleInputImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDatainputs((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinishAddingData = (editOrAdd) => {
    if (dataInputs.name === "") {
      setValidationInputsErrors((prev) => ({ ...prev, name: true }));
    } else if (dataInputs.date === "") {
      console.log(dataInputs.date === "");

      setValidationInputsErrors((prev) => ({ ...prev, date: true }));
    } else if (dataInputs.startTime === "") {
      setValidationInputsErrors((prev) => ({ ...prev, startTime: true }));
    } else {
      if (editOrAdd === "add") {
        console.log(dataInputs.name);
        setValidationInputsErrors({ title: false, date: false, startTime: false });
        dispatch(setShowInputFields(false));
        dispatch(add(dataInputs));
      } else {
        setDatainputs({
          name: "",
          description: "",
          date: "",
          startTime: "",
          endTime: "",
          location: "",
          image: "",
          type: "",
        });
        setValidationInputsErrors({ title: false, date: false, startTime: false });
        dispatch(setShowInputFields(false));
        setEditEvent(false);
        dispatch(finishEditing(dataInputs));
      }
    }
  };

  useEffect(() => {
    const itemForEditing = events.find((item) => item.IsEdting);
    if (itemForEditing) {
      setDatainputs({
        name: itemForEditing.name,
        description: itemForEditing.description,
        date: itemForEditing.date,
        startTime: itemForEditing.startTime,
        endTime: itemForEditing.endTime,
        location: itemForEditing.location,
        image: itemForEditing.image,
        type: itemForEditing.type,
      });
      setEditEvent(true);
    }
  }, [events]);

  return (
    <WrapperShowBoxes>
      <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
        <h1 className="font-bold text-gray-800">Create New Event</h1>
        <HiX
          size={20}
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={() => {
            dispatch(setShowInputFields(false));
            setDatainputs({
              name: "",
              description: "",
              date: "",
              startTime: "",
              endTime: "",
              location: "",
              image: "",
              type: "",
            });
            dispatch(stopEditing(false));
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border ${
              validationInputsErrors.name ? "text-red-600" : "border-gray-300 "
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Enter event title"
            name="name"
            value={dataInputs.name}
            onChange={(e) => handleInputsFields(e)}
          />
          <p
            className={`text-xs text-red-600 p-0.5 ${
              validationInputsErrors.name ? "block" : "hidden"
            }`}>
            Don't leave this field empty.
          </p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Description</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter event description"
            name="description"
            value={dataInputs.description}
            onChange={(e) => handleInputsFields(e)}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <div className="flex space-x-2">
            <div className="w-full">
              <input
                type="date"
                className={`w-full px-3 py-2 border ${
                  validationInputsErrors.date ? "text-red-600" : "border-gray-300 "
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                name="date"
                value={dataInputs.date}
                onChange={(e) => handleInputsFields(e)}
              />
              <p
                className={`text-xs text-red-600 p-0.5 ${
                  validationInputsErrors.date ? "block" : "hidden"
                }`}>
                Don't leave this field empty.
              </p>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Time &amp; End Time
          </label>
          <div className="flex space-x-2">
            <div className="w-1/2">
              <input
                type="time"
                className={`w-full px-3 py-2 border ${
                  validationInputsErrors.startTime ? "text-red-600" : "border-gray-300 "
                }  rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 `}
                name="startTime"
                value={dataInputs.startTime}
                onChange={(e) => handleInputsFields(e)}
              />
              <p
                className={`text-xs text-red-600 p-0.5 ${
                  validationInputsErrors.startTime ? "block" : "hidden"
                }`}>
                Don't leave this field empty.
              </p>
            </div>
            <div className="w-1/2">
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                name="endTime"
                value={dataInputs.endTime}
                onChange={(e) => handleInputsFields(e)}
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Add event location"
            name="location"
            value={dataInputs.location}
            onChange={(e) => handleInputsFields(e)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <Menu as="div" className="relative inline-block w-full">
            <MenuButton className="inline-flex w-full justify-between items-center gap-x-1.5  text-sm font-semibold text-gray-700 shadow-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ">
              {dataInputs.type === "" ? (
                <>
                  <span className="flex items-center text-gray-700 text-base font-normal">
                    Select a Type
                  </span>
                  <FaChevronDown aria-hidden="true" className="-mr-1 size-4 text-gray-700" />
                </>
              ) : (
                <>
                  <span className="flex items-center text-gray-700 text-base font-normal">
                    {dataInputs.type}
                  </span>
                  <FaChevronDown aria-hidden="true" className="-mr-1 size-4 text-gray-700" />
                </>
              )}
            </MenuButton>

            <MenuItems
              transition
              className="w-full absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in cursor-pointer">
              <div className="py-1 max-h-45 overflow-y-auto">
                {eventTypes.map((el, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => setDatainputs((prev) => ({ ...prev, type: el }))}>
                    <span className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                      {el}
                    </span>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="flex flex-col items-center">
              <IoCloudUpload
                className={`text-3xl ${
                  dataInputs.image === "" ? "text-gray-400" : "text-[#6366F1]"
                } mb-2`}
              />
              <p className="text-gray-600 mb-2">click to select</p>
              <p className="text-xs text-gray-500">PNG, JPG or GIF (max. 2MB)</p>
              <div>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex flex-col justify-center items-center cursor-pointer">
                  <label htmlFor="inputFile"> Browse Files</label>
                  <input
                    type="file"
                    id="inputFile"
                    className="hidden"
                    name="image"
                    onChange={(e) => handleInputImage(e)}
                  />
                </button>
                {dataInputs.image !== "" ? (
                  <button
                    className="mt-4 px-4 py-2 bg-red-400  rounded-md text-sm text-white hover:bg-red-600 flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => setDatainputs((prev) => ({ ...prev, image: "" }))}>
                    Delete Image
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 mt-8 flex justify-end space-x-3">
          <button
            type="button"
            id="cancel-event"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
            onClick={() => {
              dispatch(setShowInputFields(false));
              setDatainputs({
                name: "",
                description: "",
                date: "",
                startTime: "",
                endTime: "",
                location: "",
                image: "",
                type: "",
              });
              dispatch(stopEditing(false));
            }}>
            Cancel
          </button>
          {editEvent ? (
            <button
              type="submit"
              className="px-4 py-2 bg-[#6366F1]  text-white rounded-md cursor-pointer"
              onClick={() => handleFinishAddingData("edit")}>
              Edite Event
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-[#14b8a6]  text-white rounded-md cursor-pointer"
              onClick={() => handleFinishAddingData("add")}>
              Create Event
            </button>
          )}
        </div>
      </div>
    </WrapperShowBoxes>
  );
};

export default InputFields;
