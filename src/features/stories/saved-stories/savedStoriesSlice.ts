import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import { fetchStories } from "../api";
import { StoryDetails, Status } from "../types";

export interface SavedStoriesState {
  pageInfo: {
    from: number;
    to: number;
  };
  storyDetailsStatus: Status;
  storyDetails: StoryDetails[];
}

const initialState: SavedStoriesState = {
  storyDetails: [],
  pageInfo: {
    from: 0,
    to: 12,
  },
  storyDetailsStatus: "idle",
};

export const fetchSavedStoriesData = createAsyncThunk(
  "getSavedStoriesData",
  async (stories: number[]) => fetchStories(stories)
);

export const savedStoriesSlice = createSlice({
  name: "savedStories",
  initialState,
  reducers: {
    incrementSavedStoriesCount: (state) => {
      return {
        ...state,
        pageInfo: {
          from: state.pageInfo.to,
          to: state.pageInfo.to + 12,
        },
      };
    },
    resetSavedStoriesStore: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSavedStoriesData.pending, (state) => {
        return {
          ...state,
          storyDetailsStatus: "loading",
        };
      })
      .addCase(fetchSavedStoriesData.fulfilled, (state, action) => {
        return {
          ...state,
          storyDetailsStatus: "succeeded",
          storyDetails: [...state.storyDetails, ...action.payload],
        };
      });
  },
});

export const pageInfo = (state: RootState) => state.savedStories.pageInfo;

export const storyDetailsStatus = (state: RootState) =>
  state.savedStories.storyDetailsStatus;
export const savedStoriesWithData = (state: RootState) =>
  state.savedStories.storyDetails;

export const { incrementSavedStoriesCount, resetSavedStoriesStore } =
  savedStoriesSlice.actions;
export default savedStoriesSlice.reducer;
