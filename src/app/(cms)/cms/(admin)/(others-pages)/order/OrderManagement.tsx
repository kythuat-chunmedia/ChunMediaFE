// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import Label from "@/components/form/Label";
// import Input from "@/components/form/input/InputField";
// import {
//   Order,
//   OrderFormData,
//   OrderStatus,
//   OrderDetail,
//   OrderDetailFormData,
//   Product,
//   ORDER_STATUS_CONFIG,
//   ORDER_STATUS_TRANSITIONS,
// } from "@/app/types";
// import { PlusIcon, PencilIcon, TrashBinIcon, XIcon } from "./icons";
// import { orderApi, productApi } from "@/app/lib/api/index";

// // ============ INITIAL FORM DATA ============
// const initialFormData: OrderFormData = {
//   userId: undefined,
//   customerName: "",
//   customerPhone: "",
//   customerEmail: "",
//   shippingAddress: "",
//   note: "",
//   items: [],
// };

// const initialItemForm: OrderDetailFormData = {
//   productId: 0,
//   productName: "",
//   price: 0,
//   quantity: 1,
// };

// // ============ ALL STATUSES ============
// const ALL_STATUSES: OrderStatus[] = [
//   'Pending', 'Confirmed', 'Processing', 'Shipping', 'Delivered', 'Cancelled', 'Refunded'
// ];

// // ============ COMPONENT ============
// export default function OrderManagement() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState<OrderFormData>(initialFormData);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);

//   // Detail modal
//   const [showDetail, setShowDetail] = useState(false);

//   // Item form
//   const [itemForm, setItemForm] = useState<OrderDetailFormData>(initialItemForm);

//   // Filters
//   const [filterStatus, setFilterStatus] = useState<string>("");
//   const [filterDateFrom, setFilterDateFrom] = useState<string>("");
//   const [filterDateTo, setFilterDateTo] = useState<string>("");

//   //#region COMPUTED VALUES
//   // Stats
//   const stats = useMemo(() => {
//     const pending = orders.filter(o => o.status === 'Pending').length;
//     const processing = orders.filter(o => ['Confirmed', 'Processing', 'Shipping'].includes(o.status)).length;
//     const completed = orders.filter(o => o.status === 'Delivered').length;
//     const cancelled = orders.filter(o => ['Cancelled', 'Refunded'].includes(o.status)).length;
//     const totalRevenue = orders
//       .filter(o => o.status === 'Delivered')
//       .reduce((sum, o) => sum + o.totalAmount, 0);

//     return { pending, processing, completed, cancelled, totalRevenue, total: orders.length };
//   }, [orders]);

//   // Filtered orders
//   const filteredOrders = useMemo(() => {
//     return orders
//       .filter(o => {
//         const matchSearch =
//           o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           o.customerPhone.includes(searchTerm) ||
//           o.id.toString().includes(searchTerm);

//         const matchStatus = filterStatus === "" || o.status === filterStatus;

//         const orderDate = new Date(o.createdAt);
//         const matchDateFrom = !filterDateFrom || orderDate >= new Date(filterDateFrom);
//         const matchDateTo = !filterDateTo || orderDate <= new Date(filterDateTo + 'T23:59:59');

//         return matchSearch && matchStatus && matchDateFrom && matchDateTo;
//       })
//       .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//   }, [orders, searchTerm, filterStatus, filterDateFrom, filterDateTo]);

//   // Calculate total for form items
//   const formTotal = useMemo(() => {
//     return formData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   }, [formData.items]);
//   //#endregion

