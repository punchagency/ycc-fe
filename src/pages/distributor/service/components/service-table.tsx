import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { IService } from '@/types/service.type'
import { Edit, Trash2, Eye } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

interface ServiceTableProps {
    services: IService[]
    onEdit: (service: IService) => void
    onDelete: (service: IService) => void
    onView: (service: IService) => void
}

const ServiceTable: React.FC<ServiceTableProps> = ({ services, onEdit, onDelete, onView }) => {
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quotable</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {services.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-muted-foreground">
                                No services found
                            </TableCell>
                        </TableRow>
                    ) : (
                        services.map((service) => {
                            return (
                                <TableRow key={service._id}>
                                    <TableCell className="font-medium">{service.name}</TableCell>
                                    <TableCell>{service.categoryId.name || '-'}</TableCell>
                                    <TableCell className="max-w-xs truncate">
                                        {service.description || '-'}
                                    </TableCell>
                                    <TableCell>${service.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        {service.isQuotable ? (
                                            <Badge variant="secondary">Yes</Badge>
                                        ) : (
                                            <span className="text-muted-foreground">No</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-center gap-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="sm" onClick={() => onView(service)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>View</TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="sm" onClick={() => onEdit(service)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Edit</TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="sm" onClick={() => onDelete(service)}>
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Delete</TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default ServiceTable
