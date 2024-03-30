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
import { Button } from "@/components/ui/button";
import { DynamicAlertDialogProps } from "@/types";
import { IoCheckmarkOutline } from "react-icons/io5";
import Link from "next/link";

export function DynamicDialogMessages({
  open,
  setOpen,
  message,
  title,
}: DynamicAlertDialogProps) {
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogContent className="rounded-3xl max-md:w-[300px]">
        <div className="gap flex flex-col items-center">
          <div className="text-center text-2xl font-bold">{title}</div>
          <div className="my-10 flex flex-col items-center text-center">
            <div className="my-2 animate-pulse rounded-full border-8 border-green-500 p-3">
              <IoCheckmarkOutline className="text-[90px] text-green-500" />
            </div>
            <p className="mx-2 mt-6 text-center text-lg font-medium">
              {message}
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <Button
            asChild
            variant="link"
            className="h-12 w-full rounded-lg bg-brandprimary"
          >
            <Link
              href="/login"
              onClick={() => {
                setOpen(false);
              }}
              className="font-bold text-white"
            >
              GO TO LOGIN
            </Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
