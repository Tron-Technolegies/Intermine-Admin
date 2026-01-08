export const diffInMonths = (startISO, endISO) => {
  const start = new Date(startISO);
  const end = new Date(endISO);
  console.log(start, end);
  let months =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    (end.getUTCMonth() - start.getUTCMonth());

  if (end.getUTCDate() < start.getUTCDate()) {
    months--;
  }

  return months;
};

export function monthsFromNow(endISO) {
  const now = new Date();
  const end = new Date(endISO);

  let months =
    (end.getUTCFullYear() - now.getUTCFullYear()) * 12 +
    (end.getUTCMonth() - now.getUTCMonth());

  if (end.getUTCDate() < now.getUTCDate()) {
    months--;
  }

  return months;
}
