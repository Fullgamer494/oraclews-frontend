import { useState } from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSearch: (query: string) => void;
}

export function Header({ selectedCategory, onCategoryChange, onSearch }: HeaderProps) {
  const [searchInput, setSearchInput] = useState('');

  const categories = [
    { id: "general", label: "Inicio" },
    { id: "technology", label: "Tecnología" },
    { id: "business", label: "Negocios" },
    { id: "sports", label: "Deportes" },
    { id: "entertainment", label: "Entretenimiento" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const clearSearch = (categoryId: string) => {
    setSearchInput('');
    onCategoryChange(categoryId);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center bg-blue-600">
              <span className="font-bold text-white">O</span>
            </div>
            <span className="font-bold text-blue-600 text-xl hidden sm:block">Oraclews</span>
          </div>

          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar noticias globales..."
              className="w-full pl-4 pr-10 py-2 border-2 border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-600">
              <Search className="h-5 w-5" />
            </button>
          </form>

          <nav className="hidden md:flex items-center gap-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => clearSearch(category.id)}
                className={`px-4 py-2 font-bold ${selectedCategory === category.id && !searchInput
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                  }`}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex md:hidden w-full relative pb-2 pt-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar noticias..."
            className="w-full pl-4 pr-10 py-2 text-sm border-2 border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="absolute right-3 top-4 text-gray-400">
            <Search className="h-4 w-4" />
          </button>
        </form>

        <div className="flex md:hidden gap-2 overflow-x-auto pb-3 pt-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => clearSearch(category.id)}
              className={`px-4 py-2 whitespace-nowrap font-bold text-sm ${selectedCategory === category.id && !searchInput
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
