import './style.less';

import React, { useEffect, useMemo } from 'react';
import block from 'bem-cn';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { TRootState } from 'app/store';
import { GithubService } from 'app/modules/github/services';
import { TAction } from 'src/types';
import { getGithubEventList, GITHUB_MODULE } from 'app/modules/github/actions';
import { selectPushEventList } from 'app/modules/github/selectors';
import { GithubEvent } from 'app/modules/github/models';
import { RequestWrapper } from 'app/modules/request/components/RequestWrapper';

const b = block('last-commit');

export const LastCommit = () => {
    const dispatch = useDispatch<ThunkDispatch<TRootState, { githubService: GithubService }, TAction>>();
    const githubEventList = useSelector<TRootState, GithubEvent[]>(selectPushEventList);

    useEffect(() => {
        dispatch(getGithubEventList('chiralium'));
    }, []);

    const lastPush = useMemo<GithubEvent | undefined>(() => {
        return githubEventList[0];
    }, [githubEventList]);

    return <div className={b()}>
        <RequestWrapper name={GITHUB_MODULE}>
            <div className={b('content')}>
                Last push {lastPush?.formatDate}
            </div>
        </RequestWrapper>
    </div>
}
