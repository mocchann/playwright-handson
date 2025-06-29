import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">
          Playwright Practice
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-600 hover:text-indigo-600 pb-1 border-b-2 border-transparent hover:border-indigo-500 transition-all">
                Home
              </Link>
            </li>
            <li>
              <Link href="/form" className="text-gray-600 hover:text-indigo-600 pb-1 border-b-2 border-transparent hover:border-indigo-500 transition-all">
                Form
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;