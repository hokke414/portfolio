# Portfolio / Blog

学生エンジニア hokke414 のポートフォリオ兼ブログです。
静的サイト構成で、プロフィール、活動記録、技術記事、連絡先を公開しています。

## サイト概要

- Home: サイト全体の導線、技術スタック、最新記事6件を表示
- Bio/Project: 自己紹介、現在の注力領域、履歴、技術スタック
- Blog: 記事一覧、タグ絞り込み、ページネーション
- Contact: メール・GitHub・X の連絡先
- Article pages: 各記事本文 + おすすめ記事

## 主な機能

- 記事データ一元管理
	- `script.js` の `articles` 配列で記事カード情報を管理
- 記事の新着順表示
	- `publishedAt` を解析して降順ソート
- タグ絞り込み
	- Blog ページで「すべて / 開発 / 記事 / その他 / お知らせ」を切り替え
- ページネーション
	- 1ページあたり15件表示
- 最新記事プレビュー
	- Home に最新6件を表示
- おすすめ記事表示
	- Blog 一覧ページにランダム3件
	- 各記事ページに「現在の記事を除いた」ランダム3件
- テーマ切り替え
	- ライト/ダーク切り替え
	- `localStorage` に保存して再訪時に復元
- 計測・検証
	- Google Analytics（gtag）導入
	- Search Console 用検証ファイル配置

## 技術スタック

- HTML
- CSS
- JavaScript（Vanilla）
- Google Fonts（M PLUS 1p, Space Grotesk）

## ディレクトリ構成

```
.
├─ index.html
├─ bio-project.html
├─ blog.html
├─ contact.html
├─ style.css
├─ script.js
├─ google9f11c64683ce9e1a.html
├─ blogs/
│  ├─ article1.html ... article7.html
│  └─ files/
│     └─ stacks/
└─ txt/
	 ├─ template.txt
	 └─ todo.txt
```

## ローカルでの確認方法

このプロジェクトはビルド不要の静的サイトです。

1. 任意の方法でローカルサーバーを起動
2. `index.html` をブラウザで開く

例（Python）:

```bash
python -m http.server 8000
```

`http://localhost:8000` にアクセスしてください。

## 記事追加フロー

1. `txt/template.txt` をコピーして新しい記事HTMLを作成
2. `blogs/articleX.html` の本文とメタ情報を編集
	 - description
	 - title
	 - 公開日
	 - 画像パス
	 - 本文
	 - 必要なら外部リンク
3. `script.js` の `articles` 配列に記事情報を追加または更新
	 - title
	 - publishedAt（`YYYY年M月D日` 形式推奨）
	 - description
	 - img
	 - tag
	 - link
4. 表示確認後にコミット

## 補足

- 記事カードの並び順は公開日ベースです。
- `publishedAt` が日付形式でない場合は古い扱いになります（例: 「準備中」）。