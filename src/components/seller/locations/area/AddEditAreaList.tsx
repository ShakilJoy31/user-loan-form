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
import { useGetAllCitiesQuery } from "@/redux/features/seller-auth/sellerLogin";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface Area {
  id: number;
  name: string;
  cityId: number;
}

interface City {
  id: number;
  name: string;
}

interface AddEditAreaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number | null, data: { cityId: number; name: string }) => void;
  currentArea: Area | null;
  loading: boolean;
  err?: {
    data?: {
      message?: string;
    };
  };
}

const AddEditAreaList = ({
  isOpen,
  onClose,
  onSave,
  currentArea,
  loading,
  err,
}: AddEditAreaProps) => {
  const [name, setName] = useState(currentArea?.name || "");
  const [cityId, setCityId] = useState<number>(currentArea?.cityId || 0);
  const [error, setError] = useState<string | null>(null);
  const { translate } = useCustomTranslator();

  const { data: citiesData } = useGetAllCitiesQuery({});

  const cities = citiesData?.data || [];

  useEffect(() => {
    setName(currentArea?.name || "");
    setCityId(currentArea?.cityId || 0);
    setError(null);
  }, [currentArea]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError(translate("এলাকার নাম খালি রাখা যাবে না", "Area name cannot be empty"));
      return;
    }
    if (!cityId) {
      setError(translate("একটি শহর নির্বাচন করুন", "Please select a city"));
      return;
    }

    try {
      onSave(currentArea?.id || null, { cityId, name: name.trim() });
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
            {currentArea ? translate("এলাকা সম্পাদনা করুন", "Edit Area") : translate("এলাকা যোগ করুন", "Add Area")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 dark:bg-black dark:text-white">
          <div>
            <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-1">
              {translate("শহর", "City")}
            </label>
            <select
              id="city-select"
              value={cityId}
              onChange={(e) => {
                setCityId(Number(e.target.value));
                setError(null);
              }}
              className={`w-full p-2 dark:bg-black dark:text-white border rounded-md focus:ring-2 focus:ring-[#EE5A2C] focus:border-[#EE5A2C] outline-none ${
                !cityId && error ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value={0}>{translate("শহর নির্বাচন করুন", "Select City")}</option>
              {cities.map((city: City) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {!cityId && error && (
              <p className="mt-1 text-sm text-red-600">
                {translate("একটি শহর নির্বাচন করুন", "Please select a city")}
              </p>
            )}
          </div>
          <InputField
            type="text"
            placeholder={translate("এলাকার নাম লিখুন", "Enter area name")}
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
            disabled={!name.trim() || !cityId || loading}
          >
            {loading && <ButtonLoader />} {translate("সংরক্ষণ করুন", "Save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditAreaList;