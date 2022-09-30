import axios from "axios";

export const getPodcasts = async () => {
  try {
    const response = await axios.get(
      "https://us-central1-pizzes-2f536.cloudfunctions.net/api/getAllPodcasts/"
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const getPodcast = async (podcastId) => {
  try {
    const response = await axios.get(
      `https://us-central1-pizzes-2f536.cloudfunctions.net/api/getPodcast/${podcastId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const postComment = (commentData, podcastId) => {
  try {
    const response = axios.post(
      `https://us-central1-pizzes-2f536.cloudfunctions.net/api/podcast/${podcastId}/comment`,
      commentData
    );
    return response;
  } catch (error) {
    return error;
  }
};
