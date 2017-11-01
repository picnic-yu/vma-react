import * as React from 'react';
import * as ClassName from 'classnames';

interface Day {
    key: number;
    year: number;
    month: number;
    day: number;
    alias?: string;
}

interface Month {
    value: number;
    alias: string;
}
// interface Date {
//     year: number;
//     month: number;
//     day: number;
// }
interface CalendarState {
    days?: Array<Array<Day>>;
    title?: Array<string>;
    months?: Array<Month>;
    years?: Array<number>;
    date: Date;
}

interface CalendarProps {
    year?: number;
    month?: number;
    day?: number;
}
export class Calendar extends React.Component<CalendarProps, CalendarState> {
    constructor(props: CalendarProps) {
        super(props);
        this.calculate();
    }
    render() {
        let date = this.state.date;
        return (
        <div className="calendar">
            <ul className="calendar-bar row">
                <li className="calendar-title-pre col-6" onClick={this.preMonth}>{'<'}</li>
                <li className="calendar-title-current col-12">
                {date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日
                </li>
                <li className="calendar-title-next col-6" onClick={this.nextMonth}>{'>'}</li>
            </ul>
                <table>
                    <thead>
                        <tr>
                            <td>日</td>
                            <td>一</td>
                            <td>二</td>
                            <td>三</td>
                            <td>四</td>
                            <td>五</td>
                            <td>六</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderWeek()}
                        {/* <tr>
                            <td onClick={e => this.curDate(29)}>29</td>
                            <td>30</td><td>31</td><td>1</td><td>2</td><td>3</td><td>4</td>
                        </tr> */}
                    </tbody>
                </table>
        </div>
        );
    }

    preMonth = () => {
        let date = this.state.date;
        let day = date.getDate();
        let valid = new Date(date);
        valid.setDate(0);
        let validDay = valid.getDate();
        day = Math.min(day, validDay);
        date.setMonth(date.getMonth() - 1, day);
        // date.setDate(date.getDate() - 1);
        this.setState({date, days: this.fullDays(date.getFullYear(), date.getMonth(), date.getDate())});
    }

    nextMonth = () => {
        let date = this.state.date;
        let day = date.getDate();
        let valid = new Date(date);
        valid.setDate(1);
        valid.setMonth(valid.getMonth() + 2);
        valid.setDate(0);
        let validDay = valid.getDate();
        day = Math.min(day, validDay);
        date.setMonth(date.getMonth() + 1, day);
        // date.setDate(date.getDate() + 1);
        this.setState({date, days: this.fullDays(date.getFullYear(), date.getMonth(), date.getDate())});
    }

    curDate = (day: Day) => {
        let date = new Date(day.year, day.month, day.day);
        this.setState({date, days: this.fullDays(day.year, day.month, day.day)});
        console.log(date.toDateString());
    }
    
    private calculate() {
        let {year, month, day} = this.props;
        let date = new Date();
        
        year = year === undefined ? date.getFullYear() : year;
        month = month === undefined ? date.getMonth() : month - 1;
        day = day === undefined ? date.getDate() : day;
        date.setFullYear(year, month, day);

        this.state = {date, days: this.fullDays(year, month, day)};
    }

    private fullDays(year: number, month: number, day: number) {
        let days: Array<Array<Day>> = [];
        let date = new Date(year, month, 1);
        let weekOfFirstDay = date.getDay();
        date.setDate(date.getDate() - weekOfFirstDay);
        for (let row = 0; row < 6; row++) {
            let week: Array<Day> = [];
            for (let col = 0; col < 7; col++) {
                let curYear = date.getFullYear();
                let curMonth = date.getMonth();
                let curDay = date.getDate();
                week.push({year: curYear, month: curMonth, day: curDay, key: row * 10 + col});
                date.setDate(date.getDate() + 1);
            }
            days.push(week);
        }
        return days;
    }

    private renderWeek(): JSX.Element[] | null {
        let curDay = this.state.date;
        let days = this.state.days;
        if (days !== undefined) {
            return days.map((week, row) => {
                return (
                    <tr key={row}>
                    {week.map((day, col) => {
                        return (
                        <td 
                            key={day.key} 
                            className={ClassName(
                                {'calendar-current': this.isSameDay(curDay, day.year, day.month, day.day)},
                                {'calendar-diffmonth': day.month !== curDay.getMonth()})}
                            onClick={e => this.curDate(day)}
                        >
                        {day.day}
                        </td>
                        );
                    })
                    }
                    </tr>
                );
            });
        } else {
            return null;
        }
    }

    private isSameDay(curDate: Date, year: number, month: number, day: number) {
        return curDate.getDate() === day && curDate.getMonth() === month && curDate.getFullYear() === year;
    }
}