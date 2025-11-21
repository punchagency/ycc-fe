import React from 'react'
import { Button } from '@/components/ui/button'
import { Package, Plus } from 'lucide-react'

interface ProductEmptyStateProps {
    onAddProduct: () => void
}

const ProductEmptyState: React.FC<ProductEmptyStateProps> = ({ onAddProduct }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed rounded-lg">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
                Get started by adding your first product.
            </p>
            <Button onClick={onAddProduct}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Product
            </Button>
        </div>
    )
}

export default ProductEmptyState
