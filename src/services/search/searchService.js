import axios from "axios";
import { API_URL } from "../../config";
export const searchAll = async (query) => {
    try {
        const token = localStorage.getItem("token");
        if(!token) {
            return {
                success: false,
                message: "No token found",
                data: null,
            };
        }

       const response = await axios.get(
         `${API_URL}/search?query=${encodeURIComponent(query)}`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );

       return response.data;
        
        
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "An error occurred",
            data: null,
            error: error.response?.data || error.message,
        };
    }
}
