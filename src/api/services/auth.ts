/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../client";
import API_ENDPOINTS from "../../constants/api_endpoints";

const AuthApi = {
    register: (data: any) => api.post(API_ENDPOINTS.auth.register, data, { authenticated: false }),
    login: (data: any) => api.post(API_ENDPOINTS.auth.login, data, { authenticated: false }),
    refreshAccessToken: (data: any) => api.post(API_ENDPOINTS.auth.refreshAccessToken, data, { authenticated: false }),
    logout: () => api.post(API_ENDPOINTS.auth.logout),
    changePassword: (data: any) => api.post(API_ENDPOINTS.auth.changePassword, data),
    getProfile: () => api.get(API_ENDPOINTS.auth.getProfile),
    updateProfile: (data: any) => api.put(API_ENDPOINTS.auth.updateProfile, data),
    activateAccount: (data: any) => api.post(API_ENDPOINTS.auth.activateAccount, data, { authenticated: false }),
    resendActivationCode: (data: any) => api.post(API_ENDPOINTS.auth.resendActivationCode, data, { authenticated: false }),
    forgotPassword: (data: any) => api.post(API_ENDPOINTS.auth.forgotPassword, data, { authenticated: false }),
    resetPassword: (data: any) => api.post(API_ENDPOINTS.auth.resetPassword, data, { authenticated: false }),
    resendResetCode: (data: any) => api.post(API_ENDPOINTS.auth.resendResetCode, data, { authenticated: false }),
};

export default AuthApi;