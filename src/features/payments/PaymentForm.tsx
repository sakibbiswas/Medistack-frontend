
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCreatePaymentMutation } from "../../api/paymentApi";

interface PaymentFormProps {
  appointmentId: string;
  onSuccess?: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ appointmentId, onSuccess }) => {
  const presetAmounts = [100, 200, 300, 400, 500];
  const [method, setMethod] = useState<"Stripe" | "Cash" | "Other">("Stripe");
  const [selectedAmount, setSelectedAmount] = useState<number>(presetAmounts[0]);
  const [createPayment, { isLoading }] = useCreatePaymentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!appointmentId || selectedAmount <= 0) {
      return toast.error("Please select a valid amount and appointment");
    }

    try {
      const res = await createPayment({
        appointmentId,
        amount: selectedAmount,
        method,
      }).unwrap();

      // Redirect for Stripe, or toast success for others
      if (method === "Stripe" && "url" in res) {
        window.location.href = res.url;
      } else {
        toast.success(`✅ Payment successful! Amount: $${selectedAmount}`); // only toast here
        onSuccess?.();
      }
    } catch (err: any) {
      toast.error("❌ Payment failed: " + (err?.data?.message || err.message || "Try again"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6 border max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Make Payment</h2>

      <label className="block mb-2 font-medium">Select Payment Method</label>
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value as any)}
        className="w-full border rounded-lg p-2 mb-4"
      >
        <option value="Stripe">Stripe (Card)</option>
        <option value="Cash">Cash</option>
        <option value="Other">Other</option>
      </select>

      <label className="block mb-2 font-medium">Select Amount</label>
      <div className="flex flex-wrap gap-2 mb-4">
        {presetAmounts.map((amt) => (
          <button
            type="button"
            key={amt}
            onClick={() => setSelectedAmount(amt)}
            className={`px-4 py-2 rounded-lg border ${selectedAmount === amt ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            ${amt}
          </button>
        ))}
      </div>

      {method === "Cash" && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Enter Cash Amount</label>
          <input
            type="number"
            min={1}
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value))}
            className="w-full border rounded-lg p-2"
          />
        </div>
      )}

      <p className="mb-2 text-gray-700">
        Amount: <b>${selectedAmount}</b>
      </p>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full disabled:opacity-60"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
