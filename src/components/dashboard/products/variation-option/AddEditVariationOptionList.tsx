"use client"
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import InputField from "@/components/ui/input";
import ButtonLoader from "@/components/common/ButtonLoader";
import { Button } from "@/components/ui/button";
import { useGetAllVariationsQuery } from "@/redux/features/product/variationApi";
import toast from "react-hot-toast";

interface VariationOption {
  id: number;
  name: string;
  value: string;
  variationId: number;
  variation: {
    name: string;
  };
}
interface AddEditVariationOptionListProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; variationId: number }) => void;
  initialData: VariationOption | null;
  loading: boolean;
}

const AddEditVariationOptionList = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  loading,
}: AddEditVariationOptionListProps) => {
  const { data: variationsData } = useGetAllVariationsQuery({ page: 1, size: 1000 });
  const [value, setValue] = useState(initialData?.value || "");
  const [variationId, setVariationId] = useState(initialData?.variationId || 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setValue(initialData.value);
      setVariationId(initialData.variationId);
    } else {
      setValue("");
      setVariationId(0);
    }
    setError(null);
  }, [initialData]);

  const handleSubmit = () => {
    if (!value.trim()) {
      setError("Value cannot be empty");
      return;
    }
    if (!variationId) {
      setError("Please select a variation");
      return;
    }

    try {
      onSubmit({
        name: value.trim(),
        variationId: variationId
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");   
      setError(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {initialData ? "Edit Variation Option" : "Add Variation Option"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Variation *
            </label>
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={variationId}
              onChange={(e) => {
                setVariationId(Number(e.target.value));
                setError(null);
              }}
            >
              <option value={0}>Select Variation</option>
              {variationsData?.data.map((variation: { id: number; name: string }) => (
                <option key={variation.id} value={variation.id}>
                  {variation.name}
                </option>
              ))}
            </select>
            {error && error.includes("Variation") && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>

          <InputField
            type="text"
            label="Name *"
            placeholder="Enter option value"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(null);
            }}
            errorMessage={error && error.includes("Value") ? error : undefined}
          />
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={!value.trim() || !variationId || loading}
          >
            {loading && <ButtonLoader />} 
            {initialData ? "Update" : "Add"} Variation Option
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditVariationOptionList;