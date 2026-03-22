import styles from '@styles/common.module.scss';

interface ScriptureCardProps {
  reference: string;
  text: string;
  theme: string;
}

export function ScriptureCard({ reference, text, theme }: ScriptureCardProps) {
  return (
    <div className={`card ${styles.scriptureCard}`}>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p className={styles.scriptureText}>&ldquo;{text}&rdquo;</p>
          <footer className="blockquote-footer mt-2">
            <cite title={reference}>{reference}</cite>
            <span className="badge bg-secondary ms-2">{theme}</span>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
