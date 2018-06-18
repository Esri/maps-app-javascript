/*
  Copyright 2018 Esri
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

import moment from "esri/moment";

type Duration = moment.Duration;
type Moment = moment.Moment;

/**
 * Simply returns the current moment
 */
export const now = () => moment();

/**
 * Calculates the duration between two moments
 * @param n
 * @param m
 */
export const dateDuration: (n: number, m: Moment) => Duration = (n, m) =>
  moment.duration(moment(n).diff(m));

/**
 * Returns a Function provide a string representation of a fixed number value
 * @param i
 */
export const fixedN: (i: number) => (n: number) => string = i => n =>
  n.toFixed(i);
/**
 * Returns a string representation of a Number to zero digits
 */
export const fixedZero: (n: number) => string = fixedN(0);
/**
 * Returns a string representation of a Number to one digit
 */
export const fixedOne: (n: number) => string = fixedN(1);

/**
 * Calculates the expiration time in Days or Hours between moments
 * @param n
 * @param m
 */
export const expiration: (n: number, m?: Moment) => string = (n, m = now()) => {
  const duration = dateDuration(n, m);
  return duration.asDays() > 1
    ? `${fixedZero(duration.asDays())} days`
    : `${fixedOne(duration.asHours())} hours`;
};

/**
 * Format the given date in the following format: January 12th, 2018
 * @param n
 */
export const asMonthDayYear: (n: Date) => string = n =>
  moment(n).format("MMMM Do YYYY");
