import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Briefcase } from 'lucide-react';
import { New } from '@/app/types';
import { formatDate } from '@/app/lib/utils';
import { toSlug } from '@/app/lib/helper';

interface NewsCardProps { news: New; categoryName: string; }

const BADGE_MAP: Record<number, string> = {
  1: 'bg-[rgba(10,147,150,0.1)] text-[#0A9396] border-[rgba(10,147,150,0.25)]',
  2: 'bg-blue-50 text-blue-700 border-blue-200',
  3: 'bg-yellow-50 text-yellow-700 border-yellow-200',
};

export function NewsCard({ news, categoryName }: NewsCardProps) {
  const badgeClass = BADGE_MAP[news.categoryNewId] ?? 'bg-gray-50 text-gray-600 border-gray-200';
  const href = `/tin-tuc/${toSlug(news.title)}`;

  return (
    <article className="group bg-white border border-[rgba(10,147,150,0.1)] rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(10,147,150,0.05)] hover:border-[rgba(10,147,150,0.3)] hover:shadow-[0_8px_32px_rgba(10,147,150,0.1)] transition-all duration-300 hover:-translate-y-0.5">
      <div className="relative aspect-video overflow-hidden">
        <Link href={href}>
          <Image
            src={`${news.image}` || '/placeholder-news.jpg'}
            alt={news.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {news.categoryNewId === 3 && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-500 text-white font-['Nunito_Sans'] text-[0.68rem] font-700 px-3 py-1 rounded-lg flex items-center gap-1">
              <Briefcase size={10} /> Tuyển Dụng
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <span className={`inline-block border font-['Nunito_Sans'] text-[0.68rem] font-700 px-3 py-1 rounded-lg mb-3 ${badgeClass}`}>
          {categoryName}
        </span>
        <h3 className="font-['Be_Vietnam_Pro'] font-bold text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#0A9396] transition-colors duration-200">
          {news.title}
        </h3>
        <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm mb-4 line-clamp-2 leading-relaxed">{news.description}</p>
        <div className="flex items-center gap-4 font-['Nunito_Sans'] text-xs text-[#95A5A6]">
          <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(news.createdAt)}</span>
          {news.author && <span className="flex items-center gap-1"><User size={12} />{news.author}</span>}
        </div>
      </div>
    </article>
  );
}