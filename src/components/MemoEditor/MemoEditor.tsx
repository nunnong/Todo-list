import MemoImg from "@public/img/memo.svg";

interface MemoEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MemoEditor({ value, onChange }: MemoEditorProps) {
  return (
    <div className="flex-1 relative h-[311px]">
      <MemoImg className="absolute inset-0 w-full h-full rounded-[24px]" />
      <div className="relative h-full flex flex-col p-6 overflow-hidden">
        <p className="text-amber-800 font-extrabold text-base text-center">Memo</p>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="메모를 입력하세요"
          className="mt-4 flex-1 w-full bg-transparent text-slate-800 font-normal text-base resize-none outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}
