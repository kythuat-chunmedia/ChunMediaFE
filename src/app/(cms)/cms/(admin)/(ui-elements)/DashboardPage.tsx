"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ORDER_STATUS_CONFIG } from "@/app/types";
import {
  orderApi,
  productApi,
  userManagementApi,
  contactApi,
  newApi,
  bannerApi,
  categoryProductApi,
  categoryNewApi,
  menuApi,
} from "@/app/lib/api/index";

// ============ HELPER: Get field (handles both PascalCase and camelCase) ============
const getField = (obj: any, pascalKey: string, camelKey: string, defaultValue: any = "") => {
  if (!obj) return defaultValue;
  return obj[pascalKey] ?? obj[camelKey] ?? defaultValue;
};

// ============ ICONS ============
const TrendUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TrendDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const RefreshIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

// ============ COMPONENT ============
export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Data states
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryNews, setCategoryNews] = useState<any[]>([]);
  const [menus, setMenus] = useState<any[]>([]);

  //#region FETCH DATA
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const results = await Promise.allSettled([
        orderApi?.getAllNoPaging?.() || Promise.resolve([]),
        productApi?.getAllNoPaging?.() || Promise.resolve([]),
        userManagementApi?.getAllNoPaging?.() || Promise.resolve([]),
        contactApi?.getAllNoPaging?.() || Promise.resolve([]),
        newApi?.getAllNoPaging?.() || Promise.resolve([]),
        bannerApi?.getAllNoPaging?.() || Promise.resolve([]),
        categoryProductApi?.getAllNoPaging?.() || Promise.resolve([]),
        categoryNewApi?.getAllNoPaging?.() || Promise.resolve([]),
        menuApi?.getAllNoPaging?.() || Promise.resolve([]),
      ]);

      if (results[0].status === 'fulfilled') setOrders(results[0].value || []);
      if (results[1].status === 'fulfilled') setProducts(results[1].value || []);
      if (results[2].status === 'fulfilled') setUsers(results[2].value || []);
      if (results[3].status === 'fulfilled') setContacts(results[3].value || []);
      if (results[4].status === 'fulfilled') setNews(results[4].value || []);
      if (results[5].status === 'fulfilled') setBanners(results[5].value || []);
      if (results[6].status === 'fulfilled') setCategories(results[6].value || []);
      if (results[7].status === 'fulfilled') setCategoryNews(results[7].value || []);
      if (results[8].status === 'fulfilled') setMenus(results[8].value || []);

      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => fetchAllData(true);
  //#endregion

  //#region COMPUTED STATS
  const orderStats = useMemo(() => {
    const getStatus = (o: any) => getField(o, 'Status', 'status', '');
    const getAmount = (o: any) => getField(o, 'TotalAmount', 'totalAmount', 0);
    const getDate = (o: any) => getField(o, 'CreatedAt', 'createdAt', '');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thisWeek = new Date(today);
    thisWeek.setDate(today.getDate() - today.getDay());

    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    const todayOrders = orders.filter(o => new Date(getDate(o)) >= today);
    const thisWeekOrders = orders.filter(o => new Date(getDate(o)) >= thisWeek);
    const thisMonthOrders = orders.filter(o => new Date(getDate(o)) >= thisMonth);
    const lastMonthOrders = orders.filter(o => {
      const date = new Date(getDate(o));
      return date >= lastMonth && date <= lastMonthEnd;
    });

    const pending = orders.filter(o => getStatus(o) === 'Pending').length;
    const processing = orders.filter(o => ['Confirmed', 'Processing', 'Shipping'].includes(getStatus(o))).length;
    const completed = orders.filter(o => getStatus(o) === 'Delivered').length;
    const cancelled = orders.filter(o => ['Cancelled', 'Refunded'].includes(getStatus(o))).length;

    const totalRevenue = orders.filter(o => getStatus(o) === 'Delivered').reduce((sum, o) => sum + getAmount(o), 0);
    const todayRevenue = todayOrders.filter(o => getStatus(o) === 'Delivered').reduce((sum, o) => sum + getAmount(o), 0);
    const thisMonthRevenue = thisMonthOrders.filter(o => getStatus(o) === 'Delivered').reduce((sum, o) => sum + getAmount(o), 0);
    const lastMonthRevenue = lastMonthOrders.filter(o => getStatus(o) === 'Delivered').reduce((sum, o) => sum + getAmount(o), 0);

    const revenueGrowth = lastMonthRevenue > 0
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100)
      : (thisMonthRevenue > 0 ? 100 : 0);

    return {
      total: orders.length, pending, processing, completed, cancelled,
      todayCount: todayOrders.length, thisWeekCount: thisWeekOrders.length, thisMonthCount: thisMonthOrders.length,
      totalRevenue, todayRevenue, thisMonthRevenue, lastMonthRevenue,
      revenueGrowth: parseFloat(revenueGrowth.toFixed(1)),
    };
  }, [orders]);

  const productStats = useMemo(() => {
    const getActive = (p: any) => getField(p, 'IsActive', 'isActive', false);
    const getQuantity = (p: any) => getField(p, 'Quantity', 'quantity', 0);

    const active = products.filter(p => getActive(p)).length;
    const outOfStock = products.filter(p => getQuantity(p) === 0).length;
    const lowStock = products.filter(p => { const qty = getQuantity(p); return qty > 0 && qty <= 10; }).length;

    return { total: products.length, active, outOfStock, lowStock };
  }, [products]);

  const userStats = useMemo(() => {
    const getActive = (u: any) => getField(u, 'IsActive', 'isActive', false);
    return { total: users.length, active: users.filter(u => getActive(u)).length };
  }, [users]);

  const contactStats = useMemo(() => {
    const getRead = (c: any) => getField(c, 'IsRead', 'isRead', false);
    return { total: contacts.length, unread: contacts.filter(c => !getRead(c)).length };
  }, [contacts]);

  const newsStats = useMemo(() => {
    const getActive = (n: any) => getField(n, 'IsActive', 'isActive', false);
    const getViews = (n: any) => getField(n, 'View', 'view', 0);
    return {
      total: news.length,
      active: news.filter(n => getActive(n)).length,
      totalViews: news.reduce((sum, n) => sum + getViews(n), 0)
    };
  }, [news]);

  const bannerStats = useMemo(() => {
    const getActive = (b: any) => getField(b, 'IsActive', 'isActive', false);
    return { total: banners.length, active: banners.filter(b => getActive(b)).length };
  }, [banners]);

  // Recent orders (last 5)
  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(getField(b, 'CreatedAt', 'createdAt', '')).getTime() - new Date(getField(a, 'CreatedAt', 'createdAt', '')).getTime())
      .slice(0, 5);
  }, [orders]);

  // Recent contacts (unread first)
  const recentContacts = useMemo(() => {
    return [...contacts]
      .sort((a, b) => {
        const readA = getField(a, 'IsRead', 'isRead', false);
        const readB = getField(b, 'IsRead', 'isRead', false);
        if (readA !== readB) return readA ? 1 : -1;
        return new Date(getField(b, 'CreatedAt', 'createdAt', '')).getTime() - new Date(getField(a, 'CreatedAt', 'createdAt', '')).getTime();
      })
      .slice(0, 5);
  }, [contacts]);

  // Top products by view
  const topProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => getField(b, 'View', 'view', 0) - getField(a, 'View', 'view', 0))
      .slice(0, 5);
  }, [products]);

  // Top news by view
  const topNews = useMemo(() => {
    return [...news]
      .sort((a, b) => getField(b, 'View', 'view', 0) - getField(a, 'View', 'view', 0))
      .slice(0, 5);
  }, [news]);
  //#endregion

  //#region HELPERS
  const formatCurrency = (value: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

  const formatNumber = (value: number) => {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
    if (value >= 1000) return (value / 1000).toFixed(1) + "K";
    return value.toString();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  };

  const getStatusBadge = (status: string) => {
    const config = ORDER_STATUS_CONFIG?.[status] || { label: status || 'N/A', color: 'text-gray-700', bgColor: 'bg-gray-100', icon: '📋' };
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
        <span>{config.icon}</span>{config.label}
      </span>
    );
  };

  const timeAgo = (dateString: string) => {
    if (!dateString) return "";
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    if (seconds < 60) return "Vừa xong";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} ngày trước`;
    return formatDate(dateString);
  };
  //#endregion

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ============ HEADER ============ */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">📊 Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tổng quan hoạt động hệ thống</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Cập nhật: {lastUpdated.toLocaleTimeString("vi-VN")}</p>
          <button onClick={handleRefresh} disabled={refreshing} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
            <RefreshIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Đang tải...' : 'Làm mới'}
          </button>
        </div>
      </div>

      {/* ============ MAIN STATS CARDS ============ */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Revenue Card */}
        <div className="lg:col-span-2 rounded-2xl border border-brand-200 bg-linear-to-br from-brand-50 to-brand-100 p-5 dark:border-brand-800 dark:from-brand-500/10 dark:to-brand-500/5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center"><span className="text-xl">💰</span></div>
            {orderStats.revenueGrowth !== 0 && (
              <div className={`flex items-center gap-1 text-sm font-medium ${orderStats.revenueGrowth >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                {orderStats.revenueGrowth >= 0 ? <TrendUpIcon className="w-4 h-4" /> : <TrendDownIcon className="w-4 h-4" />}
                {Math.abs(orderStats.revenueGrowth)}%
              </div>
            )}
          </div>
          <p className="text-2xl font-bold text-brand-700 dark:text-brand-400">{formatCurrency(orderStats.totalRevenue)}</p>
          <p className="text-sm text-brand-600 dark:text-brand-500 mt-1">Tổng doanh thu</p>
          <div className="mt-3 pt-3 border-t border-brand-200 dark:border-brand-800 space-y-1">
            <div className="flex justify-between text-xs"><span className="text-gray-600 dark:text-gray-400">Hôm nay:</span><span className="font-medium text-brand-700 dark:text-brand-400">{formatCurrency(orderStats.todayRevenue)}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-600 dark:text-gray-400">Tháng này:</span><span className="font-medium text-brand-700 dark:text-brand-400">{formatCurrency(orderStats.thisMonthRevenue)}</span></div>
          </div>
        </div>

        {/* Orders Card */}
        <Link href="/cms/order" className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center dark:bg-blue-500/20 dark:text-blue-400"><span className="text-lg">📦</span></div>
            {orderStats.pending > 0 && <span className="w-6 h-6 rounded-full bg-warning-500 text-white text-xs flex items-center justify-center font-bold animate-pulse">{orderStats.pending}</span>}
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white/90">{orderStats.total}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Đơn hàng</p>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {orderStats.pending > 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-warning-100 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400">⏳ {orderStats.pending} chờ</span>}
            {orderStats.processing > 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">⚙️ {orderStats.processing}</span>}
          </div>
        </Link>

        {/* Products Card */}
        <Link href="/cms/product" className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center dark:bg-purple-500/20 dark:text-purple-400"><span className="text-lg">🛍️</span></div>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white/90">{productStats.total}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sản phẩm</p>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {productStats.outOfStock > 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-error-100 text-error-700 dark:bg-error-500/20 dark:text-error-400">❌ {productStats.outOfStock} hết</span>}
            {productStats.lowStock > 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-warning-100 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400">⚠️ {productStats.lowStock} sắp hết</span>}
          </div>
        </Link>

        {/* Users Card */}
        <Link href="/cms/user" className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 hover:border-green-300 dark:hover:border-green-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center dark:bg-green-500/20 dark:text-green-400"><span className="text-lg">👥</span></div>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white/90">{userStats.total}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Người dùng</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">✓ {userStats.active} active</span>
          </div>
        </Link>

        {/* Contacts Card */}
        <Link href="/cms/contact" className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${contactStats.unread > 0 ? 'bg-error-100 text-error-600 dark:bg-error-500/20 dark:text-error-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400'}`}><span className="text-lg">📬</span></div>
            {contactStats.unread > 0 && <span className="w-6 h-6 rounded-full bg-error-500 text-white text-xs flex items-center justify-center font-bold animate-pulse">{contactStats.unread}</span>}
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white/90">{contactStats.total}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Liên hệ</p>
          {contactStats.unread > 0 && <p className="text-xs text-error-600 dark:text-error-400 mt-3 font-medium">🔔 {contactStats.unread} chưa đọc</p>}
        </Link>
      </div>

      {/* ============ SECONDARY STATS ============ */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Link href="/cms/news" className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3 hover:border-brand-300 dark:hover:border-brand-700 transition-colors group">
          <div className="flex items-center gap-3"><span className="text-2xl group-hover:scale-110 transition-transform">📰</span><div><p className="text-lg font-bold text-gray-800 dark:text-white/90">{newsStats.total}</p><p className="text-xs text-gray-500">Tin tức</p></div></div>
        </Link>
        <Link href="/cms/product-category" className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3 hover:border-brand-300 dark:hover:border-brand-700 transition-colors group">
          <div className="flex items-center gap-3"><span className="text-2xl group-hover:scale-110 transition-transform">📁</span><div><p className="text-lg font-bold text-gray-800 dark:text-white/90">{categories.length}</p><p className="text-xs text-gray-500">DM Sản phẩm</p></div></div>
        </Link>
        <Link href="/cms/news-category" className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3 hover:border-brand-300 dark:hover:border-brand-700 transition-colors group">
          <div className="flex items-center gap-3"><span className="text-2xl group-hover:scale-110 transition-transform">📂</span><div><p className="text-lg font-bold text-gray-800 dark:text-white/90">{categoryNews.length}</p><p className="text-xs text-gray-500">DM Tin tức</p></div></div>
        </Link>
        <Link href="/cms/banner" className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3 hover:border-brand-300 dark:hover:border-brand-700 transition-colors group">
          <div className="flex items-center gap-3"><span className="text-2xl group-hover:scale-110 transition-transform">🖼️</span><div><p className="text-lg font-bold text-gray-800 dark:text-white/90">{bannerStats.total}</p><p className="text-xs text-gray-500">Banner</p></div></div>
        </Link>
        <Link href="/cms/menu" className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3 hover:border-brand-300 dark:hover:border-brand-700 transition-colors group">
          <div className="flex items-center gap-3"><span className="text-2xl group-hover:scale-110 transition-transform">📋</span><div><p className="text-lg font-bold text-gray-800 dark:text-white/90">{menus.length}</p><p className="text-xs text-gray-500">Menu</p></div></div>
        </Link>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center gap-3"><span className="text-2xl">👁️</span><div><p className="text-lg font-bold text-gray-800 dark:text-white/90">{formatNumber(newsStats.totalViews)}</p><p className="text-xs text-gray-500">Lượt xem</p></div></div>
        </div>
        <div className="rounded-xl border border-success-200 bg-success-50 p-4 dark:border-success-800 dark:bg-success-500/10">
          <div className="flex items-center gap-3"><span className="text-2xl">✅</span><div><p className="text-lg font-bold text-success-700 dark:text-success-400">{orderStats.completed}</p><p className="text-xs text-success-600 dark:text-success-500">Đã giao</p></div></div>
        </div>
        <div className="rounded-xl border border-error-200 bg-error-50 p-4 dark:border-error-800 dark:bg-error-500/10">
          <div className="flex items-center gap-3"><span className="text-2xl">❌</span><div><p className="text-lg font-bold text-error-700 dark:text-error-400">{orderStats.cancelled}</p><p className="text-xs text-error-600 dark:text-error-500">Đã hủy</p></div></div>
        </div>
      </div>

      {/* ============ MAIN CONTENT GRID ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 dark:text-white/90">📦 Đơn hàng gần đây</h3>
            <Link href="/cms/order" className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1">Xem tất cả <ArrowRightIcon className="w-4 h-4" /></Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã đơn</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {recentOrders.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500"><span className="text-4xl block mb-2">📭</span>Chưa có đơn hàng</td></tr>
                ) : (
                  recentOrders.map((order, i) => (
                    <tr key={getField(order, 'Id', 'id', i)} className="hover:bg-gray-50 dark:hover:bg-white/2">
                      <td className="px-4 py-3"><span className="font-mono font-medium text-brand-600">#{getField(order, 'Id', 'id', '')}</span></td>
                      <td className="px-4 py-3"><p className="font-medium text-gray-800 dark:text-white/90 text-sm">{getField(order, 'CustomerName', 'customerName', '')}</p><p className="text-xs text-gray-500">{getField(order, 'CustomerPhone', 'customerPhone', '')}</p></td>
                      <td className="px-4 py-3 text-right font-medium text-gray-800 dark:text-white/90">{formatCurrency(getField(order, 'TotalAmount', 'totalAmount', 0))}</td>
                      <td className="px-4 py-3 text-center">{getStatusBadge(getField(order, 'Status', 'status', ''))}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{timeAgo(getField(order, 'CreatedAt', 'createdAt', ''))}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 dark:text-white/90">📬 Liên hệ mới {contactStats.unread > 0 && <span className="ml-2 w-5 h-5 rounded-full bg-error-500 text-white text-xs inline-flex items-center justify-center">{contactStats.unread}</span>}</h3>
            <Link href="/cms/contact" className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1">Xem tất cả <ArrowRightIcon className="w-4 h-4" /></Link>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {recentContacts.length === 0 ? (
              <div className="px-5 py-8 text-center text-gray-500"><span className="text-4xl block mb-2">✅</span>Không có liên hệ mới</div>
            ) : (
              recentContacts.map((contact, i) => {
                const isRead = getField(contact, 'IsRead', 'isRead', false);
                return (
                  <div key={getField(contact, 'Id', 'id', i)} className={`px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/2 ${!isRead ? 'bg-brand-50/50 dark:bg-brand-500/5' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${!isRead ? 'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                        {getField(contact, 'Name', 'name', 'U').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`font-medium truncate ${!isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                            {getField(contact, 'Name', 'name', '')} {!isRead && <span className="ml-2 w-2 h-2 rounded-full bg-brand-500 inline-block"></span>}
                          </p>
                          <span className="text-xs text-gray-400 shrink-0">{timeAgo(getField(contact, 'CreatedAt', 'createdAt', ''))}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{getField(contact, 'Subject', 'subject', '') || getField(contact, 'Email', 'email', '')}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ============ BOTTOM GRID ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 dark:text-white/90">🏆 Sản phẩm nổi bật</h3>
            <Link href="/cms/product" className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1">Xem tất cả <ArrowRightIcon className="w-4 h-4" /></Link>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {topProducts.length === 0 ? (<div className="px-5 py-8 text-center text-gray-500"><span className="text-4xl block mb-2">🛍️</span>Chưa có sản phẩm</div>) : (
              topProducts.map((product, index) => {
                const rankColors = ['bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400', 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300', 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'];
                return (
                  <div key={getField(product, 'Id', 'id', index)} className="px-5 py-3 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-white/2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${rankColors[index] || 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500'}`}>{index + 1}</span>
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                      {getField(product, 'Image', 'image', '') ? <img src={getField(product, 'Image', 'image', '')} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">IMG</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 dark:text-white/90 truncate">{getField(product, 'Name', 'name', '')}</p>
                      <p className="text-sm text-brand-600 dark:text-brand-400">{formatCurrency(getField(product, 'SalePrice', 'salePrice', 0) || getField(product, 'Price', 'price', 0))}</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm shrink-0"><EyeIcon className="w-4 h-4" />{formatNumber(getField(product, 'View', 'view', 0))}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Top News */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 dark:text-white/90">📈 Tin tức nổi bật</h3>
            <Link href="/cms/news" className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1">Xem tất cả <ArrowRightIcon className="w-4 h-4" /></Link>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {topNews.length === 0 ? (<div className="px-5 py-8 text-center text-gray-500"><span className="text-4xl block mb-2">📰</span>Chưa có tin tức</div>) : (
              topNews.map((item, index) => {
                const rankColors = ['bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400', 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300', 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'];
                return (
                  <div key={getField(item, 'Id', 'id', index)} className="px-5 py-3 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-white/2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${rankColors[index] || 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500'}`}>{index + 1}</span>
                    <div className="w-16 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                      {getField(item, 'Image', 'image', '') ? <img src={'/news/' + getField(item, 'Image', 'image', '')} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">IMG</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 dark:text-white/90 truncate">{getField(item, 'Title', 'title', '')}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(getField(item, 'CreatedAt', 'createdAt', ''))}</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm shrink-0"><EyeIcon className="w-4 h-4" />{formatNumber(getField(item, 'View', 'view', 0))}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ============ QUICK ACTIONS ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold text-gray-800 dark:text-white/90">⚡ Thao tác nhanh</h3>
        </div>
        <div className="p-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { href: '/cms/order', icon: '📦', label: 'Tạo đơn hàng' },
            { href: '/cms/product', icon: '🛍️', label: 'Thêm sản phẩm' },
            { href: '/cms/news', icon: '📝', label: 'Viết tin tức' },
            { href: '/cms/banner', icon: '🖼️', label: 'Quản lý banner' },
            { href: '/cms/contact', icon: '📬', label: 'Xem liên hệ' },
            { href: '/cms/config-site', icon: '⚙️', label: 'Cấu hình' },
          ].map((action, i) => (
            <Link key={i} href={action.href} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-brand-300 hover:bg-brand-50 dark:border-gray-700 dark:hover:border-brand-700 dark:hover:bg-brand-500/10 transition-all hover:scale-105">
              <span className="text-3xl">{action.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}