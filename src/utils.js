import { parseISO, compareDesc } from 'date-fns'

export const formatDateToISO = date =>
  date.toISOString().replace(/[.,][0-9]{3}/, '')

export const isDateBeforeOtherDate = (date1, date2) => {
  if (typeof date1 === 'string') date1 = parseISO(date1)
  if (typeof date2 === 'string') date2 = parseISO(date2)
  return compareDesc(date1, date2) === 1
}
