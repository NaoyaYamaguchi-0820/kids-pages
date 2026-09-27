# three.js

- バージョン: 0.186.1
- ライセンス: MIT（`LICENSE`）

three.js 本体と `OrbitControls`・`GLTFLoader` を1ファイルにまとめ、`<script>` タグで読み込むとグローバル変数 `THREE` として使えるようにしたものです。
ES モジュール版は `file://` で開いたときに読み込めないため、このようにまとめています。

## 作り直す手順

```sh
npm install three@0.186.1 esbuild
npx esbuild vendor/three/entry.js --bundle --minify --format=iife --global-name=THREE --legal-comments=none --outfile=vendor/three/three.min.js
```
