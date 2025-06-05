import { Plus } from "lucide-react";
import { type BookmarkResponse } from "@/api/bookmark";
import { useBookmark } from "@/hooks/use-bookmark";
import { useCategory } from "@/hooks/use-category";

import { BookmarkCard } from "@/components/bookmark-card";
import CommomContainer from "@/components/container/commom";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormNewBookmark } from "./form-new-bookmark";
import { FormNewCategory } from "./form-new-category";

export function HomePage() {
  const { bookmarks, handleDelete, handlePin } = useBookmark();
  const { categories } = useCategory();

  return (
    <CommomContainer>
      <Dialog>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-row w-full justify-between">
            <h1 className="text-2xl font-bold">Bookmarks</h1>
            <DialogTrigger className="cursor-pointer bg-slate-700 dark:bg-slate-400 w-10 h-10 flex justify-center items-center">
              <Plus className="size-5 text-slate-50 dark:text-slate-50" />
            </DialogTrigger>
          </div>
          <div className="grid grid-cols-3 gap-2 max-w-7xl mx-auto auto-rows-fr">
            {bookmarks.map((bookmark: BookmarkResponse) => (
              <BookmarkCard
                id={bookmark.id}
                key={bookmark.id}
                title={bookmark.title}
                url={bookmark.url}
                tags={bookmark.tags}
                pinned={bookmark.pinned}
                category={
                  categories.find((cat) => cat.id === bookmark.category)
                    ?.name || ""
                }
                imgPreview={bookmark.imgPreview}
                onPin={handlePin}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>

        <DialogContent className="w-full">
          <DialogTitle>Novo</DialogTitle>
          <Tabs defaultValue="link" className="">
            <TabsList>
              <TabsTrigger value="link">Novo Link</TabsTrigger>
              <TabsTrigger value="category">Nova Categoria</TabsTrigger>
            </TabsList>
            <TabsContent value="link" className="w-full">
              <FormNewBookmark />
            </TabsContent>
            <TabsContent value="category" className="w-full">
              <FormNewCategory />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </CommomContainer>
  );
}
