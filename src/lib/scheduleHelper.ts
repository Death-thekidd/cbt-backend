export class CalenderDay {
    date: Date;
    eventsThatWillStartToday: Schedule[];
    eventsThatWillEndToday: Schedule[];
    isPastDate: boolean;
    isToday: boolean;

    constructor(date: Date, eventsThatWillStartToday: Schedule[], eventsThatWillEndToday: Schedule[]) {
        this.date = date;
        this.eventsThatWillStartToday = eventsThatWillStartToday;
        this.eventsThatWillEndToday = eventsThatWillEndToday;
        this.isPastDate = date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
        this.isToday = date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
    }

    getDateString(): string {
        return this.date.toISOString().split('T')[0];
    }
}


