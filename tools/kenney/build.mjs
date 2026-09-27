// Kenney のスターターキットから選んだ .glb を、テクスチャ込みの1ファイルに変換し、
// assets/kenney/models.js（<script> で読み込めるJS）にまとめる。
//
// 使い方は tools/kenney/README.md を参照。
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [sourceDir, outFile = 'assets/kenney/models.js'] = process.argv.slice(2);
if (!sourceDir) {
  console.error('usage: node tools/kenney/build.mjs <キットをcloneしたディレクトリ> [出力ファイル]');
  process.exit(1);
}

// [id, キットのリポジトリ名, リポジトリ内のパス]
const MODELS = [
  ['truck', 'Starter-Kit-Racing', 'models/vehicle-truck-red.glb'],
  ['motorcycle', 'Starter-Kit-Racing', 'models/vehicle-motorcycle.glb'],
  ['character', 'Starter-Kit-3D-Platformer', 'models/character.glb'],
  ['coin', 'Starter-Kit-3D-Platformer', 'models/coin.glb'],
  ['building', 'Starter-Kit-City-Builder', 'models/building-small-a.glb'],
  ['fountain', 'Starter-Kit-City-Builder', 'models/pavement-fountain.glb'],
  ['trophy', 'Starter-Kit-Basic-Scene', 'sample/Mini Arena/Models/GLB format/trophy.glb'],
];

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const out = {};
for (const [id, repo, path] of MODELS) {
  const doc = await io.read(join(sourceDir, repo, path));
  const glb = await io.writeBinary(doc);
  out[id] = Buffer.from(glb).toString('base64');
  console.log(`${id}: ${glb.byteLength} bytes`);
}

const body = Object.entries(out).map(([id, b64]) => `  ${JSON.stringify(id)}: ${JSON.stringify(b64)},`).join('\n');
writeFileSync(
  outFile,
  '// 自動生成ファイル（tools/kenney/build.mjs）。手で編集しないこと。\n'
  + '// Kenney (www.kenney.nl) の3Dモデル。ライセンスは CC0（assets/kenney/License.txt）。\n'
  + `window.KENNEY_MODELS = {\n${body}\n};\n`
);
console.log(`wrote ${outFile}`);
