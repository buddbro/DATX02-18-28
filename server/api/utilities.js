module.exports = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  getDate: () => {
    const date = new Date();
    return (
      date.toISOString().substring(0, 10) +
      ' ' +
      date.toString().substring(16, 24)
    );
  }
};
