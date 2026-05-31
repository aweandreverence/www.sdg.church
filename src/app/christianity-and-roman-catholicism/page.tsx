import type { Metadata } from 'next';
import Link from 'next/link';
import { buildTitle } from '@/lib/seo';
import styles from '@styles/common.module.scss';

export const metadata: Metadata = {
  title: buildTitle('Roman Catholicism and the Gospel'),
  description:
    'A scholarly, non-combative Protestant explanation of shared Christian claims and decisive differences with Roman Catholicism.',
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

export default function RomanCatholicismAndGospelPage() {
  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1>Roman Catholicism and the Gospel</h1>
        <p className={styles.headerSubtitle}>
          Shared Christian claims, decisive Protestant concerns, and an
          invitation to rest in Christ.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-9 col-xl-8">
          <div className="alert alert-warning bg-transparent border-warning text-light mb-5">
            <strong>This page is not written to score tribal points.</strong>{' '}
            It is written for readers who want a fair, clear, biblical
            explanation of where Roman Catholicism and evangelical Protestant
            Christianity overlap, where they differ, and why those differences
            matter for assurance and salvation.
          </div>

          <Section title="Why talk about this?">
            <p>
              Many people first encounter Christianity through family,
              culture, art, school, sports, literature, or public figures who
              identify as Roman Catholic. Others have Catholic relatives,
              coworkers, or friends whom they love. A faithful evangelistic site
              should not pretend those connections do not exist.
            </p>
            <p>
              Our goal is not to erase Catholic people from the conversation.
              Our goal is to speak about them accurately, honor what can be
              honored, and then point readers beyond every human tradition to
              Jesus Christ and his finished work.
            </p>
          </Section>

          <Section title="Important shared claims">
            <p>
              Protestants and Roman Catholics share several major claims of
              historic Christianity, including belief in:
            </p>
            <ul>
              <li>one God who is Father, Son, and Holy Spirit;</li>
              <li>Jesus Christ as truly God and truly man;</li>
              <li>Christ&apos;s death, bodily resurrection, and future return;</li>
              <li>the seriousness of sin and the need for grace;</li>
              <li>Scripture as sacred and authoritative;</li>
              <li>ancient Christian creeds such as the Apostles&apos; Creed and Nicene Creed;</li>
              <li>prayer, worship, baptism, and moral discipleship.</li>
            </ul>
            <p>
              Because of these shared claims, many conversations with Catholics
              should begin with respect, careful listening, and the person of
              Christ — not caricature.
            </p>
          </Section>

          <Section title="Decisive Protestant concerns">
            <p>
              The Reformation was not mainly an argument about style, culture,
              or which Christians were more sincere. It was about the gospel:
              how sinners are made right with God, where final authority rests,
              and whether the conscience can have peace because Christ&apos;s work
              is finished and sufficient.
            </p>
            <ul>
              <li>
                <strong>Authority:</strong> Is Scripture the final authority for
                doctrine, or does final authority rest in Scripture together
                with church tradition and the Roman magisterium?
              </li>
              <li>
                <strong>Justification:</strong> Are sinners declared righteous
                before God by faith alone because of Christ alone, or is
                justification understood through an infused-righteousness system
                involving sacraments, cooperation, and merit?
              </li>
              <li>
                <strong>Assurance:</strong> May believers rest now in Christ&apos;s
                finished work, or is assurance functionally mediated through an
                ongoing sacramental and penitential system?
              </li>
              <li>
                <strong>Mediation:</strong> Is Christ the one mediator between
                God and man, or are Mary, the saints, priests, indulgences, and
                the treasury of merit given roles that obscure Christ&apos;s unique
                sufficiency?
              </li>
              <li>
                <strong>The church:</strong> Is the church finally under Christ
                speaking through his Word, or under the claims of the bishop of
                Rome as visible head of the church?
              </li>
            </ul>
          </Section>

          <Section title="The central biblical question">
            <p>
              The question is not whether Catholics can be kind, sincere,
              courageous, culturally Christian, or deeply religious. Many are.
              The central question is: <strong>Where is your confidence before
              God?</strong>
            </p>
            <p>
              The Protestant concern is that Rome&apos;s official system directs
              sinners toward Christ plus sacramental merit, penance, priestly
              mediation, Marian devotion, and the authority of the church. The
              biblical gospel calls sinners to rest in Christ himself — his
              perfect life, atoning death, bodily resurrection, and sufficient
              intercession.
            </p>
            <p>
              “Therefore, having been justified by faith, we have peace with God
              through our Lord Jesus Christ” (Romans 5:1). “For by grace you
              have been saved through faith; and this is not of yourselves, it is
              the gift of God; not a result of works, so that no one may boast”
              (Ephesians 2:8-9).
            </p>
          </Section>

          <Section title="What about famous Catholics?">
            <p>
              Some famous Catholics have produced beautiful art, literature,
              music, service, athletic excellence, courage, or moral reflection.
              It is possible to discuss those people on this site without
              presenting them as uncomplicated examples of gospel clarity.
            </p>
            <p>
              When a figure is important for search, cultural literacy, or
              evangelistic connection — for example a major writer, athlete,
              artist, or public figure — we may create a contextual article that
              explains both appreciation and disagreement. Such an article is
              different from a featured biography. It can say, in effect:{' '}
              <em>
                here is why this person matters, here is how their Catholic
                belief shaped them, here is where Protestant biblical
                Christianity agrees and differs, and here is why Christ&apos;s
                finished work is the reader&apos;s true hope.
              </em>
            </p>
          </Section>

          <Section title="How to speak with Catholic friends">
            <p>
              The most useful conversations usually begin with Christ, not with
              winning an argument. Good questions include:
            </p>
            <ul>
              <li>Where does your assurance before God come from?</li>
              <li>Is Christ&apos;s finished work enough to save you completely?</li>
              <li>Can you know now that your sins are forgiven?</li>
              <li>What does Scripture say about grace, faith, merit, and peace with God?</li>
              <li>What is the difference between trusting Christ and trusting Christ plus a religious system?</li>
            </ul>
            <p>
              We want Catholic readers to hear a genuine invitation, not a sneer:
              come directly to Jesus Christ. He is a sufficient Savior.
            </p>
          </Section>

          <div className={styles.ctaSection}>
            <h2>Come to Christ</h2>
            <p>
              The gospel is not that the right religious institution can make
              you acceptable to God. The gospel is that Jesus Christ saves
              sinners by grace. Turn from sin, trust him, and rest in his
              finished work.
            </p>
            <Link href="/gospel" className={styles.ctaButton}>
              Read the Gospel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
