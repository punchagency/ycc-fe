import React from 'react'
import { ArrowLeft, Download, Sparkles, Upload } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MdWarning } from 'react-icons/md';
import { useReduxUser } from '@/hooks/useReduxUser';
import { useUploadBulkServices } from '@/hooks/useService';
import { parseCSV } from '@/utils/csvParser';
import { downloadCSVTemplate, downloadXLSXTemplate } from '@/utils/templateGenerator';
import { parseServicesWithAI } from '@/utils/aiParser';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';
import type { BulkServiceInput } from '@/types/service.type';
import APIErrorResponse from '@/utils/APIErrorResponse';

const UploadBulkServices: React.FC = () => {
    const { user } = useReduxUser();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = React.useState(false);
    const [openAIModal, setOpenAIModal] = React.useState(false);
    const [uploadType, setUploadType] = React.useState<'csv' | 'xlsx'>('csv');
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [aiFile, setAiFile] = React.useState<File | null>(null);
    const [isAIParsing, setIsAIParsing] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const aiFileInputRef = React.useRef<HTMLInputElement>(null);
    const uploadBulkServices = useUploadBulkServices();

    const validateServices = (services: any[]): boolean => {
        for (const service of services) {
            if (!service.name || !service.price || !service.categoryName) {
                toast.error('Missing required fields: name, price, or categoryName');
                return false;
            }
        }
        return true;
    };

    const parseFile = async (file: File): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = e.target?.result;
                    if (uploadType === 'csv') {
                        const parsed = parseCSV(content as string);
                        resolve(parsed);
                    } else {
                        const workbook = XLSX.read(content, { type: 'binary' });
                        const sheetName = workbook.SheetNames[0];
                        const sheet = workbook.Sheets[sheetName];
                        const data = XLSX.utils.sheet_to_json(sheet);
                        resolve(data);
                    }
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            if (uploadType === 'csv') {
                reader.readAsText(file)
            } else {
                reader.readAsBinaryString(file);
            }
        });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file);
    };

    const handleSubmit = async () => {
        if (!selectedFile || !user?._id) return;

        try {
            const parsedData = await parseFile(selectedFile);

            if (!validateServices(parsedData)) return;

            const payload: BulkServiceInput = {
                userId: user._id,
                services: parsedData.map(item => ({
                    name: item.name,
                    description: item.description,
                    price: Number(item.price),
                    categoryName: item.categoryName,
                    isQuotable: item.isQuotable === 'true' || item.isQuotable === true
                }))
            };

            await uploadBulkServices.mutateAsync(payload);
            toast.success('Services uploaded successfully');
            navigate('/services');
        } catch (error) {
            APIErrorResponse(error, 'Failed to upload services')
        }
    };

    const openUploadModal = (type: 'csv' | 'xlsx') => {
        setUploadType(type);
        setSelectedFile(null);
        setOpenModal(true);
    };

    const handleDownloadTemplate = () => {
        if (uploadType === 'csv') {
            downloadCSVTemplate()
        } else {
            downloadXLSXTemplate();
        }
    };

    const handleAIFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setAiFile(file);
    };

    const handleAISubmit = async () => {
        if (!aiFile || !user?._id) return;

        setIsAIParsing(true);
        try {
            const aiParsedServices = await parseServicesWithAI(aiFile);

            const payload: BulkServiceInput = {
                userId: user._id,
                services: aiParsedServices.map(item => ({
                    name: item.name,
                    description: item.description,
                    price: Number(item.price),
                    categoryName: item.categoryName,
                    isQuotable: item.isQuotable === 'true' || item.isQuotable === true
                }))
            };

            await uploadBulkServices.mutateAsync(payload);
            toast.success('Services uploaded successfully with AI');
            navigate('/services');
        } catch (error) {
            APIErrorResponse(error, 'AI parsing failed');
        } finally {
            setIsAIParsing(false);
        }
    };


    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className='flex gap-3 items-start'>
                        <ArrowLeft onClick={() => navigate('/services')} />
                        <div>
                            <h1 className="text-3xl font-bold">Bulk Service Upload</h1>
                            <p className="text-muted-foreground">Upload all your services at once.</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col space-y-6 justify-center items-center'>
                    <div>
                        <h3 className='text-center font-bold text-3xl'>Import Services</h3>
                        <p className='text-muted-foreground'>Choose your preferred method to import your service offerings</p>
                    </div>


                    <div className='flex flex-col gap-4'>
                        <Button className='min-w-md' size="lg" onClick={() => openUploadModal('csv')}>Upload from CSV</Button>
                        <Button className='min-w-md' size="lg" onClick={() => openUploadModal('xlsx')}>Upload from Excel</Button>
                        <Button className='min-w-md bg-linear-to-r from-purple-500 to-primary hover:from-primary hover:to-purple-500 ' size="lg" onClick={() => setOpenAIModal(true)}><Sparkles className='text-purple-200 mr-1' />Upload with AI</Button>
                    </div>
                </div>

            </div>

            <Dialog open={openModal} onOpenChange={()=>{}}>
                <DialogContent  showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle className='text-2xl font-bold'>
                            Upload Services from {uploadType === 'csv' ? 'CSV' : 'Excel'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className='space-y-4'>
                        <div className='bg-accent p-3 rounded-md flex gap-2'>
                            <MdWarning className='mt-1' />
                            <p className='text-muted-foreground text-sm'>Download the template to see the required format. This ensures your data will be processed correctly.</p>
                        </div>
                        <Button className='w-full' variant="outline" onClick={handleDownloadTemplate}>
                            <Download />Download Template
                        </Button>
                        <div className='flex flex-col items-center gap-2'>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept={uploadType === 'csv' ? '.csv' : '.xlsx,.xls'}
                                className='hidden'
                                onChange={handleFileSelect}
                            />
                            <Button className='w-full' onClick={() => fileInputRef.current?.click()}>
                                <Upload />{selectedFile ? selectedFile.name : `Upload ${uploadType.toUpperCase()} File`}
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenModal(false)}>Close</Button>
                        <Button onClick={handleSubmit} disabled={!selectedFile || uploadBulkServices.isPending}>
                            {uploadBulkServices.isPending ? 'Uploading...' : 'Submit'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={openAIModal} onOpenChange={()=>{}}>
                <DialogContent className='max-w-lg' showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle className='text-3xl font-bold flex items-center gap-2'>
                            <Sparkles className='text-purple-500' />
                            AI-Powered Upload
                        </DialogTitle>
                    </DialogHeader>
                    <div className='space-y-6'>
                        <div className='bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-4 rounded-lg'>
                            <p className='text-sm text-center'>Let our AI intelligently parse and structure your service data from any CSV or Excel file</p>
                        </div>
                        
                        {isAIParsing ? (
                            <div className='flex flex-col items-center justify-center py-8 space-y-4'>
                                <div className='relative'>
                                    <Sparkles className='w-12 h-12 text-purple-500 animate-pulse' />
                                    <div className='absolute inset-0 animate-spin'>
                                        <div className='h-12 w-12 border-4 border-purple-200 border-t-purple-500 rounded-full' />
                                    </div>
                                </div>
                                <p className='text-lg font-medium'>AI is parsing your file...</p>
                                <p className='text-sm text-muted-foreground'>This may take a moment</p>
                            </div>
                        ) : (
                            <div className='flex flex-col items-center gap-4'>
                                <input
                                    ref={aiFileInputRef}
                                    type="file"
                                    accept=".csv,.xlsx,.xls"
                                    className='hidden'
                                    onChange={handleAIFileSelect}
                                />
                                <Button 
                                    className='w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' 
                                    size="lg"
                                    onClick={() => aiFileInputRef.current?.click()}
                                >
                                    <Upload />{aiFile ? aiFile.name : 'Select File'}
                                </Button>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenAIModal(false)} disabled={isAIParsing}>Close</Button>
                        <Button 
                            className='bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                            onClick={handleAISubmit} 
                            disabled={!aiFile || isAIParsing || uploadBulkServices.isPending}
                        >
                            {isAIParsing ? 'Parsing...' : 'Upload with AI'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default UploadBulkServices
