import { NextResponse } from "next/server";
import {
  BackendRequestError,
  deleteBackendTodo,
  getTodo,
  updateBackendTodo,
} from "../../../lib/api";

type RouteParams = {
  params: Promise<{ todoId: string }>;
};

function jsonError(error: unknown) {
  const status = error instanceof BackendRequestError ? error.status : 500;
  const message = error instanceof Error ? error.message : "요청 처리 중 오류가 발생했습니다.";
  return NextResponse.json({ message }, { status });
}

async function parseTodoId({ params }: RouteParams) {
  const todoId = Number((await params).todoId);

  if (!Number.isInteger(todoId)) {
    throw new BackendRequestError("Todo ID가 올바르지 않습니다.", 400);
  }

  return todoId;
}

export async function GET(_request: Request, context: RouteParams) {
  try {
    const todo = await getTodo(await parseTodoId(context));
    return NextResponse.json(todo);
  } catch (error) {
    return jsonError(error);
  }
}

export async function PUT(request: Request, context: RouteParams) {
  try {
    const payload = await request.json();
    const todo = await updateBackendTodo(await parseTodoId(context), payload);
    return NextResponse.json(todo);
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(_request: Request, context: RouteParams) {
  try {
    await deleteBackendTodo(await parseTodoId(context));
    return new Response(null, { status: 204 });
  } catch (error) {
    return jsonError(error);
  }
}
