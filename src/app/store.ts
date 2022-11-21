import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import topStoriesReducer from "../features/stories/top-stories/topStoriesSlice";
import savedStoriesReducer from "../features/stories/saved-stories/savedStoriesSlice";
import storiesReducer from "../features/stories-samestore/storiesSlice";

export const store = configureStore({
  reducer: {
    topStories: topStoriesReducer,
    savedStories: savedStoriesReducer,
    stories: storiesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
