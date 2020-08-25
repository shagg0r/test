import { deepmerge } from '@material-ui/utils';
import propsToClassKey from '../propsToClassKey';
import noopTheme from './noopTheme';

export default function getStylesCreator(stylesOrCreator) {
  const themingEnabled = typeof stylesOrCreator === 'function';

  if (process.env.NODE_ENV !== 'production') {
    if (typeof stylesOrCreator !== 'object' && !themingEnabled) {
      console.error(
        [
          'Material-UI: The `styles` argument provided is invalid.',
          'You need to provide a function generating the styles or a styles object.',
        ].join('\n'),
      );
    }
  }

  return {
    create: (theme, name) => {
      let styles;
      try {
        styles = themingEnabled ? stylesOrCreator(theme) : stylesOrCreator;
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          if (themingEnabled === true && theme === noopTheme) {
            // TODO: prepend error message/name instead
            console.error(
              [
                'Material-UI: The `styles` argument provided is invalid.',
                'You are providing a function without a theme in the context.',
                'One of the parent elements needs to use a ThemeProvider.',
              ].join('\n'),
            );
          }
        }
        throw err;
      }

      if (
        !name ||
        !theme.components ||
        !theme.components[name] ||
        (!theme.components[name].stylesOverrides && !theme.components[name].variants)
      ) {
        return styles;
      }

      const overrides = theme.components[name].stylesOverrides || {};
      const variants = theme.components[name].variants || [];
      const stylesWithOverrides = { ...styles };

      Object.keys(overrides).forEach((key) => {
        if (process.env.NODE_ENV !== 'production') {
          if (!stylesWithOverrides[key]) {
            console.warn(
              [
                'Material-UI: You are trying to override a style that does not exist.',
                `Fix the \`${key}\` key of \`theme.overrides.${name}\`.`,
                '',
                `If you intentionally wanted to add a new key, please use the theme.components[${name}].variants option.`,
              ].join('\n'),
            );
          }
        }

        stylesWithOverrides[key] = deepmerge(stylesWithOverrides[key] || {}, overrides[key]);
      });

      variants.forEach((definition) => {
        const classKey = propsToClassKey(definition.props);
        stylesWithOverrides[classKey] = deepmerge(
          stylesWithOverrides[classKey] || {},
          definition.styles,
        );
      });

      return stylesWithOverrides;
    },
    options: {},
  };
}
