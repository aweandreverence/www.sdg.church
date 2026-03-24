'use client';

import styles from '@styles/common.module.scss';

interface LegendSubcategory {
  id: string;
  name: string;
  count: number;
}

interface LegendCategory {
  id: string;
  name: string;
  description: string;
  subcategories: LegendSubcategory[];
}

// Map subcategory names to discipline icons
const DISCIPLINE_ICONS: Record<string, string> = {
  'Composers & Musicians': '🎵',
  'Authors & Poets': '✍️',
  Scientists: '🔬',
  Mathematicians: '📐',
  'Artists & Architects': '🎨',
  'Reformers & Theologians': '⛪',
  'Pastors & Missionaries': '✝️',
  Athletes: '🏅',
  'Musicians & Entertainers': '🎤',
  'Actors & Entertainers': '🎬',
  'Technology & Business Leaders': '💼',
  'Scientists & Academics': '🧬',
  'Military Leaders': '⚔️',
  'Politicians & Public Servants': '🏛️',
};

function getIcon(subcategoryName: string): string {
  return DISCIPLINE_ICONS[subcategoryName] ?? '📖';
}

export default function BiographyLegend({
  categories,
}: {
  categories: LegendCategory[];
}) {
  const totalPeople = categories.reduce(
    (sum, cat) =>
      sum + cat.subcategories.reduce((s, sub) => s + sub.count, 0),
    0
  );

  return (
    <div className={styles.legendContainer}>
      <div className={styles.legendHeader}>
        <h2 className={styles.legendTitle}>Fields &amp; Disciplines</h2>
        <span className={styles.legendTotal}>{totalPeople} saints</span>
      </div>

      <div className={styles.legendGrid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.legendCategoryCard}>
            <h3 className={styles.legendCategoryName}>{category.name}</h3>
            <p className={styles.legendCategoryDesc}>{category.description}</p>

            <div className={styles.legendSubcategories}>
              {category.subcategories.map((sub) => (
                <a
                  key={sub.id}
                  href={`#${sub.id}`}
                  className={styles.legendChip}
                  title={`Jump to ${sub.name}`}
                >
                  <span className={styles.legendChipIcon}>
                    {getIcon(sub.name)}
                  </span>
                  <span className={styles.legendChipName}>{sub.name}</span>
                  <span className={styles.legendChipCount}>{sub.count}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
