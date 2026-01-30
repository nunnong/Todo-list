import PlusGrayIcon from "@public/icons/plus_gray.svg";

interface AddButtonProps {
  onClick?: (e: React.MouseEvent) => void;
}

export default function AddButton({ onClick }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer"
    >
      <PlusGrayIcon className="w-6 h-6" />
    </button>
  );
}
