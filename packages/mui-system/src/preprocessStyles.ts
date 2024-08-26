import { internal_serializeStyles } from '@mui/styled-engine';

export default function preprocessStyles(styles: any) {
  const variants = styles.variants

  // Avoid passing `style.variants` to emotion, it will pollute the styles.
  if (variants) { styles.variants = undefined }
  const serialized = internal_serializeStyles(styles) as any
  if (variants) { styles.variants = variants }

  // Not supported on styled-components
  if (serialized === styles) {
    return styles;
  }

  if (variants) {
    variants.forEach((variant: any) => {
      if (typeof variant.style !== 'function') {
        variant.style = internal_serializeStyles(variant.style)
      }
    })

    serialized.variants = variants
  }

  return serialized;
}
