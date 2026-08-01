import { getTestimonies } from '@/lib/data';
import { VideoCard } from '@/components/VideoCard';
import { buildSeoMetadata } from '@/lib/seo';
import styles from '@styles/common.module.scss';

export const metadata = buildSeoMetadata({
  title: 'Testimonies',
  description:
    'Real stories of lives transformed by the gospel of Jesus Christ. Watch testimonies of conversion, deliverance, and new life.',
  path: '/testimonies',
});

export default function TestimoniesPage() {
  const testimonies = getTestimonies();

  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1>Testimonies</h1>
        <p>
          Real stories of lives transformed by the gospel of Jesus Christ.
        </p>
      </div>
      <div className={styles.videoGrid}>
        {testimonies.map((t) => (
          <VideoCard
            key={t.id}
            id={t.id}
            videoId={t.videoId}
            title={t.title}
            description={t.description}
            tags={t.tags}
          />
        ))}
      </div>
    </div>
  );
}
