"use client";

export default function ErrorComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-4 xl:px-0 text-center">
        <div className="text-red-600 text-2xl font-semibold">
          Error occurred. Please try again.
        </div>
      </div>
    </div>
  );
}
