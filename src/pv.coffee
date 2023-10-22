###
Adapted from Protovis: http://mbostock.github.com/protovis/
Copyright 2010 Stanford Visualization Group
Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
###

map = ( ax, f ) ->
  object = {}
  if f
    ax.map ( data, index ) ->
      object.index = index
      f.call object, data
  else
    ax.slice()

naturalOrder = ( a, b ) ->
  if a < b
    -1 
  else if a > b
    1
  else
    0

sum = ( ax, f ) ->
  object = {}
  if f
    g = ( total, data, index ) ->
      object.index = index
      total + f.call object, data
  else
    g = ( product, data ) -> total + data

  ax.reduce g, 0

max = ( ax, f ) ->
  Math.max.apply null, if f then ( map ax, f ) else ax
  

export {
  map
  naturalOrder
  sum
  max
}