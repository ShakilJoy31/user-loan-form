"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InputField from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ButtonLoader from "@/components/common/ButtonLoader";

interface Discount {
  id: number | null;
  code: string;
  discountType: "FIXED" | "PERCENTAGE";
  discount: number;
  expireDate: string;
}

interface ApiError {
  data?: {
    message?: string;
  };
  status?: number;
}

interface AddEditDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    id: number | null,
    code: string,
    discountType: "FIXED" | "PERCENTAGE",
    discount: number,
    expireDate: string
  ) => void;
  currentDiscount?: Discount | null;
  loading: boolean;
  err?: ApiError;
}

export default function AddEditDiscountModal({
  isOpen,
  onClose,
  onSave,
  currentDiscount,
  loading,
  err,
}: AddEditDiscountModalProps) {
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"FIXED" | "PERCENTAGE">("FIXED");
  const [discount, setDiscount] = useState(0);
  const [expireDate, setExpireDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentDiscount) {
      setCode(currentDiscount.code);
      setDiscountType(currentDiscount.discountType);
      setDiscount(currentDiscount.discount);
      setExpireDate(currentDiscount.expireDate);
    } else {
      setCode("");
      setDiscountType("FIXED");
      setDiscount(0);
      setExpireDate("");
    }
    setError(null);
  }, [currentDiscount, isOpen]);

  const handleSave = () => {
    if (!code.trim()) {
      setError("Code is required");
      return;
    }
    if (!expireDate.trim()) {
      setError("Expire date is required");
      return;
    }
    if (discount <= 0) {
      setError("Discount must be greater than 0");
      return;
    }

    onSave(
      currentDiscount?.id || null,
      code.trim(),
      discountType,
      discount,
      expireDate.trim()
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentDiscount ? "Edit Discount" : "Add Discount"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <InputField
            type="text"
            placeholder="Enter Discount Code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(null);
            }}
            errorMessage={error || undefined}
          />

          <div>
            <label htmlFor="discountType" className="block mb-2 text-sm font-medium">
              Discount Type
            </label>
            <select
              id="discountType"
              value={discountType}
              onChange={(e) =>
                setDiscountType(e.target.value as "FIXED" | "PERCENTAGE")
              }
              className="border px-3 py-2 rounded-md w-full"
            >
              <option value="FIXED">Fixed</option>
              <option value="PERCENTAGE">Percentage</option>
            </select>
          </div>

          <InputField
            type="number"
            placeholder="Enter Discount Value"
            value={discount.toString()}
            onChange={(e) => {
              setDiscount(Number(e.target.value));
              setError(null);
            }}
            errorMessage={error || undefined}
          />

          <InputField
            type="date"
            placeholder="Enter Expiry Date"
            value={expireDate}
            onChange={(e) => {
              setExpireDate(e.target.value);
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
            onClick={handleSave}
            className="bg-[#EE5A2C] text-white"
            disabled={loading || !code.trim() || !expireDate.trim() || discount <= 0}
          >
            {loading && <ButtonLoader />} Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}