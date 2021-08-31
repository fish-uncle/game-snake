import { format } from 'date-fns'

export default class Log {
	message: string
	date: string

	constructor(message: string) {
		this.message = message
		this.date = format(new Date(), 'yyyy-MM-dd mm:ss')
	}
}
