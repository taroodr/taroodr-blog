---
title: "JestとReact Testing LibraryでTable Driven Testsを書く"
excerpt: "GolangでTestを書くときによく使われるTable Driven TestsをReactのテストに使うとわかりやすくなると思い検証してみた"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2021-02-25T05:35:07.322Z"
author:
  name: taroodr
  picture: "/assets/blog/authors/"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

Golang で テスト を書くときによく使われる Table Driven Tests を React Component のテストに使うとわかりやすくなるのではと思ったので記事を書くことにしました。

## Table Driven Tests とは

Table Driven Tests は関数への入力値と期待される結果を予め配列としてとして用意しておくパターンです。  
例えば Jest の [Getting Started](https://jestjs.io/docs/en/getting-started) にかかれている sum 関数のテストに Table Driven Tests を使ってみるとこのようになります。

```typescript
// sum.ts
export function sum(a: number, b: number) {
  return a + b;
}

// sum.test.ts
import { sum } from "./sum";

const tests = [
  {
    name: "adds 1 + 2 to equal 3",
    in1: 1,
    in2: 2,
    expect: 3,
  },
  {
    name: "adds 2 + 4 to equal 6",
    in1: 2,
    in2: 4,
    expect: 6,
  },
];

for (const t of tests) {
  test(t.name, () => {
    expect(sum(t.in1, t.in2)).toBe(t.expect);
  });
}
```

このような Table Driven Tests を使うと以下のメリットがあります。（個人の感想）

- テスト用の定形コードが増えてしまうのを抑えられる
- テストケースを増やすのが簡単
- input に対して求められる output がわかりやすい

`input に対して求められる output がわかりやすい` という点が props(input)によって render される結果(output)が変化する React Component のテストにマッチするのではないかと考えました。

## React Component のテストを Table Driven Tests でやってみる

以下の Modal Component のテストを考えます。  
この Component は props によって、

- closeText が変わる
- button の表示・非表示が変わる

というシンプルな Component です。

```typescript
// modal.tsx
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  title: string;
  closeText?: string;
  onCancel?: () => void;
};

export const Modal = ({
  children,
  title,
  closeText = "閉じる",
  onClose,
}: PropsWithChildren<ModalProps>) => {
  if (typeof window === "undefined") return null;
  return createPortal(
    <div
      className="absolute top-0 left-0 bg-opacity-75 bg-black w-full h-full"
      onClick={onClose}
    >
      <div className="flex flex-col absolute p-4 inset-0 m-auto w-1/2 h-1/2 bg-white shadow-lg rounded-lg">
        <h2>{title}</h2>
        <div>{children}</div>
        <button
          className="bg-purple-700 text-white px-2 py-1 rounded"
          onClick={onClose}
        >
          {closeText}
        </button>
      </div>
    </div>,
    document.body
  );
};
```

まずは Table Driven Tests を使わずに素直に書いてみます。

```typescript
// modal.test.tsx
import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Modal } from ".";

describe("Modal", () => {
  test("render Modal component. should render button.", () => {
    render(
      <Modal
        title="title"
        onClose={() => {
          console.log("close");
        }}
      >
        <p>children</p>
      </Modal>
    );

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("render Modal component. should not render button.", () => {
    render(
      <Modal title="title">
        <p>children</p>
      </Modal>
    );
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });
});
```

定形コードが重複してしまっていますね。  
テストケースが増えてくると読みづらくなるパターンもでてきそうです。  
これを Table Driven Tests で書き換えてみます。

```typescript
// modal.test.tsx
import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Modal, ModalProps } from ".";

type tests = {
  name: string;
  props: ModalProps;
  expect: () => void;
}[];

describe("Modal", () => {
  const tests: tests = [
    {
      name: "render Modal component. should render button.",
      props: {
        title: "title",
        onClose: () => {
          console.log("close");
        },
        closeText: "close",
      },
      expect: () => {
        expect(screen.getByText("title")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
      },
    },
    {
      name: "render Modal component. should not render button.",
      props: {
        title: "title",
      },
      expect: () => {
        expect(screen.getByText("title")).toBeInTheDocument();
        expect(screen.queryByRole("button")).toBeNull;
      },
    },
  ];

  for (const t of tests) {
    test(t.name, () => {
      render(
        <Modal
          title={t.props.title}
          onClose={t.props.onClose}
          closeText={t.props.closeText}
        >
          <p>children</p>
        </Modal>
      );
      t.expect();
    });
  }
});
```

render メソッド呼び出しのコードが 1 箇所になり先程までの発生していた重複がなくなりました。  
また、与えられる props によって Component がどう変化していくのかが、テストケースを見ればわかるのでコードを読むコストが少し下がるように感じます。

※Table Driven Tests 用の型を書いているので面倒に思うかもしれませんが、ほぼ定形コードなので問題なしとします。

## まとめ

- Table Driven Tests を使うことで不要なコードの重複がなくなる
- 与えられる props によって Component がどのように変化するのかがわかりやすくなる

## 感想

どうようの記事が見当たらなかったので書いてみましたが、私自身このパターンでのテストをあまり書いていないのでうまく行かないパターンがあるかもしれません。  
新しい発見があれば追記しようと思います。

## おまけ TypeScript + React 環境に Jest + React Testing Library を導入する

### jest のセットアップ

package インストール

```bash
yarn add -D jest ts-jest @types/jest
```

jest の設定ファイルを作成

```bash
yarn ts-jest config:init
```

以下のファイルができあがる。
実行環境は `jsdom` にしたいので `testEnvironment: "node",` は削除する。

```javascript
// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
```

あとは、test を書いて `yarn jest` でテストが実行できる。

### React Testing Library の導入

package インストール

```bash
yarn add -D @testing-library/react @testing-library/jest-dom
```
