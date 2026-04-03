"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-3 inline-flex rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
    >
      {copied ? "Copied" : "Copy Key"}
    </button>
  );
}
