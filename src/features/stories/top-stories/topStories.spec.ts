import topStoriesReducer, {
  TopStoriesState,
  incrementTopStoriesCount,
  resetTopStoriesStore,
} from "./topStoriesSlice";

describe("TopStories reducer", () => {
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

  it("should handle initial state", () => {
    expect(topStoriesReducer(undefined, { type: "unknown" })).toEqual({
      topStories: [],
      storyDetails: [],
      pageInfo: {
        from: 0,
        to: 12,
      },
      topStoriesStatus: "idle",
      storyDetailsStatus: "idle",
      error: undefined,
    });
  });

  it("should have to and from page info incremented by 12", () => {
    const actual = topStoriesReducer(initialState, incrementTopStoriesCount());
    expect(actual.pageInfo.from).toEqual(12);
    expect(actual.pageInfo.to).toEqual(24);
  });

  it("should resetTopStoriesStore and reset store", () => {
    const actual = topStoriesReducer(
      {
        ...initialState,
        pageInfo: {
          from: 12,
          to: 24,
        },
      },
      resetTopStoriesStore()
    );
    expect(actual).toEqual(initialState);
  });
});
