import { redirect } from "next/navigation";

// The old single-step application form has been replaced by the
// "Apply a Visa" modal wizard, triggered from the Applications page (and
// elsewhere in the portal). Redirect here in case anything still links to
// this route directly.
export default function NewApplicationPage() {
  redirect("/portal/applications");
}
