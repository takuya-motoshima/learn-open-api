/**
 * APIメニュー要素作成。
 */
export default (blockEl) => {
  // タグ要素取得。
  const tagEl = blockEl.closest('.opblock-tag-section').querySelector('.opblock-tag');

  // APIパス取得。
  const path = blockEl.querySelector('.opblock-summary-path a[href^="#"]')?.getAttribute('href');

  // API名称取得。
  const description = blockEl.querySelector('.opblock-summary-description')?.textContent;

  // リンク要素生成。
  const link = document.createElement('a');
  link.setAttribute('href', path);
  link.setAttribute('data-target-tag', '#' + tagEl.getAttribute('id'));// タグ要素IDをdata属性に保存。
  link.setAttribute('data-target-api', '#' + blockEl.getAttribute('id'));// 仕様欄要素IDをdata属性に保存。
  link.classList.add('bd-links-link', 'd-inline-block', 'rounded');
  link.textContent = description;

  // APIメニューのクリックイベントを追加。
  link.addEventListener('click', evnt => {
    // タグ要素取得。
    const tagEl = document.querySelector(evnt.currentTarget.getAttribute('data-target-tag'));
    if (tagEl.getAttribute('data-is-open') !== 'true')
      // タグが閉じていた場合、展開。
      tagEl.click();

    // 仕様欄要素取得。
    const blockEl = document.querySelector(evnt.currentTarget.getAttribute('data-target-api'));

    // 仕様欄展開ボタン取得。
    const controlButton = blockEl.querySelector('.opblock-summary-control');
    if (controlButton.getAttribute('aria-expanded') !== 'true')
      // 仕様欄が閉じていた場合、展開。
      controlButton.click();

    // リンク先要素にスクロール。
    blockEl.scrollIntoView({behavior: 'smooth', block: 'start'});
  });

  // メニュー要素を生成し返す。
  const menuItem = document.createElement('li');
  menuItem.appendChild(link);
  return menuItem;
}