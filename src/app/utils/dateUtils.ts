/*
  Copyright 2017 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

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
