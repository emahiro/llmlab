# FastMCP Application

## 概要
FastMCP フレームワークを使用したテストアプリケーション

## アーキテクチャ
- **フレームワーク**: FastMCP v1.21.0
- **言語**: TypeScript
- **モジュールシステム**: ES Modules
- **AI統合**: Google GenAI v0.7.0
- **バリデーション**: Zod v3.24.2

## 技術仕様
### エントリーポイント
- **メインファイル**: `src/index.ts`
- **パッケージタイプ**: ES Module

### 開発コマンド
- `npm start` - FastMCP 開発サーバー起動 (`npx fastmcp dev src/index.ts`)

### 依存関係
#### 本番依存関係
- `fastmcp` (^1.21.0) - コアフレームワーク
- `zod` (^3.24.2) - スキーマバリデーション
- `@google/genai` (^0.7.0) - Google AI 統合
- `@types/dotenv` (^8.2.3) - 環境変数型定義
- `@types/node` (^22.14.0) - Node.js 型定義

## 機能要件
- FastMCP プロトコルによる MCP サーバー実装
- Google GenAI との統合
- TypeScript による型安全な開発環境

## 開発ガイドライン
- ES Modules を使用
- TypeScript による厳密な型チェック
- Zod によるランタイムバリデーション
- FastMCP のベストプラクティスに従う

## セットアップ手順
1. プロジェクトディレクトリに移動: `cd my-fastmcp-app`
2. 依存関係をインストール: `npm install`
3. 開発サーバーを起動: `npm start`

## 設定
- 環境変数は .env ファイルで管理
- Google AI API キーの設定が必要