# **Conduit - RealWorldプロジェクト**

[Conduit](https://demo.realworld.io/#/)は、Medium.comのクローンサイトであり、RealWorldプロジェクトの一環として開発されました。本プロジェクトでは、Railsを使用してConduitと同じ外観と機能を持つサイトを実装しています。

Conduitは、本番レベルのWebアプリケーションを構築する際の一般的な技術、パターン、実践的なアプローチを示すために設計されています。

[RealWorld公式サイト](https://realworld-docs.netlify.app/docs/implementation-creation/introduction)

## **特徴**

### 実装済み機能

- ユーザー認証（ログイン、登録）
- 記事の作成、編集、削除

### 未実装機能

- 記事へのコメント
- ユーザーと記事のフォロー機能
- タグによる記事のフィルタリング

## **前提条件**

- Ruby 3.0.6
- Rails 7.1.2
- MySQL 8.1.0

## **セットアップ手順**

```bash
git clone [リポジトリのURL]
cd conduit #事前にフォルダは作成してください
bundle install
yarn install
rails db:create
rails db:migrate
rails server
```
## **技術スタック**
- フロントエンド: HTML/CSS (Bootstrap) - RealWorldのテンプレート
- バックエンド: Ruby on Rails
- データベース: MySQL

## **データベースの初期化**
``` bash
rails db:seed
```

## **テストの実行**
```bash
bundle exec rspec
```
