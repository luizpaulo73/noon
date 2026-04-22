export type getGitDataReturnType = {
    range: string;
    since?: string;
    until?: string;
    log: string;
}

export type getGitDataInput = {
    range?: string;
    since?: string;
    until?: string;
}

export type promptStructureInput = {
    log: string;
    range?: string;
}