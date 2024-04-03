import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import Image from "next/image";
import { ILoginJWTData, ILogoutProps } from "@/types/api_index";
import { Separator } from "./ui/separator";
import { DynamicAlertDialog } from "@/app/(auth)/components/DynamicAlertDialog";
import { logoutUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { LoadingDialog } from "@/app/(auth)/components/LoadingDialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const LoginButton = () => {
  const router = useRouter();
  const getTokenCookies = Cookies.get("JWT_TOKEN");
  const getLoginDataCookies = Cookies.get("USER_LOGIN_DATA");
  const [profileImageURL, setProfileImageURL] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  const [openDynamicDialog, setOpenDynamicDialog] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [dialogTitle, setDialogTitle] = useState<string>("");

  const [openSpinner, setOpenSpinner] = useState<boolean>(false);

  const dynamicDialogSetter = (
    dialogTitle: string,
    dialogMessage: string,
    openDialog: boolean,
  ) => {
    setDialogMessage(dialogMessage);
    setDialogTitle(dialogTitle);
    setOpenDynamicDialog(openDialog);
  };

  useEffect(() => {
    if (getLoginDataCookies !== undefined) {
      const parsedUserData: ILoginJWTData = JSON.parse(getLoginDataCookies);

      if (
        parsedUserData.data?.profile.profile_image !== "-" &&
        parsedUserData.data?.profile.profile_image !== null
      ) {
        console.log("is not null");
        console.log(parsedUserData.data?.profile.profile_image);
        setProfileImageURL(parsedUserData.data?.profile.profile_image);
      } else {
        console.log("is null");
        setProfileImageURL("-");
        if (
          parsedUserData.data.profile.first_name !== "-" &&
          parsedUserData.data.profile.first_name !== null
        ) {
          setFirstName(parsedUserData.data.profile.first_name);
          setLastName(parsedUserData.data.profile.last_name);
        } else {
          setFirstName("-");
          setLastName("-");
        }
      }
    }
  }, []);

  async function logout() {
    try {
      setOpenSpinner(true);
      const logoutProcess: ILogoutProps = await logoutUser(
        getTokenCookies || "-",
      );

      if (logoutProcess.revoked === true) {
        setOpenSpinner(false);
        router.push("/");
      } else {
        setOpenSpinner(false);
        dynamicDialogSetter(
          "Error",
          "Something went wrong. Please try again",
          true,
        );
      }
    } catch (error) {
      setOpenSpinner(false);
      dynamicDialogSetter(
        "Error",
        "Something went wrong. Please try again",
        true,
      );
    }
  }

  return (
    <div>
      {getLoginDataCookies === undefined && getTokenCookies === undefined ? (
        <Button
          asChild
          variant="outline"
          className="rounded-full border-2 bg-transparent px-10 py-6 text-lg font-bold text-white hover:text-brandprimary"
        >
          <Link href="/login-new">LOGIN</Link>
        </Button>
      ) : (
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row">
          <Link href="/cars">
            <h3
              className="relative inline cursor-pointer text-lg font-bold text-white before:absolute before:-bottom-1 before:block before:h-[2px] 
before:w-full before:origin-bottom-right before:scale-x-0 before:bg-white 
before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
            >
              BROWSE CAR
            </h3>
          </Link>
          {/* Desktop view */}
          <div className="max-lg:hidden">
            <Popover>
              <PopoverTrigger asChild>
                {profileImageURL === "-" ? (
                  <h2 className="cursor-pointer rounded-full bg-white p-4 text-lg font-bold text-black hover:bg-indigo-500 hover:text-white">
                    {firstName?.slice(0, 1)}
                    {lastName?.slice(0, 1)}
                  </h2>
                ) : (
                  <div className="relative h-[60px] w-[60px]">
                    <Image
                      alt="user profile image"
                      // width={55}
                      // height={55}
                      fill={true}
                      objectFit="cover"
                      style={{ objectFit: "cover" }}
                      src={profileImageURL ?? "/icons/profile.jpg"}
                      className="rounded-full"
                    />
                  </div>
                )}
              </PopoverTrigger>
              <PopoverContent className="mr-10 mt-2 rounded-2xl border-0 shadow-2xl">
                <div className="m-4 flex flex-col items-center justify-center gap-4">
                  <Link href="/">
                    <h3
                      className="relative inline cursor-pointer text-base font-medium text-gray-800 before:absolute before:-bottom-1 before:block before:h-[2px] 
            before:w-full before:origin-bottom-right before:scale-x-0 before:bg-gray-800
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                    >
                      VIEW PROFILE
                    </h3>
                  </Link>
                  <Separator className="w-40 bg-gray-300" />
                  <h3
                    className="relative inline cursor-pointer text-base font-bold tracking-wider text-red-500 before:absolute before:-bottom-1 before:block before:h-[2px] 
            before:w-full before:origin-bottom-right before:scale-x-0 before:bg-red-500
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                    onClick={logout}
                  >
                    LOGOUT
                  </h3>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Mobile view */}
          <div className="flex flex-col items-center lg:hidden">
            <Separator orientation="horizontal" className="mb-8 w-20" />
            <div className="max-w-[60px]">
              {profileImageURL === "-" ? (
                <h2 className="cursor-pointer rounded-full bg-white p-4 text-lg font-bold text-black hover:bg-indigo-500 hover:text-white">
                  {firstName?.slice(0, 1)}
                  {lastName?.slice(0, 1)}
                </h2>
              ) : (
                <div className="relative h-[60px] w-[60px]">
                  <Image
                    alt="user profile image"
                    // width={55}
                    // height={55}
                    fill={true}
                    objectFit="cover"
                    style={{ objectFit: "cover" }}
                    src={profileImageURL ?? "/icons/profile.jpg"}
                    className="rounded-full"
                  />
                </div>
              )}
            </div>

            {/* Login function */}
            <div className="mt-6 flex flex-col items-center justify-center gap-4">
              <Link href="/">
                <h3
                  className="relative inline cursor-pointer text-base font-medium text-gray-300 before:absolute before:-bottom-1 before:block before:h-[2px] 
            before:w-full before:origin-bottom-right before:scale-x-0 before:bg-gray-300
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                >
                  VIEW PROFILE
                </h3>
              </Link>

              <h3
                className="relative inline cursor-pointer text-base font-bold tracking-wider text-red-300 before:absolute before:-bottom-1 before:block before:h-[2px] 
            before:w-full before:origin-bottom-right before:scale-x-0 before:bg-red-300
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                onClick={logout}
              >
                LOGOUT
              </h3>

              <LoadingDialog open={openSpinner} setOpen={setOpenSpinner} />
              <DynamicAlertDialog
                open={openDynamicDialog}
                setOpen={setOpenDynamicDialog}
                message={dialogMessage}
                title={dialogTitle}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
