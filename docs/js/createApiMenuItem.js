/**
 * APIメニュー要素作成。
 */
export default block => {
  // タグ要素取得。
  const tag = block.closest('.opblock-tag-section').querySelector('.opblock-tag');

  // APIパス取得。
  const path = block.querySelector('.opblock-summary-path a[href^="#"]')?.getAttribute('href');

  // API名称取得。
  const description = block.querySelector('.opblock-summary-description')?.textContent;

  // リンク要素生成。
  const link = document.createElement('a');
  link.setAttribute('href', path);
  link.setAttribute('data-is-api', 'true');
  link.setAttribute('data-target-tag', '#' + tag.getAttribute('id'));// タグ要素IDをdata属性に保存。
  link.setAttribute('data-target-api', '#' + block.getAttribute('id'));// 仕様欄要素IDをdata属性に保存。
  link.classList.add('bd-links-link', 'd-inline-block', 'rounded');
  link.textContent = description;

  // メニュー要素を生成し返す。
  const menuItem = document.createElement('li');
  menuItem.appendChild(link);
  return menuItem;
}