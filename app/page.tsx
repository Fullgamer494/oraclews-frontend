"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { NewsCard } from "@/components/NewsCard";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  url: string;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        let endpoint = `${apiUrl}/api/news/top?category=${selectedCategory}`;

        if (searchQuery) {
          endpoint = `${apiUrl}/api/news/search?q=${encodeURIComponent(searchQuery)}`;
        }

        const res = await fetch(endpoint);

        if (!res.ok) {
          throw new Error("No se pudo obtener las noticias del servidor backend.");
        }

        const data = await res.json();
        setNews(data);
      } catch (err: any) {
        setError(err.message || "Error al cargar las noticias.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

  }, [selectedCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSearchQuery("");
    setSelectedCategory(category);
  };

  const categoryTitles: Record<string, string> = {
    technology: "Tecnología",
    business: "Negocios",
    sports: "Deportes",
    entertainment: "Entretenimiento",
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12">
      <Header
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
            {searchQuery
              ? `Resultados para: "${searchQuery}"`
              : selectedCategory === "general"
                ? "Noticias top del momento"
                : `Noticias de ${categoryTitles[selectedCategory] || selectedCategory}`
            }
          </h1>
          <p className="text-gray-500" suppressHydrationWarning>
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {loading && (
          <div className="py-20 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-4 text-gray-500 font-medium">Buscando en la base de datos...</p>
          </div>
        )}

        {error && !loading && (
          <div className="py-12 px-6 text-center max-w-lg mx-auto bg-red-50 border-2 border-red-300">
            <h3 className="text-red-800 font-bold mb-2 uppercase">Ops, ocurrió un problema</h3>
            <p className="text-red-600">{error}</p>
            <p className="text-sm mt-4 text-red-500">Asegúrate de que el servidor <code>oraclews-backend</code> esté ejecutándose (npm run dev) en el puerto 3001.</p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {news.map((article) => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="py-20 text-center bg-white border-2 border-gray-300 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-2 uppercase">No hay resultados</h3>
            <p className="text-gray-500">
              No se encontraron artículos {searchQuery ? `para "${searchQuery}"` : "para esta categoría"}.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
