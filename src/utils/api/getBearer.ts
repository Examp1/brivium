import { useCookies } from "@vueuse/integrations/useCookies.mjs";
const cookies = useCookies(["ComapnyAccessToken"]);

export function getBearer(
    endpointType: "client" | "company",
): Record<string, string> {
    let token = undefined;
    if (endpointType === "company") {
        token = cookies.get("ComapnyAccessToken");
    } else {
        token = cookies.get("ClientAccessToken");
    }
    return token
        ? {
              Authorization: `Bearer ${token}`,
          }
        : {};
}
