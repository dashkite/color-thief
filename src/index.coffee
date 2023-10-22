import * as Type from "@dashkite/joy/type"
import { CanvasImage } from "./canvas-image"
import { quantize } from "./quantize"


getColor = ( options ) ->
  options.colorCount ?= 5
  ( getPalette options )[ 0 ]


getPalette = ( options ) ->
  options.colorCount ?= 10
  options.quality ?= 10
  extract options


extract = ( options ) ->
  if ! CanvasImage.isType options.source
    throw new Error "options.source must be instance of color-thief CanvasImage"

  options.colorCount = Math.round options.colorCount
  if (Type.isNaN options.colorCount) || !(1 < options.colorCount < 256)
    throw new Error "options.colorCount must be an integer between 2 and 255 inclusive"
  
  options.quality = Math.round options.quality
  if (Type.isNaN options.quality) || !(0 < options.quality)
    throw new Error "options.quality must be an integer greater than 0"

  if options.allowWhite == true
    # We need to remove any pixels beyond sRGB?
    doesPass = ( r, g, b ) -> !(r > 255 && g > 255 && b > 255)
  else
    # Filter out pixels that are too close to white rgb(255, 255, 255)
    doesPass = ( r, g, b ) -> !(r > 250 && g > 250 && b > 250)


  # Canvas stores pixel data in a 1D array. Reformat for quantize function.
  rawPixels = options.source.pixels
  allowWhite = options.allowWhite
  pixels = []
  for i in [ 0 ... options.source.pixelCount ] by options.quality
    offset = i * 4
    r = rawPixels[ offset + 0 ]
    g = rawPixels[ offset + 1 ]
    b = rawPixels[ offset + 2 ]
    a = rawPixels[ offset + 3 ]

    # Filter transparent pixels
    continue if a < 125

    # Filter out pixels that are too light
    if ( doesPass r, g, b ) == true
      pixels.push [ r, g, b ]


  # Final check on new pixel array
  if pixels.length == 0
    # # TODO: we should throw here, but I have a weird Svelte issue.
    # throw new Error "quantize pixel array cannot have lenth 0"
    return []


  # quantize clusters values using median cut algorithm
  colorMap = quantize pixels, options.colorCount
  colorMap.palette()


export {
  CanvasImage

  getColor
  getPalette
  extract
}