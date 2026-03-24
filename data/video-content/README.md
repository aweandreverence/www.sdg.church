# Video Content Directory

Local workspace for curating and editing video content for sdg.church.

## Structure

| Directory | Purpose |
|-----------|---------|
| `raw/` | Raw/original extracted footage from YouTube, Vimeo, etc. |
| `clips/` | Compiled clips ready for upload (trimmed, attributed) |
| `thumbnails/` | Custom thumbnails for videos |
| `metadata/` | Video metadata, attribution notes, license info |

## Workflow

1. **Find** a testimony/biography video on YouTube
2. **Download** raw footage to `raw/` (use `yt-dlp`)
3. **Clip** relevant portion to `clips/` (use `ffmpeg`)
4. **Document** attribution and license in `metadata/`
5. **Upload** to A&R YouTube channel (if clipping)
6. **Update** `data/content.json` with the video ID

## Tools

- `yt-dlp` — download YouTube/Vimeo videos
- `ffmpeg` — clip, trim, and process video
- YouTube Studio — upload and manage A&R channel

## License Notes

Before clipping any video:
- Check if the channel allows reuse (Creative Commons, etc.)
- Check video description for explicit permissions
- When in doubt, link/embed the original instead of re-uploading
- Always credit the original creator

