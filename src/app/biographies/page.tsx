import type { Metadata } from 'next';
import Link from 'next/link';
import { buildTitle } from '@/lib/seo';
import { getBiographyCategories } from '@/lib/data';
import styles from '@styles/common.module.scss';

export const metadata: Metadata = {
  title: buildTitle('Biographies of Faithful Saints'),
  description:
    'Biographies of faithful Christians throughout history who glorified God through extraordinary works — from composers and scientists to missionaries and reformers.',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((w) => w.length > 0)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function BiographiesPage() {
  const categories = getBiographyCategories();

  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1>Biographies of Faithful Saints</h1>
        <p className={styles.headerSubtitle}>
          &ldquo;Therefore, since we have so great a cloud of witnesses
          surrounding us, let us also lay aside every encumbrance and the sin
          which so easily entangles us, and let us run with endurance the race
          that is set before us.&rdquo;
          <br />
          Hebrews 12:1
        </p>
        <p>
          Throughout history, countless faithful Christians have glorified God
          through their extraordinary works. From composers who inscribed{' '}
          <em>Soli Deo Gloria</em> on their manuscripts to scientists who saw
          the heavens declaring God&apos;s glory, from missionaries who gave
          their lives for the gospel to reformers who stood for truth — these
          are their stories.
        </p>
      </div>

      {categories.map((category) => (
        <section key={category.id} className={styles.movementSection}>
          <h2 className={styles.movementTitle}>{category.name}</h2>
          <p className={styles.commentary}>{category.description}</p>

          {category.subcategories.map((subcategory) => (
            <div key={subcategory.id} className={styles.subcategorySection}>
              <h3 className={styles.subcategoryTitle}>{subcategory.name}</h3>

              <div className="row g-4">
                {subcategory.people.map((person) => (
                  <div
                    key={person.slug}
                    className="col-12 col-md-6 col-lg-4"
                  >
                    <Link
                      href={`/biographies/${person.slug}`}
                      className={styles.bioCardLink}
                    >
                      <div className={styles.bioCard}>
                        <div className={styles.bioCardImageWrap}>
                          {person.image ? (
                            <img
                              src={person.image}
                              alt={person.name}
                              className={styles.bioCardImage}
                              loading="lazy"
                            />
                          ) : (
                            <div className={styles.bioCardPlaceholder}>
                              <span>{getInitials(person.name)}</span>
                            </div>
                          )}
                        </div>
                        <div className={styles.bioCardBody}>
                          <h4 className={styles.bioCardName}>{person.name}</h4>
                          <p className={styles.bioCardYears}>{person.years}</p>
                          <p className={styles.bioCardTagline}>
                            {person.tagline}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}

      <div className={styles.ctaSection}>
        <h2>Join This Great Cloud of Witnesses</h2>
        <p>
          These faithful saints are not heroes because they were perfect — they
          are heroes because they believed in a perfect Savior. They point us
          not to themselves, but to Jesus Christ, the Author and Perfecter of
          our faith.
        </p>
        <p>
          <strong>
            What extraordinary work is God calling you to for His glory?
          </strong>
        </p>
      </div>
    </div>
  );
}
