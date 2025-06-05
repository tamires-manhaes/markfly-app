import { useParams } from "react-router";

export function CategoryPage() {
  const params = useParams<{ categoryId: string }>();
  console.log(params);
  return (
    <div>
      <span>bookmarks form category: {params.categoryId}</span>
    </div>
  );
}
