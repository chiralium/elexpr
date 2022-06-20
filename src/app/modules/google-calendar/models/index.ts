import { SerializeModel } from '@elexpr/serializejs/serialize';

export interface IGoogleCalendarBusyItem {
    start: string;
    end: string;
}

export interface IGoogleCalendarFreeBusy {
    [key: string]: {
        busy: Array<IGoogleCalendarBusyItem>
    }
}

export interface IGoogleCalendarFreeBusyResponse {
    calendars: IGoogleCalendarFreeBusy;
};

export class GoogleCalendarFreeBusyResponse extends SerializeModel implements IGoogleCalendarFreeBusyResponse {
    public calendars: IGoogleCalendarFreeBusy;

    constructor (args: IGoogleCalendarFreeBusyResponse) {
        super();

        this.calendars = args.calendars;
    }
}
