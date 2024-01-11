# 始めに、OpenAPIに入門する

- [始めに、OpenAPIに入門する](#始めにopenapiに入門する)
  - [OpenAPIとは](#openapiとは)
  - [主機能](#主機能)
  - [記述形式](#記述形式)
  - [基本構造](#基本構造)
  - [項目詳細](#項目詳細)
    - [info](#info)
    - [servers](#servers)
    - [paths](#paths)
      - [`paths`オブジェクト](#pathsオブジェクト)
      - [`path item`オブジェクト](#path-itemオブジェクト)
    - [components](#components)
    - [security](#security)
    - [tags](#tags)
    - [externalDocs](#externaldocs)
  - [まとめ](#まとめ)
  - [環境構築](#環境構築)

## OpenAPIとは
Web サービスを記述、生成、利用、視覚化するための機械可読インターフェイス定義言語の仕様。

実際のサンプルはこちらで確認できます。  
[https://takuya-motoshima.github.io/learn-open-api/](https://takuya-motoshima.github.io/learn-open-api/)

## 主機能
- API仕様に沿ったドキュメントの作成
- モックサーバーの作成
- テストの実行

## 記述形式
- YAML形式
- JSON形式

## 基本構造
本ドキュメントでは、YAML形式で記述。

```yml
openapi: 3.0.2
info:
  ...
servers:
  ...
paths:
  ...
```

|項目|必須|説明|
|--|--|--|
|`openapi`|YES|セマンティックなバージョニングを記述。今回は`3.0.2`を用いる。詳しくは[ドキュメント](https://spec.openapis.org/oas/latest.html#openapi-object)を参照。|
|`info`|YES|APIのメタデータを記述。|
|`servers`||APIを提供するサーバーを記述。配列で複数記述可能(STG, PROD等)。|
|`paths`|YES|APIで利用可能なエンドポイントやメソッドを記述。|
|`components`||APIで使用するオブジェクトスキーマを記述。|
|`security`||API全体を通して使用可能なセキュリティ仕様を記述。(OAuth等)|
|`tags`||APIで使用されるタグのリスト。各種ツールによってパースされる際は、記述された順序で出力される。タグ名はユニークで無ければならない。|
|`externalDocs`||外部ドキュメントを記述(API仕様書等)。|

## 項目詳細
### info
ドキュメント: [Info Object](https://spec.openapis.org/oas/latest.html#info-object)

```yml
info:
  title: サンプルAPI
  description: A short description of API.
  termsOfService: http://example.com/terms/
  contact:
    name: API support
    url: http://www.example.com/support
    email: support@example.com
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
  version: '1.0.0'
```

|項目|必須|説明|
|--|--|--|
|`title`|YES|APIの名称。|
|`description`||APIの簡潔な説明。[CommonMarkシンタックス](https://spec.commonmark.org/)が使える。|
|`termsOfService`||APIの利用規約。URL形式でなければならない。|
|`contact`||コンタクト情報。(サポートページのURLやメールアドレス等)|
|`license`||ライセンス情報。ライセンスページのURLも記述可能。|
|`version`|YES|APIドキュメントのバージョン。|

### servers
ドキュメント: [Server Object](https://spec.openapis.org/oas/latest.html#server-object)

```yml
servers:
  - url: https://api.sample-server.com/v1
    description: 本番環境
  - url: https://stg.sample-server.com/v1
    description: テスト環境
```

|項目|必須|説明|
|--|--|--|
|`url`|YES|APIのベースURL。|
|`description`||APIサーバーの説明。|

### paths
ドキュメント: [Paths Object](https://spec.openapis.org/oas/latest.html#paths-object)

```yml
paths:
  /users:
    get:
      description: Returns an array of User model
      responses:
        '200':
          description: A JSON array of User model
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
                example:
                  - id: 1
                    name: John Doe
                  - id: 2
                    name: Jane Doe
```

#### `paths`オブジェクト
|項目|説明|
|--|--|
|`/{path}`|各エンドポイントのパスを記述。`servers`で定義したURLにこのパスを結合したものが最終的なエンドポイントとなる。|

#### `path item`オブジェクト
|項目|説明|
|--|--|
|summary|エンドポイントのサマリ。|
|descriptions|エンドポイントの簡潔な説明。CommonMarkシンタックスを使用可能。|
|get, post, delete...	|HTTPメソッドを定義。GET, PUT, POST, DELETE, OPTIONS, DELETE, PATCH, TRACEが使用可能。|

### components
ドキュメント: [Components Object](https://spec.openapis.org/oas/latest.html#components-object)

- `schemas`: User等のモデル
- `requestBodies`: リクエストボディ
- `responses`: APIレスポンス
- `headers`: リクエストヘッダ
- `parameters`: リクエストパラメータ

等、API定義で再利用可能なオブジェクトを定義できる。

`components`に定義したモデルは、`paths`で記述したように
```yml
$ref: '#/components/schemas/User'
```
のように参照する。

```yml
components:
  schemas:
    User:
      type: object
      required:
        - id
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
```

### security
ドキュメント: [Security Requirement Object](https://spec.openapis.org/oas/latest.html#security-requirement-object)

```yml
security: 
  - api_key: []
  - users_auth:
    - write:users
    - read:users
```

### tags
ドキュメント: [Tag Object](https://spec.openapis.org/oas/latest.html#tag-object)

|項目|必須|説明|
|--|--|--|
|`name`|YES|タグ名称。|
|`description`||タグの説明。|
|`externalDocs`||外部ドキュメント|

### externalDocs
ドキュメント: [External Documentation Object](https://spec.openapis.org/oas/latest.html#external-documentation-object)

```yml
description: Find more info here
url: https://example.com
```

|項目|必須|説明|
|--|--|--|
|`description`||外部ドキュメントの説明。|
|`url`|YES|外部ドキュメントのURL。|

## まとめ
以上、OpenAPIの基本的な部分を紹介しました。  
OpenAPIは`Swagger 2.0`をベースにしていますが、記法が異なる部分が多いため、公式ドキュメントをしっかり読み込んで行く必要があります。  
手軽にRESTful APIの定義ができるうえ、`Amazon API Gateway`と連携し定義のインポート/エクスポートが出来たりと非常に便利なため、積極的に利用していきたいです。  

[GETTING_STARTED.md](GETTING_STARTED.md) では実際にサンプルを作りながらOpenAPI仕様を学習できます。

## 環境構築
1. [https://code.visualstudio.com/](https://code.visualstudio.com/) から環境に合ったVSCodeのインストーラーをダウンロードします。
1. ダウンロードしたインストーラを実行しVSCodeをインストールします。
1. OpenAPI作成環境を整えるための拡張機能をインストールします。VSCodeを起動し、Extensionsタブから次の拡張機能をインストールしてください。
    |パッケージ名|説明|
    |--|--|
    |`OpenAPI(Swagger) Editor`|OpenAPI定義ファイルの新規作成、ナビゲーション、参照へのジャンプ、インテリセンス、プレビュー（`Shift+Alt+P`）などができます。|
    |`OpenApi Snippets`|OpenAPIのコード補完機能です。|