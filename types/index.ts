import { ICarDetail, IMyBooking } from "./api_index";

export interface HowToInstrutionItemProps {
  number: string;
  title: string;
  description: string;
}

export interface MainDivProps {
  children: React.ReactNode;
  className: string;
}

export interface DialogAuthProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface DynamicAlertDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
  title: string;
}

export interface DatePickerProps {
  date: Date | undefined;
  setDate: (day: Date | undefined) => void;
}

export interface RegisterDataUIProps {
  status: string;
  message: string;
}

export interface YellowAuthButtonUIProps {
  title: string;
}


export interface InputAttributesUIProps {
  name: string;
}


export interface BookingDialogProps {
  car: ICarDetail;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface PendingPaymentStatusBadgeProps {
  booking: IMyBooking;
}



