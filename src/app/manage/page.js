import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ManageClient from "./ManageClient";

export const metadata = {
  title: "Manage Recipes — DishDash",
  description: "View, update, or delete recipes that you have created on DishDash.",
};

export default async function ManagePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return <ManageClient user={session.user} />;
}
