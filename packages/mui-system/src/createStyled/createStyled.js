/* eslint-disable no-underscore-dangle */
import styledEngineStyled, {
  internal_processStyles as processStyles,
  internal_serializeStyles as serializeStyles,
} from '@mui/styled-engine';
import { isPlainObject } from '@mui/utils/deepmerge';
import capitalize from '@mui/utils/capitalize';
import getDisplayName from '@mui/utils/getDisplayName';
import createTheme from '../createTheme';
import styleFunctionSx from '../styleFunctionSx';
import memoProps from '../memoProps';
import preprocessStyles from '../preprocessStyles';

export const systemDefaultTheme = createTheme();

// Update /system/styled/#api in case if this changes
export function shouldForwardProp(prop) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

function resolveTheme(themeId, theme, defaultTheme) {
  return isObjectEmpty(theme) ? defaultTheme : theme[themeId] || theme;
}

const ORIGINAL_THEME = Symbol('mui.original_theme');

function attachTheme(props, themeId, defaultTheme) {
  const theme = resolveTheme(themeId, props.theme, defaultTheme);
  const originalTheme = props.theme;

  props.theme = theme;
  props[ORIGINAL_THEME] = originalTheme;

  return props;
}

function defaultOverridesResolver(slot) {
  if (!slot) {
    return null;
  }
  return (_props, styles) => styles[slot];
}

function processStyle(props, style) {
  const resolvedStyle = typeof style === 'function' ? style(props) : style;

  if (Array.isArray(resolvedStyle)) {
    return resolvedStyle.flatMap((subStyle) => processStyle(props, subStyle));
  }

  if (Array.isArray(resolvedStyle?.variants)) {
    return processStyleVariants(
      props,
      resolvedStyle.variants,
      [resolvedStyle]
    );
  }

  return resolvedStyle;
}

function processStyleVariants(props, variants, results = []) {
  let mergedState; // We might not need it, initialized lazily

  /* eslint-disable no-labels */
  variantLoop: for (let i = 0; i < variants.length; i += 1) {
    const variant = variants[i];

    if (typeof variant.props === 'function') {
      mergedState ??= { ...props, ...props.ownerState, ownerState: props.ownerState };
      if (!variant.props(mergedState)) {
        continue;
      }
    } else {
      for (const key in variant.props) {
        if (props[key] !== variant.props[key] && props.ownerState?.[key] !== variant.props[key]) {
          continue variantLoop;
        }
      }
    }

    if (typeof variant.style === 'function') {
      mergedState ??= { ...props, ...props.ownerState, ownerState: props.ownerState };
      results.push(variant.style(mergedState));
    } else {
      results.push(variant.style);
    }
  }
  /* eslint-enable no-labels */

  return results
}

