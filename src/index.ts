#!/usr/bin/env node
import { program } from "commander";
import { getGitData } from "./getGitData";

program
    .argument("[range...]")
    .option("--since <date>", "Start date expression (git --since)")
    .option("--until <date>", "End date expression (git --until)")
    .action((rangeParts: string[] = [], options: { since?: string; until?: string }) => {
        const range = rangeParts.join(" ").trim();
        const data = getGitData({
            range: range || undefined,
            since: options.since,
            until: options.until
        });
        console.log(JSON.stringify(data, null, 2));
    });

program
    .command("help")
    .description("Display help information")
    .action(() => {
        program.help();
    });

program.parse(process.argv);
