export type getGitDataReturnType = {
    range: string;
    since?: string;
    until?: string;
    log: string;
    diff: string;
}

export type getGitDataInput = {
    range?: string;
    since?: string;
    until?: string;
}