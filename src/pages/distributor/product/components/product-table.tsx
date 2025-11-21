import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Edit, Trash2, Eye, Package } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { IProduct } from "@/types/product.type"; // Adjust path as needed

interface ProductTableProps {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
  onView: (product: IProduct) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
  onView,
}) => {
  const getStockStatus = (quantity?: number) => {
    if (!quantity || quantity === 0)
      return <Badge variant="destructive">Out of Stock</Badge>;
    if (quantity <= 5) return <Badge variant="outline">Low Stock</Badge>;
    return <Badge variant="secondary">In Stock</Badge>;
  };

  const getFirstImage = (images?: string[]) => {
    return images && images.length > 0 ? images[0] : null;
  };

  return (
    <div className="border rounded-lg bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>No products found</p>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => {
              const firstImage = getFirstImage(product.imageURLs);

              return (
                <TableRow key={product._id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <Avatar className="h-12 w-12 rounded-md">
                      <AvatarImage
                        src={firstImage || undefined}
                        alt={product.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-md bg-muted">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  <TableCell className="font-medium max-w-xs">
                    <div className="truncate" title={product.name}>
                      {product.name}
                    </div>
                  </TableCell>

                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {product.sku || "-"}
                    </code>
                  </TableCell>

                  <TableCell>
                    {product.category?.name ? (
                        product.category.name
                    ) : (
                        <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>

                  <TableCell className="font-semibold">
                    ${product.price.toFixed(2)}
                  </TableCell>

                  <TableCell>{getStockStatus(product.quantity)}</TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onView(product)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View Details</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onEdit(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Product</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => onDelete(product)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Product</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;