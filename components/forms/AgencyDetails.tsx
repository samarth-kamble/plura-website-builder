"use client";

import * as z from "zod";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumberInput } from "@tremor/react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Target,
  Trash2,
  Upload,
  Settings,
  Zap,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

import { type AgencyDetails } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AgencyDetailsSchema } from "@/schema";
import FileUpload from "@/components/FileUpload";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import Logo from "@/public/assets/plura-logo.svg";

import {
  saveActivityLogsNotification,
  updateAgencyDetails,
} from "@/lib/queries";

const AgencyDetails = ({ data }: AgencyDetails) => {
  const router = useRouter();
  const [deletingAgency, setDeletingAgency] = useState(false);

  const form = useForm<z.infer<typeof AgencyDetailsSchema>>({
    mode: "onChange",
    resolver: zodResolver(AgencyDetailsSchema),
    defaultValues: {
      name: data?.name || "",
      companyEmail: data?.companyEmail || "",
      companyPhone: data?.companyPhone || "",
      whiteLabel: data?.whiteLabel || false,
      address: data?.address || "",
      city: data?.city || "",
      zipCode: data?.zipCode || "",
      state: data?.state || "",
      country: data?.country || "",
      agencyLogo: data?.agencyLogo || "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  const handleSubmit = async (values: z.infer<typeof AgencyDetailsSchema>) => {
    try {
      // Call your API to create or update the agency details
      // await createOrUpdateAgency(values);
      toast.success("Agency details saved successfully!");
      router.push("/agency");
    } catch {
      toast.error("Failed to save agency details.", {
        description: "Please try again later.",
      });
    }
  };

  const handleDeleteAgency = async () => {
    if (!data?.id) return;
    setDeletingAgency(true);

    try {
      toast.success("Deleted Agency", {
        description: "Your agency has been deleted successfully.",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Oops", {
        description: "Something went wrong while deleting the agency.",
      });
    }
    setDeletingAgency(false);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#d97757]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Enhanced Header */}
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center justify-center p-1 rounded-2xl bg-gradient-to-r from-[#d97757]/20 via-[#d97757]/10 to-transparent border border-[#d97757]/20 mb-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 px-6 py-3">
              <div className="relative">
                <div className="absolute inset-0 bg-[#d97757] rounded-xl blur-lg opacity-50"></div>
                <div className="relative p-3 rounded-xl shadow-xl">
                  <Image
                    src={Logo}
                    alt="Plura Logo"
                    className="h-12 w-12 object-contain"
                  />
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#d97757] via-[#d97757]/80 to-[#d97757]/60 bg-clip-text text-transparent">
                  Plura
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Verified Platform
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            Create and manage your digital agency with our comprehensive
            platform designed for{" "}
            <span className="text-[#d97757] font-semibold">
              modern agencies.
            </span>
          </p>
        </div>

        <AlertDialog>
          <Card className="backdrop-blur-xl border-0 shadow-2xl ring-1 ring-gray-200/50 dark:ring-gray-700/50 overflow-hidden">
            <CardHeader className="border-b border-[#d97757]/10 relative">
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="relative">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#d97757] to-[#d97757]/80 shadow-lg ring-4 ring-[#d97757]/20">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Agency Information
                  </CardTitle>
                  <CardDescription className="text-lg mt-2 font-medium">
                    Set up your agency profile and business details. You can
                    modify these settings anytime.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-10">
              <Form {...form}>
                <div className="space-y-12">
                  {/* Enhanced Logo Upload Section */}
                  <div className="text-center">
                    <FormField
                      disabled={isLoading}
                      control={form.control}
                      name="agencyLogo"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative inline-block">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#d97757]/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                            <div className="relative rounded-2xl p-8 border-2 border-dashed border-[#d97757]/30 hover:border-[#d97757]/50 transition-all duration-300">
                              <div className="mb-4">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#d97757]/10 border border-[#d97757]/20">
                                  <Upload className="h-5 w-5 text-[#d97757]" />
                                  <FormLabel className="text-lg font-semibold text-[#d97757] cursor-pointer">
                                    Agency Logo
                                  </FormLabel>
                                </div>
                              </div>
                              <FormControl>
                                <div className="max-w-md mx-auto">
                                  <FileUpload
                                    apiEndpoint="agencyLogo"
                                    onChange={field.onChange}
                                    value={field.value}
                                  />
                                </div>
                              </FormControl>
                              <p className="text-sm text-muted-foreground mt-4 max-w-sm mx-auto">
                                Upload a high-quality logo that represents your
                                agency. Recommended size: 400x400px
                              </p>
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Enhanced Two Column Layout */}
                  <div className="grid lg:grid-cols-2 gap-16">
                    {/* Left Column - Enhanced Basic Info */}
                    <div className="space-y-8">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#d97757]/10 to-transparent rounded-xl blur-sm"></div>
                        <div className="relative bg-gradient-to-r from-[#d97757]/5 to-transparent rounded-xl p-6 border-l-4 border-[#d97757]">
                          <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                            <Building2 className="h-6 w-6 text-[#d97757]" />
                            Basic Information
                          </h3>
                          <p className="text-muted-foreground">
                            Essential details about your agency
                          </p>
                        </div>
                      </div>

                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-base font-semibold">
                              <Building2 className="h-4 w-4 text-[#d97757]" />
                              Agency Name
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  placeholder="Enter your agency name"
                                  className="h-14 text-base pl-4 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 hover:border-[#d97757]/50 focus:border-[#d97757] transition-all duration-300 rounded-xl"
                                />
                                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200/50 dark:ring-gray-700/50 pointer-events-none"></div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="companyEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-base font-semibold">
                              <Mail className="h-4 w-4 text-[#d97757]" />
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  readOnly
                                  placeholder="company@example.com"
                                  className="h-14 text-base pl-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-not-allowed"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="companyPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-base font-semibold">
                              <Phone className="h-4 w-4 text-[#d97757]" />
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="+1 (555) 123-4567"
                                  {...field}
                                  className="h-14 text-base pl-4 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 hover:border-[#d97757]/50 focus:border-[#d97757] transition-all duration-300 rounded-xl"
                                />
                                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200/50 dark:ring-gray-700/50 pointer-events-none"></div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="whiteLabel"
                        render={({ field }) => {
                          return (
                            <FormItem className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-[#d97757]/10 to-purple-500/10 rounded-2xl blur-sm"></div>
                              <div className="relative flex flex-row items-center justify-between rounded-2xl border-2 border-dashed border-[#d97757]/30 bg-gradient-to-r from-[#d97757]/5 to-transparent p-8 hover:border-[#d97757]/50 transition-all duration-300">
                                <div>
                                  <FormLabel className="text-lg font-bold flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-[#d97757]/20">
                                      <Zap className="h-5 w-5 text-[#d97757]" />
                                    </div>
                                    White Label Mode
                                  </FormLabel>
                                  <FormDescription className="text-base font-medium">
                                    Enable white labeling to display your agency
                                    logo across all sub-accounts by default.
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <div className="relative">
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-[#d97757] scale-125"
                                    />
                                    {field.value && (
                                      <div className="absolute -top-2 -right-2">
                                        <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                                      </div>
                                    )}
                                  </div>
                                </FormControl>
                              </div>
                            </FormItem>
                          );
                        }}
                      />
                    </div>

                    {/* Right Column - Enhanced Location Info */}
                    <div className="space-y-8">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-xl blur-sm"></div>
                        <div className="relative bg-gradient-to-r from-blue-500/5 to-transparent rounded-xl p-6 border-l-4 border-blue-500">
                          <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                            <MapPin className="h-6 w-6 text-blue-500" />
                            Location Details
                          </h3>
                          <p className="text-muted-foreground">
                            Where your agency is located
                          </p>
                        </div>
                      </div>

                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-base font-semibold">
                              <MapPin className="h-4 w-4 text-blue-500" />
                              Street Address
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="123 Business Street"
                                  {...field}
                                  className="h-14 text-base pl-4 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300 rounded-xl"
                                />
                                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200/50 dark:ring-gray-700/50 pointer-events-none"></div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          disabled={isLoading}
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-semibold">
                                City
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="New York"
                                  {...field}
                                  className="h-14 text-base pl-4 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300 rounded-xl"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          disabled={isLoading}
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-semibold">
                                State/Province
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="NY"
                                  {...field}
                                  className="h-14 text-base pl-4 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300 rounded-xl"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          disabled={isLoading}
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-semibold">
                                Zip Code
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="10001"
                                  {...field}
                                  className="h-14 text-base pl-4 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300 rounded-xl"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          disabled={isLoading}
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-base font-semibold">
                                <Globe className="h-4 w-4 text-blue-500" />
                                Country
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="United States"
                                  {...field}
                                  className="h-14 text-base pl-4 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500/50 focus:border-blue-500 transition-all duration-300 rounded-xl"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {data?.id && (
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-[#d97757]/10 rounded-2xl blur-sm"></div>
                          <div className="relative bg-gradient-to-r from-purple-500/5 via-transparent to-[#d97757]/5 p-8 rounded-2xl border-2 border-dashed border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                            <FormLabel className="text-xl font-bold flex items-center gap-3 mb-4">
                              <div className="p-2 rounded-lg bg-purple-500/20">
                                <Target className="h-6 w-6 text-purple-500" />
                              </div>
                              Agency Goal
                            </FormLabel>
                            <FormDescription className="mb-6 text-base font-medium">
                              Set an ambitious goal for your agency. As your
                              business grows, don&apos;t forget to raise the
                              bar!
                            </FormDescription>
                            <NumberInput
                              defaultValue={data?.goal}
                              onValueChange={async (val) => {
                                if (!data?.id) return;
                                await updateAgencyDetails(data.id, {
                                  goal: val,
                                });
                                await saveActivityLogsNotification({
                                  agencyId: data.id,
                                  description: `Updated the agency goal to ${val} Sub Accounts`,
                                  subAccountId: undefined,
                                });
                                router.refresh();
                              }}
                              min={1}
                              className="bg-white/70 dark:bg-gray-800/70 !border-2 !border-purple-500/30 hover:!border-purple-500/50 h-14 text-base rounded-xl"
                              placeholder="Enter your sub-account goal"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Submit Button */}
                  <div className="flex justify-center pt-8 border-t-2 border-gray-200/50 dark:border-gray-700/50">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#d97757] to-[#d97757]/70 rounded-2xl blur-lg opacity-50"></div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        onClick={form.handleSubmit(handleSubmit)}
                        className="relative h-16 px-12 bg-gradient-to-r from-[#d97757] to-[#d97757]/80 hover:from-[#d97757]/90 hover:to-[#d97757]/70 text-white font-bold text-lg min-w-[250px] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                      >
                        {isLoading ? (
                          <Loading />
                        ) : (
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5" />
                            Save Agency Information
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>

              {/* Enhanced Danger Zone */}
              {data?.id && (
                <div className="mt-16 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur-sm"></div>
                  <div className="relative p-8 rounded-2xl border-2 border-dashed border-red-500/30 bg-gradient-to-r from-red-500/5 to-orange-500/5 hover:border-red-500/50 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-red-500/20">
                        <Trash2 className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
                          Danger Zone
                        </h3>
                        <p className="text-red-600/70 dark:text-red-400/70 font-medium">
                          Irreversible actions
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                      Deleting your agency cannot be undone. This will
                      permanently delete all sub-accounts, funnels, contacts,
                      and related data. Proceed with extreme caution.
                    </p>
                    <AlertDialogTrigger
                      disabled={isLoading || deletingAgency}
                      className="inline-flex items-center justify-center gap-3 h-12 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Trash2 className="h-4 w-4" />
                      {deletingAgency ? "Deleting..." : "Delete Agency"}
                    </AlertDialogTrigger>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Alert Dialog */}
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-left flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <Trash2 className="h-5 w-5 text-red-500" />
                </div>
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left text-base leading-relaxed">
                This action cannot be undone. This will permanently delete your
                agency account and all related sub-accounts, including all data,
                funnels, and contacts.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex items-center gap-3">
              <AlertDialogCancel className="flex-1 h-11">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={deletingAgency}
                className="flex-1 h-11 bg-red-500 hover:bg-red-600"
                onClick={handleDeleteAgency}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Permanently
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AgencyDetails;
