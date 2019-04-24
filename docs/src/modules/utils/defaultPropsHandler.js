import recast from 'recast';
import { utils as docgenUtils } from 'react-docgen';
// https://github.com/reactjs/react-docgen/pull/351
import isReactForwardRefCall from 'react-docgen/dist/utils/isReactForwardRefCall';

const { getPropertyName, printValue, resolveToValue } = docgenUtils;

// based on https://github.com/reactjs/react-docgen/blob/735f39ef784312f4c0e740d4bfb812f0a7acd3d5/src/handlers/defaultPropsHandler.js#L1-L112
// adjusted for material-ui getThemedProps

const {
  types: { namedTypes: types },
} = recast;

function getDefaultValue(path) {
  let node = path.node;
  let defaultValue;
  if (types.Literal.check(node)) {
    defaultValue = node.raw;
  } else {
    if (types.AssignmentPattern.check(path.node)) {
      path = resolveToValue(path.get('right'));
    } else {
      path = resolveToValue(path);
    }
    if (types.ImportDeclaration.check(path.node)) {
      defaultValue = node.name;
    } else {
      node = path.node;
      defaultValue = printValue(path);
    }
  }
  if (typeof defaultValue !== 'undefined') {
    return {
      value: defaultValue,
      computed:
        types.CallExpression.check(node) ||
        types.MemberExpression.check(node) ||
        types.Identifier.check(node),
    };
  }

  return null;
}

function getDefaultValuesFromProps(properties, documentation) {
  properties
    .filter(propertyPath => types.Property.check(propertyPath.node))
    // Don't evaluate property if component is functional and the node is not an AssignmentPattern
    .filter(propertyPath => types.AssignmentPattern.check(propertyPath.get('value').node))
    .forEach(propertyPath => {
      const propName = getPropertyName(propertyPath);
      if (!propName) return;

      const propDescriptor = documentation.getPropDescriptor(propName);
      const defaultValue = getDefaultValue(propertyPath.get('value', 'right'));
      if (defaultValue) {
        propDescriptor.defaultValue = defaultValue;
      }
    });
}

function getRenderBody(componentDefinition) {
  const value = resolveToValue(componentDefinition);
  if (isReactForwardRefCall(value)) {
    return value.get('arguments', 0, 'body');
  }
  return value.get('body');
}

function getPropsPath(functionBody) {
  let propsPath;

  recast.visit(functionBody, {
    visitVariableDeclarator(path) {
      if (path.get('init', 'name').value === 'props') {
        if (propsPath !== undefined) {
          throw new Error('found duplicate props destructuring');
        }

        propsPath = path.get('id');
      }
      return false;
    },
  });

  return propsPath;
}

export default function defaultPropsHandler(documentation, componentDefinition) {
  const renderBody = getRenderBody(componentDefinition);
  const props = getPropsPath(renderBody);
  if (props !== undefined) {
    getDefaultValuesFromProps(props.get('properties'), documentation);
  }
}
