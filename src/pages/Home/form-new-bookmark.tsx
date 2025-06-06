import { useEffect, useState } from "react";
import { redirect } from "react-router";
import { AlertTriangle, Heart, Loader2 } from "lucide-react";
import { handleNewBookmark } from "./actions";
import { getCategories, type CategoryResponse } from "@/api/category";

import { useFormState } from "@/hooks/use-form-state";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useI18n } from "@/hooks/use-i18n";

export function FormNewBookmark() {
  const { t } = useI18n();
  const [categories, setCategories] = useState<CategoryResponse[]>();
  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(handleNewBookmark);

  useEffect(() => {
    if (success) {
      redirect("/");
    }
  }, [success]);

  useEffect(() => {
    (async () => {
      const response = await getCategories();
      setCategories(response);
    })();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full mt-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Failed</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="title">{t("new-link.title")}</Label>
        <Input name="title" type="title" id="title" />
        {errors?.title && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.title[0]}
          </p>
        )}
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="space-y-1 w-[80%] ">
          <Label htmlFor="url">Url</Label>
          <Input name="url" type="url" id="url" />
          {errors?.url && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.url[0]}
            </p>
          )}
        </div>
        <div className="space-y-1 w-[20%] pl-6">
          <Label htmlFor="pinned">{t("new-link.pinned")}</Label>
          <Toggle className="mr-2" id="pinned" name="pinned">
            <Heart className="size-5" />
          </Toggle>
        </div>
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="space-y-1 w-[calc(50%-10px)] ">
          <Label htmlFor="category">{t("new-link.category")}</Label>
          <Select name="category">
            <SelectTrigger className="">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem value={category.id}>{category.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.url && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.url[0]}
            </p>
          )}
        </div>

        <div className="space-y-1 w-[50%]">
          <Label htmlFor="tags">Tags</Label>
          <Input name="tags" id="tags" />
          {errors?.tags && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.tags[0]}
            </p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="w-full pointer-events-auto cursor-pointer"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="size- animate-spin" />
        ) : (
          t("new-link.save")
        )}
      </Button>
    </form>
  );
}
