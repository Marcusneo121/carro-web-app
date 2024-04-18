import { Button } from "@/components/ui/button";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface NextPreviousSubmitButtonProps {
  page: number;
  setPage: (currPage: any) => void;
  onSubmitAction?: () => void;
  onPreviousAction?: () => boolean;
  onNextAction?: () => boolean;
  onNextCustom?: () => void;
  onPreviousCustom?: () => void;
}

const NextPreviousSubmitButton: React.FC<NextPreviousSubmitButtonProps> = ({
  page,
  setPage,
  onSubmitAction,
  onPreviousAction,
  onNextAction,
  onNextCustom,
  onPreviousCustom,
}) => {
  const previousButtonAction = () => {
    if (onPreviousAction !== undefined) {
      const navigatePrevious: boolean = onPreviousAction();
      if (navigatePrevious === true) {
        if (page !== 0) {
          setPage((currPage: any) => currPage - 1);
        }
      }
    }
    // if (page !== 0) {
    //   setPage((currPage: any) => currPage - 1);
    // }
  };

  const nextButtonAction = () => {
    // if (onNextAction !== undefined) {
    //   const navigateNext: boolean = onNextAction();
    //   if (navigateNext === true) {
    //     if (page !== 3) {
    //       setPage((currPage: any) => currPage + 1);
    //     }
    //   }
    // }
    // if (page !== 3) {
    //   setPage((currPage: any) => currPage + 1);
    // }
  };

  switch (page) {
    case 0: {
      return (
        <div className={`flex w-full items-center justify-end`}>
          <Button
            type="submit"
            className="text-md h-12 w-28 rounded-lg bg-brandprimary font-bold text-white hover:bg-brandprimary"
            // onClick={() => nextButtonAction()}
          >
            <div className="flex items-center gap-1 pl-2">
              Next <FaAngleRight />
            </div>
          </Button>
        </div>
      );
    }
    case 3: {
      return (
        <div className={`flex w-full items-center justify-between`}>
          <Button
            className="text-md h-12 w-28 rounded-lg bg-brandprimary font-bold text-white hover:bg-brandprimary"
            onClick={() => previousButtonAction()}
          >
            <div className="flex items-center gap-1 pr-2">
              <FaAngleLeft />
              Previous
            </div>
          </Button>
          <Button
            type="submit"
            className="text-md h-12 w-28 rounded-lg bg-brandprimary font-bold text-white hover:bg-brandprimary"
            // onClick={() => {
            //   if (onSubmitAction !== undefined) {
            //     onSubmitAction();
            //   }
            // }}
          >
            Submit
          </Button>
        </div>
      );
    }
    default: {
      return (
        <div className={`flex w-full items-center justify-between`}>
          <Button
            // type="submit"
            className="text-md h-12 w-28 rounded-lg bg-brandprimary font-bold text-white hover:bg-brandprimary"
            onClick={() => {
              if (onPreviousCustom != undefined) {
                onPreviousCustom();
              }
              previousButtonAction();
            }}
          >
            <div className="flex items-center gap-1 pr-2">
              <FaAngleLeft />
              Previous
            </div>
          </Button>
          <Button
            type="submit"
            className="text-md h-12 w-28 rounded-lg bg-brandprimary font-bold text-white hover:bg-brandprimary"
            // onClick={() => nextButtonAction()}
            onClick={() => {
              if (onNextCustom != undefined) {
                onNextCustom();
              }
            }}
          >
            <div className="flex items-center gap-1 pl-2">
              Next <FaAngleRight />
            </div>
          </Button>
        </div>
      );
    }
  }
};

export default NextPreviousSubmitButton;
