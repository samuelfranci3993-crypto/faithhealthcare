const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'data', 'medicines.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Sort by category first, then by name
data.sort((a, b) => {
  const catA = (a.parentCategory || a.category || 'Other').toLowerCase();
  const catB = (b.parentCategory || b.category || 'Other').toLowerCase();
  if (catA !== catB) return catA.localeCompare(catB);
  return (a.name || '').localeCompare(b.name || '');
});

// UTF-8 BOM so Excel opens properly without character corruption
let csv = '\uFEFF';
csv += 'Category,Product Name,Dosage Form,Packaging,Current Price,New Price (Enter here)\n';

function escapeCsv(str) {
  if (!str) return '""';
  return '"' + String(str).replace(/"/g, '""') + '"';
}

for (const m of data) {
  const cat = m.parentCategory || m.category || 'Other';
  const pkg = (m.packaging || '-').replace(/Pack(aging)?\s*(Type|Size)?:\s*/gi, '');
  
  csv += [
    escapeCsv(cat),
    escapeCsv(m.name),
    escapeCsv(m.dosageForm || m.category || ''),
    escapeCsv(pkg),
    escapeCsv(m.price || ''),
    '""' // Blank New Price
  ].join(',') + '\n';
}

const out1 = path.join(__dirname, '..', 'EDIT_PRICES_BY_CATEGORY.csv');
const out2 = path.join(__dirname, '..', '..', 'EDIT_PRICES_BY_CATEGORY.csv');

fs.writeFileSync(out1, csv, 'utf8');
fs.writeFileSync(out2, csv, 'utf8');

console.log(`Created categorized price file with ${data.length} products.`);
console.log(`Path 1: ${out1}`);
console.log(`Path 2: ${out2}`);
