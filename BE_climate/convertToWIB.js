function convertToWIB(date) {
    // Your logic for converting date to WIB (Western Indonesian Time) here
    // Example: Assuming date is in UTC and you want to convert it to WIB
    const wibOffset = 7; // WIB is UTC+7
    const wibDate = new Date(date.getTime() + wibOffset * 60 * 60 * 1000);
    return wibDate;
  }
  
  module.exports = { convertToWIB };