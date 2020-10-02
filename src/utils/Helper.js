function firstLetterUppercase(text) {
  text = text.toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function filterAnIntegerIncludingZero(value) {
  return value.replace(/[^0-9]/g, "");
}

function getDateFormat(date) {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  day.length === 1 && (day = "0" + day);
  month.length === 1 && (month = "0" + month);
  let yyyymmdd = year + "-" + month + "-" + day;
  return yyyymmdd;
}

function getDatetimeFormat(date) {
  let yyyymmdd = this.getDateFormat(date);

  let hour = "" + date.getHours();
  if (hour.length === 1) {
    hour = "0" + hour;
  }

  let minute = "" + date.getMinutes();
  if (minute.length === 1) {
    minute = "0" + minute;
  }

  let second = "" + date.getSeconds();
  if (second.length === 1) {
    second = "0" + second;
  }

  return yyyymmdd + " " + hour + ":" + minute + ":" + second;
}

module.exports.firstLetterUppercase = firstLetterUppercase;
module.exports.filterAnIntegerIncludingZero = filterAnIntegerIncludingZero;
module.exports.getDateFormat = getDateFormat;
module.exports.getDatetimeFormat = getDatetimeFormat;
