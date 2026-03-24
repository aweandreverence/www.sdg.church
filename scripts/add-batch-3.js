#!/usr/bin/env node
/**
 * Batch 3: Add martyrs, puritans, theologians, inventors, philanthropists, converts
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'notable-christians.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Helper to find a category by id
function findCategory(id) {
  return data.categories.find(c => c.id === id);
}

// Helper to find or create a subcategory
function findOrCreateSubcategory(category, subId, subName) {
  let sub = category.subcategories.find(s => s.id === subId);
  if (!sub) {
    sub = { id: subId, name: subName, people: [] };
    category.subcategories.push(sub);
  }
  return sub;
}

// Helper to add a person (skip if slug already exists)
function addPerson(sub, person) {
  const allSlugs = new Set();
  data.categories.forEach(c => c.subcategories.forEach(s => s.people.forEach(p => allSlugs.add(p.slug))));
  if (allSlugs.has(person.slug)) {
    console.log(`  SKIP (exists): ${person.name}`);
    return;
  }
  sub.people.push(person);
  console.log(`  ADDED: ${person.name}`);
}

function makePerson({ name, years, title, bio, faith, slug, tagline, videos = [], sources = [] }) {
  return { name, years, title, bio, faith, videos, sources, slug, tagline, image: '', imageAttribution: { source: '', license: '' } };
}

function wikiSource(name, url, note) {
  return { type: 'wikipedia', title: `${name} — Wikipedia`, url, note };
}

// ============================================================
// 1. NEW CATEGORY: Martyrs & Witnesses
// ============================================================
const martyrsCat = {
  id: 'martyrs-witnesses',
  name: 'Martyrs & Witnesses',
  description: 'Those who gave their lives for the faith — from the early church through the Reformation.',
  subcategories: []
};
data.categories.splice(0, 0, martyrsCat); // insert at beginning

// Early Church Martyrs
const earlyMartyrs = findOrCreateSubcategory(martyrsCat, 'early-church-martyrs', 'Early Church Martyrs');

addPerson(earlyMartyrs, makePerson({
  name: 'Vibia Perpetua',
  years: 'c. 181 – March 7, 203',
  title: 'Early Church Martyr',
  bio: 'Young noblewoman of Carthage martyred in the arena at age 22. Her diary, The Passion of Perpetua and Felicity, is one of the earliest Christian writings by a woman.',
  faith: "When her father begged her to recant, she pointed to a water vessel and asked, 'Can you call a vase by any other name? Then I cannot be called by any other name than a Christian.' She went to her death with extraordinary courage.",
  slug: 'vibia-perpetua',
  tagline: 'I cannot be called by any other name than a Christian',
  sources: [wikiSource('Perpetua', 'https://en.wikipedia.org/wiki/Perpetua_and_Felicity', 'Account of the early church martyrs of Carthage')]
}));

addPerson(earlyMartyrs, makePerson({
  name: 'Felicity of Carthage',
  years: 'died March 7, 203',
  title: 'Early Church Martyr',
  bio: 'A slave and companion of Perpetua, martyred together in the Carthage arena. She gave birth in prison just days before her execution and refused to deny Christ.',
  faith: 'When mocked for crying out in labor pain, Felicity replied that in the arena, Christ would suffer in her. Her courage alongside Perpetua has inspired Christians for nearly two millennia.',
  slug: 'felicity-of-carthage',
  tagline: 'In the arena, another will be in me who will suffer for me',
  sources: [wikiSource('Felicity', 'https://en.wikipedia.org/wiki/Perpetua_and_Felicity', 'Companion of Perpetua, martyred in Carthage')]
}));

addPerson(earlyMartyrs, makePerson({
  name: 'Polycarp of Smyrna',
  years: 'c. 69 – February 23, 155',
  title: 'Bishop of Smyrna & Martyr',
  bio: "Bishop of Smyrna and a direct disciple of the Apostle John. One of the earliest post-apostolic church fathers, he was burned at the stake at age 86 for refusing to worship the Roman emperor.",
  faith: "When commanded to curse Christ, Polycarp declared: '86 years I have served Him, and He has done me no wrong. How can I blaspheme my King who saved me?' His martyrdom account is one of the earliest outside Scripture.",
  slug: 'polycarp-of-smyrna',
  tagline: '86 years I have served Him, and He has done me no wrong',
  sources: [wikiSource('Polycarp', 'https://en.wikipedia.org/wiki/Polycarp', 'Disciple of Apostle John, Bishop of Smyrna')]
}));

addPerson(earlyMartyrs, makePerson({
  name: 'Ignatius of Antioch',
  years: 'c. 35 – c. 108',
  title: 'Bishop of Antioch & Martyr',
  bio: 'Third bishop of Antioch and early church father. Condemned to die in Rome, he was fed to wild beasts in the Colosseum. Wrote seven profound letters to churches while en route to his execution.',
  faith: "Ignatius eagerly embraced martyrdom, writing: 'I am God's wheat, ground fine by the lion's teeth to be made purest bread for Christ.' His letters emphasize church unity, the Eucharist, and the reality of Christ's incarnation.",
  slug: 'ignatius-of-antioch',
  tagline: "I am God's wheat, ground fine by the lion's teeth",
  sources: [wikiSource('Ignatius', 'https://en.wikipedia.org/wiki/Ignatius_of_Antioch', 'Early church father and martyr')]
}));

// Reformation Martyrs
const refMartyrs = findOrCreateSubcategory(martyrsCat, 'reformation-martyrs', 'Reformation Martyrs');

addPerson(refMartyrs, makePerson({
  name: 'Jan Hus',
  years: 'c. 1372 – July 6, 1415',
  title: 'Bohemian Reformer & Martyr',
  bio: 'Czech priest and reformer who challenged church corruption a century before Luther. Burned at the stake at the Council of Constance after refusing to recant his teachings.',
  faith: "Hus preached Scripture's authority over papal decrees and championed preaching in the common tongue. His followers, the Hussites, became forerunners of the Protestant Reformation. He reportedly said at his burning, 'You may roast this goose, but a swan will come whom you will not silence.'",
  slug: 'jan-hus',
  tagline: 'A forerunner of the Reformation, burned for the truth',
  sources: [wikiSource('Jan Hus', 'https://en.wikipedia.org/wiki/Jan_Hus', 'Pre-Reformation Czech reformer')]
}));

addPerson(refMartyrs, makePerson({
  name: 'William Tyndale',
  years: 'c. 1494 – October 6, 1536',
  title: 'Bible Translator & Martyr',
  bio: "English scholar who first translated the Bible into English from the original Hebrew and Greek. Strangled and burned at the stake in Belgium for heresy.",
  faith: "Tyndale's dying prayer was 'Lord, open the King of England's eyes.' Within four years, Henry VIII authorized an English Bible based largely on Tyndale's translation. About 84% of his New Testament survives in the King James Version.",
  slug: 'william-tyndale',
  tagline: 'Lord, open the King of England\'s eyes',
  sources: [wikiSource('Tyndale', 'https://en.wikipedia.org/wiki/William_Tyndale', 'Father of the English Bible')]
}));

addPerson(refMartyrs, makePerson({
  name: 'Hugh Latimer',
  years: 'c. 1487 – October 16, 1555',
  title: 'Bishop & Reformation Martyr',
  bio: 'English Protestant bishop who became one of the leading preachers of the English Reformation. Burned at the stake in Oxford alongside Nicholas Ridley under Queen Mary I.',
  faith: "As the flames were lit, Latimer spoke to Ridley: 'Be of good comfort, Master Ridley, and play the man! We shall this day light such a candle, by God's grace, in England, as I trust shall never be put out.' His words have echoed through centuries.",
  slug: 'hugh-latimer',
  tagline: 'We shall this day light such a candle as shall never be put out',
  sources: [wikiSource('Latimer', 'https://en.wikipedia.org/wiki/Hugh_Latimer', 'English Reformation martyr')]
}));

addPerson(refMartyrs, makePerson({
  name: 'Nicholas Ridley',
  years: 'c. 1500 – October 16, 1555',
  title: 'Bishop of London & Reformation Martyr',
  bio: 'Bishop of London who helped shape the theological foundations of the Church of England. Burned at the stake alongside Hugh Latimer in Oxford.',
  faith: "Ridley's scholarly work helped define Anglican theology, particularly regarding the Lord's Supper. He chose death over recanting his Protestant convictions, demonstrating that his faith was no mere intellectual exercise but a matter of eternal truth.",
  slug: 'nicholas-ridley',
  tagline: 'Chose the flames over denying the truth',
  sources: [wikiSource('Ridley', 'https://en.wikipedia.org/wiki/Nicholas_Ridley_(martyr)', 'Bishop of London, burned with Latimer')]
}));

// ============================================================
// 2. ADD TO Reformers & Theologians
// ============================================================
const historicalCat = findCategory('historical-biographies');
const reformers = historicalCat.subcategories.find(s => s.id === 'reformers-theologians');

addPerson(reformers, makePerson({
  name: 'John Wycliffe',
  years: 'c. 1328 – December 31, 1384',
  title: 'Theologian & Proto-Reformer',
  bio: "English theologian and professor at Oxford, known as the 'Morning Star of the Reformation.' He produced one of the first complete English translations of the Bible and challenged papal authority.",
  faith: "Wycliffe taught that Scripture alone is the supreme authority for Christian life and doctrine — anticipating sola scriptura by 150 years. He trained lay preachers (Lollards) to spread the gospel in common English. The church declared him a heretic posthumously and exhumed his bones to burn them.",
  slug: 'john-wycliffe',
  tagline: 'The Morning Star of the Reformation',
  sources: [wikiSource('Wycliffe', 'https://en.wikipedia.org/wiki/John_Wycliffe', 'Proto-Reformer and Bible translator')]
}));

addPerson(reformers, makePerson({
  name: 'Thomas Aquinas',
  years: 'January 28, 1225 – March 7, 1274',
  title: 'Theologian & Philosopher',
  bio: "Italian Dominican friar and the most influential medieval theologian. His Summa Theologica remains one of the greatest works of systematic theology ever written, synthesizing Aristotelian philosophy with Christian doctrine.",
  faith: "Aquinas devoted his entire life to understanding and articulating the Christian faith through reason and revelation. Near the end of his life, after a mystical experience during Mass, he stopped writing, saying: 'All that I have written seems like straw compared to what has been revealed to me.'",
  slug: 'thomas-aquinas',
  tagline: 'All I have written seems like straw compared to what has been revealed',
  sources: [wikiSource('Aquinas', 'https://en.wikipedia.org/wiki/Thomas_Aquinas', 'Greatest medieval theologian')]
}));

addPerson(reformers, makePerson({
  name: 'Athanasius of Alexandria',
  years: 'c. 296 – May 2, 373',
  title: 'Church Father & Defender of Trinitarian Doctrine',
  bio: "Bishop of Alexandria who spent most of his life fighting Arianism — the heresy that Christ was a created being. Exiled five times by four different emperors for his unwavering defense of Christ's full divinity.",
  faith: "Athanasius stood virtually alone against the world (Athanasius contra mundum) in defending the Nicene Creed and the full deity of Christ. His work On the Incarnation remains a classic of Christian theology. C.S. Lewis wrote the introduction to a modern translation.",
  slug: 'athanasius-of-alexandria',
  tagline: 'Athanasius contra mundum — Athanasius against the world',
  sources: [wikiSource('Athanasius', 'https://en.wikipedia.org/wiki/Athanasius_of_Alexandria', 'Defender of Trinitarian orthodoxy')]
}));

addPerson(reformers, makePerson({
  name: 'John Knox',
  years: 'c. 1514 – November 24, 1572',
  title: 'Scottish Reformer',
  bio: "Scottish clergyman who led the Protestant Reformation in Scotland and founded the Presbyterian Church. His fiery preaching transformed an entire nation's religious landscape.",
  faith: "Knox prayed, 'Give me Scotland, or I die!' His zeal for Reformed worship and church governance shaped Scottish Christianity for centuries. Mary Queen of Scots reportedly said she feared Knox's prayers more than all the armies of England.",
  slug: 'john-knox',
  tagline: 'Give me Scotland, or I die!',
  sources: [wikiSource('Knox', 'https://en.wikipedia.org/wiki/John_Knox', 'Founder of Scottish Presbyterianism')]
}));

addPerson(reformers, makePerson({
  name: 'Abraham Kuyper',
  years: 'October 29, 1837 – November 8, 1920',
  title: 'Theologian, Statesman & Prime Minister',
  bio: "Dutch Reformed theologian who served as Prime Minister of the Netherlands (1901–1905). Founded the Free University of Amsterdam and a new Reformed denomination. A towering intellectual who applied Calvinist worldview to every sphere of life.",
  faith: "Kuyper declared: 'There is not a square inch in the whole domain of our human existence over which Christ, who is Sovereign over all, does not cry, Mine!' His vision of Christ's lordship over all of life continues to shape Reformed thought worldwide.",
  slug: 'abraham-kuyper',
  tagline: 'There is not a square inch over which Christ does not cry: Mine!',
  sources: [wikiSource('Kuyper', 'https://en.wikipedia.org/wiki/Abraham_Kuyper', 'Dutch Reformed theologian and PM')]
}));

addPerson(reformers, makePerson({
  name: 'Martyn Lloyd-Jones',
  years: 'December 20, 1899 – March 1, 1981',
  title: 'Preacher & Pastor',
  bio: "Welsh Protestant minister who left a promising career in medicine to preach. Served as pastor of Westminster Chapel in London for 30 years, becoming one of the most influential preachers of the 20th century.",
  faith: "Lloyd-Jones was a passionate defender of expository preaching and Reformed theology. His multi-volume studies on Romans and Ephesians, and his book Preaching and Preachers, have shaped generations of pastors. He emphasized the necessity of experiencing God's power, not merely knowing about Him.",
  slug: 'martyn-lloyd-jones',
  tagline: 'The Doctor who left medicine to preach the Great Physician',
  sources: [wikiSource('Lloyd-Jones', 'https://en.wikipedia.org/wiki/Martyn_Lloyd-Jones', 'Welsh preacher at Westminster Chapel')]
}));

addPerson(reformers, makePerson({
  name: 'J.I. Packer',
  years: 'July 22, 1926 – July 17, 2020',
  title: 'Theologian & Author',
  bio: "British-born Canadian Reformed theologian and author of Knowing God, one of the best-selling Christian books of the 20th century. He helped shape modern evangelicalism while maintaining deep Reformed convictions.",
  faith: "Packer's Knowing God made profound theology accessible to ordinary believers. He emphasized that knowing God personally — not merely knowing about Him — is the whole purpose of human existence. A humble scholar who once said theology was simply 'thinking about God in His presence.'",
  slug: 'ji-packer',
  tagline: 'Knowing God — not just knowing about God',
  sources: [wikiSource('Packer', 'https://en.wikipedia.org/wiki/J._I._Packer', 'Author of Knowing God')]
}));

// ============================================================
// 3. PURITANS (new subcategory under Historical Biographies)
// ============================================================
const puritans = findOrCreateSubcategory(historicalCat, 'puritans', 'Puritans');

addPerson(puritans, makePerson({
  name: 'John Owen',
  years: 'January 1616 – August 24, 1683',
  title: 'Puritan Theologian',
  bio: "English Nonconformist theologian, Vice-Chancellor of Oxford University, and chaplain to Oliver Cromwell. Often called 'the prince of Puritan theologians' for the depth and precision of his doctrinal works.",
  faith: "Owen's works on the Holy Spirit, communion with God, and the mortification of sin remain unsurpassed in depth. He wrote: 'Be killing sin or it will be killing you.' His treatise The Death of Death in the Death of Christ is a definitive defense of particular redemption.",
  slug: 'john-owen',
  tagline: 'Be killing sin or it will be killing you',
  sources: [wikiSource('Owen', 'https://en.wikipedia.org/wiki/John_Owen_(theologian)', 'Prince of Puritan theologians')]
}));

addPerson(puritans, makePerson({
  name: 'Richard Baxter',
  years: 'November 12, 1615 – December 8, 1691',
  title: 'Puritan Pastor & Author',
  bio: "English Puritan leader who pastored in Kidderminster and transformed the town through faithful ministry. His prolific writing produced over 140 books, including The Reformed Pastor and The Saints' Everlasting Rest.",
  faith: "Baxter's ministry in Kidderminster turned a spiritually apathetic town into a community where 'you could hear families singing psalms and praying from every house.' The Reformed Pastor remains essential reading for ministers. He modeled what it means to shepherd souls with tireless devotion.",
  slug: 'richard-baxter',
  tagline: 'The pastor whose town was transformed by faithful ministry',
  sources: [wikiSource('Baxter', 'https://en.wikipedia.org/wiki/Richard_Baxter', 'Puritan pastor of Kidderminster')]
}));

addPerson(puritans, makePerson({
  name: 'John Flavel',
  years: 'c. 1627 – June 26, 1691',
  title: 'Puritan Pastor & Author',
  bio: "English Puritan clergyman known for his devotional writing and pastoral warmth. He ministered in Dartmouth, England, and his works were widely read for their deep piety and practical application.",
  faith: "Flavel's Keeping the Heart is considered one of the finest Puritan devotional works. He wrote: 'The soul of religion is the practical part.' Ejected from his pulpit by the Act of Uniformity, he continued preaching in secret — sometimes in the woods, sometimes at sea — risking imprisonment for the gospel.",
  slug: 'john-flavel',
  tagline: 'The soul of religion is the practical part',
  sources: [wikiSource('Flavel', 'https://en.wikipedia.org/wiki/John_Flavel', 'Puritan pastor and devotional writer')]
}));

addPerson(puritans, makePerson({
  name: 'Thomas Watson',
  years: 'c. 1620 – 1686',
  title: 'Puritan Preacher & Author',
  bio: "English Nonconformist Puritan preacher and author, known for his clear and practical expositions of doctrine. Ejected from his pulpit by the Great Ejection of 1662.",
  faith: "Watson's A Body of Divinity and The Doctrine of Repentance are prized for making deep theology vivid and memorable. He wrote: 'God's wounds cure, sin's kisses kill.' His gift was making the truths of the Westminster Shorter Catechism come alive for ordinary believers.",
  slug: 'thomas-watson',
  tagline: "God's wounds cure — sin's kisses kill",
  sources: [wikiSource('Watson', 'https://en.wikipedia.org/wiki/Thomas_Watson_(Puritan)', 'Puritan author of A Body of Divinity')]
}));

addPerson(puritans, makePerson({
  name: 'Matthew Henry',
  years: 'October 18, 1662 – June 22, 1714',
  title: 'Bible Commentator & Pastor',
  bio: "Welsh-born Nonconformist minister whose Commentary on the Whole Bible remains one of the most widely used Bible commentaries ever written — over 300 years after its publication.",
  faith: "Henry's commentary is treasured for its devotional warmth and practical wisdom. Spurgeon said every minister should read it through at least once. Henry wrote: 'The joy of the Lord will arm us against the assaults of our spiritual enemies and put our mouths out of taste for those pleasures with which the tempter baits his hooks.'",
  slug: 'matthew-henry',
  tagline: 'His Bible commentary has been read for over 300 years',
  sources: [wikiSource('Henry', 'https://en.wikipedia.org/wiki/Matthew_Henry', 'Author of the beloved Bible commentary')]
}));

// ============================================================
// 4. Tim Keller — add to Pastors & Missionaries
// ============================================================
const pastors = historicalCat.subcategories.find(s => s.id === 'pastors-missionaries');

addPerson(pastors, makePerson({
  name: 'Tim Keller',
  years: 'September 23, 1950 – May 19, 2023',
  title: 'Pastor, Author & Apologist',
  bio: "Founding pastor of Redeemer Presbyterian Church in Manhattan, which grew from a small group to over 5,000 members. Author of The Reason for God, The Prodigal God, and numerous other influential books bridging Reformed theology and urban culture.",
  faith: "Keller made Reformed theology accessible to skeptics and seekers in one of the most secular cities in America. He demonstrated that rigorous theological thinking and compassionate cultural engagement are not opposites. Near the end of his life, battling cancer, he wrote about his confidence in the resurrection: 'There is no party like the one we are going to.'",
  slug: 'tim-keller',
  tagline: 'There is no party like the one we are going to',
  sources: [wikiSource('Keller', 'https://en.wikipedia.org/wiki/Tim_Keller_(pastor)', 'Founding pastor of Redeemer Presbyterian NYC')]
}));

// ============================================================
// 5. Apologists (new subcategory under Living Testimonies)
// ============================================================
const livingCat = findCategory('living-testimonies');
const apologists = findOrCreateSubcategory(livingCat, 'apologists', 'Apologists');

addPerson(apologists, makePerson({
  name: 'Nabeel Qureshi',
  years: 'April 13, 1983 – September 16, 2017',
  title: 'Apologist & Author',
  bio: "Pakistani-American author and Christian apologist who converted from devout Ahmadiyya Islam to Christianity. His book Seeking Allah, Finding Jesus chronicles his intellectual and spiritual journey. He died of stomach cancer at age 34.",
  faith: "Qureshi's conversion came through years of rigorous investigation, dreams, and his deep friendship with David Wood. He became a powerful speaker for Ravi Zacharias International Ministries. Even as he faced terminal cancer, he said: 'God is with me through it all... I have hope that transcends this world.'",
  slug: 'nabeel-qureshi',
  tagline: "Seeking Allah, Finding Jesus — a devout Muslim's journey to Christ",
  sources: [wikiSource('Qureshi', 'https://en.wikipedia.org/wiki/Nabeel_Qureshi', 'Former Muslim turned Christian apologist')]
}));

// ============================================================
// 6. Chinese Christians (new subcategory under Historical Biographies)
// ============================================================
const chineseChristians = findOrCreateSubcategory(historicalCat, 'chinese-christians', 'Chinese Christians');

addPerson(chineseChristians, makePerson({
  name: 'Sun Yat-sen',
  years: 'November 12, 1866 – March 12, 1925',
  title: 'Revolutionary & Father of Modern China',
  bio: "Chinese revolutionary and political leader who served as the first president of the Republic of China. Known as the 'Father of the Nation,' he overthrew the Qing dynasty and established a republic.",
  faith: "Sun was baptized as a Christian in Hong Kong in 1883 and credited Christianity as a driving force behind his revolutionary ideals of equality and justice. He said: 'I am a follower of Jesus Christ. The Revolution has its origins in Christianity.' His Three Principles of the People were influenced by Christian ethics.",
  slug: 'sun-yat-sen',
  tagline: 'The Revolution has its origins in Christianity',
  sources: [wikiSource('Sun Yat-sen', 'https://en.wikipedia.org/wiki/Sun_Yat-sen', 'Father of the Republic of China')]
}));

addPerson(chineseChristians, makePerson({
  name: 'Chiang Kai-shek',
  years: 'October 31, 1887 – April 5, 1975',
  title: 'Military & Political Leader',
  bio: "Leader of the Republic of China who governed mainland China before retreating to Taiwan. He led China through World War II and was one of the most consequential figures in 20th-century Asian history.",
  faith: "Chiang was baptized a Methodist Christian in 1930, influenced by his wife Soong Mei-ling. He attributed his survival through war and exile to God's providence. He read the Bible daily and wrote in his diary: 'My faith is my greatest source of strength.'",
  slug: 'chiang-kai-shek',
  tagline: 'My faith is my greatest source of strength',
  sources: [wikiSource('Chiang', 'https://en.wikipedia.org/wiki/Chiang_Kai-shek', 'Leader of the Republic of China')]
}));

addPerson(chineseChristians, makePerson({
  name: 'Soong Mei-ling',
  years: 'March 4, 1898 – October 23, 2003',
  title: 'First Lady of the Republic of China',
  bio: "Known as Madame Chiang Kai-shek, she was a political figure, diplomat, and painter who addressed the U.S. Congress and played a key role in Sino-American relations. She lived to 105.",
  faith: "Raised in a devout Methodist family (one of the famous Soong sisters), Mei-ling's faith shaped her public service and diplomacy. She influenced her husband's conversion and was known for her public witness. She famously said: 'I can say that God has led me — and He does lead me.'",
  slug: 'soong-mei-ling',
  tagline: "God has led me — and He does lead me",
  sources: [wikiSource('Soong Mei-ling', 'https://en.wikipedia.org/wiki/Soong_Mei-ling', 'Madame Chiang Kai-shek')]
}));

// ============================================================
// 7. Converts from Other Faiths (new subcategory under Historical Biographies)
// ============================================================
const converts = findOrCreateSubcategory(historicalCat, 'converts-from-other-faiths', 'Converts from Other Faiths');

addPerson(converts, makePerson({
  name: 'Pandita Ramabai',
  years: 'April 23, 1858 – April 5, 1922',
  title: 'Scholar, Reformer & Evangelist',
  bio: "Indian social reformer, scholar, and champion of women's rights who was the first woman to be awarded the title Pandita (scholar) for her mastery of Sanskrit. She founded the Mukti Mission to rescue child brides, widows, and orphans.",
  faith: "Born a high-caste Hindu, Ramabai converted to Christianity in England in 1883 after being deeply moved by the love she witnessed among Christians. She translated the Bible into Marathi and led a remarkable revival at Mukti Mission in 1905. She said: 'Christ has set me free.'",
  slug: 'pandita-ramabai',
  tagline: 'Christ has set me free',
  sources: [wikiSource('Ramabai', 'https://en.wikipedia.org/wiki/Pandita_Ramabai', 'Hindu convert, Indian women\'s rights champion')]
}));

addPerson(converts, makePerson({
  name: 'Sadhu Sundar Singh',
  years: 'September 3, 1889 – c. 1929',
  title: 'Indian Evangelist & Mystic',
  bio: "Known as the 'Apostle with Bleeding Feet,' Sundar Singh was a Sikh who converted to Christianity at age 15 after a vision of Christ. He wandered India barefoot in the saffron robes of a sadhu (holy man), preaching the gospel.",
  faith: "After his conversion, Sundar Singh was disowned by his family and poisoned by his uncle. He adopted the life of a wandering sadhu to present Christ in a way culturally accessible to Indians. He disappeared in 1929 while on a mission trip to Tibet. He said: 'Without Christ I was like a fish out of water; with Christ I am in the ocean of love.'",
  slug: 'sadhu-sundar-singh',
  tagline: 'Without Christ I was a fish out of water — with Christ, in the ocean of love',
  sources: [wikiSource('Sundar Singh', 'https://en.wikipedia.org/wiki/Sadhu_Sundar_Singh', 'Sikh convert, the Apostle with Bleeding Feet')]
}));

// ============================================================
// 8. More Athletes
// ============================================================
const athletes = livingCat.subcategories.find(s => s.id === 'athletes');

addPerson(athletes, makePerson({
  name: 'Katie Ledecky',
  years: 'March 17, 1997 –',
  title: 'Olympic Swimmer',
  bio: "Most decorated female swimmer in Olympic history with seven gold medals. Dominates distance freestyle events and holds multiple world records.",
  faith: "Ledecky is a practicing Catholic who has spoken about the role of faith in her life and athletic career. She attended Mass regularly during Olympic competitions and credits her faith and family with keeping her grounded. She graduated from Stanford University and has been a quiet but consistent witness.",
  slug: 'katie-ledecky',
  tagline: 'Most decorated female swimmer in Olympic history',
  sources: [wikiSource('Ledecky', 'https://en.wikipedia.org/wiki/Katie_Ledecky', 'Seven-time Olympic gold medalist')]
}));

addPerson(athletes, makePerson({
  name: 'Sydney McLaughlin-Levrone',
  years: 'August 7, 1999 –',
  title: 'Olympic Hurdler & Sprinter',
  bio: "Olympic gold medalist and world record holder in the 400m hurdles. Named to the U.S. Olympic team at age 16, she has shattered records multiple times and is considered one of the greatest hurdlers ever.",
  faith: "McLaughlin-Levrone is outspoken about her Christian faith, authoring Far Beyond Gold about finding identity in Christ rather than athletic achievement. She has said: 'God made me fast, and when I run, I feel His pleasure.' She regularly shares Scripture and testimony on social media.",
  slug: 'sydney-mclaughlin-levrone',
  tagline: 'Far beyond gold — identity in Christ, not medals',
  sources: [wikiSource('McLaughlin-Levrone', 'https://en.wikipedia.org/wiki/Sydney_McLaughlin-Levrone', 'Olympic hurdler and vocal Christian')]
}));

addPerson(athletes, makePerson({
  name: 'Missy Franklin',
  years: 'May 10, 1995 –',
  title: 'Olympic Swimmer',
  bio: "Five-time Olympic medalist (four golds) in swimming. Won four gold medals at the 2012 London Olympics at age 17 and was one of the most celebrated swimmers of her generation.",
  faith: "Franklin has spoken openly about her Christian faith being central to her identity. She has said: 'My faith in God is the most important thing in my life. Swimming is what I do, but it's not who I am.' She has been involved in various charitable causes and youth mentoring.",
  slug: 'missy-franklin',
  tagline: 'Swimming is what I do, but it\'s not who I am',
  sources: [wikiSource('Franklin', 'https://en.wikipedia.org/wiki/Missy_Franklin', 'Olympic swimmer and faith advocate')]
}));

addPerson(athletes, makePerson({
  name: 'Tamika Catchings',
  years: 'July 21, 1979 –',
  title: 'WNBA Champion & Humanitarian',
  bio: "Ten-time WNBA All-Star, four-time Olympic gold medalist, and one of the greatest basketball players in WNBA history. She founded the Catch the Stars Foundation to help disadvantaged youth.",
  faith: "Catchings has been vocal about her Christian faith throughout her career. She founded her Catch the Stars Foundation rooted in Christian principles, using basketball as a vehicle to minister to youth. She has shared how faith helped her overcome being born with a hearing disability and family challenges.",
  slug: 'tamika-catchings',
  tagline: 'Using basketball to catch stars for God\'s kingdom',
  sources: [wikiSource('Catchings', 'https://en.wikipedia.org/wiki/Tamika_Catchings', 'WNBA legend and Olympic champion')]
}));

// ============================================================
// 9. More Theologians (add to Scientists & Academics in Entrepreneurs cat, or Reformers)
// ============================================================
addPerson(reformers, makePerson({
  name: 'Herman Bavinck',
  years: 'December 13, 1854 – July 29, 1921',
  title: 'Dutch Reformed Theologian',
  bio: "Dutch Reformed theologian whose four-volume Reformed Dogmatics is considered one of the greatest systematic theologies ever written. Professor at Kampen and the Free University of Amsterdam.",
  faith: "Bavinck's vision was to engage modern thought without compromising Reformed orthodoxy. His Reformed Dogmatics masterfully integrates biblical theology with philosophy and culture. He wrote: 'The essence of the Christian religion consists in the reality that the creation of the Father, devastated by sin, is restored in the death of the Son.'",
  slug: 'herman-bavinck',
  tagline: 'Reformed Dogmatics — a masterwork of systematic theology',
  sources: [wikiSource('Bavinck', 'https://en.wikipedia.org/wiki/Herman_Bavinck', 'Author of Reformed Dogmatics')]
}));

addPerson(reformers, makePerson({
  name: 'B.B. Warfield',
  years: 'November 5, 1851 – February 16, 1921',
  title: 'Princeton Theologian',
  bio: "Professor of theology at Princeton Seminary for over 30 years. The last great Princeton theologian before the liberal reorganization, he was the foremost defender of biblical inerrancy in his era.",
  faith: "Warfield's defense of the inspiration and inerrancy of Scripture laid the theological foundation that continues to undergird evangelical and Reformed churches. He argued that Christianity is not merely a feeling but is grounded in historical facts and propositional truth. He also tenderly cared for his invalid wife for decades.",
  slug: 'bb-warfield',
  tagline: 'The great defender of biblical inerrancy',
  sources: [wikiSource('Warfield', 'https://en.wikipedia.org/wiki/B._B._Warfield', 'Princeton theologian and champion of inerrancy')]
}));

// ============================================================
// 10. Mathematicians
// ============================================================
const mathematicians = historicalCat.subcategories.find(s => s.id === 'mathematicians');

addPerson(mathematicians, makePerson({
  name: 'Augustin-Louis Cauchy',
  years: 'August 21, 1789 – May 23, 1857',
  title: 'Mathematician',
  bio: "French mathematician who was a pioneer of mathematical analysis. One of the most prolific mathematicians in history, he published nearly 800 research papers and made foundational contributions to calculus, group theory, and complex analysis.",
  faith: "Cauchy was a deeply devout Catholic who publicly defended the faith at the French Academy of Sciences. He organized charitable work for the poor in Paris and supported Catholic missions in Ireland. He said: 'I am a Christian — that is to say, I believe in the divinity of Jesus Christ, with Tycho Brahe, Copernicus, Descartes, Newton, Leibniz, and Pascal.'",
  slug: 'augustin-louis-cauchy',
  tagline: 'I am a Christian, with Copernicus, Descartes, Newton, and Pascal',
  sources: [wikiSource('Cauchy', 'https://en.wikipedia.org/wiki/Augustin-Louis_Cauchy', 'Prolific mathematician and devout Catholic')]
}));

// ============================================================
// 11. Inventors & Engineers (new subcategory under Historical Biographies)
// ============================================================
const inventors = findOrCreateSubcategory(historicalCat, 'inventors-engineers', 'Inventors & Engineers');

addPerson(inventors, makePerson({
  name: 'Samuel Morse',
  years: 'April 27, 1791 – April 2, 1872',
  title: 'Inventor of the Telegraph',
  bio: "American inventor and painter who developed the electric telegraph and Morse code, revolutionizing long-distance communication. Originally trained as an artist, he turned to invention after personal tragedy.",
  faith: "Morse was a devout Calvinist. The first message sent by telegraph in 1844 was 'What hath God wrought' (Numbers 23:23) — chosen by Annie Ellsworth. Morse himself said: 'The nearer I approach the end of my pilgrimage... the grandeur and sublimity of God's remedy for fallen man are more appreciated.'",
  slug: 'samuel-morse',
  tagline: 'What hath God wrought — the first words of the telegraph age',
  sources: [wikiSource('Morse', 'https://en.wikipedia.org/wiki/Samuel_Morse', 'Inventor of the telegraph')]
}));

addPerson(inventors, makePerson({
  name: 'Cyrus McCormick',
  years: 'February 15, 1809 – May 13, 1884',
  title: 'Inventor & Philanthropist',
  bio: "American inventor of the mechanical reaper, which revolutionized agriculture and helped feed growing populations. Founded the McCormick Harvesting Machine Company (later International Harvester).",
  faith: "McCormick was a devout Presbyterian who gave generously to churches and theological seminaries. He was a major benefactor of what became McCormick Theological Seminary in Chicago. He saw his inventions as a way to serve God by serving humanity's need for food.",
  slug: 'cyrus-mccormick',
  tagline: 'Feeding the world and funding the gospel',
  sources: [wikiSource('McCormick', 'https://en.wikipedia.org/wiki/Cyrus_McCormick', 'Inventor of the mechanical reaper')]
}));

// ============================================================
// 12. Philanthropists (new subcategory under Entrepreneurs-Scientists)
// ============================================================
const entreprCat = findCategory('entrepreneurs-scientists');
const philanthropists = findOrCreateSubcategory(entreprCat, 'philanthropists', 'Philanthropists');

addPerson(philanthropists, makePerson({
  name: 'R.G. LeTourneau',
  years: 'November 30, 1888 – June 1, 1969',
  title: 'Inventor, Industrialist & Philanthropist',
  bio: "American industrialist who invented nearly 300 earth-moving machines and held hundreds of patents. Founded LeTourneau Technologies and LeTourneau University. Known as 'God's Businessman.'",
  faith: "LeTourneau reversed the tithe — he gave 90% of his income to God and lived on 10%. He said: 'It's not how much of my money I give to God, but how much of God's money I keep for myself.' He traveled the world sharing his testimony and partnered with the Christian and Missionary Alliance.",
  slug: 'rg-letourneau',
  tagline: "Not how much I give to God, but how much of God's money I keep",
  sources: [wikiSource('LeTourneau', 'https://en.wikipedia.org/wiki/R._G._LeTourneau', "God's Businessman — gave 90%, kept 10%")]
}));

addPerson(philanthropists, makePerson({
  name: 'John Wanamaker',
  years: 'July 11, 1838 – December 12, 1922',
  title: 'Merchant & Sunday School Superintendent',
  bio: "Pioneer of the modern department store and U.S. Postmaster General. Founded one of the first department stores in America and revolutionized retail with money-back guarantees and price tags.",
  faith: "Wanamaker served as superintendent of the Bethany Sunday School in Philadelphia for over 60 years, growing it to the largest in the world with over 5,000 students. He said: 'I have never been able to give one dollar to the Lord that I did not get back five.' He saw business success as a platform for Christian service.",
  slug: 'john-wanamaker',
  tagline: 'Built department stores — ran the largest Sunday school for 60 years',
  sources: [wikiSource('Wanamaker', 'https://en.wikipedia.org/wiki/John_Wanamaker', 'Merchant prince and Sunday school leader')]
}));

addPerson(philanthropists, makePerson({
  name: 'Henry Parsons Crowell',
  years: 'January 27, 1855 – October 24, 1943',
  title: 'Businessman & Philanthropist',
  bio: "American businessman who built Quaker Oats into a national brand through innovative marketing. One of the first to use mass advertising, branded packaging, and product sampling.",
  faith: "Crowell served as chairman of the board of Moody Bible Institute for over 40 years. He devoted his business acumen to funding Christian education and missions. He once said: 'I believe my money-making is a gift from God, and I am under obligation to use it in His service.'",
  slug: 'henry-parsons-crowell',
  tagline: 'Built Quaker Oats — funded Moody Bible Institute for 40 years',
  sources: [wikiSource('Crowell', 'https://en.wikipedia.org/wiki/Henry_Parsons_Crowell', 'Quaker Oats founder and Moody patron')]
}));

addPerson(philanthropists, makePerson({
  name: 'J.C. Penney',
  years: 'September 16, 1875 – February 12, 1971',
  title: 'Retail Founder & Philanthropist',
  bio: "American businessman who founded the J.C. Penney retail chain, growing it from one small store in Wyoming to over 1,600 locations. Named his first store 'The Golden Rule.'",
  faith: "Penney was a lifelong tither and named his first store after the Golden Rule of Matthew 7:12. After losing his fortune in the Great Depression and nearly taking his own life, he rededicated his life to Christ and rebuilt. He said: 'My eyesight is growing dim, but my spiritual vision is clearer than ever.'",
  slug: 'jc-penney',
  tagline: "The Golden Rule — his store's name and his life's principle",
  sources: [wikiSource('Penney', 'https://en.wikipedia.org/wiki/J._C._Penney', 'Founder of J.C. Penney stores')]
}));

addPerson(philanthropists, makePerson({
  name: 'Asa Griggs Candler',
  years: 'December 30, 1851 – March 12, 1929',
  title: 'Coca-Cola Founder & Methodist Philanthropist',
  bio: "American businessman who purchased the Coca-Cola formula and built it into a global brand. Served as mayor of Atlanta and became one of the wealthiest men in the South.",
  faith: "Candler was a devout Methodist who donated massive amounts to Emory University, essentially funding its move to Atlanta and establishing it as a major research university. He taught Sunday school, funded church building projects across the South, and saw his wealth as a stewardship from God.",
  slug: 'asa-griggs-candler',
  tagline: 'Built Coca-Cola — poured his wealth into Emory and the church',
  sources: [wikiSource('Candler', 'https://en.wikipedia.org/wiki/Asa_Griggs_Candler', 'Coca-Cola founder and Emory benefactor')]
}));

// ============================================================
// Update lastUpdated
// ============================================================
data.lastUpdated = '2026-03-24';

// Write it out
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n');

// Count
let count = 0;
data.categories.forEach(c => c.subcategories.forEach(s => count += s.people.length));
console.log(`\nTotal people: ${count}`);
console.log('Done!');
