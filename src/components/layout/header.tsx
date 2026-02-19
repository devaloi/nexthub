import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="flex h-14 items-center px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span>NextHub</span>
        </Link>
        <nav className="ml-8 flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-gray-600 transition-colors hover:text-gray-900"
          >
            Dashboard
          </Link>
          <Link
            href="/projects"
            className="text-gray-600 transition-colors hover:text-gray-900"
          >
            Projects
          </Link>
          <Link
            href="/labels"
            className="text-gray-600 transition-colors hover:text-gray-900"
          >
            Labels
          </Link>
          <Link
            href="/search"
            className="text-gray-600 transition-colors hover:text-gray-900"
          >
            Search
          </Link>
        </nav>
      </div>
    </header>
  );
}
