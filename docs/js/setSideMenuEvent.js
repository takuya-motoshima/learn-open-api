/**
 * サイドバーメニューのクリックイベント設定。
 */
export default () => {
  // ヘッダ要素取得。
  const header = document.getElementById('bdHeader');
  
  // メニューのリンク要素を取得しクリックイベントを設定。
  for (let link of document.querySelectorAll('#bd-docs-nav a[href^="#"]')) {
    link.addEventListener('click', evnt => {
      // ページ内リンクの動作を手動で行う為、イベントのデフォルトの挙動を無効化。
      evnt.preventDefault();
      evnt.stopPropagation();
      let scrollTarget;
      if (evnt.currentTarget.getAttribute('data-is-api') === 'true') {
        // API仕様のリンクの場合。
        // タグ要素取得。
        const tag = document.querySelector(evnt.currentTarget.getAttribute('data-target-tag'));
        if (tag.getAttribute('data-is-open') !== 'true')
          // タグが閉じていた場合、展開。
          tag.click();

        // 仕様欄要素取得。
        scrollTarget = document.querySelector(evnt.currentTarget.getAttribute('data-target-api'));

        // 仕様欄展開ボタン取得。
        const controlButton = scrollTarget.querySelector('.opblock-summary-control');
        if (controlButton.getAttribute('aria-expanded') !== 'true')
          // 仕様欄が閉じていた場合、展開。
          controlButton.click();
        else
          // 仕様欄が開いていた場合、URLフラグメントにリンク先のAPIのパスを設定。
          location.hash = evnt.currentTarget.getAttribute('href');
      } else {
        // API仕様以外のリンクの場合。
        scrollTarget = document.querySelector(evnt.currentTarget.getAttribute('href'));

        // URLフラグメント削除。
        location.hash = '';
      }

      // 移動先のスクロール位置計算。
      const clientRect = scrollTarget.getBoundingClientRect();
      let top = clientRect.top + window.scrollY;

      // ヘッダがフローティング要素の場合、スクロール位置からヘッダの高さを差し引く。
      if (/^(fixed|sticky)$/.test(getComputedStyle(header).position))
        top -= header.clientHeight;

      // リンク先の要素へスクロール。
      window.scrollTo({top, behavior: 'smooth'});
      // scrollTarget.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  }
}