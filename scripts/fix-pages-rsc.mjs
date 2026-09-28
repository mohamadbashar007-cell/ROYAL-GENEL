import { copyFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const outputDir = path.resolve('out');
let copied = 0;

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const child = path.join(directory, entry.name);

    if (entry.name.startsWith('__next.')) {
      for (const payload of await readdir(child, { withFileTypes: true })) {
        if (!payload.isFile()) continue;
        await copyFile(path.join(child, payload.name), path.join(directory, `${entry.name}.${payload.name}`));
        copied += 1;
      }
    } else {
      await walk(child);
    }
  }
}

await walk(outputDir);
console.log(`Prepared ${copied} static route payloads for GitHub Pages.`);
