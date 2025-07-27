"use client";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { AlertCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { useAddThumbnailMutation } from "@/redux/features/file/fileApi";
import InputWrapper from "@/components/common/Wrapper/InputWrapper";
import ButtonLoader from "@/components/common/ButtonLoader";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface AdvertiseBannerFormData {
  priority: number;
  advertiseType: string;
  image: string;
  slug: string;
  startDate: string;
  endDate: string;
  perDayAmount: number;
  totalAmount: number;
  isActive: boolean;
}

interface ApiError {
  data?: {
    message?: string;
  };
}

interface AddEditAdvertiseBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AdvertiseBannerFormData) => void;
  currentBanner?: AdvertiseBannerFormData;
  loading: boolean;
  err?: ApiError;
}

export default function AddEditAdvertiseBannerModal({
  isOpen,
  onClose,
  onSave,
  currentBanner,
  loading,
  err,
}: AddEditAdvertiseBannerModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [priority, setPriority] = useState<number>(100);
  const [advertiseType, setAdvertiseType] = useState<string>("Product");
  const [slug, setSlug] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [perDayAmount, setPerDayAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const { translate } = useCustomTranslator();

  const [addThumbnail, { isLoading: addThumbnailLoading }] =
    useAddThumbnailMutation();

    const formatDateForInput = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

  useEffect(() => {
    if (currentBanner) {
      setPreview(currentBanner.image || null);
      setPriority(currentBanner.priority || 100);
      setAdvertiseType(currentBanner.advertiseType || "Product");
      setSlug(currentBanner.slug || "");
      setStartDate(currentBanner.startDate ? formatDateForInput(currentBanner.startDate) : "");
    setEndDate(currentBanner.endDate ? formatDateForInput(currentBanner.endDate) : "");
      setPerDayAmount(currentBanner.perDayAmount || 0);
      setTotalAmount(currentBanner.totalAmount || 0);
      setIsActive(
        currentBanner.isActive !== undefined ? currentBanner.isActive : true
      );
    } else {
      setPreview(null);
      setPriority(100);
      setAdvertiseType("Product");
      setSlug("");
      setStartDate("");
      setEndDate("");
      setPerDayAmount(0);
      setTotalAmount(0);
      setIsActive(true);
    }
    setError(null);
    setFile(null);
  }, [currentBanner, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setError(
          translate("একটি ইমেজ ফাইল আপলোড করুন", "Please upload an image file")
        );
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleSave = async () => {
    setError(null);

    if (!slug.trim()) {
      setError(translate("একটি স্লাগ লিখুন", "Please enter a slug"));
      return;
    }

    if (!startDate) {
      setError(
        translate("শুরু তারিখ নির্বাচন করুন", "Please select start date")
      );
      return;
    }

    if (!endDate) {
      setError(translate("শেষ তারিখ নির্বাচন করুন", "Please select end date"));
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError(
        translate(
          "শেষ তারিখ শুরু তারিখের পরে হতে হবে",
          "End date must be after start date"
        )
      );
      return;
    }

    if (!file && !preview) {
      setError(translate("একটি ইমেজ আপলোড করুন", "Please upload an image"));
      return;
    }

    let image = preview || "";

    if (file && (!preview || preview.startsWith("blob:"))) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        if (slug) {
          formData.append("slug", slug);
        }

        const uploadResponse = await addThumbnail(formData).unwrap();

        if (uploadResponse?.data) {
          image = Array.isArray(uploadResponse.data)
            ? uploadResponse.data[0]
            : uploadResponse.data;
        }
      } catch (err) {
        console.error("Error uploading file:", err);
        setError(
          translate(
            "ইমেজ আপলোড করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
            "Failed to upload image. Please try again."
          )
        );
        return;
      }
    }

    const payload: AdvertiseBannerFormData = {
      priority,
      advertiseType,
      image,
      slug: slug.trim(),
      startDate,
      endDate,
      perDayAmount,
      totalAmount,
      isActive,
    };

    onSave(payload);
  };

  const calculateTotalAmount = (days: number, dailyRate: number) => {
    return days * dailyRate;
  };

  useEffect(() => {
    if (startDate && endDate && perDayAmount > 0) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
      setTotalAmount(calculateTotalAmount(diffDays, perDayAmount));
    }
  }, [startDate, endDate, perDayAmount]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {currentBanner
              ? translate(
                  "বিজ্ঞাপন ব্যানার সম্পাদনা করুন",
                  "Edit Advertise Banner"
                )
              : translate("বিজ্ঞাপন ব্যানার যোগ করুন", "Add Advertise Banner")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWrapper label={translate("অগ্রাধিকার", "Priority")}>
              <Input
                type="number"
                placeholder={translate("অগ্রাধিকার লিখুন", "Enter priority")}
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                min="1"
              />
            </InputWrapper>

           <div className="mt-2">
  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
    {translate("ধরণ", "Type")}
  </label>
  <select
    className="w-full rounded-lg p-2 dark:bg-black dark:text-white border  focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={advertiseType}
    onChange={(e) => setAdvertiseType(e.target.value)}
  >
    <option value="Product">{translate("পণ্য", "Product")}</option>
    <option value="Shop">{translate("দোকান", "Shop")}</option>
  </select>
</div>

            <InputWrapper label={translate("স্লাগ", "Slug")}>
              <Input
                type="text"
                placeholder={translate("স্লাগ লিখুন", "Enter slug")}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper label={translate("শুরু তারিখ", "Start Date")}>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper label={translate("শেষ তারিখ", "End Date")}>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
              />
            </InputWrapper>

            <InputWrapper
              label={translate("প্রতিদিনের মূল্য", "Per Day Amount")}
            >
              <Input
                type="number"
                placeholder={translate(
                  "প্রতিদিনের মূল্য লিখুন",
                  "Enter per day amount"
                )}
                value={perDayAmount === 0 ? "" : perDayAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  setPerDayAmount(value === "" ? 0 : Number(value));
                }}
                min="0"
                step="0.01"
              />
            </InputWrapper>

            <InputWrapper label={translate("মোট মূল্য", "Total Amount")}>
              <Input
                type="number"
                value={totalAmount === 0 ? "" : totalAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  setTotalAmount(value === "" ? 0 : Number(value));
                }}
              />
            </InputWrapper>
          </div>

          <InputWrapper
            label={translate("বিজ্ঞাপন ব্যানার ইমেজ", "Advertise Banner Image")}
          >
            <div className="border-2 border-dashed rounded-md p-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              />
              <p className="mt-2 text-xs text-gray-500">
                {translate(
                  "প্রস্তাবিত সাইজ: 1920×600px",
                  "Recommended size: 1920×600px"
                )}
              </p>
            </div>
          </InputWrapper>

          {preview && (
            <div className="relative w-full h-40 border rounded-md overflow-hidden mt-2">
              <Image
                width={100}
                height={100}
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={() => {
                  setPreview(null);
                  setFile(null);
                }}
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <InputWrapper label={translate("স্ট্যাটাস", "Status")}>
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                  {isActive
                    ? translate("সক্রিয়", "Active")
                    : translate("নিষ্ক্রিয়", "Inactive")}
                </span>
              </label>
            </div>
          </InputWrapper>

          {err && "data" in err && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{translate("ত্রুটি", "Error")}</AlertTitle>
              <AlertDescription>
                {(err.data as { message?: string })?.message ||
                  translate(
                    "কিছু ভুল হয়েছে! দয়া করে আবার চেষ্টা করুন।",
                    "Something went wrong! Please try again."
                  )}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translate("বাতিল", "Cancel")}
          </Button>
          <Button
          className="bg-[#EE5A2C] text-white"
            onClick={handleSave}
            disabled={
              addThumbnailLoading ||
              loading ||
              !slug ||
              !startDate ||
              !endDate ||
              (!file && !preview)
            }
          >
            {addThumbnailLoading || loading ? (
              <ButtonLoader />
            ) : (
              translate("সংরক্ষণ করুন", "Save")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
