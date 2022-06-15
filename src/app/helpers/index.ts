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
