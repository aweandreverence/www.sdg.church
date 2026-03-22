'use client';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCrown,
  faHeartCrack,
  faCross,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconName } from '@fortawesome/fontawesome-svg-core';
import styles from '@styles/common.module.scss';

library.add(faCrown, faHeartCrack, faCross, faRotateLeft);

interface GospelSectionCardProps {
  title: string;
  content: string;
  icon: string;
}

export function GospelSectionCard({
  title,
  content,
  icon,
}: GospelSectionCardProps) {
  return (
    <div className={styles.gospelSection}>
      <div className={styles.gospelIcon}>
        <FontAwesomeIcon icon={['fas', icon as IconName]} />
      </div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
