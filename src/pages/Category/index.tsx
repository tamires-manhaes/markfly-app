import type { BookmarkResponse } from "@/api/bookmark";
import { BookmarkCard } from "@/components/bookmark-card";
import CommomContainer from "@/components/container/commom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBookmark } from "@/hooks/use-bookmark";
import { useCategory } from "@/hooks/use-category";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useParams } from "react-router";
import { FormNewBookmark } from "../Home/form-new-bookmark";
import { FormNewCategory } from "../Home/form-new-category";
import { useMemo } from "react";

export function CategoryPage() {
  const params = useParams<{ categoryId: string }>();
  const { bookmarkByCategory, handleDelete, handlePin } = useBookmark({
    category_id: params.categoryId ?? null,
  });
  const { categories } = useCategory();
  const categoryName = useMemo(() => {
    if (categories) {
      const category = categories.find(
        (category) => category.id === params.categoryId
      );

      return category?.name || "Bookmarks";
    }
  }, [params.categoryId, categories]);

  return (
    <CommomContainer>
      <Dialog>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-row w-full justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {categoryName}
            </h1>
            <DialogTrigger className="cursor-pointer bg-gradient-to-br from-blue-600 to-purple-600 w-10 h-10 flex justify-center items-center">
              <Plus className="size-5 text-slate-50 dark:text-slate-50" />
            </DialogTrigger>
          </div>
          <div className="flex flex-wrap items-start justify-around mx-auto">
            {bookmarkByCategory ? (
              bookmarkByCategory.map((bookmark: BookmarkResponse) => (
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
              ))
            ) : (
              <h2 className="text-sla">Nothing here</h2>
            )}
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
