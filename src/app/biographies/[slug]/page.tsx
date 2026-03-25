import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildTitle } from '@/lib/seo';
import {
  getAllPeopleSlugs,
  getPersonBySlug,
  getPrevNextPerson,
} from '@/lib/data';
import { youTubeEmbedUrl, youTubeThumbnailUrl } from '@/lib/youtube';
import { getVideoByVideoId } from '@/lib/data';
import styles from '@styles/common.module.scss';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPeopleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) {
    return { title: buildTitle('Not Found') };
  }
  return {
    title: buildTitle(`${person.name} — ${person.title}`),
    description: `${person.name} (${person.years}) — ${person.tagline}. ${person.bio.slice(0, 150)}…`,
  };
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((w) => w.length > 0)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default async function BiographyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) notFound();

  const { prev, next } = getPrevNextPerson(slug);

  return (
    <div className="container">
      <div className={styles.bioDetailHeader}>
        <Link href="/biographies" className={styles.bioBackLink}>
          ← Back to Biographies
        </Link>

        <div className={styles.bioDetailHero}>
          {person.image ? (
            <img
              src={person.image}
              alt={person.name}
              className={styles.bioDetailImage}
            />
          ) : (
            <div className={styles.bioDetailPlaceholder}>
              <span>{getInitials(person.name)}</span>
            </div>
          )}
          <div className={styles.bioDetailTitleBlock}>
            <h1 className={styles.bioDetailName}>{person.name}</h1>
            <p className={styles.bioDetailYears}>{person.years}</p>
            <p className={styles.bioDetailTitle}>{person.title}</p>
            <p className={styles.bioDetailTagline}>{person.tagline}</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <section className={styles.bioDetailSection}>
            <h2 className={styles.bioDetailSectionTitle}>Biography</h2>
            <p className={styles.bioDetailText}>{person.bio}</p>
          </section>

          <section className={styles.bioDetailSection}>
            <div className={styles.faithSection}>
              <h2 className={styles.faithTitle}>Faith &amp; Testimony</h2>
              <p className={styles.faithDescription}>{person.faith}</p>
            </div>
          </section>

          {person.sources && person.sources.length > 0 && (
            <section className={styles.bioDetailSection}>
              <h2 className={styles.bioDetailSectionTitle}>Sources</h2>
              <ul className={styles.sourcesList}>
                {person.sources.map((source, i) => (
                  <li key={i} className={styles.sourceItem}>
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.sourceLink}
                      >
                        {source.title}
                      </a>
                    ) : (
                      <span className={styles.sourceTitle}>
                        {source.title}
                      </span>
                    )}
                    {source.note && (
                      <span className={styles.sourceNote}>
                        {' — '}
                        {source.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {person.videos && person.videos.length > 0 && (
            <section className={styles.bioDetailSection}>
              <h2 className={styles.bioDetailSectionTitle}>Videos</h2>
              <div className={styles.bioVideoGrid}>
                {person.videos.map((video, i) => {
                  const videoId = video.videoId;
                  const testimonyEntry = videoId ? getVideoByVideoId(videoId) : undefined;

                  if (videoId) {
                    return (
                      <div key={i} className={styles.bioVideoCard}>
                        {testimonyEntry ? (
                          <Link href={`/videos/${testimonyEntry.id}`}>
                            <img
                              src={youTubeThumbnailUrl(videoId, 'sddefault')}
                              alt={video.title}
                              className={styles.bioVideoThumbnail}
                            />
                          </Link>
                        ) : (
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={youTubeThumbnailUrl(videoId, 'sddefault')}
                              alt={video.title}
                              className={styles.bioVideoThumbnail}
                            />
                          </a>
                        )}
                        <div className={styles.bioVideoInfo}>
                          {testimonyEntry ? (
                            <Link
                              href={`/videos/${testimonyEntry.id}`}
                              className={styles.bioVideoTitle}
                            >
                              {video.title}
                            </Link>
                          ) : (
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.bioVideoTitle}
                            >
                              {video.title}
                            </a>
                          )}
                          {video.note && (
                            <p className={styles.bioVideoNote}>{video.note}</p>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={i} className={styles.bioVideoCard}>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.bioVideoTitle}
                      >
                        {video.title}
                      </a>
                      {video.note && (
                        <p className={styles.bioVideoNote}>{video.note}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <nav className={styles.bioPrevNext}>
            {prev ? (
              <Link
                href={`/biographies/${prev.slug}`}
                className={styles.bioPrevNextLink}
              >
                ← {prev.name}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/biographies/${next.slug}`}
                className={styles.bioPrevNextLink}
              >
                {next.name} →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
