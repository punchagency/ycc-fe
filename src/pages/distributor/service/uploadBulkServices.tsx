import React from 'react'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MdWarning } from 'react-icons/md';

const UploadBulkServices: React.FC = () => {
    const navigate = useNavigate();
    const [openCSVModal, setOpenCSVModal] = React.useState(false);



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
                        <Button className='min-w-md' size="lg" onClick={() => setOpenCSVModal(true)}>Upload from CSV</Button>
                        <Button className='min-w-md' size="lg">Upload from Excel</Button>
                        <Button className='min-w-md bg-linear-to-r from-purple-500 to-primary hover:from-primary hover:to-purple-500 ' size="lg"><Sparkles className='text-purple-200 mr-1' />Upload with AI</Button>
                    </div>
                </div>

            </div>

            <Dialog open={openCSVModal} onOpenChange={setOpenCSVModal} >
                <DialogHeader>
                    <DialogTitle className='text-2xl font-bold'>Upload Services from CSV</DialogTitle>
                </DialogHeader>
                <DialogContent>
                    <div>
                        <div className='bg-accent p-3 rounded-md'>
                            <MdWarning />
                            <p className='text-muted-foreground'>It is important to download the template to see the required format. This ensures your data will be processed correctly.</p>
                        </div>
                    </div>

                </DialogContent>
                <DialogFooter>
                    <Button onClick={() => setOpenCSVModal(false)}>Close</Button>
                    <Button onClick={() => setOpenCSVModal(false)}>Submit</Button>
                </DialogFooter>
            </Dialog>
        </>

    )
}

export default UploadBulkServices
