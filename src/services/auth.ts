import api from "../api/interceptors";
import API_ENDPOINTS from "../constants/api_endpoints";


const AuthApi = {
    register: (data: any) => api.post(API_ENDPOINTS.auth.register, data),
    login: (data: any) => api.post(API_ENDPOINTS.auth.login, data),
    refreshAccessToken: (data: any) => api.post(API_ENDPOINTS.auth.refreshAccessToken, data),
    logout: () => api.post(API_ENDPOINTS.auth.logout),
    changePassword: (data: any) => api.post(API_ENDPOINTS.auth.changePassword, data),
    getProfile: () => api.get(API_ENDPOINTS.auth.getProfile),
    updateProfile: (data: any) => api.put(API_ENDPOINTS.auth.updateProfile, data),
    activateAccount: (data: any) => api.post(API_ENDPOINTS.auth.activateAccount, data),
    resendActivationCode: (data: any) => api.post(API_ENDPOINTS.auth.resendActivationCode, data),
    forgotPassword: (data: any) => api.post(API_ENDPOINTS.auth.forgotPassword, data),
    resetPassword: (data: any) => api.post(API_ENDPOINTS.auth.resetPassword, data),
    resendResetCode: (data: any) => api.post(API_ENDPOINTS.auth.resendResetCode, data),
};

export default AuthApi;