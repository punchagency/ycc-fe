import React from 'react'
import { Button } from '@/components/ui/button'
import type { IService } from '@/types/service.type';
import { Plus, UploadCloud, LayoutGrid, List } from 'lucide-react'
import { useServices } from '@/hooks/useService';
import { useCategories } from '@/hooks/useCategory';
import type { ICategory } from '@/types/category.type';
import ServiceDialog from '@/pages/distributor/service/components/service-dialog'
import ServiceCard from '@/pages/distributor/service/components/service-card'
import ServiceTable from '@/pages/distributor/service/components/service-table'
import ServiceViewDialog from '@/pages/distributor/service/components/service-view-dialog'
import ServiceEmptyState from '@/pages/distributor/service/components/service-empty-state'
import ServiceLoading from '@/pages/distributor/service/components/service-loading'
import ConfirmDelete from '@/components/confirm-delete'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { toast } from 'sonner';
import APIErrorResponse from '@/utils/APIErrorResponse';


const Service: React.FC = () => {
    const [services, setServices] = React.useState<IService[]>([]);
    const [categories, setCategories] = React.useState<ICategory[]>([]);
    const [pagination, setPagination] = React.useState({
        total: 0,
        limit: 10,
        pages: 0,
        page: 1,
    });
    const [viewMode, setViewMode] = React.useState<'card' | 'table'>('card');
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [viewDialogOpen, setViewDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedService, setSelectedService] = React.useState<IService | null>(null);
    
    const { categories: categoriesQuery } = useCategories({type: 'service', isApproved: true});
    const { createService, deleteService, services: serviceQuery, updateService } = useServices({page: pagination.page, limit: pagination.limit});

    React.useEffect(() => {
        if (serviceQuery.data?.data) {
            setServices(serviceQuery.data.data.data)
            setPagination(serviceQuery.data.data.pagination)
        }
    }, [serviceQuery.data]);

    React.useEffect(() => {
        if (categoriesQuery.data?.data) {
            setCategories(categoriesQuery.data?.data.data)
        }
    }, [categoriesQuery.data]);

    const handleCreate = () => {
        setSelectedService(null);
        setDialogOpen(true);
    };

    const handleEdit = (service: IService) => {
        setSelectedService(service);
        setDialogOpen(true);
    };

    const handleDelete = (service: IService) => {
        setSelectedService(service);
        setDeleteDialogOpen(true);
    };

    const handleView = (service: IService) => {
        setSelectedService(service);
        setViewDialogOpen(true);
    };

    const handleSubmit = async (data: any) => {
        try {
            if (selectedService) {
                await updateService.mutateAsync({ id: selectedService._id, data });
                toast.success('Service updated successfully');
            } else {
                await createService.mutateAsync(data);
                toast.success('Service created successfully');
            }
        } catch (error) {
            APIErrorResponse(error,'Failed to save service');
        }
    };

    const confirmDelete = async () => {
        if (!selectedService) return;
        try {
            await deleteService.mutateAsync(selectedService._id);
            toast.success('Service deleted successfully');
        } catch (error) {
            APIErrorResponse(error, 'Failed to delete service');
        }
    };
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Service Management</h1>
                    <p className="text-muted-foreground">Manage your services to get booked.</p>
                </div>
                <div className='flex gap-3'>
                    <Button onClick={() => { }}
                        variant='outline'
                        className='border-primary border-2 text-primary hover:bg-primary hover:text-white'
                    >
                        <UploadCloud className="mr-2 h-5 w-5" />
                        Import Services
                    </Button>
                    <Button onClick={handleCreate}>
                        <Plus className="mr-2 h-5 w-5" />
                        Add Service
                    </Button>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button
                    variant={viewMode === 'card' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('card')}
                >
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    Cards
                </Button>
                <Button
                    variant={viewMode === 'table' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                >
                    <List className="mr-2 h-4 w-4" />
                    Table
                </Button>
            </div>

            {serviceQuery.isLoading ? (
                <ServiceLoading viewMode={viewMode} />
            ) : services.length === 0 ? (
                <ServiceEmptyState onAddService={handleCreate} />
            ) : (
                <>
                    {viewMode === 'card' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => {
                                return (
                                    <ServiceCard
                                        key={service._id}
                                        service={service}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onView={handleView}
                                    />
                                )
                            })}
                        </div>
                    ) : (
                        <ServiceTable
                            services={services}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onView={handleView}
                        />
                    )}

                    {pagination.pages > 1 && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                                        className={pagination.page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                    />
                                </PaginationItem>
                                {[...Array(pagination.pages)].map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                                            isActive={pagination.page === i + 1}
                                            className="cursor-pointer"
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
                                        className={pagination.page === pagination.pages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </>
            )}

            <ServiceDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={handleSubmit}
                service={selectedService}
                categories={categories}
                isLoading={createService.isPending || updateService.isPending}
            />

            <ServiceViewDialog
                open={viewDialogOpen}
                onOpenChange={setViewDialogOpen}
                service={selectedService}
            />

            <ConfirmDelete
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={confirmDelete}
                title="Delete Service"
                description="Are you sure you want to delete this service? This action cannot be undone."
                isLoading={deleteService.isPending}
            />
        </div>
    )
}

export default Service
