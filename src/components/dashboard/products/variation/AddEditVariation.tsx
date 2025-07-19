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

interface Variation {
  id: number;
  name: string;
}

interface AddEditVariationProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number | null, name: string) => void;
  currentVariation: Variation | null;
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
  onSave,
  currentVariation,
  loading,
  err,
}: AddEditVariationProps) => {
  const [name, setName] = useState(currentVariation?.name || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(currentVariation?.name || "");
    setError(null);
  }, [currentVariation]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Variation name cannot be empty");
      return;
    }

    try {
      onSave(currentVariation?.id || null, name.trim());
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
            {currentVariation ? "Edit Variation" : "Add Variation"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <InputField
            type="text"
            placeholder="Enter variation name"
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
            className="bg-[#EE5A2C] text-white"
            disabled={!name.trim() || loading}
          >
            {loading && <ButtonLoader />} Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditVariation;