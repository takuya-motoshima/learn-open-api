/**
 * APIの表示をメソッド名の昇順に並び替える。
 */
export default (a, b) => {
  const methodsOrder = ['get', 'post', 'put', 'delete', 'patch', 'options', 'trace'];
  let result = methodsOrder.indexOf(a.get('method')) - methodsOrder.indexOf(b.get('method'));

  // Or if you want to sort the methods alphabetically (delete, get, head, options, ...):
  // var result = a.get('method').localeCompare(b.get('method'));
  if (result === 0)
    result = a.get('path').localeCompare(b.get('path'));
  return result;
}