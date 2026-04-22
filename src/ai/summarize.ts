import { model } from "./ai";
import { promptStructure } from "./promptStructure";
import { promptStructureInput } from "../types/gitManagement";

function truncateString(input: string, maxLength: number = 8000): string {
    return input.length > maxLength ? input.slice(0, maxLength) : input;
}

export async function summarizeGitData(input: promptStructureInput): Promise<string> {
    const prompt = promptStructure({ ...input, log: truncateString(input.log) });

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (err) {
        return "Failed to generate AI summary.";
    }
}