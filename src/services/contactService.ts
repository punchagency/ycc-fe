import axios from "axios";
import { buildApiUrl } from "../utils/apiUtils";

// Define the expected shape of the contact form data
interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  location: string;
}

export const sendContactMessage = async ({
  fullName,
  email,
  subject,
  message,
  location,
}: ContactFormData): Promise<any> => {
  const payload = { fullName, email, subject, message, location };
  const url = buildApiUrl("public/contact-us");

  const response = await axios.post(url, payload);
  return response.data;
};
