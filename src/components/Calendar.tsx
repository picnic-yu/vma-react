import * as React from 'react';
import * as ClassName from 'classnames';
import * as moment from 'moment';
// import { Input } from './Input';
import { Handler } from './Base';

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
    value?: string;
    show?: boolean;
    canClear?: boolean;
}

interface CalendarProps {
    name?: string;
    value?: string;
    required?: boolean;
    format?: string;
    onChange?: (date: string) => void;
}

export class Calendar extends React.Component<CalendarProps & Handler<string>, CalendarState> {
    state: CalendarState;
    errorMsg: string = '请提供时间';
    constructor(props: CalendarProps) {
        super(props);
        this.calculate();
    }
    render() {
        let date = this.state.date;
        let show = this.state.show;
        // let format = this.props.format === undefined ? 'YYYY-MM-DD' : this.props.format;
        let value = this.state.value;
        return (
        <div>
            <input 
                type="text" 
                className="vma-input"
                style={{border: '1px solid #bfcbd9'}}
                name={this.props.name}
                value={value}
                required={this.props.required}
                readOnly={true}
                onClick={this.showCalendar}
                onMouseOver={this.setCloseFlag}
                onMouseLeave={this.clearCloseFlag}
            />
            <i 
                className={ClassName('icon-calendar', {'icon-cross': this.state.canClear === true})} 
                style={{right: '14px', position: 'absolute', top: '12px'}}
                onMouseOver={this.setCloseFlag}
                onClick={this.clearClose}
            />
            {show && 
            <div className="calendar">
                <ul className="calendar-bar row">
                <li className="calendar-title-pre col-3" onClick={this.preYear}>{'<<'}</li>
                    <li className="calendar-title-pre col-3" onClick={this.preMonth}>{'<'}</li>
                    <li className="calendar-title-current col-12">
                    {date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日
                    </li>
                    <li className="calendar-title-next col-3" onClick={this.nextMonth}>{'>'}</li>
                    <li className="calendar-title-next col-3" onClick={this.nextYear}>{'>>'}</li>
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
                        </tbody>
                    </table>
            </div>
            }
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

    preYear = () => {
        let date = this.state.date;
        let day = date.getDate();
        let valid = new Date(date);
        valid.setDate(0);
        let validDay = valid.getDate();
        day = Math.min(day, validDay);
        date.setFullYear(date.getFullYear() - 1, date.getMonth(), day);      
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

    nextYear = () => {
        let date = this.state.date;
        let day = date.getDate();
        let valid = new Date(date);
        valid.setDate(1);
        valid.setMonth(valid.getMonth() + 2);
        valid.setDate(0);
        let validDay = valid.getDate();
        day = Math.min(day, validDay);
        date.setFullYear(date.getFullYear() + 1, date.getMonth(), day);
        // date.setDate(date.getDate() + 1);
        this.setState({date, days: this.fullDays(date.getFullYear(), date.getMonth(), date.getDate())});
    }

    curDate = (day: Day) => {
        let date = new Date(day.year, day.month, day.day);
        let format = this.props.format === undefined ? 'YYYY-MM-DD' : this.props.format;
        let value = moment(date).format(format);
        this.setState({value, date, days: this.fullDays(day.year, day.month, day.day), show: false}, () => {
            if (this.props.watchValue && this.state.value !== undefined) {
                this.props.watchValue(
                    this.props.name || '', 
                    this.state.value, 
                    false);
            }
            if (this.props.validator) {
                this.props.validator(
                    this.props.name || '', 
                    this.state.value, 
                    this.validator(), 
                    this.errorMsg);
            }                                        
        });           
    }

    showCalendar = () => {
        this.setState({show: !this.state.show || false}, () => {
            if (this.state.show === false) {
                if (this.props.watchValue && this.state.value !== undefined) {
                    this.props.watchValue(
                        this.props.name || '', 
                        this.state.value, 
                        false);
                }
                if (this.props.validator) {
                    this.props.validator(
                        this.props.name || '', 
                        this.state.value, 
                        this.validator(), 
                        this.errorMsg);
                }                                                            
            }            
        });
    }

    setCloseFlag = () => {
        if (this.state.value !== undefined && this.state.value.length > 0) {
            this.setState({canClear: true});
        }
    }

    clearCloseFlag = () => {
        if (this.state.value !== undefined && this.state.value.length > 0) {
            this.setState({canClear: false});
        }
    }

    clearClose = () => {
        if (this.state.value !== undefined) {
            this.setState({value: '', canClear: false}, () => {
                if (this.props.watchValue && this.state.value !== undefined) {
                    this.props.watchValue(
                        this.props.name || '', 
                        this.state.value, 
                        false);
                }
                if (this.props.validator) {
                    this.props.validator(
                        this.props.name || '', 
                        this.state.value, 
                        this.validator(), 
                        this.errorMsg);
                }                                                                            
            });
        }
    }

    validator = (): boolean => {
        let result: boolean = this.props.required === true;
        return result ? this.state.value !== undefined && this.state.value.length > 0 : true;
    }
        
    private calculate() {
        let {value, format} = this.props;
        format = format === undefined ? 'YYYY-MM-DD' : format;
        let date = value === undefined ?  new Date() : moment(value, format).toDate();
        
        this.state = {
            value: this.props.value, 
            date, 
            days: this.fullDays(date.getFullYear(), date.getMonth(), date.getDate()), 
            show: false
        };
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