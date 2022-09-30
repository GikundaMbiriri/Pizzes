import axios from "axios";

export const getArticles = async () => {
  try {
    const response = await axios.get(
      "https://us-central1-pizzes-2f536.cloudfunctions.net/api/screams"
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const getArticle = async (blogId) => {
  try {
    const response = await axios.get(
      `https://us-central1-pizzes-2f536.cloudfunctions.net/api/one/${blogId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const postComment = (commentData, blogId) => {
  try {
    const response = axios.post(
      `https://us-central1-pizzes-2f536.cloudfunctions.net/api/blog/${blogId}/comment`,
      commentData
    );
    return response;
  } catch (error) {
    return error;
  }
};
