import pkg from '../../package.json';

import Alert from './alert';
import Button from './button';
import Dialog from './dialog';
import Select from './select';
import Table from './table';

const components = [
  Alert,
  Button,
  Dialog,
  Select,
  Table
];

// eslint-disable-next-line no-unused-vars
const install = function (Vue, options = {}) {
  console.log(`@docimax/ui version: ${pkg.version}`);
  if (install.installed) {
    return;
  }
  install.installed = true;
  components.map(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components
};