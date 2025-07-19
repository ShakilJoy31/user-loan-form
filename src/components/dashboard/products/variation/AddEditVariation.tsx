import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import InputField from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ButtonLoader from "@/components/common/ButtonLoader";
import { Button } from "@/components/ui/button";
import { useGetAllVariationsQuery } from "@/redux/features/product/variationApi";
import toast from "react-hot-toast";
interface VariationOption {
  id: number;
  value: string;
  variationId: number;
  variation: {
    name: string;
  };
}

interface AddEditVariationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { value: string; variationId: number }) => void;
  initialData: VariationOption | null;
  loading: boolean;
   err?: {
    data?: {
      message?: string;
    };
  };
}

const AddEditVariation = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  loading,
  err,
}: AddEditVariationProps) => {
  const { data: variationsData } = useGetAllVariationsQuery({ page: 1, size: 1000 });
  const [value, setValue] = useState(initialData?.value || "");
  const [variationName, setVariationName] = useState(initialData?.variation.name || "");
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (initialData) {
      setValue(initialData.value);
      setVariationName(initialData.variation.name);
    } else {
      setValue("");
      setVariationName("");
    }
    setError(null);
  }, [initialData]);

  const handleSubmit = () => {
    if (!value.trim()) {
      setError("Value cannot be empty");
      return;
    }
    if (!variationName.trim()) {
      setError("Variation name cannot be empty");
      return;
    }

    // Find the variation ID from the variations data
    const selectedVariation = variationsData?.data.find(
      (v: { name: string; }) => v.name.toLowerCase() === variationName.trim().toLowerCase()
    );

    if (!selectedVariation && !initialData?.variationId) {
      setError("Variation not found");
      return;
    }

    try {
      onSubmit({
        value: value.trim(),
        variationId: selectedVariation?.id || initialData?.variationId || 0
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");   
      setError(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Variation Option" : "Add Variation Option"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <InputField
            type="text"
            label="Variation Name"
            placeholder="Enter variation name"
            value={variationName}
            onChange={(e) => {
              setVariationName(e.target.value);
              setError(null);
            }}
            errorMessage={error && error.includes("Variation") ? error : undefined}
          />

          <InputField
            type="text"
            label="Value"
            placeholder="Enter option value"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(null);
            }}
            errorMessage={error && error.includes("Value") ? error : undefined}
          />
        </div>

        {err && "data" in err && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {(err.data as { message?: string })?.message ||
                "Something went wrong! Please try again."}
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 text-white"
            disabled={!value.trim() || !variationName.trim()}
          >
            {loading && <ButtonLoader />} Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditVariation;