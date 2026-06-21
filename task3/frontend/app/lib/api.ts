import axios, { AxiosError } from "axios";
import type { Todo, TodoFilter } from "../types";

type TodoQuery = {
  date?: string;
  filter?: TodoFilter;
  search?: string;
};

type TodoCreatePayload = {
  text: string;
  date: string;
};

type TodoUpdatePayload = {
  text?: string;
  completed?: boolean;
  date?: string;
};

export class BackendRequestError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "BackendRequestError";
    this.status = status;
  }
}

export function normalizeTodoFilter(value: string | null | undefined): TodoFilter {
  if (value === "active" || value === "completed") {
    return value;
  }
  return "all";
}

function getBackendBaseUrl() {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    throw new BackendRequestError("frontend/.env.local에 BACKEND_URL을 설정해주세요.");
  }

  return backendUrl.replace(/\/$/, "");
}

function getErrorMessage(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return "알 수 없는 오류가 발생했습니다.";
  }

  const responseData = error.response?.data as
    | { detail?: string | { msg?: string }[]; message?: string }
    | undefined;

  if (typeof responseData?.detail === "string") {
    return responseData.detail;
  }

  if (Array.isArray(responseData?.detail)) {
    return responseData.detail.map((item) => item.msg).filter(Boolean).join(", ");
  }

  if (responseData?.message) {
    return responseData.message;
  }

  return error.message || "백엔드 요청에 실패했습니다.";
}

function toBackendRequestError(error: unknown): BackendRequestError {
  if (error instanceof BackendRequestError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return new BackendRequestError(getErrorMessage(error), axiosError.response?.status ?? 500);
  }

  if (error instanceof Error) {
    return new BackendRequestError(error.message);
  }

  return new BackendRequestError("알 수 없는 오류가 발생했습니다.");
}

function buildQueryParams(query: TodoQuery) {
  const params: Record<string, string> = {};

  if (query.date) {
    params.date = query.date;
  }

  if (query.filter && query.filter !== "all") {
    params.filter = query.filter;
  }

  if (query.search?.trim()) {
    params.search = query.search.trim();
  }

  return params;
}

export async function getTodos(query: TodoQuery = {}) {
  try {
    const response = await axios.get<Todo[]>(`${getBackendBaseUrl()}/todos`, {
      params: buildQueryParams(query),
    });
    return response.data;
  } catch (error) {
    throw toBackendRequestError(error);
  }
}

export async function getTodo(todoId: number) {
  try {
    const response = await axios.get<Todo>(`${getBackendBaseUrl()}/todos/${todoId}`);
    return response.data;
  } catch (error) {
    throw toBackendRequestError(error);
  }
}

export async function createBackendTodo(payload: TodoCreatePayload) {
  try {
    const response = await axios.post<Todo>(`${getBackendBaseUrl()}/todos`, payload);
    return response.data;
  } catch (error) {
    throw toBackendRequestError(error);
  }
}

export async function updateBackendTodo(todoId: number, payload: TodoUpdatePayload) {
  try {
    const response = await axios.put<Todo>(`${getBackendBaseUrl()}/todos/${todoId}`, payload);
    return response.data;
  } catch (error) {
    throw toBackendRequestError(error);
  }
}

export async function deleteBackendTodo(todoId: number) {
  try {
    await axios.delete(`${getBackendBaseUrl()}/todos/${todoId}`);
  } catch (error) {
    throw toBackendRequestError(error);
  }
}
