import ArcadeBody2D = require("./ArcadeBody2D");
let THREE = SupEngine.THREE;

class ArcadeBody2DMarker extends SupEngine.ActorComponent {
  static Updater = require("./ArcadeBody2DUpdater");

  line: THREE.Line;

  constructor(actor: SupEngine.Actor) {
    super(actor, "ArcadeBody2DMarker");
  }

  setSize(width: number, height: number) {
    if (this.line != null) this._clearRenderer();

    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-width / 2, -height / 2, 0.01));
    geometry.vertices.push(new THREE.Vector3( width / 2, -height / 2, 0.01));
    geometry.vertices.push(new THREE.Vector3( width / 2,  height / 2, 0.01));
    geometry.vertices.push(new THREE.Vector3(-width / 2,  height / 2, 0.01));
    geometry.vertices.push(new THREE.Vector3(-width / 2, -height / 2, 0.01));

    let material = new THREE.LineBasicMaterial({color: 0xf459e4});

    this.line = new THREE.Line(geometry, material);
    this.actor.threeObject.add(this.line);
    this.line.updateMatrixWorld(false);
  }

  setOffset(x: number, y: number) {
    this.line.position.setX(x);
    this.line.position.setY(y);
    this.line.updateMatrixWorld(false);
  }

  _clearRenderer() {
    this.actor.threeObject.remove(this.line);
    this.line.geometry.dispose();
    this.line.material.dispose();
    this.line = null;
  }
}
export = ArcadeBody2DMarker;
