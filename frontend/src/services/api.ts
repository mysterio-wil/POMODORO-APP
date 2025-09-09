export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function healthCheck() {
  const res = await fetch(`${API_URL}/api/health`);
  return res.json();
}
