export class CalenderComponent implements OnInit {

    name = 'SCHEDULE_CALENDER';

    breadcrumbItems = [
        'schedule',
        'calender'
    ];

    agendas: Schedule[] = [];

    calenderDays: CalenderDay[] = [];

    public monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    public displayMonth: string;
    public displayYear: any;
    private monthIndex = 0;

    constructor(
        private scheduleService: ScheduleService,
        private router: Router,
        private message: NzMessageService
    ) { }

    ngOnInit(): void {
        // here we initialize the calendar
        this.getAgendas();
        this.generateCalendarDays(this.monthIndex);
    }

    private generateCalendarDays(monthIndex: number): void {
        // we reset our calendar every time
        this.calenderDays = [];
        console.log(this.agendas);
        // we set the date
        const day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));
        // set the display month for UI
        this.displayMonth = this.monthNames[day.getMonth()];
        this.displayYear = day.getFullYear();


        // here we find the first day that our calendar will start from
        // it would be the last Monday of the previous month
        const startingDateOfCalendar = this.getStartDateForCalendar(day);

        // dateToAdd is an intermediate variable that will get increased
        // in the following for loop
        let dateToAdd = startingDateOfCalendar;

        // ok since we have our starting date then we get the next 41 days
        // that we need to add in our calendar array
        // 41 cause our calendar will show 6 weeks and MATH say that
        // 6 weeks * 7 days = 42!!
        for (let i = 0; i < 42; i++) {
            const today = new Date(dateToAdd);
            const eventsThatWillStartToday: Schedule[] = [];
            const eventsThatWillEndToday: Schedule[] = [];
            for (const agenda of this.agendas) {
                const eventStartDate = new Date(agenda.plannedStart);
                const eventEndDate = new Date(agenda.plannedEnd);
                console.log(eventStartDate);
                console.log(eventEndDate);
                console.log(today);
                if (today === eventStartDate) {
                    eventsThatWillStartToday.push(agenda);
                    console.log(eventsThatWillStartToday);
                }
                if (today === eventEndDate) {
                    eventsThatWillEndToday.push(agenda);
                    console.log(eventsThatWillEndToday);
                }
            }
            this.calenderDays.push(new CalenderDay(today, eventsThatWillStartToday, eventsThatWillEndToday));
            dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
        }
    }

    private getStartDateForCalendar(selectedDate: Date): Date {
        // for the day we selected let's get the previous month last day
        const lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

        // start by setting the starting date of the calendar same as the last day of previous month
        let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

        // but since we actually want to find the last Monday of previous month
        // we will start going back in days until we encounter our last Monday of previous month
        if (startingDateOfCalendar.getDay() !== 1) {
            do {
                startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
            } while (startingDateOfCalendar.getDay() !== 1);
        }

        return startingDateOfCalendar;
    }

    public increaseMonth(): void {
        this.monthIndex++;
        this.generateCalendarDays(this.monthIndex);
    }

    public decreaseMonth(): void {
        this.monthIndex--;
        this.generateCalendarDays(this.monthIndex);
    }

    public setCurrentMonth(): void {
        this.monthIndex = 0;
        this.generateCalendarDays(this.monthIndex);
    }

    private getAgendas(): void {
        this.scheduleService.getAll().subscribe((response: Response<Schedule[]>) => {
            this.agendas = response.data;
        }, error => {
            this.message.create('error', `${error}`, {
                nzDuration: 7000
            });
        });
    }
}