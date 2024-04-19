import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { CgClose } from "react-icons/cg";

interface HostCarBackDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const HostCarConfirmationBackDialog = ({
  open,
  setOpen,
}: HostCarBackDialogProps) => {
  const resetAllFieldAndError = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="rounded-[20px] max-sm:w-[350px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="flex items-start">
          <div
            className="flex w-full justify-end"
            onClick={resetAllFieldAndError}
          >
            <CgClose />
          </div>
          <DialogTitle className="text-lg font-bold sm:text-xl">
            Back to previous
          </DialogTitle>
          <DialogDescription className="text-left max-sm:text-xs">
            Previous selected car images will need to reselect after return to
            previous page.
          </DialogDescription>
        </DialogHeader>
        <div>
          <h1>Are you sure to go back to previous page?</h1>
        </div>
        <DialogFooter>
          <Button
            //   onClick={() => {
            //     handleSubmit(onSubmit);
            //   }}
            type="submit"
            className="w-full bg-brandprimary font-extrabold"
          >
            Submit Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HostCarConfirmationBackDialog;
