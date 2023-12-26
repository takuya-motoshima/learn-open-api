import createApiMenuItem from './createApiMenuItem.js';

/**
 * サイドバーにAPIメニューを追加。
 */
export default () => {
  // APIメニュー親要素取得。
  const menuWrapper = document.getElementById('api-menu');

  // 仕様欄ブロック要素取得。
  for (let blockEl of document.querySelectorAll('.opblock[id]')) {
    // APIメニュー追加。
    const menuItem = createApiMenuItem(blockEl);
    menuWrapper.appendChild(menuItem);
  }
}