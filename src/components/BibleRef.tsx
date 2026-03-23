/**
 * BibleRef — renders a Bible reference as a link to awesome.bible (NASB)
 *
 * Usage: <BibleRef reference="Romans 3:23" />
 *        <BibleRef reference="Ephesians 2:8-9" />
 */

interface BibleRefProps {
  reference: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Convert a human-readable Bible reference to an awesome.bible URL.
 * e.g. "Romans 3:23" -> "https://awesome.bible/bible/nasb/romans/3/23"
 *      "Ephesians 2:8-9" -> "https://awesome.bible/bible/nasb/ephesians/2/8"
 *      "Luke 16:19-31" -> "https://awesome.bible/bible/nasb/luke/16/19"
 */
function referenceToUrl(ref: string): string {
  // Match: "Book Chapter:Verse" or "Book Chapter:Verse-Verse"
  // Handle multi-word book names like "1 John" or "Song of Solomon"
  const match = ref.match(/^(.+?)\s+(\d+):(\d+)(?:-\d+)?$/);
  if (!match) {
    // Fallback: just link to awesome.bible
    return 'https://awesome.bible/bible';
  }
  const [, book, chapter, verse] = match;
  const bookSlug = book.toLowerCase().replace(/\s+/g, '-');
  return `https://awesome.bible/bible/nasb/${bookSlug}/${chapter}/${verse}`;
}

export function BibleRef({ reference, className, children }: BibleRefProps) {
  const url = referenceToUrl(reference);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title={`Read ${reference} (NASB) on Awesome.Bible`}
    >
      {children || reference}
    </a>
  );
}
