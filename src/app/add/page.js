import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AddRecipeClient from "./AddRecipeClient";

export const metadata = {
  title: "Publish Recipe — DishDash",
  description: "Share your culinary creation with the world by adding ingredients, instructions, and preparation times.",
};

export default async function AddPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return <AddRecipeClient user={session.user} />;
}
