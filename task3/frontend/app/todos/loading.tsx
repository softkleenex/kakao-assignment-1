export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-light px-4 py-10">
      <div className="mx-auto flex w-full max-w-[680px] flex-col gap-5">
        <div className="h-20 animate-pulse rounded-3xl bg-white/80" />
        <div className="h-44 animate-pulse rounded-2xl bg-white/80" />
        <div className="h-96 animate-pulse rounded-3xl bg-white/80" />
      </div>
    </div>
  );
}
