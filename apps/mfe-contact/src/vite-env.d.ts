/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Optional form-submission endpoint (e.g. a Formspree/Web3Forms
   * endpoint, or your own serverless function). This app has no
   * backend of its own — it's a static build — so when this is unset
   * the form falls back to opening a prefilled mailto: link instead.
   */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
