

export interface CategoryInput {
    name?: string;
    description?: string;
    isApproved?: boolean;
    type?: 'product' | 'service' | null;
    image?: File;
}
export interface ICategory {
    _id: string;
    name: string;
    description?: string;
    isApproved: boolean;
    type: 'product' | 'service' | null;
    image?: File;
    createdAt: string;
    updatedAt: string;
}