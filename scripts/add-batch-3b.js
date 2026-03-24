const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/notable-christians.json', 'utf8'));

const hist = data.categories.find(c => c.id === 'historical-biographies');
const chinese = hist.subcategories.find(s => s.id === 'chinese-christians');

// Charlie Soong at beginning (patriarch)
chinese.people.unshift({
  name: 'Charlie Soong',
  years: '1863 – May 3, 1918',
  title: 'Industrialist, Publisher & Methodist Leader',
  bio: 'Chinese-American industrialist and Methodist missionary who became one of the wealthiest men in China. Born Han Jiaozhun, he studied at Vanderbilt University and Duke, then returned to China where he printed and distributed Bibles.',
  faith: "Soong converted to Christianity as a young man in America and was baptized a Methodist. He devoted himself to printing Bibles and Christian literature for China, becoming the foremost Bible publisher in the country. His faith shaped his entire family — his children became some of the most influential figures in modern China, and his daughter Mei-ling led Chiang Kai-shek to Christ.",
  videos: [],
  sources: [{ type: 'wikipedia', title: 'Charlie Soong — Wikipedia', url: 'https://en.wikipedia.org/wiki/Charlie_Soong', note: 'Patriarch of the Soong dynasty' }],
  slug: 'charlie-soong',
  tagline: 'The Bible publisher whose family shaped modern China',
  image: '',
  imageAttribution: { source: '', license: '' }
});
console.log('Added: Charlie Soong');

// Al Mohler
const reformers = hist.subcategories.find(s => s.id === 'reformers-theologians');
reformers.people.push({
  name: 'Al Mohler',
  years: 'October 19, 1959 –',
  title: 'Theologian & Seminary President',
  bio: 'President of The Southern Baptist Theological Seminary since 1993, the flagship seminary of the Southern Baptist Convention. A leading public intellectual and daily podcaster who addresses theology, culture, and current events.',
  faith: "Mohler led the conservative resurgence at Southern Seminary, returning it to its confessional roots. His daily podcast The Briefing and his prolific writing have made him one of the most influential Reformed voices in American Christianity. He champions biblical inerrancy, complementarianism, and the sufficiency of Scripture.",
  videos: [],
  sources: [{ type: 'wikipedia', title: 'Al Mohler — Wikipedia', url: 'https://en.wikipedia.org/wiki/Albert_Mohler', note: 'President of Southern Baptist Theological Seminary' }],
  slug: 'al-mohler',
  tagline: 'Leading the conservative resurgence in the SBC',
  image: '',
  imageAttribution: { source: '', license: '' }
});
console.log('Added: Al Mohler');

// Mike Huckabee
const political = data.categories.find(c => c.id === 'military-political');
const politicians = political.subcategories.find(s => s.id === 'politicians');
politicians.people.push({
  name: 'Mike Huckabee',
  years: 'August 24, 1955 –',
  title: 'Pastor, Governor & Ambassador',
  bio: 'Former Southern Baptist pastor who served as Governor of Arkansas (1996–2007) and U.S. Ambassador to Israel (2025–). Ran for president twice and hosted a TV show on Fox News.',
  faith: "Huckabee was ordained as a Southern Baptist minister before entering politics. He pastored churches in Arkansas and led a Christian television station. His political career has been marked by his outspoken Christian convictions. He has said: 'My faith does not just influence me — it really defines me.'",
  videos: [],
  sources: [{ type: 'wikipedia', title: 'Mike Huckabee — Wikipedia', url: 'https://en.wikipedia.org/wiki/Mike_Huckabee', note: 'Pastor turned governor turned ambassador' }],
  slug: 'mike-huckabee',
  tagline: "My faith does not just influence me — it defines me",
  image: '',
  imageAttribution: { source: '', license: '' }
});
console.log('Added: Mike Huckabee');

fs.writeFileSync('data/notable-christians.json', JSON.stringify(data, null, 2) + '\n');
let count = 0;
data.categories.forEach(c => c.subcategories.forEach(s => count += s.people.length));
console.log('Total people:', count);
