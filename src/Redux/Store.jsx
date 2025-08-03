import { configureStore } from "@reduxjs/toolkit";
// this basecle is just we import this => export default eventsSlice.reducer;
import eventReducer from "./EventSlice.jsx";

const store = configureStore({
  reducer: {
    // stor name
    event: eventReducer,
  },
});

export default store;
