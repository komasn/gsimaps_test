# 利用規約機能の使用方法

このドキュメントは、WEBサイトに追加された利用規約機能の設定とカスタマイズ方法を説明します。

## 概要

ユーザーがWEBでアクセスするたびに、利用規約のモーダルダイアログを表示します。
- **同意する**：モーダルが閉じてサービスの利用を開始できます
- **同意しない**：指定のURLに遷移します（`/terms_disagreed.html`）

**注意**：このバージョンではローカルストレージに同意情報を保存しないため、アクセスするたびに利用規約が表示されます。

## ファイル構成

### 新規追加ファイル

1. **js/terms_of_service.js**
   - 利用規約の表示・管理を行うメインのJavaScriptファイル
   - モーダルの生成と表示制御を実装
   - ローカルストレージは使用しません

2. **css/terms_of_service.css**
   - 利用規約モーダルのスタイル定義
   - レスポンシブデザイン対応

3. **terms_disagreed.html**
   - 利用規約に非同意時の遷移先ページ
   - ユーザーに対して利用規約に同意するよう促すコンテンツを表示

### 変更されたファイル

以下のHTMLファイルに利用規約ファイルの読み込みを追加：
- index.html
- index_3d.html
- index_m.html
- index_pm.html
- globe/index_globe.html

## 設定方法

### 基本設定（JavaScript内での設定）

`js/terms_of_service.js`内の`config`オブジェクトで以下を設定できます：

```javascript
TermsOfService.config = {
  disagreePath: '/terms_disagreed.html'       // 非同意時の遷移先URL
};
```

#### 各設定項目の説明

| 項目 | 説明 | 既定値 |
|------|------|--------|
| `disagreePath` | 利用規約に非同意した場合の遷移先URL | `'/terms_disagreed.html'` |

### 利用規約コンテンツのカスタマイズ

利用規約の内容を変更するには、`js/terms_of_service.js`内の`getTermsContent()`メソッドを編集してください：

```javascript
// 利用規約のコンテンツを取得
getTermsContent: function() {
  return `
    <h3>第1条 総則</h3>
    <p>ここに利用規約のテキストを記述します...</p>
    ...
  `;
}
```

### 非同意ページのカスタマイズ

`terms_disagreed.html`を編集して、非同意時に表示されるページをカスタマイズできます。

## 実装例

### 設定を動的に変更する場合

```javascript
// ページ読み込み後に設定を変更
TermsOfService.setConfig({
  disagreePath: 'https://example.com/terms-not-accepted'
});
```

### 利用規約を強制表示する場合

```javascript
// 利用規約モーダルを表示
TermsOfService.show();
```

## 動作フロー

```
ページロード
    ↓
DOMContentLoaded イベント発火
    ↓
TermsOfService.init() 実行
    ↓
モーダル表示（毎回表示）
    ├─ 同意ボタン押下 → モーダル非表示 → サービス利用
    │   （ページをリロードすると再度表示）
    └─ 非同意ボタン押下 → disagreePath にリダイレクト
```

## ブラウザサポート

- Chrome/Edge：✅ 完全対応
- Firefox：✅ 完全対応
- Safari：✅ 完全対応
- Internet Explorer：❌ 非対応（CSS3機能に未対応）

## トラブルシューティング

### モーダルが表示されない場合

1. ブラウザのコンソール（F12）でエラーを確認
2. ページをリロード
3. ブラウザのキャッシュをクリア

### モーダルのスタイルが崩れる場合

1. `css/terms_of_service.css`が正しく読み込まれているか確認
2. ブラウザのキャッシュをクリア

### 非同意ページに遷移しない場合

1. `disagreePath`の設定を確認（相対パスか絶対パスか）
2. サーバーの設定でそのパスが正しく機能しているか確認

## API リファレンス

### TermsOfService.init()
利用規約機能を初期化します。モーダルを表示します。

### TermsOfService.isAgreed()
ユーザーが利用規約に同意済みかを返します。このバージョンでは常に `false` を返します。
- **戻り値**: `false`

### TermsOfService.show()
利用規約のモーダルを表示します。

### TermsOfService.hide()
現在表示されているモーダルを非表示にします。

### TermsOfService.setConfig(newConfig)
設定を更新します。
- **引数**: オブジェクト（`{ disagreePath: string }` の形式）

### TermsOfService.getAgreementStatus()
同意状況の情報を返します。
- **戻り値**: `{ isAgreed: false, timestamp: null, note: string }`

### TermsOfService.clearAgreement()
コンソールにメッセージを出力します。このバージョンではローカルストレージを使用していません。

## 本番環境への展開

1. `js/terms_of_service.js`で利用規約コンテンツ（`getTermsContent()`メソッド）を最終確認・編集
2. `terms_disagreed.html`を貴社の要件に合わせてカスタマイズ
3. `disagreePath`を正しい相対パスまたは絶対パスに変更
4. `css/terms_of_service.css`のスタイルをカスタマイズ（必要に応じて）
5. すべてのHTMLファイルで利用規約ファイルが読み込まれていることを確認
6. 本番環境でテスト実施

## 重要な特性

**このバージョンは以下の特性を持ちます：**

- ✅ アクセスするたびに利用規約を表示
- ✅ ブラウザを閉じると状態がリセット
- ✅ ローカルストレージを使用しない
- ✅ プライベートブラウジングモードで動作
- ❌ 同意履歴を保存しない
- ❌ クライアント側で同意状況を記録しない

**サーバー側で同意情報を管理したい場合：**

サーバー側でのセッション管理やデータベース記録が必要な場合は、
`onAgree()`メソッドを以下のように拡張してください：

```javascript
onAgree: function() {
  // サーバーに同意情報を送信
  fetch('/api/terms-agreement', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      agreed: true,
      timestamp: new Date().toISOString()
    })
  });
  
  this.hide();
}
```

## ライセンス

このモジュールは MIT ライセンスの下で提供されています。
