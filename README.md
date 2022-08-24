# 🗽 Next.js実行環境用Dockerコンテナ

**※あくまでベースなので、プロジェクトに合わせて変更して利用する想定です。**


## 必要なもの

- Docker
  - Engine
  - `docker-compose` コマンド
- Next.jsプロジェクト
  - `next` のバージョンは `v12` 以上


## ファイルについて

適宜、プロジェクトに合わせてファイルを取捨選択、変更していただければ良いです。

- `Dockerfile.DEV`
  - 開発環境用のイメージ定義
  - *ローカル環境にNode.jsなど開発に必要なものが揃っている場合は不要かと思います。*
- `Dockerfile.PROD`
  - 本番環境用のイメージ定義
  - *ビルドコマンドやイメージに含めるファイルの変更してください。*
- `docker-compose.yml`
  - コンテナの作成に必要
  - *開発環境用のコンテナが不要な場合は記述を削除してください。*
- `.dockerignore`
  - 本番環境用のイメージビルド時にホスト側からコピーしないものを挙げています。


## 導入手順

1. **ファイルについて**の節で触れたファイルを既存のNext.jsプロジェクトルートへ配置します。
2. 配置したファイルを適宜変更します。
3. `next.config.js` に次のように `output` プロパティを記述します。

```js
module.exports = {
  output: 'standalone',
  // Next.jsのバージョンによっては、experimentalのオプションとして設定
  // experimental: {
  //   outputStandalone: true,
  // },
}
```


## コンテナ・イメージの操作コマンド

`docker-compose.yml` でサービス名、コンテナ名等を書き換えた場合は、読み替えてください。

### イメージビルドとコンテナの起動

開発環境

```bash
docker-compose up -d dev
```

本番環境

```bash
docker-compose build --no-cache prod
docker-compose up -d prod
```

### 開発環境用コンテナでの作業

事前にコンテナを立ち上げて、コンテナ内部でコマンドを実行します。

```bash
docker exec -it nextjs-dev-env /bin/sh
```

### コンテナ・イメージの削除

```bash
docker-compose down --volumes --rmi all
```


## Tips

`package.json` に *npm-scripts* としてコマンドを定義しておくと楽だと思います。次のような感じです。

```json
{
  "scripts": {
    "docker:prod:up": "docker-compose build --no-cache prod && docker-compose up -d prod",
    "docker:prod:stop": "docker-compose stop prod",
    "docker:dev:up": "docker-compose up -d dev",
    "docker:dev:stop": "docker-compose stop dev",
    "docker:down": "docker-compose down --volumes --rmi all"
  }
}
```

もしくは、次のようなShellScriptファイルを用意して、実行するようにしても良いと思います。

```bash
#!/bin/bash
set -e

PROD_FLAG=$1
PROD_FLAG_CHAR="--prod"

if [ "$PROD_FLAG" = "$PROD_FLAG_CHAR" ]; then
  docker-compose build --no-cache prod
  docker-compose up prod
else
  docker-compose up -d dev
  docker exec -it nextjs-dev-env /bin/sh
fi
```

実行方法は次の通りです。

```bash
# 開発
sh run.sh
# 本番
sh run.sh --prod
```


## 参考資料

- https://nextjs.org/docs/advanced-features/output-file-tracing
- https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
