import React from "react";
import { useGetPaymentsQuery, useUpdatePaymentMutation, useDeletePaymentMutation } from "../../api/paymentApi";

const Payments: React.FC = () => {
  const { data: payments, isLoading } = useGetPaymentsQuery();
  const [updatePayment] = useUpdatePaymentMutation();
  const [deletePayment] = useDeletePaymentMutation();

  const markCompleted = async (id: string) => {
    try {
      await updatePayment({ id, data: { status: "Completed" } }).unwrap();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "Update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Payments</h2>

      {isLoading ? <div>Loading...</div> : payments?.map(p => (
        <div key={(p as any)._id} className="p-3 border rounded mb-2 flex justify-between items-center">
          <div>
            <div><strong>Amount:</strong> {p.amount}</div>
            <div><strong>Method:</strong> {p.method}</div>
            <div><strong>Status:</strong> {p.status}</div>
          </div>
          <div className="flex gap-2">
            {p.status !== "Completed" && <button className="px-3 py-1 bg-green-600 text-white" onClick={() => markCompleted((p as any)._id)}>Mark Completed</button>}
            <button className="px-3 py-1 bg-red-600 text-white" onClick={() => { if (confirm("Delete payment?")) deletePayment((p as any)._id); }}>Delete</button>
          </div>
        </div>
      )) || <div>No payments</div>}
    </div>
  );
};

export default Payments;