//   //#region API CALLS
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [ordersData, productsData] = await Promise.all([
//         orderApi.getAllNoPaging(),
//         productApi.getAllNoPaging(),
//       ]);
//       setOrders(ordersData);
//       setProducts(productsData.filter(p => p.isActive));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const reloadOrders = async () => {
//     try {
//       const data = await orderApi.getAllNoPaging();
//       setOrders(data);
//     } catch (error) {
//       console.error("Error reloading orders:", error);
//     }
//   };
//   //#endregion

//   //#region HANDLERS
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleItemChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = e.target;
//     let newValue: string | number = value;

//     if (type === "number") {
//       newValue = parseFloat(value) || 0;
//     }

//     setItemForm(prev => ({ ...prev, [name]: newValue }));
//   };

//   const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const productId = parseInt(e.target.value) || 0;
//     const product = products.find(p => p.id === productId);

//     if (product) {
//       const price = product.salePrice > 0 ? product.salePrice : product.price;
//       setItemForm({
//         productId,
//         productName: product.name,
//         price,
//         quantity: 1,
//       });
//     } else {
//       setItemForm(initialItemForm);
//     }
//   };

//   const addItem = () => {
//     if (itemForm.productId === 0) return;

//     // Check if product already exists
//     const existingIndex = formData.items.findIndex(i => i.productId === itemForm.productId);

//     if (existingIndex >= 0) {
//       // Update quantity
//       const newItems = [...formData.items];
//       newItems[existingIndex].quantity += itemForm.quantity;
//       setFormData(prev => ({ ...prev, items: newItems }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         items: [...prev.items, { ...itemForm }],
//       }));
//     }

//     setItemForm(initialItemForm);
//   };

//   const removeItem = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       items: prev.items.filter((_, i) => i !== index),
//     }));
//   };

//   const updateItemQuantity = (index: number, quantity: number) => {
//     if (quantity <= 0) return;
//     const newItems = [...formData.items];
//     newItems[index].quantity = quantity;
//     setFormData(prev => ({ ...prev, items: newItems }));
//   };

//   const validate = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.customerName.trim()) {
//       newErrors.customerName = "Vui lòng nhập tên khách hàng";
//     }

//     if (!formData.customerPhone.trim()) {
//       newErrors.customerPhone = "Vui lòng nhập số điện thoại";
//     } else if (!/^[0-9]{10,11}$/.test(formData.customerPhone)) {
//       newErrors.customerPhone = "Số điện thoại không hợp lệ";
//     }

//     if (formData.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
//       newErrors.customerEmail = "Email không hợp lệ";
//     }

//     if (!formData.shippingAddress.trim()) {
//       newErrors.shippingAddress = "Vui lòng nhập địa chỉ giao hàng";
//     }

//     if (formData.items.length === 0) {
//       newErrors.items = "Vui lòng thêm ít nhất 1 sản phẩm";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleViewDetail = (order: Order) => {
//     setSelectedOrder(order);
//     setShowDetail(true);
//   };

//   const handleCloseDetail = () => {
//     setShowDetail(false);
//     setSelectedOrder(null);
//   };

//   const handleEdit = (order: Order) => {
//     setSelectedOrder(order);
//     setIsEditing(true);
//     setIsCreating(true);
//     setFormData({
//       userId: order.userId,
//       customerName: order.customerName,
//       customerPhone: order.customerPhone,
//       customerEmail: order.customerEmail || "",
//       shippingAddress: order.shippingAddress,
//       note: order.note || "",
//       items: order.items.map(item => ({
//         productId: item.productId,
//         productName: item.productName,
//         price: item.price,
//         quantity: item.quantity,
//       })),
//     });
//     setShowDetail(false);
//   };

//   const handleReset = () => {
//     setSelectedOrder(null);
//     setIsEditing(false);
//     setIsCreating(false);
//     setFormData(initialFormData);
//     setItemForm(initialItemForm);
//     setErrors({});
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       setLoading(true);

//       if (isEditing && selectedOrder) {
//         const orderToUpdate: Order = {
//           ...selectedOrder,
//           customerName: formData.customerName,
//           customerPhone: formData.customerPhone,
//           customerEmail: formData.customerEmail || null,
//           shippingAddress: formData.shippingAddress,
//           note: formData.note || null,
//           totalAmount: formTotal,
//           items: formData.items.map((item, index) => ({
//             id: selectedOrder.items[index]?.id || 0,
//             orderId: selectedOrder.id,
//             productId: item.productId,
//             productName: item.productName,
//             price: item.price,
//             quantity: item.quantity,
//             amount: item.price * item.quantity,
//           })),
//         };
//         await orderApi.update(orderToUpdate);
//       } else {
//         await orderApi.create(formData);
//       }

//       await reloadOrders();
//       handleReset();
//     } catch (error) {
//       console.error("Error saving order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
//     if (!window.confirm(`Chuyển trạng thái đơn hàng sang "${ORDER_STATUS_CONFIG[newStatus].label}"?`)) {
//       return;
//     }

//     try {
//       setLoading(true);
//       await orderApi.updateStatus(orderId, newStatus);
//       await reloadOrders();

//       // Update selected order if viewing detail
//       if (selectedOrder?.id === orderId) {
//         const updated = await orderApi.getById(orderId);
//         setSelectedOrder(updated);
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
//       try {
//         setLoading(true);
//         await orderApi.delete(id);
//         await reloadOrders();

//         if (selectedOrder?.id === id) {
//           handleCloseDetail();
//         }
//       } catch (error) {
//         console.error("Error deleting order:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   // Helpers
//   const formatCurrency = (value: number) => {
//     return new Intl.NumberFormat("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     }).format(value);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("vi-VN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getStatusBadge = (status: OrderStatus) => {
//     const config = ORDER_STATUS_CONFIG[status];
//     return (
//       <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
//         <span>{config.icon}</span>
//         {config.label}
//       </span>
//     );
//     // return <span className="text-sm font-medium dark:text-white/90">bb</span>;
//   };
//   //#endregion

//   return (
//     <div className="space-y-6">
//       {/* ============ STATS SECTION ============ */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//         <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3">
//           <p className="text-2xl font-bold text-gray-800 dark:text-white/90">{stats.total}</p>
//           <p className="text-sm text-gray-500 dark:text-gray-400">Tổng đơn</p>
//         </div>
//         <div className="rounded-xl border border-warning-200 bg-warning-50 p-4 dark:border-warning-800 dark:bg-warning-500/10">
//           <p className="text-2xl font-bold text-warning-700 dark:text-warning-400">{stats.pending}</p>
//           <p className="text-sm text-warning-600 dark:text-warning-500">Chờ xử lý</p>
//         </div>
//         <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-500/10">
//           <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{stats.processing}</p>
//           <p className="text-sm text-blue-600 dark:text-blue-500">Đang xử lý</p>
//         </div>
//         <div className="rounded-xl border border-success-200 bg-success-50 p-4 dark:border-success-800 dark:bg-success-500/10">
//           <p className="text-2xl font-bold text-success-700 dark:text-success-400">{stats.completed}</p>
//           <p className="text-sm text-success-600 dark:text-success-500">Hoàn thành</p>
//         </div>
//         <div className="rounded-xl border border-error-200 bg-error-50 p-4 dark:border-error-800 dark:bg-error-500/10">
//           <p className="text-2xl font-bold text-error-700 dark:text-error-400">{stats.cancelled}</p>
//           <p className="text-sm text-error-600 dark:text-error-500">Đã hủy</p>
//         </div>
//         <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-800 dark:bg-brand-500/10">
//           <p className="text-xl font-bold text-brand-700 dark:text-brand-400">{formatCurrency(stats.totalRevenue)}</p>
//           <p className="text-sm text-brand-600 dark:text-brand-500">Doanh thu</p>
//         </div>
//       </div>

//       {/* ============ CREATE ORDER FORM (Collapsible) ============ */}
//       {isCreating && (
//         <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
//           <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//                 {isEditing ? "✏️ Cập nhật đơn hàng" : "➕ Tạo đơn hàng mới"}
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                 {isEditing ? `Đơn hàng #${selectedOrder?.id}` : "Điền thông tin đơn hàng"}
//               </p>
//             </div>
//             <button
//               onClick={handleReset}
//               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//             >
//               <XIcon className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="p-5">
//             {/* Customer Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
//               <div>
//                 <Label>Tên khách hàng <span className="text-error-500">*</span></Label>
//                 <Input
//                   name="customerName"
//                   type="text"
//                   placeholder="Nhập tên khách hàng"
//                   value={formData.customerName}
//                   onChange={handleChange}
//                   error={!!errors.customerName}
//                   hint={errors.customerName}
//                 />
//               </div>
//               <div>
//                 <Label>Số điện thoại <span className="text-error-500">*</span></Label>
//                 <Input
//                   name="customerPhone"
//                   type="tel"
//                   placeholder="0912345678"
//                   value={formData.customerPhone}
//                   onChange={handleChange}
//                   error={!!errors.customerPhone}
//                   hint={errors.customerPhone}
//                 />
//               </div>
//               <div>
//                 <Label>Email</Label>
//                 <Input
//                   name="customerEmail"
//                   type="email"
//                   placeholder="email@example.com"
//                   value={formData.customerEmail || ""}
//                   onChange={handleChange}
//                   error={!!errors.customerEmail}
//                   hint={errors.customerEmail}
//                 />
//               </div>
//               <div className="lg:col-span-2">
//                 <Label>Địa chỉ giao hàng <span className="text-error-500">*</span></Label>
//                 <Input
//                   name="shippingAddress"
//                   type="text"
//                   placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
//                   value={formData.shippingAddress}
//                   onChange={handleChange}
//                   error={!!errors.shippingAddress}
//                   hint={errors.shippingAddress}
//                 />
//               </div>
//               <div>
//                 <Label>Ghi chú</Label>
//                 <Input
//                   name="note"
//                   type="text"
//                   placeholder="Ghi chú đơn hàng"
//                   value={formData.note || ""}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Add Item */}
//             <div className="border-t border-gray-200 dark:border-gray-800 pt-5 mb-4">
//               <h4 className="font-medium text-gray-800 dark:text-white/90 mb-3">Sản phẩm</h4>
//               <div className="flex flex-wrap gap-3 items-end">
//                 <div className="flex-1 min-w-[200px]">
//                   <select
//                     value={itemForm.productId}
//                     onChange={handleProductSelect}
//                     className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
//                   >
//                     <option value={0}>-- Chọn sản phẩm --</option>
//                     {products.map(p => (
//                       <option key={p.id} value={p.id}>
//                         {p.name} - {formatCurrency(p.salePrice > 0 ? p.salePrice : p.price)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="w-24">
//                   <Input
//                     name="quantity"
//                     type="number"
//                     min="1"
//                     placeholder="SL"
//                     value={itemForm.quantity}
//                     onChange={handleItemChange}
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   onClick={addItem}
//                   disabled={itemForm.productId === 0}
//                   className="h-11 px-4 bg-brand-500 text-white rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <PlusIcon className="w-5 h-5" />
//                 </button>
//               </div>
//               {errors.items && (
//                 <p className="mt-2 text-xs text-error-500">{errors.items}</p>
//               )}
//             </div>

//             {/* Items List */}
//             {formData.items.length > 0 && (
//               <div className="border rounded-lg overflow-hidden mb-6">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 dark:bg-gray-800/50">
//                     <tr>
//                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Sản phẩm</th>
//                       <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Đơn giá</th>
//                       <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">SL</th>
//                       <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Thành tiền</th>
//                       <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">Xóa</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//                     {formData.items.map((item, index) => (
//                       <tr key={index}>
//                         <td className="px-4 py-3 text-sm text-gray-800 dark:text-white/90">{item.productName}</td>
//                         <td className="px-4 py-3 text-sm text-right dark:text-white/90">{formatCurrency(item.price)}</td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center justify-center gap-1">
//                             <button type="button" onClick={() => updateItemQuantity(index, item.quantity - 1)} className="w-6 h-6 rounded border text-gray-600 hover:bg-gray-100 dark:text-white/90">−</button>
//                             <span className="w-8 text-center dark:text-white/90">{item.quantity}</span>
//                             <button type="button" onClick={() => updateItemQuantity(index, item.quantity + 1)} className="w-6 h-6 rounded border text-gray-600 hover:bg-gray-100 dark:text-white/90">+</button>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-right font-medium text-brand-600">{formatCurrency(item.price * item.quantity)}</td>
//                         <td className="px-4 py-3 text-center">
//                           <button type="button" onClick={() => removeItem(index)} className="text-error-500 hover:text-error-700">
//                             <TrashBinIcon className="w-4 h-4" />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                   <tfoot className="bg-gray-50 dark:bg-gray-800/50">
//                     <tr>
//                       <td colSpan={3} className="px-4 py-3 text-right font-semibold dark:text-white/90">Tổng cộng:</td>
//                       <td className="px-4 py-3 text-right font-bold text-lg text-brand-600">{formatCurrency(formTotal)}</td>
//                       <td></td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>
//             )}

//             {/* Form Actions */}
//             <div className="flex items-center gap-3">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50"
//               >
//                 {isEditing ? <PencilIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
//                 {loading ? "Đang xử lý..." : isEditing ? "Cập nhật" : "Tạo đơn hàng"}
//               </button>
//               <button type="button" onClick={handleReset} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
//                 Hủy
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* ============ TABLE SECTION ============ */}
//       <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
//         <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//                 📦 Danh sách đơn hàng
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                 {filteredOrders.length} đơn hàng
//               </p>
//             </div>

//             <div className="flex items-center gap-3 flex-wrap">
//               {!isCreating && (
//                 <button
//                   onClick={() => setIsCreating(true)}
//                   className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
//                 >
//                   <PlusIcon className="w-4 h-4" />
//                   Tạo đơn hàng
//                 </button>
//               )}

//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
//               >
//                 <option value="">Tất cả trạng thái</option>
//                 {ALL_STATUSES.map(status => (
//                   <option key={status} value={status}>
//                     {ORDER_STATUS_CONFIG[status].icon} {ORDER_STATUS_CONFIG[status].label}
//                   </option>
//                 ))}
//               </select>

//               <div className="w-64">
//                 <Input
//                   type="text"
//                   placeholder="🔍 Tìm theo tên, SĐT, mã đơn..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã đơn</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
//                 <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
//                 <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
//                 <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày tạo</th>
//                 <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thao tác</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//               {loading && orders.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="px-5 py-10 text-center text-gray-500">Đang tải...</td>
//                 </tr>
//               ) : filteredOrders.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="px-5 py-10 text-center">
//                     <span className="text-4xl">📭</span>
//                     <p className="mt-2 text-gray-500">Không có đơn hàng nào</p>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredOrders.map(order => (
//                   <tr
//                     key={order.id}
//                     onClick={() => handleViewDetail(order)}
//                     className="hover:bg-gray-50 dark:hover:bg-white/2 cursor-pointer"
//                   >
//                     <td className="px-4 py-4">
//                       <span className="font-mono font-medium text-brand-600">#{order.id}</span>
//                     </td>
//                     <td className="px-4 py-4">
//                       <p className="font-medium text-gray-800 dark:text-white/90">{order.customerName}</p>
//                       <p className="text-xs text-gray-500">{order.customerPhone}</p>
//                     </td>
//                     <td className="px-4 py-4 text-center">
//                       <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium">
//                         {order.items.length}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4 text-right">
//                       <span className="font-semibold text-gray-800 dark:text-white/90">
//                         {formatCurrency(order.totalAmount)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-4 text-center">
//                       {getStatusBadge(order.status)}
//                     </td>
//                     <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
//                       {formatDate(order.createdAt)}
//                     </td>
//                     <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
//                       <button
//                         onClick={() => handleDelete(order.id)}
//                         className="p-2 text-error-500 hover:bg-error-50 rounded-lg dark:hover:bg-error-500/10"
//                         title="Xóa đơn hàng"
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
//       </div>

//       {/* ============ DETAIL MODAL ============ */}
//       {showDetail && selectedOrder && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleCloseDetail}>
//           <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
//             {/* Modal Header */}
//             <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//                   Đơn hàng #{selectedOrder.id}
//                 </h3>
//                 <p className="text-sm text-gray-500">{formatDate(selectedOrder.createdAt)}</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 {getStatusBadge(selectedOrder.status)}
//                 <button onClick={handleCloseDetail} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
//                   <XIcon className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>
//             </div>

//             {/* Modal Content */}
//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
//               {/* Customer Info */}
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <p className="text-xs text-gray-500 uppercase mb-1">Khách hàng</p>
//                   <p className="font-medium text-gray-800 dark:text-white/90">{selectedOrder.customerName}</p>
//                   <p className="text-sm text-gray-600">{selectedOrder.customerPhone}</p>
//                   {selectedOrder.customerEmail && (
//                     <p className="text-sm text-gray-600">{selectedOrder.customerEmail}</p>
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500 uppercase mb-1">Địa chỉ giao hàng</p>
//                   <p className="text-sm text-gray-800 dark:text-white/90">{selectedOrder.shippingAddress}</p>
//                 </div>
//               </div>

//               {selectedOrder.note && (
//                 <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                   <p className="text-xs text-gray-500 uppercase mb-1">Ghi chú</p>
//                   <p className="text-sm text-gray-800 dark:text-white/90">{selectedOrder.note}</p>
//                 </div>
//               )}

//               {/* Order Items */}
//               <div className="border rounded-lg overflow-hidden">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 dark:bg-gray-800/50">
//                     <tr>
//                       <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Sản phẩm</th>
//                       <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Đơn giá</th>
//                       <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">SL</th>
//                       <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Thành tiền</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//                     {selectedOrder.items.map(item => (
//                       <tr key={item.id}>
//                         <td className="px-4 py-3 text-sm text-gray-800 dark:text-white/90">{item.productName}</td>
//                         <td className="px-4 py-3 text-sm text-right">{formatCurrency(item.price)}</td>
//                         <td className="px-4 py-3 text-sm text-center">{item.quantity}</td>
//                         <td className="px-4 py-3 text-sm text-right font-medium">{formatCurrency(item.amount)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                   <tfoot className="bg-gray-50 dark:bg-gray-800/50">
//                     <tr>
//                       <td colSpan={3} className="px-4 py-3 text-right font-semibold">Tổng cộng:</td>
//                       <td className="px-4 py-3 text-right font-bold text-lg text-brand-600">{formatCurrency(selectedOrder.totalAmount)}</td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>
//             </div>

//             {/* Modal Footer - Status Actions */}
//             <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
//               <div className="flex items-center justify-between flex-wrap gap-3">
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-500">Chuyển trạng thái:</span>
//                   {ORDER_STATUS_TRANSITIONS[selectedOrder.status].map(nextStatus => (
//                     <button
//                       key={nextStatus}
//                       onClick={() => handleStatusChange(selectedOrder.id, nextStatus)}
//                       disabled={loading}
//                       className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
//                         nextStatus === 'Cancelled'
//                           ? 'bg-error-50 text-error-700 hover:bg-error-100 dark:bg-error-500/10 dark:text-error-400'
//                           : 'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400'
//                       }`}
//                     >
//                       {ORDER_STATUS_CONFIG[nextStatus].icon} {ORDER_STATUS_CONFIG[nextStatus].label}
//                     </button>
//                   ))}
//                   {ORDER_STATUS_TRANSITIONS[selectedOrder.status].length === 0 && (
//                     <span className="text-sm text-gray-400">Không có thao tác</span>
//                   )}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handleEdit(selectedOrder)}
//                     className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
//                   >
//                     <PencilIcon className="w-4 h-4" />
//                     Sửa
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }









