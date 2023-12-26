/**
 * API一覧のコンテンツの直前にタイトル要素を追加。
 */
export default () => {
  const container = document.querySelector('.scheme-container');
  if (container)
    container.insertAdjacentHTML('afterbegin', '<div class="wrapper"><h2 id="list-of-apis">API一覧</h2></div>');
  else
    console.warn('Contents of API list not found. Please check.');
}