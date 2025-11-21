import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { useDocumentCount, useUploadDocument } from '@/hooks/useDocument';
import { Eye, Upload } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CATEGORIES = [
    {
        title: 'Identification',
        description: "Passport, Visas, seafarer Ids"
    },
    {
        title: 'Employment',
        description: "Contracts, references, CV"
    },
    {
        title: 'Certificates $ Licenses',
        description: "STSW, COC, training certificates"
    },
    {
        title: 'Medical',
        description: "STSW, COC, training certificates"
    },
    {
        title: 'Yacht',
        description: "Ship registry, safety certificates"
    },
    {
        title: 'Insurance',
        description: "Health, travel, personal insurance."
    },
];
const Document: React.FC = () => {
    const documentCount = useDocumentCount();
    const uploadDocument = useUploadDocument();
    const fileInputRefs = React.useRef<Record<string, HTMLInputElement | null>>({});
    const navigate = useNavigate();

    const handleFileUpload = (category: string, file: File | null) => {
        if (!file) return;
        
        uploadDocument.mutate(
            { category: category, document: file },
            {
                onSuccess: () => {
                    toast.success('Document uploaded successfully');
                    documentCount.refetch();
                },
                onError: () => {
                    toast.error('Failed to upload document');
                }
            }
        );
    };

    const documentCounts = React.useMemo(() => {
        const response = documentCount?.data?.data.data;
        if (!response) return {};
        
        return response.reduce((acc: Record<string, number>, doc: any) => {
            acc[doc.category] = doc.count;
            return acc;
        }, {} as Record<string, number>);
    }, [documentCount?.data])


    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold">Crew Documents</h1>
                {/* <p className="text-muted-foreground">Welcome to your dashboard</p> */}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
                {CATEGORIES.map((category) => {
                    const count = documentCounts[category.title] || 0;
                    return (
                        <Card key={category.title} className='p-6 hover:shadow-lg transition-shadow'>
                            <CardTitle className='p-0 mb-4'>
                                <h4 className='text-xl font-semibold mb-2'>{category.title}</h4>
                                <p className="text-muted-foreground text-sm font-normal">
                                    {category.description}
                                </p>
                            </CardTitle>

                            <CardContent className='p-0 mb-4'>
                                <div className='flex items-baseline gap-2'>
                                    <span className='text-3xl font-bold'>{count}</span>
                                    <span className='text-sm text-muted-foreground'>Document{count !== 1 && 's'}</span>
                                </div>
                            </CardContent>
                            <CardFooter className='p-0 flex gap-2'>
                                <Button variant="ghost" className='flex-1 hover:text-foreground border '
                                    onClick={()=> navigate('/crew/documents/list', {state: {category: category.title}}) }>
                                        <Eye className='mr-1 siz-5' />
                                        View Documents</Button>
                                <input 
                                    type="file" 
                                    className='hidden' 
                                    ref={(el) => { fileInputRefs.current[category.title] = el; }}
                                    onChange={(e) => handleFileUpload(category.title, e.target.files?.[0] || null)}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                />
                                <Button 
                                    className='flex-1 gap-2'
                                    onClick={() => fileInputRefs.current[category.title]?.click()}
                                    disabled={uploadDocument.isPending}
                                >
                                    <Upload size={16} />
                                    Upload Document
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}

            </div>
        </div>
    )
}

export default Document
