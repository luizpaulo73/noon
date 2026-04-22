# Lore CLI

A command-line tool that prints Git information as JSON.

## Requirements

- Node.js (LTS recommended)
- npm
- Git installed and available in your PATH

## Run Locally (Dev Mode, No Build)

This is the main workflow for local development.

1. Install dependencies:

```bash
npm install
```

2. Run directly from TypeScript (no build step):

```bash
npm run dev
```

With a custom range:

```bash
npm run dev -- week
```

You can also pass any Git-compatible date expression:

```bash
npm run dev -- "2 weeks ago"
npm run dev -- "last friday"
```

You can run with an explicit date interval:

```bash
npm run dev -- since="2026-04-01" until="2026-04-15"
npm run dev -- since="10 days ago" until="yesterday"
```

If you pass `since=...` and/or `until=...`, they are sent directly to `git log`.

Direct CLI options are also supported:

```bash
npm run dev -- -- --since "10 days ago" --until "yesterday"
```

For `npm run dev`, use `since=...` / `until=...` when you want a single `--` separator.

The default range is `today`.

## Optional: Build and Run Compiled Output

If you want to test the compiled CLI:

```bash
npm run cli
```

With a custom range:

```bash
npm run cli -- yesterday
```

## Supported Ranges

- `today` (default): last 24 hours
- `yesterday`: last 2 days
- `week`: last 7 days
- Any Git date expression, such as `2 weeks ago`, `yesterday 00:00`, or `2026-04-01`
- Interval mode with `--since` and `--until`

## Example Output

```json
{
    "range": "today",
    "log": "abc1234 feat: add command\ndef5678 fix: adjust output",
    "diff": " src/index.ts | 10 ++++++----\n 1 file changed, 6 insertions(+), 4 deletions(-)"
}
```

## Notes

- This command depends on `git log` and `git diff`, so run it inside a Git repository.
- The `diff` value represents current local changes in your working tree.
