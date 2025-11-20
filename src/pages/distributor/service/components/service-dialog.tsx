import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import type { IService, IServiceInput } from '@/types/service.type'
import type { ICategory } from '@/types/category.type'
import { Upload, X } from 'lucide-react'

interface ServiceDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: IServiceInput) => Promise<void>
    service?: IService | null
    categories: ICategory[]
    isLoading?: boolean
}

const ServiceDialog: React.FC<ServiceDialogProps> = ({
    open,
    onOpenChange,
    onSubmit,
    service,
    categories,
    isLoading = false,
}) => {
    const [formData, setFormData] = React.useState<IServiceInput>({
        name: '',
        description: '',
        price: 0,
        categoryId: '',
        isQuotable: false,
    })
    const [imageFiles, setImageFiles] = React.useState<File[]>([])
    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        if (service) {
            setFormData({
                name: service.name,
                description: service.description || '',
                price: service.price,
                categoryId: service.categoryId._id,
                isQuotable: service.isQuotable || false,
            })
        } else {
            setFormData({
                name: '',
                description: '',
                price: 0,
                categoryId: '',
                isQuotable: false,
            })
            setImageFiles([])
        }
        setErrors({})
    }, [service, open])

    const validate = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.name?.trim()) newErrors.name = 'Name is required'
        if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be greater than 0'
        if (!formData.categoryId) newErrors.categoryId = 'Category is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        const submitData: IServiceInput = {
            ...formData,
            serviceImage: imageFiles.length > 0 ? imageFiles : undefined,
        }

        await onSubmit(submitData)
        onOpenChange(false)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFiles(prev => [...prev, ...Array.from(e.target.files!)])
        }
    }

    const removeImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{service ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className='resize-none min-h-[100px]'
                        />
                    </div>

                    <div>
                        <Label htmlFor="price">Price *</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                            className={errors.price ? 'border-red-500' : ''}
                        />
                        {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                    </div>

                    <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                            value={formData.categoryId}
                            onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                        >
                            <SelectTrigger className={"w-full " + (errors.categoryId ? 'border-red-500' : '')}>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category._id} value={category._id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.categoryId && <p className="text-sm text-red-500 mt-1">{errors.categoryId}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <Label htmlFor="isQuotable">Is Quotable</Label>
                        <Switch
                            className='scale-125'
                            id="isQuotable"
                            checked={formData.isQuotable}
                            onCheckedChange={(checked) => setFormData({ ...formData, isQuotable: checked })}
                        />
                    </div>

                    <div>
                        <Label>Images</Label>
                        <div className="mt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-12"
                            >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Images
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        {imageFiles.length > 0 && (
                            <div className="mt-2 space-y-2">
                                {imageFiles.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                        <span className="text-sm truncate">{file.name}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeImage(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => {
                            if(service) {
                                setFormData({
                                    name: '',
                                    description: '',
                                    price: 0,
                                    categoryId: '',
                                    isQuotable: false,
                                })
                                setImageFiles([])
                                setErrors({})
                                onOpenChange(false)
                            }else{
                                onOpenChange(false)
                            }
                        }} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : service ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ServiceDialog
