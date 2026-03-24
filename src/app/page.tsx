import Link from 'next/link';
import { getTestimonies } from '@/lib/data';
import { BibleRef } from '@/components/BibleRef';
import { VideoCard } from '@/components/VideoCard';
import styles from '@styles/common.module.scss';

export default function HomePage() {
  const testimonies = getTestimonies().slice(0, 3);

  return (
    <>
      {/* ── Hero: The Overture ── */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Soli Deo Gloria</h1>
        <p className={styles.heroSubtitle}>Glory to God Alone</p>
        <div className={styles.heroVerse}>
          <p>
            &ldquo;After these things I looked, and behold, a great multitude
            which no one could count, from every nation and all the tribes,
            peoples, and languages, standing before the throne and before the
            Lamb, clothed in white robes, and palm branches were in their
            hands; and they cried out with a loud voice, saying, &lsquo;Salvation
            belongs to our God who sits on the throne, and to the
            Lamb.&rsquo;&rdquo;
          </p>
          <span className={styles.heroRef}>
            — <BibleRef reference="Revelation 7:9-10" className={styles.heroRefLink} />
            {' '}(NASB)
          </span>
        </div>
      </div>

      {/* ── Movement I: What Is the Gospel? ── */}
      <div className={styles.homeIntro}>
        <p className={styles.movementLabel}>Movement I</p>
        <h2>What Is the Gospel?</h2>
        <p>
          The gospel is the good news that God — the Creator of the
          universe — has made a way for sinful people to be forgiven and
          reconciled to Him through the life, death, and resurrection of His
          Son, Jesus Christ. This is the most important message in history.
          It&apos;s for you.
        </p>
        <Link href="/gospel" className={styles.ctaButton}>
          Learn More
        </Link>
      </div>

      {/* ── Movement II: Testimonies ── */}
      <div className="container">
        <div className={styles.pageHeader}>
          <p className={styles.movementLabel}>Movement II</p>
          <h2>A Symphony of Testimonies</h2>
          <p>
            Real stories of lives transformed by the gospel of Jesus Christ —
            from every walk of life, every background, every corner of the
            earth.
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
        <div className={styles.ctaSection}>
          <Link href="/testimonies" className={styles.ctaButton}>
            View All Testimonies
          </Link>
        </div>
      </div>

      {/* ── Movement III: The Urgency ── */}
      <div className={styles.urgencyBanner}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p className={styles.movementLabel}>Movement III</p>
              <h2>While It Is Still Day</h2>
              <blockquote className={styles.bannerQuote}>
                &ldquo;We must work the works of Him who sent Me as long as it
                is day; night is coming when no one can work.&rdquo;
              </blockquote>
              <p className={styles.passageRef}>
                — <BibleRef reference="John 9:4" className={styles.heroRefLink} />
              </p>
              <p className={styles.urgencyText}>
                There is an urgency to the gospel. God&apos;s offer of salvation
                is free — but it will not wait forever. Today is the day.
              </p>
              <Link href="/repentance" className={styles.ctaButton}>
                A Call to Repentance
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── SDG Meaning ── */}
      <div className={styles.homeIntro}>
        <h2>S.D.G.</h2>
        <p className={styles.sdgExplanation}>
          <em>Soli Deo Gloria</em> — &ldquo;To God alone be the glory.&rdquo;
          These three letters were how Johann Sebastian Bach signed every
          composition he wrote. Whether a towering Mass or a simple prelude,
          each piece was dedicated to the glory of God.
        </p>
        <p>
          This site is our own offering — a symphony of testimonies from
          people whose lives have been transformed by the gospel of Jesus
          Christ. From athletes to scientists, from prisoners to presidents,
          from every nation, tribe, and tongue — all declaring with one
          voice: <em>Soli Deo Gloria.</em>
        </p>
      </div>
    </>
  );
}
