import { HowToInstrutionItemProps } from "@/types";
import React from "react";

const HowToInstructionItem = ({
  number,
  title,
  description,
}: HowToInstrutionItemProps) => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-[1px] bg-transparent font-medium">
        {number}
      </div>
      <div className="flex flex-col gap-1 pt-1">
        <p className="text-xl font-extrabold leading-none max-md:w-[220px]">
          {title}
        </p>
        <p className="text-sm leading-none max-md:w-[220px]">{description}</p>
      </div>
    </div>
  );
};

export default HowToInstructionItem;
