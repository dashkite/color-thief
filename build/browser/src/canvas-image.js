var CanvasImage;
import * as Meta from "@dashkite/joy/metaclass";
import * as Type from "@dashkite/joy/type";
CanvasImage = function () {
  class CanvasImage {
    constructor({
      canvas,
      image
    }) {
      this.context = canvas.getContext("2d");
      this.width = canvas.width = image.naturalWidth;
      this.height = canvas.height = image.naturalHeight;
      this.context.drawImage(image, 0, 0, this.width, this.height);
    }
    static create({
      canvas,
      image
    }) {
      return new CanvasImage({
        canvas,
        image
      });
    }
    clear() {
      return this.context.clearRect(0, 0, this.width, this.height);
    }
    update(data) {
      return this.context.putImageData(data, 0, 0);
    }
  }
  ;
  Meta.mixin(CanvasImage.prototype, [Meta.getters({
    pixelCount: function () {
      return this.width * this.height;
    },
    data: function () {
      return this.context.getImageData(0, 0, this.width, this.height);
    },
    pixels: function () {
      return this.data.data;
    }
  })]);
  CanvasImage.isType = Type.isType(CanvasImage);
  return CanvasImage;
}.call(this);
export { CanvasImage };