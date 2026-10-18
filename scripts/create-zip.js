import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectDir = path.resolve(__dirname, '..');
const workspaceDir = path.resolve(projectDir, '..');
const zipFile = path.join(workspaceDir, 'high-skill-taekwondo-academy.zip');

if (fs.existsSync(zipFile)) {
  fs.rmSync(zipFile, { force: true });
}

console.log('Packaging high-skill-taekwondo-academy into ZIP archive...');

// Run tar with Windows native zip creation, excluding node_modules and dist
const command = `tar -a -cf "${zipFile}" --exclude="high-skill-taekwondo-academy/node_modules" --exclude="high-skill-taekwondo-academy/dist" --exclude="high-skill-taekwondo-academy/.git" high-skill-taekwondo-academy`;

execSync(command, { cwd: workspaceDir, stdio: 'inherit' });

if (fs.existsSync(zipFile)) {
  const stats = fs.statSync(zipFile);
  console.log(`\n🎉 SUCCESS! Created: ${zipFile}`);
  console.log(`📦 Size: ${(stats.size / 1024).toFixed(2)} KB\n`);
} else {
  console.error('Failed to create zip file.');
  process.exit(1);
}
