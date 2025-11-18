// components/contact/FormContactUs.tsx
import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { sendContactMessage } from "../../../services/contactService";

interface FormValues {
  fullName: string;
  email: string;
  subject: string;
  location: string;
  message: string;
}

const subjectOptions = [
  "General Question",
  "Partnership Opportunities",
  "Investor Relations",
  "Press & Media",
  "Assistance with Booking Services",
  "Issues with a Vendor or Service Provider",
  "Vendor Registration & Onboarding Support",
  "Crew Profile & Account Assistance",
  "Unable to Find a Product or Service",
  "Custom Order or Special Request",
  "Emergency Provisioning Request",
  "Urgent Crew Support or Emergency Assistance",
  "Legal Inquiry or Maritime Compliance Support",
  "Report a Workplace Incident",
  "Help with Maintenance & Repairs",
  "Compliance & Flag State Documentation Assistance",
  "Financial Management & Invoice Support",
  "Account/Login Issues",
  "Website or Platform Functionality Issues",
  "AI Chatbot Assistance",
] as const;

const FormContactUs: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    fullName: "",
    email: "",
    subject: "",
    location: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormValues(prev => ({ ...prev, [field]: e.target.value }));
  };

  const validate = (): string | null => {
    const { fullName, email, subject, message } = formValues;
    if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return "Please fill in Full Name, Email, Subject, and Message.";
    }
    if (!/.+@.+\..+/.test(email.trim())) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setSubmitting(true);
      await sendContactMessage(formValues);
      toast.success("Your message has been sent successfully!");
      setFormValues({ fullName: "", email: "", subject: "", location: "", message: "" });
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.response?.data?.message || "Failed to send message. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full h-full bg-[#F2F6F8] rounded-2xl p-5 md:p-8"
    >
      {/* Full Name */}
      <input
        type="text"
        placeholder="Full Name *"
        value={formValues.fullName}
        onChange={handleChange("fullName")}
        className="w-full px-5 py-4 bg-white rounded-xl border border-gray-200 focus:border-[#0487D9] focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
        required
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email *"
        value={formValues.email}
        onChange={handleChange("email")}
        className="w-full px-5 py-4 bg-white rounded-xl border border-gray-200 focus:border-[#0487D9] focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
        required
      />

      {/* Subject - Custom Select */}
      <div className="relative">
        <select
          value={formValues.subject}
          onChange={handleChange("subject")}
          className="w-full px-5 py-4 bg-white rounded-xl border border-gray-200 focus:border-[#0487D9] focus:outline-none appearance-none cursor-pointer text-gray-900"
          required
        >
          <option value="" disabled>Select Subject *</option>
          {subjectOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Location */}
      <input
        type="text"
        placeholder="Location (optional)"
        value={formValues.location}
        onChange={handleChange("location")}
        className="w-full px-5 py-4 bg-white rounded-xl border border-gray-200 focus:border-[#0487D9] focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
      />

      {/* Message */}
      <textarea
        placeholder="Message... *"
        rows={7}
        value={formValues.message}
        onChange={handleChange("message")}
        className="w-full px-5 py-4 bg-white rounded-xl border border-gray-200 focus:border-[#0487D9] focus:outline-none transition-colors resize-none text-gray-900 placeholder-gray-500"
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="relative w-full py-5 rounded-xl bg-gradient-to-r from-[#034D92] to-[#0487D9] text-white font-semibold text-lg tracking-wide
                   transition-all duration-300 hover:opacity-90 hover:shadow-2xl hover:shadow-[#0487D9]/30
                   disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {submitting ? (
          <>
            <Loader2 className="animate-spin" size={22} />
            Sending...
          </>
        ) : (
          "Submit Message"
        )}
      </button>
    </form>
  );
};

export default FormContactUs;