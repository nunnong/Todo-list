const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

// 목록 조회용 타입
export interface TodoListItem {
  id: number;
  name: string;
  isCompleted: boolean;
}

// 상세 조회용 타입
export interface TodoItem {
  id: number;
  tenantId: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

export interface CreateTodoRequest {
  name: string;
}

export interface UpdateTodoRequest {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

// 목록 조회
export async function getTodos(page = 1, pageSize = 100): Promise<TodoListItem[]> {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

// 상세 조회
export async function getTodo(itemId: number): Promise<TodoItem> {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`);
  if (!res.ok) throw new Error("Failed to fetch todo");
  return res.json();
}

// 생성
export async function createTodo(data: CreateTodoRequest): Promise<TodoItem> {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

// 수정
export async function updateTodo(itemId: number, data: UpdateTodoRequest): Promise<TodoItem> {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

// 삭제
export async function deleteTodo(itemId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
}

// 이미지 업로드
export async function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/${TENANT_ID}/images/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload image");
  return res.json();
}
