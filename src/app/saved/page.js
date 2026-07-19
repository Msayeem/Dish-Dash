import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SavedRecipesClient from "./SavedRecipesClient";

export const metadata = {
  title: "Saved Recipes — DishDash",
  description: "View and manage your curated collection of favorite recipes.",
};

export default async function SavedPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return <SavedRecipesClient userId={session.user.id} />;
}
