const API_ENDPOINTS = {
    auth: {
        login: '/api/v2/auth/login',
        register: '/api/v2/auth/register',
        refreshAccessToken: '/api/v2/auth/refresh-token',
        logout: '/api/v2/auth/logout',
        changePassword: '/api/v2/auth/change-password',
        getProfile: '/api/v2/auth/profile',
        updateProfile: '/api/v2/auth/profile',
        updateDistributorProfile: '/api/v2/auth/distributor-profile',
        activateAccount: '/api/v2/auth/activate-account',
        resendActivationCode: '/api/v2/auth/resend-activation-code',
        forgotPassword: '/api/v2/auth/forgot-password',
        resetPassword: '/api/v2/auth/reset-password',
        resendResetCode: '/api/v2/auth/resend-reset-code'
    },
    category: {
        createCategory: '/api/v2/category',
        getCategories: '/api/v2/category',
        getCategory: '/api/v2/category/:id',
        updateCategory: '/api/v2/category/:id',
        deleteCategory: '/api/v2/category/:id'
    },
    service: {
        createService: '/api/v2/service',
        getServicesByBusiness: '/api/v2/service/business',
        getCrewServices: '/api/v2/service/crew-services',
        getService: '/api/v2/service/:id',
        updateService: '/api/v2/service/:id',
        deleteService: '/api/v2/service/:id',
        uploadBulkServices: '/api/v2/service/bulk-upload',
    },
    product: {
        createProduct: '/api/v2/product',
        getProductsByBusiness: '/api/v2/product/business',
        getProduct: '/api/v2/product/:id',
        updateProduct: '/api/v2/product/:id',
        deleteProduct: '/api/v2/product/:id',
        uploadBulkProducts: '/api/v2/product/bulk-upload',
    },
    document: {
        uploadDocument: '/api/v2/document/upload',
        getDocumentsByCategory: '/api/v2/document/category/:category',
        deleteDocument: '/api/v2/document/:id',
        getDownloadURL: '/api/v2/document/:id/download',
        getDocumentCount: '/api/v2/document/counts'
    },
    booking: {
        createBooking: '/api/v2/booking',
        getBookings: '/api/v2/booking',
        getBookingById: '/api/v2/booking/:id',
        updateBookingStatus: '/api/v2/booking/:id/status',
        confirmBooking: '/api/v2/booking/confirm/:token'
    }
};

export default API_ENDPOINTS;