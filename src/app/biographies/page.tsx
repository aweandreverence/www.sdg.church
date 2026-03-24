import type { Metadata } from 'next';
import { buildTitle } from '@/lib/seo';
import styles from '@styles/common.module.scss';
import biographiesData from '@/../../data/notable-christians.json';

export const metadata: Metadata = {
  title: buildTitle('Biographies of Faithful Saints'),
  description:
    'Biographies of faithful Christians throughout history who glorified God through extraordinary works — from composers and scientists to missionaries and reformers.',
};

interface Person {
  name: string;
  years: string;
  title: string;
  bio: string;
  faith: string;
  videos?: Array<{
    title: string;
    url: string;
    platform: string;
    note?: string;
  }>;
  sources?: Array<{
    type: string;
    title: string;
    url?: string;
    note?: string;
  }>;
}

interface Subcategory {
  id: string;
  name: string;
  people: Person[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  subcategories: Subcategory[];
}

export default function BiographiesPage() {
  const data = biographiesData as { categories: Category[]; lastUpdated: string };

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

      <div className="row justify-content-center">
        <div className="col-lg-10">
          {data.categories.map((category) => (
            <section key={category.id} className={styles.movementSection}>
              <h2 className={styles.movementTitle}>{category.name}</h2>
              <p className={styles.commentary}>{category.description}</p>

              {category.subcategories.map((subcategory) => (
                <div key={subcategory.id} className={styles.subcategorySection}>
                  <h3 className={styles.subcategoryTitle}>
                    {subcategory.name}
                  </h3>

                  <div className={styles.peopleGrid}>
                    {subcategory.people.map((person) => (
                      <div key={person.name} className={styles.personCard}>
                        <div className={styles.personHeader}>
                          <h4 className={styles.personName}>{person.name}</h4>
                          <p className={styles.personYears}>{person.years}</p>
                          <p className={styles.personTitle}>{person.title}</p>
                        </div>

                        <div className={styles.personContent}>
                          <p className={styles.personBio}>{person.bio}</p>

                          <div className={styles.faithSection}>
                            <h5 className={styles.faithTitle}>Faith</h5>
                            <p className={styles.faithDescription}>
                              {person.faith}
                            </p>
                          </div>

                          {person.sources && person.sources.length > 0 && (
                            <div className={styles.sourcesSection}>
                              <h6 className={styles.sourcesTitle}>Sources</h6>
                              <ul className={styles.sourcesList}>
                                {person.sources.slice(0, 3).map((source, index) => (
                                  <li key={index} className={styles.sourceItem}>
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
                            </div>
                          )}
                        </div>
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
              These faithful saints are not heroes because they were perfect —
              they are heroes because they believed in a perfect Savior. They
              point us not to themselves, but to Jesus Christ, the Author and
              Perfecter of our faith.
            </p>
            <p>
              <strong>
                What extraordinary work is God calling you to for His glory?
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}