import Wellcome from './src/main';

Wellcome.install = function (Vue) {
  Vue.component(Wellcome.name, Wellcome)
}

export default Wellcome