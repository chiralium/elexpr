import { BaseApi } from 'app/helpers';
import {
    GoogleCalendarFreeBusyResponse,
    IGoogleCalendarFreeBusyResponse
} from 'app/modules/google-calendar/models';
import { Serialize } from '@elexpr/serializejs/serialize';

export class GoogleCalendarServices extends BaseApi {
    constructor () {
        super('https://www.googleapis.com/calendar/v3');
    }

    public getFreeBusy = async (timeMax: string, timeMin: string): Promise<GoogleCalendarFreeBusyResponse> => {
        const response = await this.postRequest(`freeBusy?key=${process.env.GOOGLE_CALENDAR_TOKEN}`, {
            timeMax,
            timeMin,
            timeZone: 'Europe/Moscow',
            items: [{
                id: 'bezveselnyyevg@gmail.com'
            }]
        });

        return new Serialize<GoogleCalendarFreeBusyResponse, GoogleCalendarFreeBusyResponse, IGoogleCalendarFreeBusyResponse>({
            data: response,
            instanceConstructor: GoogleCalendarFreeBusyResponse
        }).getModel();
    }
}
