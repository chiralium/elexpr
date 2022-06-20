import './style.less';

import React, { useEffect, useMemo, useRef } from 'react';
import block from 'bem-cn';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from 'app/store';
import { GithubService } from 'app/modules/github/services';
import { TAsyncDispatch } from 'src/types';
import { getGithubEventList, GITHUB_MODULE } from 'app/modules/github/actions';
import { selectPushEventList } from 'app/modules/github/selectors';
import { GithubEvent } from 'app/modules/github/models';
import { RequestWrapper } from 'app/modules/request/components/RequestWrapper';
import { UnicodePreloader } from 'app/components/UnicodePreloader';
import { Popup } from 'app/components/Popup';

const b = block('last-commit');

export const LastCommit = () => {
    const lastPushRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<TAsyncDispatch<GithubService>>();
    const githubEventList = useSelector<TRootState, GithubEvent[]>(selectPushEventList);

    useEffect(() => {
        dispatch(getGithubEventList('chiralium'));
    }, []);

    const lastPush = useMemo<GithubEvent | undefined>(() => {
        return githubEventList[0];
    }, [githubEventList]);

    const commitList = useMemo(() => {
        const payload = lastPush?.payload;

        if (!payload) {
            return null
        }

        const commits = payload.commits;

        return commits?.map(commit => {
            return <li className={b('list-item')} key={commit.sha}>
                <div className={b('content')}>
                    <span className={b('commit')}>{commit.message}</span> - <span className={b('repo')}>{lastPush?.repo.name}</span> ✅
                </div>
            </li>
        })
    }, [lastPush]);

    return <div className={b()} ref={lastPushRef}>
        <RequestWrapper name={GITHUB_MODULE} preloader={<UnicodePreloader/>}>
            <div className={b('content')}>
                Last push on {lastPush?.formatDate} 🕙
                <Popup targetNode={lastPushRef.current}>
                    <div className={b('popup')}>
                        <ul className={b('list')}>
                            {commitList}
                        </ul>
                        <div className={b('summary')}>
                            <a href="https://github.com/chiralium" target="_blank" rel="noreferrer">
                                <div className={b('github-link')}>🔗</div>
                            </a>
                        </div>
                    </div>
                </Popup>
            </div>
        </RequestWrapper>
    </div>
}
