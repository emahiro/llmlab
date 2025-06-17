# Mastra Framework Application

## 概要
Mastra フレームワークを使用したアプリケーション

## アーキテクチャ
- **フレームワーク**: Mastra v0.4.4
- **コアライブラリ**: @mastra/core v0.7.0
- **言語**: TypeScript v5.8.3
- **モジュールシステム**: ES Modules
- **AI統合**: Google AI SDK v1.2.8
- **MCP統合**: @mastra/mcp v0.3.6

## 技術仕様
### 開発環境
- **ランタイム**: tsx v4.19.3
- **型定義**: @types/node v22.14.0
- **バリデーション**: Zod v3.24.2

### 開発コマンド
- `npm run dev` - Mastra 開発サーバー起動 (`mastra dev`)
- `npm test` - テスト実行 (未実装)

### プロジェクト構造
- **エントリーポイント**: `index.js`
- **設定ファイル**: `tsconfig.json`

## 機能要件
- Mastra フレームワークによるエージェント・ツール管理
- Google AI SDK との統合
- MCP (Model Context Protocol) サポート
- TypeScript による型安全な開発

## 依存関係
### 本番依存関係
- `@ai-sdk/google` (^1.2.8) - Google AI SDK
- `@mastra/core` (^0.7.0) - Mastra コアライブラリ
- `@mastra/mcp` (^0.3.6) - MCP 統合
- `mastra` (^0.4.4) - Mastra CLI/フレームワーク
- `zod` (^3.24.2) - スキーマバリデーション

### 開発依存関係
- `@types/node` (^22.14.0) - Node.js 型定義
- `tsx` (^4.19.3) - TypeScript 実行環境
- `typescript` (^5.8.3) - TypeScript コンパイラ

## 開発ガイドライン
- ES Modules を使用
- TypeScript による厳密な型チェック
- Mastra のエージェント・ツールパターンに従う
- Google AI SDK の非同期パターンを活用

## セットアップ手順
1. プロジェクトディレクトリに移動: `cd my-mastra-app`
2. 依存関係をインストール: `npm install`
3. 開発サーバーを起動: `npm run dev`

## 設定
- Google AI API キーの設定が必要
- Mastra 設定ファイルによるエージェント・ツール定義