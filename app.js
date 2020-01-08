import { h, render } from 'https://unpkg.com/preact@latest?module';
// import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

const App = () => {
  return h('div', { class: 'Dashboard' }, 'Hello world!');
};

render(
  h(App),
  document.getElementById('root'),
);
