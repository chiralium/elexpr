import { makeAction } from 'app/helpers';
import { TAction } from 'src/types';
import { GithubEvent } from 'app/modules/github/models';
import { ThunkAction } from 'redux-thunk';
import { TRootState } from 'app/store';
import { GithubService } from 'app/modules/github/services';

export const GITHUB_MODULE = 'GITHUB_MODULE';

export const GITHUB_ACTIONS = makeAction(GITHUB_MODULE, {
    SET_LOADING: 'SET_LOADING',
    SET_EVENT_LIST: 'SET_EVENT_LIST',
    SET_ERROR: 'SET_ERROR'
});

console.log(GITHUB_ACTIONS);

export const setLoading = (state: boolean): TAction<boolean> => {
    return {
        payload: state,
        type: GITHUB_ACTIONS.SET_LOADING
    };
};

export const setError = (error: string): TAction<string> => {
    return {
        payload: error,
        type: GITHUB_ACTIONS.SET_ERROR
    }
}

export const setEventList = (githubEventList: GithubEvent[]): TAction<GithubEvent[]> => {
    return {
        payload: githubEventList,
        type: GITHUB_ACTIONS.SET_EVENT_LIST
    };
};

export const getGithubEventList = (userName: string): ThunkAction<Promise<void>, TRootState, { githubService: GithubService }, TAction> => {
    return async (dispatch, __, { githubService }) => {
        dispatch(setLoading(true));

        try {
            const githubEventList = await githubService.getEventList(userName);
            dispatch(setEventList(githubEventList));
            dispatch(setLoading(false));
        } catch (e) {
            dispatch(setError(String(e)));
        }
    }
}
