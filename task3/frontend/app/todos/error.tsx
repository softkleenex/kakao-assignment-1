"use client";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-light px-4">
      <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-lg">
        <p className="mb-2 text-sm font-bold text-red-500">Todo를 불러오지 못했습니다</p>
        <h1 className="mb-4 text-2xl font-extrabold text-text-primary">백엔드 서버를 확인해주세요</h1>
        <p className="mb-6 text-sm leading-6 text-text-secondary">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-primary px-5 py-3 font-bold text-white transition hover:bg-primary-hover"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
