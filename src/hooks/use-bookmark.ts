import {
  type BookmarkResponse,
  deleteBookmark,
  getBookmarks,
  pinnedBookmark,
} from "@/api/bookmark";
import { useState, useEffect } from "react";

export const useBookmark = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkResponse[]>([]);

  useEffect(() => {
    getBookmarks().then(setBookmarks);
  }, []);

  const handlePin = async (id: string, pinned: boolean) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, pinned } : b))
    );
    await pinnedBookmark(id, pinned);
  };

  const handleDelete = async (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    await deleteBookmark(id);
  };

  const handleEdit = (id: string) => {
    const bookmarkToEdit = bookmarks.find((b) => b.id === id);
    if (bookmarkToEdit) {
      const newTitle = prompt("Edit title", bookmarkToEdit.title);
      if (newTitle) {
        setBookmarks((prev) =>
          prev.map((b) => (b.id === id ? { ...b, title: newTitle } : b))
        );
      }
    }
  };

  return { bookmarks, handlePin, handleDelete, handleEdit };
};
