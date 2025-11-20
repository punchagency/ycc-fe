const API_ENDPOINTS = {
    auth: {
        login: '/api/v2/auth/login',
        register: '/api/v2/auth/register',
        refreshAccessToken: '/api/v2/auth/refresh-token',
        logout: '/api/v2/auth/logout',
        changePassword: '/api/v2/auth/change-password',
        getProfile: '/api/v2/auth/profile',
        updateProfile: '/api/v2/auth/profile',
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
        getService: '/api/v2/service/:id',
        updateService: '/api/v2/service/:id',
        deleteService: '/api/v2/service/:id'
    }
};

export default API_ENDPOINTS;