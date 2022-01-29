export const formatDateToISO = date =>
  date.toISOString().replace(/[.,][0-9]{3}/, '')
