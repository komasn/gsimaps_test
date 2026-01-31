/**
 * 利用規約管理モジュール
 * WEBアクセス時に利用規約を表示し、ユーザーの同意を取得
 */

var TermsOfService = {
  // 設定
  config: {
    disagreePath: '/terms_disagreed.html' // 非同意時の遷移先
  },

  // 初期化（毎回利用規約を表示）
  init: function() {
    // 利用規約を表示
    this.show();
  },

  // 常に利用規約を表示するため、isAgreedは常にfalseを返す
  isAgreed: function() {
    return false;
  },

  // 利用規約を表示
  show: function() {
    // オーバーレイ作成
    var overlay = document.createElement('div');
    overlay.id = 'termsOfServiceOverlay';

    // モーダルコンテナ作成
    var modal = document.createElement('div');
    modal.id = 'termsOfServiceModal';

    // ヘッダー
    var header = document.createElement('div');
    header.id = 'termsOfServiceHeader';
    header.textContent = '利用規約';

    // コンテンツ
    var content = document.createElement('div');
    content.id = 'termsOfServiceContent';
    content.innerHTML = this.getTermsContent();

    // フッター
    var footer = document.createElement('div');
    footer.id = 'termsOfServiceFooter';

    // 同意ボタン
    var agreeBtn = document.createElement('button');
    agreeBtn.id = 'termsAgreeButton';
    agreeBtn.className = 'termsButton';
    agreeBtn.textContent = '同意する';
    agreeBtn.onclick = this.onAgree.bind(this);

    // 非同意ボタン
    var disagreeBtn = document.createElement('button');
    disagreeBtn.id = 'termsDisagreeButton';
    disagreeBtn.className = 'termsButton';
    disagreeBtn.textContent = '同意しない';
    disagreeBtn.onclick = this.onDisagree.bind(this);

    // 組立
    footer.appendChild(disagreeBtn);
    footer.appendChild(agreeBtn);

    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(footer);

    overlay.appendChild(modal);

    // DOMに追加
    document.body.appendChild(overlay);
  },

  // 利用規約のコンテンツを取得
  getTermsContent: function() {
    return `
      <h3>第1条 総則</h3>
      <p>本利用規約は、本ウェブサービス（以下「本サービス」という）の利用条件を定めるものです。ユーザーが本サービスを利用する際には、本利用規約に同意したものと見なされます。</p>

      <h3>第2条 利用者の責任</h3>
      <p>ユーザーは、本サービスの利用に当たり、以下の行為を行わないものとします。</p>
      <p>• 法令に違反する行為<br>
      • 他者の権利を侵害する行為<br>
      • 本サービスの運営を妨害する行為<br>
      • 不正アクセスその他技術的な悪行為</p>

      <h3>第3条 著作権等知的財産権</h3>
      <p>本サービスで提供されるすべてのコンテンツの著作権は、当機関または権利者に帰属します。ユーザーは、私的使用の範囲内でこれらを利用することができますが、複製、改変、配布等は禁止されています。</p>

      <h3>第4条 データの正確性</h3>
      <p>本サービスで提供される情報は一般的な参考情報です。当機関は、この情報の正確性、最新性、有用性等について、保証するものではありません。</p>

      <h3>第5条 免責事項</h3>
      <p>当機関は、本サービスの利用によって生じたいかなる損害についても、一切の責任を負わないものとします。</p>

      <h3>第6条 サービスの中断等</h3>
      <p>当機関は、予告なく本サービスの全部または一部を変更、停止、廃止することができます。</p>

      <h3>第7条 利用規約の変更</h3>
      <p>当機関は、本利用規約を随時変更することができます。変更後の利用規約は、本ウェブサイトに掲載された時点で効力を生じます。</p>

      <h3>第8条 準拠法</h3>
      <p>本利用規約は、日本国法を準拠法とします。</p>
    `;
  },

  // 同意ボタン押下
  onAgree: function() {
    // モーダルを削除
    this.hide();
  },

  // 非同意ボタン押下
  onDisagree: function() {
    // 指定のURLに遷移
    window.location.href = this.config.disagreePath;
  },

  // モーダルを非表示
  hide: function() {
    var overlay = document.getElementById('termsOfServiceOverlay');
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  },

  // 同意履歴をクリア（ローカルストレージ機能なし）
  clearAgreement: function() {
    console.log('注：このバージョンではローカルストレージに同意情報を保存していません');
  },

  // 設定を更新
  setConfig: function(newConfig) {
    Object.assign(this.config, newConfig);
  },

  // 同意状況を取得（常にfalse、タイムスタンプなし）
  getAgreementStatus: function() {
    return {
      isAgreed: false,
      timestamp: null,
      note: 'このバージョンではローカルストレージに同意情報を保存していません'
    };
  }
};

// ページ読み込み時に利用規約を初期化
document.addEventListener('DOMContentLoaded', function() {
  TermsOfService.init();
});
