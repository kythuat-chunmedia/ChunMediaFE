import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Briefcase } from 'lucide-react';
import { New } from '@/app/types';
import { formatDate } from '@/app/lib/utils';
import { toSlug } from '@/app/lib/helper';

interface NewsCardProps {
  news: New;
  categoryName: string;
}

export function NewsCard({ news, categoryName }: NewsCardProps) {
  const getCategoryBadgeClass = (categoryId: number) => {
    switch (categoryId) {
      case 1: return 'bg-teal-100 text-teal-800';
      case 2: return 'bg-blue-100 text-blue-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 card-hover">
      <div className="image-zoom relative aspect-video">
        <Link
          href={`/tin-tuc/${news.url}` ? `/tin-tuc/${toSlug(news.title)}` : '/tin-tuc/404'}
          className="transition-colors"
        >

          <Image
            src={`/news/${news.image}` || '/placeholder-news.jpg'}
            alt={news.title}
            fill
            className="object-cover"
          />
        </Link>
        {news.categoryNewId === 3 && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <Briefcase size={12} />
              Tuyển Dụng
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <span className={`badge ${getCategoryBadgeClass(news.categoryNewId)} mb-3`}>
          {categoryName}
        </span>

        <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2">
          {news.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {news.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(news.createdAt)}
          </span>
          {news.author && (
            <span className="flex items-center gap-1">
              <User size={14} />
              {news.author}
            </span>
          )}
        </div>

        {/* <Link
          href={`/tin-tuc/${news.url}` ? `/tin-tuc/${toSlug(news.title)}` : '/tin-tuc/404'}
          className="inline-flex items-center gap-2 text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors"
        >
          Đọc thêm
          <ArrowRight size={16} />
        </Link> */}
      </div>
    </article>
  );
}
