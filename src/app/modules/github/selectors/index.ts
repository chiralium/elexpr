import { TRootState } from 'app/store';
import { TGithubState } from 'app/modules/github/reducers';
import { GithubEvent } from 'app/modules/github/models';
import { GITHUB_MODULE } from 'app/modules/github/actions';

const selectModule = (state: TRootState): TGithubState => {
    return state[GITHUB_MODULE];
}

export const selectGithubEventList = (state: TRootState): GithubEvent[] => {
    return selectModule(state).githubEventList;
}

export const selectPushEventList = (state: TRootState): GithubEvent[] => {
    return selectGithubEventList(state).filter(githubEvent => githubEvent.type === 'PushEvent')
}
