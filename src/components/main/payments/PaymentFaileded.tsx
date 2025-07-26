"use client"
import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { usePaymentInstanceMutation } from "@/redux/features/user/paymentApi";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/common/ButtonLoader";

const PaymentFaileded = () => {
  const { id } = useParams();

  const [paymentInstance, { isLoading: instanceloading }] =
    usePaymentInstanceMutation();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const paymentResponse = await paymentInstance({
        id: id,
      }).unwrap();

      if (paymentResponse?.success) {
        // Redirect user to payment gateway
        window.location.href = paymentResponse.data.url;
      } else {
        toast.error("Payment Initialization Failed");
      }
    } catch (paymentError) {
      console.error("Payment instance error:", paymentError);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            repeatType: "reverse",
          }}
          className="bg-red-500 text-white p-6 rounded-full"
        >
          <FiAlertTriangle className="text-5xl" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 mt-5">
          Payment Failed
        </h1>
        <p className="text-gray-600 mt-2 text-center">
          Oops! Something went wrong. Your payment was not processed.
        </p>

        <div className="flex gap-4 mt-6">
          <Button
            onClick={handleSubmit}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-md"
          >
            {instanceloading && <ButtonLoader/>}
            Retry Payment
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md"
          >
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFaileded;
