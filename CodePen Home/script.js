const { log } = console;

log('🎨');

const internals = {
  config: {
    totalGroups: 50 },

  colors: [
  [0x00ffff, 0xff0000],
  [0x00ff00, 0xff00ff],
  [0x0000ff, 0xffff00]] };



internals.w = window.innerWidth;
internals.h = window.innerHeight;

internals.random = (min, max) => min + Math.random() * (max - min);

// -------

internals.app = new PIXI.Application({
  width: internals.w,
  height: internals.h,
  antialias: true,
  resolution: window.devicePixelRatio,
  transparent: false,
  autoResize: true,
  backgroundColor: 0xFFFFFF });


document.body.appendChild(internals.app.view);

// -------

class Shapes {

  constructor(index) {

    this.index = index;
    this.offset = 50;
    this.colorsIndex = 0;

    this.container = new PIXI.Container();
    this.graphicsContainer = new PIXI.Container();
    this.graphicA = new PIXI.Graphics();
    this.graphicA.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    this.graphicB = new PIXI.Graphics();
    this.graphicB.blendMode = PIXI.BLEND_MODES.MULTIPLY;

    this.draw(0);

    this.graphicsContainer.addChild(this.graphicA);
    this.graphicsContainer.addChild(this.graphicB);

    this.container.addChild(this.graphicsContainer);

    this.container.pivot.x = this.getWidth() / 2;
    this.container.pivot.y = this.getHeight() / 2;

    this.reset().animate();
  }

  get() {

    return this.container;
  }

  getWidth() {

    return this.get().children[0].width;
  }

  getHeight() {

    return this.get().children[0].height;
  }

  draw(colorsIndex) {

    if (colorsIndex === undefined) {
      this.colorsIndex = ++this.colorsIndex % internals.colors.length;
    }

    const colors = internals.colors[this.colorsIndex];

    if (this.index % 2) {
      this.graphicA.clear();
      this.graphicA.beginFill(colors[0]);
      this.graphicA.drawRect(internals.random(0, this.offset), internals.random(0, this.offset), 60, 60);
      this.graphicA.endFill();

      this.graphicA.beginFill(colors[1]);
      this.graphicA.drawRect(internals.random(0, this.offset), internals.random(0, this.offset), 60, 60);
      this.graphicA.endFill();
    } else
    {
      this.graphicB.clear();
      this.graphicB.beginFill(colors[0]);
      this.graphicB.drawCircle(internals.random(0, this.offset), internals.random(0, this.offset), 30);
      this.graphicB.endFill();

      this.graphicB.beginFill(colors[1]);
      this.graphicB.drawCircle(internals.random(0, this.offset), internals.random(0, this.offset), 30);
      this.graphicB.endFill();
    }

    return this;
  }

  animate() {

    let positionX, positionY;

    const rotation = internals.random(-360, 360);
    const scale = internals.random(0.5, 1.25);
    const delay = this.index * 0.1;

    if (Math.random() > 0.5) {
      positionX = internals.random(0 - this.getWidth(), internals.w + this.getWidth());
      positionY = Math.random() > 0.5 ? internals.h + this.getHeight() : -this.getHeight();
    } else
    {
      positionX = Math.random() > 0.5 ? internals.w + this.getWidth() : -this.getWidth();
      positionY = internals.random(0 - this.getHeight(), internals.h + this.getHeight());
    }

    TweenMax.to(this.get(), internals.random(2, 6), {
      pixi: {
        positionX,
        positionY,
        rotation,
        scale },

      delay,
      onComplete: () => {

        this.reset().animate();
      } });


    return this;
  }

  reset() {

    this.get().scale.set(0);
    this.get().position.set(internals.w / 2, internals.h / 2);
    this.get().rotation = 0;

    return this;
  }}


// -------

TweenLite.defaultEase = Power0.easeNone;

internals.shapes = [];
for (let i = 0; i < internals.config.totalGroups; i++) {if (window.CP.shouldStopExecution(0)) break;
  const s = new Shapes(i);
  internals.shapes.push(s);
  internals.app.stage.addChild(s.get());
}

// -------
window.CP.exitedLoop(0);
function changeColors() {
  const len = internals.shapes.length;

  for (let i = 0; i < len; i++) {if (window.CP.shouldStopExecution(1)) break;
    internals.shapes[i].draw();
  }window.CP.exitedLoop(1);
}

function resize() {

  setTimeout(() => {

    internals.w = window.innerWidth;
    internals.h = window.innerHeight;
    internals.app.renderer.resize(internals.w, internals.h);
  }, 200);
}

function render() {

  internals.app.renderer.render(internals.app.stage);
}

window.addEventListener('click', changeColors);
window.addEventListener('touchstart', changeColors);
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);
TweenLite.ticker.addEventListener("tick", render);