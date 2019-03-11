import Vue from 'vue'
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import D2CRUD from '@d2-projects/d2-crud'

// After plugin: i18n.js
export default ({ store: { state } }) => {
  const locale = state.locale === 'en' ? enLocale : zhLocale
  Vue.use(Element, { locale })
  Vue.use(D2CRUD)
}
