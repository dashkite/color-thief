import * as C from "./constants"
import { applyMedianCut } from "./cut"


class Engine
  constructor: ({ @queue, @histogram }) ->

  @create: ({ queue, histogram }) ->
    new Engine { queue, histogram }

  run: ( target ) ->
    iterations = 0
    colorCount = 1

    while iterations < C.maxIterations
      vbox = @queue.pop()
      
      # Just put it back
      if !vbox.count()
        @queue.push vbox
        iterations++
        continue

      # Split the space
      [ vbox1, vbox2 ] = applyMedianCut @histogram, vbox
      @queue.push vbox1
      if vbox2?
        @queue.push vbox2
        colorCount++

      # Stop conditions
      if colorCount >= target
        return
      if iterations >= C.maxIterations
        return # Can happen if there are too few pixels



export { Engine }