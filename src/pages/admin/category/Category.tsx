import React from 'react'
import { useCategories } from '@/hooks/useCategory'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { type ICategory, type CategoryInput } from '@/types/category.type'
import { Pencil, Trash2, Package, Wrench, Plus } from 'lucide-react'
import ConfirmDelete from '@/components/confirm-delete'
import CategoryDialog from '@/pages/admin/category/components/category-dialog'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'

const Category: React.FC = () => {
    const [categories, setCategories] = React.useState<ICategory[]>([])
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
    const [categoryDialogOpen, setCategoryDialogOpen] = React.useState(false)
    const [selectedCategory, setSelectedCategory] = React.useState<ICategory | null>(null)
    const [categoryToDelete, setCategoryToDelete] = React.useState<ICategory | null>(null)

    const { categories: categoriesQuery, createCategory, updateCategory, deleteCategory } = useCategories()

    const fetchCategories = async () => {
        const result = await categoriesQuery.data?.data.data
        if (result) {
            setCategories(result)
        }
    }

    React.useEffect(() => {
        fetchCategories()
    }, [categoriesQuery.data])

    const handleCreateCategory = async (data: CategoryInput) => {
        try {
            await createCategory.mutateAsync(data)
            toast.success('Category created successfully')
        } catch (error) {
            toast.error('Failed to create category')
            console.error('Error creating category:', error)
        }
    }

    const handleUpdateCategory = async (data: CategoryInput) => {
        if (!selectedCategory) return
        try {
            await updateCategory.mutateAsync({ id: selectedCategory._id, data })
            toast.success('Category updated successfully')
        } catch (error) {
            toast.error('Failed to update category')
            console.error('Error updating category:', error)
        }
    }

    const handleDeleteCategory = async () => {
        if (!categoryToDelete) return
        try {
            await deleteCategory.mutateAsync(categoryToDelete._id)
            toast.success('Category deleted successfully')
        } catch (error) {
            toast.error('Failed to delete category')
            console.error('Error deleting category:', error)
        }
    }

    const openCreateDialog = () => {
        setSelectedCategory(null)
        setCategoryDialogOpen(true)
    }

    const openEditDialog = (category: ICategory) => {
        setSelectedCategory(category)
        setCategoryDialogOpen(true)
    }

    const openDeleteDialog = (category: ICategory) => {
        setCategoryToDelete(category)
        setDeleteDialogOpen(true)
    }

    const getCategoryIcon = (type: string) => {
        return type === 'product' ? <Package className="h-5 w-5" /> : <Wrench className="h-5 w-5" />
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Category Management</h1>
                    <p className="text-muted-foreground">Manage your categories for products and services.</p>
                </div>
                <Button onClick={openCreateDialog} className="cursor-pointer">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                </Button>
            </div>

            {categoriesQuery.isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i}>
                            <CardHeader>
                                <div className="flex items-start gap-2">
                                    <Skeleton className="h-9 w-9 rounded-lg" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-5 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-12 w-full" />
                            </CardContent>
                            <CardFooter className="border-t pt-4">
                                <div className="flex justify-between w-full">
                                    <Skeleton className="h-6 w-11 rounded-full" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-9 w-16" />
                                        <Skeleton className="h-9 w-20" />
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : categories.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="rounded-full bg-muted p-6 mb-4">
                            <Package className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No categories yet</h3>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                            Get started by creating your first category to organize your products and services.
                        </p>
                        <Button onClick={openCreateDialog}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create First Category
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Card key={category._id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                            {getCategoryIcon(category.type || '')}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{category.name}</CardTitle>
                                            <CardDescription className="capitalize">
                                                {category.type || "Product & Service"}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {category.description || 'No description provided'}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t pt-2">
                                <Switch
                                    checked={category.isApproved}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            updateCategory.mutate({ id: category._id, data: { isApproved: true } })
                                        } else {
                                            updateCategory.mutate({ id: category._id, data: { isApproved: false } })
                                        }
                                    }}
                                    className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-destructive scale-125"
                                />
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="hover:bg-primary/90 hover:text-white cursor-pointer"
                                        onClick={() => openEditDialog(category)}
                                    >
                                        <Pencil className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => openDeleteDialog(category)}
                                        className="text-destructive border-destructive hover:text-white 
                                            hover:bg-destructive/90 cursor-pointer"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>

                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            <CategoryDialog
                open={categoryDialogOpen}
                onOpenChange={setCategoryDialogOpen}
                onSubmit={selectedCategory ? handleUpdateCategory : handleCreateCategory}
                category={selectedCategory}
                isLoading={createCategory.isPending || updateCategory.isPending}
            />

            <ConfirmDelete
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteCategory}
                title="Delete Category"
                description={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
                isLoading={deleteCategory.isPending}
            />
        </div>
    )
}

export default Category