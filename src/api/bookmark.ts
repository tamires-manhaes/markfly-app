import { api } from ".";

interface Bookmark {
  title: string;
  url: string;
  tags?: string[];
  pinned: boolean;
  category: string;
}

export interface BookmarkResponse extends Bookmark {
  id: string;
  userId: string;
  imgPreview?: string;
}

export async function createBookmark(
  bookmark: Bookmark
): Promise<BookmarkResponse> {
  return await api
    .post("bookmarks", {
      json: bookmark,
    })
    .json<BookmarkResponse>();
}

export async function getBookmarks(): Promise<BookmarkResponse[]> {
  return await api.get("bookmarks").json<BookmarkResponse[]>();
}

export async function updateBookmark(
  id: string,
  bookmark: Partial<Bookmark>
): Promise<BookmarkResponse> {
  return await api
    .put(`bookmarks/${id}`, {
      json: bookmark,
    })
    .json<BookmarkResponse>();
}

export async function pinnedBookmark(
  id: string,
  pinned: boolean
): Promise<BookmarkResponse> {
  return await api
    .put(`bookmarks/${id}/pinned`, {
      json: { pinned },
    })
    .json<BookmarkResponse>();
}

export async function deleteBookmark(id: string): Promise<void> {
  await api.delete(`bookmarks/${id}`);
}

export async function getBookmarkById(id: string): Promise<BookmarkResponse> {
  return await api.get(`bookmarks/${id}`).json<BookmarkResponse>();
}
