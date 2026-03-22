import Link from 'next/link';
import { youTubeThumbnailUrl } from '@/lib/youtube';
import styles from '@styles/common.module.scss';

interface VideoCardProps {
  id: string;
  videoId: string;
  title: string;
  description: string;
  tags: string[];
}

export function VideoCard({
  id,
  videoId,
  title,
  description,
  tags,
}: VideoCardProps) {
  return (
    <div className={`card ${styles.videoCard}`}>
      <Link href={`/videos/${id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={youTubeThumbnailUrl(videoId, 'sddefault')}
          alt={title}
          className="card-img-top"
        />
      </Link>
      <div className="card-body bg-dark text-light">
        <h5 className="card-title">
          <Link href={`/videos/${id}`} className={styles.cardLink}>
            {title}
          </Link>
        </h5>
        <p className="card-text text-secondary">{description}</p>
        <div className="d-flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={tag} className="badge bg-secondary">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
