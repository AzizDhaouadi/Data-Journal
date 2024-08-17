// global.d.ts
export {};

declare global {
  interface Window {
    analytics: any;
    dataLayer: any;
  }
}
