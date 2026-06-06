const fs = require('fs');

const baseVitamins = ['Vitamin A', 'Vitamin C', 'Vitamin D3', 'Vitamin E', 'Vitamin K1', 'Vitamin K2', 'Vitamin B1 (Thiamine)', 'Vitamin B2 (Riboflavin)', 'Vitamin B3 (Niacin)', 'Vitamin B5 (Pantothenic Acid)', 'Vitamin B6 (Pyridoxine)', 'Vitamin B7 (Biotin)', 'Vitamin B9 (Folate)', 'Vitamin B12 (Cobalamin)'];
const baseMinerals = ['Calcium', 'Magnesium', 'Zinc', 'Iron', 'Potassium', 'Sodium', 'Copper', 'Manganese', 'Iodine', 'Selenium', 'Chromium', 'Molybdenum'];
const baseHerbs = ['Ashwagandha', 'Turmeric', 'Ginger', 'Ginseng', 'Ginkgo Biloba', 'Milk Thistle', 'Echinacea', 'Elderberry', 'Valerian Root', "St. John's Wort", 'Maca Root', 'Rhodiola Rosea'];
const baseAminos = ['L-Arginine', 'L-Carnitine', 'L-Glutamine', 'L-Theanine', 'BCAA', 'Creatine', 'L-Tyrosine'];

const supplements = [];

function generateSupps(arr, cat, countStart, total) {
  for(let i=0; i < total; i++) {
    const baseName = arr[i % arr.length];
    const modifier = (i >= arr.length) ? ' Complex ' + Math.floor((i/arr.length)+1) : '';
    supplements.push({
      id: 'supp_' + (countStart + i),
      name: baseName + modifier,
      category: cat,
      dose: (Math.floor(Math.random() * 50) * 10 + 10) + (cat==='Mineral'?'mg':cat==='Vitamin'?'IU':'mg'),
      description: 'High-quality ' + baseName + ' designed to support overall ' + cat.toLowerCase() + ' health, improve vitality, and promote biological balance. Manufactured in a GMP-certified facility.',
      instructions: cat === 'Vitamin' ? 'Take 1 capsule daily with food.' : 'Take with plenty of water.',
      warnings: 'Consult a physician if pregnant or nursing.'
    });
  }
}

generateSupps(baseVitamins, 'Vitamin', 1, 35);
generateSupps(baseMinerals, 'Mineral', 36, 30);
generateSupps(baseHerbs, 'Herbal', 66, 20);
generateSupps(baseAminos, 'Amino Acid', 86, 15);

const insights = [];
const insightTopics = ['Biohacking', 'Sleep Science', 'Nutrition', 'Longevity', 'Metabolism'];
for(let i=1; i<=20; i++) {
  const topic = insightTopics[i % 5];
  insights.push({
    id: 'ins_' + i,
    category: topic,
    title: 'The Ultimate Guide to ' + topic + ' Part ' + Math.ceil(i/5),
    readTime: (Math.floor(Math.random() * 10) + 3) + ' min read',
    excerpt: 'Discover the latest scientific breakthroughs in ' + topic.toLowerCase() + ' that can transform your daily energy levels and long-term health span.',
    image: 'https://images.unsplash.com/photo-' + (1500000000000 + i*1000) + '?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    content: 'Full article content for ' + topic + '. This insight explores deep mechanisms of human physiology and offers actionable tips for optimizing your life.'
  });
}

const fileContent = 'const vitaData = ' + JSON.stringify({ supplements, insights }, null, 2) + ';';
fs.writeFileSync('data.js', fileContent);
console.log('data.js generated with 100 supplements and 20 insights.');
