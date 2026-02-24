"use client";

import React, { useState, useEffect, useCallback } from "react";
import Input from "@/app/components/cms/form/input/InputField";
import Label from "@/app/components/cms/form/Label";
import { TrashBinIcon } from "../../../icons";
import { contactRequestApi } from "@/app/lib/api/endpoints/contactRequest.api";
import {
  ContactRequestListItem,
  ContactRequestDetail,
  ContactRequestFilter,
  ContactDashboard,
  PagedResult,
  StatusLabels,
  StatusColors,
  WebsiteTypeLabels,
  BudgetLabels,
  TimelineLabels,
  HasWebsiteLabels,
  HasLogoLabels,
  ContentReadyLabels,
  HasDomainLabels,
  DesignStyleLabels,
  FeatureLabels,
  AddonLabels,
  STATUS_MAP_TO_NUMBER,
  STATUS_MAP_TO_STRING,
} from "@/app/types";

// ============ COMPONENT ============
export default function ContactRequestManagement() {
  const [loading, setLoading] = useState(false);
  const [pagedData, setPagedData] = useState<PagedResult<ContactRequestListItem>>({
    items: [],
    totalCount: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });
  const [dashboard, setDashboard] = useState<ContactDashboard | null>(null);
  const [filter, setFilter] = useState<ContactRequestFilter>({
    search: "",
    status: -1,
    websiteType: -1,
    budget: -1,
    page: 1,
    pageSize: 10,
    sortBy: "CreatedAt",
    sortDesc: true,
  });

  // Detail modal
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState<ContactRequestDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Update status
  const [editStatus, setEditStatus] = useState<number>(0);
  const [editNote, setEditNote] = useState("");
  const [statusSaving, setStatusSaving] = useState(false);

  //#region API CALLS
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await contactRequestApi.getAll(filter);
      setPagedData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const fetchDashboard = async () => {
    try {
      const data = await contactRequestApi.getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchDashboard();
  }, []);
  //#endregion

  //#region HANDLERS
  const handleFilterChange = (key: string, value: string | number) => {
    setFilter((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilter((prev) => ({ ...prev, page }));
  };

  const handleResetFilter = () => {
    setFilter({
      search: "",
      status: -1,
      websiteType: -1,
      budget: -1,
      page: 1,
      pageSize: 10,
      sortBy: "CreatedAt",
      sortDesc: true,
    });
  };

  const handleViewDetail = async (id: string) => {
    try {
      setDetailLoading(true);
      setShowDetail(true);
      const data = await contactRequestApi.getById(id);
      setDetail(data);
      setEditStatus(STATUS_MAP_TO_NUMBER[data.status] ?? 0);
      setEditNote(data.adminNote || "");
    } catch (error) {
      console.error("Error fetching detail:", error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setDetail(null);
  };

  const handleUpdateStatus = async () => {
    if (!detail) return;
    try {
      setStatusSaving(true);
      await contactRequestApi.updateStatus(detail.id, {
        status: editStatus,
        adminNote: editNote || undefined,
      });
      await fetchData();
      await fetchDashboard();
      setDetail((prev) =>
        prev
          ? {
              ...prev,
              status: STATUS_MAP_TO_STRING[editStatus] || "New",
              adminNote: editNote,
            }
          : null
      );
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setStatusSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa yêu cầu này?")) {
      try {
        setLoading(true);
        await contactRequestApi.delete(id);
        await fetchData();
        await fetchDashboard();
        if (detail?.id === id) handleCloseDetail();
      } catch (error) {
        console.error("Error deleting:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getLabel = (map: Record<string, string>, key: string | null | undefined) =>
    key ? map[key] || key : "—";
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ DASHBOARD CARDS ============ */}
      {dashboard && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Tổng yêu cầu", value: dashboard.totalRequests, bg: "bg-gray-50 dark:bg-gray-800/50" },
            { label: "Mới hôm nay", value: dashboard.newToday, bg: "bg-blue-50 dark:bg-blue-500/10" },
            { label: "Chờ xử lý", value: dashboard.pending, bg: "bg-yellow-50 dark:bg-yellow-500/10" },
            { label: "Đã liên hệ", value: dashboard.contacted, bg: "bg-cyan-50 dark:bg-cyan-500/10" },
            { label: "Hoàn thành", value: dashboard.completed, bg: "bg-green-50 dark:bg-green-500/10" },
          ].map((card) => (
            <div
              key={card.label}
              className={`rounded-xl border border-gray-200 dark:border-gray-800 p-4 ${card.bg}`}
            >
              <p className="text-2xl font-bold text-gray-800 dark:text-white/90">{card.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{card.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* ============ TABLE SECTION (giống BannerManagement) ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Table Header + Filters */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Danh sách yêu cầu báo giá
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Tổng: {pagedData.totalCount} yêu cầu
              </p>
            </div>
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <Input
                type="text"
                placeholder="Tìm tên, SĐT, email..."
                value={filter.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
            <div>
              <select
                value={filter.status ?? -1}
                onChange={(e) => handleFilterChange("status", parseInt(e.target.value))}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              >
                <option value={-1}>— Trạng thái —</option>
                {Object.entries(StatusLabels).map(([key, val]) => (
                  <option key={key} value={STATUS_MAP_TO_NUMBER[key]}>{val}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={filter.websiteType ?? -1}
                onChange={(e) => handleFilterChange("websiteType", parseInt(e.target.value))}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              >
                <option value={-1}>— Loại website —</option>
                {Object.entries(WebsiteTypeLabels).map(([key, val], i) => (
                  <option key={key} value={i}>{val}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={filter.budget ?? -1}
                onChange={(e) => handleFilterChange("budget", parseInt(e.target.value))}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              >
                <option value={-1}>— Ngân sách —</option>
                {Object.entries(BudgetLabels).map(([key, val], i) => (
                  <option key={key} value={i}>{val}</option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={handleResetFilter}
                className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Khách hàng</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Loại web</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Ngành nghề</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Ngân sách</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Timeline</span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Trạng thái</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Ngày gửi</span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Xóa</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading && pagedData.items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </td>
                </tr>
              ) : pagedData.items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="text-gray-500 dark:text-gray-400">Không có yêu cầu nào</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pagedData.items.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleViewDetail(item.id)}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-white/2 cursor-pointer"
                  >
                    {/* Khách hàng */}
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-800 dark:text-white/90">{item.fullName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.phone}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{item.email}</p>
                      {item.company && (
                        <p className="text-xs text-brand-500 mt-0.5">{item.company}</p>
                      )}
                    </td>

                    {/* Loại web */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {getLabel(WebsiteTypeLabels, item.websiteType)}
                      </span>
                    </td>

                    {/* Ngành */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.industry}</span>
                    </td>

                    {/* Ngân sách */}
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {getLabel(BudgetLabels, item.budget)}
                      </span>
                    </td>

                    {/* Timeline */}
                    <td className="px-4 py-4">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {getLabel(TimelineLabels, item.timeline)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          StatusColors[item.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {getLabel(StatusLabels, item.status)}
                      </span>
                    </td>

                    {/* Ngày gửi */}
                    <td className="px-4 py-4">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(item.createdAt)}
                      </span>
                    </td>

                    {/* Delete */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        disabled={loading}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
                        title="Xóa"
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

        {/* Pagination */}
        {pagedData.totalPages > 1 && (
          <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Trang {pagedData.page} / {pagedData.totalPages} ({pagedData.totalCount} kết quả)
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(pagedData.page - 1)}
                disabled={pagedData.page <= 1}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ‹ Trước
              </button>
              {Array.from({ length: Math.min(pagedData.totalPages, 5) }, (_, i) => {
                const start = Math.max(1, pagedData.page - 2);
                const pageNum = start + i;
                if (pageNum > pagedData.totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1.5 text-sm rounded-lg border ${
                      pageNum === pagedData.page
                        ? "bg-brand-500 text-white border-brand-500"
                        : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(pagedData.page + 1)}
                disabled={pagedData.page >= pagedData.totalPages}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Sau ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============ DETAIL MODAL ============ */}
      {showDetail && (
        <div className="fixed inset-0 z-999 flex items-start justify-center pt-28 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50" onClick={handleCloseDetail} />

          <div className="relative w-full max-w-3xl mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-10">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Chi tiết yêu cầu
              </h3>
              <button
                onClick={handleCloseDetail}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-500 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto space-y-6">
              {detailLoading ? (
                <div className="py-20 text-center text-gray-500 dark:text-gray-400">Đang tải chi tiết...</div>
              ) : detail ? (
                <>
                  {/* Status Badge */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                        StatusColors[detail.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {getLabel(StatusLabels, detail.status)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Gửi lúc: {formatDate(detail.createdAt)}
                    </span>
                    {detail.contactedAt && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        | Liên hệ: {formatDate(detail.contactedAt)}
                      </span>
                    )}
                  </div>

                  {/* Section 1: Liên hệ */}
                  <DetailSection title="Thông tin liên hệ">
                    <DetailRow label="Họ tên" value={detail.fullName} />
                    <DetailRow label="SĐT" value={detail.phone} />
                    <DetailRow label="Email" value={detail.email} />
                    <DetailRow label="Công ty" value={detail.company} />
                    <DetailRow label="Chức vụ" value={detail.position} />
                    <DetailRow label="Thành phố" value={detail.city} />
                    <DetailRow label="Nguồn" value={detail.source} />
                  </DetailSection>

                  {/* Section 2: Loại web */}
                  <DetailSection title="Loại hình website">
                    <DetailRow label="Loại website" value={getLabel(WebsiteTypeLabels, detail.websiteType)} />
                    {detail.otherTypeDescription && <DetailRow label="Mô tả khác" value={detail.otherTypeDescription} />}
                    <DetailRow label="Ngành nghề" value={detail.industry} />
                    <DetailRow label="Đã có website" value={getLabel(HasWebsiteLabels, detail.hasWebsite)} />
                    {detail.currentUrl && (
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">URL hiện tại</p>
                        <a href={detail.currentUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-500 hover:underline break-all">
                          {detail.currentUrl}
                        </a>
                      </div>
                    )}
                    {detail.currentIssue && <DetailRow label="Vấn đề hiện tại" value={detail.currentIssue} full />}
                  </DetailSection>

                  {/* Section 3: Tính năng */}
                  <DetailSection title="Tính năng yêu cầu">
                    <DetailRow label="Ngôn ngữ" value={detail.language} />
                    <DetailRow label="Số trang dự kiến" value={detail.pageCount} />
                    {detail.features.length > 0 && (
                      <DetailTags label="Tính năng" items={detail.features} map={FeatureLabels} />
                    )}
                    {detail.specialRequirements && <DetailRow label="Yêu cầu đặc biệt" value={detail.specialRequirements} full />}
                  </DetailSection>

                  {/* Section 4: Thiết kế */}
                  <DetailSection title="Thương hiệu & Thiết kế">
                    <DetailRow label="Logo" value={getLabel(HasLogoLabels, detail.hasLogo)} />
                    {detail.brandColor && (
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Màu chủ đạo</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="w-5 h-5 rounded border border-gray-300 dark:border-gray-600 inline-block" style={{ backgroundColor: detail.brandColor }} />
                          <span className="text-sm text-gray-800 dark:text-white/90">{detail.brandColor}</span>
                        </div>
                      </div>
                    )}
                    {detail.designStyles.length > 0 && <DetailTags label="Phong cách" items={detail.designStyles} map={DesignStyleLabels} />}
                    <DetailRow label="Nội dung sẵn có" value={getLabel(ContentReadyLabels, detail.contentReady)} />
                    <DetailRow label="Tên miền" value={getLabel(HasDomainLabels, detail.hasDomain)} />
                    {detail.referenceWebsites.length > 0 && (
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Website tham khảo</p>
                        <div className="space-y-1.5">
                          {detail.referenceWebsites.map((ref, i) => (
                            <div key={i} className="text-sm">
                              <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">
                                {ref.url}
                              </a>
                              {ref.reason && <span className="text-gray-500 dark:text-gray-400 ml-2">— {ref.reason}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </DetailSection>

                  {/* Section 5: Ngân sách */}
                  <DetailSection title="Ngân sách & Tiến độ">
                    <DetailRow label="Ngân sách" value={getLabel(BudgetLabels, detail.budget)} />
                    <DetailRow label="Timeline" value={getLabel(TimelineLabels, detail.timeline)} />
                    <DetailRow label="Thanh toán" value={detail.paymentMethod} />
                    {detail.addons.length > 0 && <DetailTags label="Dịch vụ bổ sung" items={detail.addons} map={AddonLabels} />}
                    {detail.notes && <DetailRow label="Ghi chú KH" value={detail.notes} full />}
                  </DetailSection>

                  {/* ===== UPDATE STATUS FORM ===== */}
                  <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-3">
                      Cập nhật trạng thái
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label>Trạng thái</Label>
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(parseInt(e.target.value))}
                          className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-brand-500"
                        >
                          {Object.entries(StatusLabels).map(([key, val]) => (
                            <option key={key} value={STATUS_MAP_TO_NUMBER[key]}>{val}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label>Ghi chú nội bộ</Label>
                        <input
                          type="text"
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          placeholder="Ghi chú cho team..."
                          className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={handleUpdateStatus}
                        disabled={statusSaving}
                        className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50"
                      >
                        {statusSaving ? "Đang lưu..." : "Lưu trạng thái"}
                      </button>
                      {detail.adminNote && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Note hiện tại: <span className="text-gray-700 dark:text-gray-300">{detail.adminNote}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-20 text-center text-gray-500 dark:text-gray-400">Không tìm thấy dữ liệu</div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
              <button
                onClick={handleCloseDetail}
                className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================
// SUB-COMPONENTS
// =====================================================
function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-3">{title}</h4>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">{children}</div>
    </div>
  );
}

function DetailRow({ label, value, full }: { label: string; value: string | null | undefined; full?: boolean }) {
  if (!value) return null;
  return (
    <div className={full ? "col-span-2" : ""}>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm text-gray-800 dark:text-white/90">{value}</p>
    </div>
  );
}

function DetailTags({ label, items, map }: { label: string; items: string[]; map: Record<string, string> }) {
  return (
    <div className="col-span-2">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300">
            {map[item] || item}
          </span>
        ))}
      </div>
    </div>
  );
}