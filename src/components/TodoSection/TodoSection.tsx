import { CheckList } from "@/components/CheckList";
import { EmptyState } from "@/components/EmptyState";
import type { TodoListItem } from "@/api/todoApi";

interface TodoSectionProps {
  title: React.ReactNode;
  items: TodoListItem[];
  isCompleted?: boolean;
  emptyLargeIcon: React.ComponentType<{ className?: string }>;
  emptySmallIcon: React.ComponentType<{ className?: string }>;
  emptyMessage: React.ReactNode;
  onItemClick: (id: number) => void;
  onToggle: (id: number, isCompleted: boolean) => void;
}

export default function TodoSection({
  title,
  items,
  isCompleted = false,
  emptyLargeIcon,
  emptySmallIcon,
  emptyMessage,
  onItemClick,
  onToggle,
}: TodoSectionProps) {
  return (
    <section className="flex-1">
      {title}
      {items.length > 0 ? (
        <div className={`flex flex-col ${isCompleted ? "gap-3.5" : "gap-4"}`}>
          {items.map((item) => (
            <CheckList
              key={item.id}
              text={item.name}
              isActive={isCompleted}
              onClick={() => onItemClick(item.id)}
              onToggle={() => onToggle(item.id, item.isCompleted)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          LargeIcon={emptyLargeIcon}
          SmallIcon={emptySmallIcon}
          message={emptyMessage}
        />
      )}
    </section>
  );
}
