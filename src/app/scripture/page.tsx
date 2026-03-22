import type { Metadata } from 'next';
import { getScriptures, getScriptureThemes } from '@/lib/data';
import { ScriptureCard } from '@/components/ScriptureCard';
import { buildTitle } from '@/lib/seo';
import styles from '@styles/common.module.scss';

export const metadata: Metadata = {
  title: buildTitle('Scripture'),
  description:
    'Bible passages about the gospel, salvation, repentance, and the grace of God. Let the Word of God speak to your heart.',
};

export default function ScripturePage() {
  const scriptures = getScriptures();
  const themes = getScriptureThemes();

  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1>Scripture</h1>
        <p>
          Let the Word of God speak to your heart.
        </p>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {themes.map((theme) => (
            <div key={theme} className="mb-4">
              <h3
                className="text-capitalize mb-3"
                style={{ color: '#c9a84c' }}
              >
                {theme}
              </h3>
              {scriptures
                .filter((s) => s.theme === theme)
                .map((s) => (
                  <ScriptureCard
                    key={s.reference}
                    reference={s.reference}
                    text={s.text}
                    theme={s.theme}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
