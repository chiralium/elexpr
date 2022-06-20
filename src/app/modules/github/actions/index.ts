import { makeAction } from 'app/helpers';
import { TAction, TAsyncAction } from 'src/types';
import { GithubEvent } from 'app/modules/github/models';
import { GithubService } from 'app/modules/github/services';
import { setError, setLoading } from 'app/modules/request/actions';

export const GITHUB_MODULE = 'GITHUB_MODULE';

export const GITHUB_ACTIONS = makeAction(GITHUB_MODULE, {
    SET_EVENT_LIST: 'SET_EVENT_LIST'
});

export const setEventList = (githubEventList: GithubEvent[]): TAction<GithubEvent[]> => {
    return {
        payload: githubEventList,
        type: GITHUB_ACTIONS.SET_EVENT_LIST
    };
};

export const getGithubEventList = (userName: string): TAsyncAction<GithubService> => {
    return async (dispatch, __, { githubService }) => {
        dispatch(setLoading({
            moduleName: GITHUB_MODULE,
            payload: true
        }));

        try {
            const githubEventList = await githubService.getEventList(userName);
            dispatch(setEventList(githubEventList));
            dispatch(setLoading({
                moduleName: GITHUB_MODULE,
                payload: false
            }));
        } catch (e) {
            dispatch(setError({
                moduleName: GITHUB_MODULE,
                payload: String(e)
            }));
        }
    }
}
