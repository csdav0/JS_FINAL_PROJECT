//map tile indices
const TILE_MAP = {
  stoneWall: {
    topLeft: 1,
    topRight: 3,
    botLeft: 0,
    botRight: 2,
    Top: 0,
    Left: 1,
    Right: 0,
    Bottom: 2,
  },
  lavaWall: {
    borderLeft: 34,
    borderRight: 32,
    borderTop: 41,
    borderBottom: 25,
    TopWall: 15,
    insideCTopLeft: 42,
    insideCTopRight: 40,
    insideCBottomRight: 24,
    insideCBottomLeft: 26,
  },
  empty: 22,
  floor: 14,
  door: {
    top: [0, 14, 14, 0],
    left: [[2], [14], [14], [1]],
    right: [[2], [14], [14], [1]],
    bottom: [2, 14, 14, 2],
  },
  stairsUp: 56,
  stairsDown: 57,
  brazier: 60,
  pot: 27,
  potbroken: 28,
  chest: 36,
  chestOpen: 35,
  passageFadeOverLay: 33,
  halfColumn: 39,
};

export default TILE_MAP;
