import { AlertTriangle, Check, XCircle } from "lucide-react";
import { APPLICATION_TRACKER_STAGES, type VisaApplication } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export function ApplicationTimeline({ application }: { application: VisaApplication }) {
  const { status, statusHistory } = application;

  function timestampFor(stage: string) {
    const event = [...statusHistory].reverse().find((e) => e.status === stage);
    return event ? formatDate(event.timestamp) : undefined;
  }

  if (status === "Rejected") {
    const rejectedAt = timestampFor("Rejected");
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-center gap-3 text-red-700">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-5 w-5" />
          </span>
          <div>
            <p className="font-heading text-base font-semibold">Application Rejected</p>
            {rejectedAt && <p className="text-xs text-red-600/80">{rejectedAt}</p>}
          </div>
        </div>
        {application.notes && (
          <p className="mt-4 rounded-xl bg-white/60 p-4 text-sm text-red-800/90">
            {application.notes}
          </p>
        )}
      </div>
    );
  }

  // "Needs Documents" is an action-required state layered on top of the
  // "In Review" stage, not a step of its own in the forward tracker.
  const effectiveStage = status === "Needs Documents" ? "In Review" : status;
  const currentIndex = APPLICATION_TRACKER_STAGES.indexOf(effectiveStage);

  return (
    <div className="rounded-2xl border border-primary/10 bg-white p-6">
      {status === "Needs Documents" && (
        <div className="mb-6 flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-sm">
            Action needed — we require additional documents before your application can
            continue. Check the notes below or your recent notifications for details.
          </p>
        </div>
      )}

      <div className="flex items-start">
        {APPLICATION_TRACKER_STAGES.map((stage, index) => {
          const reached = index <= currentIndex;
          const isCurrent = index === currentIndex && status !== "Needs Documents";
          const stageTime = timestampFor(stage);

          return (
            <div key={stage} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2 text-center">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold sm:h-9 sm:w-9",
                    reached ? "bg-primary text-white" : "bg-primary/10 text-primary/40",
                    isCurrent && "ring-4 ring-primary/15"
                  )}
                >
                  {reached ? <Check className="h-4 w-4" /> : index + 1}
                </span>
                <div>
                  <p
                    className={cn(
                      "text-[11px] font-medium sm:text-xs",
                      reached ? "text-primary-dark" : "text-ink/40"
                    )}
                  >
                    {stage}
                  </p>
                  <p className="text-[10px] text-ink/40 sm:text-xs">{stageTime ?? "Pending"}</p>
                </div>
              </div>
              {index < APPLICATION_TRACKER_STAGES.length - 1 && (
                <div
                  className={cn(
                    "mx-1.5 h-0.5 flex-1 sm:mx-2",
                    index < currentIndex ? "bg-primary" : "bg-primary/10"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {application.notes && (
        <p className="mt-6 rounded-xl bg-bg-light p-4 text-sm text-ink/70">
          <span className="font-medium text-primary-dark">Notes: </span>
          {application.notes}
        </p>
      )}
    </div>
  );
}
