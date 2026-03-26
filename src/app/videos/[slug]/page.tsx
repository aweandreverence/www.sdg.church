import type { Metadata } from 'next';
import Link from 'next/link';
import { getVideos, getVideoById, getPersonForVideo } from '@/lib/data';
import { youTubeEmbedUrl } from '@/lib/youtube';
import { buildTitle } from '@/lib/seo';
import styles from '@styles/common.module.scss';

interface VideoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const videos = getVideos();
  return videos.map((video) => ({
    slug: video.id,
  }));
}

export async function generateMetadata({
  params,
}: VideoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideoById(slug);
  if (!video) {
    return { title: buildTitle('Video Not Found') };
  }
  return {
    title: buildTitle(video.title),
    description: video.description,
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = getVideoById(slug);

  if (!video) {
    return (
      <div className={styles.pageHeader}>
        <h1>Video Not Found</h1>
        <Link href="/testimonies" className={styles.ctaButton}>
          Back to Testimonies
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.videoDetail}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className={styles.videoEmbed}>
              <iframe
                src={youTubeEmbedUrl(video.videoId)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h1 className="mt-4">{video.title}</h1>
            <p>{video.description}</p>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {video.tags.map((tag) => (
                <span key={tag} className="badge bg-secondary">
                  {tag}
                </span>
              ))}
            </div>
            <div className="d-flex flex-wrap gap-3">
              <Link href="/testimonies" className={styles.ctaButton}>
                &larr; All Testimonies
              </Link>
              {(() => {
                const person = getPersonForVideo(video.id);
                return person ? (
                  <Link
                    href={`/biographies/${person.slug}`}
                    className={styles.ctaButton}
                  >
                    Read {person.name}&apos;s Biography &rarr;
                  </Link>
                ) : null;
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
