// Stills on IMAGE_MODEL. Raw outputs land in media-raw/gen/ for review before they go into public/.
// Usage: npm run gen:images [-- shot-id ...]
import { model, run, selected } from "./replicate.mjs";

const IMAGE_MODEL = model("IMAGE_MODEL");

const shots = [
  {
    id: "lumen-a",
    aspect_ratio: "2:3",
    prompt:
      "Book cover art for a literary techno-thriller, with no text or lettering anywhere. Night-time aerial view of a vast dark European city grid; a single point of warm gold light at the centre sends fine luminous threads outward along the streets like a spreading network, reaching toward the edges of the frame. Deep ink-black and charcoal palette, restrained gold accents, subtle film grain. Minimal, elegant, premium publisher aesthetic, generous dark negative space in the upper third.",
  },
  {
    id: "lumen-b",
    aspect_ratio: "2:3",
    prompt:
      "Book cover art for a literary techno-thriller, with no text or lettering anywhere. A lone figure in a long coat stands small at the bottom of an enormous dark data-centre hall; endless rows of black server racks recede into shadow, and one narrow shaft of warm gold light falls from above onto the figure. Cinematic, restrained, near-monochrome charcoal with gold light, subtle film grain, generous dark negative space in the upper third.",
  },
  {
    id: "nightingale",
    aspect_ratio: "3:2",
    prompt:
      "Calm editorial illustration with no text. A smartphone rests on a wooden kitchen table in warm evening lamplight, its screen showing a soft voice waveform; beside it a cup of tea and a folded note. A small nightingale bird perches on the rim of the tea cup. Palette of deep teal, sage green, cream and warm amber. Soft gouache texture, reassuring and human, modern healthcare brand feel, uncluttered composition.",
  },
];

for (const s of selected(shots)) {
  await run(
    IMAGE_MODEL,
    { prompt: s.prompt, aspect_ratio: s.aspect_ratio, quality: "high", output_format: "png", moderation: "auto" },
    `media-raw/gen/${s.id}.png`,
  );
}
