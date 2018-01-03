import moment = require("esri/moment");

type Duration = moment.Duration;

export const dateDuration: (n: number) => Duration = n =>
  moment.duration(moment(n).diff(moment()));

export const fixedN: (i: number) => (n: number) => string = i => n =>
  n.toFixed(i);
export const fixedZero: (n: number) => string = fixedN(0);
export const fixedOne: (n: number) => string = fixedN(1);

export const expiration: (n: number) => string = n => {
  const duration = dateDuration(n);
  return duration.asDays() > 1
    ? `${fixedZero(duration.asDays())} days`
    : `${fixedOne(duration.asHours())} hours`;
};
