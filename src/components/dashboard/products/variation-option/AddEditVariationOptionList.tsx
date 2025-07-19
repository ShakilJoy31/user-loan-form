"use client"
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import InputField from "@/components/ui/input";
import ButtonLoader from "@/components/common/ButtonLoader";
import { Button } from "@/components/ui/button";
import { useGetAllVariationsQuery } from "@/redux/features/product/variationApi";

interface Variation {
  id: number;
  name: string;
}

interface VariationOption {
  id: number;
  name: string;
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
  const [name, setName] = useState("");
  const [variationId, setVariationId] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setVariationId(initialData.variationId || 0);
    } else {
      setName("");
      setVariationId(0);
    }
    setError(null);
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }
    if (!variationId) {
      setError("Please select a variation");
      return;
    }

    onSubmit({
      name: name.trim(),
      variationId: variationId
    });
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
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
              value={variationId}
              onChange={(e) => {
                setVariationId(Number(e.target.value));
                if (error?.includes("Variation")) setError(null);
              }}
            >
              <option value={0}>Select Variation</option>
              {variationsData?.data?.map((variation: Variation) => (
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
            placeholder="Enter option name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error?.includes("Name")) setError(null);
            }}
            errorMessage={error && error.includes("Name") ? error : undefined}
          />
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-gray-300 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#EE5A2C] hover:bg-orange-800 text-white cursor-pointer"
            disabled={!name.trim() || !variationId || loading}
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