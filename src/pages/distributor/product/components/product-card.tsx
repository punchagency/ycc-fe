import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, Edit, Trash2, Eye } from "lucide-react";
import type { IProduct } from "@/types/product.type";

interface ProductCardProps {
  product: IProduct;
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
  onView: (product: IProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  onView,
}) => {
  const firstImage = product.imageURLs?.[0];
  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category?.name;

  const getStockBadge = () => {
    if (!product.quantity || product.quantity === 0)
      return <Badge variant="destructive">Out of Stock</Badge>;
    if (product.quantity <= 5)
      return <Badge variant="outline">Low Stock ({product.quantity})</Badge>;
    return <Badge variant="secondary">In Stock</Badge>;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Image Section */}
      <div className="relative aspect-video bg-muted/50">
        <Avatar className="h-full w-full rounded-none">
          <AvatarImage
            src={firstImage || undefined}
            alt={product.name}
            className="object-cover"
          />
          <AvatarFallback className="rounded-none bg-muted">
            <Package className="w-12 h-12 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        {/* Stock Badge - Top Right */}
        <div className="absolute top-3 right-3">
          {getStockBadge()}
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
              {product.name}
            </h3>
            {categoryName && (
              <p className="text-sm text-muted-foreground">{categoryName}</p>
            )}
            {product.sku && (
              <code className="text-xs bg-muted px-2 py-1 rounded block w-fit">
                {product.sku}
              </code>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
            {product.quantity !== undefined && (
              <p className="text-sm text-muted-foreground mt-1">
                {product.quantity} in stock
              </p>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-muted/30 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onView(product)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(product)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="flex-1"
          onClick={() => onDelete(product)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;