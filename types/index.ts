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



