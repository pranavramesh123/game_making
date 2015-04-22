import ArcadeBody2DMarker = require("./ArcadeBody2DMarker");

class ArcadeBody2DUpdater {
  bodyRenderer: ArcadeBody2DMarker;
  config: {width: number; height: number; offsetX: number; offsetY: number}

  constructor(client: any, bodyRenderer: ArcadeBody2DMarker, config: {width: number; height: number; offsetX: number; offsetY: number}) {
    this.bodyRenderer = bodyRenderer;
    this.config = config;
    this.bodyRenderer.setSize(this.config.width, this.config.height);
    this.bodyRenderer.setOffset(this.config.offsetX, this.config.offsetY);
  }

  config_setProperty(path: string, value: any) {
    (<any>this.config)[path] = value;

    if (path in ['width', 'height']) this.bodyRenderer.setSize(this.config.width, this.config.height);
    if (path in ['offsetX', 'offsetY']) this.bodyRenderer.setOffset(this.config.offsetX, this.config.offsetY);
  }
}
export = ArcadeBody2DUpdater;
