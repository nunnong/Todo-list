interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function Search({ value, onChange, onKeyDown, placeholder = "할 일을 입력해주세요" }: SearchProps) {
  return (
    <div className="relative flex-1 h-[56px]">
      {/* 그림자 */}
      <div className="absolute inset-0 bg-slate-900 rounded-[24px] border-2 border-slate-900 translate-x-1 translate-y-1" />
      {/* 입력창 */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="relative w-full h-full px-6 bg-slate-100 rounded-[24px] border-2 border-slate-900 text-slate-900 placeholder:text-slate-500 font-normal text-base outline-none overflow-hidden text-ellipsis"
      />
    </div>
  );
}
