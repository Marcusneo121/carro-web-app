import { loginServerActions } from "@/app/actions";
import { LoadingDialogRoot } from "@/app/components/LoadingDialogRoot";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function TestingForm() {
  const router = useRouter();

  async function loginInServer(form: FormData) {
    router.push("/?show=true");
    const result = await loginServerActions({
      username: form.get("username")?.toString(),
      password: form.get("password")?.toString(),
    });

    router.push("/cars");
    if (result?.status === "error") {
      toast.error(result.message ?? "Something went wrong");
    } else if (result?.status === "ok") {
      toast.success(result.message ?? "Login Success");
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <form action={loginInServer} className="flex flex-col gap-4">
      <input
        type="text"
        className="rounded-full border-2 p-4"
        placeholder="username"
        name="username"
      />
      <input
        type="text"
        className="rounded-full border-2 p-4"
        placeholder="password"
        name="password"
      />
      <Button type="submit" className="h-12 rounded-2xl">
        Submit
      </Button>
    </form>
  );
}
