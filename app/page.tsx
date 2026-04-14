"use client";
import React, { useState } from "react";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

export default function MailServicePage() {
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSending(true);
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/portfolio/contact", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        form.reset();
        setStatus("✅ Message sent successfully!");
      } else {
        setStatus(`❌ ${data.error || "Failed to send message"}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus(`❌ Unexpected error: ${error instanceof Error ? error.message : error}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <header className="p-4 shadow-md flex justify-between items-center bg-card">
        <h1 className="text-2xl font-bold">📬 Portfolio Contact</h1>
        <ThemeSwitcher />
      </header>

      <main className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl bg-card shadow-lg space-y-6">
        <p className="text-muted-foreground">
          Send a message through the contact form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-2 rounded-md border border-border bg-background"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-2 rounded-md border border-border bg-background"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={5}
            className="w-full p-2 rounded-md border border-border bg-background"
          />

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && <p className="text-sm text-muted-foreground">{status}</p>}
      </main>
    </div>
  );
}