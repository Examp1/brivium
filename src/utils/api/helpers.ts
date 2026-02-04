import { useCookies } from "@vueuse/integrations/useCookies";
const cookies = useCookies([]);

export const getApiEndpointType = (apiEndpoint: string) => {
    return apiEndpoint.includes("client") ? "client" : "company";
};

export function getBearer(
    endpointType: "client" | "company",
): Record<string, string> {
    let token = undefined;
    if (endpointType === "company") {
        token = cookies.get("CompanyAccessToken");
    } else {
        token = cookies.get("ClientAccessToken");
    }
    return token
        ? {
              Authorization: `Bearer ${token}`,
          }
        : {};
}
