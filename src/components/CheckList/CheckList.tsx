import UncheckedIcon from "@public/icons/unchecked.svg";
import CheckedIcon from "@public/icons/checked.svg";

interface CheckListProps {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  onToggle?: () => void;
}

export default function CheckList({ text, isActive = false, onClick, onToggle }: CheckListProps) {
  const Icon = isActive ? CheckedIcon : UncheckedIcon;
  const bgClass = isActive ? "bg-violet-100" : "bg-white";
  const textClass = isActive ? "line-through" : "";

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle?.();
  };

  return (
    <button
      onClick={onClick}
      className={`w-full h-[50px] rounded-[27px] border-2 border-slate-900 flex items-center pl-4 gap-4 cursor-pointer ${bgClass}`}
    >
      <span onClick={handleIconClick} className="cursor-pointer">
        <Icon className="w-8 h-8" />
      </span>
      <span className={`text-slate-800 font-normal text-base ${textClass}`}>{text}</span>
    </button>
  );
}
