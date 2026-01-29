import EditIcon from "@public/icons/edit.svg";

interface EditButtonProps {
  onClick?: () => void;
}

export default function EditButton({ onClick }: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-16 h-16 rounded-full bg-slate-900/50 border-2 border-slate-900 flex items-center justify-center cursor-pointer"
    >
      <EditIcon className="w-6 h-6" />
    </button>
  );
}
