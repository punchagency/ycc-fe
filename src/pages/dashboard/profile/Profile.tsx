import React, { useState, useEffect, useRef } from "react";
import profileUpload from "../../../assets/images/profile-upload.png";
import { useReduxAuth } from "../../../hooks/useReduxAuth";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import countries from "react-phone-number-input/locale/en.json";
// import metadata from "react-phone-number-input/metadata.min.json";
import { Edit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const ProfilePage: React.FC = () => {
  const { user } = useReduxAuth();

  // Profile picture states
  const [showPicDrawer, setShowPicDrawer] = useState(false);
  const [showPicPreview, setShowPicPreview] = useState(false);
  const [picLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const picRef = useRef<HTMLImageElement>(null);
  const [countries, setCountries] = useState<string[]>([]);

  const { updateProfile, profile } = useAuth();

  // Edit profile modal state
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
    }

  });

  if (!user) return <div>Loading...</div>;

  const handleChangePicture = () => fileInputRef.current?.click();
  const handleViewPicture = () => setShowPicPreview(true);
  const handleRemovePicture = () => console.log("Remove picture");
  const handleFileChange = () => console.log("File changed");

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile.mutateAsync(editForm);
      
      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false); // Only close on success
    } catch (error: any) {
      console.error("Update failed:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update profile. Please try again."
      );
      // Don't close modal on error!
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries");
        const result = await response.json();

        // Extract country names from result.data
        const countryNames = result.data
          .map((item: { country: string }) => item.country)
          .filter((name: string) => name && name.trim() !== "")
          .sort();

        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
      }
    };

    fetchCountries();
  }, []);


  return (
    <div className="mx-auto">
      {/* Profile Picture Drawer */}
      {showPicDrawer && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowPicDrawer(false)}
        >
          <div
            className="fixed right-0 top-0 w-80 h-screen bg-white shadow-lg p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Profile Picture</h3>
              <Button
                variant={"ghost"}
                onClick={() => setShowPicDrawer(false)}
                className="text-muted-foreground hover:text-gray-700 text-2xl"
              >
                <X />
              </Button>
            </div>

            <Button
              variant={"secondary"}
              onClick={handleViewPicture}
              className="w-full mb-3 px-4 py-3 text-left"
            >
              View Current Picture
            </Button>
            <Button
              onClick={handleChangePicture}
              disabled={picLoading}
              className="w-full mb-3 px-4 py-3 text-left"
            >
              Upload New Picture
            </Button>
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            
            <Button
              variant={"destructive"}
              onClick={handleRemovePicture}
              disabled={picLoading}
              className="w-full px-4 py-3 text-left rounded-lg transition disabled:opacity-50 flex items-center gap-3"
            >
              Remove Picture
            </Button>
          </div>
        </div>
      )}

      {/* Profile Picture Preview Modal */}
      {showPicPreview && (
        <div
          onClick={() => setShowPicPreview(false)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-zoom-out"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <img
              src={user.profilePicture || profileUpload}
              alt="Profile Preview"
              className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl"
            />
            <Button
              onClick={() => setShowPicPreview(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
            >
              <X />
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
                className="text-muted-foreground hover:text-gray-700 text-2xl"
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
                  className=""
                >
                  Cancel
                </Button>
                <Button
                  type="submit"

                  className=""
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <img
            ref={picRef}
            src={user.profilePicture || profileUpload}
            alt="Profile"
            onClick={() => setShowPicDrawer(true)}
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200 object-cover"
          />
          <div>
            <h1 className="text-3xl font-semibold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-muted-foreground text-lg">{user.email}</p>
            <Badge className=" text-sm font-semibold rounded-full capitalize">
              {user.role}
            </Badge>
          </div>
        </div>

        {/* Edit Profile Button */}
        <Button
          onClick={() => {
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
          }}
          className="cursor-pointer"
        >
          <Edit2 />
          Edit Profile
        </Button>
      </div>

      {/* Personal Information Section */}
      <Card className="py-3">
        <CardHeader className="px-3">
          <CardTitle className="text-xl font-semibold ">
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 px-3 md:grid-cols-2 gap-8 text-lg ">
          <div>
            <p className="text-muted-foreground text-sm font-medium">Full Name</p>
            <p className=" font-semibold mt-1">
              {user.firstName} {user.lastName}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm font-medium">Nationality</p>
            <p className=" font-semibold mt-1">
              {user.nationality || "Not set"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm font-medium">Email Address</p>
            <p className=" font-semibold mt-1">{user.email}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm font-medium">Phone Number</p>
            <p className=" font-semibold mt-1">
              {user.phone || "Not set"}
            </p>
          </div>
        </CardContent>

        <CardFooter className="border-t border-gray-200 pt-3 px-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Reply-To Email:</strong> This will be used for calendar invites.
            Default is your account email:
            <span className="font-medium text-gray-700"> {user.email}</span>
          </p>
        </CardFooter>
      </Card>

    </div>
  );
};

export default ProfilePage;