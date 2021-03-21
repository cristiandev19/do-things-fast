const getDayMonthDay = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return {
    year, month, day,
  };
};

exports.getTodayUTC = () => {
  const date = new Date();
  const { year, month, day } = getDayMonthDay(date);
  return Date.UTC(year, month, day);
};

exports.getTomorrowUTC = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = tomorrow.getMonth();
  const day = tomorrow.getDate();
  return Date.UTC(year, month, day);
};

const formatDate = (date) => {
  const { year, month, day } = getDayMonthDay(date);
  const dateToFormat = new Date(Date.UTC(year, month, day));
  const options = {
    weekday : 'long',
    year    : 'numeric',
    month   : 'long',
    day     : 'numeric',
  };
  return dateToFormat.toLocaleString('es-ES', options);
};
exports.formatDate = formatDate;

exports.getTodayText = () => {
  const date = new Date(this.getTodayUTC());
  return formatDate(date);
};

exports.getTomorrowText = () => {
  const date = new Date(this.getTomorrowUTC());
  return formatDate(date);
};
