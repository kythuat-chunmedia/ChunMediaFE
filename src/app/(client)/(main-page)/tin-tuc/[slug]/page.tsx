export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { clientApi } from '@/app/lib/api';
import { formatDate } from '@/app/(client)/lib/api';
import { New, CategoryNew } from '@/app/types';

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  
  try {
    const news = await clientApi.getNewsDetail(slug); // Cần tạo API này
    
    if (!news) {
      return {
        title: 'Bài viết không tìm thấy',
      };
    }

    return {
      title: `${news.title} | Communication Agency`,
      description: news.description,
    };
  } catch {
    return {
      title: 'Bài viết không tìm thấy',
    };
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  
  let news: New | null = null;
  let categories: CategoryNew[] = [];

  try {
    // Fetch song song news detail và categories
    const [newsData, categoryData] = await Promise.all([
      clientApi.getNewsDetail(slug),           // Lấy chi tiết news theo slug
      clientApi.getCategoryNewsForNewPage(),   // Lấy danh sách categories
    ]);

    news = newsData;
    categories = categoryData || [];
  } catch (error) {
    console.error('Failed to fetch news detail:', error);
  }

  if (!news) {
    notFound();
  }

  const category = categories.find((c) => c.id === news.categoryNewId);

  const getCategoryBadgeClass = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        return 'bg-teal-100 text-teal-800';
      case 2:
        return 'bg-blue-100 text-blue-800';
      case 3:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header-gradient text-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 text-teal-100 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Quay lại Tin Tức
          </Link>

          <span className={`badge ${getCategoryBadgeClass(news.categoryNewId)} mb-4`}>
            {category?.name || 'Chưa phân loại'}
          </span>
          
          <h1 className="text-2xl lg:text-3xl font-bold mb-4 max-w-4xl">
            {news.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-teal-100">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {formatDate(news.createdAt)}
            </span>
            <span className="flex items-center gap-2">
              <User size={16} />
              {news.author}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-full">
            {/* Featured Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-10">
              <Image
                src={`/news/${news.image}` || '/placeholder-news.jpg'}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Content */}
            <article className="prose-content">
              <div dangerouslySetInnerHTML={{ __html: news.content || '' }} />
            </article>

            {/* Share & Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 text-sm">Chia sẻ:</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(`/tin-tuc/${news.url}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                      </svg>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`/tin-tuc/${news.url}`)}&text=${encodeURIComponent(news.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
                      </svg>
                    </a>
                    <a
                      href={`https://linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`/tin-tuc/${news.url}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`badge ${getCategoryBadgeClass(news.categoryNewId)}`}>
                    {category?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/tin-tuc"
            className="btn-primary"
          >
            Xem Thêm Bài Viết Khác
          </Link>
        </div>
      </section>
    </>
  );
}