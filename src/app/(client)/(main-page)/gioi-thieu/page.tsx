export const dynamic = 'force-dynamic';

import Image from 'next/image';
import { Eye, Target, Trophy } from 'lucide-react';
import { awards, brandHistory } from '@/app/lib/mockData';
import { clientApi } from '@/app/lib/api';
import { MemberTeam } from '@/app/types';


export const metadata = {
  title: 'Giới Thiệu | Communication Agency',
  description: 'Hành trình 10 năm xây dựng thương hiệu và tạo ra những giá trị bền vững.',
};

export default async function AboutPage() {
  // Fetch real member team data
  let memberTeams: MemberTeam[] = [];

  try {
    const data = await clientApi.getMemberTeamsPublic();
    memberTeams = data || [];
  } catch (error) {
    console.error('Failed to fetch member teams:', error);
  }

  return (
    <>
      {/* Page Header */}
      <section className="page-header-gradient text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Giới Thiệu</h1>
          <p className="text-teal-100 max-w-2xl mx-auto">
            Hành trình 10 năm xây dựng thương hiệu và tạo ra những giá trị bền vững
          </p>
        </div>
      </section>

      {/* Brand History Timeline */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Lịch Sử Thương Hiệu
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brandHistory.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-teal-500 rounded-full mt-2 shrink-0"></div>
                  <div>
                    <span className="text-2xl font-bold text-teal-600">{item.year}</span>
                    <h3 className="font-semibold text-gray-900 mt-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Tầm Nhìn
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tầm Nhìn</h3>
              <p className="text-gray-600 leading-relaxed">
                Trở thành agency truyền thông hàng đầu Việt Nam, được công nhận bởi sự sáng tạo, 
                chuyên nghiệp và hiệu quả. Chúng tôi mong muốn đồng hành cùng các thương hiệu 
                trong việc xây dựng và phát triển hình ảnh, tạo ra những giá trị bền vững.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sứ Mệnh</h3>
              <p className="text-gray-600 leading-relaxed">
                Cung cấp các giải pháp truyền thông toàn diện, sáng tạo và hiệu quả. 
                Chúng tôi cam kết mang lại giá trị thực sự cho khách hàng thông qua việc 
                hiểu rõ nhu cầu, tư vấn chiến lược và triển khai chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Đội Ngũ Nhân Sự
            </h2>
          </div>

          {memberTeams.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {memberTeams.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{member.role}</p>
                  {member.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {member.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              Đang cập nhật thông tin đội ngũ...
            </p>
          )}
        </div>
      </section>

      {/* Awards Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Giải Thưởng
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">{award.year}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{award.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{award.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}