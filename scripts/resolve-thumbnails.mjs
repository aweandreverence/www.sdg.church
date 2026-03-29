#!/usr/bin/env node
/**
 * Download and cache YouTube thumbnails locally under public/thumbnails/.
 *
 * Usage:
 *   node scripts/resolve-thumbnails.mjs              # download missing only
 *   node scripts/resolve-thumbnails.mjs --all        # re-download all
 *   node scripts/resolve-thumbnails.mjs <videoId>    # refresh specific video(s)
 *
 * For each video, picks the best available size:
 *   maxresdefault (1280x720) > sddefault (640x480) > hqdefault (480x360)
 *
 * Output: public/thumbnails/<videoId>.jpg (committed to repo)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const VIDEOS_DIR = path.join(ROOT, 'data', 'videos');
const THUMBS_DIR = path.join(ROOT, 'public', 'thumbnails');

const SIZES = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];

async function downloadBestThumbnail(videoId) {
  for (const size of SIZES) {
    const url = `https://img.youtube.com/vi/${videoId}/${size}.jpg`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        const outPath = path.join(THUMBS_DIR, `${videoId}.jpg`);
        fs.writeFileSync(outPath, buffer);
        return size;
      }
    } catch {
      // try next size
    }
  }
  return null;
}

function getAllVideoIds() {
  return fs.readdirSync(VIDEOS_DIR)
    .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(VIDEOS_DIR, f), 'utf-8')).videoId)
    .filter(Boolean);
}

async function main() {
  fs.mkdirSync(THUMBS_DIR, { recursive: true });

  const args = process.argv.slice(2);
  const refreshAll = args.includes('--all');
  const specificIds = args.filter((a) => !a.startsWith('--'));

  let videoIds;
  if (specificIds.length > 0) {
    videoIds = specificIds;
    console.log(`Refreshing ${videoIds.length} specific thumbnail(s)...`);
  } else {
    videoIds = getAllVideoIds();
    if (!refreshAll) {
      // Only download missing
      videoIds = videoIds.filter(
        (id) => !fs.existsSync(path.join(THUMBS_DIR, `${id}.jpg`))
      );
      if (videoIds.length === 0) {
        console.log('All thumbnails cached. Use --all to re-download.');
        return;
      }
      console.log(`Downloading ${videoIds.length} missing thumbnail(s)...`);
    } else {
      console.log(`Re-downloading all ${videoIds.length} thumbnails...`);
    }
  }

  const results = await Promise.all(
    videoIds.map(async (videoId) => {
      const size = await downloadBestThumbnail(videoId);
      if (size) {
        console.log(`  ✓ ${videoId} → ${size}`);
      } else {
        console.log(`  ✗ ${videoId} — no thumbnail found!`);
      }
      return { videoId, size };
    })
  );

  const failed = results.filter((r) => !r.size);
  if (failed.length > 0) {
    console.log(`\n⚠ ${failed.length} video(s) had no downloadable thumbnail.`);
  }

  console.log(`\nThumbnails saved to public/thumbnails/`);
  console.log('Remember to commit the new/updated images.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
