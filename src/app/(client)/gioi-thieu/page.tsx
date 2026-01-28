import Image from 'next/image';
import { Metadata } from 'next';
import { Eye, Target, Award, Users } from 'lucide-react';
import { teamMembers, timeline, awards } from '@/config/site.config';

export const metadata: Metadata = {
  title: 'Giới Thiệu',
  description: 'Hành trình 10 năm xây dựng thương hiệu và tạo ra những giá trị bền vững',
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-header-title">Giới Thiệu</h1>
          <p className="page-header-subtitle">
            Hành trình 10 năm xây dựng thương hiệu và tạo ra những giá trị bền vững
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold">Lịch Sử Thương Hiệu</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-primary-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500" />
                <span className="text-2xl font-bold text-primary-600">{item.year}</span>
                <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold">Tầm Nhìn</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Tầm Nhìn</h3>
              <p className="text-gray-600 leading-relaxed">
                Trở thành agency truyền thông hàng đầu Việt Nam, được công nhận bởi sự sáng tạo, chuyên nghiệp và hiệu quả. Chúng tôi mong muốn đồng hành cùng các thương hiệu trong việc xây dựng và phát triển hình ảnh, tạo ra những giá trị bền vững.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Sứ Mệnh</h3>
              <p className="text-gray-600 leading-relaxed">
                Cung cấp các giải pháp truyền thông toàn diện, sáng tạo và hiệu quả. Chúng tôi cam kết mang lại giá trị thực sự cho khách hàng thông qua việc hiểu rõ nhu cầu, tư vấn chiến lược và triển khai chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold">Đội Ngũ Nhân Sự</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <Award className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold">Giải Thưởng</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awards.map((award, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{award.year}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{award.title}</h3>
                  <p className="text-gray-600 text-sm">{award.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
