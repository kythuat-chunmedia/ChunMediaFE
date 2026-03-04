export const dynamic = 'force-dynamic';

import { clientApi } from '@/app/lib/api';
import { NewsContainer } from '@/app/components/client/tin-tuc/NewsContainer';
import { New, CategoryNew, PaginatedResponse } from '@/app/types';
import { PageHeader } from '@/app/components/shared/PageHeader';

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string; search?: string; }>;
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const pageNumber = Number(params.page) || 1;
  const categoryId = params.category ? Number(params.category) : undefined;
  const searchTerm = params.search || undefined;

  let newsResponse: PaginatedResponse<New> | null = null;
  let categories: CategoryNew[] = [];

  try {
    const [newsData, categoryData] = await Promise.all([
      clientApi.getNewsForNewPage({ pageNumber, pageSize: 9, categoryId, searchTerm }),
      clientApi.getCategoryNewsForNewPage(),
    ]);
    newsResponse = newsData;
    categories = categoryData || [];
  } catch (error) {
    console.error('Failed to fetch news:', error);
  }

  return (
    <>
      <PageHeader
        badge="Blog & News"
        title="Tin Tức"
        description="Cập nhật tin tức, blog chuyên môn và cơ hội tuyển dụng"
      />
      <NewsContainer
        initialNews={newsResponse?.items || []}
        initialPagination={newsResponse?.pagination || null}
        categories={categories}
        initialCategoryId={categoryId}
        initialSearchTerm={searchTerm}
      />
    </>
  );
}