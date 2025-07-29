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

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isActive: boolean;
}

interface AddEditFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number | null, data: { question: string; answer: string; isActive: boolean }) => void;
  currentFAQ: FAQ | null;
  loading: boolean;
  err?: {
    data?: {
      message?: string;
    };
  };
}

const AddEditFAQModal = ({
  isOpen,
  onClose,
  onSave,
  currentFAQ,
  loading,
  err,
}: AddEditFAQModalProps) => {
  const [question, setQuestion] = useState(currentFAQ?.question || "");
  const [answer, setAnswer] = useState(currentFAQ?.answer || "");
  const [isActive, setIsActive] = useState(currentFAQ ? currentFAQ.isActive : true);
  const [errors, setErrors] = useState<{question?: string; answer?: string}>({});
  const { translate } = useCustomTranslator();

  useEffect(() => {
    setQuestion(currentFAQ?.question || "");
    setAnswer(currentFAQ?.answer || "");
    setIsActive(currentFAQ ? currentFAQ.isActive : true);
    setErrors({});
  }, [currentFAQ]);

  const handleSubmit = () => {
    const newErrors: {question?: string; answer?: string} = {};
    
    if (!question.trim()) {
      newErrors.question = translate("প্রশ্ন খালি রাখা যাবে না", "Question cannot be empty");
    }
    
    if (!answer.trim()) {
      newErrors.answer = translate("উত্তর খালি রাখা যাবে না", "Answer cannot be empty");
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      onSave(currentFAQ?.id || null, {
        question: question.trim(),
        answer: answer.trim(),
        isActive
      });
    } catch (error) {
      console.error(error);
      toast.error(translate("কিছু ভুল হয়েছে! দয়া করে আবার চেষ্টা করুন।", "Something went wrong! Please try again."));
      setErrors({});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {currentFAQ ? translate("FAQ সম্পাদনা করুন", "Edit FAQ") : translate("FAQ যোগ করুন", "Add FAQ")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <InputField
            type="text"
            placeholder={translate("প্রশ্ন লিখুন", "Enter question")}
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setErrors(prev => ({...prev, question: undefined}));
            }}
            errorMessage={errors.question}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {translate("উত্তর", "Answer")}
            </label>
            <textarea
              placeholder={translate("উত্তর লিখুন", "Enter answer")}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setErrors(prev => ({...prev, answer: undefined}));
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#EE5A2C] ${
                errors.answer ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } dark:bg-gray-800 dark:text-white`}
              rows={5}
            />
            {errors.answer && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.answer}</p>
            )}
          </div>
          
            <div className="flex items-center space-x-2">
            <button
              type="button"
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                isActive ? 'bg-primary' : 'bg-input'
              }`}
              onClick={() => setIsActive(!isActive)}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <label htmlFor="active-status" className="text-sm">
              {isActive 
                ? translate("সক্রিয়", "Active") 
                : translate("নিষ্ক্রিয়", "Inactive")}
            </label>
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
            disabled={!question.trim() || !answer.trim() || loading}
          >
            {loading && <ButtonLoader />} {translate("সংরক্ষণ করুন", "Save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditFAQModal;