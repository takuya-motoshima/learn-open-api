# OpenAPI入門
<!-- 参考:https://zenn.dev/mizu4ma/articles/3c29f05ab82739-->

このセクションではOpenAPIの基礎を学び、次の状態を目指します。
- OpenAPIの登場人物がわかる
- OpenAPI仕様を読める
- OpenAPI仕様を書ける
- OpenAPIの公式ドキュメントを参照できる

## OpenAPIのサンプル
次のような仕様のAPIを考えます。
1. IDを指定して、特定のペットの情報を取得
1. IDが未指定の場合、HTTP400を返却
1. 存在しないIDの場合、HTTP404を返却
1. エンドポイントは次の通り：`/pets/1`
   
この仕様をOpenAPI仕様で定義すると以下のようになります。
```yml
openapi: '3.0.2'
info:
  title: Pet API
  version: '1.0'
servers:
  - url: https://dev.sample-server.com/v1
    description: Development server
  - url: https://stg.sample-server.com/v1
    description: Staging server
  - url: https://api.sample-server.com/v1
    description: Production server
paths:
  /pets/{petId}:
    get:
      tags:
        - pet
      summary: Find pet by ID
      description: Returns a single pet
      operationId: getPetById
      parameters:
        - name: petId
          in: path
          description: ID of pet to return
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
        '400':
          description: Invalid ID supplied
        '404':
          description: Pet not found
components:
  schemas:
    Pet:
      type: object
      required:
        - id
      properties:
        id:
          type: integer
        name:
          type: string
```

<!-- サンプルのOpenAPI仕様の説明です。[]で括られた key はプレースホルダー、value は key の説明です。
```yml
openapi: OpenAPI仕様バージョン
info:
  title: API名称
  version: APIドキュメントバージョン
servers:
  - url: APIのベースURL
    description: APIサーバーの説明
paths:
  [エンドポイントパス]:
    [HTTPメソッド]:
      tags:
        - 紐づけるタグ
      summary: エンドポイント概要
      description: エンドポイント説明
      operationId: エンドポイントID
      parameters:
        - name: パラメータ名称
          in: path|query|header|cookie
          description: パラメータ説明
          required: true|false
          schema:
            type: データ型
      responses:
        [HTTPステータスコード]:
          description: レスポンス説明
          content:
            [Content-type]:
              schema:
                $ref: 参照先コンポーネントパス
components:
  [再利用可能なオブジェクトの種類]:
    [オブジェクトにマッピングされるコンポーネント名]:
      type: データ型
      required:
        - 必須プロパティ
      properties:
        [プロパティ名]:
          type: データ型
``` -->

## OpenAPI仕様の概要
以下の公開されているSwaggerEditorにアクセスすると、OpenAPI仕様の全体像がわかります。  
ドキュメント: [Swagger Editor](https://editor.swagger.io/)

SwaggerEditorのOpenAPI仕様を図示します。
枠の重なりは、同じ構造の繰り返しを意味します。

![openapi-specification.svg](screencaps/openapi-specification.svg)

図で捉えると、大きく2分割できます
- `paths`セクション: API仕様を定義。
- `components`セクション: コンポーネント化された定義を`paths`セクションで参照。定義をコンポーネント化することで、一貫性を保てます。


各セクションを解説する前に、OpenAPIが扱えるデータ型を紹介します。

## OpenAPIが扱えるデータ型
|型|フォーマット|説明|
|--|--|--|
|integer|int32|符号付32bits|
|integer|int64|符号付64bits|
|number|float||
|number|double||
|string|||
|boolean|||
|object|||
|array|||

上記の型を使用してAPI仕様を定義します。
ドキュメント: [Data Type](https://spec.openapis.org/oas/latest.html#data-types)

## `paths`セクション
API仕様を定義するセクションです。

図解した`paths`セクションを再度添付します。

![paths-section.svg](screencaps/paths-section.svg)

サンプルのOpenAPI仕様を元に説明します。[]で括られた key はプレースホルダー、value は key の説明です。
```yml
paths:
  [エンドポイントパス]:
    [HTTPメソッド]:
      tags:
        - 紐づけるタグ
      summary: エンドポイント概要
      description: エンドポイント説明
      operationId: エンドポイントID
      parameters:
        - name: パラメータ名称
          in: path|query|header|cookie
          description: パラメータ説明
          required: true|false
          schema:
            type: データ型
      responses:
        [HTTPステータスコード]:
          description: レスポンス説明
          content:
            [Content-type]:
              schema:
                $ref: 参照先コンポーネントパス
```

捕捉:
- `parameters`: パス、クエリパラメータ、HTTPヘッダーなどから受け取るパラメータを定義。
  - `in`
    - `path`: `/pets/{petId}`のように波括弧で括った部分のパスパラメータを定義。
    - `query`: `/pets?category=xxx`のようにクエリパラメータを定義。
    - `header `: 期待するカスタムヘッダー。ヘッダー名は大文字小文字を区別しないルールとなっています。
    - `cookie`: APIに特定の`cookie`値を渡すための設定。
- `requestBody`: リクエストボディからパラメータを受け取る場合に、以下のような形式で定義。
    ```yml
    requestBody:
      description: Update an existent pet in the store
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Pet"
      required: true
    ```

ドキュメント: [Paths Object](https://spec.openapis.org/oas/latest.html#paths-object)
