import * as C from "./constants"
import * as pv from "./pv"
import { Queue } from "./queue"
import { VBox } from "./vbox"
import { ColorMap } from "./color-map"
import { getHistogram } from "./histogram"
import { Engine } from "./engine"


comparePopulation = ( a, b ) -> 
  pv.naturalOrder a.count(), b.count()

compareOccupancy = ( a, b ) ->
  pv.naturalOrder (a.count() * a.volume()), (b.count() * b.volume())


quantize = ( pixels, maxColors ) ->        
  histogram = getHistogram pixels
  histogramSize = 1 << ( 3 * C.sigbits )

  # get the starting vbox from the colors
  vbox = VBox.fromPixels pixels, histogram
  queue1 = Queue.create compare: comparePopulation
  queue1.push vbox
  
  # first set of colors, sorted by population
  engine = Engine.create { queue: queue1, histogram }
  engine.run C.populationFraction * maxColors

  # re-sort by the product of pixel occupancy times the size in color space.
  queue2 = Queue.create compare: compareOccupancy
  while queue1.size > 0
    queue2.push queue1.pop()
  
  # next set - generate the median cuts using the (npix * vol) sorting.
  engine.queue = queue2
  engine.run maxColors - queue2.size

  # calculate the actual colors
  colorMap = ColorMap.create()
  while queue2.size > 0
    colorMap.push queue2.pop()  
  
  colorMap

export { quantize }





# {
#     "r1": 28,
#     "r2": 29,
#     "g1": 11,
#     "g2": 12,
#     "b1": 0,
#     "b2": 3,
#     "count": 3,
#     "volume": 16,
#     "avg": [
#         228,
#         100,
#         14
#     ]
# }


# {
#     "r1": 28,
#     "r2": 29,
#     "g1": 11,
#     "g2": 12,
#     "b1": 0,
#     "b2": 3,
#     "count": 3,
#     "volume": 16,
#     "avg": [
#         228,
#         100,
#         14
#     ]
# }






# {
#     "r1": 8,
#     "r2": 7,
#     "g1": 5,
#     "g2": 5,
#     "b1": 0,
#     "b2": 0,
#     "count": 190895,
#     "volume": 0,
#     "avg": [
#         61,
#         44,
#         4
#     ]
# }


# {
#     "r1": 8,
#     "r2": 7,
#     "g1": 5,
#     "g2": 5,
#     "b1": 0,
#     "b2": 0,
#     "count": 0,
#     "volume": 0,
#     "avg": [
#         64,
#         44,
#         4
#     ]
# }













