import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6 mesh-bg">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-extrabold gradient-text mb-4">404</h1>
        <h2 className="text-xl font-semibold text-white mb-3">
          Trang không tồn tại
        </h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di
          chuyển.
        </p>
        <Link
          href="/hub"
          className="btn-primary inline-flex px-8 py-3 rounded-xl text-sm font-semibold text-gray-950"
        >
          <span className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Về trang chủ
          </span>
        </Link>
      </div>
    </div>
  );
}
