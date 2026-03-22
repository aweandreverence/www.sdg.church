import Link from 'next/link';
import { getTestimonies } from '@/lib/data';
import { VideoCard } from '@/components/VideoCard';
import styles from '@styles/common.module.scss';

export default function HomePage() {
  const testimonies = getTestimonies().slice(0, 3);

  return (
    <>
      <div className={styles.hero}>
        <h1>Soli Deo Gloria</h1>
        <p>Glory to God Alone</p>
      </div>

      <div className={styles.homeIntro}>
        <h2>What Is the Gospel?</h2>
        <p>
          The gospel is the good news that God — the Creator of the universe —
          has made a way for sinful people to be forgiven and reconciled to Him
          through the life, death, and resurrection of His Son, Jesus Christ.
          This is the most important message in history. It&apos;s for you.
        </p>
        <Link href="/gospel" className={styles.ctaButton}>
          Learn More
        </Link>
      </div>

      <div className="container">
        <div className={styles.pageHeader}>
          <h1>Testimonies</h1>
          <p>Real stories of lives transformed by the gospel of Jesus Christ.</p>
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
        <div className={styles.ctaSection}>
          <Link href="/testimonies" className={styles.ctaButton}>
            View All Testimonies
          </Link>
        </div>
      </div>
    </>
  );
}
