# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## リポジトリ概要

これは複数の実験的なアプリケーションとツールを含むLLMの開発練習用リポジトリです。

## プロジェクト構造

このリポジトリには複数の独立したアプリケーションが含まれています：

### ルートレベル
- ルートのpackage.jsonはBiomeによる共通フォーマット/リントを提供
- 環境設定用のMakefile（.env → .envrc変換）
- タブインデントを使用（biome.jsonで設定）

### サブアプリケーション

1. **pomodoro-timer-by-copilot-claude4/** - SQLiteを使ったNext.jsポモドーロタイマー
   - コマンド: `npm run dev`, `npm run build`, `npm run lint`
   - セッション履歴保存にbetter-sqlite3を使用
   - TailwindCSSスタイリング、TypeScript

2. **pomodoro-timer-by-jules/** - 代替ポモドーロ実装
   - 同様の構造だが実装アプローチが異なる

3. **my-fastmcp-app/** - FastMCPアプリケーション
   - コマンド: `npm start` (`npx fastmcp dev src/index.ts`を実行)
   - Google GenAI統合を使用

4. **my-mastra-app/** - Mastraフレームワークアプリケーション
   - コマンド: `npm run dev` (`mastra dev`を実行)
   - @mastra/coreとGoogle AI SDKを使用

5. **claude-code-test/** - 基本的なJavaScriptテストファイル

## 共通コマンド

### ルートレベル
- `pnpm run format` - Biomeでコードをフォーマット
- `pnpm run lint` - Biomeでリント・自動修正
- `pnpm run check` - Biomeの完全チェックを実行
- `pnpm install` - 全ての依存関係をインストール
- `make setup-env` - direnv用に.envを.envrcに変換
- `make clean` - 一時ファイルを削除
- `make install` - 全ての依存関係をインストール
- `make format` - 全てのコードをフォーマット
- `make lint` - 全てのコードをリント

### Next.jsプロジェクト (pomodoro-timer-*)
- `pnpm run dev` - 開発サーバーを起動（ポート3000）
- `pnpm run build` - 本番用ビルド
- `pnpm run lint` - ESLintチェック

### MCP/Mastraプロジェクト
- 各package.jsonで定義されたstart/devコマンドを使用（pnpm経由で実行）

## コードスタイルガイドライン

.cursor/rules/common-rules.mdcに基づく：
- 要求された内容を正確に実行 - 追加機能なし
- 創意的な拡張なしに指定された要件を正確に実装
- すべての要件を満たす最もシンプルなソリューションを使用
- タスクを完了しながらコード行数を最小化

## フォーマット設定

- フォーマットとリントにBiomeを使用
- タブインデント（幅：2）
- JavaScriptにはダブルクォート
- 推奨リントルールを有効化

## Design Directory ルール

### 概要
llmlab 内でのアプリケーション開発・変更時は、必ず `./design` ディレクトリ配下の設計ドキュメントを参照すること。

### ディレクトリ構造
```
./design/
├── pomodoro-timer-by-copilot-claude4.md
├── pomodoro-timer-by-jules.md
├── my-fastmcp-app.md
├── my-mastra-app.md
└── claude-code-test.md
```

### 運用ルール
1. **開発前の確認**: アプリケーションの開発・変更を行う前に、該当する design ドキュメントを必ず読む
2. **設計ドキュメントの更新**: アプリケーションに変更を加えた場合は、対応する design ドキュメントも同時に更新する
3. **新規アプリケーション**: 新しいアプリケーションを作成する場合は、`./design/{application_name}.md` 形式で設計ドキュメントを作成する
4. **アーキテクチャの一貫性**: design ドキュメントに記載されたアーキテクチャ・技術スタック・開発ガイドラインに従う

### 設計ドキュメントの内容
各設計ドキュメントには以下の情報を含める：
- 概要とアーキテクチャ
- 技術仕様（フレームワーク、言語、依存関係）
- 機能要件
- 開発コマンド
- セットアップ手順
- 開発ガイドライン