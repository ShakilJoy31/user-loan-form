"use client"
import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ButtonLoader from "@/components/common/ButtonLoader";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface SellerRequest {
  id: number;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

interface EditSellerReqProps {
  isOpen: boolean;
  onClose: () => void;
  currentRequest: SellerRequest;
  onUpdateStatus: (id: number, status: string) => void;
  loading: boolean;
  err?: {
    data?: {
      message?: string;
    };
  };
}

const EditSellerReq = ({
  isOpen,
  onClose,
  currentRequest,
  onUpdateStatus,
  loading,
  err,
}: EditSellerReqProps) => {
  const { translate } = useCustomTranslator();
  const [status, setStatus] = useState(currentRequest?.status || "PENDING");

  useEffect(() => {
    setStatus(currentRequest?.status || "PENDING");
  }, [currentRequest]);

  const handleSubmit = () => {
    if (!status) {
      toast.error(translate("স্ট্যাটাস নির্বাচন করুন", "Please select a status"));
      return;
    }

    try {
      onUpdateStatus(currentRequest.id, status);
    } catch (error) {
      console.error(error);
      toast.error(translate("কিছু ভুল হয়েছে! দয়া করে আবার চেষ্টা করুন।", "Something went wrong! Please try again."));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {translate("বিক্রেতা অনুরোধ সম্পাদনা করুন", "Edit Seller Request")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {translate("নাম", "Name")}
              </label>
              <p className="text-sm text-gray-900 dark:text-white">{currentRequest.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {translate("ইমেইল", "Email")}
              </label>
              <p className="text-sm text-gray-900 dark:text-white">{currentRequest.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {translate("বর্তমান স্ট্যাটাস", "Current Status")}
              </label>
              <p className="text-sm text-gray-900 dark:text-white">{currentRequest.status}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {translate("তারিখ", "Date")}
              </label>
              <p className="text-sm text-gray-900 dark:text-white">
                {new Date(currentRequest.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {translate("নতুন স্ট্যাটাস", "New Status")}
            </label>
            <select
              className="w-full border rounded px-3 py-2 text-gray-700"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="PENDING">{translate("মুলতুবি", "Pending")}</option>
              <option value="APPROVED">{translate("অনুমোদিত", "Approved")}</option>
              <option value="REJECTED">{translate("প্রত্যাখ্যাত", "Rejected")}</option>
            </select>
          </div>
        </div>

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

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translate("বাতিল", "Cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#EE5A2C] text-white"
            disabled={loading || status === currentRequest.status}
          >
            {loading && <ButtonLoader />} {translate("আপডেট করুন", "Update")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSellerReq;