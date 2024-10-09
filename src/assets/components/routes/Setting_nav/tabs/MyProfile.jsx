import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import CopyableText from "../../../ui/CopyableText";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// Form validation schema using zod
const formSchema = z.object({
  firstName: z.string().min(2, "First name is required."),
  lastName: z.string().min(2, "Last name is required."),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .regex(/^\d+$/, "Phone number must contain only numbers."),
});

function ListAllLandlord({ userCredentials }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: userCredentials?.first_name || "",
      lastName: userCredentials?.last_name || "",
      email: userCredentials?.email || "",
      role: userCredentials?.role || "",
      phone: userCredentials?.phone_num || "",
    },
  });

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const subscription = form.watch((value) => {
      const hasChanges =
        value.firstName !== userCredentials.first_name ||
        value.lastName !== userCredentials.last_name ||
        value.email !== userCredentials.email ||
        value.role !== userCredentials.role ||
        value.phone !== userCredentials.phone_num;

      setIsChanged(hasChanges); // Moved setIsChanged inside the condition check
    });

    return () => subscription.unsubscribe();
  }, [form, userCredentials]);
  // Function to toggle edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to cancel edit mode
  const handleCancel = () => {
    form.reset({
      firstName: userCredentials?.first_name,
      lastName: userCredentials?.last_name,
      email: userCredentials?.email,
      role: userCredentials?.role,
      phone: userCredentials?.phone_num,
    });
    setIsEditing(false); // Exit edit mode
  };

  // Submit handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Ensure data structure is correct
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        phone: data.phone,
      };

      const response = await axios.put(
        `/user/admin-edit/${userCredentials._id}`,
        payload
      );
      toast({
        title: "Success",
        description: "Admin updated successfully.",
        status: "success",
        variant: "success",
      });
      closeModal();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast({
        description: errorMessage, // Use the extracted error message
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="block pb-5 translate-all duration-300">
      <div className="flex justify-between items-center p-4">
        <div>
          <h1 className="font-bold text-2xl">My Profile</h1>
          <p className="font-thin text-sm">Manage and protect your account.</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 py-4">
        <div className="w-full lg:w-1/4 p-4 rounded-md flex flex-col items-center">
          <Avatar className="w-36 h-36 mb-4">
            {userCredentials?.profilePicture ? (
              <AvatarImage
                src={userCredentials.profilePicture}
                alt="admin_photo"
              />
            ) : (
              <AvatarFallback className="w-full h-full">
                <FaUserCircle className="w-full h-full" />
              </AvatarFallback>
            )}
          </Avatar>
          <span className="cursor-pointer text-red-500 hover:underline text-sm">
            Remove Image
          </span>
        </div>

        {/* Right side */}
        <div className="w-full lg:w-2/3 p-4 rounded-md shadow">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex space-x-4">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex space-x-4 py-4">
                {/* email*/}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {!isEditing ? (
                <Button className="flex ml-auto" onClick={handleEdit}>
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-4">
                  <Button
                  className="flex ml-auto"
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex ml-auto"
                    type="submit"
                    disabled={loading || !isChanged || !form.formState.isValid}
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default ListAllLandlord;
