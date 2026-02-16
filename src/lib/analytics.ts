// Plausible Analytics integration
// Add to your HTML head:
// <script defer data-domain="relocation-matrix.vercel.app" src="https://plausible.io/js/script.js"></script>

export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, { props: eventData });
  }
};

export const Events = {
  // Navigation
  LANDING_VIEWED: 'landing_viewed',
  MATRIX_OPENED: 'matrix_opened',
  
  // Auth
  SIGN_UP_STARTED: 'sign_up_started',
  SIGN_UP_COMPLETED: 'sign_up_completed',
  SIGN_IN_STARTED: 'sign_in_started',
  SIGN_IN_COMPLETED: 'sign_in_completed',
  GOOGLE_AUTH_CLICKED: 'google_auth_clicked',
  
  // Matrix Interactions
  WEIGHT_ADJUSTED: 'weight_adjusted',
  CITY_COMPARED: 'city_compared',
  SALARY_CHANGED: 'salary_changed',
  
  // Profiles
  PROFILE_SAVED: 'profile_saved',
  PROFILE_LOADED: 'profile_loaded',
  PROFILE_SHARED: 'profile_shared',
  PROFILE_DELETED: 'profile_deleted',
  
  // Engagement
  SHARE_LINK_COPIED: 'share_link_copied',
  LANDING_CTA_CLICKED: 'landing_cta_clicked',
  FEATURE_VIEWED: 'feature_viewed',
};

// Track page view automatically
if (typeof window !== 'undefined') {
  trackEvent('pageview');
}
