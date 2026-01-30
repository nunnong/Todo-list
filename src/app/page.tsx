"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ResponsiveGNB } from "@/components/ResponsiveGNB";
import { Search } from "@/components/Search";
import { Button } from "@/components/Button";
import { AddButton } from "@/components/AddButton";
import { TodoSection } from "@/components/TodoSection";
import { getTodos, createTodo, updateTodo, type TodoListItem } from "@/api/todoApi";
import TodoIcon from "@public/img/todo.svg";
import DoneIcon from "@public/img/done.svg";
import TodoLarge from "@public/img/todoLarge.svg";
import TodoSmall from "@public/img/todoSmall.svg";
import DoneLarge from "@public/img/doneLarge.svg";
import DoneSmall from "@public/img/doneSmall.svg";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<TodoListItem[]>([]);

  useEffect(() => {
    getTodos().then(setItems).catch(console.error);
  }, []);

  const todos = items.filter((item) => !item.isCompleted);
  const dones = items.filter((item) => item.isCompleted);

  const handleAdd = async () => {
    if (!search.trim()) return;
    try {
      await createTodo({ name: search.trim() });
      setSearch("");
      const updated = await getTodos();
      setItems(updated);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleToggle = async (id: number, currentStatus: boolean) => {
    try {
      await updateTodo(id, { isCompleted: !currentStatus });
      const updated = await getTodos();
      setItems(updated);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ResponsiveGNB />
      <main className="px-4 md:px-6 xl:px-[360px] pt-6">
        <div className="flex gap-4 items-center">
          <Search value={search} onChange={setSearch} onKeyDown={handleKeyDown} />
          <div className="hidden md:block">
            <Button type="add" size="large" state={search.trim() ? "active" : "default"} onClick={handleAdd} />
          </div>
          <div className="block md:hidden">
            <AddButton onClick={handleAdd} />
          </div>
        </div>

        <div className="mt-10 flex flex-col xl:flex-row gap-12 xl:gap-6">
          <TodoSection
            title={<TodoIcon className="w-[101px] h-9 mb-4" />}
            items={todos}
            emptyLargeIcon={TodoLarge}
            emptySmallIcon={TodoSmall}
            emptyMessage={<>할 일이 없어요.<br />TODO를 새롭게 추가해주세요!</>}
            onItemClick={(id) => router.push(`/items/${id}`)}
            onToggle={handleToggle}
          />
          <TodoSection
            title={<DoneIcon className="w-[97px] h-9 mb-4" />}
            items={dones}
            isCompleted
            emptyLargeIcon={DoneLarge}
            emptySmallIcon={DoneSmall}
            emptyMessage={<>아직 다 한 일이 없어요.<br />해야 할 일을 체크해보세요!</>}
            onItemClick={(id) => router.push(`/items/${id}`)}
            onToggle={handleToggle}
          />
        </div>
      </main>
    </div>
  );
}
