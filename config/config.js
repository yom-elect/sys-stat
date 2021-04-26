// Set Env
process.env.NODE_ENV = "production"; // "development";
const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isWin = process.platform === "win32" ? true : false;
const isMac = process.platform === "darwin" ? true : false;

const timedChecker = 2000;

module.exports = {
  isDev,
  isMac,
  isWin,
  timedChecker,
};
