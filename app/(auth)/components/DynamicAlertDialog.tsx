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
import { PiWarningCircle } from "react-icons/pi";

export function DynamicAlertDialog({
  open,
  setOpen,
  message,
  title,
}: DynamicAlertDialogProps) {
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogContent className="rounded-3xl max-md:w-[300px]">
        <div className="gap flex flex-col items-center">
          <div className="text-2xl font-bold">{title}</div>
          <div className="my-10 flex flex-col items-center text-center">
            <PiWarningCircle className="text-[100px] text-red-500" />
            <p className="mx-2 mt-6 text-lg font-medium">{message}</p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">OK</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
