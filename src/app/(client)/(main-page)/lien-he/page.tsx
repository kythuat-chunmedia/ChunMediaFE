// 'use client';
// export const dynamic = 'force-dynamic';

// import { useState, useEffect } from 'react';
// import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
// import { clientApi } from '@/app/lib/api';
// import { ConfigSite, ContactFormData } from '@/app/types';



// export default function ContactPage() {
//   // ✅ ConfigSite từ API thay mock
//   const [config, setConfig] = useState<ConfigSite | null>(null);

//   const [formData, setFormData] = useState<ContactFormData>({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

//   // ✅ Fetch ConfigSite on mount
//   useEffect(() => {
//     const fetchConfig = async () => {
//       try {
//         const data = await clientApi.getConfigSite();
//         setConfig(data);
//       } catch (error) {
//         console.error('Failed to fetch config:', error);
//       }
//     };
//     fetchConfig();
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Gọi API insert thật
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus('idle');

//     try {
//       await clientApi.insertContact(formData);
//       setSubmitStatus('success');
//       setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

//       setTimeout(() => setSubmitStatus('idle'), 5000);
//     } catch (error) {
//       console.error('Failed to submit contact:', error);
//       setSubmitStatus('error');
//       setTimeout(() => setSubmitStatus('idle'), 5000);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       {/* Page Header */}
//       <section className="page-header-gradient text-white py-16 lg:py-20">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-3xl lg:text-4xl font-bold mb-4">Liên Hệ</h1>
//           <p className="text-teal-100 max-w-2xl mx-auto">
//             Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất
//           </p>
//         </div>
//       </section>

//       {/* Contact Content */}
//       <section className="section-padding bg-white">
//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
//             {/* ✅ Contact Info — từ ConfigSite API */}
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-8">
//                 Thông Tin Liên Hệ
//               </h2>

//               <div className="space-y-6">
//                 {/* Address */}
//                 {config?.place && (
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
//                       <MapPin className="w-6 h-6 text-teal-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">Địa Chỉ</h3>
//                       <p className="text-gray-600 mt-1">{config.place}</p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Phone */}
//                 {config?.hotline && (
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
//                       <Phone className="w-6 h-6 text-teal-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">Điện Thoại</h3>
//                       <p className="text-gray-600 mt-1">
//                         <a href={`tel:${config.hotline.replace(/\s/g, '')}`} className="hover:text-teal-600 transition-colors">
//                           {config.hotline}
//                         </a>
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Email */}
//                 {config?.email && (
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
//                       <Mail className="w-6 h-6 text-teal-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">Email</h3>
//                       <p className="text-gray-600 mt-1">
//                         <a href={`mailto:${config.email}`} className="hover:text-teal-600 transition-colors">
//                           {config.email}
//                         </a>
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Working Hours */}
//               <div className="mt-8 p-6 bg-gray-50 rounded-xl">
//                 <div className="flex items-center gap-3 mb-4">
//                   <Clock className="w-5 h-5 text-teal-600" />
//                   <h3 className="font-semibold text-gray-900">Giờ Làm Việc</h3>
//                 </div>
//                 <div className="space-y-2 text-sm text-gray-600">
//                   {/* {config?.workingHours ? (
//                     <p>{config.workingHours}</p>
//                   ) : (
//                     <> */}
//                       <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
//                       <p>Thứ 7: 8:00 - 12:00</p>
//                       <p>Chủ Nhật: Nghỉ</p>
//                     {/* </>
//                   )} */}
//                 </div>
//               </div>
//             </div>

//             {/* ✅ Contact Form — theo ContactFormData interface */}
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-8">
//                 Gửi Tin Nhắn
//               </h2>

//               {submitStatus === 'success' && (
//                 <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
//                   Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
//                 </div>
//               )}

//               {submitStatus === 'error' && (
//                 <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
//                   Có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua điện thoại.
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Name */}
//                 <div>
//                   <label htmlFor="name" className="form-label">
//                     Họ và Tên <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Nhập họ và tên của bạn"
//                     className="form-input"
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label htmlFor="email" className="form-label">
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="your.email@example.com"
//                     className="form-input"
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label htmlFor="phone" className="form-label">
//                     Số Điện Thoại
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="0123 456 789"
//                     className="form-input"
//                   />
//                 </div>

//                 {/* Subject — thay thế Company + Service */}
//                 <div>
//                   <label htmlFor="subject" className="form-label">
//                     Chủ đề
//                   </label>
//                   <input
//                     type="text"
//                     id="subject"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     placeholder="Chủ đề liên hệ"
//                     className="form-input"
//                   />
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label htmlFor="message" className="form-label">
//                     Tin Nhắn <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows={5}
//                     placeholder="Nhập tin nhắn của bạn..."
//                     className="form-input resize-none"
//                   />
//                 </div>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? (
//                     'Đang gửi...'
//                   ) : (
//                     <>
//                       <Send size={18} />
//                       Gửi Tin Nhắn
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ✅ Google Map — từ ConfigSite */}
//       {config?.googleMap && (
//         <section className="bg-gray-50 py-12">
//           <div className="container mx-auto px-4">
//             <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
//               Vị Trí Văn Phòng
//             </h2>
//             <div className="rounded-2xl overflow-hidden shadow-lg">
//               <iframe
//                 src={config.googleMap}
//                 width="100%"
//                 height="450"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Office Location"
//               />
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ✅ Floating Contact — từ ConfigSite */}
//       <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
//         {config?.hotline && (
//           <a
//             href={`tel:${config.hotline.replace(/\s/g, '')}`}
//             className="w-14 h-14 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-700 transition-colors"
//             aria-label="Gọi điện"
//           >
//             <Phone size={24} />
//           </a>
//         )}
//         {config?.zalo && (
//           <a
//             href={`https://zalo.me/${config.zalo}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
//             aria-label="Chat Zalo"
//           >
//             <MessageCircle size={24} />
//           </a>
//         )}
//       </div>
//     </>
//   );
// }




// import { clientApi } from '@/app/lib/api';
// import { ConfigSite } from '@/app/types';
// import ContactContent from '@/app/components/client/lien-he/ContactContent';

// export const dynamic = 'force-dynamic';

// export const metadata = {
//   title: 'Liên Hệ | Communication Agency',
//   description: 'Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất',
// };

// export default async function ContactPage() {
//   let config: ConfigSite | null = null;

//   try {
//     config = await clientApi.getConfigSite();
//   } catch (error) {
//     console.error('Failed to fetch config:', error);
//   }

//   return <ContactContent config={config} />;
// }





import { clientApi } from '@/app/lib/api';
import { ConfigSite } from '@/app/types';
import ContactContent from '@/app/components/client/lien-he/ContactContent';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Liên Hệ | Communication Agency',
  description: 'Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất',
};

export default async function ContactPage() {
  let config: ConfigSite | null = null;

  try {
    config = await clientApi.getConfigSite();
  } catch (error) {
    console.error('Failed to fetch config:', error);
  }

  return <ContactContent config={config} />;
}