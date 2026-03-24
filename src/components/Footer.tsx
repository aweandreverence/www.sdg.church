'use client';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebookF,
  faTwitter,
  fab,
} from '@fortawesome/free-brands-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CURRENT_YEAR, YEAR_CREATED } from '@/constants/date';
import styles from '@styles/footer.module.scss';

library.add(fab, faFacebookF, faTwitter, faMusic);

export function Footer() {
  const yearRange =
    YEAR_CREATED !== CURRENT_YEAR
      ? `${YEAR_CREATED} - ${CURRENT_YEAR}`
      : String(YEAR_CREATED);

  return (
    <footer className="border-top py-5 mt-3 bg-dark text-light">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>&copy; Awe and Reverence {yearRange}</div>
          <div className={styles.sdgFooter}>
            <FontAwesomeIcon icon={faMusic} className={styles.musicNote} />
            <span>
              <em>Soli Deo Gloria</em>
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <a
              href="https://awesome.bible"
              title="Awesome.Bible"
              target="_blank"
              rel="noopener noreferrer"
              className="link-light"
            >
              Awesome.Bible
            </a>
            <a
              href="https://www.facebook.com/AweAndReverence"
              title="Awe & Reverence on Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="link-light"
            >
              <div className={styles.facebook}>
                <FontAwesomeIcon icon={['fab', 'facebook-f']} />
              </div>
            </a>
            <a
              href="https://twitter.com/aweandreverence"
              title="Awe & Reverence on Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="link-light"
            >
              <div className={styles.twitter}>
                <FontAwesomeIcon icon={['fab', 'twitter']} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
