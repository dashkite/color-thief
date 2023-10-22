# Color Thief

Based on calculations within Color Thief v2 by Lokesh Dhakar: https://github.com/lokesh/color-thief

Our approach makes some adjustments to internal and external interfaces and packages everything up as CommonJS and ESM modules.


## Quickstart

Color Theif performs calculations on arrays representing color pixels within an image, but we need to extract them from the image first. The `CanvasImage` class is designed to make this process easier, while supporting running in the browser and Node.js.

### Browser

```coffee
import assert from "@dashkite/assert"
import { CanvasImage, getPalette } from "@dashkite/color-thief"

# We need an Image element that's in the DOM.
image = document.querySelector "#my-image"
image.src = "https://images.unsplash.com/photo-1597848212624-a19eb35e2651"

# We need a Canvas element there as well.
canvas = document.createElement "canvas"
document.body.appendChild canvas

# With both in hand, we can use the CanvasImage mapping class to extract colors.
source = CanvasImage.create { canvas, image }

colors = getPalette {
  source
  colorCount: 5
  quality: 1
}

# The result is an associative array of RGB triples, 0 - 255.
assert.deepEqual [ 181, 196, 221 ], colors[0]

# Be mindful that the canvas image will appear on screen if you don't clear it from the DOM.
canvas.parentNode.removeChild canvas
```

### Node.js

```coffee
import FS from "node:fs/promises"
import { createCanvas, Image } from "canvas"
import { CanvasImage, getPalette } from "@dashkite/color-thief"

# We still need a Canvas interface, but there is no native one in the Node.js API.
# The library canvas provides useful Canvas and Image APIs we can use.
canvas = createCanvas()
image = new Image()
image.src = await FS.readFile "test/sunflower-aaron-burden.jpg"

# When both are ready, we can create an instance of the CanvasImage helper class.
source = T.CanvasImage.create { canvas, image }

colors = getPalette {
  source
  colorCount: 5
  quality: 1
}

# The result is an associative array of RGB triples, 0 - 255.
assert.deepEqual [ 181, 196, 221 ], colors[0]
```


## API

### getPalette

- source: Instance of the `CanvasImage` helper class. It uses the APIs of the Canvas and Image elements to ready an array of pixel color data for color thief.
- colorCount: `Integer`. Value between 1 and 255 inclusive. Lower numbers yield results about the dominant color in an image. Higher numbers yield a rough sampling of the image's effective color gamut. Defaults to 10.
- quality: `Integer`. 1 is maximum quality. Higher number is a faster computation, but is a coarser sampling. Defaults to 10.
- allowWhite: `Boolean`. Includes near-white pixels in the calculation. Defaults to false.


Returns an associate array of RGB triples, values from 0 to 255.