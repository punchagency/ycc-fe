"use client"

import { useState } from "react"
import { ProductUploadForm } from "./components/product-upload-form"
import { ProductApi } from '@/api/services/product';
import { toast } from "sonner"
import type { IProductInput } from "@/types/product.type"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  const handleProductSubmit = async (data: IProductInput) => {
    setIsLoading(true)
    try {
      const result = await ProductApi.createProduct(data)
      toast.success("Product created successfully!")
      console.log("Created product:", result)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create product"
      toast.error(message)
      console.error("Error creating product:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Product Management</h1>
          <p className="text-muted-foreground">Upload and manage your products</p>
        </div>

        <ProductUploadForm onSubmit={handleProductSubmit} isLoading={isLoading} />
      </div>
    </main>
  )
}
