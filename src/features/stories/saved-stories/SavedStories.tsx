import { useEffect, useRef, useState } from "react";

import {
  pageInfo,
  fetchSavedStoriesData,
  incrementSavedStoriesCount,
  storyDetailsStatus,
  savedStoriesWithData,
  resetSavedStoriesStore,
} from "./savedStoriesSlice";
import { getLocalStorageItems } from "../../utils";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { StoriesUI } from "../stories-ui";
import { ShowMoreButton } from "../../core";
import styles from "./SavedStories.module.css";

export function SavedStories() {
  const pageCounterInfo = useAppSelector(pageInfo);
  const hasStoryDetails = useAppSelector(storyDetailsStatus);
  const apiCalledRef = useRef(false);

  const stories = useAppSelector(savedStoriesWithData);
  const [savedItemsCount, setSavedItemsCount] = useState(
    getLocalStorageItems().length
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedItems = getLocalStorageItems();
    setSavedItemsCount(savedItems.length);
    if (savedItems.length > 0) {
      if (!apiCalledRef.current) {
        const stories = savedItems.slice(
          pageCounterInfo.from,
          pageCounterInfo.to
        );
        apiCalledRef.current = true;
        dispatch(fetchSavedStoriesData(stories));
      }
    }
  }, [pageCounterInfo, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetSavedStoriesStore());
    };
  }, []);

  const handleShowMore = () => {
    apiCalledRef.current = false;
    dispatch(incrementSavedStoriesCount());
  };

  if (savedItemsCount === 0) {
    return <div className={styles.zeroState}>No saved items in the list</div>;
  }

  return (
    <div className={styles.storiesContainer}>
      <StoriesUI stories={stories} />
      {(hasStoryDetails === "loading" ||
        pageCounterInfo.to < savedItemsCount) && (
        <>
          <ShowMoreButton onClick={handleShowMore} />
          {hasStoryDetails === "loading" && <div>loading</div>}
        </>
      )}
    </div>
  );
}

export default SavedStories;
