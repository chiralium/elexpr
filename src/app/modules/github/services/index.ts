import { BaseApi } from 'app/helpers';
import { GithubEvent, IGithubEvent } from 'app/modules/github/models';
import { Serialize } from '@elexpr/serializejs/serialize';

export class GithubService extends BaseApi {
    constructor () {
        super('https://api.github.com');
    }

    public getEventList = async (userName: string): Promise<GithubEvent[]> => {
        const response = await this.getRequest(`users/${userName}/events`);
        return new Serialize<GithubEvent, GithubEvent[], IGithubEvent>({
            data: response,
            instanceConstructor: GithubEvent
        }).getModel();
    }
}
