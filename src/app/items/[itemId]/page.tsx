"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { GNB } from "@/components/GNB";
import { CheckListDetail } from "@/components/CheckListDetail";
import { AddButton } from "@/components/AddButton";
import { EditButton } from "@/components/EditButton";
import { Button } from "@/components/Button";
import {
  getTodo,
  updateTodo,
  deleteTodo,
  uploadImage,
  type TodoItem,
} from "@/api/todoApi";
import ImgIcon from "@public/icons/img.svg";
import MemoImg from "@public/img/memo.svg";

export default function ItemDetailPage() {
  const router = useRouter();
  const params = useParams();
  const itemId = Number(params.itemId);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 이름 영어만 허용
    const englishOnly = /^[a-zA-Z0-9._-]+$/;
    if (!englishOnly.test(file.name)) {
      alert("이미지 파일 이름은 영어로만 이루어져야 합니다.");
      return;
    }

    // 5MB 이하
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

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

      // 이미지 파일이 새로 선택됐으면 업로드
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
      {/* GNB - 반응형 */}
      <div className="hidden xl:block">
        <GNB size="large" />
      </div>
      <div className="hidden md:block xl:hidden">
        <GNB size="medium" />
      </div>
      <div className="block md:hidden">
        <GNB size="small" />
      </div>

      {/* 메인 컨텐츠 */}
      <main className="px-4 md:px-6 xl:px-[360px] pt-6">
        {/* CheckListDetail */}
        <CheckListDetail
          text={name}
          isActive={isCompleted}
          onClick={() => setIsCompleted(!isCompleted)}
          onTextChange={setName}
        />

        {/* 이미지 + Memo 영역 */}
        <div className="mt-6 flex flex-col xl:flex-row gap-6">
          {/* 이미지 영역 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {imageUrl ? (
            <div className="relative w-full xl:w-[384px] h-[311px] rounded-[24px] overflow-hidden">
              <img
                src={imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4">
                <EditButton onClick={handleImageClick} />
              </div>
            </div>
          ) : (
            <div
              className="relative w-full xl:w-[384px] h-[311px] bg-slate-50 border-2 border-dashed border-slate-300 rounded-[24px] flex items-center justify-center cursor-pointer"
              onClick={handleImageClick}
            >
              <ImgIcon className="w-16 h-16" />
              <div className="absolute bottom-4 right-4">
                <AddButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick();
                  }}
                />
              </div>
            </div>
          )}

          {/* Memo 영역 */}
          <div className="flex-1 relative h-[311px]">
            <MemoImg className="absolute inset-0 w-full h-full rounded-[24px]" />
            <div className="relative h-full flex flex-col p-6 overflow-hidden">
              <p className="text-amber-800 font-extrabold text-base text-center">
                Memo
              </p>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="메모를 입력하세요"
                className="mt-4 flex-1 w-full bg-transparent text-slate-800 font-normal text-base resize-none outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
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
