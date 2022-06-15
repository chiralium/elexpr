import { TRootState } from 'app/store';
import { TGithubState, GITHUB_REDUCER } from 'app/modules/github/reducers';
import { GithubEvent } from 'app/modules/github/models';

const selectModule = (state: TRootState): TGithubState => {
    return state[GITHUB_REDUCER];
}

export const selectIsLoading = (state: TRootState): boolean => {
    return selectModule(state).loading;
}

export const selectGithubEventList = (state: TRootState): GithubEvent[] => {
    return selectModule(state).githubEventList;
}

export const selectPushEventList = (state: TRootState): GithubEvent[] => {
    return selectGithubEventList(state).filter(githubEvent => githubEvent.type === 'PushEvent')
}
