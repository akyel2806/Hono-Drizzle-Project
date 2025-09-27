import { db } from './index.js';
import { santri } from './schema.js';
 
async function main() {
  await db.insert(santri).values([
    { id: 1, nama: 'Ahmad Fauzi', kelas: 11 },
    { id: 2, nama: 'Muhammad Rizky', kelas: 12 },
    { id: 3, nama: 'Alwi Saputra', kelas: 10 },
  ]);
 
  console.log(' Data santri berhasil di-seed');
}
 
main();