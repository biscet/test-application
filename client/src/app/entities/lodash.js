import _ from 'lodash'

const mixinCreate = (name, func) =>
  _.mixin({
    [name]: func,
  })

mixinCreate('trace', (article) => {
  console.trace(article)
})
