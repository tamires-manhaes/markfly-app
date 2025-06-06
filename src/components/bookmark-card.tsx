import { Heart, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import imgFallback from "@/assets/fallback.png";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Toggle } from "./ui/toggle";
import { Button } from "./ui/button";

interface BookmarkCardProps {
  id: string;
  title: string;
  url: string;
  tags?: string[];
  pinned: boolean;
  category: string;
  onPin: (id: string, pinned: boolean) => void;
  onDelete: (id: string) => void;
  imgPreview?: string;
}

export function BookmarkCard({
  id,
  title,
  tags,
  url,
  imgPreview,
  category,
  pinned,
  onPin,
  onDelete,
}: BookmarkCardProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger className="relative min-h-[240px] cursor-pointer bg-slate-200 dark:bg-slate-400 rounded-lg shadow-sm  row-span-1 w-full hover:scale-105 transition-all">
          <div
            className="h-full flex flex-col justify-between items-center"
            id={id}
          >
            <img
              className="rounded-t-md w-full h-fit max-h-[160px] min-h-[160px] object-fill"
              src={imgPreview || imgFallback}
              alt={`${title} preview`}
            />

            <div className="p-2 flex justify-center items-center flex-col mb-2 m-auto">
              <h3 className="font-semibold text-md mb-1 dark:text-slate-700 text-slate-800">
                {title}
              </h3>
              {category && <Badge>{category}</Badge>}
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              <div className="flex flex-wrap flex-col justify-start items-start">
                <div className="w-full">
                  <img
                    className="rounded-t-md w-full h-fit max-h-[320px]  object-fill"
                    src={imgPreview || imgFallback}
                    alt={`${title} preview`}
                  />
                  <div className="mt-3 flex justify-between items-center">
                    <div>
                      <Badge>{category}</Badge>
                    </div>
                    <div>
                      {tags &&
                        tags?.map((tag) => (
                          <Badge variant="secondary" key={tag}>
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
                <span>{pinned}</span>

                <div className=" mt-4 w-full flex justify-between items-center">
                  <div className="flex justify-center items-center ">
                    <Toggle className="mr-2" onClick={() => onPin(id, !pinned)}>
                      <Heart
                        className={`${
                          pinned ? "text-red-500" : "text-slate-700"
                        }`}
                      />
                    </Toggle>
                    <Button
                      variant="ghost"
                      className="delete-button"
                      onClick={() => onDelete(id)}
                    >
                      <Trash2 className="text-slate-700" />
                    </Button>
                  </div>
                  <div>
                    <a href={url} target="_blank" className="flex ">
                      <SquareArrowOutUpRight className="size-4 mr-1 text-slate-700" />
                      <span className="text-slate-700">Abrir link</span>
                    </a>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
