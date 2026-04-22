#!/usr/bin/env node
import { program } from "commander";
import { getGitData } from "./getGitData";

program
    .argument("[range...]")
    .action((rangeParts: string[] = ["today"]) => {
        const range = rangeParts.join(" ");
        const data = getGitData(range);
        console.log(JSON.stringify(data, null, 2));
    });

program
    .command("help")
    .description("Display help information")
    .action(() => {
        program.help();
    });

program.parse(process.argv);
