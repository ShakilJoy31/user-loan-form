"use client";

import idAvatar from "@/assets/hsbc/avatar.png";
import hsbcLogo from "@/assets/hsbc/logo-nobg.png";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";

export default function IdCardForm() {
  const idCardRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("Dr. ANDREW MAKINSON");
  const [designation, setDesignation] = useState("Director");
  const [department, setDepartment] = useState("Foreign Remittance Affair");
  const [id, setId] = useState("HSBC/UK1999/1889");
  const [photo, setPhoto] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSignature(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadImage = () => {
    if (idCardRef.current) {
      setTimeout(() => {
        html2canvas(idCardRef.current, {
          backgroundColor: "#ffffff",
          useCORS: true,
          scale: 1.5,
          logging: false,
          height: idCardRef.current.scrollHeight,
          width: idCardRef.current.scrollWidth,
        }).then((canvas) => {
          const link = document.createElement("a");
          link.download = "id-card.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        });
      }, 100);
    }
  };

  const handleDownloadPdf = () => {
    if (idCardRef.current) {
      setTimeout(() => {
        html2canvas(idCardRef.current, {
          backgroundColor: "#ffffff",
          useCORS: true,
          scale: 1.5,
          logging: false,
          height: idCardRef.current.scrollHeight,
          width: idCardRef.current.scrollWidth,
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("landscape", "mm", [104, 86]);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save("id-card.pdf");
        });
      }, 100);
    }
  };
  return (
    <div
      className="max-w-5xl mx-auto p-6"
      style={{ backgroundColor: "#ffffff", color: "#000000" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div
          className="p-8 rounded-lg shadow-md"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#1f2937" }}>
            Enter Details
          </h2>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: "#374151" }}
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm"
                style={{ borderColor: "#d1d5db" }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: "#374151" }}
              >
                Designation
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm"
                style={{ borderColor: "#d1d5db" }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: "#374151" }}
              >
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm"
                style={{ borderColor: "#d1d5db" }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: "#374151" }}
              >
                ID Number
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm"
                style={{ borderColor: "#d1d5db" }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: "#374151" }}
              >
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="mt-1 w-full overflow-clip rounded-sm border border-neutral-300 bg-neutral-50/50 text-sm text-neutral-600 file:mr-4 file:border-none file:bg-neutral-50 file:px-4 file:py-2 file:font-medium file:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-75 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300 dark:file:bg-neutral-900 dark:file:text-white dark:focus-visible:outline-white cursor-pointer"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: "#374151" }}
              >
                Signature
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleSignatureUpload}
                className="mt-1 w-full overflow-clip rounded-sm border border-neutral-300 bg-neutral-50/50 text-sm text-neutral-600 file:mr-4 file:border-none file:bg-neutral-50 file:px-4 file:py-2 file:font-medium file:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-75 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300 dark:file:bg-neutral-900 dark:file:text-white dark:focus-visible:outline-white cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-center"
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <div className="flex gap-4" ref={idCardRef}>
            <div
              className="w-[250px] h-[445px] rounded-lg shadow-lg text-center"
              style={{ backgroundColor: "#ffffff", overflow: "hidden" }}
            >
              <div
                className="h-22 flex items-center justify-center flex-col rounded-t-lg"
                style={{ backgroundColor: "#ede0dd" }}
              >
                <div className="flex justify-center gap-2">
                  <h2 className="text-3xl font-bold">HSBC</h2>
                  <Image
                    src={hsbcLogo}
                    alt="HSBC logo"
                    width={160}
                    height={100}
                    className="h-10 w-16 self-baseline-last"
                  />
                </div>

                <h2 className="text-md">STAFF ID CARD</h2>
              </div>
              <div className="p-4" style={{ backgroundColor: "#ffffff" }}>
                <div className="flex justify-center mb-4">
                  <div
                    className="w-24 h-24 rounded-full p-1"
                    style={{
                      border: "4px solid #f72020",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <Image
                      src={photo || idAvatar}
                      alt="User Photo"
                      width={128}
                      height={128}
                      className="h-full object-cover rounded-full"
                      style={{ backgroundColor: "#ffffff" }}
                    />
                  </div>
                </div>
                <div style={{ backgroundColor: "#ffffff" }}>
                  <h3
                    className="text-md font-bold"
                    style={{ color: "#1f2937" }}
                  >
                    {name}
                  </h3>
                  <p className="text-sm" style={{ color: "#4b5563" }}>
                    {designation}
                  </p>
                  <p className="text-sm" style={{ color: "#4b5563" }}>
                    {department}
                  </p>
                  <div className="mt-4" style={{ backgroundColor: "#ffffff" }}>
                    <p className="text-xs">ID: {id}</p>
                    <div
                      className="flex justify-center mt-2"
                      style={{ backgroundColor: "#ffffff" }}
                    >
                      <Image
                        src={
                          signature ||
                          "https://img.freepik.com/premium-vector/abstract-fake-signature-documents-contracts-isolated-white-background_608189-1150.jpg"
                        }
                        alt="Signature"
                        width="64"
                        height="32"
                        className="object-cover h-10 w-20"
                        style={{ backgroundColor: "#ffffff" }}
                      />
                    </div>
                    <div
                      className="mt-2"
                      style={{ backgroundColor: "#ffffff" }}
                    >
                      <p className="text-xs" style={{ color: "#6b7280" }}>
                        CardHolder Signature
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="h-4 rounded-b-lg"
                style={{ backgroundColor: "#f72020" }}
              ></div>
            </div>

            <div
              className="w-[250px] h-[445px] rounded-lg shadow-lg text-center flex flex-col justify-around pt-4"
              style={{ backgroundColor: "#fff", overflow: "hidden" }}
            >
              <div className="flex justify-center w-full gap-4 items-center">
                <Image
                  src={hsbcLogo}
                  alt="hsbcLogo"
                  width={256}
                  height={256}
                  className="h-10 w-16 self-baseline-last"
                />
                <p className="text-3xl font-bold">HSBC</p>
              </div>
              <div>
                <h2 className="text-xl">Terms and Condition</h2>
                <ul className="mt-4">
                  <li className="text-xs">
                    Carry the ID card at all times during working hours for
                    identiffication purposes.
                  </li>
                  <li className="text-xs mt-2">
                    The ID card strictly for official use and should not be
                    shared or used for unauthorised purposes.
                  </li>
                </ul>
              </div>
              <p className="text-xs font-light self-end-safe align-middle w-full">
                If found, Please return to{" "}
                <span className="font-medium">HSBC PLC</span>
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleDownloadImage}
              className="px-4 py-2 rounded-md cursor-pointer"
              style={{ backgroundColor: "#2563eb", color: "#ffffff" }}
            >
              Download as Image
            </button>
            <button
              onClick={handleDownloadPdf}
              className="px-4 py-2 rounded-md cursor-pointer"
              style={{ backgroundColor: "#16a34a", color: "#ffffff" }}
            >
              Download as PDF
            </button> 
          </div>

        </div>
      </div>
    </div>
  );
}
