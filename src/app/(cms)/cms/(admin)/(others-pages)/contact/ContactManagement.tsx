// "use client";

// import React, { useState, useEffect } from "react";
// import Input from "@/app/(cms)/cms/components/form/input/InputField";
// import { Contact } from "@/app/types";
// import { TrashBinIcon, CheckCircleIcon, XIcon } from "./icons";
// import { contactApi } from "@/app/lib/api/index";

// // ============ COMPONENT ============
// export default function ContactManagement() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
//   const [showDetail, setShowDetail] = useState(false);

//   // Filter states
//   const [filterStatus, setFilterStatus] = useState<string>("");

//   //#region API CALLS
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const contactsData = await contactApi.getAllNoPaging();
//       setContacts(contactsData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const reloadContacts = async () => {
//     try {
//       const data = await contactApi.getAllNoPaging();
//       setContacts(data);
//     } catch (error) {
//       console.error("Error reloading contacts:", error);
//     }
//   };
//   //#endregion

//   //#region HANDLERS
//   // View detail
//   const handleViewDetail = async (contact: Contact) => {
//     setSelectedContact(contact);
//     setShowDetail(true);

//     // Auto mark as read when viewing
//     if (!contact.isRead) {
//       try {
//         await contactApi.markAsRead(contact.id);
//         await reloadContacts();
//       } catch (error) {
//         console.error("Error marking as read:", error);
//       }
//     }
//   };

//   // Close detail modal
//   const handleCloseDetail = () => {
//     setShowDetail(false);
//     setSelectedContact(null);
//   };

//   // Toggle read status
//   const handleToggleRead = async (contact: Contact) => {
//     try {
//       setLoading(true);
//       if (contact.isRead) {
//         await contactApi.markAsUnread(contact.id);
//       } else {
//         await contactApi.markAsRead(contact.id);
//       }
//       await reloadContacts();
//     } catch (error) {
//       console.error("Error toggling read status:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mark all as read
//   const handleMarkAllAsRead = async () => {
//     if (window.confirm("Đánh dấu tất cả là đã đọc?")) {
//       try {
//         setLoading(true);
//         await contactApi.markAllAsRead();
//         await reloadContacts();
//       } catch (error) {
//         console.error("Error marking all as read:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   // Delete contact
//   const handleDelete = async (id: number) => {
//     if (window.confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) {
//       try {
//         setLoading(true);
//         await contactApi.delete(id);
//         await reloadContacts();

//         if (selectedContact?.id === id) {
//           handleCloseDetail();
//         }
//       } catch (error) {
//         console.error("Error deleting contact:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   // Format date
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("vi-VN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Get time ago
//   const getTimeAgo = (dateString: string) => {
//     const now = new Date();
//     const date = new Date(dateString);
//     const diffMs = now.getTime() - date.getTime();
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMins / 60);
//     const diffDays = Math.floor(diffHours / 24);

//     if (diffMins < 1) return "Vừa xong";
//     if (diffMins < 60) return `${diffMins} phút trước`;
//     if (diffHours < 24) return `${diffHours} giờ trước`;
//     if (diffDays < 7) return `${diffDays} ngày trước`;
//     return formatDate(dateString);
//   };

//   // Count unread
//   const unreadCount = contacts.filter((c) => !c.isRead).length;

//   // Filter contacts
//   const filteredContacts = contacts
//     .filter((c) => {
//       const matchSearch =
//         c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         c.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         c.message.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchStatus =
//         filterStatus === "" ||
//         (filterStatus === "read" && c.isRead) ||
//         (filterStatus === "unread" && !c.isRead);

//       return matchSearch && matchStatus;
//     })
//     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Newest first
//   //#endregion

//   return (
//     <div className="space-y-6">
//       {/* ============ STATS SECTION ============ */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center">
//               <span className="text-2xl">📬</span>
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
//                 {contacts.length}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400">Tổng liên hệ</p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-lg bg-warning-50 dark:bg-warning-500/10 flex items-center justify-center">
//               <span className="text-2xl">📩</span>
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-warning-600 dark:text-warning-400">
//                 {unreadCount}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400">Chưa đọc</p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-lg bg-success-50 dark:bg-success-500/10 flex items-center justify-center">
//               <span className="text-2xl">✅</span>
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-success-600 dark:text-success-400">
//                 {contacts.length - unreadCount}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400">Đã đọc</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ============ TABLE SECTION ============ */}
//       <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
//         {/* Table Header */}
//         <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//                 📧 Danh sách liên hệ
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                 {filteredContacts.length} liên hệ
//                 {unreadCount > 0 && (
//                   <span className="ml-2 text-warning-600 dark:text-warning-400">
//                     ({unreadCount} chưa đọc)
//                   </span>
//                 )}
//               </p>
//             </div>

//             {/* Actions & Filters */}
//             <div className="flex items-center gap-3 flex-wrap">
//               {/* Mark all as read */}
//               {unreadCount > 0 && (
//                 <button
//                   onClick={handleMarkAllAsRead}
//                   disabled={loading}
//                   className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-500/20 transition-colors disabled:opacity-50"
//                 >
//                   <CheckCircleIcon className="w-4 h-4" />
//                   Đánh dấu tất cả đã đọc
//                 </button>
//               )}

//               {/* Search */}
//               <div className="w-64">
//                 <Input
//                   type="text"
//                   placeholder="🔍 Tìm kiếm..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               {/* Filter Status */}
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
//               >
//                 <option value="">Tất cả</option>
//                 <option value="unread">Chưa đọc</option>
//                 <option value="read">Đã đọc</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Table Content */}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Người gửi
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Chủ đề
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Nội dung
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-center">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Trạng thái
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Thời gian
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-center">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Thao tác
//                   </span>
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//               {loading && contacts.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="px-5 py-10 text-center">
//                     <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
//                   </td>
//                 </tr>
//               ) : filteredContacts.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="px-5 py-10 text-center">
//                     <div className="flex flex-col items-center gap-2">
//                       <span className="text-4xl">📭</span>
//                       <p className="text-gray-500 dark:text-gray-400">
//                         {searchTerm || filterStatus
//                           ? "Không tìm thấy liên hệ"
//                           : "Chưa có liên hệ nào"}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredContacts.map((contact) => (
//                   <tr
//                     key={contact.id}
//                     onClick={() => handleViewDetail(contact)}
//                     className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 cursor-pointer ${
//                       !contact.isRead
//                         ? "bg-warning-50/50 dark:bg-warning-500/5"
//                         : ""
//                     }`}
//                   >
//                     {/* Sender */}
//                     <td className="px-4 py-4">
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
//                             !contact.isRead
//                               ? "bg-warning-100 dark:bg-warning-500/20"
//                               : "bg-gray-100 dark:bg-gray-800"
//                           }`}
//                         >
//                           <span
//                             className={`text-sm font-medium ${
//                               !contact.isRead
//                                 ? "text-warning-700 dark:text-warning-400"
//                                 : "text-gray-600 dark:text-gray-400"
//                             }`}
//                           >
//                             {contact.name.charAt(0).toUpperCase()}
//                           </span>
//                         </div>
//                         <div className="min-w-0">
//                           <p
//                             className={`truncate max-w-[150px] ${
//                               !contact.isRead
//                                 ? "font-semibold text-gray-900 dark:text-white"
//                                 : "font-medium text-gray-800 dark:text-white/90"
//                             }`}
//                           >
//                             {contact.name}
//                           </p>
//                           <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
//                             {contact.email}
//                           </p>
//                           {contact.phone && (
//                             <p className="text-xs text-gray-400 dark:text-gray-500">
//                               {contact.phone}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </td>

//                     {/* Subject */}
//                     <td className="px-4 py-4">
//                       <p
//                         className={`truncate max-w-[180px] ${
//                           !contact.isRead
//                             ? "font-semibold text-gray-900 dark:text-white"
//                             : "text-gray-700 dark:text-gray-300"
//                         }`}
//                       >
//                         {contact.subject || "(Không có chủ đề)"}
//                       </p>
//                     </td>

//                     {/* Message Preview */}
//                     <td className="px-4 py-4">
//                       <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[250px]">
//                         {contact.message}
//                       </p>
//                     </td>

//                     {/* Status */}
//                     <td className="px-4 py-4 text-center">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleToggleRead(contact);
//                         }}
//                         disabled={loading}
//                         className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
//                           contact.isRead
//                             ? "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
//                             : "bg-warning-100 text-warning-700 hover:bg-warning-200 dark:bg-warning-500/20 dark:text-warning-400 dark:hover:bg-warning-500/30"
//                         }`}
//                         title={contact.isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
//                       >
//                         {contact.isRead ? (
//                           <>
//                             <CheckCircleIcon className="w-3 h-3" />
//                             Đã đọc
//                           </>
//                         ) : (
//                           <>
//                             <span className="w-2 h-2 rounded-full bg-warning-500"></span>
//                             Chưa đọc
//                           </>
//                         )}
//                       </button>
//                     </td>

//                     {/* Time */}
//                     <td className="px-4 py-4">
//                       <span className="text-sm text-gray-600 dark:text-gray-400">
//                         {getTimeAgo(contact.createdAt)}
//                       </span>
//                     </td>

