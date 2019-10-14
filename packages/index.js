import pkg from '../package.json';

import Wellcome from './wellcome';

const components = [
  Wellcome
]

const install = function (Vue, options) {
  console.log(`@docimax/ui version: ${pkg.version}`)
  if (install.installed) {
    return
  }
  install.installed = true
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}