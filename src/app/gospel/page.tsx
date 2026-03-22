import type { Metadata } from 'next';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCrown,
  faHeartCrack,
  faCross,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { getGospelSections } from '@/lib/data';
import { buildTitle } from '@/lib/seo';
import { GospelSectionCard } from '@/components/GospelSectionCard';
import styles from '@styles/common.module.scss';

library.add(faCrown, faHeartCrack, faCross, faRotateLeft);

export const metadata: Metadata = {
  title: buildTitle('The Gospel'),
  description:
    'The gospel of Jesus Christ explained clearly — God is holy, we are sinful, Christ is the Savior, repent and believe.',
};

export default function GospelPage() {
  const sections = getGospelSections();

  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1>The Gospel</h1>
        <p>
          The most important message you will ever hear.
        </p>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {sections.map((section, index) => (
            <GospelSectionCard
              key={index}
              title={section.title}
              content={section.content}
              icon={section.icon}
            />
          ))}
        </div>
      </div>
      <div className={styles.ctaSection}>
        <h2>Will You Turn to Christ?</h2>
        <p>
          If God is drawing your heart, don&apos;t resist. Turn from your sin
          and trust in Jesus today.
        </p>
      </div>
    </div>
  );
}
