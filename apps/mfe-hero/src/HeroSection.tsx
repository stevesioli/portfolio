import '@resume/ui/styles/theme.css';

import HeroInline from './variants/HeroInline';
import HeroPhotoChips from './variants/HeroPhotoChips';
import HeroPhotoPanel from './variants/HeroPhotoPanel';

/**
 * Three layout variants, built to compare side by side while deciding
 * how to fill the space around the hero photo. Flip this constant,
 * save, and the dev server hot-reloads — check both the standalone
 * harness (`pnpm --filter mfe-hero dev`) and the composed shell.
 *
 * 'chips'  — bigger photo, layered copper+blue glow, floating detail chips
 * 'panel'  — photo inside a designed gradient panel with a caption
 * 'inline' — small photo next to the name; freed column gets a pull-quote
 *
 * Once a direction is picked, this switch and the unused variant files
 * should come out — this is a temporary comparison harness, not the
 * intended long-term shape of this component.
 */
const VARIANT: 'chips' | 'panel' | 'inline' = 'inline';

const VARIANTS = {
  chips: HeroPhotoChips,
  panel: HeroPhotoPanel,
  inline: HeroInline,
} as const;

export default function HeroSection() {
  const Variant = VARIANTS[VARIANT];
  return <Variant />;
}
