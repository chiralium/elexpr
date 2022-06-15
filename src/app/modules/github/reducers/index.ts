import { GithubEvent } from 'app/modules/github/models';
import { TAction } from 'src/types';
import { GITHUB_ACTIONS } from 'app/modules/github/actions';

export const GITHUB_REDUCER = 'GITHUB_REDUCER';

export type TGithubState = {
    githubEventList: GithubEvent[];
}

const initialState: TGithubState = {
    githubEventList: []
};

export const githubReducer = (state = initialState, action: TAction): TGithubState => {
    switch (action.type) {
        case GITHUB_ACTIONS.SET_EVENT_LIST: {
            return {
                ...state,
                githubEventList: action.payload
            }
        }

        default: {
            return state;
        }
    }
}
