import * as Type from "@dashkite/joy/type"
import * as C from "./constants"
import * as pv from "./pv"
import { Queue } from "./queue"
import { getColorIndex } from "./histogram"


compare = ( a, b ) ->
  pv.naturalOrder ( a.vbox.count() * a.vbox.volume() ),
    ( b.vbox.count() * b.vbox.volume() )


class ColorMap
  constructor: () ->
    @vboxes = Queue.create { compare }

  @create: () ->
    new ColorMap()
 
  push: ( vbox ) ->
    color = vbox.avg()
    @vboxes.push { vbox, color }
     
  palette: -> 
    @vboxes.map ( vbox ) -> vbox.color

  size: ->
    @vboxes.size()

  map: ( color ) ->
    for i in [ 0 ... @vboxes.size ]
      value = @vboxes.peek i
      if value.vbox.contains color
        return value.color

    @nearest color
  
  nearest: ( color ) ->
    result = null
    nearest = 1e12
    for i in [ 0 ... @vboxes.size ]
      current = @vboxes.peek(i).color
      distance = Math.sqrt(
        (Math.pow color[0] - current[0], 2) +
        (Math.pow color[1] - current[1], 2) +
        (Math.pow color[2] - current[2], 2)
      )

      if distance < nearest
        nearest = distance
        result = current

    result


export { ColorMap }