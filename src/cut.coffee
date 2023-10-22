import * as C from "./constants"
import * as pv from "./pv"


getAxialSum = ( histogram, vbox ) ->
  rw = vbox.r2 - vbox.r1 + 1
  gw = vbox.g2 - vbox.g1 + 1
  bw = vbox.b2 - vbox.b1 + 1
  maxw = pv.max [ rw, gw, bw ]

  if rw == maxw
    axis = "r"
    x1 = vbox.r1
    x2 = vbox.r2
    y1 = vbox.g1
    y2 = vbox.g2
    z1 = vbox.b1
    z2 = vbox.b2
    getColorIndex = ( r, g, b ) ->
      (r << (2 * C.sigbits)) + (g << C.sigbits) + b
  else if gw == maxw
    axis = "g"
    x1 = vbox.g1
    x2 = vbox.g2
    y1 = vbox.r1
    y2 = vbox.r2 
    z1 = vbox.b1
    z2 = vbox.b2
    getColorIndex = ( g, r, b ) ->
      (r << (2 * C.sigbits)) + (g << C.sigbits) + b
  else
    axis = "b"
    x1 = vbox.b1
    x2 = vbox.b2
    y1 = vbox.r1
    y2 = vbox.r2
    z1 = vbox.g1
    z2 = vbox.g2
    getColorIndex = ( b, r, g ) ->
      (r << (2 * C.sigbits)) + (g << C.sigbits) + b
  
  total = 0
  partialSums = []
  lookAheadSums = []

  for i in [ x1 .. x2 ] when x1 <= x2
    sum = 0
    for j in [ y1 .. y2 ] when y1 <= y2
      for k in [ z1 .. z2 ] when z1 <= z2
        index = getColorIndex i, j, k
        sum += histogram[ index ] || 0

    total += sum
    partialSums[i] = total

  for partial in partialSums
    lookAheadSums.push total - partial

  {
    vbox
    axis
    total
    partialSums
    lookAheadSums
  }



cutVBox = ( axialSum ) ->
  { vbox, axis, total, partialSums, lookAheadSums } = axialSum
  d1 = axis + "1"
  d2 = axis + "2"
  x = vbox[d1]
  y = vbox[d2]
  halfTotal = total / 2


  for i in [ x .. y ] when x <= y
    continue if partialSums[i] <= halfTotal

    vbox1 = vbox.copy()
    vbox2 = vbox.copy()
    left = i - vbox[ d1 ]
    right = vbox[ d2 ] - i
    if left <= right
      index = Math.min vbox[d2] - 1, ~~(i + right / 2)
    else 
      index = Math.max vbox[d1], ~~(i - 1 - left / 2)
    
    # avoid 0-count boxes
    while !partialSums[ index ]
      index++

    count = lookAheadSums[ index ]
    while !count && partialSums[ index - 1 ]
      count = lookAheadSums[ --index ]
    
    # set dimensions
    vbox1[ d2 ] = index
    vbox2[ d1 ] = vbox1[ d2 ] + 1  
    return [ vbox1, vbox2 ]               


applyMedianCut = ( histogram, vbox ) ->
  if !vbox.count() 
    return

  # If only one pixel, don't split
  if vbox.count() == 1
    return [ vbox.copy() ]

  # split - returns an array of two vboxes
  cutVBox getAxialSum histogram, vbox


export { applyMedianCut }