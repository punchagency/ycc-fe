export interface IService {
    _id: string;
    name: string;
    description?: string;
    imageURLs?: string[];
    price: number;
    categoryId: {
        _id: string;
        name: string;
    };
    isQuotable?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IServiceInput {
    name?: string;
    description?: string;
    serviceImage?: File[];
    price?: number;
    categoryId?: string;
    isQuotable?: boolean;
}