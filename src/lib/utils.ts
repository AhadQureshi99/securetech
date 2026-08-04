import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about the theme's custom font sizes.
 *
 * Out of the box it classifies an unknown `text-*` as a colour, so
 * `text-display-xl text-ink-900` looks like two competing colours and the
 * size is silently dropped — the headline then renders at body size. This is
 * quiet and easy to miss, hence registering the scale explicitly.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-2xl",
            "display-xl",
            "display-lg",
            "display-md",
            "display-sm",
            "lede",
            "label",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