//                     {/* Actions */}
//                     <td className="px-4 py-4 text-center">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDelete(contact.id);
//                         }}
//                         disabled={loading}
//                         className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
//                         title="Xóa liên hệ"
//                       >
//                         <TrashBinIcon className="w-5 h-5" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Table Footer */}
//         <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Hiển thị {filteredContacts.length} liên hệ
//           </p>
//         </div>
//       </div>

//       {/* ============ DETAIL MODAL ============ */}
//       {showDetail && selectedContact && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
//           onClick={handleCloseDetail}
//         >
//           <div
//             className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Modal Header */}
//             <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//                 📧 Chi tiết liên hệ
//               </h3>
//               <button
//                 onClick={handleCloseDetail}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//               >
//                 <XIcon className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>

//             {/* Modal Content */}
//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
//               <div className="space-y-4">
//                 {/* Sender Info */}
//                 <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
//                   <div className="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center">
//                     <span className="text-xl font-semibold text-brand-600 dark:text-brand-400">
//                       {selectedContact.name.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-800 dark:text-white/90">
//                       {selectedContact.name}
//                     </p>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       {selectedContact.email}
//                     </p>
//                     {selectedContact.phone && (
//                       <p className="text-sm text-gray-500 dark:text-gray-500">
//                         📞 {selectedContact.phone}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Subject */}
//                 {selectedContact.subject && (
//                   <div>
//                     <label className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                       Chủ đề
//                     </label>
//                     <p className="mt-1 text-gray-800 dark:text-white/90 font-medium">
//                       {selectedContact.subject}
//                     </p>
//                   </div>
//                 )}

//                 {/* Message */}
//                 <div>
//                   <label className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Nội dung
//                   </label>
//                   <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
//                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
//                       {selectedContact.message}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Time */}
//                 <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     📅 Gửi lúc: {formatDate(selectedContact.createdAt)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
//               <button
//                 onClick={() => handleToggleRead(selectedContact)}
//                 disabled={loading}
//                 className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   selectedContact.isRead
//                     ? "text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
//                     : "text-brand-700 bg-brand-50 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-500/20"
//                 }`}
//               >
//                 {selectedContact.isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
//               </button>

//               <div className="flex items-center gap-3">
//                 {/* <a
//                   href={`mailto:${selectedContact.email}?subject=Re: ${
//                     selectedContact.subject || "Liên hệ từ website"
//                   }`}
//                   className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
//                 >
//                   ✉️ Trả lời email
//                 </a> */}
//                 <button
//                   onClick={() => {
//                     handleDelete(selectedContact.id);
//                   }}
//                   disabled={loading}
//                   className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-error-600 bg-error-50 rounded-lg hover:bg-error-100 dark:bg-error-500/10 dark:text-error-400 dark:hover:bg-error-500/20 transition-colors"
//                 >
//                   <TrashBinIcon className="w-4 h-4" />
//                   Xóa
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }









"use client";

import React, { useState, useEffect } from "react";
import Input from "@/app/(cms)/cms/components/form/input/InputField";
import { Contact } from "@/app/types";
import { TrashBinIcon, CheckCircleIcon, XIcon } from "./icons";
import { contactApi } from "@/app/lib/api/index";

