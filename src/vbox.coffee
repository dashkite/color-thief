import * as Type from "@dashkite/joy/type"
import * as C from "./constants"
import { getColorIndex } from "./histogram"


# 3d color space box
class VBox
  constructor: ({ @r1, @r2, @g1, @g2, @b1, @b2, @histogram }) ->

  @create: ({ r1, r2, g1, g2, b1, b2, histogram }) ->
    new VBox { r1, r2, g1, g2, b1, b2, histogram }

  @isType: Type.isType @

  @fromPixels: ( pixels, histogram ) ->
    r1 = g1 = b1 = 1e6
    r2 = g2 = b2 = 0

    for pixel in pixels
      r = pixel[0] >> C.rshift
      g = pixel[1] >> C.rshift
      b = pixel[2] >> C.rshift

      if r < r1
        r1 = r
      else if r > r2
        r2 = r

      if g < g1
        g1 = g
      else if g > g2
        g2 = g

      if b < b1
        b1 = b
      else if b > b2
        b2 = b

    VBox.create { r1, r2, g1, g2, b1, b2, histogram }


  copy: -> VBox.create @

  volume: ( force ) ->
    if force == true || !@_volume?
      @_volume =
        (@r2 - @r1 + 1) * 
        (@g2 - @g1 + 1) * 
        (@b2 - @b1 + 1)

    @_volume


  count: ( force ) ->
    if force == true || !@_count?
      count = 0
      for i in [ @r1 .. @r2 ] when @r1 <= @r2
        for j in [ @g1 .. @g2 ] when @g1 <= @g2
          for k in [ @b1 .. @b2 ] when @b1 <= @b2
            index = getColorIndex i, j, k
            count += @histogram[ index ] || 0

      @_count = count
    
    @_count


  avg: ( force ) ->
    if force == true || !@_avg?
      total = rSum = gSum = bSum = 0
      mult = 1 << ( 8 - C.sigbits )

      for i in [ @r1 .. @r2 ] when @r1 <= @r2
        for j in [ @g1 .. @g2 ] when @g1 <= @g2
          for k in [ @b1 .. @b2 ] when @b1 <= @b2
            index = getColorIndex i, j, k
            value = @histogram[ index ] || 0
            total += value
            rSum += (value * (i + 0.5) * mult)
            gSum += (value * (j + 0.5) * mult)
            bSum += (value * (k + 0.5) * mult)

      if total
        @_avg = [ 
          ~~(rSum / total), 
          ~~(gSum / total), 
          ~~(bSum / total) 
        ]
      else
        @_avg = [
          ~~(mult * (@r1 + @r2 + 1) / 2),
          ~~(mult * (@g1 + @g2 + 1) / 2),
          ~~(mult * (@b1 + @b2 + 1) / 2)
        ]

    @_avg

   
  contains: ( pixel ) ->
    r = pixel[0] >> C.rshift
    g = pixel[1] >> C.rshift
    b = pixel[2] >> C.rshift

    (@r1 <= r <= @r2) && (@g1 <= g <= @g2) && (@b1 <= b <= @b2)


export { VBox }