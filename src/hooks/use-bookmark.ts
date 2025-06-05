import {
  type BookmarkResponse,
  deleteBookmark,
  getBookmarks,
  pinnedBookmark,
} from "@/api/bookmark";
import { useState, useEffect, useMemo } from "react";

export const useBookmark = ({
  category_id,
}: {
  category_id: string | null;
}) => {
  const [bookmarks, setBookmarks] = useState<BookmarkResponse[]>([]);

  useEffect(() => {
    getBookmarks().then(setBookmarks);
  }, []);

  const pinnedBookmarks = useMemo(() => {
    return bookmarks.filter((mark) => mark.pinned === true);
  }, [bookmarks]);

  const bookmarkByCategory = useMemo(() => {
    if (category_id) {
      return bookmarks.filter((mark) => mark.category === category_id);
    }
  }, [category_id, bookmarks]);

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

  return {
    bookmarks,
    pinnedBookmarks,
    bookmarkByCategory,
    handlePin,
    handleDelete,
    handleEdit,
  };
};
