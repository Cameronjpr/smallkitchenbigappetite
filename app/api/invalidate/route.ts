import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export function POST() {
  revalidatePath('/');
  revalidatePath('/recipes');
  revalidatePath('/posts');

  return NextResponse.json({
    ok: true,
  })
} 