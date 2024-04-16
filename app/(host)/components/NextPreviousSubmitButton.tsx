import { Button } from "@/components/ui/button";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface NextPreviousSubmitButtonProps {
  page: number;
  setPage: (currPage: any) => void;
}

const NextPreviousSubmitButton: React.FC<NextPreviousSubmitButtonProps> = ({
  page,
  setPage,
}) => {
  return (
    <div className={`flex w-full items-center justify-between bg-slate-50`}>
      <Button
        className="text-md h-12 w-28 rounded-lg bg-brandprimary font-bold text-white hover:bg-brandprimary"
        onClick={() => {
          if (page !== 0) {
            setPage((currPage: any) => currPage - 1);
          }
        }}
      >
        <div className="flex items-center gap-1 pr-2">
          <FaAngleLeft />
          Previous
        </div>
      </Button>
      <Button
        className="text-md h-12 w-28 rounded-lg bg-brandprimary font-bold text-white hover:bg-brandprimary"
        onClick={() => {
          if (page !== 2) {
            setPage((currPage: any) => currPage + 1);
          }
        }}
      >
        <div className="flex items-center gap-1 pl-2">
          Next <FaAngleRight />
        </div>
      </Button>
    </div>
  );
};

export default NextPreviousSubmitButton;
