import { getCategories, type CategoryResponse } from "@/api/category";
import { useState, useEffect } from "react";

export const useCategory = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  return { categories };
};
