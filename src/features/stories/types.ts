export type Status = "idle" | "loading" | "succeeded" | "failed";

export interface StoryDetails {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}
