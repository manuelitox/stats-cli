generateBackToRoot = (choices, rootPath) => {
  choices.unshift({
    key: choices.length + 1,
    name: '← back to root path',
    value: rootPath
  })
  return choices
}

module.exports = generateBackToRoot