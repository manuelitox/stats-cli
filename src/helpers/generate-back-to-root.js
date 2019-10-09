const generateBackToRoot = (choices, rootPath) => {
  if (!choices) return 'choices is undefined';
  if (!Array.isArray(choices)) return 'choices has to be an array';
  if (!rootPath) return 'rootPath is undefined';
  if (typeof rootPath !== 'string') return 'rootPath has to be a string';

  choices.unshift({
    key: choices.length + 1,
    name: '← back to root path',
    value: rootPath,
  });
  return choices;
};

export default generateBackToRoot;
