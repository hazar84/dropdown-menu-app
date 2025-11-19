export type Position = 
  | 'bottom-right' 
  | 'top-right' 
  | 'bottom-left' 
  | 'top-left';

export interface DropdownMenuItem {
  id: string;
  label: string;
  onClick: () => void;
  icon?: string;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  className?: string;
}