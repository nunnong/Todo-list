import UncheckedIcon from "@public/icons/unchecked.svg";
import CheckedIcon from "@public/icons/checked.svg";

interface CheckListDetailProps {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  onTextChange?: (text: string) => void;
}

export default function CheckListDetail({ text, isActive = false, onClick, onTextChange }: CheckListDetailProps) {
  const Icon = isActive ? CheckedIcon : UncheckedIcon;
  const bgClass = isActive ? "bg-violet-100" : "bg-white";

  return (
    <div
      className={`w-full h-16 rounded-[24px] border-2 border-slate-900 flex items-center justify-center gap-2 ${bgClass}`}
    >
      <button onClick={onClick} className="cursor-pointer">
        <Icon className="w-8 h-8" />
      </button>
      <input
        type="text"
        value={text}
        onChange={(e) => onTextChange?.(e.target.value)}
        className="bg-transparent text-slate-900 font-bold text-[20px] underline outline-none text-center"
      />
    </div>
  );
}
