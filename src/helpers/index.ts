import { NWS_API_BASE, USER_AGENT } from "../connection/index.js";
import { AlertFeature } from "../types/index.js";

export async function makeNWSRequest<T>(path: string): Promise<T | null> {
    const headers = {
        "User-Agent": USER_AGENT,
        Accept: "application/json"
    }

    try {
        const response = await fetch(`${NWS_API_BASE}${path}`, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (e: unknown) {
        console.log(`Error fetching data from NWS: ${e}`);
        return null
    }
}

// Format alert data
export function formatAlert(feature: AlertFeature): string {
    const props = feature.properties;
    return [
      `Event: ${props.event || "Unknown"}`,
      `Area: ${props.areaDesc || "Unknown"}`,
      `Severity: ${props.severity || "Unknown"}`,
      `Status: ${props.status || "Unknown"}`,
      `Headline: ${props.headline || "No headline"}`,
      "---",
    ].join("\n");
}
