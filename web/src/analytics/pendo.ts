// Pendo Track Events. The Pendo agent attaches the current visitor and account to
// every event, so properties only carry the event's own context.
type TrackProperties = Record<string, string | number | boolean>;

interface PendoAgent {
  track: (eventName: string, properties?: TrackProperties) => void;
}

declare global {
  interface Window {
    pendo?: PendoAgent;
  }
}

/** Sends a Pendo Track Event. Does nothing when the Pendo agent isn't loaded, and never throws. */
export function trackEvent(eventName: string, properties?: TrackProperties): void {
  try {
    window.pendo?.track(eventName, properties);
  } catch (e) {
    console.warn(`Pendo track failed for "${eventName}"`, e);
  }
}

/** The number of days a trip covers, counting the start and end dates. */
export function tripLengthDays(startDate: string, endDate: string): number {
  const days = (Date.parse(endDate) - Date.parse(startDate)) / 86_400_000;
  return Number.isFinite(days) ? Math.round(days) + 1 : 0;
}
