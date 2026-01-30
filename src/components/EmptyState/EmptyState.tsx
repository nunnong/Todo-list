interface EmptyStateProps {
  LargeIcon: React.ComponentType<{ className?: string }>;
  SmallIcon: React.ComponentType<{ className?: string }>;
  message: React.ReactNode;
}

export default function EmptyState({ LargeIcon, SmallIcon, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center pt-16">
      <div className="hidden md:block">
        <LargeIcon className="w-60 h-60" />
      </div>
      <div className="block md:hidden">
        <SmallIcon className="w-30 h-30" />
      </div>
      <p className="mt-6 text-center text-slate-500">{message}</p>
    </div>
  );
}