"use client";

import React, { useState, useEffect, useMemo } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import {
  Order,
  OrderDetail,
  OrderDetailFormData,
  Product,
  ORDER_STATUS_CONFIG,
  ORDER_STATUS_TRANSITIONS,
} from "@/app/types";
import { PlusIcon, PencilIcon, TrashBinIcon, XIcon } from "./icons";
import { orderApi, productApi } from "@/app/lib/api/index";

// ============ INITIAL FORM STATE ============
interface FormState {
  userId: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  note: string;
  items: OrderDetailFormData[];
}

const initialFormState: FormState = {
  userId: 0,
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  shippingAddress: "",
  note: "",
  items: [],
};

const initialItemForm: OrderDetailFormData = {
  ProductId: 0,
  ProductName: "",
  Price: 0,
  Quantity: 1,
};

// ============ ALL STATUSES ============
const ALL_STATUSES = ['Pending', 'Confirmed', 'Processing', 'Shipping', 'Delivered', 'Cancelled', 'Refunded'];

// ============ HELPER: Get order field (handles both PascalCase and camelCase) ============
const getOrderField = (order: any, pascalKey: string, camelKey: string, defaultValue: any = "") => {
  return order[pascalKey] ?? order[camelKey] ?? defaultValue;
};

// ============ COMPONENT ============
export default function OrderManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Detail modal
  const [showDetail, setShowDetail] = useState(false);

  // Item form
  const [itemForm, setItemForm] = useState<OrderDetailFormData>(initialItemForm);

  // Filters
  const [filterStatus, setFilterStatus] = useState<string>("");

  //#region COMPUTED VALUES
  const stats = useMemo(() => {
    const getStatus = (o: Order) => o.Status || (o as any).status || "";
    const getAmount = (o: Order) => o.TotalAmount || (o as any).totalAmount || 0;

    const pending = orders.filter(o => getStatus(o) === 'Pending').length;
    const processing = orders.filter(o => ['Confirmed', 'Processing', 'Shipping'].includes(getStatus(o))).length;
    const completed = orders.filter(o => getStatus(o) === 'Delivered').length;
    const cancelled = orders.filter(o => ['Cancelled', 'Refunded'].includes(getStatus(o))).length;
    const totalRevenue = orders
      .filter(o => getStatus(o) === 'Delivered')
      .reduce((sum, o) => sum + getAmount(o), 0);

    return { pending, processing, completed, cancelled, totalRevenue, total: orders.length };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders
      .filter(o => {
        // Handle both PascalCase and camelCase from backend
        const customerName = o.CustomerName || (o as any).customerName || "";
        const customerPhone = o.CustomerPhone || (o as any).customerPhone || "";
        const orderId = o.Id || (o as any).id || 0;
        const status = o.Status || (o as any).status || "";

        const matchSearch =
          customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customerPhone.includes(searchTerm) ||
          orderId.toString().includes(searchTerm);

        const matchStatus = filterStatus === "" || status === filterStatus;

        return matchSearch && matchStatus;
      })
      .sort((a, b) => {
        const dateA = a.CreatedAt || (a as any).createdAt || "";
        const dateB = b.CreatedAt || (b as any).createdAt || "";
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
  }, [orders, searchTerm, filterStatus]);

  const formTotal = useMemo(() => {
    return formState.items.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
  }, [formState.items]);
  //#endregion

  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersData, productsData] = await Promise.all([
        orderApi.getAllNoPaging(),
        productApi.getAllNoPaging(),
      ]);
      setOrders(ordersData);
      setProducts(productsData.filter((p: Product) => p.isActive));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadOrders = async () => {
    try {
      const data = await orderApi.getAllNoPaging();
      setOrders(data);
    } catch (error) {
      console.error("Error reloading orders:", error);
    }
  };
  //#endregion

  //#region HANDLERS
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | number = value;

    if (type === "number") {
      newValue = parseFloat(value) || 0;
    }

    setItemForm(prev => ({ ...prev, [name]: newValue }));
  };

  const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = parseInt(e.target.value) || 0;
    const product = products.find((p: Product) => p.id === productId);

    if (product) {
      const price = product.salePrice > 0 ? product.salePrice : product.price;
      setItemForm({
        ProductId: productId,
        ProductName: product.name,
        Price: price,
        Quantity: 1,
      });
    } else {
      setItemForm(initialItemForm);
    }
  };

  const addItem = () => {
    if (itemForm.ProductId === 0) return;

    const existingIndex = formState.items.findIndex(i => i.ProductId === itemForm.ProductId);

    if (existingIndex >= 0) {
      const newItems = [...formState.items];
      newItems[existingIndex].Quantity += itemForm.Quantity;
      setFormState(prev => ({ ...prev, items: newItems }));
    } else {
      setFormState(prev => ({
        ...prev,
        items: [...prev.items, { ...itemForm }],
      }));
    }

    setItemForm(initialItemForm);
  };

  const removeItem = (index: number) => {
    setFormState(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const updateItemQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) return;
    const newItems = [...formState.items];
    newItems[index].Quantity = quantity;
    setFormState(prev => ({ ...prev, items: newItems }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formState.customerName.trim()) {
      newErrors.customerName = "Vui lòng nhập tên khách hàng";
    }

    if (!formState.customerPhone.trim()) {
      newErrors.customerPhone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(formState.customerPhone)) {
      newErrors.customerPhone = "Số điện thoại không hợp lệ";
    }

    if (formState.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.customerEmail)) {
      newErrors.customerEmail = "Email không hợp lệ";
    }

    if (!formState.shippingAddress.trim()) {
      newErrors.shippingAddress = "Vui lòng nhập địa chỉ giao hàng";
    }

    if (formState.items.length === 0) {
      newErrors.items = "Vui lòng thêm ít nhất 1 sản phẩm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedOrder(null);
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setIsEditing(true);
    setIsCreating(true);

    // Handle both PascalCase and camelCase
    const userId = getOrderField(order, 'UserId', 'userId', 0);
    const customerName = getOrderField(order, 'CustomerName', 'customerName', '');
    const customerPhone = getOrderField(order, 'CustomerPhone', 'customerPhone', '');
    const customerEmail = getOrderField(order, 'CustomerEmail', 'customerEmail', '');
    const shippingAddress = getOrderField(order, 'ShippingAddress', 'shippingAddress', '');
    const note = getOrderField(order, 'Note', 'note', '');
    const items = getOrderField(order, 'Items', 'items', []);

    setFormState({
      userId: userId,
      customerName: customerName,
      customerPhone: customerPhone,
      customerEmail: customerEmail,
      shippingAddress: shippingAddress,
      note: note,
      items: items.map((item: any) => ({
        ProductId: item.ProductId || item.productId || 0,
        ProductName: item.ProductName || item.productName || '',
        Price: item.Price || item.price || 0,
        Quantity: item.Quantity || item.quantity || 1,
      })),
    });
    setShowDetail(false);
  };

  const handleReset = () => {
    setSelectedOrder(null);
    setIsEditing(false);
    setIsCreating(false);
    setFormState(initialFormState);
    setItemForm(initialItemForm);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      // Get existing order fields with case handling
      const existingId = selectedOrder ? getOrderField(selectedOrder, 'Id', 'id', 0) : 0;
      const existingStatus = selectedOrder ? getOrderField(selectedOrder, 'Status', 'status', 'Pending') : 'Pending';
      const existingCreatedAt = selectedOrder ? getOrderField(selectedOrder, 'CreatedAt', 'createdAt', new Date().toISOString()) : new Date().toISOString();
      const existingItems = selectedOrder ? getOrderField(selectedOrder, 'Items', 'items', []) : [];

      // Build Order object matching C# backend model exactly
      const orderData: Order = {
        Id: isEditing ? existingId : 0,
        UserId: formState.userId || 0,
        CustomerName: formState.customerName,
        CustomerPhone: formState.customerPhone,
        CustomerEmail: formState.customerEmail || "",
        ShippingAddress: formState.shippingAddress,
        TotalAmount: formTotal,
        Status: isEditing ? existingStatus : "Pending",
        Note: formState.note || null,
        CreatedAt: isEditing ? existingCreatedAt : new Date().toISOString(),
        Items: formState.items.map((item, index) => {
          const existingItem = existingItems[index];
          const existingItemId = existingItem ? (existingItem.Id || existingItem.id || 0) : 0;

          return {
            Id: isEditing ? existingItemId : 0,
            OrderId: isEditing ? existingId : 0,
            ProductId: item.ProductId,
            ProductName: item.ProductName,
            Price: item.Price,
            Quantity: item.Quantity,
            Amount: item.Price * item.Quantity,
          };
        }),
      };

      console.log("Submitting order:", orderData);

      if (isEditing && selectedOrder) {
        await orderApi.update(orderData);
      } else {
        await orderApi.create(orderData);
      }

      await reloadOrders();
      handleReset();
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Lỗi khi lưu đơn hàng. Vui lòng kiểm tra console.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    const statusConfig = ORDER_STATUS_CONFIG[newStatus];
    if (!window.confirm(`Chuyển trạng thái đơn hàng sang "${statusConfig?.label || newStatus}"?`)) {
      return;
    }

    try {
      setLoading(true);
      await orderApi.updateStatus(orderId, newStatus);
      await reloadOrders();

      // Update selected order if viewing detail
      const selectedId = selectedOrder ? getOrderField(selectedOrder, 'Id', 'id', 0) : 0;
      if (selectedId === orderId) {
        const updated = await orderApi.getById(orderId);
        setSelectedOrder(updated);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      try {
        setLoading(true);
        await orderApi.delete(id);
        await reloadOrders();

        const selectedId = selectedOrder ? getOrderField(selectedOrder, 'Id', 'id', 0) : 0;
        if (selectedId === id) {
          handleCloseDetail();
        }
      } catch (error) {
        console.error("Error deleting order:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Helpers
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
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

  const getStatusBadge = (status: string) => {
    const config = ORDER_STATUS_CONFIG[status] || {
      label: status,
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
      icon: '📋',
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
        <span>{config.icon}</span>
        {config.label}
      </span>
    );
  };
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ STATS SECTION ============ */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3">
          <p className="text-2xl font-bold text-gray-800 dark:text-white/90">{stats.total}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tổng đơn</p>
        </div>
        <div className="rounded-xl border border-warning-200 bg-warning-50 p-4 dark:border-warning-800 dark:bg-warning-500/10">
          <p className="text-2xl font-bold text-warning-700 dark:text-warning-400">{stats.pending}</p>
          <p className="text-sm text-warning-600 dark:text-warning-500">Chờ xử lý</p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-500/10">
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{stats.processing}</p>
          <p className="text-sm text-blue-600 dark:text-blue-500">Đang xử lý</p>
        </div>
        <div className="rounded-xl border border-success-200 bg-success-50 p-4 dark:border-success-800 dark:bg-success-500/10">
          <p className="text-2xl font-bold text-success-700 dark:text-success-400">{stats.completed}</p>
          <p className="text-sm text-success-600 dark:text-success-500">Hoàn thành</p>
        </div>
        <div className="rounded-xl border border-error-200 bg-error-50 p-4 dark:border-error-800 dark:bg-error-500/10">
          <p className="text-2xl font-bold text-error-700 dark:text-error-400">{stats.cancelled}</p>
          <p className="text-sm text-error-600 dark:text-error-500">Đã hủy</p>
        </div>
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-800 dark:bg-brand-500/10">
          <p className="text-xl font-bold text-brand-700 dark:text-brand-400">{formatCurrency(stats.totalRevenue)}</p>
          <p className="text-sm text-brand-600 dark:text-brand-500">Doanh thu</p>
        </div>
      </div>

      {/* ============ CREATE ORDER FORM ============ */}
      {isCreating && (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                {isEditing ? "✏️ Cập nhật đơn hàng" : "➕ Tạo đơn hàng mới"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {isEditing ? `Đơn hàng #${getOrderField(selectedOrder, 'Id', 'id', '')}` : "Điền thông tin đơn hàng"}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <XIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5">
            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              <div>
                <Label>Tên khách hàng <span className="text-error-500">*</span></Label>
                <Input
                  name="customerName"
                  type="text"
                  placeholder="Nhập tên khách hàng"
                  value={formState.customerName}
                  onChange={handleChange}
                  error={!!errors.customerName}
                  hint={errors.customerName}
                />
              </div>
              <div>
                <Label>Số điện thoại <span className="text-error-500">*</span></Label>
                <Input
                  name="customerPhone"
                  type="tel"
                  placeholder="0912345678"
                  value={formState.customerPhone}
                  onChange={handleChange}
                  error={!!errors.customerPhone}
                  hint={errors.customerPhone}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  name="customerEmail"
                  type="email"
                  placeholder="email@example.com"
                  value={formState.customerEmail}
                  onChange={handleChange}
                  error={!!errors.customerEmail}
                  hint={errors.customerEmail}
                />
              </div>
              <div className="lg:col-span-2">
                <Label>Địa chỉ giao hàng <span className="text-error-500">*</span></Label>
                <Input
                  name="shippingAddress"
                  type="text"
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                  value={formState.shippingAddress}
                  onChange={handleChange}
                  error={!!errors.shippingAddress}
                  hint={errors.shippingAddress}
                />
              </div>
              <div>
                <Label>Ghi chú</Label>
                <Input
                  name="note"
                  type="text"
                  placeholder="Ghi chú đơn hàng"
                  value={formState.note}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Add Item */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-5 mb-4">
              <h4 className="font-medium text-gray-800 dark:text-white/90 mb-3">Sản phẩm</h4>
              <div className="flex flex-wrap gap-3 items-end">
                <div className="flex-1 min-w-[200px]">
                  <select
                    value={itemForm.ProductId}
                    onChange={handleProductSelect}
                    className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
                  >
                    <option value={0}>-- Chọn sản phẩm --</option>
                    {products.map((p: Product) => (
                      <option key={p.id} value={p.id}>
                        {p.name} - {formatCurrency(p.salePrice > 0 ? p.salePrice : p.price)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-24">
                  <Input
                    name="Quantity"
                    type="number"
                    min="1"
                    placeholder="SL"
                    value={itemForm.Quantity}
                    onChange={handleItemChange}
                  />
                </div>
                <button
                  type="button"
                  onClick={addItem}
                  disabled={itemForm.ProductId === 0}
                  className="h-11 px-4 bg-brand-500 text-white rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
              {errors.items && (
                <p className="mt-2 text-xs text-error-500">{errors.items}</p>
              )}
            </div>

            {/* Items List */}
            {formState.items.length > 0 && (
              <div className="border rounded-lg overflow-hidden mb-6">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Sản phẩm</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Đơn giá</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">SL</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Thành tiền</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">Xóa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {formState.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-white/90">{item.ProductName}</td>
                        <td className="px-4 py-3 text-sm text-right dark:text-white/90">{formatCurrency(item.Price)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1 dark:text-white/90">
                            <button type="button" onClick={() => updateItemQuantity(index, item.Quantity - 1)} className="w-6 h-6 rounded border text-gray-600 hover:bg-gray-100">−</button>
                            <span className="w-8 text-center">{item.Quantity}</span>
                            <button type="button" onClick={() => updateItemQuantity(index, item.Quantity + 1)} className="w-6 h-6 rounded border text-gray-600 hover:bg-gray-100">+</button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-medium text-brand-600">{formatCurrency(item.Price * item.Quantity)}</td>
                        <td className="px-4 py-3 text-center">
                          <button type="button" onClick={() => removeItem(index)} className="text-error-500 hover:text-error-700">
                            <TrashBinIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-right font-semibold dark:text-white/90">Tổng cộng:</td>
                      <td className="px-4 py-3 text-right font-bold text-lg text-brand-600">{formatCurrency(formTotal)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50"
              >
                {isEditing ? <PencilIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                {loading ? "Đang xử lý..." : isEditing ? "Cập nhật" : "Tạo đơn hàng"}
              </button>
              <button type="button" onClick={handleReset} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============ TABLE SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                📦 Danh sách đơn hàng
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {filteredOrders.length} đơn hàng
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {!isCreating && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
                >
                  <PlusIcon className="w-4 h-4" />
                  Tạo đơn hàng
                </button>
              )}

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
              >
                <option value="">Tất cả trạng thái</option>
                {ALL_STATUSES.map(status => (
                  <option key={status} value={status}>
                    {ORDER_STATUS_CONFIG[status]?.icon} {ORDER_STATUS_CONFIG[status]?.label || status}
                  </option>
                ))}
              </select>

              <div className="w-64">
                <Input
                  type="text"
                  placeholder="🔍 Tìm theo tên, SĐT, mã đơn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã đơn</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày tạo</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-500">Đang tải...</td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center">
                    <span className="text-4xl">📭</span>
                    <p className="mt-2 text-gray-500">Không có đơn hàng nào</p>
                  </td>
                </tr>
              ) : (
                              filteredOrders.map(order => {
                  const orderId = getOrderField(order, 'Id', 'id', 0);
                  const customerName = getOrderField(order, 'CustomerName', 'customerName', '');
                  const customerPhone = getOrderField(order, 'CustomerPhone', 'customerPhone', '');
                  const totalAmount = getOrderField(order, 'TotalAmount', 'totalAmount', 0);
                  const status = getOrderField(order, 'Status', 'status', 'Pending');
                  const createdAt = getOrderField(order, 'CreatedAt', 'createdAt', '');
                  const items = getOrderField(order, 'Items', 'items', []);

                  return (
                  <tr
                    key={orderId}
                    onClick={() => handleViewDetail(order)}
                    className="hover:bg-gray-50 dark:hover:bg-white/2 cursor-pointer"
                  >
                    <td className="px-4 py-4">
                      <span className="font-mono font-medium text-brand-600">#{orderId}</span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-800 dark:text-white/90">{customerName}</p>
                      <p className="text-xs text-gray-500">{customerPhone}</p>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium">
                        {items?.length || 0}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-semibold text-gray-800 dark:text-white/90">
                        {formatCurrency(totalAmount)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {getStatusBadge(status)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(createdAt)}
                    </td>
                    <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(orderId)}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg dark:hover:bg-error-500/10"
                        title="Xóa đơn hàng"
                      >
                        <TrashBinIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============ DETAIL MODAL ============ */}
      {showDetail && selectedOrder && (() => {
        // Extract fields with case handling
        const orderId = getOrderField(selectedOrder, 'Id', 'id', 0);
        const customerName = getOrderField(selectedOrder, 'CustomerName', 'customerName', '');
        const customerPhone = getOrderField(selectedOrder, 'CustomerPhone', 'customerPhone', '');
        const customerEmail = getOrderField(selectedOrder, 'CustomerEmail', 'customerEmail', '');
        const shippingAddress = getOrderField(selectedOrder, 'ShippingAddress', 'shippingAddress', '');
        const note = getOrderField(selectedOrder, 'Note', 'note', '');
        const status = getOrderField(selectedOrder, 'Status', 'status', 'Pending');
        const createdAt = getOrderField(selectedOrder, 'CreatedAt', 'createdAt', '');
        const totalAmount = getOrderField(selectedOrder, 'TotalAmount', 'totalAmount', 0);
        const items = getOrderField(selectedOrder, 'Items', 'items', []);

        return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleCloseDetail}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  Đơn hàng #{orderId}
                </h3>
                <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(status)}
                <button onClick={handleCloseDetail} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <XIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Khách hàng</p>
                  <p className="font-medium text-gray-800 dark:text-white/90">{customerName}</p>
                  <p className="text-sm text-gray-600">{customerPhone}</p>
                  {customerEmail && (
                    <p className="text-sm text-gray-600">{customerEmail}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Địa chỉ giao hàng</p>
                  <p className="text-sm text-gray-800 dark:text-white/90">{shippingAddress}</p>
                </div>
              </div>

              {note && (
                <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase mb-1">Ghi chú</p>
                  <p className="text-sm text-gray-800 dark:text-white/90">{note}</p>
                </div>
              )}

              {/* Order Items */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Sản phẩm</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Đơn giá</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">SL</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {items?.map((item: any) => {
                      const itemId = item.Id || item.id || Math.random();
                      const productName = item.ProductName || item.productName || '';
                      const price = item.Price || item.price || 0;
                      const quantity = item.Quantity || item.quantity || 0;
                      const amount = item.Amount || item.amount || (price * quantity);

                      return (
                      <tr key={itemId}>
                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-white/90">{productName}</td>
                        <td className="px-4 py-3 text-sm text-right">{formatCurrency(price)}</td>
                        <td className="px-4 py-3 text-sm text-center">{quantity}</td>
                        <td className="px-4 py-3 text-sm text-right font-medium">{formatCurrency(amount)}</td>
                      </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-right font-semibold dark:text-white/90">Tổng cộng:</td>
                      <td className="px-4 py-3 text-right font-bold text-lg text-brand-600">{formatCurrency(totalAmount)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Modal Footer - Status Actions */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Chuyển trạng thái:</span>
                  {(ORDER_STATUS_TRANSITIONS[status] || []).map((nextStatus: string) => (
                    <button
                      key={nextStatus}
                      onClick={() => handleStatusChange(orderId, nextStatus)}
                      disabled={loading}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        nextStatus === 'Cancelled'
                          ? 'bg-error-50 text-error-700 hover:bg-error-100 dark:bg-error-500/10 dark:text-error-400'
                          : 'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400'
                      }`}
                    >
                      {ORDER_STATUS_CONFIG[nextStatus]?.icon} {ORDER_STATUS_CONFIG[nextStatus]?.label || nextStatus}
                    </button>
                  ))}
                  {(!ORDER_STATUS_TRANSITIONS[status] || ORDER_STATUS_TRANSITIONS[status].length === 0) && (
                    <span className="text-sm text-gray-400">Không có thao tác</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(selectedOrder)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                  >
                    <PencilIcon className="w-4 h-4" />
                    Sửa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      })()}
    </div>
  );
}