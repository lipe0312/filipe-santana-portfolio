"use client";

export default function BlobBackground() {
  return (
    <div aria-hidden="true" className="blob-bg" style={{ position: "fixed" }}>
      <div className="absolute w-[800px] h-[800px] rounded-full bg-soft-slate opacity-80 blur-[180px] animate-blob-slow top-[-15%] left-[-10%]" />
      <div className="absolute w-[700px] h-[700px] rounded-full bg-soft-slate opacity-70 blur-[160px] animate-blob-mid top-[-5%] right-[-15%]" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-alabaster opacity-60 blur-[140px] animate-blob-fast bottom-[10%] left-[25%]" />
    </div>
  );
}
