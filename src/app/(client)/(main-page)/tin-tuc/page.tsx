import { clientApi } from '@/app/lib/api';
import { NewsContainer } from '../../components/tin-tuc/NewsContainer';
import { New, CategoryNew, PaginatedResponse } from '@/app/types';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  const pageNumber = Number(params.page) || 1;
  const categoryId = params.category ? Number(params.category) : undefined;
  const searchTerm = params.search || undefined;

  // Fetch initial data
  let newsResponse: PaginatedResponse<New> | null = null;
  let categories: CategoryNew[] = [];

  try {
    const [newsData, categoryData] = await Promise.all([
      clientApi.getNewsForNewPage({
        pageNumber,
        pageSize: 9,
        categoryId,
        searchTerm,
      }),
      clientApi.getCategoryNewsForNewPage(),
    ]);

    newsResponse = newsData;
    categories = categoryData || [];
  } catch (error) {
    console.error('Failed to fetch news:', error);
  }


  return (
    <>
      {/* Page Header */}
      <section className="page-header-gradient text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Tin Tức</h1>
          <p className="text-teal-100 max-w-2xl mx-auto">
            Cập nhật tin tức, blog chuyên môn và cơ hội tuyển dụng
          </p>
        </div>
      </section>

      {/* News Container - Client Component */}
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