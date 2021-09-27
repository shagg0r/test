/* eslint-disable */
const toCssVar = (key, prefix) => {
  let cssVar = Array.isArray(key)
    ? `--${key.join('-')}`
    : `--${key.toString().replace(/\./g, '-')}`;
  if (prefix) {
    cssVar = cssVar.replace('--', `--${prefix}-`);
  }
  return cssVar;
};

const toCssUnit = (value) => {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
};

export const createCssVars = (host) => {
  let css = {};
  let vars = {};

  function recurse(object, parentKeys = []) {
    Object.entries(object).forEach(([key, value]) => {
      if (typeof value === 'object' && Object.keys(value).length > 0) {
        recurse(value, [...parentKeys, key]);
      }
      if (typeof value === 'string' || typeof value === 'number') {
        const cssVar = toCssVar([...parentKeys, key]);
        css = { ...css, [cssVar]: toCssUnit(value) };
        vars = { ...vars, [cssVar.replace('--', '')]: `var(${cssVar})` };
      }
    });
  }
  recurse(host);
  return { css, vars };
};
