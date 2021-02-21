---
title: "tailwind.cssで作るdatepicker"
excerpt: "tailwind.cssでdate-pickerを作る方法のメモ.ロジック部分は外部パッケージを使うことでササッと作れます"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2021-02-16T00:35:07.322Z"
author:
  name: taroodr
  picture: "/assets/blog/authors/"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

個人で作っているプロジェクトで date-picker コンポーネントが必要になり実装した内容のメモ。

[react-dates](https://github.com/airbnb/react-dates)のような UI まで含まれるライブラリを使うことも考えたが、tailwind.css を使っていることもありスタイリングには tailwind.css を使いたいので別の方法で実装することにする。  
ただ、ロジック含めてすべてスクラッチ書くと時間がかかるのでサクッとつくるために[react-datepicker](https://github.com/tresko/react-datepicker)という package のロジック部分だけを抜き出した custom hooks である[@datepicker-react/hooks](https://github.com/tresko/react-datepicker/tree/master/packages/hooks)
を使うことにした。

## インストール

```bash
yarn add @datepicker-react/hooks
```

## 参考

https://tresko.dev/create-a-custom-react-date-picker-in-10-minutes
