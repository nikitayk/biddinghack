// utils/formatDate.ts

/**
 * Formats an ISO date string to a human-readable format.
 * Example: "2025-05-21T13:00:00Z" => "May 21, 2025, 1:00 PM"
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
