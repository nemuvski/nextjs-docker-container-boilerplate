# ð½ Next.jså®è¡ç°å¢ç¨Dockerã³ã³ãã

**â»ããã¾ã§ãã¼ã¹ãªã®ã§ããã­ã¸ã§ã¯ãã«åããã¦å¤æ´ãã¦å©ç¨ããæ³å®ã§ãã**


## å¿è¦ãªãã®

- Docker
  - Engine
  - `docker-compose` ã³ãã³ã
- Next.jsãã­ã¸ã§ã¯ã
  - `next` ã®ãã¼ã¸ã§ã³ã¯ `v12` ä»¥ä¸


## ãã¡ã¤ã«ã«ã¤ãã¦

é©å®ããã­ã¸ã§ã¯ãã«åããã¦ãã¡ã¤ã«ãåæ¨é¸æãå¤æ´ãã¦ããã ããã°è¯ãã§ãã

- `Dockerfile.DEV`
  - éçºç°å¢ç¨ã®ã¤ã¡ã¼ã¸å®ç¾©
  - *ã­ã¼ã«ã«ç°å¢ã«Node.jsãªã©éçºã«å¿è¦ãªãã®ãæã£ã¦ããå ´åã¯ä¸è¦ãã¨æãã¾ãã*
- `Dockerfile.PROD`
  - æ¬çªç°å¢ç¨ã®ã¤ã¡ã¼ã¸å®ç¾©
  - *ãã«ãã³ãã³ããã¤ã¡ã¼ã¸ã«å«ãããã¡ã¤ã«ã®å¤æ´ãã¦ãã ããã*
- `docker-compose.yml`
  - ã³ã³ããã®ä½æã«å¿è¦
  - *éçºç°å¢ç¨ã®ã³ã³ãããä¸è¦ãªå ´åã¯è¨è¿°ãåé¤ãã¦ãã ããã*
- `.dockerignore`
  - æ¬çªç°å¢ç¨ã®ã¤ã¡ã¼ã¸ãã«ãæã«ãã¹ãå´ããã³ãã¼ããªããã®ãæãã¦ãã¾ãã


## å°å¥æé 

1. **ãã¡ã¤ã«ã«ã¤ãã¦**ã®ç¯ã§è§¦ãããã¡ã¤ã«ãæ¢å­ã®Next.jsãã­ã¸ã§ã¯ãã«ã¼ãã¸éç½®ãã¾ãã
2. éç½®ãããã¡ã¤ã«ãé©å®å¤æ´ãã¾ãã
3. `next.config.js` ã«æ¬¡ã®ããã« `output` ãã­ããã£ãè¨è¿°ãã¾ãã

```js
module.exports = {
  output: 'standalone',
  // Next.jsã®ãã¼ã¸ã§ã³ã«ãã£ã¦ã¯ãexperimentalã®ãªãã·ã§ã³ã¨ãã¦è¨­å®
  // experimental: {
  //   outputStandalone: true,
  // },
}
```


## ã³ã³ããã»ã¤ã¡ã¼ã¸ã®æä½ã³ãã³ã

`docker-compose.yml` ã§ãµã¼ãã¹åãã³ã³ããåç­ãæ¸ãæããå ´åã¯ãèª­ã¿æ¿ãã¦ãã ããã

### ã¤ã¡ã¼ã¸ãã«ãã¨ã³ã³ããã®èµ·å

éçºç°å¢

```bash
docker-compose up -d dev
```

æ¬çªç°å¢

```bash
docker-compose build --no-cache prod
docker-compose up -d prod
```

### éçºç°å¢ç¨ã³ã³ããã§ã®ä½æ¥­

äºåã«ã³ã³ãããç«ã¡ä¸ãã¦ãã³ã³ããåé¨ã§ã³ãã³ããå®è¡ãã¾ãã

```bash
docker exec -it nextjs-dev-env /bin/sh
```

### ã³ã³ããã»ã¤ã¡ã¼ã¸ã®åé¤

```bash
docker-compose down --volumes --rmi all
```


## Tips

`package.json` ã« *npm-scripts* ã¨ãã¦ã³ãã³ããå®ç¾©ãã¦ããã¨æ¥½ã ã¨æãã¾ããæ¬¡ã®ãããªæãã§ãã

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

ãããã¯ãæ¬¡ã®ãããªShellScriptãã¡ã¤ã«ãç¨æãã¦ãå®è¡ããããã«ãã¦ãè¯ãã¨æãã¾ãã

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

å®è¡æ¹æ³ã¯æ¬¡ã®éãã§ãã

```bash
# éçº
sh run.sh
# æ¬çª
sh run.sh --prod
```


## åèè³æ

- https://nextjs.org/docs/advanced-features/output-file-tracing
- https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
