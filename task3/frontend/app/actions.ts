"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBackendTodo, updateBackendTodo } from "./lib/api";
import { parseDateParam } from "./lib/date";
import { buildTodosHref, isSafeTodosPath } from "./lib/url";
import type { TodoFilter } from "./types";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getFormFilter(formData: FormData): TodoFilter {
  const value = getFormString(formData, "filter");
  if (value === "active" || value === "completed") {
    return value;
  }
  return "all";
}

function getListHref(formData: FormData, date: string) {
  const returnTo = getFormString(formData, "returnTo");

  if (returnTo && isSafeTodosPath(returnTo)) {
    return returnTo;
  }

  return buildTodosHref({
    date,
    weekStartDate: getFormString(formData, "weekStart") || date,
    filter: getFormFilter(formData),
    search: getFormString(formData, "search"),
  });
}

export async function createTodo(formData: FormData) {
  const text = getFormString(formData, "text").trim();
  const date = parseDateParam(getFormString(formData, "date"));

  if (!text) {
    const params = new URLSearchParams();
    params.set("date", date);
    params.set("weekStart", getFormString(formData, "weekStart") || date);
    params.set("error", "할 일을 입력해주세요.");
    redirect(`/todos/new?${params.toString()}`);
  }

  await createBackendTodo({ text, date });
  revalidatePath("/todos");
  redirect(getListHref(formData, date));
}

export async function updateTodo(formData: FormData) {
  const todoId = Number(getFormString(formData, "todoId"));
  const text = getFormString(formData, "text").trim();
  const date = parseDateParam(getFormString(formData, "date"));

  if (!Number.isInteger(todoId)) {
    throw new Error("수정할 Todo ID가 올바르지 않습니다.");
  }

  if (!text) {
    const params = new URLSearchParams();
    params.set("date", date);
    params.set("weekStart", getFormString(formData, "weekStart") || date);
    params.set("error", "할 일 내용은 비어 있을 수 없습니다.");
    redirect(`/todos/${todoId}?${params.toString()}`);
  }

  await updateBackendTodo(todoId, { text, date });
  revalidatePath("/todos");
  redirect(getListHref(formData, date));
}
