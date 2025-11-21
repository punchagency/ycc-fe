export interface IDocument {
    _id: string;
    userId: string;
    businessId?: string;
    category: string;
    filename: string;
    originalName: string;
    fileUrl: string;
    fileSize: number;
    mimetype: string;
    uploadedAt: string;
}

export interface IDocumentInput {
    category: string;
    document: File;
}

export const DOCUMENT_CATEGORIES = [
    'invoice',
    'contract',
    'receipt',
    'license',
    'certification',
    'tax_document',
    'insurance',
    'legal',
    'financial',
    'identity',
    'Identification',
    'Employment',
    'Certificates $ Licenses',
    'Medical',
    'Yacht',
    'Insurance',
    'other'
] as const;

export interface IGetDocumentQuery {
    category: typeof DOCUMENT_CATEGORIES[number];
    page?: number;
    limit?: number;
}