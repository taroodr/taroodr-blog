---
title: "Next.jsのprefetchに関して"
excerpt: "Next.jsのprefetchはSSR, SSGなどのページを生成する手法によって取得されるデータの内容が異なるようなのでそれぞれのパターンを簡単に解説する"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2021-02-16T00:35:07.322Z"
author:
  name: taroodr
  picture: "/assets/blog/authors/"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

仕事で Next.js の prefetch がどういった場合に動作するか調査する必要があったので内容をまとめる。

[公式 document](https://nextjs.org/docs/api-reference/next/link) を見てみると以下のように記載されている。

> prefetch - Prefetch the page in the background. Defaults to true. Any <Link /> that is in the viewport (initially or through scroll) will be preloaded. Prefetch can be disabled by passing prefetch={false}. Pages using Static Generation will preload JSON files with the data for faster page transitions

> 静的生成を使用しているページは、ページ遷移を高速化するために、データで JSON ファイルをプリロードします。

この説明だけでも動作のイメージはできるが念のため実際に動かしながら検証してみた。

※以下の検証はすべて Next.js v10 系でおこなっています。

## getServerSideProps を使う場合

prefetch されるのは遷移先で必要になる js のみで、`getServerSideProps` 内で記載されている処理は prefetch の段階では動かない。

```typescript
// prefetchでは実行されない
export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  try {
    // 何らかのデータ取得非同期処理
    return { props: { data } };
  } catch (error) {
    return {};
  }
};
```

※`getServerSideProps` が実装されているページ に `next/link` で遷移した場合は、Next.js はサーバに API リクエストを送信して `getServerSideProps` を実行した結果を含む json を返す。  
`getServerSideProps` の処理は SSR の初回表示のときにだけ動くわけではないので注意が必要。  
こちらも[ドキュメント](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)に記載があるが、 `getServerSideProps` という字面から SSR 時にしか動かないと勘違いしていた。

## getStaticProps で静的に生成されたページの場合

遷移先で必要になる js と`getStaticProps` で事前に生成されている json が prefetch される。

つまりこのような処理が書かれている場合、

```typescript
export async function getStaticProps({ params }) {
  const post = await getPost();
  return {
    props: {
      post,
    },
  };
}
```

`getServerSideProps` とは異なり以下の json が prefetch される。

```typescript
{
  "pageProps": {
    "post": {
      // 省略
    }
  },
  "__N_SSG": true
}
```

## まとめ

以上をまとめると

- `getServerSideProps`
  - prefetch 時には実行されない
- `getStaticProps`
  - 事前に生成されていた json を prefetch 時に取得する

となる。
