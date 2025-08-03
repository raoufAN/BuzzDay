import { createSlice } from "@reduxjs/toolkit";
import dataEvent from "../Data/Data";

const CurrentDate = new Date();
const initialEvents = dataEvent;

export const eventsSlice = createSlice({
  // store name
  name: "event",
  initialState: {
    events: initialEvents,
    eventsFiltering: initialEvents,
    showListOrCalender: true,
    showInputFields: false,
    showDetailsEvent: false,
    detailsEvent: {},
    today: {
      year: CurrentDate.getFullYear(),
      month: CurrentDate.getMonth(),
      day: CurrentDate.getDate(),
    },

    monthOfYear: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    eventTypes: [
      "Exhibition",
      "Theater",
      "Conference",
      "Festival",
      "Performance",
      "Charity",
      "Workshop",
      "Fashion",
      "Business",
      "Health",
      "Sport",
    ],
    eventTypeColors: [
      { type: "Exhibition", bg: "#6366F1" }, // Indigo
      { type: "Theater", bg: "#F43F5E" }, // Rose
      { type: "Conference", bg: "#0EA5E9" }, // Sky Blue
      { type: "Festival", bg: "#22C55E" }, // Green
      { type: "Performance", bg: "#F97316" }, // Orange
      { type: "Charity", bg: "#EC4899" }, // Pink
      { type: "Workshop", bg: "#06B6D4" }, // Cyan
      { type: "Fashion", bg: "#A855F7" }, // Purple
      { type: "Business", bg: "#14B8A6" }, // Teal
      { type: "Health", bg: "#84CC16" }, // Lime
      { type: "Sport", bg: "#EAB308" }, // Yellow
    ],
    filtreType: "",
  },
  reducers: {
    // updateAction
    add: (state, action) => {
      state.events.push({
        name: action.payload.name,
        description: action.payload.description,
        date: action.payload.date,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        location: action.payload.location,
        image: action.payload.image,
        type: action.payload.type,
        IsEdting: false,
      });
      state.eventsFiltering.push({
        name: action.payload.name,
        description: action.payload.description,
        date: action.payload.date,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        location: action.payload.location,
        image: action.payload.image,
        type: action.payload.type,
        IsEdting: false,
      });
    },

    deleteSingleEvent: (state, action) => {
      state.events = state.events.filter((element) => {
        const dateA = new Date(element.date);
        const dateB = new Date(action.payload.date);
        return element.name !== action.payload.name && dateA !== dateB;
      });
      state.eventsFiltering = state.eventsFiltering.filter((element) => {
        const dateA = new Date(element.date);
        const dateB = new Date(action.payload.date);
        return element.name !== action.payload.name && dateA !== dateB;
      });
    },

    startEditEvent: (state, action) => {
      state.events = state.events.map((element) => {
        const dateA = new Date(element.date).getTime();
        const dateB = new Date(action.payload.date).getTime();
        return element.name === action.payload.name && dateA === dateB
          ? { ...element, IsEdting: true }
          : element;
      });
    },
    stopEditing: (state, action) => {
      state.events = state.events.map((element) => {
        return element.IsEdting === true ? { ...element, IsEdting: action.payload } : element;
      });
    },

    finishEditing: (state, action) => {
      state.events = state.events.map((element) => {
        return element.IsEdting === true ? { ...action.payload, IsEdting: false } : element;
      });
      state.eventsFiltering = state.events.map((element) => {
        return element.IsEdting === true ? { ...action.payload, IsEdting: false } : element;
      });
    },

    deleteAll: (state) => {
      state.events = [];
      state.eventsFiltering = [];
    },
    setShowListOrCalender: (state, action) => {
      state.showListOrCalender = action.payload;
    },
    setShowInputFields: (state, action) => {
      state.showInputFields = action.payload;
    },
    setEventPerDate: (state, action) => {
      state.today = action.payload;
    },
    getFilterEvent: (state, action) => {
      let arrayFiltred;
      if (action.payload === "Date") {
        arrayFiltred = state.events.sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.startTime}`);
          const dateB = new Date(`${b.date}T${b.startTime}`);

          return dateA - dateB;
        });
      } else {
        arrayFiltred = state.events.filter((el) => el.type.includes(action.payload));
      }

      state.eventsFiltering = arrayFiltred;
    },
    setShowDetailsEvent: (state, action) => {
      state.showDetailsEvent = action.payload;
    },
    setDetailsEvent: (state, action) => {
      state.detailsEvent = action.payload;
    },
  },
});

// dispatch
export const {
  add,
  deleteSingleEvent,
  startEditEvent,
  stopEditing,
  setShowListOrCalender,
  setShowInputFields,
  setEventPerDate,
  deleteAll,
  finishEditing,
  getFilterEvent,
  setShowDetailsEvent,
  setDetailsEvent,
} = eventsSlice.actions;

const eventReducer = eventsSlice.reducer;
export default eventReducer;
