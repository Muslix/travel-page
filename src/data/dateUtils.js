// dateUtils.js - Optimierte Hilfsfunktionen für Datumsformatierung und -berechnungen

// Cache für formatierte Daten, um wiederholte Berechnungen zu vermeiden
const dateFormatCache = new Map();
const readableDateFormatCache = new Map();
const dayCalculationCache = new Map();

/**
 * Formatiert ein Datum ins deutsche Format (TT.MM.YYYY)
 * @param {string|Date} date - Datum als String oder Date-Objekt
 * @returns {string} Formatiertes Datum
 */
export function formatDate(date) {
  if (!date) return "";

  // Verwende Cache für bessere Performance
  const cacheKey = date instanceof Date ? date.getTime() : date;
  if (dateFormatCache.has(cacheKey)) {
    return dateFormatCache.get(cacheKey);
  }

  const dateObj = typeof date === "string" ? new Date(date) : date;
  const formatter = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedDate = formatter.format(dateObj);

  // In Cache speichern
  dateFormatCache.set(cacheKey, formattedDate);

  return formattedDate;
}

/**
 * Gibt das Datum in einem lesbaren Format mit Monatsname zurück (z.B. '25. Mai 2025')
 * @param {string|Date} date - Datum als String oder Date-Objekt
 * @returns {string} Formatiertes Datum
 */
export function formatReadableDate(date) {
  if (!date) return "";

  // Verwende Cache für bessere Performance
  const cacheKey = date instanceof Date ? date.getTime() : date;
  if (readableDateFormatCache.has(cacheKey)) {
    return readableDateFormatCache.get(cacheKey);
  }

  const dateObj = typeof date === "string" ? new Date(date) : date;

  const formatter = new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDate = formatter.format(dateObj);

  // In Cache speichern
  readableDateFormatCache.set(cacheKey, formattedDate);

  return formattedDate;
}

/**
 * Berechnet die Anzahl der Tage zwischen zwei Daten (inklusiv start und end)
 * @param {string|Date} startDate - Startdatum
 * @param {string|Date} endDate - Enddatum
 * @returns {number} Anzahl der Tage
 */
export function calculateDays(startDate, endDate) {
  if (!startDate || !endDate) return 0;

  // Erzeuge Cache-Key aus beiden Daten
  const startKey = startDate instanceof Date ? startDate.getTime() : startDate;
  const endKey = endDate instanceof Date ? endDate.getTime() : endDate;
  const cacheKey = `${startKey}_${endKey}`;

  // Prüfe Cache
  if (dayCalculationCache.has(cacheKey)) {
    return dayCalculationCache.get(cacheKey);
  }

  // Optimierte Berechnung
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Setze Uhrzeiten auf 0:00:00 um Probleme mit DST (Daylight Saving Time) zu vermeiden
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  // Performance-optimierte Berechnung
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 weil wir Start- und Endtag mitzählen

  // In Cache speichern
  dayCalculationCache.set(cacheKey, diffDays);

  return diffDays;
}

// DateTimeFormat-Formatter vorinstanziieren für bessere Performance
const timeFormatter = new Intl.DateTimeFormat('de-DE', {
  hour: '2-digit',
  minute: '2-digit'
});

// Zur Reduzierung von Rechenoperationen bei häufigen Countdown-Updates
let lastCountdownUpdate = 0;
let lastTargetTime = 0;
let cachedCountdownResult = { days: 0, hours: 0, minutes: 0, seconds: 0 };

/**
 * Berechnet die verbleibenden Tage bis zu einem Datum
 * @param {string|Date} targetDate - Zieldatum
 * @returns {Object} Objekt mit days, hours, minutes, seconds
 */
export function calculateTimeUntil(targetDate) {
  if (!targetDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const now = Date.now();
  const target = targetDate instanceof Date ? targetDate.getTime() : new Date(targetDate).getTime();

  // Wenn sich das Zieldatum geändert hat oder die letzte Aktualisierung mehr als 500ms her ist,
  // dann neu berechnen (verhindert zu häufige Neuberechnungen)
  if (target !== lastTargetTime || now - lastCountdownUpdate > 500) {
    const distance = target - now;

    // Wenn das Datum in der Vergangenheit liegt
    if (distance < 0) {
      cachedCountdownResult = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    } else {
      // Optimierte Berechnung mit weniger Divisionen
      const days = Math.floor(distance / 86400000); // 1000 * 60 * 60 * 24
      const remainder = distance % 86400000;
      const hours = Math.floor(remainder / 3600000); // 1000 * 60 * 60
      const remainder2 = remainder % 3600000;
      const minutes = Math.floor(remainder2 / 60000); // 1000 * 60
      const seconds = Math.floor((remainder2 % 60000) / 1000);

      cachedCountdownResult = { days, hours, minutes, seconds };
    }

    lastCountdownUpdate = now;
    lastTargetTime = target;
  }

  return cachedCountdownResult;
}

// Hilfsfunktion zur Validierung von Datum-Strings (für Fehlerbehandlung)
export function isValidDate(dateString) {
  if (!dateString) return false;

  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

/**
 * Cache-Größe begrenzen und alte Einträge entfernen
 * Diese Funktion kann periodisch aufgerufen werden, um den Cache zu bereinigen
 */
export function clearDateCaches() {
  // Cache-Größen auf vernünftige Grenzen beschränken
  if (dateFormatCache.size > 100) {
    // Entferne die ältesten Einträge (vereinfacht)
    const keysToDelete = Array.from(dateFormatCache.keys()).slice(0, 50);
    keysToDelete.forEach(key => dateFormatCache.delete(key));
  }

  if (readableDateFormatCache.size > 100) {
    const keysToDelete = Array.from(readableDateFormatCache.keys()).slice(0, 50);
    keysToDelete.forEach(key => readableDateFormatCache.delete(key));
  }

  if (dayCalculationCache.size > 100) {
    const keysToDelete = Array.from(dayCalculationCache.keys()).slice(0, 50);
    keysToDelete.forEach(key => dayCalculationCache.delete(key));
  }
}
