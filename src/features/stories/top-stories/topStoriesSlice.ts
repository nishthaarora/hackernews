import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import { topStoriesAPI, fetchStories } from "../api";
import { Status, StoryDetails } from "../types";

export interface TopStoriesState {
  topStories: number[];
  pageInfo: {
    from: number;
    to: number;
  };
  topStoriesStatus: Status;
  storyDetailsStatus: Status;
  error?: string;
  storyDetails: StoryDetails[];
}

const initialState: TopStoriesState = {
  topStories: [],
  storyDetails: [],
  pageInfo: {
    from: 0,
    to: 12,
  },
  topStoriesStatus: "idle",
  storyDetailsStatus: "idle",
  error: undefined,
};

export const fetchTopStories = createAsyncThunk("getTopStories", async () => {
  const response = await topStoriesAPI();

  return response?.data;
});

export const fetchTopStoriesData = createAsyncThunk(
  "getTopStoriesData",
  async (stories: number[]) => fetchStories(stories)
);

export const topStoriesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    incrementTopStoriesCount: (state) => {
      return {
        ...state,
        pageInfo: {
          from: state.pageInfo.to,
          to: state.pageInfo.to + 12,
        },
      };
    },
    resetTopStoriesStore: (state) => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTopStories.pending, (state) => {
        return {
          ...state,
          topStoriesStatus: "loading",
        };
      })
      .addCase(fetchTopStories.fulfilled, (state, action) => {
        return {
          ...state,
          topStoriesStatus: "succeeded",
          topStories: action.payload,
        };
      })
      .addCase(fetchTopStories.rejected, (state, action) => {
        return {
          ...state,
          topStoriesStatus: "failed",
          error: action.error.message,
        };
      })
      .addCase(fetchTopStoriesData.pending, (state) => {
        return {
          ...state,
          storyDetailsStatus: "loading",
        };
      })
      .addCase(fetchTopStoriesData.fulfilled, (state, action) => {
        return {
          ...state,
          storyDetailsStatus: "succeeded",
          storyDetails: [...state.storyDetails, ...action.payload],
        };
      });
  },
});

export const pageInfo = (state: RootState) => state.topStories.pageInfo;
export const topStoriesStatus = (state: RootState) =>
  state.topStories.topStoriesStatus;
export const storyDetailsStatus = (state: RootState) =>
  state.topStories.storyDetailsStatus;
export const topStories = (state: RootState) => state.topStories.storyDetails;
export const totalStoriesCount = (state: RootState) =>
  state.topStories?.topStories?.length;

export const { incrementTopStoriesCount, resetTopStoriesStore } =
  topStoriesSlice.actions;
export default topStoriesSlice.reducer;
