import { IGoogleCalendarBusyItem } from 'app/modules/google-calendar/models';

export const makeAction = (moduleName: string, actionList: Record<string, string>): Record<string, string> => {
    const actionNameList = Object.keys(actionList);

    return actionNameList.reduce((acc, actionName) => {
        return {
            ...acc,
            [actionName]: `${moduleName}_${actionName}`
        }
    }, {});
}

export class BaseApi {
    public host?: string;

    constructor (host: string) {
        this.host = host;
    }

    private isOk = async (response: Response): Promise<Record<string, any>> => {
        if (response.ok) {
            try {
                return await response.json();
            } catch (e) {
                return {};
            }
        }

        throw new Error('Invalid response status code');
    };

    private makeJwtHeader = (jwt?: string): Record<string, string> => {
        if (jwt) {
            return {
                Authorization: `Bearer ${jwt}`
            };
        }

        return {};
    };

    public postRequest = (path: string, body: Record<string, any>, jwt?: string): Promise<Record<string, any>> => {
        return fetch(`${this.host}/${path}`, {
            headers: {
                'Content-Type': 'application/json',
                ...this.makeJwtHeader(jwt)
            },
            method: 'POST',
            body: JSON.stringify(body)
        }).then(this.isOk);
    };

    public getRequest = (path: string, jwt?: string): Promise<Record<string, any>> => {
        return fetch(`${this.host}/${path}`, {
            headers: {
                Accept: 'application/json',
                ...this.makeJwtHeader(jwt)
            }
        }).then(this.isOk);
    };
}

export const getFirstAndLastMonthDays = (): [string, string] => {
    const now = new Date();

    return [
        new Date(now.getFullYear(), now.getMonth()).toISOString(),
        new Date(now.getFullYear(), now.getMonth() + 1).toISOString()
    ]
}

export const formatDate = (date: string): string => date.split('T')[0];

export type TDayTimeLine = {
    hoursList: number[],
    minutesList: number[],
    fullDateList: Date[];
};

export const createDayTimeLine = (date: Date): TDayTimeLine => {
    const dayTimeList: TDayTimeLine = {
        hoursList: Array.from({ length: 12 }, (_, i) => i + 8),
        minutesList: Array.from({ length: 6 }, (_, i) => i * 10),
        fullDateList: []
    };

    dayTimeList.fullDateList = dayTimeList.hoursList.reduce((acc: Date[], hour) => {
        return [
            ...acc,
            ...dayTimeList.minutesList.map(minute => new Date(date.setHours(hour, minute, 0)))
        ]
    }, []);

    return dayTimeList;
}

export const isBusyTime = (date: Date, busyTimeList: Array<IGoogleCalendarBusyItem>): boolean => {
    const [day] = date.toISOString().split('T');

    const calendarDayList = busyTimeList.filter(busyTimeItem => {
        const [busyTimeDay] = busyTimeItem.start.split('T');
        return busyTimeDay === day
    });

    if (!calendarDayList.length) {
        return false;
    }

    return Boolean(calendarDayList.find(calendarDayItem => {
        return new Date(calendarDayItem.start).getTime() <= date.getTime() &&
            date.getTime() <= new Date(calendarDayItem.end).getTime();
    }));
}
