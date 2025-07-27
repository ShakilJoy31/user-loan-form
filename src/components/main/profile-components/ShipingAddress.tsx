"use client";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiMapPin, FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import {
  useCreateShippingInfoMutation,
  useDeleteShippingInfoMutation,
  useGetPathaoAreasQuery,
  useGetPathaoCitiesQuery,
  useGetPathaoZonesQuery,
  useGetShippingInfoQuery,
  useUpdateShippingInfoMutation
} from "@/redux/features/user/shippingAddressApi";
import DataLoader from "@/components/common/DataLoader";
import { ApiError } from "@/types/apiError";
import ButtonLoader from "@/components/common/ButtonLoader";

interface ShippingAddress {
  id: number;
  cityId: number;
  city: string;
  zoneId: number;
  zone: string;
  areaId: number;
  area: string;
  address: string;
  isPrimary: boolean;
}

interface FormData {
  cityId: number | null;
  city: string;
  zoneId: number | null;
  zone: string;
  areaId: number | null;
  area: string;
  address: string;
  isPrimary: boolean;
}

interface City {
  city_id: number;
  city_name: string;
}

interface Zone {
  zone_id: number;
  zone_name: string;
}

interface Area {
  area_id: number;
  area_name: string;
}

const ShippingAddressTab = () => {
  const { translate } = useCustomTranslator();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);

  // API hooks
  const { data: shippingInfo, refetch } = useGetShippingInfoQuery(undefined);
  const [createShippingInfo, {isLoading: creationLoading}] = useCreateShippingInfoMutation();
  const [deleteShippingInfo, {isLoading: deleteLoading}] = useDeleteShippingInfoMutation();
  const [updateShippingInfo, {isLoading: updateLoading}] = useUpdateShippingInfoMutation();

  const { data: pathaoCities } = useGetPathaoCitiesQuery(undefined);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const { data: zones } = useGetPathaoZonesQuery(selectedCityId!, {
    skip: !selectedCityId,
  });
  const { data: areas } = useGetPathaoAreasQuery(selectedZoneId!, {
    skip: !selectedZoneId,
  });

  const cities: City[] = pathaoCities?.data?.data?.data || [];
  const zoneList: Zone[] = zones?.data?.data?.data || [];
  const areaList: Area[] = areas?.data?.data?.data || [];

  const [formData, setFormData] = useState<FormData>({
    cityId: null,
    city: "",
    zoneId: null,
    zone: "",
    areaId: null,
    area: "",
    address: "",
    isPrimary: false,
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    refetch();
    if (pathaoCities) {
      setLoading(false);
    }
  }, [shippingInfo, refetch, pathaoCities]);

  const handleCreate = () => {
    setFormData({
      cityId: null,
      city: "",
      zoneId: null,
      zone: "",
      areaId: null,
      area: "",
      address: "",
      isPrimary: false,
    });
    setSelectedCityId(null);
    setSelectedZoneId(null);
    setEditingId(null);
    setAddressError(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (record: ShippingAddress) => {
    setFormData({
      cityId: record.cityId,
      city: record.city,
      zoneId: record.zoneId,
      zone: record.zone,
      areaId: record.areaId,
      area: record.area,
      address: record.address,
      isPrimary: record.isPrimary,
    });
    setSelectedCityId(record.cityId);
    setSelectedZoneId(record.zoneId);
    setEditingId(record.id);
    setAddressError(null);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setAddressToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (addressToDelete) {
      try {
        await deleteShippingInfo(addressToDelete).unwrap();
        refetch();
        setIsDeleteDialogOpen(false);
        setAddressToDelete(null);
        toast("Shipping address deleted successfully");
      } catch (error) {
        console.error("Failed to delete shipping address", error);
        toast("Failed to delete shipping address");
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setAddressToDelete(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "address") {
      if (value.length < 10 && value.length > 0) {
        setAddressError("Address must be at least 10 characters");
      } else {
        setAddressError(null);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = Number(e.target.value);
    const city = cities.find(c => c.city_id === cityId);
    if (city) {
      setSelectedCityId(cityId);
      setSelectedZoneId(null);
      setFormData((prev) => ({
        ...prev,
        cityId,
        city: city.city_name,
        zoneId: null,
        zone: "",
        areaId: null,
        area: "",
      }));
    }
  };

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const zoneId = Number(e.target.value);
    const zone = zoneList.find(z => z.zone_id === zoneId);
    if (zone) {
      setSelectedZoneId(zoneId);
      setFormData((prev) => ({
        ...prev,
        zoneId,
        zone: zone.zone_name,
        areaId: null,
        area: "",
      }));
    }
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const areaId = Number(e.target.value);
    const area = areaList.find(a => a.area_id === areaId);
    if (area) {
      setFormData((prev) => ({
        ...prev,
        areaId,
        area: area.area_name,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isPrimary: e.target.checked,
    }));
  };

  const handleSubmit = async () => {
    if (formData.address.length < 10) {
      setAddressError("Address must be at least 10 characters");
      return;
    }
    if (editingId) {
      const response = await updateShippingInfo({
        id: editingId,
        data: formData,
      }).unwrap();
      console.log(response);

      if (!response.success) {
        throw new Error(response?.message || "Failed to update shipping info");
      }

      toast.success(response?.message || "Shipping address updated successfully");
    } else {
      const response = await createShippingInfo(formData).unwrap();
       if (!response.success) {
        throw new Error(response?.message || "Failed to update shipping info");
      }
      toast.success(response?.message || "Shipping address created successfully");
    }
    setIsDialogOpen(false);
    refetch();

  };

  if (loading) {
    return <div className="flex justify-center"><DataLoader /></div>;
  }

  console.log(shippingInfo);

  return (
    <div className="bg-white p-6 dark:bg-black dark:text-white shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {translate("শিপিং ঠিকানা", "Shipping Address")}
          </h2>
          <p className="text-sm text-gray-500 dark:text-white">
            {translate(
              "আপনার অর্ডার স্ট্যাটাস ট্র্যাক করুন",
              "Track your order Status"
            )}
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          {shippingInfo?.data?.length < 3 && (
            <Button
              variant={"default"}
              className="bg-[#EE5A2C] hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md transition"
              onClick={handleCreate}
            >
              <FiPlus className="mr-2" />
              {translate("নতুন ঠিকানা যোগ করুন", "Add New Address")}
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {shippingInfo?.data?.map((address: ShippingAddress, index: number) => (
          <div
            key={address.id}
            className={`border rounded-lg px-4 py-3 relative dark:bg-black dark:text-white dark:border ${address.isPrimary ? "border-blue-500" : "border-gray-200 dark:border-white"
              }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <FiMapPin className="text-gray-500" />
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {translate("ঠিকানা", "Address")} {index + 1}
                {address.isPrimary && (
                  <span className="ml-2 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-100">
                    {translate("প্রাথমিক", "Primary")}
                  </span>
                )}
              </p>
            </div>

            <div className="text-sm space-y-1 pl-6 text-gray-700 dark:text-white">
              <p>
                <span className="font-semibold">
                  {translate("শহর:", "City:")}
                </span>{" "}
                {address.city}
              </p>
              <p>
                <span className="font-semibold">
                  {translate("জোন:", "Zone:")}
                </span>{" "}
                {address.zone}
              </p>
              <p>
                <span className="font-semibold">
                  {translate("এলাকা:", "Area:")}
                </span>{" "}
                {address.area}
              </p>
              <p>
                <span className="font-semibold">
                  {translate("ঠিকানা:", "Address:")}
                </span>{" "}
                {address.address}
              </p>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <Button
                variant={"outline"}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm px-3 py-1 border border-gray-300 rounded-md dark:text-white dark:border-gray-600"
                onClick={() => handleEdit(address)}
              >
                <FiEdit size={14} />
                {translate("সম্পাদনা", "Edit")}
              </Button>
              <Button
                variant={"outline"}
                onClick={() => handleDeleteClick(address.id)}
                className="text-gray-500 hover:text-red-500 dark:text-white dark:border-gray-600"
              >
                <FiTrash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Address Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingId
                ? translate("ঠিকানা সম্পাদনা করুন", "Edit Shipping Address")
                : translate("নতুন ঠিকানা যোগ করুন", "Add Shipping Address")}
            </DialogTitle>
            <DialogDescription>
              {translate(
                "আপনার শিপিং ঠিকানা বিবরণ পূরণ করুন",
                "Fill in your shipping address details"
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* City Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="city" className="text-right">
                {translate("শহর", "City")} *
              </label>
              <select
                id="city"
                value={formData.cityId || ""}
                onChange={handleCityChange}
                className="col-span-3 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="">{translate("শহর নির্বাচন করুন", "Select City")}</option>
                {cities.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {city.city_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Zone Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="zone" className="text-right">
                {translate("জোন", "Zone")} *
              </label>
              <select
                id="zone"
                value={formData.zoneId || ""}
                onChange={handleZoneChange}
                disabled={!selectedCityId}
                className="col-span-3 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="">{translate("জোন নির্বাচন করুন", "Select Zone")}</option>
                {zoneList.map((zone) => (
                  <option key={zone.zone_id} value={zone.zone_id}>
                    {zone.zone_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Area Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="area" className="text-right">
                {translate("এলাকা", "Area")} *
              </label>
              <select
                id="area"
                value={formData.areaId || ""}
                onChange={handleAreaChange}
                disabled={!selectedZoneId}
                className="col-span-3 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="">{translate("এলাকা নির্বাচন করুন", "Select Area")}</option>
                {areaList.map((area) => (
                  <option key={area.area_id} value={area.area_id}>
                    {area.area_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Address Textarea */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="address" className="text-right">
                {translate("ঠিকানা", "Address")} *
              </label>
              <div className="col-span-3 space-y-1">
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={translate(
                    "বিস্তারিত ঠিকানা লিখুন",
                    "Enter detailed address"
                  )}
                  className="min-h-[100px] w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                />
                {addressError && (
                  <p className="text-sm text-red-500">{addressError}</p>
                )}
              </div>
            </div>

            {/* Primary Checkbox */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="isPrimary" className="text-right">
                {translate("প্রাথমিক ঠিকানা", "Primary Address")}
              </label>
              <div className="col-span-3 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPrimary"
                  name="isPrimary"
                  checked={formData.isPrimary}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label htmlFor="isPrimary" className="text-sm">
                  {translate(
                    "প্রাথমিক ঠিকানা হিসাবে সেট করুন",
                    "Set as primary address"
                  )}
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="dark:border-gray-600"
            >
              {translate("বাতিল", "Cancel")}
            </Button>

            <Button
              onClick={handleSubmit}
              className="bg-[#EE5A2C] hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
              disabled={
                !formData.cityId ||
                !formData.zoneId ||
                !formData.areaId ||
                !formData.address ||
                !!addressError
              }
            >
              {
                creationLoading || updateLoading ? <ButtonLoader></ButtonLoader> : editingId
                ? translate("আপডেট করুন", "Update")
                : translate("তৈরি করুন", "Create")
              }
              
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {translate("মুছে ফেলুন নিশ্চিত করুন", "Confirm Delete")}
            </DialogTitle>
            <DialogDescription>
              {translate(
                "আপনি কি এই শিপিং ঠিকানা মুছে ফেলার বিষয়ে নিশ্চিত?",
                "Are you sure you want to delete this shipping address?"
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancelDelete}
              className="dark:border-gray-600"
            >
              {translate("বাতিল", "Cancel")}
            </Button>
            <Button className="text-white" variant="destructive" onClick={handleConfirmDelete}>
              {
                deleteLoading ? <ButtonLoader></ButtonLoader> : translate("মুছে ফেলুন", "Delete")
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShippingAddressTab;