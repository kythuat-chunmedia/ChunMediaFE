'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { clientApi } from '@/app/lib/api';
import { ConfigSite, ContactFormData } from '@/app/types';
import { useAntiSpam } from '@/app/hooks/useAntiSpam';
import { PageHeader } from '@/app/components/shared/PageHeader';

interface ContactContentProps { config: ConfigSite | null; }

const inputClass = "w-full px-4 py-3 bg-white border border-[rgba(10,147,150,0.2)] rounded-xl font-['Nunito_Sans'] text-sm text-[#1A1A1A] placeholder-[#95A5A6] focus:outline-none focus:border-[#0A9396] focus:ring-2 focus:ring-[rgba(10,147,150,0.15)] transition-all duration-200";
const labelClass = "block font-['Be_Vietnam_Pro'] text-sm font-600 text-[#2C3E50] mb-2";

export default function ContactContent({ config }: ContactContentProps) {
  const { getAntiSpamData, resetTimestamp } = useAntiSpam();
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); setSubmitStatus('idle'); setErrorMessage('');
    try {
      const antiSpam = await getAntiSpamData();
      await clientApi.insertContact({ ...formData, ...antiSpam });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      resetTimestamp();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error?.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader badge="Get In Touch" title="Liên Hệ" description="Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất" />

      {/* Contact Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Info */}
          <div>
            <h2 className="font-['Be_Vietnam_Pro'] text-xl font-bold tracking-[-0.02em] text-[#1A1A1A] mb-8">Thông Tin Liên Hệ</h2>
            <div className="space-y-5">
              {config?.place && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-linear-to-br from-[#0A9396] to-[#94D2BD] rounded-xl flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-white" /></div>
                  <div><p className="font-['Be_Vietnam_Pro'] font-600 text-[#1A1A1A] text-sm mb-0.5">Địa Chỉ</p><p className="font-['Nunito_Sans'] text-[#6C757D] text-sm">{config.place}</p></div>
                </div>
              )}
              {config?.hotline && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-linear-to-br from-[#0A9396] to-[#94D2BD] rounded-xl flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-white" /></div>
                  <div><p className="font-['Be_Vietnam_Pro'] font-600 text-[#1A1A1A] text-sm mb-0.5">Điện Thoại</p><a href={`tel:${config.hotline}`} className="font-['Nunito_Sans'] text-[#0A9396] text-sm hover:underline">{config.hotline}</a></div>
                </div>
              )}
              {config?.email && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-linear-to-br from-[#0A9396] to-[#94D2BD] rounded-xl flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-white" /></div>
                  <div><p className="font-['Be_Vietnam_Pro'] font-600 text-[#1A1A1A] text-sm mb-0.5">Email</p><a href={`mailto:${config.email}`} className="font-['Nunito_Sans'] text-[#0A9396] text-sm hover:underline">{config.email}</a></div>
                </div>
              )}
            </div>

            {/* Hours */}
            <div className="mt-8 p-6 bg-[rgba(10,147,150,0.04)] border border-[rgba(10,147,150,0.15)] rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-4 h-4 text-[#0A9396]" />
                <h3 className="font-['Be_Vietnam_Pro'] font-700 text-sm text-[#1A1A1A]">Giờ Làm Việc</h3>
              </div>
              <div className="space-y-1.5 font-['Nunito_Sans'] text-sm text-[#6C757D]">
                <p>Thứ 2 – Thứ 6: 8:00 – 18:00</p>
                <p>Thứ 7: 8:00 – 12:00</p>
                <p>Chủ Nhật: Nghỉ</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-['Be_Vietnam_Pro'] text-xl font-bold tracking-[-0.02em] text-[#1A1A1A] mb-8">Gửi Tin Nhắn</h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.3)] rounded-xl font-['Nunito_Sans'] text-sm text-[#0A9396]">
                ✓ Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl font-['Nunito_Sans'] text-sm text-red-600">
                {errorMessage}
              </div>
            )}

            <div onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <div aria-hidden="true" style={{ position:'absolute', left:'-9999px', opacity:0, height:0, overflow:'hidden' }}>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label className={labelClass}>Họ và Tên <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Nhập họ và tên" className={inputClass} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Số Điện Thoại</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="0123 456 789" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Chủ đề</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Chủ đề liên hệ" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Tin Nhắn <span className="text-red-500">*</span></label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Nhập tin nhắn..." className={`${inputClass} resize-none`} />
              </div>

              <button
                onClick={handleSubmit as any}
                disabled={isSubmitting}
                className="w-full relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white rounded-xl font-['Nunito_Sans'] font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(10,147,150,0.3)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(10,147,150,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                {isSubmitting ? 'Đang gửi...' : <><Send size={16} /> Gửi Tin Nhắn</>}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      {config?.googleMap && (
        <section className="py-12 px-4" style={{ background:'linear-gradient(135deg,#F1F8F8,#E8F4F4)' }}>
          <div className="max-w-[1400px] mx-auto">
            <h2 className="font-['Be_Vietnam_Pro'] text-xl font-bold text-[#1A1A1A] mb-8 text-center">Vị Trí Văn Phòng</h2>
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(10,147,150,0.12)] border border-[rgba(10,147,150,0.12)]">
              <iframe src={config.googleMap} width="100%" height="450" style={{ border:0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Office Location" />
            </div>
          </div>
        </section>
      )}
    </>
  );
}