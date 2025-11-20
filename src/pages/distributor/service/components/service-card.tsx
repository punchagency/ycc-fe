import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { IService } from '@/types/service.type'
import { Edit, Trash2, Eye } from 'lucide-react'

interface ServiceCardProps {
    service: IService
    onEdit: (service: IService) => void
    onDelete: (service: IService) => void
    onView: (service: IService) => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onEdit, onDelete, onView }) => {
    return (
        <Card className='px-0 py-3 gap-2'>
            <CardHeader className="px-3">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        {service.categoryId.name && <p className="text-sm text-muted-foreground mt-1">{service.categoryId.name}</p>}
                    </div>
                    {service.isQuotable && <Badge variant="secondary">Quotable</Badge>}
                </div>
            </CardHeader>
            <CardContent className='px-3'>
                {service.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                )}
                <p className="text-xl font-bold mt-2">${service.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex gap-2 px-3">
                <Button variant="outline" size="sm" onClick={() => onView(service)} className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEdit(service)} className="flex-1">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(service)} className="flex-1">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ServiceCard
