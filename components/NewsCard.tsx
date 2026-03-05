import { Clock, ExternalLink } from "lucide-react";

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  url: string;
}

export function NewsCard({
  title,
  description,
  imageUrl,
  source,
  publishedAt,
  url,
}: NewsCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Desconocido";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Hace menos de una hora";
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    if (diffInHours < 48) return "Hace 1 día";
    return `Hace ${Math.floor(diffInHours / 24)} días`;
  };

  return (
    <div className="group overflow-hidden border-2 border-gray-300 bg-white hover:border-blue-500 hover:shadow-none transition-none flex flex-col">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 shrink-0 border-b-2 border-gray-300">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
            Sin imagen
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span className="text-blue-600">{source}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatDate(publishedAt)}</span>
          </div>
        </div>
        <h3 className="mb-2 text-lg font-bold leading-tight line-clamp-2 text-gray-900">{title}</h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-3 flex-1">
          {description || "No hay descripción disponible para esta noticia."}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline mt-auto w-fit"
        >
          Leer artículo
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
