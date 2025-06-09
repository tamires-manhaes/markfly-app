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
import { useI18n } from "@/hooks/use-i18n";
import { Plus } from "lucide-react";

export function HomePage() {
  const { t } = useI18n();
  const { bookmarks, handleDelete, handlePin } = useBookmark({
    category_id: null,
  });
  const { categories } = useCategory();

  return (
    <CommomContainer>
      <Dialog>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-row w-full justify-between">
            <h1 className="text-2xl font-bold">{t("home.bookmarks")}</h1>
            <DialogTrigger className="cursor-pointer bg-gradient-to-br from-blue-600 to-purple-600  w-10 h-10 flex justify-center items-center">
              <Plus className="size-5 text-slate-50 dark:text-slate-50" />
            </DialogTrigger>
          </div>
          <div className="flex flex-wrap items-start justify-around mx-auto">
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
          <DialogTitle>{t("dialog.title")}</DialogTitle>
          <Tabs defaultValue="link" className="">
            <TabsList>
              <TabsTrigger value="link">{t("new-link.label")}</TabsTrigger>
              <TabsTrigger value="category">
                {t("new-category.label")}
              </TabsTrigger>
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
