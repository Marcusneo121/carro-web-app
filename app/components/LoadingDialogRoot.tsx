"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function LoadingDialogRoot() {
  //   const searchParams = useSearchParams();
  //   const pathname = usePathname();
  //   const router = useRouter();
  //   const isOpen = searchParams.has("loading");

  //   const onOpenChange = (isOpen: boolean) => {
  //     const pathName = isOpen ? `${pathname}?loading` : pathname;
  //     router.push(pathName);
  //   };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="flex max-w-24 items-center justify-center rounded-2xl">
        <AiOutlineLoading3Quarters className="animate-spin text-[50px] text-brandprimary" />
      </AlertDialogContent>
    </AlertDialog>
  );
}
