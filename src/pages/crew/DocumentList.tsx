import { useDeleteDocument, useDocuments } from '@/hooks/useDocument';
import type { IDocument, IGetDocumentQuery } from '@/types/document.type'
import { ArrowLeft, Download, Eye, Trash2, LayoutGrid, LayoutList, Loader2 } from 'lucide-react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';
import { toast } from 'sonner';

const DocumentList: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.state?.category || null;

    if (!category) {
        navigate('/crew/documents')
    }

    const [viewMode, setViewMode] = React.useState<'table' | 'list'>('table');
    const [documentQuery, setDocumentQuery] = React.useState<IGetDocumentQuery>({
        category: category,
        page: 1,
        limit: 10
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedDocument, setSelectedDocument] = React.useState<IDocument | null>(null);
    const [previewDocument, setPreviewDocument] = React.useState<IDocument | null>(null);

    const fetchDocumentList = useDocuments({ category: documentQuery.category, limit: documentQuery.limit, page: documentQuery.page });
    const deleteDocument = useDeleteDocument();

    const documents = fetchDocumentList.data?.data.data || [];
    const pagination = fetchDocumentList.data?.data.pagination;

    const formatFileSize = (bytes: number) => {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const handleDownload = (doc: IDocument) => {
        window.open(doc.fileUrl, '_blank');
    };

    const handleView = (doc: IDocument) => {
        const isPdf = doc.mimetype === 'application/pdf';
        const isImage = doc.mimetype.startsWith('image/');
        
        if (isPdf || isImage) {
            setPreviewDocument(doc);
        } else {
            toast.info('Preview not available for this file type');
        }
    };

    const handleDeleteClick = (doc: IDocument) => {
        setSelectedDocument(doc);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!selectedDocument) return;
        
        deleteDocument.mutate(selectedDocument._id, {
            onSuccess: () => {
                toast.success('Document deleted successfully');
                fetchDocumentList.refetch();
                setDeleteDialogOpen(false);
                setSelectedDocument(null);
            },
            onError: () => {
                toast.error('Failed to delete document');
            }
        });
    };

    const handlePageChange = (page: number) => {
        setDocumentQuery(prev => ({ ...prev, page }));
    };

    const renderTableView = () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Filename</TableHead>
                    <TableHead>File Type</TableHead>
                    <TableHead>File Size</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {documents.map((doc: IDocument) => (
                    <TableRow key={doc._id}>
                        <TableCell className='font-medium'>{doc.originalName}</TableCell>
                        <TableCell>{doc.mimetype}</TableCell>
                        <TableCell>{formatFileSize(doc.fileSize)}</TableCell>
                        <TableCell>{format(new Date(doc.uploadedAt), 'MMM dd, yyyy')}</TableCell>
                        <TableCell className='text-right'>
                            <div className='flex gap-2 justify-end'>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant='ghost' className='hover:text-foreground' size='icon' onClick={() => handleView(doc)}>
                                            <Eye size={16} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>View</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant='ghost' className='hover:text-foreground' size='icon' onClick={() => handleDownload(doc)}>
                                            <Download size={16} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Download</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant='ghost' className='hover:text-foreground' size='icon' onClick={() => handleDeleteClick(doc)} disabled={deleteDocument.isPending}>
                                            {deleteDocument.isPending && selectedDocument?._id === doc._id ? (
                                                <Loader2 size={16} className='animate-spin' />
                                            ) : (
                                                <Trash2 size={16} />
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Delete</TooltipContent>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    const renderListView = () => (
        <div className='space-y-3'>
            {documents.map((doc: IDocument) => (
                <Card key={doc._id}>
                    <CardContent className='p-4'>
                        <div className='flex items-center justify-between'>
                            <div className='flex-1'>
                                <h3 className='font-medium'>{doc.originalName}</h3>
                                <div className='flex gap-4 text-sm text-muted-foreground mt-1'>
                                    <span>{doc.mimetype}</span>
                                    <span>{formatFileSize(doc.fileSize)}</span>
                                    <span>{format(new Date(doc.uploadedAt), 'MMM dd, yyyy')}</span>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant='ghost' className='hover:text-foreground' size='icon' onClick={() => handleView(doc)}>
                                            <Eye size={16} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>View</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant='ghost' className='hover:text-foreground' size='icon' onClick={() => handleDownload(doc)}>
                                            <Download size={16} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Download</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant='ghost' className='hover:text-foreground' size='icon' onClick={() => handleDeleteClick(doc)} disabled={deleteDocument.isPending}>
                                            {deleteDocument.isPending && selectedDocument?._id === doc._id ? (
                                                <Loader2 size={16} className='animate-spin' />
                                            ) : (
                                                <Trash2 size={16} />
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Delete</TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    const renderSkeleton = () => (
        <div className='space-y-3'>
            {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className='h-16 w-full' />
            ))}
        </div>
    );

    const renderEmptyState = () => (
        <div className='text-center py-12'>
            <p className='text-muted-foreground'>No documents found in this category</p>
        </div>
    );

    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <div className='flex gap-3 items-center'>
                    <ArrowLeft className='cursor-pointer' onClick={() => navigate('/crew/documents')} />
                    <h1 className="text-2xl font-bold"><span className='capitalize'>{category}</span> Documents</h1>
                </div>
                <div className='flex gap-2'>
                    <Button variant={viewMode === 'table' ? 'default' : 'outline'} size='icon' onClick={() => setViewMode('table')}>
                        <LayoutList size={16} />
                    </Button>
                    <Button variant={viewMode === 'list' ? 'default' : 'outline'} size='icon' onClick={() => setViewMode('list')}>
                        <LayoutGrid size={16} />
                    </Button>
                </div>
            </div>

            {fetchDocumentList.isLoading ? (
                renderSkeleton()
            ) : documents.length === 0 ? (
                renderEmptyState()
            ) : (
                <>
                    {viewMode === 'table' ? renderTableView() : renderListView()}
                    
                    {pagination && pagination.totalPages > 1 && (
                        <Pagination className='mt-6'>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                        className={pagination.currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                    />
                                </PaginationItem>
                                {[...Array(pagination.totalPages)].map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink 
                                            onClick={() => handlePageChange(i + 1)}
                                            isActive={pagination.currentPage === i + 1}
                                            className='cursor-pointer'
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                        className={pagination.currentPage === pagination.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </>
            )}

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Document</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{selectedDocument?.originalName}"? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm} className='bg-destructive hover:bg-destructive/80' disabled={deleteDocument.isPending}>
                            {deleteDocument.isPending ? <Loader2 size={16} className='animate-spin mr-2' /> : null}
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={!!previewDocument} onOpenChange={() => setPreviewDocument(null)}>
                <DialogContent className='max-w-4xl max-h-[90vh]'>
                    <DialogHeader>
                        <DialogTitle>{previewDocument?.originalName}</DialogTitle>
                    </DialogHeader>
                    <div className='overflow-auto'>
                        {previewDocument?.mimetype === 'application/pdf' ? (
                            <iframe src={previewDocument.fileUrl} className='w-full h-[70vh]' />
                        ) : previewDocument?.mimetype.startsWith('image/') ? (
                            <img src={previewDocument.fileUrl} alt={previewDocument.originalName} className='w-full h-auto' />
                        ) : null}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DocumentList
