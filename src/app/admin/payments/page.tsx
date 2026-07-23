"use client";

import { ExternalLink, Wallet } from "lucide-react";
import { useAllPayments } from "@/lib/admin-hooks";
import { updatePaymentStatus } from "@/lib/firestore";
import { StatusSelect } from "@/components/admin/status-select";
import { EmptyState } from "@/components/portal/empty-state";
import { formatDate, formatPeso } from "@/lib/utils";
import type { PaymentStatus } from "@/lib/types";

const statusOptions: PaymentStatus[] = ["Pending", "Accepted", "Re-submit Proof of Payment"];

export default function AdminPaymentsPage() {
  const { payments, loading } = useAllPayments(true);

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
        Payments
      </h1>
      <p className="mt-1 text-sm text-ink/55">
        Review client payments and verify proof of payment.
      </p>

      <div className="mt-8">
        {!loading && payments.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title="No payments yet"
            description="Payments submitted through the Apply a Visa flow will appear here."
          />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-light text-xs uppercase tracking-wide text-ink/50">
                <tr>
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Visa Type</th>
                  <th className="px-5 py-3 font-medium">Method</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Proof</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-5 py-4 font-medium text-primary-dark">
                      {payment.userEmail ?? payment.userId}
                      <span className="block text-xs font-normal text-ink/45">
                        {payment.applicantCount} applicant{payment.applicantCount === 1 ? "" : "s"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-ink/65">{payment.visaType}</td>
                    <td className="px-5 py-4 text-ink/65">{payment.method}</td>
                    <td className="px-5 py-4 text-ink/65">{formatPeso(payment.amount)}</td>
                    <td className="px-5 py-4 text-ink/65">{formatDate(payment.createdAt)}</td>
                    <td className="px-5 py-4">
                      {payment.proofOfPayment ? (
                        <a
                          href={payment.proofOfPayment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-medium text-primary underline"
                        >
                          View <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-xs text-ink/40">None</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <StatusSelect
                        value={payment.status}
                        options={statusOptions}
                        onChange={(next) => updatePaymentStatus(payment.id, payment.userId, next)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
