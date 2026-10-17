const fs = require('fs');
const path = require('path');

const possibleCsvPaths = [
  path.join(__dirname, '..', 'EDIT_PRICES_BY_CATEGORY.csv'),
  path.join(__dirname, '..', '..', 'EDIT_PRICES_BY_CATEGORY.csv'),
  path.join(__dirname, '..', 'data', 'products_prices.csv')
];

let csvPath = null;
for (const p of possibleCsvPaths) {
  if (fs.existsSync(p)) {
    csvPath = p;
    break;
  }
}

if (!csvPath) {
  console.error('Could not find CSV file to import.');
  process.exit(1);
}

console.log(`Reading prices from: ${csvPath}`);
const jsonPath = path.join(__dirname, '..', 'data', 'medicines.json');
const csvRaw = fs.readFileSync(csvPath, 'utf8');
const medicines = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Robust CSV parser
function parseCsvLines(text) {
  // Strip BOM if present
  if (text.charCodeAt(0) === 0xFEFF) {
    text = text.slice(1);
  }
  const lines = [];
  let current = [];
  let inQuotes = false;
  let field = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      current.push(field);
      field = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      current.push(field);
      if (current.some(f => f.trim().length > 0)) {
        lines.push(current);
      }
      current = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field.length > 0 || current.length > 0) {
    current.push(field);
    lines.push(current);
  }

  return lines;
}

const rows = parseCsvLines(csvRaw);
if (rows.length <= 1) {
  console.log('No data rows found in CSV.');
  process.exit(0);
}

// Find header indices
const header = rows[0].map(h => (h || '').trim().toLowerCase());
let nameIdx = header.findIndex(h => h.includes('product name') || h === 'name');
let newPriceIdx = header.findIndex(h => h.includes('new price'));
let currentPriceIdx = header.findIndex(h => h.includes('current price') || h === 'price');

if (nameIdx === -1) nameIdx = 1; // default to column 1 if category is col 0
if (newPriceIdx === -1) newPriceIdx = header.length - 1;

console.log(`Detected columns: Name index = ${nameIdx}, New Price index = ${newPriceIdx}`);

// Map: normalized name -> new price
const updates = new Map();

for (let i = 1; i < rows.length; i++) {
  const row = rows[i];
  const name = (row[nameIdx] || '').trim().toLowerCase();
  const newPrice = (row[newPriceIdx] || '').trim();

  if (name && newPrice) {
    updates.set(name, newPrice);
  }
}

if (updates.size === 0) {
  console.log('No new prices entered in the "New Price" column yet.');
  process.exit(0);
}

let updatedCount = 0;
for (const med of medicines) {
  const key = (med.name || '').trim().toLowerCase();
  if (updates.has(key)) {
    const rawVal = updates.get(key);
    let formattedPrice = rawVal;
    
    // Auto-format if user only entered number (e.g. "5" or "5.50")
    if (!formattedPrice.startsWith('$') && !formattedPrice.startsWith('₹') && !formattedPrice.startsWith('€')) {
      const oldUnitMatch = (med.price || '').match(/\/\s*([A-Za-z]+)/);
      const unit = oldUnitMatch ? ` / ${oldUnitMatch[1]}` : '';
      formattedPrice = `$ ${rawVal}${unit}`;
    }
    
    med.price = formattedPrice;
    updatedCount++;
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(medicines, null, 2), 'utf8');
console.log(`Successfully updated ${updatedCount} product prices in medicines.json locally!`);
