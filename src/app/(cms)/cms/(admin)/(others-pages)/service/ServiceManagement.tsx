"use client";

import React, { useState, useEffect } from "react";
import Label from "@/app/components/cms/form/Label";
import Input from "@/app/components/cms/form/input/InputField";
import { Service, CreateServiceRequest, UpdateServiceRequest } from "@/app/types";
import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "../../../icons";
import { serviceApi } from "@/app/lib/api/index";
import { X, Plus } from "lucide-react";
import IconPicker from "@/app/components/shared/IconPicker";
import DynamicIcon from "@/app/components/shared/DynamicIcon";

// ============ TYPES ============
interface ServiceFeatureFormData {
  id: number;
  content: string;
  displayOrder: number;
  isActive: boolean;
}

interface ServiceFormData {
  id?: number;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  displayOrder: number;
  features: ServiceFeatureFormData[];
}

// ============ INITIAL FORM DATA ============
const initialFormData: ServiceFormData = {
  title: "",
  description: "",
  icon: "",
  isActive: true,
  displayOrder: 1,
  features: [],
};

// ============ COMPONENT ============
export default function ServiceManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await serviceApi.getAll();
      setServices(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadServices = async () => {
    try {
      const data = await serviceApi.getAll();
      setServices(data);
    } catch (error) {
      console.error("Error reloading services:", error);
    }
  };
  //#endregion

  //#region FEATURE HANDLERS
  const handleAddFeature = () => {
    const newFeature: ServiceFeatureFormData = {
      id: 0,
      content: "",
      displayOrder: formData.features.length + 1,
      isActive: true,
    };
    setFormData({
      ...formData,
      features: [...formData.features, newFeature],
    });
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    // Cập nhật lại displayOrder
    newFeatures.forEach((f, i) => {
      f.displayOrder = i + 1;
    });
    setFormData({ ...formData, features: newFeatures });
  };

  const handleFeatureChange = (index: number, field: string, value: any) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, features: newFeatures });
  };

  const moveFeature = (index: number, direction: "up" | "down") => {
    const newFeatures = [...formData.features];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= newFeatures.length) return;

    [newFeatures[index], newFeatures[newIndex]] = [newFeatures[newIndex], newFeatures[index]];

    // Cập nhật displayOrder
    newFeatures.forEach((f, i) => {
      f.displayOrder = i + 1;
    });

    setFormData({ ...formData, features: newFeatures });
  };
  //#endregion

  //#region FUNCTION HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let newValue: string | number | boolean = value;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      newValue = parseInt(value) || 0;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Vui lòng nhập tiêu đề";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Vui lòng nhập mô tả";
    }
    if (formData.displayOrder <= 0) {
      newErrors.displayOrder = "Thứ tự phải lớn hơn 0";
    }

    // Validate features
    formData.features.forEach((feature, index) => {
      if (!feature.content.trim()) {
        newErrors[`feature_${index}`] = "Nội dung tính năng không được trống";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Select row to edit
  const handleSelectRow = (service: Service) => {
    setSelectedId(service.id);
    setIsEditing(true);
    setFormData({
      id: service.id,
      title: service.title,
      description: service.description,
      icon: service.icon || "",
      isActive: service.isActive,
      displayOrder: service.displayOrder,
      features: service.features.map((f) => ({
        id: f.id,
        content: f.content,
        displayOrder: f.displayOrder,
        isActive: f.isActive,
      })),
    });
    setErrors({});

    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset form
  const handleReset = () => {
    setSelectedId(null);
    setIsEditing(false);
    setFormData(initialFormData);
    setErrors({});
  };

  // Submit form (Add/Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      if (isEditing && selectedId) {
        const updateData: UpdateServiceRequest = {
          id: selectedId,
          title: formData.title,
          description: formData.description,
          icon: formData.icon || undefined,
          isActive: formData.isActive,
          displayOrder: formData.displayOrder,
          features: formData.features,
        };
        await serviceApi.update(updateData);
      } else {
        const createData: CreateServiceRequest = {
          title: formData.title,
          description: formData.description,
          icon: formData.icon || undefined,
          isActive: formData.isActive,
          displayOrder: formData.displayOrder,
          features: formData.features.map(({ content, displayOrder, isActive }) => ({
            content,
            displayOrder,
            isActive,
          })),
        };
        await serviceApi.create(createData);
      }

      await reloadServices();
      handleReset();
      alert(isEditing ? "Cập nhật thành công!" : "Thêm mới thành công!");
    } catch (error) {
      console.error("Error saving service:", error);
      alert("Có lỗi xảy ra khi lưu!");
    } finally {
      setLoading(false);
    }
  };

  // Delete service
  const handleDelete = async (id: number) => {
    const service = services.find((s) => s.id === id);
    const featureCount = service?.features.length || 0;

    const confirmMsg =
      featureCount > 0
        ? `Bạn có chắc chắn muốn xóa service này và ${featureCount} tính năng của nó?`
        : "Bạn có chắc chắn muốn xóa service này?";

    if (window.confirm(confirmMsg)) {
      try {
        setLoading(true);
        await serviceApi.delete(id);
        await reloadServices();

        if (selectedId === id) {
          handleReset();
        }
        alert("Xóa thành công!");
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Có lỗi xảy ra khi xóa!");
      } finally {
        setLoading(false);
      }
    }
  };

  // Filter services by search
  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ FORM SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Form Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "✏️ Cập nhật Service" : "➕ Thêm Service mới"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing
              ? `Đang chỉnh sửa: ${formData.title}`
              : "Điền thông tin để thêm service mới"}
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Tiêu đề */}
            <div className="lg:col-span-2">
              <Label>
                Tiêu đề <span className="text-error-500">*</span>
              </Label>
              <Input
                name="title"
                type="text"
                placeholder="Nhập tiêu đề service"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                hint={errors.title || "Tên hiển thị của service"}
              />
            </div>

            {/* Icon Picker */}
            <div>
              <Label>Icon</Label>
              <IconPicker
                value={formData.icon}
                onChange={(iconName) =>
                  setFormData((prev) => ({ ...prev, icon: iconName }))
                }
                placeholder="Chọn icon..."
              />
              <p className="mt-1.5 text-xs text-gray-500">
                Chọn icon từ thư viện Lucide
              </p>
            </div>

            {/* Mô tả */}
            <div className="lg:col-span-3">
              <Label>
                Mô tả <span className="text-error-500">*</span>
              </Label>
              <textarea
                name="description"
                rows={3}
                placeholder="Nhập mô tả về service..."
                value={formData.description}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${
                  errors.description
                    ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
                    : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
                }`}
              />
              {errors.description ? (
                <p className="mt-1.5 text-xs text-error-500">{errors.description}</p>
              ) : (
                <p className="mt-1.5 text-xs text-gray-500">Mô tả chi tiết về service</p>
              )}
            </div>

            {/* Thứ tự */}
            <div>
              <Label>
                Thứ tự <span className="text-error-500">*</span>
              </Label>
              <Input
                name="displayOrder"
                type="number"
                placeholder="1"
                min="1"
                value={formData.displayOrder}
                onChange={handleChange}
                error={!!errors.displayOrder}
                hint={errors.displayOrder || "Thứ tự hiển thị"}
              />
            </div>

            {/* Trạng thái */}
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Hiển thị service
                </span>
              </label>
            </div>

            {/* Preview Icon */}
            {formData.icon && (
              <div className="flex items-center gap-3 pt-6">
                <span className="text-sm text-gray-500">Preview:</span>
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center dark:bg-brand-500/10">
                  <DynamicIcon
                    name={formData.icon}
                    className="w-6 h-6 text-brand-600 dark:text-brand-400"
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {formData.icon}
                </span>
              </div>
            )}
          </div>

          {/* ============ FEATURES SECTION ============ */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
                  🎯 Tính năng ({formData.features.length})
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Thêm các tính năng cho service này
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddFeature}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Thêm tính năng
              </button>
            </div>

            {formData.features.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                  Chưa có tính năng nào. Nhấn "Thêm tính năng" để bắt đầu.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className={`relative p-4 rounded-lg border ${
                      errors[`feature_${index}`]
                        ? "border-error-300 bg-error-50 dark:bg-error-500/10"
                        : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
                    }`}
                  >
                    {/* Feature Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveFeature(index, "up")}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Di chuyển lên"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          onClick={() => moveFeature(index, "down")}
                          disabled={index === formData.features.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Di chuyển xuống"
                        >
                          ▼
                        </button>
                      </div>

                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Tính năng #{index + 1}
                      </span>

                      {feature.id > 0 ? (
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded dark:bg-blue-500/20 dark:text-blue-400">
                          ID: {feature.id}
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded dark:bg-green-500/20 dark:text-green-400">
                          Mới
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="ml-auto p-1.5 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10"
                        title="Xóa tính năng"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Feature Content */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-8">
                        <Label>Nội dung</Label>
                        <Input
                          type="text"
                          placeholder="Nhập nội dung tính năng..."
                          value={feature.content}
                          onChange={(e) =>
                            handleFeatureChange(index, "content", e.target.value)
                          }
                          error={!!errors[`feature_${index}`]}
                          hint={errors[`feature_${index}`]}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label>Thứ tự</Label>
                        <Input
                          type="number"
                          min="1"
                          value={feature.displayOrder}
                          onChange={(e) =>
                            handleFeatureChange(
                              index,
                              "displayOrder",
                              parseInt(e.target.value) || 1
                            )
                          }
                        />
                      </div>

                      <div className="md:col-span-2 flex items-end pb-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={feature.isActive}
                            onChange={(e) =>
                              handleFeatureChange(index, "isActive", e.target.checked)
                            }
                            className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Hiện
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-200 dark:border-gray-800">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditing ? (
                <>
                  <PencilIcon className="w-4 h-4" />
                  {loading ? "Đang cập nhật..." : "Cập nhật"}
                </>
              ) : (
                <>
                  <PlusIcon className="w-4 h-4" />
                  {loading ? "Đang thêm..." : "Thêm mới"}
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Làm mới
            </button>
          </div>
        </form>
      </div>

      {/* ============ TABLE SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              🛠️ Danh sách Service
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tổng: {filteredServices.length} service
            </p>
          </div>

          {/* Search */}
          <div className="w-72">
            <Input
              type="text"
              placeholder="🔍 Tìm kiếm service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Chọn
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Service
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Icon
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Tính năng
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Thứ tự
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Trạng thái
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Xóa
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading && services.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm ? "Không tìm thấy service" : "Chưa có service nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr
                    key={service.id}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${
                      selectedId === service.id
                        ? "bg-brand-50 dark:bg-brand-500/10"
                        : ""
                    }`}
                  >
                    {/* Radio Select */}
                    <td className="px-4 py-4">
                      <input
                        type="radio"
                        name="selectedService"
                        checked={selectedId === service.id}
                        onChange={() => handleSelectRow(service)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                      />
                    </td>

                    {/* Service Info */}
                    <td className="px-4 py-4">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 dark:text-white/90">
                          {service.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[300px]">
                          {service.description}
                        </p>
                      </div>
                    </td>

                    {/* Icon */}
                    <td className="px-4 py-4 text-center">
                      {service.icon ? (
                        <div className="inline-flex flex-col items-center gap-1">
                          <span className="inline-flex items-center justify-center w-10 h-10 bg-brand-50 text-brand-600 rounded-lg dark:bg-brand-500/10 dark:text-brand-400">
                            <DynamicIcon name={service.icon} className="w-5 h-5" />
                          </span>
                          <span className="text-xs text-gray-500">{service.icon}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* Features Count */}
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                        {service.features.length} tính năng
                      </span>
                    </td>

                    {/* Display Order */}
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {service.displayOrder}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      {service.isActive ? (
                        <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
                          <CheckCircleIcon className="w-6 h-6" />
                          <span className="text-xs">Hiện</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <XIcon className="w-6 h-6" />
                          <span className="text-xs">Ẩn</span>
                        </span>
                      )}
                    </td>

                    {/* Delete Button */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(service.id)}
                        disabled={loading}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
                        title="Xóa service"
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
            Hiển thị {filteredServices.length} service
          </p>
        </div>
      </div>

      {/* ============ FEATURES PREVIEW ============ */}
      {selectedId && formData.features.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
            {formData.icon && (
              <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center dark:bg-brand-500/10">
                <DynamicIcon
                  name={formData.icon}
                  className="w-5 h-5 text-brand-600 dark:text-brand-400"
                />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                👀 Preview: {formData.title}
              </h3>
              <p className="text-sm text-gray-500">{formData.description}</p>
            </div>
          </div>
          <div className="p-5">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
              Tính năng ({formData.features.filter((f) => f.isActive).length} đang hiển thị)
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {formData.features
                .filter((f) => f.isActive)
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-800/50"
                  >
                    <div className="w-5 h-5 bg-success-500 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircleIcon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {feature.content}
                    </span>
                  </div>
                ))}
            </div>

            {formData.features.filter((f) => !f.isActive).length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-400 mb-3">
                  Tính năng đang ẩn ({formData.features.filter((f) => !f.isActive).length})
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {formData.features
                    .filter((f) => !f.isActive)
                    .map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg opacity-50 dark:bg-gray-800"
                      >
                        <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center shrink-0">
                          <XIcon className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-500 line-through">
                          {feature.content}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}