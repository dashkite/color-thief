import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"


class CanvasImage
  constructor: ({ canvas, image }) ->
    @context = canvas.getContext "2d"
    @width = canvas.width = image.naturalWidth
    @height = canvas.height = image.naturalHeight
    @context.drawImage image, 0, 0, @width, @height

  Meta.mixin @::, [
    Meta.getters
      pixelCount: -> @width * @height
      data: -> @context.getImageData 0, 0, @width, @height
      pixels: -> @data.data
  ]

  @create: ({ canvas, image }) ->
    new CanvasImage { canvas, image }

  @isType: Type.isType @

  clear: ->
    @context.clearRect 0, 0, @width, @height

  update: ( data ) ->
    @context.putImageData data, 0, 0


export { CanvasImage }