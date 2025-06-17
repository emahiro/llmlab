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
- `npm run format` - Biomeでコードをフォーマット
- `npm run lint` - Biomeでリント・自動修正
- `npm run check` - Biomeの完全チェックを実行
- `make setup-env` - direnv用に.envを.envrcに変換
- `make clean` - 一時ファイルを削除

### Next.jsプロジェクト (pomodoro-timer-*)
- `npm run dev` - 開発サーバーを起動（ポート3000）
- `npm run build` - 本番用ビルド
- `npm run lint` - ESLintチェック

### MCP/Mastraプロジェクト
- 各package.jsonで定義されたstart/devコマンドを使用

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