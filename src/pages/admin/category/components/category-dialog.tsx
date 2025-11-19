import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { type ICategory, type CategoryInput } from '@/types/category.type'
import { Textarea } from '@/components/ui/textarea'

interface CategoryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: CategoryInput) => void | Promise<void>
    category?: ICategory | null
    isLoading?: boolean
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
    open,
    onOpenChange,
    onSubmit,
    category,
    isLoading = false,
}) => {
    const [formData, setFormData] = useState<CategoryInput>({
        name: '',
        description: '',
        type: null,
        image: undefined,
        isApproved: false,
    })
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                description: category.description || '',
                type: category.type,
                image: undefined,
                isApproved: category.isApproved || false,
            })
            setImagePreview(null)
        } else {
            setFormData({
                name: '',
                description: '',
                type: null,
                image: undefined,
                isApproved: false,
            })
            setImagePreview(null)
        }
        setErrors({})
    }, [category, open])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData({ ...formData, image: file })
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {}

        if (!formData?.name?.trim()) {
            newErrors.name = 'Name is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) {
            return
        }

        await onSubmit(formData)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{category ? 'Edit Category' : 'Create Category'}</DialogTitle>
                    <DialogDescription>
                        {category
                            ? 'Update the category details below.'
                            : 'Fill in the details to create a new category.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Name <span className="text-destructive">*</span>
                            </label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter category name"
                                disabled={isLoading}
                            />
                            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium">
                                Description
                            </label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Enter category description"
                                disabled={isLoading}
                                className="resize-none min-h-[100px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="type" className="text-sm font-medium">
                                Type <span className="text-destructive">*</span>
                            </label>
                            <Select
                                value={formData.type || 'both'}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, type: value === 'both' ? null : value as 'product' | 'service' })
                                }
                                disabled={isLoading}
                            >
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="product">Product</SelectItem>
                                    <SelectItem value="service">Service</SelectItem>
                                    <SelectItem value="both">Both</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="image" className="text-sm font-medium">
                                Image
                            </label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={isLoading}
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-32 w-32 object-cover rounded-md border"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="isApproved" className="text-sm font-medium">
                                Approved
                            </label>
                            <Switch
                                id="isApproved"
                                checked={formData.isApproved}
                                onCheckedChange={(checked) =>
                                    setFormData({ ...formData, isApproved: checked })
                                }
                                disabled={isLoading}
                                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-destructive scale-125"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button className='hover:bg-destructive/90' type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button className='hover:bg-primary/90' type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : category ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryDialog
