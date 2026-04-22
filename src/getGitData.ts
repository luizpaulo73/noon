import { execFileSync } from "child_process";
import { getGitDataInput, getGitDataReturnType } from "./types/gitManagement";

const presets: Record<string, string> = {
    today: "1 day ago",
    yesterday: "2 days ago",
    week: "7 days ago"
};

export function getGitData(input: getGitDataInput): getGitDataReturnType {
    const normalizedRange = input.range?.trim() ?? "";
    const normalizedSince = input.since?.trim();
    const normalizedUntil = input.until?.trim();

    const resolvedRange = normalizedRange || (normalizedSince || normalizedUntil ? "custom" : "today");
    const resolvedSince = normalizedSince
        ?? (normalizedRange ? (presets[normalizedRange] ?? normalizedRange) : undefined)
        ?? (normalizedUntil ? "7 days ago" : presets.today);

    const logArgs = ["log", "--no-merges", "shortstat", "--pretty=format:%s"];

    if (resolvedSince) logArgs.push(`--since=${resolvedSince}`);
    if (normalizedUntil) logArgs.push(`--until=${normalizedUntil}`);

    const log = execFileSync("git", logArgs, { encoding: "utf8" }).trim();

    return { range: resolvedRange, since: resolvedSince, until: normalizedUntil, log };
}
