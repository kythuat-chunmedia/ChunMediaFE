// // app/(client)/tin-tuc/components/NewsContent.tsx
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Calendar, User, ArrowRight, Briefcase, Loader2 } from 'lucide-react';
// import { formatDate } from '@/app/(client)/lib/api';
// import { clientApi } from '@/app/lib/api';
// import { New, CategoryNew, PaginatedResponse } from '@/app/types';
// import { Pagination } from '@/app/(client)/components/Pagination';

// interface NewsContentProps {
//   initialNews: New[];
//   initialPagination: PaginatedResponse<New>['pagination'];
//   categoryNews: CategoryNew[];
// }

// const PAGE_SIZE = 12;

// export function NewsContent({ 
//   initialNews, 
//   initialPagination, 
//   categoryNews 
// }: NewsContentProps) {
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [news, setNews] = useState<New[]>(initialNews);
//   const [pagination, setPagination] = useState(initialPagination);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch news khi page hoặc category thay đổi
//   const fetchNews = useCallback(async (page: number, categoryId: number | null) => {
//     setIsLoading(true);
//     try {
//       const response = await clientApi.getNewsPaginate(page, PAGE_SIZE, categoryId);
//       setNews(response.items);
//       setPagination(response.pagination);
//     } catch (error) {
//       console.error('Failed to fetch news:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // Effect: Fetch khi page hoặc category thay đổi
//   useEffect(() => {
//     // Skip initial render nếu đang ở page 1 và không có category filter
//     if (currentPage === 1 && selectedCategory === null) {
//       return;
//     }
//     fetchNews(currentPage, selectedCategory);
//   }, [currentPage, selectedCategory, fetchNews]);

//   // Handle đổi category
//   const handleCategoryChange = (categoryId: number | null) => {
//     setSelectedCategory(categoryId);
//     setCurrentPage(1); // Reset về trang 1
    
//     // Fetch ngay khi đổi category
//     fetchNews(1, categoryId);
//   };

//   // Handle đổi trang
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     // Scroll to top of news section
//     window.scrollTo({ top: 300, behavior: 'smooth' });
//   };

//   const getCategoryName = (categoryId: number) => {
//     const category = categoryNews.find((c) => c.id === categoryId);
//     return category?.name || 'Chưa phân loại';
//   };

//   const getCategoryBadgeClass = (categoryId: number) => {
//     switch (categoryId) {
//       case 1:
//         return 'bg-teal-100 text-teal-800';
//       case 2:
//         return 'bg-blue-100 text-blue-800';
//       case 3:
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <>
//       {/* Category Filter */}
//       <section className="py-6 bg-white border-b">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => handleCategoryChange(null)}
//               disabled={isLoading}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
//                 ${selectedCategory === null
//                   ? 'bg-teal-600 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }
//                 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
//               `}
//             >
//               Tất cả
//             </button>
//             {categoryNews.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => handleCategoryChange(category.id)}
//                 disabled={isLoading}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
//                   ${selectedCategory === category.id
//                     ? 'bg-teal-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }
//                   ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
//                 `}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* News Grid */}
//       <section className="section-padding bg-white">
//         <div className="container mx-auto px-4">
//           {/* Results Info */}
//           <div className="mb-6 flex items-center justify-between">
//             <p className="text-sm text-gray-500">
//               Hiển thị {news.length} / {pagination.totalItems} bài viết
//             </p>
//             {isLoading && (
//               <div className="flex items-center gap-2 text-sm text-teal-600">
//                 <Loader2 size={16} className="animate-spin" />
//                 Đang tải...
//               </div>
//             )}
//           </div>

//           {/* Loading Overlay */}
//           <div className={`relative ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {news.map((item) => (
//                 <article
//                   key={item.id}
//                   className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 card-hover"
//                 >
//                   {/* Image */}
//                   <div className="image-zoom relative aspect-16/10">
//                     {(() => {
//                       const imageSrc =
//                         item.image && item.image.startsWith('http')
//                           ? item.image
//                           : '/images/default-news.jpg';

//                       return (
//                         <Image
//                           src={imageSrc}
//                           alt={item.title}
//                           fill
//                           className="object-cover"
//                         />
//                       );
//                     })()}
//                     {item.categoryNewId === 3 && (
//                       <div className="absolute top-4 right-4">
//                         <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                           <Briefcase size={12} />
//                           Tuyển Dụng
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Content */}
//                   <div className="p-6">
//                     <span className={`badge ${getCategoryBadgeClass(item.categoryNewId)} mb-3`}>
//                       {getCategoryName(item.categoryNewId)}
//                     </span>

//                     <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2">
//                       {item.title}
//                     </h3>

//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       {item.description}
//                     </p>

//                     <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
//                       <span className="flex items-center gap-1">
//                         <Calendar size={14} />
//                         {formatDate(item.createdAt)}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <User size={14} />
//                         {item.author}
//                       </span>
//                     </div>

//                     <Link
//                       href={`/tin-tuc/${item.url}`}
//                       className="inline-flex items-center gap-2 text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors"
//                     >
//                       Đọc thêm
//                       <ArrowRight size={16} />
//                     </Link>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </div>

//           {/* Empty State */}
//           {news.length === 0 && !isLoading && (
//             <div className="text-center py-16">
//               <p className="text-gray-500">Không có bài viết trong danh mục này</p>
//             </div>
//           )}

//           {/* Pagination */}
//           <Pagination
//             currentPage={pagination.currentPage}
//             totalPages={pagination.totalPages}
//             onPageChange={handlePageChange}
//             isLoading={isLoading}
//           />
//         </div>
//       </section>

//       {/* Career CTA */}
//       <section className="page-header-gradient text-white py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-2xl lg:text-3xl font-bold mb-4">
//             Đang Tìm Kiếm Cơ Hội Nghề Nghiệp?
//           </h2>
//           <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
//             Tham gia đội ngũ của chúng tôi và phát triển sự nghiệp trong ngành truyền thông
//           </p>
//           <button
//             onClick={() => handleCategoryChange(3)}
//             disabled={isLoading}
//             className="bg-white text-teal-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
//           >
//             Xem Vị Trí Tuyển Dụng
//           </button>
//         </div>
//       </section>
//     </>
//   );
// }