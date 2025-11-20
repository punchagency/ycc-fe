import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

interface ServiceLoadingProps {
    viewMode: 'card' | 'table'
}

const ServiceLoading: React.FC<ServiceLoadingProps> = ({ viewMode }) => {
    if (viewMode === 'card') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2 mt-2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-8 w-24 mt-2" />
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Skeleton className="h-9 flex-1" />
                            <Skeleton className="h-9 flex-1" />
                            <Skeleton className="h-9 flex-1" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className="border rounded-lg p-4 space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 flex-1" />
                    <Skeleton className="h-12 w-32" />
                    <Skeleton className="h-12 flex-1" />
                    <Skeleton className="h-12 w-24" />
                    <Skeleton className="h-12 w-20" />
                    <Skeleton className="h-12 w-32" />
                </div>
            ))}
        </div>
    )
}

export default ServiceLoading
