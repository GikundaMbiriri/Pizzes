import create from "zustand";

export const userStore = create((set) => ({
  user: {},
  setUser: (user) => set({ user: user }),
}));
export const articlesStore = create((set) => ({
  articles: [],
  setArticles: (articles) => set({ articles: articles }),
}));
export const articleStore = create((set) => ({
  article: {},
  comments: [],
  setArticle: (article) => set({ article: article }),
  setComments: (comments) => set({ comments: comments }),
}));
export const podcastStore = create((set) => ({
  podcast: {},
  podcastComments: [],
  setPodcast: (podcast) => set({ podcast: podcast }),
  setPodcastComments: (podcastComments) =>
    set({ podcastComments: podcastComments }),
}));

export const usePlayer = create((set) => ({
  isPlaying: false,
  currentlyPlaying: {
    name: "Secret Place",
    filepath:
      "https://firebasestorage.googleapis.com/v0/b/pizzes-2f536.appspot.com/o/SECRET%20PLACE%20PODCAST%201(1).mp4?alt=media&token=fcc0d75d-7908-4547-8b39-da269b5a25c4",
    image:
      "https://firebasestorage.googleapis.com/v0/b/pizzes-2f536.appspot.com/o/images%2FWhatsApp%20Image%202022-03-02%20at%203.01.03%20PM.jpeg?alt=media&token=b864e420-89c8-4a5e-aad4-3f5122ae1d58",
  },
  setIsPlaying: (isPlaying) => set({ isPlaying: isPlaying }),
  setCurrentlyPlaying: (currentlyPlaying) =>
    set({ currentlyPlaying: currentlyPlaying }),
}));
