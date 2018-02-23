const sha256 = require('sha256');

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
  },
  generateToken: () =>
    sha256(
      Math.round(new Date().getMilliseconds() * Math.random() * 10000000000000)
        .toString()
        .substring(0, 16)
    )
};
