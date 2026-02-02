'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Portfolio } from '@/app/types'
import { ArrowRight } from 'lucide-react';

export function OutstandingPortfolio({ portfolios }: { portfolios: Portfolio[] }) {
  return (
    <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Dự Án Tiêu Biểu
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những dự án thành công của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm card-hover"
              >
                <div className="image-zoom relative aspect-4/3">
                  <Image
                    src={portfolio.thumbnailUrl}
                    alt={portfolio.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="badge badge-teal">
                      {portfolio.industry === 'Fashion' ? 'Marketing' : 
                       portfolio.industry === 'Technology' ? 'Sự Kiện' : 'Video'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {portfolio.title.split(' - ')[0]}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {portfolio.shortDescription}
                  </p>
                  <Link
                    href={`/portfolio/${portfolio.slug}`}
                    className="inline-flex items-center gap-2 text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors"
                  >
                    Xem chi tiết
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="btn-primary"
            >
              Xem Tất Cả Dự Án
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
  )
}