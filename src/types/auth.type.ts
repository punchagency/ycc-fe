
export const USER_ROLES = ['user', 'distributor', 'manufacturer', 'admin'] as const;

export interface RegisterInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    nationality: string;
    profilePicture: File | null;
    role: typeof USER_ROLES[number];
    address: {
        street: string;
        zipcode: string;
        city: string;
        state: string;
        country: string;
    };
    businessName?: string;
    businessType?: string;
    businessEmail?: string;
    businessPhone?: string;
    website?: string;
    taxId?: string;
    license?: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    nationality: string;
    phone: string;
    profilePicture: string;
    role: typeof USER_ROLES[number];
}