import type { Metadata } from 'next';
import { BibleRef } from '@/components/BibleRef';
import { buildTitle } from '@/lib/seo';
import styles from '@styles/common.module.scss';

export const metadata: Metadata = {
  title: buildTitle('A Call to Repentance'),
  description:
    'The urgency of the gospel — why today is the day of salvation. From the free gift of grace to the cost of discipleship.',
};

export default function RepentancePage() {
  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1>A Call to Repentance</h1>
        <p className={styles.headerSubtitle}>
          &ldquo;Behold, now is the acceptable time; behold, now is the day of
          salvation.&rdquo;
          <br />
          <BibleRef reference="2 Corinthians 6:2" className={styles.refLink} />
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* ── Movement I: The Urgency ── */}
          <section className={styles.movementSection}>
            <h2 className={styles.movementTitle}>
              <span className={styles.movementLabel}>Movement I</span>
              The Urgency
            </h2>

            <div className={styles.passageBlock}>
              <h3>While It Is Still Day</h3>
              <blockquote className={styles.scriptureQuote}>
                &ldquo;We must work the works of Him who sent Me as long as it
                is day; night is coming when no one can work.&rdquo;
              </blockquote>
              <p className={styles.passageRef}>
                — <BibleRef reference="John 9:4" />
              </p>
              <p className={styles.commentary}>
                Jesus spoke with urgency. The window of opportunity is open
                now — but it will not remain open forever. Today, while you
                can still hear His voice, is the day to respond.
              </p>
            </div>

            <div className={styles.passageBlock}>
              <h3>The Axe Is Already Laid</h3>
              <blockquote className={styles.scriptureQuote}>
                &ldquo;The axe is already laid at the root of the trees;
                therefore every tree that does not bear good fruit is being cut
                down and thrown into the fire.&rdquo;
              </blockquote>
              <p className={styles.passageRef}>
                — <BibleRef reference="Matthew 3:10" />
              </p>
              <p className={styles.commentary}>
                John the Baptist proclaimed this warning to prepare the way for
                Christ. Judgment is not a distant abstraction — it is imminent,
                real, and certain.
              </p>
            </div>

            <div className={styles.passageBlock}>
              <h3>The Rich Man and Lazarus</h3>
              <p className={styles.commentary}>
                In{' '}
                <BibleRef reference="Luke 16:19-31" />,
                Jesus tells of a rich man who lived in luxury while a beggar
                named Lazarus lay at his gate. Both died. Lazarus was carried to
                Abraham&apos;s side; the rich man found himself in torment. From
                that place of anguish, the rich man begged Abraham to send
                Lazarus to warn his five brothers — so they would not also come
                to that place of torment.
              </p>
              <blockquote className={styles.scriptureQuote}>
                &ldquo;Abraham said to him, &lsquo;They have Moses and the
                Prophets; let them hear them.&rsquo; But he said, &lsquo;No,
                father Abraham, but if someone goes to them from the dead, they
                will repent!&rsquo; But he said to him, &lsquo;If they do not
                listen to Moses and the Prophets, they will not be persuaded
                even if someone rises from the dead.&rsquo;&rdquo;
              </blockquote>
              <p className={styles.passageRef}>
                — <BibleRef reference="Luke 16:29-31" />
              </p>
              <p className={styles.commentary}>
                There are no second chances after death. There is no crossing
                over from one side to the other. The time to repent is now —
                while you are alive, while you can still hear, while the Word
                of God is before you.
              </p>
            </div>
          </section>

          {/* ── Movement II: The Free Gift ── */}
          <section className={styles.movementSection}>
            <h2 className={styles.movementTitle}>
              <span className={styles.movementLabel}>Movement II</span>
              The Free Gift
            </h2>

            <div className={styles.passageBlock}>
              <blockquote className={styles.scriptureQuote}>
                &ldquo;For by grace you have been saved through faith; and this
                is not of yourselves, it is the gift of God; not as a result of
                works, so that no one may boast.&rdquo;
              </blockquote>
              <p className={styles.passageRef}>
                — <BibleRef reference="Ephesians 2:8-9" />
              </p>
            </div>

            <div className={styles.passageBlock}>
              <blockquote className={styles.scriptureQuote}>
                &ldquo;For the wages of sin is death, but the free gift of God
                is eternal life in Christ Jesus our Lord.&rdquo;
              </blockquote>
              <p className={styles.passageRef}>
                — <BibleRef reference="Romans 6:23" />
              </p>
            </div>

            <p className={styles.commentary}>
              Salvation cannot be earned. It is not a reward for the
              righteous — it is a rescue for the helpless. God offers
              forgiveness freely to all who will receive it by faith. This is
              the stunning generosity of the gospel: while we were still
              sinners, Christ died for us (
              <BibleRef reference="Romans 5:8" />
              ).
            </p>
          </section>

          {/* ── Movement III: The Cost ── */}
          <section className={styles.movementSection}>
            <h2 className={styles.movementTitle}>
              <span className={styles.movementLabel}>Movement III</span>
              The Cost
            </h2>

            <p className={styles.commentary}>
              Salvation is free — but following Jesus will cost you
              everything. These are not contradictory truths; they are the
              same truth seen from two sides. Grace is free because Christ
              paid the price. But to receive Him is to surrender all.
            </p>

            <div className={styles.passageBlock}>
              <blockquote className={styles.scriptureQuote}>
                &ldquo;For whoever wishes to save his life will lose it, but
                whoever loses his life for My sake and the gospel&apos;s will
                save it.&rdquo;
              </blockquote>
              <p className={styles.passageRef}>
                — <BibleRef reference="Mark 8:35" />
              </p>
            </div>

            <div className={styles.passageBlock}>
              <blockquote className={styles.scriptureQuote}>
                &ldquo;So then, none of you can be My disciple who does not
                give up all his own possessions.&rdquo;
              </blockquote>
              <p className={styles.passageRef}>
                — <BibleRef reference="Luke 14:33" />
              </p>
            </div>

            <div className={styles.passageBlock}>
              <blockquote className={styles.scriptureQuote}>
                &ldquo;Not everyone who says to Me, &lsquo;Lord,
                Lord,&rsquo; will enter the kingdom of heaven, but the one who
                does the will of My Father who is in heaven will enter.&rdquo;
              </blockquote>
              <p className={styles.passageRef}>
                — <BibleRef reference="Matthew 7:21" />
              </p>
            </div>
          </section>

          {/* ── Movement IV: Lordship & Obedience ── */}
          <section className={styles.movementSection}>
            <h2 className={styles.movementTitle}>
              <span className={styles.movementLabel}>Movement IV</span>
              Lordship &amp; Obedience
            </h2>

            <p className={styles.commentary}>
              To confess Jesus as Lord is not merely to speak words — it is to
              submit your whole life to His authority. True faith bears fruit.
              True love obeys.
            </p>

            <div className={styles.passageBlock}>
              <blockquote className={styles.scriptureQuote}>
                &ldquo;If you confess with your mouth Jesus as Lord, and
                believe in your heart that God raised Him from the dead, you
                will be saved.&rdquo;
              </blockquote>
              <p className={styles.passageRef}>
                — <BibleRef reference="Romans 10:9" />
              </p>
            </div>

            <div className={styles.passageBlock}>
              <blockquote className={styles.scriptureQuote}>
                &ldquo;Even so faith, if it has no works, is dead, being by
                itself.&rdquo;
              </blockquote>
              <p className={styles.passageRef}>
                — <BibleRef reference="James 2:17" />
              </p>
            </div>

            <div className={styles.passageBlock}>
              <blockquote className={styles.scriptureQuote}>
                &ldquo;If you love Me, you will keep My
                commandments.&rdquo;
              </blockquote>
              <p className={styles.passageRef}>
                — <BibleRef reference="John 14:15" />
              </p>
            </div>

            <p className={styles.commentary}>
              This is the whole of the Christian life: to know Christ, to love
              Him, and to obey Him — not perfectly, but genuinely, growing in
              grace and holiness by the power of the Holy Spirit. The God who
              saves you is the God who keeps you, transforms you, and will
              one day present you blameless before His throne with great joy
              (<BibleRef reference="Jude 1:24" />).
            </p>
          </section>

          {/* ── Finale ── */}
          <div className={styles.ctaSection}>
            <h2>Will You Come?</h2>
            <blockquote className={styles.scriptureQuote}>
              &ldquo;Come to Me, all who are weary and burdened, and I will
              give you rest. Take My yoke upon you and learn from Me, for I am
              gentle and humble in heart, and you will find rest for your
              souls.&rdquo;
            </blockquote>
            <p className={styles.passageRef}>
              — <BibleRef reference="Matthew 11:28-29" />
            </p>
            <p>
              If you hear His voice today, do not harden your heart. Turn
              from your sin. Trust in Jesus Christ — the One who lived the
              life you could not live, died the death you deserved, and rose
              again so that you might have life eternal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
