"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { IProductInput } from "@/types/product.type"
import { Upload, Loader2, AlertCircle } from "lucide-react"

interface ProductUploadFormProps {
  onSubmit: (data: IProductInput) => Promise<void>
  isLoading?: boolean
}

export function ProductUploadForm({ onSubmit, isLoading = false }: ProductUploadFormProps) {
  const [formData, setFormData] = useState<IProductInput>({
    name: "",
    price: 0,
    category: "",
    sku: "",
    quantity: 0,
    minRestockLevel: 0,
    description: "",
    hsCode: "",
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    wareHouseAddress: {
      street: "",
      zipcode: "",
      city: "",
      state: "",
      country: "",
    },
  })

  const [images, setImages] = useState<File[]>([])
  const [error, setError] = useState<string>("")
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [catLoading, setCatLoading] = useState(false);

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      setCatLoading(true);
      const res = await fetch("http://localhost:7000/api/v2/category");
      const data = await res.json();
      console.log("CATEGORY API RESPONSE:", data); // <-- IMPORTANT
      setCategories(Array.isArray(data) ? data : data.categories || data.data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setCatLoading(false);
    }
  };

  fetchCategories();
}, []);



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(files)

    // Create preview URLs
    const urls = files.map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      wareHouseAddress: {
        ...prev.wareHouseAddress,
        [field]: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    // if (
    //   !formData.name ||
    //   !formData.price ||
    //   !formData.category ||
    //   !formData.quantity !== undefined ||
    //   !formData.minRestockLevel !== undefined
    // ) {
    //   setError("Please fill in all required fields")
    //   return
    // }

    // if (!formData.wareHouseAddress.state || !formData.wareHouseAddress.country) {
    if (!formData.wareHouseAddress || !formData.wareHouseAddress.state || !formData.wareHouseAddress.country) {
      setError("Warehouse state and country are required")
      return
    }

    if (!formData.hsCode || !formData.weight || !formData.length || !formData.width || !formData.height) {
      setError("HS code and all dimensions are required")
      return
    }

    try {
      const submitData = {
        ...formData,
        productImages: images,
      }
      await onSubmit(submitData)

      // Reset form
      setFormData({
        name: "",
        price: 0,
        category: "",
        sku: "",
        quantity: 0,
        minRestockLevel: 0,
        description: "",
        hsCode: "",
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        wareHouseAddress: {
          street: "",
          zipcode: "",
          city: "",
          state: "",
          country: "",
        },
      })
      setImages([])
      setPreviewUrls([])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product")
    }
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>Fill in the product details below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex gap-3 p-3 bg-destructive/10 border border-destructive rounded-md">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Product Images */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Product Images</label>
            <div className="border-2 border-dashed rounded-lg p-6 hover:bg-muted/50 transition">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="images"
                disabled={isLoading}
              />
              <label htmlFor="images" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Click to upload or drag images</span>
              </label>
            </div>

            {/* Image Previews */}
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative rounded-md overflow-hidden">
                    <img src={url || "/placeholder.svg"} alt={`Preview ${idx}`} className="w-full h-20 object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price *</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value))}
                placeholder="0.00"
                step="0.01"
                disabled={isLoading}
              />
            </div>

            {/* <div className="space-y-2">
              <label className="text-sm font-medium">Category *</label>
              <Input
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                placeholder="Enter category ID"
                disabled={isLoading}
              />
            </div> */}

            <div className="space-y-2">
              <label className="text-sm font-medium">Category *</label>

              <select
                className="border rounded-md px-3 py-2 text-sm w-full"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                disabled={isLoading || catLoading}
              >
                <option value="">Select a category</option>

                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {catLoading && (
                <p className="text-xs text-muted-foreground">Loading categories...</p>
              )}
            </div>


            <div className="space-y-2">
              <label className="text-sm font-medium">SKU</label>
              <Input
                value={formData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                placeholder="Enter SKU"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter product description"
              disabled={isLoading}
            />
          </div>

          {/* Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity *</label>
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", Number.parseInt(e.target.value))}
                placeholder="0"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Min Restock Level *</label>
              <Input
                type="number"
                value={formData.minRestockLevel}
                onChange={(e) => handleInputChange("minRestockLevel", Number.parseInt(e.target.value))}
                placeholder="0"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <h3 className="font-medium mb-3">Dimensions & Weight</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Weight (kg) *</label>
                <Input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", Number.parseFloat(e.target.value))}
                  placeholder="0"
                  step="0.01"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Length (cm) *</label>
                <Input
                  type="number"
                  value={formData.length}
                  onChange={(e) => handleInputChange("length", Number.parseFloat(e.target.value))}
                  placeholder="0"
                  step="0.01"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Width (cm) *</label>
                <Input
                  type="number"
                  value={formData.width}
                  onChange={(e) => handleInputChange("width", Number.parseFloat(e.target.value))}
                  placeholder="0"
                  step="0.01"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Height (cm) *</label>
                <Input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", Number.parseFloat(e.target.value))}
                  placeholder="0"
                  step="0.01"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* HS Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium">HS Code *</label>
            <Input
              value={formData.hsCode}
              onChange={(e) => handleInputChange("hsCode", e.target.value)}
              placeholder="Enter HS code"
              disabled={isLoading}
            />
          </div>

          {/* Warehouse Address */}
          <div>
            <h3 className="font-medium mb-3">Warehouse Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Street</label>
                <Input
                  value={formData.wareHouseAddress?.street || ""}
                  onChange={(e) => handleAddressChange("street", e.target.value)}
                  placeholder="Street address"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">ZIP Code</label>
                <Input
                  value={formData.wareHouseAddress?.zipcode || ""}
                  onChange={(e) => handleAddressChange("zipcode", e.target.value)}
                  placeholder="ZIP code"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Input
                  value={formData.wareHouseAddress?.city || ""}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  placeholder="City"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">State *</label>
                <Input
                  value={formData.wareHouseAddress?.state || ""}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  placeholder="State"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Country *</label>
                <Input
                  value={formData.wareHouseAddress?.country || ""}
                  onChange={(e) => handleAddressChange("country", e.target.value)}
                  placeholder="Country"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Creating Product..." : "Create Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
