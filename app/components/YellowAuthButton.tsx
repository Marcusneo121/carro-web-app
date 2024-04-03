"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { LoadingDialog } from "../(auth)/components/LoadingDialog";
import { YellowAuthButtonUIProps } from "@/types";

const YellowAuthButton = ({ title }: YellowAuthButtonUIProps) => {
  const { pending } = useFormStatus();
  const [openSpinner, setOpenSpinner] = useState<boolean>(false);

  useEffect(() => {
    if (pending === true) {
      console.log("come in true");
      setOpenSpinner(true);
    } else {
      setOpenSpinner(false);
    }
  }, [pending]);

  return (
    <div className="w-full">
      <Button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-full bg-specialyellow font-bold tracking-wider text-black hover:bg-specialyellowhover hover:font-extrabold"
      >
        {title}
        {/* {pending ? (
          <div>
            LOGGING IN<span className="animated-pulse">....</span>
          </div>
        ) : (
          "LOGIN"
        )} */}
      </Button>
      <LoadingDialog open={openSpinner} setOpen={setOpenSpinner} />
    </div>
  );
};

export default YellowAuthButton;