export default function ContactManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("");

  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const contactsData = await contactApi.getAllNoPaging();
      setContacts(contactsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadContacts = async () => {
    try {
      const data = await contactApi.getAllNoPaging();
      setContacts(data);
    } catch (error) {
      console.error("Error reloading contacts:", error);
    }
  };
  //#endregion

  //#region HANDLERS
  // ✅ View detail — tự động đánh dấu đã đọc
  const handleViewDetail = async (contact: Contact) => {
    setSelectedContact(contact);
    setShowDetail(true);

    if (!contact.isRead) {
      try {
        await contactApi.markAsRead(contact.id);
        setSelectedContact({ ...contact, isRead: true });
        await reloadContacts();
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedContact(null);
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    if (window.confirm("Đánh dấu tất cả là đã đọc?")) {
      try {
        setLoading(true);
        await contactApi.markAllAsRead();
        await reloadContacts();
      } catch (error) {
        console.error("Error marking all as read:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Delete contact
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) {
      try {
        setLoading(true);
        await contactApi.delete(id);
        await reloadContacts();

        if (selectedContact?.id === id) {
          handleCloseDetail();
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return formatDate(dateString);
  };

  const unreadCount = contacts.filter((c) => !c.isRead).length;

  const filteredContacts = contacts
    .filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        filterStatus === "" ||
        (filterStatus === "read" && c.isRead) ||
        (filterStatus === "unread" && !c.isRead);

      return matchSearch && matchStatus;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ STATS ============ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center">
              <span className="text-2xl">📬</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
                {contacts.length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tổng liên hệ
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-warning-50 dark:bg-warning-500/10 flex items-center justify-center">
              <span className="text-2xl">📩</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning-600 dark:text-warning-400">
                {unreadCount}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Chưa đọc
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-success-50 dark:bg-success-500/10 flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-success-600 dark:text-success-400">
                {contacts.length - unreadCount}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Đã đọc
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ TABLE ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                📧 Danh sách liên hệ
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {filteredContacts.length} liên hệ
                {unreadCount > 0 && (
                  <span className="ml-2 text-warning-600 dark:text-warning-400">
                    ({unreadCount} chưa đọc)
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-500/20 transition-colors disabled:opacity-50"
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  Đánh dấu tất cả đã đọc
                </button>
              )}

              <div className="w-64">
                <Input
                  type="text"
                  placeholder="🔍 Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
              >
                <option value="">Tất cả</option>
                <option value="unread">Chưa đọc</option>
                <option value="read">Đã đọc</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Người gửi
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Chủ đề
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Nội dung
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Trạng thái
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Thời gian
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Thao tác
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading && contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Đang tải...
                    </p>
                  </td>
                </tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm || filterStatus
                          ? "Không tìm thấy liên hệ"
                          : "Chưa có liên hệ nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    onClick={() => handleViewDetail(contact)}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 cursor-pointer ${
                      !contact.isRead
                        ? "bg-warning-50/50 dark:bg-warning-500/5"
                        : ""
                    }`}
                  >
                    {/* Sender */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            !contact.isRead
                              ? "bg-warning-100 dark:bg-warning-500/20"
                              : "bg-gray-100 dark:bg-gray-800"
                          }`}
                        >
                          <span
                            className={`text-sm font-medium ${
                              !contact.isRead
                                ? "text-warning-700 dark:text-warning-400"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {contact.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`truncate max-w-[150px] ${
                              !contact.isRead
                                ? "font-semibold text-gray-900 dark:text-white"
                                : "font-medium text-gray-800 dark:text-white/90"
                            }`}
                          >
                            {contact.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                            {contact.email}
                          </p>
                          {contact.phone && (
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                              {contact.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="px-4 py-4">
                      <p
                        className={`truncate max-w-[180px] ${
                          !contact.isRead
                            ? "font-semibold text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {contact.subject || "(Không có chủ đề)"}
                      </p>
                    </td>

                    {/* Message Preview */}
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[250px]">
                        {contact.message}
                      </p>
                    </td>

                    {/* ✅ Status — chỉ hiển thị, không click */}
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          contact.isRead
                            ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                            : "bg-warning-100 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400"
                        }`}
                      >
                        {contact.isRead ? (
                          <>
                            <CheckCircleIcon className="w-3 h-3" />
                            Đã đọc
                          </>
                        ) : (
                          <>
                            <span className="w-2 h-2 rounded-full bg-warning-500"></span>
                            Chưa đọc
                          </>
                        )}
                      </span>
                    </td>

                    {/* Time */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {getTimeAgo(contact.createdAt)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(contact.id);
                        }}
                        disabled={loading}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
                        title="Xóa liên hệ"
                      >
                        <TrashBinIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị {filteredContacts.length} liên hệ
          </p>
        </div>
      </div>

      {/* ============ DETAIL MODAL ============ */}
      {showDetail && selectedContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleCloseDetail}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                📧 Chi tiết liên hệ
              </h3>
              <button
                onClick={handleCloseDetail}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <XIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-4">
                {/* Sender Info */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center">
                    <span className="text-xl font-semibold text-brand-600 dark:text-brand-400">
                      {selectedContact.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white/90">
                      {selectedContact.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedContact.email}
                    </p>
                    {selectedContact.phone && (
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        📞 {selectedContact.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                {selectedContact.subject && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                      Chủ đề
                    </label>
                    <p className="mt-1 text-gray-800 dark:text-white/90 font-medium">
                      {selectedContact.subject}
                    </p>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Nội dung
                  </label>
                  <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    📅 Gửi lúc: {formatDate(selectedContact.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* ✅ Modal Footer — chỉ giữ nút Xóa */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end">
              <button
                onClick={() => handleDelete(selectedContact.id)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-error-600 bg-error-50 rounded-lg hover:bg-error-100 dark:bg-error-500/10 dark:text-error-400 dark:hover:bg-error-500/20 transition-colors"
              >
                <TrashBinIcon className="w-4 h-4" />
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}