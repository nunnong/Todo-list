import PlusIcon from "@public/icons/plus.svg";
import CloseIcon from "@public/icons/close.svg";
import CheckIcon from "@public/icons/check.svg";
import type { ButtonProps } from "./Button.types";

const ICONS = {
  add: PlusIcon,
  delete: CloseIcon,
  edit: CheckIcon,
};

const LABELS = {
  add: "추가하기",
  delete: "삭제하기",
  edit: "수정 완료",
};

const COLORS = {
  add: { default: "bg-slate-200 text-slate-900", active: "bg-violet-600 text-white" },
  delete: { default: "bg-rose-500 text-white" },
  edit: { default: "bg-slate-200 text-slate-900", active: "bg-lime-300 text-slate-900" },
} as const;

export default function Button({ type, size = "large", state = "default", onClick }: ButtonProps) {
  const Icon = ICONS[type];
  const isLarge = size === "large";
  const colorClass = COLORS[type][type === "delete" ? "default" : state];
  const shadowOffset = isLarge ? "translate-x-[3.65px]" : "translate-x-[1.22px]";

  return (
    <div className={`relative ${isLarge ? "w-[168px]" : "w-[56px]"} h-[56px]`}>
      {/* 그림자 */}
      <div className={`absolute inset-0 bg-slate-900 rounded-[24px] border-2 border-slate-900 ${shadowOffset} translate-y-[4px]`} />
      {/* 버튼 */}
      <button
        onClick={onClick}
        className={`relative w-full h-full flex items-center justify-center gap-1 rounded-[24px] border-2 border-slate-900 font-bold cursor-pointer ${colorClass}`}
      >
        <Icon className="w-4 h-4" />
        {isLarge && <span>{LABELS[type]}</span>}
      </button>
    </div>
  );
}
