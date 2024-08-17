// global.d.ts
export {};

declare global {
  interface Window {
    analytics: any; // Use the correct type if known, e.g., AnalyticsType
  }
}
