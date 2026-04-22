#!/usr/bin/env node
import { program } from "commander";
import { getGitData } from "./getGitData";

program
    .argument("[range...]")
    .option("--since <date>", "Start date expression (git --since)")
    .option("--until <date>", "End date expression (git --until)")
    .action((rangeParts: string[] = [], options: { since?: string; until?: string }) => {
        let parsedSince: string | undefined;
        let parsedUntil: string | undefined;
        const remainingParts: string[] = [];

        for (const part of rangeParts) {
            if (!parsedSince && part.startsWith("since=")) {
                parsedSince = part.slice("since=".length).trim();
                continue;
            }

            if (!parsedUntil && part.startsWith("until=")) {
                parsedUntil = part.slice("until=".length).trim();
                continue;
            }

            remainingParts.push(part);
        }

        const range = remainingParts.join(" ").trim();
        const data = getGitData({
            range: range || undefined,
            since: options.since ?? parsedSince,
            until: options.until ?? parsedUntil
        });
        console.log(JSON.stringify(data, null, 2));
    });

program
    .command("help")
    .description("Display help information")
    .action(() => { program.help() });

program.parse(process.argv);
