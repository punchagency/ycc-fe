import React, { useState, useEffect, useRef } from "react";
import profileUpload from "../../../assets/images/profile-upload.png";
import { useReduxAuth } from "../../../hooks/useReduxAuth";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Edit2, X, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const ProfilePage: React.FC = () => {
  const { user } = useReduxAuth();
  const { updateProfile } = useAuth();

  // Profile picture states
  const [showPicDrawer, setShowPicDrawer] = useState(false);
  const [showPicPreview, setShowPicPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Countries for nationality dropdown
  const [countries, setCountries] = useState<string[]>([]);

  // Edit profile modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    nationality: user?.nationality || "",
    profilePicture: user?.profilePicture || "",
    address: {
      street: user?.address?.street || "",
      zipcode: user?.address?.zipcode || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
    },
  });

  if (!user) return <div className="text-center py-10">Loading...</div>;

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries");
        const result = await response.json();
        const countryNames = result.data
          .map((item: { country: string }) => item.country)
          .filter((name: string) => name && name.trim())
          .sort();
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
        toast.error("Failed to load countries list");
      }
    };
    fetchCountries();
  }, []);

  // Handlers
  const openPictureDrawer = () => setShowPicDrawer(true);
  const closePictureDrawer = () => {
    setShowPicDrawer(false);
    setPreviewUrl(null);
  };

  const handleChangePicture = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      await updateProfile.mutateAsync(formData);

      toast.success("Profile picture updated successfully!");
      closePictureDrawer();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to upload image");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemovePicture = async () => {
    if (!user?.profilePicture) {
      toast.info("No profile picture to remove");
      return;
    }

    if (!confirm("Are you sure you want to remove your profile picture?")) return;

    try {
      await updateProfile.mutateAsync({ profilePicture: null });
      toast.success("Profile picture removed");
      closePictureDrawer();
    } catch (error: any) {
      toast.error("Failed to remove profile picture");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync(editForm);
      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    }
  };

  const openEditModal = () => {
    setEditForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      nationality: user.nationality || "",
      profilePicture: user.profilePicture || "",
      address: {
        street: user.address?.street || "",
        zipcode: user.address?.zipcode || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        country: user.address?.country || "",
      },
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Profile Picture Drawer */}
      {showPicDrawer && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={closePictureDrawer}>
          <div
            className="fixed right-0 top-0 w-96 h-full bg-white shadow-2xl p-8 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Update Profile Picture</h3>
              <Button variant="ghost" size="icon" onClick={closePictureDrawer}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Current Picture */}
            <div className="mb-8 text-center">
              <img
                src={previewUrl || user.profilePicture || profileUpload}
                alt="Current"
                className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-gray-200"
              />
              <p className="mt-4 text-sm text-muted-foreground">
                {previewUrl ? "New picture preview" : "Current profile picture"}
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleChangePicture}
                disabled={isUploading}
                className="w-full"
                size="lg"
              >
                <Upload className="mr-2 h-5 w-5" />
                {isUploading ? "Uploading..." : "Upload New Picture"}
              </Button>

              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                disabled={isUploading}
              />

              <Button
                variant="destructive"
                onClick={handleRemovePicture}
                disabled={isUploading || !user.profilePicture}
                className="w-full"
                size="lg"
              >
                <Trash2 className="mr-2 h-5 w-5" />
                Remove Picture
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Preview */}
      {showPicPreview && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-zoom-out"
          onClick={() => setShowPicPreview(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <img
              src={user.profilePicture || profileUpload}
              alt="Full preview"
              className="max-w-[90vw] max-h-[90vh] rounded-xl"
            />
            <Button
              size="icon"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70"
              onClick={() => setShowPicPreview(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold ">Edit Profile</h2>
              <Button
                variant={"ghost"}
                onClick={() => setIsEditModalOpen(false)}
                className="text-muted-foreground hover:text-gray-700 text-2xl cursor-pointer"
              >
                <X />
              </Button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Input
                    type="text"
                    required
                    value={editForm.firstName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, firstName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    required
                    value={editForm.lastName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, lastName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  placeholder="+1234567890"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality
                </label>
                <Select
                  value={editForm.nationality}
                  onValueChange={(value) =>
                    setEditForm({ ...editForm, nationality: value })
                  }
                >
                  <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>

                  <SelectContent className="max-h-64 overflow-y-auto">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>



              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => setIsEditModalOpen(false)}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Profile Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-8">
          <img
            src={user.profilePicture || profileUpload}
            alt="Profile"
            onClick={() => setShowPicPreview(true)}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl cursor-pointer hover:scale-105 transition-transform"
          />
          <div>
            <h1 className="text-4xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-xl text-muted-foreground mt-1">{user.email}</p>
            <Badge className="mt-3 text-lg px-4 py-1 capitalize">{user.role}</Badge>
          </div>
        </div>

        <div className="flex gap-4">
          <Button size="lg" onClick={openPictureDrawer}>
            <Upload className="mr-2 h-5 w-5" />
            Change Picture
          </Button>
          <Button size="lg" onClick={openEditModal}>
            <Edit2 className="mr-2 h-5 w-5" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Personal Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8 text-lg">
          <div>
            <p className="text-muted-foreground text-sm">Full Name</p>
            <p className="font-semibold text-xl mt-1">{user.firstName} {user.lastName}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Nationality</p>
            <p className="font-semibold text-xl mt-1">{user.nationality || "Not set"}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Email Address</p>
            <p className="font-semibold text-xl mt-1">{user.email}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Phone Number</p>
            <p className="font-semibold text-xl mt-1">{user.phone || "Not set"}</p>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50">
          <p className="text-sm">
            <strong>Reply-To Email:</strong> Calendar invites will be sent from{" "}
            <span className="font-medium">{user.email}</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;