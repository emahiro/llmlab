.PHONY: help setup-env clean format install dev build lint

# デフォルトターゲット
help:
	@echo "使用可能なコマンド:"
	@echo "  make setup-env   - .envから環境変数を.envrcに設定します"
	@echo "  make clean       - 一時ファイルを削除します"
	@echo "  make install     - 全ての依存関係をインストールします"
	@echo "  make format      - 全てのコードをフォーマットします"
	@echo "  make lint        - 全てのコードをリントします"
# .envから.envrcを作成するセットアップコマンド
setup-env:
	@echo "環境変数のセットアップを開始します..."
	@if [ ! -f .env ]; then \
		echo ".envファイルが見つかりません。サンプルからコピーします。"; \
		cp .env.sample .env 2>/dev/null || echo ".env.sampleが見つからないため、.envを手動で作成してください。"; \
	fi
	@cat .env | grep -v '^#' | grep -v '^$$' > .envrc.tmp
	@echo '# このファイルは自動生成されています。直接編集しないでください。' > .envrc
	@echo '# .envを編集し、`make setup-env`を実行してください。' >> .envrc
	@echo '' >> .envrc
	@while IFS= read -r line; do \
		echo "export $$line" >> .envrc; \
	done < .envrc.tmp
	@rm .envrc.tmp
	@echo '# プロジェクト固有の設定' >> .envrc
	@echo 'PATH_add bin' >> .envrc
	@echo '' >> .envrc
	@echo 'echo "環境変数を読み込みました"' >> .envrc
	@echo ".envrcの作成が完了しました。"
	@echo "direnvが有効になっている場合は 'direnv allow' を実行してください。"

# 依存関係のインストール
install:
	@echo "全ての依存関係をインストールしています..."
	pnpm install
	@echo "インストールが完了しました。"

# フォーマット
format:
	@echo "全てのコードをフォーマットしています..."
	pnpm run format
	@echo "フォーマットが完了しました。"

# リント
lint:
	@echo "全てのコードをリントしています..."
	pnpm run lint
	@echo "リントが完了しました。"

# クリーンアップ
clean:
	@echo "一時ファイルを削除しています..."
	@rm -f .envrc.tmp
	@echo "完了しました。"
