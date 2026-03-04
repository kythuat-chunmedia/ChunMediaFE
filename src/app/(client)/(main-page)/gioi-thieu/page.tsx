export const dynamic = 'force-dynamic';

import Image from 'next/image';
import { Eye, Target, Trophy } from 'lucide-react';
import { awards, brandHistory } from '@/app/lib/mockData';
import { clientApi } from '@/app/lib/api';
import { MemberTeam } from '@/app/types';
import { PageHeader } from '@/app/components/shared/PageHeader';

export default async function AboutPage() {
  let memberTeams: MemberTeam[] = [];
  try {
    const data = await clientApi.getMemberTeamsPublic();
    memberTeams = data || [];
  } catch (error) {
    console.error('Failed to fetch member teams:', error);
  }

  return (
    <>
      <PageHeader
        badge="About Us"
        title="Giới Thiệu"
        description="Hành trình 10 năm xây dựng thương hiệu và tạo ra những giá trị bền vững"
      />

      {/* Brand History */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-linear-to-br from-[#0A9396] to-[#94D2BD] rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-['Be_Vietnam_Pro'] text-2xl font-bold tracking-[-0.02em] text-[#1A1A1A]">
              Lịch Sử Thương Hiệu
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brandHistory.map((item, index) => (
              <div key={index} className="group relative p-6 bg-white border border-[rgba(10,147,150,0.12)] rounded-2xl hover:border-[#0A9396] hover:shadow-[0_8px_32px_rgba(10,147,150,0.1)] transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-linear-to-r from-[#0A9396] to-[#94D2BD] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                <span className="font-['Be_Vietnam_Pro'] text-2xl font-extrabold tracking-[-0.04em] bg-linear-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">{item.year}</span>
                <h3 className="font-['Be_Vietnam_Pro'] font-700 text-[#1A1A1A] mt-2 mb-1">{item.title}</h3>
                <p className="font-['Nunito_Sans'] text-sm text-[#6C757D]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg,#F1F8F8,#E8F4F4)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-linear-to-br from-[#0A9396] to-[#94D2BD] rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-['Be_Vietnam_Pro'] text-2xl font-bold tracking-[-0.02em] text-[#1A1A1A]">Tầm Nhìn & Sứ Mệnh</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Tầm Nhìn', text: 'Trở thành agency truyền thông hàng đầu Việt Nam, được công nhận bởi sự sáng tạo, chuyên nghiệp và hiệu quả. Chúng tôi mong muốn đồng hành cùng các thương hiệu trong việc xây dựng và phát triển hình ảnh, tạo ra những giá trị bền vững.' },
              { title: 'Sứ Mệnh', text: 'Cung cấp các giải pháp truyền thông toàn diện, sáng tạo và hiệu quả. Chúng tôi cam kết mang lại giá trị thực sự cho khách hàng thông qua việc hiểu rõ nhu cầu, tư vấn chiến lược và triển khai chuyên nghiệp.' },
            ].map(({ title, text }) => (
              <div key={title} className="bg-white/80 backdrop-blur-sm border border-[rgba(10,147,150,0.12)] rounded-2xl p-8 shadow-[0_4px_20px_rgba(10,147,150,0.06)]">
                <h3 className="font-['Be_Vietnam_Pro'] text-lg font-bold text-[#1A1A1A] mb-4">{title}</h3>
                <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm leading-[1.85]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-linear-to-br from-[#0A9396] to-[#94D2BD] rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="font-['Be_Vietnam_Pro'] text-2xl font-bold tracking-[-0.02em] text-[#1A1A1A]">Đội Ngũ Nhân Sự</h2>
          </div>
          {memberTeams.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {memberTeams.map((member) => (
                <div key={member.id} className="group text-center">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 border border-[rgba(10,147,150,0.12)] shadow-[0_4px_20px_rgba(10,147,150,0.08)] group-hover:shadow-[0_8px_32px_rgba(10,147,150,0.15)] transition-all duration-300">
                    <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="font-['Be_Vietnam_Pro'] font-bold text-[#1A1A1A]">{member.name}</h3>
                  <p className="font-['Nunito_Sans'] text-sm text-[#0A9396] font-600 mt-1">{member.role}</p>
                  {member.description && <p className="font-['Nunito_Sans'] text-xs text-[#6C757D] mt-1 line-clamp-2">{member.description}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center font-['Nunito_Sans'] text-[#6C757D] py-10">Đang cập nhật thông tin đội ngũ...</p>
          )}
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg,#F1F8F8,#E8F4F4)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-linear-to-br from-[#0A9396] to-[#94D2BD] rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-['Be_Vietnam_Pro'] text-2xl font-bold tracking-[-0.02em] text-[#1A1A1A]">Giải Thưởng</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {awards.map((award, index) => (
              <div key={index} className="group flex items-center gap-5 bg-white/80 backdrop-blur-sm border border-[rgba(10,147,150,0.12)] rounded-2xl p-6 hover:border-[#0A9396] hover:shadow-[0_8px_32px_rgba(10,147,150,0.1)] transition-all duration-300">
                <div className="w-12 h-12 bg-linear-to-br from-[#0A9396] to-[#94D2BD] rounded-xl flex items-center justify-center shrink-0">
                  <span className="font-['Be_Vietnam_Pro'] text-white font-extrabold text-xs">{award.year}</span>
                </div>
                <div>
                  <h3 className="font-['Be_Vietnam_Pro'] font-bold text-[#1A1A1A] group-hover:text-[#0A9396] transition-colors">{award.title}</h3>
                  <p className="font-['Nunito_Sans'] text-sm text-[#6C757D] mt-0.5">{award.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}