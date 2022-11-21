import { useEffect } from "react";
import {
  pageInfo,
  fetchTopStories,
  fetchTopStoriesData,
  incrementTopStoriesCount,
  topStoriesStatus,
  storyDetailsStatus,
  topStories,
  totalStoriesCount,
  resetTopStoriesStore,
} from "./topStoriesSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { StoriesUI } from "../stories-ui";
import { ShowMoreButton } from "../../core";
import styles from "./TopStories.module.css";

export function TopStories() {
  const pageCounterInfo = useAppSelector(pageInfo);
  const hasTopStoryIds = useAppSelector(topStoriesStatus);
  const hasStoryDetails = useAppSelector(storyDetailsStatus);

  const topStoryIds = useAppSelector((state) => state.topStories.topStories);
  const dispatch = useAppDispatch();

  const stories = useAppSelector(topStories);
  const storiesCount = useAppSelector(totalStoriesCount);

  useEffect(() => {
    if (hasTopStoryIds === "idle") {
      dispatch(fetchTopStories());
    } else if (hasTopStoryIds === "succeeded") {
      const stories = topStoryIds?.slice(
        pageCounterInfo.from,
        pageCounterInfo.to
      );
      dispatch(fetchTopStoriesData(stories));
    }
  }, [dispatch, hasTopStoryIds, pageCounterInfo]);

  useEffect(() => {
    return () => {
      dispatch(resetTopStoriesStore());
    };
  }, []);

  const handleShowMore = () => {
    dispatch(incrementTopStoriesCount());
  };

  return (
    <div className={styles.storiesContainer}>
      <StoriesUI stories={stories} />
      {storiesCount > stories.length && (
        <>
          <ShowMoreButton onClick={handleShowMore} />
          {hasStoryDetails === "loading" && <div>loading...</div>}
        </>
      )}
    </div>
  );
}

export default TopStories;
