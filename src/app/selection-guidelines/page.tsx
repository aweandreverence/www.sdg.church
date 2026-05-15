import type { Metadata } from 'next';
import { buildTitle } from '@/lib/seo';
import styles from '@styles/common.module.scss';

export const metadata: Metadata = {
  title: buildTitle('Selection Guidelines'),
  description:
    'How sdg.church selects biographies and testimonies, and what inclusion or non-inclusion means.',
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5">
      <h2 className="h3 text-warning mb-3">{title}</h2>
      <div className="fs-5 lh-lg">{children}</div>
    </section>
  );
}

export default function SelectionGuidelinesPage() {
  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1>Selection Guidelines</h1>
        <p className={styles.headerSubtitle}>
          How we select biographies and testimonies — and what inclusion or
          non-inclusion means.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-9 col-xl-8">
          <div className="alert alert-warning bg-transparent border-warning text-light mb-5">
            <strong>Inclusion is editorial, not ultimate.</strong> We are not
            declaring final judgment on anyone&apos;s soul. We are making careful
            public-facing decisions about which lives best serve this site&apos;s
            evangelistic purpose.
          </div>

          <Section title="Our purpose">
            <p>
              sdg.church exists to glorify God by pointing people to Jesus
              Christ. The biographies are not a celebrity hall of fame or an
              encyclopedia of every admirable religious person. They are a
              curated cloud of witnesses: examples of sinners saved by grace
              whose lives, words, and work help readers see the beauty, truth,
              and power of the gospel.
            </p>
            <p>
              Our hope is that readers would not stop at admiring a featured
              person, but would ask: <em>Who is this Christ they trusted, loved,
              proclaimed, and served?</em>
            </p>
          </Section>

          <Section title="Our theological frame">
            <p>
              The site is written from a conservative, Reformed Protestant
              perspective. The name <em>Soli Deo Gloria</em> deliberately places
              the project within the Reformation tradition, with Scripture as
              God&apos;s authoritative Word and salvation by grace alone through
              faith alone in Christ alone.
            </p>
            <p>
              We are not narrowly denominational. We may include Baptists,
              Presbyterians, Anglicans, Methodists, Pentecostals,
              non-denominational evangelicals, and others where there is
              credible gospel clarity. But because this site has an evangelistic
              purpose, we do make theological and editorial judgments. Clarity
              about the gospel matters.
            </p>
          </Section>

          <Section title="What we look for">
            <p>
              The central question is: <strong>Does this person&apos;s life,
              words, and testimony help point readers to the saving work of
              Jesus Christ?</strong>
            </p>
            <ul>
              <li>Public profession of faith in Jesus Christ as Lord and Savior.</li>
              <li>Clear testimony of conversion, repentance, or trust in Christ.</li>
              <li>
                Writings, hymns, sermons, interviews, letters, or recorded
                statements that articulate gospel faith.
              </li>
              <li>Sustained fruit over time.</li>
              <li>Costly faithfulness, including martyrdom or persecution.</li>
            </ul>
            <p>
              We prefer primary sources where possible. The strongest evidence
              is usually a person&apos;s own words and the observable fruit of a
              life lived before God.
            </p>
          </Section>

          <Section title="What non-inclusion means">
            <p>
              Non-inclusion is <strong>not</strong> a declaration that a person
              is not saved. It is not a final judgment on their sincerity, their
              soul, or everything God may have done in their life.
            </p>
            <p>Non-inclusion simply means one or more of the following:</p>
            <ul>
              <li>we do not believe they fit this site&apos;s editorial purpose;</li>
              <li>
                we do not have enough clear evidence to present them as an
                evangelistic example;
              </li>
              <li>their public witness may create more confusion than clarity;</li>
              <li>
                or their theology, affiliation, public legacy, or unresolved
                scandal makes them unwise to feature.
              </li>
            </ul>
            <p>
              God knows his own. We are making editorial decisions for a public
              evangelistic project, not pretending to sit on the throne of final
              judgment.
            </p>
          </Section>

          <Section title="Rome, historical context, and gospel clarity">
            <p>
              Pre-Reformation Christians are evaluated differently because they
              lived before the later Protestant/Roman Catholic divide. We treat
              early and medieval Christians as part of the broad historical
              Christian inheritance while still evaluating their doctrine, life,
              and witness honestly.
            </p>
            <p>
              For post-Reformation Roman Catholics, we use a stricter
              public-site standard. Official Roman Catholic teaching,
              especially as articulated at Trent, contradicts the Reformation
              doctrine of justification by grace alone through faith alone in
              Christ alone. Because this site is evangelistic, we do not want to
              confuse unbelievers or immature believers about Rome or the
              gospel.
            </p>
            <p>
              Therefore, when a post-Reformation public figure is a practicing
              Roman Catholic, publicly endorses the Roman Catholic Church, or is
              publicly identified with Rome in a way that would confuse the
              site&apos;s witness, we ordinarily do not include them.
            </p>
            <p>
              This is not a claim that no Roman Catholic can be saved. It is an
              editorial decision about clarity, witness, and the purpose of this
              site.
            </p>
          </Section>

          <Section title="Living figures and removals">
            <p>
              Living figures require a higher bar because their story is still
              being written. We avoid using a fresh profession, baptism, or
              crisis conversion as immediate public validation, especially where
              unresolved scandal or controversy would make the person the story
              instead of Christ.
            </p>
            <p>
              The list is curated and revisable. We may remove or reclassify a
              person when new information emerges, when our standards become
              clearer, or when we conclude that an inclusion creates more
              confusion than clarity. When we remove someone, we aim to explain
              the decision as an editorial judgment, not as a condemnation of
              the person&apos;s soul.
            </p>
          </Section>

          <Section title="Our posture">
            <p>We aim to be:</p>
            <ul>
              <li>
                <strong>charitable</strong>, refusing to write people off
                casually;
              </li>
              <li>
                <strong>clear</strong>, refusing to blur the gospel for the sake
                of a larger roster;
              </li>
              <li>
                <strong>honest</strong>, acknowledging complexity, weakness,
                sin, and historical context;
              </li>
              <li>
                <strong>courageous</strong>, standing by editorial decisions
                once they are made carefully;
              </li>
              <li>
                <strong>Christ-centered</strong>, ensuring every story points
                beyond the person to Jesus.
              </li>
            </ul>
          </Section>

          <div className={styles.ctaSection}>
            <h2>Why This Matters</h2>
            <p>
              The goal is not to maximize the number of names on the site. The
              goal is to serve readers with a faithful, reverent, and
              gospel-clear witness — <em>Soli Deo Gloria</em>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
