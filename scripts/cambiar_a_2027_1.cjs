const fs = require('fs');
const path = require('path');

// 1. Update seed_data.ts
const seedPath = path.join(__dirname, '../src/data/seed_data.ts');
let seedContent = fs.readFileSync(seedPath, 'utf8');

seedContent = seedContent.replace(/2027-2/g, '2027-1');
seedContent = seedContent.replace(/2027_2/g, '2027_1');
seedContent = seedContent.replace(/fecha_inicio: '2027-08-09'/g, "fecha_inicio: '2027-01-25'");
seedContent = seedContent.replace(/fecha_fin: '2027-12-17'/g, "fecha_fin: '2027-06-18'");

fs.writeFileSync(seedPath, seedContent, 'utf8');
console.log('Updated seed_data.ts to 2027-1');

// 2. Update storage.ts
const storagePath = path.join(__dirname, '../src/services/storage.ts');
let storageContent = fs.readFileSync(storagePath, 'utf8');
storageContent = storageContent.replace(/2027-2/g, '2027-1');
storageContent = storageContent.replace(/2027_2/g, '2027_1');
fs.writeFileSync(storagePath, storageContent, 'utf8');
console.log('Updated storage.ts to 2027-1');
