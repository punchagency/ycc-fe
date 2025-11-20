import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import type { IService } from '@/types/service.type'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface ServiceViewDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    service: IService | null
}

const ServiceViewDialog: React.FC<ServiceViewDialogProps> = ({ open, onOpenChange, service }) => {
    if (!service) return null

    const hasImages = service.imageURLs && service.imageURLs.length > 0

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{service.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    {hasImages && (
                        <Carousel className="w-full">
                            <CarouselContent>
                                {service.imageURLs!.map((imageUrl, index) => (
                                    <CarouselItem key={index}>
                                        <div className="h-64 bg-muted rounded-lg overflow-hidden">
                                            <img
                                                src={imageUrl}
                                                alt={`${service.name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {service.imageURLs!.length > 1 && (
                                <>
                                    <CarouselPrevious className="left-2" />
                                    <CarouselNext className="right-2" />
                                </>
                            )}
                        </Carousel>
                    )}
                    <div className="grid gap-4">
                        <div>
                            <h3 className="font-semibold text-sm text-muted-foreground">Description</h3>
                            <p className="mt-1">{service.description || 'No description provided'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold text-sm text-muted-foreground">Price</h3>
                                <p className="text-2xl font-bold mt-1">${service.price.toFixed(2)}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-muted-foreground">Quotable</h3>
                                <div className="mt-1">
                                    {service.isQuotable ? (
                                        <Badge variant="secondary">Yes</Badge>
                                    ) : (
                                        <Badge variant="outline">No</Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <h3 className="font-semibold text-muted-foreground">Created</h3>
                                <p className="mt-1">{new Date(service.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-muted-foreground">Updated</h3>
                                <p className="mt-1">{new Date(service.updatedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ServiceViewDialog
