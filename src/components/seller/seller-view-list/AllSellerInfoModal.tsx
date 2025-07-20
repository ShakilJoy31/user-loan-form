"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import Image from "next/image";

interface Seller {
  id: number;
  name: string;
  contactNo: string;
  active: boolean;
  role: string;
  avatar: string;
  point?: number;
  withdrawPoint?: number;
}

interface AllSellerInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: Seller;
}

const AllSellerInfoModal = ({ isOpen, onClose, seller }: AllSellerInfoModalProps) => {
  const { translate } = useCustomTranslator();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {translate("বিক্রেতা তথ্য", "Seller Information")}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="flex flex-col items-center">
            <Image
              width={100}
              height={100}
              src={seller?.avatar}
              alt={seller?.name}
              className="h-32 w-32 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">{seller.name}</h3>
            <p className="text-gray-500">{seller.contactNo}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                {translate("স্ট্যাটাস", "Status")}
              </h4>
              <p className={`mt-1 text-sm ${
                seller.active ? "text-green-600" : "text-red-600"
              }`}>
                {seller.active 
                  ? translate("সক্রিয়", "Active") 
                  : translate("নিষ্ক্রিয়", "Inactive")}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">
                {translate("ভূমিকা", "Role")}
              </h4>
              <p className="mt-1 text-sm capitalize">{seller.role.toLowerCase()}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">
                {translate("বর্তমান পয়েন্ট", "Current Points")}
              </h4>
              <p className="mt-1 text-sm">{seller?.point || 0}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">
                {translate("উত্তোলনযোগ্য পয়েন্ট", "Withdrawable Points")}
              </h4>
              <p className="mt-1 text-sm">{seller?.withdrawPoint || 0}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} variant="outline">
            {translate("বন্ধ করুন", "Close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllSellerInfoModal;