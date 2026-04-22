import { execFileSync } from "child_process";
import { getGitDataReturnType } from "./types/gitManagement";

const presets: Record<string, string> = {
    today: "1 day ago",
    yesterday: "2 days ago",
    week: "7 days ago"
};

export function getGitData(range: string): getGitDataReturnType {
    const normalizedRange = range.trim() || "today";
    const since = presets[normalizedRange] ?? normalizedRange;

    const log = execFileSync("git", ["log", "--oneline", `--since=${since}`], { encoding: "utf8" }).trim();
    const diff = execFileSync("git", ["diff", "--stat"], { encoding: "utf8" }).trim();

    return { range: normalizedRange, log, diff };
}
