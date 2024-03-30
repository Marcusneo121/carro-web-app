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
import { DialogAuthProps } from "@/types";

export function LoadingDialog({ open, setOpen }: DialogAuthProps) {
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogContent className="flex max-w-24 items-center justify-center rounded-2xl">
        <AiOutlineLoading3Quarters className="animate-spin text-[50px] text-brandprimary" />
      </AlertDialogContent>
    </AlertDialog>
  );
}
