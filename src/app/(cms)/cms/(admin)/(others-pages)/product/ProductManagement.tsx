"use client";

import React, { useState, useEffect } from "react";
import Label from "@/app/(cms)/cms/components/form/Label";
import Input from "@/app/(cms)/cms/components/form/input/InputField";
import { Product, ProductFormData, CategoryProduct } from "@/app/types";
import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "./icons";
import { productApi, categoryProductApi } from "@/app/lib/api/index";
import { uploadApi } from "@/app/lib/api/endpoints/upload.api";

// ============ INITIAL FORM DATA ============
const initialFormData: ProductFormData = {
  name: "",
  image: "",
  price: 0,
  salePrice: 0,
  description: "",
  content: "",
  isActive: true,
  categoryProductId: 0,
};

// ============ COMPONENT ============
export default function ProductManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<CategoryProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // API đã được normalize, trả về mảng trực tiếp
      const [productsData, categoriesData] = await Promise.all([
        productApi.getAllNoPaging(),
        categoryProductApi.getAllNoPaging(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadProducts = async () => {
    try {
      const data = await productApi.getAllNoPaging();
      setProducts(data);
    } catch (error) {
      console.error("Error reloading products:", error);
    }
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
      newValue = parseFloat(value) || 0;
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

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên sản phẩm";
    }
    if (!formData.image.trim()) {
      newErrors.image = "Vui lòng chọn hình ảnh";
    }
    if (formData.price <= 0) {
      newErrors.price = "Giá phải lớn hơn 0";
    }
    if (formData.salePrice < 0) {
      newErrors.salePrice = "Giá khuyến mãi không hợp lệ";
    }
    if (formData.salePrice > formData.price) {
      newErrors.salePrice = "Giá khuyến mãi phải nhỏ hơn giá gốc";
    }
    if (formData.categoryProductId === 0) {
      newErrors.categoryProductId = "Vui lòng chọn danh mục";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Vui lòng nhập mô tả ngắn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Select row to edit
  const handleSelectRow = (product: Product) => {
    setSelectedId(product.id);
    setIsEditing(true);
    setFormData({
      name: product.name,
      image: product.image,
      price: product.price,
      salePrice: product.salePrice,
      description: product.description,
      content: product.content,
      isActive: product.isActive,
      categoryProductId: product.categoryProductId,
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
      console.log("Form Data to submit:", formData);
      if (isEditing && selectedId) {
        // Tạo full Product object để update
        const productToUpdate: Product = {
          id: selectedId,
          ...formData,
          url: null,
          createdAt: products.find(p => p.id === selectedId)?.createdAt || new Date().toISOString(),
        };
        await productApi.update(productToUpdate);
      } else {
        await productApi.create(formData);
      }

      await reloadProducts();
      handleReset();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        setLoading(true);
        await productApi.delete(id);
        await reloadProducts();

        if (selectedId === id) {
          handleReset();
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Calculate discount percentage
  const getDiscountPercent = (price: number, salePrice: number) => {
    if (salePrice <= 0 || salePrice >= price) return 0;
    return Math.round(((price - salePrice) / price) * 100);
  };

  // Get category name by id
  const getCategoryName = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.name || "N/A";
  };

  // Filter products by search
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ FORM SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Form Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "✏️ Cập nhật sản phẩm" : "➕ Thêm sản phẩm mới"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing
              ? `Đang chỉnh sửa: ${formData.name}`
              : "Điền thông tin để thêm sản phẩm mới"}
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Tên sản phẩm */}
            <div className="lg:col-span-2">
              <Label>
                Tên sản phẩm <span className="text-error-500">*</span>
              </Label>
              <Input
                name="name"
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                hint={errors.name || "Tên hiển thị của sản phẩm"}
              />
            </div>

            {/* Danh mục sản phẩm */}
            <div>
              <Label>
                Danh mục <span className="text-error-500">*</span>
              </Label>
              <select
                name="categoryProductId"
                value={formData.categoryProductId}
                onChange={handleChange}
                className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 bg-transparent cursor-pointer ${errors.categoryProductId
                    ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
                    : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
                  }`}
              >
                <option value={0}>-- Chọn danh mục --</option>
                {categories
                  .filter((c) => c.isActive)
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
              {errors.categoryProductId && (
                <p className="mt-1.5 text-xs text-error-500">{errors.categoryProductId}</p>
              )}
              {!errors.categoryProductId && (
                <p className="mt-1.5 text-xs text-gray-500">Phân loại sản phẩm</p>
              )}
            </div>

            {/* Giá gốc */}
            <div>
              <Label>
                Giá gốc (VNĐ) <span className="text-error-500">*</span>
              </Label>
              <Input
                name="price"
                type="number"
                placeholder="0"
                min="0"
                step="1000"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                hint={errors.price || "Giá bán chính thức"}
              />
            </div>

            {/* Giá khuyến mãi */}
            <div>
              <Label>Giá khuyến mãi (VNĐ)</Label>
              <Input
                name="salePrice"
                type="number"
                placeholder="0"
                min="0"
                step="1000"
                value={formData.salePrice}
                onChange={handleChange}
                error={!!errors.salePrice}
                hint={errors.salePrice || "Để trống hoặc 0 nếu không giảm giá"}
              />
            </div>

            {/* Hiển thị % giảm */}
            <div className="flex items-center pb-2">
              {formData.salePrice > 0 && formData.salePrice < formData.price && (
                <span className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-error-50 text-error-700 dark:bg-error-500/10 dark:text-error-400">
                  🔥 Giảm {getDiscountPercent(formData.price, formData.salePrice)}%
                </span>
              )}
            </div>

            {/* Mô tả ngắn */}
            <div className="lg:col-span-3">
              <Label>
                Mô tả ngắn <span className="text-error-500">*</span>
              </Label>
              <textarea
                name="description"
                rows={2}
                placeholder="Nhập mô tả ngắn về sản phẩm..."
                value={formData.description}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${errors.description
                    ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
                    : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
                  }`}
              />
              {errors.description ? (
                <p className="mt-1.5 text-xs text-error-500">{errors.description}</p>
              ) : (
                <p className="mt-1.5 text-xs text-gray-500">
                  Mô tả ngắn gọn hiển thị trong danh sách sản phẩm
                </p>
              )}
            </div>

            {/* Nội dung chi tiết */}
            <div className="lg:col-span-3">
              <Label>Nội dung chi tiết</Label>
              <textarea
                name="content"
                rows={4}
                placeholder="Nhập nội dung chi tiết, thông số kỹ thuật..."
                value={formData.content}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                Nội dung HTML chi tiết hiển thị trong trang sản phẩm
              </p>
            </div>

            {/* Hình ảnh */}
            <div className="lg:col-span-2">
              <Label>
                Hình ảnh <span className="text-error-500">*</span>
              </Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">

                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      // Validate
                      if (file.size > 2 * 1024 * 1024) {
                        alert("File quá lớn! Tối đa 2MB");
                        return;
                      }

                      try {
                        setUploading(true);

                        // Upload với slug = "products"
                        const response = await uploadApi.uploadImage(file, "products");

                        if (response.success && response.url) {
                          // Lưu path vào form (path này sẽ được lưu vào DB)
                          setFormData((prev) => ({
                            ...prev,
                            image: response.url as string, // VD: /upload/products/2025/01/23/1737612345_image.jpg
                          }));
                        } else {
                          alert(response.message || "Upload thất bại");
                        }
                      } catch (error) {
                        console.error("Upload error:", error);
                        alert("Không thể upload hình ảnh");
                      } finally {
                        setUploading(false);
                      }
                    }}
                    disabled={uploading}
                    className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-500/10 dark:file:text-brand-400 ${errors.image ? "border border-error-500 rounded-lg" : ""
                      } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  {uploading && (
                    <p className="mt-1.5 text-xs text-brand-500">Đang upload...</p>
                  )}
                  {errors.image && (
                    <p className="mt-1.5 text-xs text-error-500">{errors.image}</p>
                  )}
                  {!errors.image && !uploading && (
                    <p className="mt-1.5 text-xs text-gray-500">
                      Chấp nhận: JPG, PNG, GIF, WEBP (Tối đa 2MB)
                    </p>
                  )}
                </div>
                {formData.image && (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-error-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-error-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Trạng thái */}
            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Hiển thị sản phẩm
                </span>
              </label>
            </div>
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
              📦 Danh sách sản phẩm
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tổng: {filteredProducts.length} sản phẩm
            </p>
          </div>

          {/* Search */}
          <div className="w-72">
            <Input
              type="text"
              placeholder="🔍 Tìm kiếm sản phẩm..."
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
                    Sản phẩm
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Danh mục
                  </span>
                </th>
                <th className="px-4 py-3 text-right">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Giá gốc
                  </span>
                </th>
                <th className="px-4 py-3 text-right">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Giá KM
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Giảm
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Trạng thái
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Ngày tạo
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
              {loading && products.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm ? "Không tìm thấy sản phẩm" : "Chưa có sản phẩm nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${selectedId === product.id ? "bg-brand-50 dark:bg-brand-500/10" : ""
                      }`}
                  >
                    {/* Radio Select */}
                    <td className="px-4 py-4">
                      <input
                        type="radio"
                        name="selectedProduct"
                        checked={selectedId === product.id}
                        onChange={() => handleSelectRow(product)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                      />
                    </td>

                    {/* Product Info */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">IMG</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 dark:text-white/90 truncate max-w-[200px]">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        {getCategoryName(product.categoryProductId)}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4 text-right">
                      <span
                        className={`font-medium ${product.salePrice > 0 && product.salePrice < product.price
                            ? "text-gray-400 line-through text-sm"
                            : "text-gray-800 dark:text-white/90"
                          }`}
                      >
                        {formatCurrency(product.price)}
                      </span>
                    </td>

                    {/* Sale Price */}
                    <td className="px-4 py-4 text-right">
                      {product.salePrice > 0 && product.salePrice < product.price ? (
                        <span className="font-medium text-error-600 dark:text-error-400">
                          {formatCurrency(product.salePrice)}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* Discount */}
                    <td className="px-4 py-4 text-center">
                      {getDiscountPercent(product.price, product.salePrice) > 0 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-error-50 text-error-700 dark:bg-error-500/10 dark:text-error-400">
                          -{getDiscountPercent(product.price, product.salePrice)}%
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      {product.isActive ? (
                        <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
                          <CheckCircleIcon className="w-4 h-4" />
                          <span className="text-xs">Hiện</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <XIcon className="w-4 h-4" />
                          <span className="text-xs">Ẩn</span>
                        </span>
                      )}
                    </td>

                    {/* Created At */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(product.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </td>

                    {/* Delete Button */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={loading}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
                        title="Xóa sản phẩm"
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

        {/* Table Footer - Pagination */}
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị {filteredProducts.length} sản phẩm
          </p>
        </div>
      </div>
    </div>
  );
}
