import { NextRequest, NextResponse } from "next/server";
import {
  BackendRequestError,
  createBackendTodo,
  getTodos,
  normalizeTodoFilter,
} from "../../lib/api";

export const dynamic = "force-dynamic";

function jsonError(error: unknown) {
  const status = error instanceof BackendRequestError ? error.status : 500;
  const message = error instanceof Error ? error.message : "요청 처리 중 오류가 발생했습니다.";
  return NextResponse.json({ message }, { status });
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  try {
    const todos = await getTodos({
      date: searchParams.get("date") ?? undefined,
      filter: normalizeTodoFilter(searchParams.get("filter")),
      search: searchParams.get("search") ?? undefined,
    });
    return NextResponse.json(todos);
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const todo = await createBackendTodo(payload);
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
