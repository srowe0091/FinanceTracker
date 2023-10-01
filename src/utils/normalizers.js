import { format } from 'date-fns'

export const pluralize = (count = 0, string) => (count === 1 ? string : `${string}s`)

export const pluralWithCount = (count = 0, string) => `${count} ${pluralize(count, string)}`

export const formatDate = (date, dateFormat = 'MM/dd/yyyy') => format(new Date(date), dateFormat)
