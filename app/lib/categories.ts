import axios from "axios";

const BASE_URL = "https://ymtaz.sa/api/client/";

export async function getCategories() {
  const categories = await axios.get(`${BASE_URL}digital-guide/categories`);

  return categories.data;
}

export async function getCategoryNameById(id: number) {
  const categories = await getCategories();
  return categories.data.categories.find((c: any) => c.id === id);
}