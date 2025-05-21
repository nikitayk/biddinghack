// utils/validateEmail.ts

/**
 * Returns true if the string is a valid email address.
 */
export function validateEmail(email: string): boolean {
  // Basic RFC 5322 compliant regex for email validation
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
}
