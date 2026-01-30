"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GNB } from "@/components/GNB";
import { Search } from "@/components/Search";
import { Button } from "@/components/Button";
import { AddButton } from "@/components/AddButton";
import { CheckList } from "@/components/CheckList";
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
      <div className="hidden xl:block">
        <GNB size="large" />
      </div>
      <div className="hidden md:block xl:hidden">
        <GNB size="medium" />
      </div>
      <div className="block md:hidden">
        <GNB size="small" />
      </div>
      <main className="px-4 md:px-6 xl:px-[360px] pt-6">
        {/* Search + Button */}
        <div className="flex gap-4 items-center">
          <Search value={search} onChange={setSearch} onKeyDown={handleKeyDown} />
          <div className="hidden md:block">
            <Button type="add" size="large" state={search.trim() ? "active" : "default"} onClick={handleAdd} />
          </div>
          <div className="block md:hidden">
            <AddButton onClick={handleAdd} />
          </div>
        </div>

        {/* TODO / DONE 섹션 */}
        <div className="mt-10 flex flex-col xl:flex-row gap-12 xl:gap-6">
          {/* TODO */}
          <section className="flex-1">
            <TodoIcon className="w-[101px] h-9 mb-4" />
            {todos.length > 0 ? (
              <div className="flex flex-col gap-4">
                {todos.map((todo) => (
                  <CheckList
                    key={todo.id}
                    text={todo.name}
                    onClick={() => router.push(`/items/${todo.id}`)}
                    onToggle={() => handleToggle(todo.id, todo.isCompleted)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center pt-16">
                <div className="hidden md:block">
                  <TodoLarge className="w-60 h-60" />
                </div>
                <div className="block md:hidden">
                  <TodoSmall className="w-30 h-30" />
                </div>
                <p className="mt-6 text-center text-slate-500">
                  할 일이 없어요.
                  <br />
                  TODO를 새롭게 추가해주세요!
                </p>
              </div>
            )}
          </section>

          {/* DONE */}
          <section className="flex-1">
            <DoneIcon className="w-[97px] h-9 mb-4" />
            {dones.length > 0 ? (
              <div className="flex flex-col gap-3.5">
                {dones.map((done) => (
                  <CheckList
                    key={done.id}
                    text={done.name}
                    isActive
                    onClick={() => router.push(`/items/${done.id}`)}
                    onToggle={() => handleToggle(done.id, done.isCompleted)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center pt-16">
                <div className="hidden md:block">
                  <DoneLarge className="w-[240px] h-[240px]" />
                </div>
                <div className="block md:hidden">
                  <DoneSmall className="w-[120px] h-[120px]" />
                </div>
                <p className="mt-6 text-center text-slate-500">
                  아직 다 한 일이 없어요.
                  <br />
                  해야 할 일을 체크해보세요!
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
