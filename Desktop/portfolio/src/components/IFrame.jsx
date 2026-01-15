import React from "react";

/**
 * WebsiteEmbed
 * - Embeds an external site inside a fixed-size box using an iframe.
 *
 * Props:
 * - src (string, required): URL to embed
 * - title (string): accessible title
 * - width (number|string): wrapper width (e.g. 600 or "600px" or "100%")
 * - height (number|string): wrapper height
 * - className (string): extra wrapper classes
 * - iframeClassName (string): extra iframe classes
 * - allow (string): iframe allow permissions
 * - sandbox (string): sandbox policy (default is reasonably safe)
 * - loading ("lazy"|"eager")
 */
export default function WebsiteEmbed({
  src,
  title = "Embedded website",
  width = 600,
  height = 400,
  className = "",
  iframeClassName = "",
  allow = "clipboard-read; clipboard-write; fullscreen",
  sandbox = "allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox",
  loading = "lazy",
}) {
  const toCss = (v) => (typeof v === "number" ? `${v}px` : v);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white ${className}`}
      style={{ width: toCss(width), height: toCss(height) }}
    >
      <iframe
        src={src}
        title={title}
        className={`h-full w-full ${iframeClassName}`}
        loading={loading}
        allow={allow}
        sandbox={sandbox}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}