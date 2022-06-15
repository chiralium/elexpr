import { Serialize, SerializeModel, TReplacingMap } from '@elexpr/serializejs/serialize';

export interface IGithubCommitRepo {
    id: number;
    name: string;
    url: string;
}

export class GithubCommitRepo extends SerializeModel implements IGithubCommitRepo {
    public id: number;
    public name: string;
    public url: string;

    constructor (args: IGithubCommitRepo) {
        super();

        this.id = args.id;
        this.name = args.name;
        this.url = args.url;
    }
}

export interface IGithubCommit {
    sha: string;
    message: string;
    url: string;
}

export class GithubCommit extends SerializeModel implements IGithubCommit {
    public sha: string;
    public message: string;
    public url: string;

    constructor (args: IGithubCommit) {
        super();

        this.sha = args.sha;
        this.url = args.url;
        this.message = args.message;
    }
}

export interface IGithubEventPayload {
    ref: string;
    head: string;
    before: string;
    commits?: GithubCommit[];
}

export class GithubEventPayload extends SerializeModel implements IGithubEventPayload {
    public before: string;
    public commits?: GithubCommit[];
    public head: string;
    public ref: string;

    constructor (args: IGithubEventPayload) {
        super();

        this.before = args.before;
        this.head = args.head;
        this.ref = args.ref;

        this.commits = args.commits
            ? (
                new Serialize<GithubCommit, GithubCommit[], IGithubCommit>({
                    data: args.commits,
                    instanceConstructor: GithubCommit
                }).getModel()
            )
            : [];
    }
}

export interface IGithubEvent {
    type: string;
    repo: GithubCommitRepo;
    payload: GithubEventPayload;
    createdAt: string;
}

export class GithubEvent extends SerializeModel implements IGithubEvent {
    public createdAt: string;
    public payload: GithubEventPayload;
    public repo: GithubCommitRepo;
    public type: string;

    public static replacingMap: TReplacingMap<IGithubEvent> = {
        created_at: 'createdAt'
    }

    constructor (args: IGithubEvent) {
        super();

        this.createdAt = args.createdAt;
        this.type = args.type;

        this.repo = new Serialize<GithubCommitRepo, GithubCommitRepo, IGithubCommitRepo>({
            data: args.repo,
            instanceConstructor: GithubCommitRepo
        }).getModel();

        this.payload = new Serialize<GithubEventPayload, GithubEventPayload, IGithubEventPayload>({
            data: args.payload,
            instanceConstructor: GithubEventPayload
        }).getModel();
    }

    public get formatDate () {
        return this.createdAt.split('T').join(', ')
    }
}
