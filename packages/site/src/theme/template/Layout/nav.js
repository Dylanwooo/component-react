/**
 * Created by jljsj on 16/8/18.
 */
const location = window.location;
const protocol = location.protocol;
const isLocalMode = location.port;
const port = isLocalMode ? ':8112' : '';
const mainPath = isLocalMode ? '' : '/edit';
const href = `${protocol}//${location.hostname}${port}${mainPath}`;

export default [
  // { name: '动效展示', href: '/exhibition/', key: 'exhibition' },
  // { name: '设计语言', href: '/language/basic', key: 'language' },
  { name: '组件', href: '/components/tween-one', key: 'components' },
  { name: 'API', href: '/api/tween-one', key: 'api' },
];
