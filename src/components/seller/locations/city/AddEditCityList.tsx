"use client"
import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import InputField from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ButtonLoader from "@/components/common/ButtonLoader";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface City {
  id: number;
  name: string;
}

interface AddEditCityProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number | null, name: string) => void;
  currentCity: City | null;
  loading: boolean;
  err?: {
    data?: {
      message?: string;
    };
  };
}

const AddEditCityList = ({
  isOpen,
  onClose,
  onSave,
  currentCity,
  loading,
  err,
}: AddEditCityProps) => {
  const [name, setName] = useState(currentCity?.name || "");
  const [error, setError] = useState<string | null>(null);
  const { translate } = useCustomTranslator();

  useEffect(() => {
    setName(currentCity?.name || "");
    setError(null);
  }, [currentCity]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError(translate("শহরের নাম খালি রাখা যাবে না", "City name cannot be empty"));
      return;
    }

    try {
      onSave(currentCity?.id || null, name.trim());
    } catch (error) {
      console.error(error);
      toast.error(translate("কিছু ভুল হয়েছে! দয়া করে আবার চেষ্টা করুন।", "Something went wrong! Please try again."));
      setError(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentCity ? translate("শহর সম্পাদনা করুন", "Edit City") : translate("শহর যোগ করুন", "Add City")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <InputField
            type="text"
            placeholder={translate("শহরের নাম লিখুন", "Enter city name")}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
            errorMessage={error || undefined}
          />
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
            disabled={!name.trim() || loading}
          >
            {loading && <ButtonLoader />} {translate("সংরক্ষণ করুন", "Save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditCityList;