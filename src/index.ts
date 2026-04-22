#!/usr/bin/env node
import { program } from "commander";
import { getGitData } from "./getGitData";
import { paramsResolver } from "./paramsResolver";
import { summarizeGitData } from "./ai/summarize";

program
    .argument("[range...]")
    .option("--since <date>", "Start date expression (git --since)")
    .option("--until <date>", "End date expression (git --until)")
    .option("--ai", "Generate AI summary")
    .action(async (rangeParts: string[] = [], options: { since?: string; until?: string; ai?: boolean }) => {
        const data = getGitData(paramsResolver(rangeParts, options));
        if (options.ai) {
            const summary = await summarizeGitData({
                log: data.log,
                diff: data.diff,
                range: data.range
            });

            console.log("\n🧠 AI Summary:\n");
            console.log(summary);
            return;
        }
        console.log(JSON.stringify({ data }, null, 2));
    });

program
    .command("help")
    .description("Display help information")
    .action(() => { program.help() });

program.parse(process.argv);
