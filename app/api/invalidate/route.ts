import { revalidatePath } from "next/cache";

export function POST() {
  revalidatePath('/posts');
} 