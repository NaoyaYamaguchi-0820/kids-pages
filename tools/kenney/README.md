# Kenney の3Dモデル

`models.html` で使っている一部の3Dモデルは、Kenney (www.kenney.nl) が GitHub で公開しているスターターキットに含まれているものです。
モデルのライセンスは CC0 です（`assets/kenney/License.txt`）。

| id | キット | ファイル |
|---|---|---|
| truck | KenneyNL/Starter-Kit-Racing | models/vehicle-truck-red.glb |
| motorcycle | KenneyNL/Starter-Kit-Racing | models/vehicle-motorcycle.glb |
| character | KenneyNL/Starter-Kit-3D-Platformer | models/character.glb |
| coin | KenneyNL/Starter-Kit-3D-Platformer | models/coin.glb |
| building | KenneyNL/Starter-Kit-City-Builder | models/building-small-a.glb |
| fountain | KenneyNL/Starter-Kit-City-Builder | models/pavement-fountain.glb |
| trophy | KenneyNL/Starter-Kit-Basic-Scene | sample/Mini Arena/Models/GLB format/trophy.glb |

元の `.glb` はテクスチャ（`Textures/colormap.png`）を別ファイルで参照しており、またファイルを直接開いたページからは `.glb` を読み込めません。
そのため `build.mjs` でテクスチャを埋め込んだ `.glb` に変換し、さらに base64 にして `assets/kenney/models.js` にまとめています。

## 作り直す手順

```sh
mkdir kits && cd kits
for r in Starter-Kit-Racing Starter-Kit-3D-Platformer Starter-Kit-City-Builder Starter-Kit-Basic-Scene; do
  git clone --depth 1 https://github.com/KenneyNL/$r.git
done
cd ..
npm install @gltf-transform/core@4 @gltf-transform/extensions@4
node tools/kenney/build.mjs kits assets/kenney/models.js
```

モデルを増やすときは `build.mjs` の `MODELS` と、`models.html` の `MODELS` の両方に追加します。
