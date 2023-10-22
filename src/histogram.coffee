import * as C from "./constants"
import * as pv from "./pv"


getColorIndex = ( r, g, b ) ->
  (r << (2 * C.sigbits)) + (g << C.sigbits) + b

# Histogram is a 1D array, giving the number of pixels in each quantized region
getHistogram = ( pixels ) ->
  size = 1 << ( 3 * C.sigbits )
  histogram = new Array size

  for pixel in pixels
    r = pixel[0] >> C.rshift
    g = pixel[1] >> C.rshift
    b = pixel[2] >> C.rshift
    index = getColorIndex r, g, b
    current = histogram[index] ? 0
    histogram[index] = current + 1

  histogram


export { 
  getColorIndex
  getHistogram
}