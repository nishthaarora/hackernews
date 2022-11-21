import savedStoriesReducer, {
  SavedStoriesState,
  incrementSavedStoriesCount,
  resetSavedStoriesStore,
} from "./savedStoriesSlice";

describe("SaveStory reducer", () => {
  const initialState: SavedStoriesState = {
    pageInfo: {
      from: 0,
      to: 12,
    },
    storyDetailsStatus: "idle",
    storyDetails: [],
  };

  it("should handle initial state", () => {
    expect(savedStoriesReducer(undefined, { type: "unknown" })).toEqual({
      pageInfo: {
        from: 0,
        to: 12,
      },
      storyDetailsStatus: "idle",
      storyDetails: [],
    });
  });

  it("should have to and from page info incremented by 12", () => {
    const actual = savedStoriesReducer(
      initialState,
      incrementSavedStoriesCount()
    );
    expect(actual.pageInfo.from).toEqual(12);
    expect(actual.pageInfo.to).toEqual(24);
  });

  it("should call resetSavedStoriesStore and reset store", () => {
    const actual = savedStoriesReducer(
      {
        ...initialState,
        pageInfo: {
          from: 12,
          to: 24,
        },
      },
      resetSavedStoriesStore()
    );
    expect(actual).toEqual(initialState);
  });
});
