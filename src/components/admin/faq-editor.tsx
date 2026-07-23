"use client";

import { Plus, X } from "lucide-react";
import type { TourFaq } from "@/lib/types";
import { Input, Textarea } from "@/components/ui/form-fields";

export function FaqEditor({
  faqs,
  onChange,
}: {
  faqs: TourFaq[];
  onChange: (next: TourFaq[]) => void;
}) {
  function updateFaq(index: number, patch: Partial<TourFaq>) {
    const next = [...faqs];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  }

  function removeFaq(index: number) {
    onChange(faqs.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="rounded-xl border border-primary/10 bg-white p-4">
          <div className="flex items-start gap-2">
            <Input
              value={faq.question}
              onChange={(e) => updateFaq(index, { question: e.target.value })}
              placeholder="Question"
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeFaq(index)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink/40 hover:bg-red-50 hover:text-red-600"
              aria-label="Remove FAQ"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <Textarea
            value={faq.answer}
            onChange={(e) => updateFaq(index, { answer: e.target.value })}
            placeholder="Answer"
            rows={2}
            className="mt-2"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...faqs, { question: "", answer: "" }])}
        className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark"
      >
        <Plus className="h-3.5 w-3.5" /> Add FAQ
      </button>
    </div>
  );
}
