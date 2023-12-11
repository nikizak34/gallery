import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  find: "",
  authorValue: "Author",
  location: "Location",
  authorId: "",
  locationId: "",
  fromCreated: "1",
  beforeCreated: "3000",
};

const paintingSlice = createSlice({
  initialState,
  name: "painting",
  reducers: {
    changeCurrentPage: (
      state,
      action: PayloadAction<{ currentPage: number }>,
    ) => {
      state.currentPage = action.payload.currentPage;
    },
    changeLocationId: (
      state,
      action: PayloadAction<{ locationId: string }>,
    ) => {
      state.locationId = action.payload.locationId;
    },
    changeAuthorId: (state, action: PayloadAction<{ authorId: string }>) => {
      state.authorId = action.payload.authorId;
    },
    changeBeforeCreated: (
      state,
      action: PayloadAction<{ beforeCreated: string }>,
    ) => {
      state.beforeCreated = action.payload.beforeCreated;
    },
    changeFromCreated: (
      state,
      action: PayloadAction<{ fromCreated: string }>,
    ) => {
      state.fromCreated = action.payload.fromCreated;
    },
    changeFind: (state, action: PayloadAction<{ find: string }>) => {
      state.find = action.payload.find;
    },
    changeAuthorValue: (
      state,
      action: PayloadAction<{ authorValue: string }>,
    ) => {
      state.authorValue = action.payload.authorValue;
    },
    changeLocationValue: (
      state,
      action: PayloadAction<{ location: string }>,
    ) => {
      state.location = action.payload.location;
    },
  },
});

export default paintingSlice.reducer;

export const {
  changeCurrentPage,
  changeLocationValue,
  changeFromCreated,
  changeBeforeCreated,
  changeFind,
  changeAuthorId,
  changeAuthorValue,
  changeLocationId,
} = paintingSlice.actions;
