// dateUtils.js - Hilfsfunktionen für Datumsformatierung und -berechnungen

/**
 * Formatiert ein Datum ins deutsche Format (TT.MM.YYYY)
 * @param {string|Date} date - Datum als String oder Date-Objekt
 * @returns {string} Formatiertes Datum
 */
export function formatDate(date) {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObj);
}

/**
 * Gibt das Datum in einem lesbaren Format mit Monatsname zurück (z.B. '25. Mai 2025')
 * @param {string|Date} date - Datum als String oder Date-Objekt
 * @returns {string} Formatiertes Datum
 */
export function formatReadableDate(date) {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateObj);
}

/**
 * Berechnet die Anzahl der Tage zwischen zwei Daten (inklusiv start und end)
 * @param {string|Date} startDate - Startdatum
 * @param {string|Date} endDate - Enddatum
 * @returns {number} Anzahl der Tage
 */
export function calculateDays(startDate, endDate) {
  if (!startDate || !endDate) return 0;

  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;

  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1; // +1 weil wir Start- und Endtag mitzählen
}

/**
 * Berechnet die verbleibenden Tage bis zu einem Datum
 * @param {string|Date} targetDate - Zieldatum
 * @returns {Object} Objekt mit days, hours, minutes, seconds
 */
export function calculateTimeUntil(targetDate) {
  if (!targetDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const now = new Date().getTime();
  const target =
    typeof targetDate === "string"
      ? new Date(targetDate).getTime()
      : targetDate.getTime();
  const distance = target - now;

  // Wenn das Datum in der Vergangenheit liegt
  if (distance < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // Berechne Tage, Stunden, Minuten und Sekunden
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}
