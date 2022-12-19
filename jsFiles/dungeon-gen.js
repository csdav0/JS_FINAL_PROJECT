import TILES from "./tile-mapper.js";
import Player from "./player.js";
import FogOfWar from "./fog-of-war.js";

export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super();
    this.level = 0;
  }

  preload() {
    //load music
    this.load.audio("dungeon-main", "assets/audio/Alone.mp3");
    //load tile images
    this.load.image("tiles", "assets/basictiles_og_scaled48.png");
    //load character sprite
    this.load.spritesheet("knight", "assets/spritesheets/32bit-knight.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.level++;
    this.hasPlayerReachedStairs = false;
    const music = this.sound.add("dungeon-main", { loop: true });
    music.play();

    this.dungeon = new Dungeon({
      width: 40,
      height: 40,
      doorPadding: 3,
      rooms: {
        width: { min: 7, max: 11, onlyOdd: true }, //sets width range of rooms and specifies only odd widths
        height: { min: 7, max: 11, onlyOdd: true },
      },
      maxRooms: 7,
    });

    //create blank map
    const map = this.make.tilemap({
      tileWidth: 48,
      tileHeight: 48,
      width: this.dungeon.width,
      height: this.dungeon.height,
    });

    //load a tileset
    const tileset = map.addTilesetImage("tiles", null, 48, 48, 0, 0);

    this.groundLayer = map
      .createBlankLayer("Ground", tileset)
      .fill(TILES.empty);
    this.worldLayer = map.createBlankLayer("World", tileset);
    const fogLayer = map.createBlankLayer("Fog", tileset).fill(TILES.empty);

    this.fogOfWar = new FogOfWar(fogLayer);

    //place wall and floor tiles in ground layer
    this.dungeon.rooms.forEach((room) => {
      const { x, y, width, height, left, right, top, bottom } = room;
      //fill room w floor tiles (minus walls)
      this.groundLayer.fill(14, x + 1, y + 1, width - 2, height - 2);

      //place room corners
      this.groundLayer.putTileAt(3, left, top);
      this.groundLayer.putTileAt(3, right, top);
      this.groundLayer.putTileAt(2, right, bottom);
      this.groundLayer.putTileAt(2, left, bottom);

      //place non-corner walls
      this.groundLayer.fill(0, left + 1, top, width - 2, 1);
      this.groundLayer.fill(2, left + 1, bottom, width - 2, 1);
      this.groundLayer.fill(1, left, top + 1, 1, height - 2);
      this.groundLayer.fill(1, right, top + 1, 1, height - 2);

      //place doors
      const doors = room.getDoorLocations();
      for (let i = 0; i < doors.length; i++) {
        if (doors[i].y === 0) {
          this.groundLayer.putTilesAt(
            TILES.door.top,
            x + doors[i].x - 1,
            y + doors[i].y
          );
        } else if (doors[i].y === room.height - 1) {
          this.groundLayer.putTilesAt(
            TILES.door.bottom,
            x + doors[i].x - 1,
            y + doors[i].y
          );
        } else if (doors[i].x === 0) {
          this.groundLayer.putTilesAt(
            TILES.door.left,
            x + doors[i].x,
            y + doors[i].y - 1
          );
        } else if (doors[i].x === room.width - 1) {
          this.groundLayer.putTilesAt(
            TILES.door.right,
            x + doors[i].x,
            y + doors[i].y - 1
          );
        }
      }
    });

    //indexable array of rooms
    const rooms = this.dungeon.rooms.slice();
    //set player spawn room as first room
    const spawnRoom = rooms.shift();
    //store a random room as goal room where stairs will be located
    const goalRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    //take 90% of remaining rooms to place random objects
    const remainderRooms = Phaser.Utils.Array.Shuffle(rooms).slice(
      0,
      rooms.length * 0.9
    );

    this.worldLayer.putTileAt(
      TILES.stairsDown,
      goalRoom.centerX,
      goalRoom.centerY
    );

    remainderRooms.forEach((room) => {
      const randomizer = Math.random();
      if (randomizer <= 0.12) {
        //25% chance of chest
        this.worldLayer.putTileAt(TILES.chest, room.centerX, room.centerY);
      } else if (randomizer <= 0.5) {
        //50% chance of pot
        const x = Phaser.Math.Between(room.left + 2, room.right - 2);
        const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
        this.worldLayer.putTileAt(TILES.pot, x, y);
      } else {
        //25% of either half column or brazier
        if (room.height >= 5) {
          const x = Phaser.Math.Between(room.left + 2, room.right - 2);
          const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
          this.worldLayer.putTileAt(TILES.halfColumn, x, y);
          this.worldLayer.putTileAt(TILES.halfColumn, x + 1, y + 1);
          // this.worldLayer.putTileAt(TILES.halfColumn, x, y);
        } else {
          const x = Phaser.Math.Between(room.left + 2, room.right - 2);
          const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
          this.worldLayer.putTileAt(TILES.brazier, x, y);
        }
      }
    });

    this.groundLayer.setCollisionByExclusion([-1, 14]);
    this.worldLayer.setCollisionByExclusion([-1, 57]);

    const camera = this.cameras.main;
    //place player in first room
    const playerRoom = spawnRoom;
    const x = map.tileToWorldX(playerRoom.centerX);
    const y = map.tileToWorldY(playerRoom.centerY);
    this.player = new Player(this, x, y, camera);

    //watch for collisions b/n player and ground layer
    this.physics.add.collider(this.player.sprite, this.groundLayer);
    //worldlayer
    this.physics.add.collider(this.player.sprite, this.worldLayer);

    //initialize camera and set bounds and assign to follow player

    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player.sprite);

    //instructions text
    this.add
      .text(16, 16, "WASD to move, click to attack, spacebar to roll", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setScrollFactor(0);
  }

  update() {
    this.player.update();

    //find player's room using helper method from dungeon API that converts dungeon XY (grid units) to corresponding room instance
    const playerTileX = this.groundLayer.worldToTileX(this.player.sprite.x);
    const playerTileY = this.groundLayer.worldToTileY(this.player.sprite.y);
    const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);

    this.fogOfWar.setActiveRoom(playerRoom);
  }
}
