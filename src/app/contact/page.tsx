import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vikash Kumar Singh - open to new opportunities, collaborations, and interesting conversations.",
};

export default function ContactPage() {
  return <ContactForm />;
}
