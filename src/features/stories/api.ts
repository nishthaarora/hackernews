import axios from "axios";

export async function topStoriesAPI() {
  try {
    const response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    );
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function storiesDataAPI(storyId: number) {
  try {
    const response = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}

export const fetchStories = async (stories: number[]) => {
  const items = stories.map(async (id) => {
    const response = await storiesDataAPI(id);

    return response?.data;
  });
  return await Promise.all(items);
};
