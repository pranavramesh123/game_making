import * as path from "path";
import * as fs from "fs";

interface TileMapSettingsResourcePub {
  pixelsPerUnit: number;
  width: number;
  height: number;
  layerDepthOffset: number;

  grid: { width: number; height: number; };
}

export default class TileMapSettingsResource extends SupCore.data.base.Resource {

  static schema = {
    pixelsPerUnit: { type: "integer", min: 1, mutable: true },
    width: { type: "integer", min: 1, mutable: true },
    height: { type: "integer", min: 1, mutable: true },
    layerDepthOffset: { type: "number", min: 0, mutable: true },

    grid: {
      type: "hash",
      properties: {
        width: { type: "integer", min: 1, mutable: true },
        height: { type: "integer", min: 1, mutable: true }
      }
    }
  };

  pub: TileMapSettingsResourcePub;

  constructor(pub: TileMapSettingsResourcePub, serverData: any) {
    super(pub, TileMapSettingsResource.schema, serverData);
  }

  setup() {}

  init(callback: Function) {
    this.pub = {
      pixelsPerUnit: 100,
      width: 30,
      height: 20,
      layerDepthOffset: 1,

      grid: {
        width: 40,
        height: 40
      }
    };

    super.init(callback);
  }
  
  // TODO: Remove these at some point, new config setting introduced in Superpowers 0.8
  load(resourcePath: string) {
    fs.readFile(path.join(resourcePath, "resource.json"), { encoding: "utf8" }, (err, json) => {
      if (err != null) {
        if (err.code === "ENOENT") {
          this.init( () => { this.emit("load") } );
          return;
        }

        throw err;
      }

      this.pub = JSON.parse(json);
      if (this.pub["gridSize"] != null) {
        this.pub.grid = { width: this.pub["gridSize"], height: this.pub["gridSize"] };
        delete this.pub["gridSize"];
      }
      
      this.setup();
      this.emit("load");
    });
  }
}
