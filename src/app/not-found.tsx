import Link from 'next/link';
import styles from '@styles/common.module.scss';

export default function NotFound() {
  return (
    <div className={styles.pageHeader}>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className={styles.ctaButton}>
        Go Home
      </Link>
    </div>
  );
}
