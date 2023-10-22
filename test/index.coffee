import "source-map-support/register"
import assert from "@dashkite/assert"
import { test, success } from "@dashkite/amen"
import print from "@dashkite/amen-console"

import FS from "node:fs/promises"
import { createCanvas, Image } from "canvas"
import * as T from "../src"


do ->

  print await test "Color Thief", [
    test "palette", ->
      canvas = createCanvas()
      image = new Image()
      image.src = await FS.readFile "test/sunflower-aaron-burden.jpg"
      source = T.CanvasImage.create { canvas, image }

      colorArray = T.getPalette { 
        source, 
        colorCount: 5
        quality: 1
      }

      assert.deepEqual [181, 196, 221 ], colorArray[0]
  ]

  process.exit if success then 0 else 1
