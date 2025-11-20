import { toast } from "sonner";

const APIErrorResponse = (error: any, customMessage?: string, showToast: boolean = true) => {
    const status = error.status || error.response?.status;
    const message = customMessage || error.response?.data?.message || error.message || 'Something went wrong';

    if (!showToast) return message;

    if (status === 400) {
        toast.error(message);
    } else if (status === 401) {
        toast.error(message || 'Unauthorized');
        if (typeof window !== 'undefined') {
            window.location.href = '/logout';
        }
    } else if (status === 403) {
        toast.error(message || 'Forbidden');
    } else if (status === 404) {
        toast.error(message || 'Not Found');
    } else if (status === 500) {
        toast.error(message || 'Internal Server Error');
    } else {
        toast.error(message);
    }

    return message;
};

export default APIErrorResponse;