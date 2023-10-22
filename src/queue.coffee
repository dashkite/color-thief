import * as Meta from "@dashkite/joy/metaclass"
import * as Type from "@dashkite/joy/type"


class Queue
  constructor: ({ @compare }) ->
    @items = []
    @sorted = false

  Meta.mixin @::, [
    Meta.getters
      size: -> @items.length
  ]

  @create: ({ compare }) ->
    new Queue({ compare })

  @isType: Type.isType @

  sort: ->
    if @sorted != true
      @items.sort @compare
      @sorted = true

  push: ( item ) ->
    @items.push item
    @sorted = false

  peek: ( index ) ->
    @sort()
    index ?= @items.length - 1
    @items[ index ]

  pop: ->
    @sort()
    @items.pop()

  map: ( f ) ->
    @items.map f

  debug: ->
    @sort()
    @items


export { Queue }