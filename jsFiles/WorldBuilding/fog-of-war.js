export default class FogOfWar {
  constructor(fogLayer) {
    this.fogLayer = fogLayer;
    this.activeRoom = null;
  }

  setActiveRoom(room) {
    if (room !== this.activeRoom) {
      this.setRoomAlpha(room, 0); //makes room visible (0 opacity)
      if (this.activeRoom) this.setRoomAlpha(this.activeRoom, 0.5); //makes previous room dim (0.5 opacity)
      this.activeRoom = room;
    }
  }

  setRoomAlpha(room, alpha) {
    this.fogLayer.forEachTile(
      (t) => (t.alpha = alpha),
      this,
      room.x,
      room.y,
      room.width,
      room.height
    );
  }
}
