import * as doctrine from 'doctrine';
import { PropDescriptor, PropTypeDescriptor, ReactDocgenApi } from 'react-docgen';

interface DescribeablePropDescriptor {
  annotation: doctrine.Annotation;
  defaultValue: string | null;
  required: boolean;
  type: PropTypeDescriptor;
}

export interface ReactApi extends ReactDocgenApi {
  EOL: string;
  filename: string;
  forwardsRefTo: string | undefined;
  inheritance: { component: string; pathname: string } | null;
  name: string;
  pagesMarkdown: Array<{ components: string[]; filename: string; pathname: string }>;
  spread: boolean;
  src: string;
  styles: {
    classes: string[];
    globalClasses: Record<string, string>;
    name: string | null;
    descriptions: Record<string, string>;
  };
}

/**
 * Returns `null` if the prop should be ignored.
 * Throws if it is invalid.
 * @param prop
 * @param propName
 */
function createDescribeableProp(
  prop: PropDescriptor,
  propName: string,
): DescribeablePropDescriptor | null {
  const { defaultValue, jsdocDefaultValue, description, required, type } = prop;

  const renderedDefaultValue = defaultValue?.value.replace(/\r?\n/g, '');
  const renderDefaultValue = Boolean(
    renderedDefaultValue &&
      // Ignore "large" default values that would break the table layout.
      renderedDefaultValue.length <= 150,
  );

  if (description === undefined) {
    throw new Error(`The "${propName}" prop is missing a description.`);
  }

  const annotation = doctrine.parse(description, {
    sloppy: true,
  });

  if (
    annotation.description.trim() === '' ||
    annotation.tags.some((tag) => tag.title === 'ignore')
  ) {
    return null;
  }

  if (jsdocDefaultValue !== undefined && defaultValue === undefined) {
    throw new Error(
      `Declared a @default annotation in JSDOC for prop '${propName}' but could not find a default value in the implementation.`,
    );
  } else if (jsdocDefaultValue === undefined && defaultValue !== undefined && renderDefaultValue) {
    const shouldHaveDefaultAnnotation =
      // Discriminator for polymorphism which is not documented at the component level.
      // The documentation of `component` does not know in which component it is used.
      propName !== 'component';

    if (shouldHaveDefaultAnnotation) {
      throw new Error(`JSDOC @default annotation not found for '${propName}'.`);
    }
  } else if (jsdocDefaultValue !== undefined) {
    // `defaultValue` can't be undefined or we would've thrown earlier.
    if (jsdocDefaultValue.value !== defaultValue!.value) {
      throw new Error(
        `Expected JSDOC @default annotation for prop '${propName}' of "${jsdocDefaultValue.value}" to equal runtime default value of "${defaultValue?.value}"`,
      );
    }
  }

  return {
    annotation,
    defaultValue: renderDefaultValue ? renderedDefaultValue! : null,
    required: Boolean(required),
    type,
  };
}

export default function generateProps(reactAPI: ReactApi) {
  Object.keys(reactAPI.props).forEach((propName) => {
    const propDescriptor = reactAPI.props[propName];
    if (propName === 'classes') {
      propDescriptor.description += ' See [CSS API](#css) below for more details.';
    }

    createDescribeableProp(propDescriptor, propName);
  });
}
