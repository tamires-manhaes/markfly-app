import { api } from ".";

interface Category {
  id: string;
  name: string;
}

export interface CategoryResponse extends Category {
  userId: string;
}

export async function getCategories(): Promise<CategoryResponse[]> {
  const result = await api.get("category").json<CategoryResponse[]>();

  return result.sort((a, b) => a.name.localeCompare(b.name));
}

export async function createCategory(
  name: string,
  userId: string
): Promise<CategoryResponse> {
  return await api
    .post("category", {
      json: { name, userId },
    })
    .json<CategoryResponse>();
}

export async function deleteCategory(id: string): Promise<void> {
  return await api.delete(`category/${id}`).json();
}
