import { useCookies } from "@vueuse/integrations/useCookies.mjs";
const cookies = useCookies(["accessToken"]);

export function getBearer(): Record<string, string> {
    const token = cookies.get("accessToken");
    return token
        ? {
              Authorization: `Bearer ${token}`,
          }
        : {};
}
