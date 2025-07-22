"use client"
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import InputField from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ButtonLoader from "@/components/common/ButtonLoader";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface ShippingMethod {
  id: number;
  name: string;
  price: number;
  isActive: boolean;
  shipped: "In_Dhaka" | "Out_Dhaka" | "Both";
}

interface ShippingMethodFormData {
  id: number | null;
  name: string;
  price: number;
  isActive: boolean;
  shipped: "In_Dhaka" | "Out_Dhaka" | "Both";
}

interface AddEditShippingMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ShippingMethodFormData) => void;
  currentMethod: ShippingMethod | null;
  isLoading: boolean;
}

const AddEditShippingMethodModal = ({
  isOpen,
  onClose,
  onSave,
  currentMethod,
  isLoading,
}: AddEditShippingMethodModalProps) => {
  const { translate } = useCustomTranslator();
  const [formData, setFormData] = useState<ShippingMethodFormData>({
    id: null,
    name: "",
    price: 0,
    isActive: true,
    shipped: "In_Dhaka",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentMethod) {
      setFormData({
        id: currentMethod.id,
        name: currentMethod.name,
        price: currentMethod.price,
        isActive: currentMethod.isActive,
        shipped: currentMethod.shipped,
      });
    } else {
      setFormData({
        id: null,
        name: "",
        price: 0,
        isActive: true,
        shipped: "In_Dhaka",
      });
    }
    setError(null);
  }, [currentMethod, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      setError(translate(
        "শিপিং মেথডের নাম খালি রাখা যাবে না",
        "Shipping method name cannot be empty"
      ));
      return;
    }

    if (formData.price < 0) {
      setError(translate(
        "মূল্য অবশ্যই একটি বৈধ ধনাত্মক সংখ্যা হতে হবে",
        "Price must be a valid positive number"
      ));
      return;
    }

    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {currentMethod
              ? translate("শিপিং মেথড সম্পাদনা করুন", "Edit Shipping Method")
              : translate("শিপিং মেথড যোগ করুন", "Add Shipping Method")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {translate("শিপিং মেথডের নাম *", "Shipping Method Name *")}
            </label>
            <InputField
              type="text"
              name="name"
              placeholder={translate("শিপিং মেথডের নাম লিখুন", "Enter shipping method name")}
              value={formData.name}
              onChange={handleInputChange}
              errorMessage={error?.includes("name") ? error : undefined}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {translate("মূল্য *", "Price *")}
            </label>
            <InputField
              type="number"
              name="price"
              placeholder={translate("মূল্য লিখুন", "Enter price")}
              value={formData.price.toString()}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              errorMessage={error?.includes("Price") ? error : undefined}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {translate("শিপিং এলাকা *", "Shipping Coverage *")}
            </label>
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
              value={formData.shipped}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  shipped: e.target.value as "In_Dhaka" | "Out_Dhaka" | "Both",
                }))
              }
            >
              <option value="In_Dhaka">
                {translate("ঢাকার ভিতরে", "Inside Dhaka")}
              </option>
              <option value="Out_Dhaka">
                {translate("ঢাকার বাইরে", "Outside Dhaka")}
              </option>
              <option value="Both">
                {translate("উভয়", "Both")}
              </option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, isActive: e.target.checked }))
              }
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {translate("সক্রিয়", "Active")}
            </label>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{translate("ত্রুটি", "Error")}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {translate("বাতিল", "Cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#EE5A2C] hover:bg-orange-800 text-white"
            disabled={!formData.name.trim() || isLoading}
          >
            {isLoading && <ButtonLoader />}
            {currentMethod
              ? translate("আপডেট করুন", "Update")
              : translate("যোগ করুন", "Add")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditShippingMethodModal;