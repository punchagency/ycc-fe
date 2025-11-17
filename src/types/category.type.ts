

export interface CategoryInput {
    name: string;
    description?: string;
    type: 'product' | 'service' | null;
    image?: File;
}