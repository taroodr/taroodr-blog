---
title: "TypeScriptで型パズルを始めてみよう"
excerpt: "TypeScript の高度な型システム学びたいけど、何からやればいいのか、たまに使うけど忘れるといった方におすすめのものを見つけました"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2021-02-07T05:35:07.322Z"
author:
  name: taroodr
  picture: "/assets/blog/authors/"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

## はじめに

TypeScript の高度な型システム学びたいけど

- 何からやればいいのか
- たまに使うけど忘れる

といった方におすすめのものを見つけました

社内 LT で発表したものを編集した記事になります。

## type-challenges

[type-challenges](https://github.com/type-challenges/type-challenges)

> This project is aim to help you better understand how the type system works, writing your own utilities, or just having fun with the challenges.
> このプロジェクトの目的は、型システムがどのように動作するかをよりよく理解したり、独自のユーティリティを書いたり、あるいはチャレンジを楽しんだりすることです。

詳しくは type-challenges の README か下記の qiita をどうぞ
[https://qiita.com/ryo2132/items/925b96838dd8cca7cebd](https://qiita.com/ryo2132/items/925b96838dd8cca7cebd)

## 型パズルやってみよう

難易度順にいくつか用意されているので、easy から 1 つやってみることにします。
![](https://storage.googleapis.com/zenn-user-upload/wl4brk0ulrgtm6xog6snq8ul9u9i)

雑に問題を訳すと皆さんご存知？の `Pick<T, K>` 型を自分で書いてみようになります

[https://github.com/type-challenges/type-challenges/blob/master/questions/4-easy-pick/README.md](https://github.com/type-challenges/type-challenges/blob/master/questions/4-easy-pick/README.md)

![](https://storage.googleapis.com/zenn-user-upload/3fb8jntt6oisxnzqyy3818k8dyja)

`Take the Challenge` をクリックすると 問題が記載された ts playground が出てきます。

### 回答

#### Pick のおさらい

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type p = Pick<Todo, "title">;
// pの型は↓になる
type p = {
  title: string;
};
```

#### 回答 ↓

[回答 TypeScript playground が開きます](https://www.typescriptlang.org/play?#code/PQKgUABBAsELQQAoEsDGBrAPAFQDQQGkA+SeOci0gIwE8IBBAOwBcALAe0boDEBXCABQABAIYsAZrwCUEAMQBTEQGc6s3o2Sc5VXsgA2zOMkalSs8xACKveUuaaTUUgEkAtgAc981-JYQ28hA6+obGEAAGKBg4+MThEADmvvIATmgQAO7IbOy8zBC8SsYJENkAdKZQAMKcdim8qMxKECL+NO6BtBDuaOjF-qyBSvL57OLdKewdKfa2Edjx4pOuEQThlRDc7CkQ8gAeIh5eG+GnTaTGzKniIqiB2OwAJuwQAN6kUPbMXgBcEHXFD4QR62VBpdz2Th-AGMBJA1DsI4jeSPP5UdjsLxiUgAXw2zHa9ye7EQKXkADdkPIMhAALwQACyNCiWAez3wAHIvl4ORAAD4QDkIpFXR4ckhOKAIxh2fzEv5sklkynUulvIGfbK-QVVLGMCCTREc3AaiDCzzI1EQG56YYmqB4qCndaSiBECAANSpNK0AHFsgAJXhUP6sZjMdxKH7AYBNVCsMoAKyUZW2CWA0DAIGAYFzoAgAH0i8WS8WIABNXI7GogiAB1KBUtNosQbO53MEjqM5m9GKEXZ7K6MR7NdDyGhjCDYd3095QADa7lK+oIAF0FYvV2A8WBO4EPGqmSycMTOdz5OK8yBC83S1PbPkqso5re723kB5tvlXhAAKIAR14EQ9HwX89g6RoIBxa1lkFIQ9zgeNgK8WFbGAPJ9CUDkO0JM1n2ael51IMCIOYTAAKAvRyPA+RGhRABGfAj17RUzy1C8iE4+0-xoxpyMA4DqNIlEACYmJ7aJWMFc9eQFIVEQtUVxS40gYwgeClDgfZSK0lJJhSUhmMk09pPY2TBXNLwlP5QVjHJYDkDFIgTS3MBLmuW4iWedVNW+eRoWYNJYVIEElDBZAIQcAKgrhKUFKslE0QxPVtxwrt0DVMcJ3GRV23clIbjuHjhMeeifP8djosBHd8sKwISNo0URPK88quCuKRUSoJksUEwdz3bo1WPKSuTMkhd1w-J6UVedRr8jlXLAfNXxLTZeBmQYdgAZSuSMbxWgtWxzUBSHdLbWBEMkIAndb-kxDDalDcNI2jWMwoTZNUxSdNoGAMQlAyVJTs9b07r0B6ZSeiMoxjOMPpTNMM2AJR7shGVgYZbZAiqC69BQpIowgMNodeuGkwR76sxzMAgA)

#### 説明

```typescript
type MyPick<T, K extends keyof T> = {
  [p in K]: T[p];
};
```

##### `K extends keyof T` の説明

keyof T で T の union Type が取得できる
![](https://storage.googleapis.com/zenn-user-upload/2iegl2oq64h9l0ii1nstyy4bh758)

`K extends keyof T` は K が `keyof T` 型でないと駄目なことを表している。

##### `[P in K]: T[P]` の説明

mapped type と呼ばれる型です。
簡単に説明すると

> {[P in K]: T[P]}という型の意味は、「K 型の文字列 P に対して、型 T[P]を持つプロパティ P が存在するようなオブジェクトの型」

です。
難しいですね。

今回の場合だと

```typescript
type MyPick<T, K extends keyof T> = {
  [p in K]: T[p];
};

type mp = MyPick<Todo, "title">;
```

T が Todo 型、K が Todo 型の key の union type `'title' | 'completed' | 'description'` となります。
つまり、 `'title' | 'completed' | 'description'` 型の文字列 P に対して、型 `Todo['title' | 'completed' | 'description']` をもつプロパティ P が存在するオブジェクトの型です。

参考
[https://qiita.com/ryo2132/items/925b96838dd8cca7cebd](https://qiita.com/ryo2132/items/925b96838dd8cca7cebd)
[https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#conditional-types](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#conditional-types)
