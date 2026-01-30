"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ResponsiveGNB } from "@/components/ResponsiveGNB";
import { GNB } from "@/components/GNB";
import { CheckListDetail } from "@/components/CheckListDetail";
import { Button } from "@/components/Button";
import { ImageUploader } from "@/components/ImageUploader";
import { MemoEditor } from "@/components/MemoEditor";
import { getTodo, updateTodo, deleteTodo, uploadImage, type TodoItem } from "@/api/todoApi";

export default function ItemDetailPage() {
  const router = useRouter();
  const params = useParams();
  const itemId = Number(params.itemId);

  const [item, setItem] = useState<TodoItem | null>(null);
  const [name, setName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [memo, setMemo] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodo(itemId)
      .then((data) => {
        setItem(data);
        setName(data.name);
        setIsCompleted(data.isCompleted);
        setMemo(data.memo || "");
        setImageUrl(data.imageUrl || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [itemId]);

  const handleImageChange = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        const result = await uploadImage(imageFile);
        finalImageUrl = result.url;
      }

      await updateTodo(itemId, {
        name,
        isCompleted,
        memo: memo || undefined,
        imageUrl: finalImageUrl || undefined,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(itemId);
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("삭제에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <GNB size="large" />
        <main className="px-4 md:px-6 xl:px-[360px] pt-6">
          <p className="text-slate-500">로딩 중...</p>
        </main>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50">
        <GNB size="large" />
        <main className="px-4 md:px-6 xl:px-[360px] pt-6">
          <p className="text-slate-500">할 일을 찾을 수 없습니다.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ResponsiveGNB />
      <main className="px-4 md:px-6 xl:px-[360px] pt-6">
        <CheckListDetail
          text={name}
          isActive={isCompleted}
          onClick={() => setIsCompleted(!isCompleted)}
          onTextChange={setName}
        />

        <div className="mt-6 flex flex-col xl:flex-row gap-6">
          <ImageUploader imageUrl={imageUrl} onImageChange={handleImageChange} />
          <MemoEditor value={memo} onChange={setMemo} />
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <Button
            type="edit"
            size="large"
            state={isCompleted ? "active" : "default"}
            onClick={handleSave}
          />
          <Button type="delete" size="large" onClick={handleDelete} />
        </div>
      </main>
    </div>
  );
}
