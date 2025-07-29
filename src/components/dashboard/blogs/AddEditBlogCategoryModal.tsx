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
import toast from "react-hot-toast";
import ButtonLoader from "@/components/common/ButtonLoader";

interface AddEditBlogCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number | null, name: string) => void;
  currentCategory?: { id: number | null; name: string };
  loading: boolean;
  err?: { data: { message?: string }}
}

export default function AddEditBlogCategoryModal({
  isOpen,
  onClose,
  onSave,
  currentCategory,
  loading,
  err,
}: AddEditBlogCategoryModalProps) {
  const [name, setName] = useState(currentCategory?.name || "");
  const [error, setError] = useState<string | null>(null);

  // console.log(currentCategory?.id)

  useEffect(() => {
    setName(currentCategory?.name || "");
    setError(null);
  }, [currentCategory]);

  const handleSave = () => {
    if (name.trim() === "") {
      setError("Category name cannot be empty");
      return;
    }
    try {
      onSave(currentCategory?.id || null, name.trim());
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
            {currentCategory ? "Edit Blog Category" : "Add Blog Category"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <InputField
            type="text"
            placeholder="Enter category name"
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
            <AlertTitle>Category Error</AlertTitle>
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
          <Button variant={'outline'}
            onClick={handleSave}
            className="bg-[#F53E32] hover:bg-[#F53E32] hover:text-white text-white"
            disabled={!name.trim()}
          >
            {loading && <ButtonLoader />} Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
