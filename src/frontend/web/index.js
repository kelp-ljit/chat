// Stylesheets
require('./stylesheets/index.scss');

require('regenerator-runtime/runtime');
const {RouterView} = require('capybara-router');
const {PUSH, REPLACE, RELOAD} = require('capybara-router/lib/constants/history-actions');
const dayjs = require('dayjs');
const LocalizedFormat = require('dayjs/plugin/localizedFormat');
const nprogress = require('nprogress');
const React = require('react');
const ReactDOM = require('react-dom');
const router = require('./router');
const Loading = require('../core/components/loading');
const utils = require('../core/utils');

nprogress.configure({showSpinner: false});
dayjs.extend(LocalizedFormat);
router.listen('ChangeStart', (action, toState, fromState, next) => {
  nprogress.start();
  if (window.error) {
    // Backend need we render the error page.
    setTimeout(() => {
      nprogress.done();
      utils.renderError(window.error);
    });
    return;
  }

  next();
});
router.listen('ChangeSuccess', action => {
  nprogress.done();

  // Scroll to top.
  if ([PUSH, REPLACE].includes(action)) {
    if (typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0);
    }
  } else if (action === RELOAD) {
    if (typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0);
    }
  }
});
router.listen('ChangeError', error => {
  console.error(error);
  nprogress.done();
});

ReactDOM.render(
  <RouterView><Loading/></RouterView>,
  document.getElementById('root'),
);
