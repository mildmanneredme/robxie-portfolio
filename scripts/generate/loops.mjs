// Short, silent card loops on CHEAP_VIDEO_MODEL, animated from each project's own key art.
// Usage: npm run gen:loops [-- shot-id ...]
import { dataUri, model, run, selected } from "./replicate.mjs";

const VIDEO_MODEL = model("CHEAP_VIDEO_MODEL");

const shots = [
  {
    id: "dreamweavel",
    image: "public/projects/dreamweavel/book-4.webp",
    aspect_ratio: "1:1",
    prompt:
      "Gentle snow keeps falling. The girl in the knitted hat hugs the polar bear a little closer and smiles; the bear slowly closes and opens its eyes contentedly. Soft, cozy, storybook motion. Camera stays still. Title lettering stays unchanged.",
  },
  {
    id: "nimblip",
    image: "public/projects/nimblip/key-art.webp",
    aspect_ratio: "16:9",
    prompt:
      "Cozy toy-like office comes alive: tiny staff type at their desks, monitors flicker, a plant sways, the green computer mascot blinks and bobs happily, gold sparkles twinkle. Small, gentle, looping motion. Camera stays still. The NIMBLIP logo stays unchanged.",
  },
  {
    id: "lumen",
    image: "public/projects/lumen/art.webp",
    aspect_ratio: "3:4",
    prompt:
      "Nearly still image. A very subtle shimmer of light travels slowly along the existing gold street lines, and distant windows twinkle faintly. The central point of light gently breathes. The sky stays completely dark and empty; nothing rises into it. No flares, no bursts, no new light beams. Brightness stays constant. Camera locked.",
  },
];

for (const s of selected(shots)) {
  await run(
    VIDEO_MODEL,
    {
      prompt: s.prompt,
      image: await dataUri(s.image),
      duration: 5,
      resolution: "720p",
      aspect_ratio: s.aspect_ratio,
      camera_fixed: true,
    },
    `media-raw/gen/loop-${s.id}.mp4`,
  );
}
