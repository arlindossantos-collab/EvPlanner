import fs from 'node:fs';
import path from 'node:path';
const [version, date, description] = process.argv.slice(2);
if (!version || !date || !description) { console.error('Uso: node scripts/release-version.mjs 3.7 25/08/2026 "Descrição"'); process.exit(1); }
const root=process.cwd(); const cfg=path.join(root,'config.js'); let s=fs.readFileSync(cfg,'utf8');
const normalized=version.split('.').length===1?version+'.0.0':(version.split('.').length===2?version+'.0':version);
s=s.replace(/version:\s*'[^']+'/i, `version: '${normalized}'`);
const entry=`{version:'${version}',date:'${date}',description:'${description.replaceAll("'","\\'")}'},`;
s=s.replace(/versionHistory:\s*\[/, m=>m+'\n    '+entry);
fs.writeFileSync(cfg,s);
const sw=path.join(root,'sw.js'); if(fs.existsSync(sw)){let w=fs.readFileSync(sw,'utf8').replace(/evplanner-pro-[^-]+-v\d+/,'evplanner-pro-'+version.replaceAll('.','-')+'-v1');fs.writeFileSync(sw,w)}
const manifest=path.join(root,'manifest.webmanifest'); if(fs.existsSync(manifest)){let m=fs.readFileSync(manifest,'utf8').replace(/EV Planner Pro [0-9.]+/,'EV Planner Pro '+version);fs.writeFileSync(manifest,m)}
console.log(`Release ${version} registrada em config.js`);
