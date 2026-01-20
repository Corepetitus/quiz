/**
 * Corepetitus Quiz – Events
 * Visi event'ai per dataLayer (GTM)
 */

window.dataLayer = window.dataLayer || [];

/**
 * Universal event push
 */
function trackEvent(event, data = {}) {
  dataLayer.push({
    event: event,
    ...data
  });
}

/**
 * Quiz start
 * Kviečiamas užsikrovus quiz'ui
 */
function trackQuizStart() {
  trackEvent('quiz_start');
}

/**
 * Quiz progress
 * Rekomenduojama kviesti ne kas step,
 * o ties svarbiais checkpoint'ais
 */
function trackQuizProgress(step) {
  trackEvent('quiz_progress', {
    step: step
  });
}

/**
 * Fake loading / matching screen
 */
function trackQuizLoading(type, count) {
  trackEvent('quiz_loading', {
    type: type,        // pvz: "matching"
    teachers_left: count
  });
}

/**
 * Quiz completed (prieš lead formą)
 */
function trackQuizComplete() {
  trackEvent('quiz_complete');
}

/**
 * Lead submit
 */
function trackQuizLead(data = {}) {
  trackEvent('quiz_lead', data);
}



