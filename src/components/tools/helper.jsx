
export function roundToNearestSixHours(date = new Date()) {
    const millisecondsInSixHours = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
    const currentMillis = date.getTime();
    const millisSinceStartOfPeriod = currentMillis % millisecondsInSixHours;
    const halfOfPeriodMillis = millisecondsInSixHours / 2;

    // Calculate rounded milliseconds
    const roundedMillis = millisSinceStartOfPeriod >= halfOfPeriodMillis
        ? currentMillis + (millisecondsInSixHours - millisSinceStartOfPeriod)
        : currentMillis - millisSinceStartOfPeriod;

    return new Date(roundedMillis);
}


export function formatDateToISOWithoutMilliseconds(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error('Invalid Date object');
    }

    // Ensure the date is in UTC
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Return the formatted string
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

export function getDay(dates,year, month) {

    const result = dates.find(date => {
      const d = new Date(date);
      return d.getFullYear() === year && d.getMonth() === month - 1; // Month is zero-indexed
    });
    
    return result ? new Date(result).getDate() : null; // Return the day or null if not found
  }

  export function getDateFromArray(dateArray,year, month) {
    const result = dateArray.find(date => {
      const d = new Date(date);
      return d.getFullYear() === year && d.getMonth() + 1 === month; // Month is zero-indexed
    });
  
    return result ? new Date(result) : null; // Return the date or null if not found
  }
  
  

  export function iso_date(date) {
    return date.toISOString().split('.')[0] + 'Z'; // Remove milliseconds
  }
  