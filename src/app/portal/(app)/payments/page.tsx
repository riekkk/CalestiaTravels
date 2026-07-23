"use client";

import { Wallet } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { usePayments } from "@/lib/portal-hooks";
import { PaymentStatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import { formatDate, formatPeso } from "@/lib/utils";

export default function PaymentsPage() {
  const { user } = useAuth();
  const { payments, loading } = usePayments(user?.uid);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
          My Payments
        </h1>
        <p className="mt-1 text-sm text-ink/55">
          Payments submitted for your visa applications.
        </p>
      </div>

      {!loading && payments.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="No payments yet"
          description="Payments you submit through the Apply a Visa flow will show up here."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-light text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-5 py-3 font-medium">Visa Type</th>
                <th className="px-5 py-3 font-medium">Method</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-5 py-4 font-medium text-primary-dark">
                    {payment.visaType}
                    <span className="block text-xs font-normal text-ink/45">
                      {payment.applicantCount} applicant{payment.applicantCount === 1 ? "" : "s"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-ink/65">{payment.method}</td>
                  <td className="px-5 py-4 text-ink/65">{formatPeso(payment.amount)}</td>
                  <td className="px-5 py-4 text-ink/65">{formatDate(payment.createdAt)}</td>
                  <td className="px-5 py-4">
                    <PaymentStatusBadge status={payment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
