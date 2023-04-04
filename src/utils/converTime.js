const { utcToZonedTime, format } = require('date-fns');

const greeceTimezone = 'Europe/Athens';

const converTime = (timeStamp) => {
  const timestamp = timeStamp; // Timestamp in milliseconds

  const a = new Date(timeStamp)
  // Convert the timestamp to the equivalent time in the Greece timezone
  // const greeceTime = utcToZonedTime(new Date(timestamp), greeceTimezone);
  // console.log(greeceTime)
  // Format the date and time using the desired format string
  // const formattedDate = format(greeceTime, 'yyyy-MM-dd');
  const formattedTime = format( new Date(timeStamp), 'HH:mm:ss');

  // console.log(`Date: ${formattedDate}`);
  // console.log(`Time in Greece: ${formattedTime}`);
  return formattedTime
}

export default converTime;