export default function createStyled(input = {}) {
  const {
    themeId,
    defaultTheme = systemDefaultTheme,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
  } = input;

  function styleAttachTheme(props) {
    attachTheme(props, themeId, defaultTheme)
  }

  const styled = (tag, inputOptions = {}) => {

    // If `tag` is already a styled component, filter out the `sx` style function
    // to prevent unnecessary styles generated by the composite components.
    processStyles(tag, (styles) => styles.filter(style => style !== styleFunctionSx));

    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver = defaultOverridesResolver(lowercaseFirstLetter(componentSlot)),
      ...options
    } = inputOptions;

    // if skipVariantsResolver option is defined, take the value, otherwise, true for root and false for other slots.
    const skipVariantsResolver =
      inputSkipVariantsResolver !== undefined
        ? inputSkipVariantsResolver
        : // TODO v6: remove `Root` in the next major release
          // For more details: https://github.com/mui/material-ui/pull/37908
          (componentSlot && componentSlot !== 'Root' && componentSlot !== 'root') || false;

    const skipSx = inputSkipSx || false;

    let shouldForwardPropOption = shouldForwardProp;

    // TODO v6: remove `Root` in the next major release
    // For more details: https://github.com/mui/material-ui/pull/37908
    if (componentSlot === 'Root' || componentSlot === 'root') {
      shouldForwardPropOption = rootShouldForwardProp;
    } else if (componentSlot) {
      // any other slot specified
      shouldForwardPropOption = slotShouldForwardProp;
    } else if (isStringTag(tag)) {
      // for string (html) tag, preserve the behavior in emotion & styled-components.
      shouldForwardPropOption = undefined;
    }

    const defaultStyledResolver = styledEngineStyled(tag, {
      shouldForwardProp: shouldForwardPropOption,
      label: generateStyledLabel(componentName, componentSlot),
      ...options,
    });

    const transformStyle = (style) => {
      // On the server Emotion doesn't use React.forwardRef for creating components, so the created
      // component stays as a function. This condition makes sure that we do not interpolate functions
      // which are basically components used as a selectors.
      if ((typeof style === 'function' && style.__emotion_real !== style)) {
        return function styleFunctionProcessor(props) {
          return processStyle(props, style)
        };
      }
      if (isPlainObject(style)) {
        // PERF: We could skip the function calls if there are no variants.
        const serialized = preprocessStyles(style);
        return function styleObjectProcessor(props) {
          return processStyle(props, serialized)
        };
      }
      return style;
    };

    const muiStyledResolver = (expressionFirst, ...expressionsMiddle) => {
      expressionFirst = transformStyle(expressionFirst)

      const expressionsHead = []
      const expressionsTail = []

      // Preprocess `props` to set the scoped theme value.
      // This must run before any other expression.
      expressionsHead.push(styleAttachTheme);

      if (componentName && overridesResolver) {
        expressionsTail.push(function styleThemeOverrides(props) {
          const theme = props.theme;
          const styleOverrides = theme.components?.[componentName]?.styleOverrides;
          if (!styleOverrides) {
            return null;
          }

          const resolvedStyleOverrides = {};

          // TODO: v7 remove iteration and use `resolveStyleArg(styleOverrides[slot])` directly
          // eslint-disable-next-line guard-for-in
          for (const slotKey in styleOverrides) {
            resolvedStyleOverrides[slotKey] = processStyle(props, styleOverrides[slotKey]);
          }

          return overridesResolver(props, resolvedStyleOverrides);
        });
      }

      if (componentName && !skipVariantsResolver) {
        expressionsTail.push(function styleThemeVariants(props) {
          const theme = props.theme;
          const themeVariants = theme?.components?.[componentName]?.variants;
          if (!themeVariants) {
            return null;
          }
          return processStyleVariants(props, themeVariants);
        });
      }

      if (!skipSx) {
        expressionsTail.push(styleFunctionSx);
      }

      // This function can be called as a tagged template, so `style` would contain CSS
      // `string[]` values and `expressions` would contain the interpolated values.
      if (Array.isArray(expressionFirst)) {
        // We need to add placeholders in the tagged template for the custom functions we have
        // possibly added (attachTheme, overrides, variants, and sx).
        const placeholdersHead = new Array(expressionsHead.length).fill('');
        const placeholdersTail = new Array(expressionsTail.length).fill('');

        let taggedStrings;
        taggedStrings     = [...placeholdersHead, ...expressionFirst,     ...placeholdersTail];
        taggedStrings.raw = [...placeholdersHead, ...expressionFirst.raw, ...placeholdersTail];

        expressionsHead.unshift(taggedStrings)
      } else {
        // Unless it's a tagged template case, we still want attachTheme to run first.
        expressionsHead.push(expressionFirst)
      }

      const expressions = [
        ...expressionsHead,
        ...expressionsMiddle.map(transformStyle),
        ...expressionsTail,
      ]

      const Component = defaultStyledResolver(...expressions);
      if (tag.muiName) {
        Component.muiName = tag.muiName;
      }
      if (process.env.NODE_ENV !== 'production') {
        Component.displayName = generateDisplayName(componentName, componentSlot, tag);
      }

      return Component;
    };

    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }

    return muiStyledResolver;
  };

  return styled;
}

function generateDisplayName(componentName, componentSlot, tag) {
  if (componentName) {
    return `${componentName}${capitalize(componentSlot || '')}`;
  }
  return `Styled(${getDisplayName(tag)})`;
}

function generateStyledLabel(componentName, componentSlot) {
  let label;

  if (process.env.NODE_ENV !== 'production') {
    if (componentName) {
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      label = `${componentName}-${lowercaseFirstLetter(componentSlot || 'Root')}`;
    }
  }

  return label;
}

function isObjectEmpty(object) {
  // eslint-disable-next-line
  for (const _ in object) {
    return false;
  }
  return true;
}

// https://github.com/emotion-js/emotion/blob/26ded6109fcd8ca9875cc2ce4564fee678a3f3c5/packages/styled/src/utils.js#L40
function isStringTag(tag) {
  return (
    typeof tag === 'string' &&
    // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    tag.charCodeAt(0) > 96
  );
}

function lowercaseFirstLetter(string) {
  if (!string) {
    return string;
  }
  return string.charAt(0).toLowerCase() + string.slice(1);
}
