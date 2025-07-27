"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Page } from "@react-pdf/renderer";
import PDFInvoice from "./PDFInvoice";

const MultiOrderPDF = ({ orders }:any) => {
  return (
    <Document>
      {orders?.length > 0 && orders?.map((order:any, index:any) => (
        <Page key={index} size="A4" style={{ padding: 30 }}>
          <PDFInvoice data={order} />
        </Page>
      ))}
    </Document>
  );
};

export default MultiOrderPDF;