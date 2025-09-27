import { useCookies } from "@vueuse/integrations/useCookies.mjs";
const cookies = useCookies(["ComapnyAccessToken"]);

export function getBearer(): Record<string, string> {
    const token = cookies.get("ComapnyAccessToken");
    return token
        ? {
              Authorization: `Bearer ${token}`,
          }
        : {};
}
