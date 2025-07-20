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

interface BannerFormData {
  link: string;
  image: string;
}

interface ApiError {
  data?: {
    message?: string;
  };
}

interface AddEditBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BannerFormData) => void;
  currentBanner?: BannerFormData;
  loading: boolean;
  err?: ApiError;
}

export default function AddEditBannerModal({
  isOpen,
  onClose,
  onSave,
  currentBanner,
  loading,
  err
}: AddEditBannerModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [altText, setAltText] = useState("");
  const [link, setLink] = useState("");
  const { translate } = useCustomTranslator();

  const [addThumbnail, { isLoading: addThumbnailLoading }] = useAddThumbnailMutation();

  useEffect(() => {
    if (currentBanner) {
      setPreview(currentBanner.image || null);
      setLink(currentBanner.link || "");
    } else {
      setPreview(null);
      setLink("");
    }
    setError(null);
    setFile(null);
  }, [currentBanner, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        setError(translate("একটি ইমেজ ফাইল আপলোড করুন", "Please upload an image file"));
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleSave = async () => {
    setError(null);

    if (!link.trim()) {
      setError(translate("একটি লিংক লিখুন", "Please enter a link"));
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
        formData.append("link", link);
        if (altText) {
          formData.append("alt", altText);
        }

        const uploadResponse = await addThumbnail(formData).unwrap();

        if (uploadResponse?.data) {
          image = Array.isArray(uploadResponse.data) 
            ? uploadResponse.data[0]
            : uploadResponse.data;
        }
      } catch (err) {
        console.error("Error uploading file:", err);
        setError(translate("ইমেজ আপলোড করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।", "Failed to upload image. Please try again."));
        return;
      }
    }

    const payload: BannerFormData = {
      link: link.trim(),
      image: image
    };

    onSave(payload);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currentBanner ? translate("ব্যানার সম্পাদনা করুন", "Edit Banner") : translate("ব্যানার যোগ করুন", "Add Banner")}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <InputWrapper label={translate("লিংক", "Link")}>
            <Input
              type="text"
              placeholder={translate("লিংক লিখুন (যেমনঃ test/link)", "Enter link (e.g., test/link)")}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper label={translate("ব্যানার ইমেজ (1920×600px)", "Banner Image (1920×600px)")}>
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
                {translate("প্রস্তাবিত সাইজ: 1920×600px", "Recommended size: 1920×600px")}
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

          <InputWrapper label={translate("অল্টারনেটিভ টেক্সট", "Alt Text")}>
            <Input
              placeholder={translate("অ্যাক্সেসিবিলিটির জন্য ইমেজ বর্ণনা লিখুন", "Enter image description for accessibility")}
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
            />
          </InputWrapper>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {err && "data" in err && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{translate("ত্রুটি", "Error")}</AlertTitle>
              <AlertDescription>
                {(err.data as { message?: string })?.message ||
                  translate("কিছু ভুল হয়েছে! দয়া করে আবার চেষ্টা করুন।", "Something went wrong! Please try again.")}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translate("বাতিল", "Cancel")}
          </Button>
          <Button
            onClick={handleSave}
            disabled={addThumbnailLoading || loading || !link || (!file && !preview)}
          >
            {addThumbnailLoading || loading ? <ButtonLoader /> : translate("সংরক্ষণ করুন", "Save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}