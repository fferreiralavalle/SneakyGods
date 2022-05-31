export const icons = {
  0: {
    id: 0,
    label: "Combat",
    alias: ["combat","com"],
    icon: "https://i.imgur.com/TGbHSmU.png"
  },
  1: {
    id: 1,
    label: "Charisma",
    alias: ["charsima","cha"],
    icon: "https://i.imgur.com/eg7KjF7.png"
  },
  2: {
    id: 2,
    label: "Resolve",
    alias: ["resolve","res"],
    icon: "https://i.imgur.com/EVEFfXg.png" //"https://i.imgur.com/Yee6iIf.png"
  },
  3: {
    id: 3,
    label: "Favor",
    alias: ["favor","fav"],
    icon: "https://i.imgur.com/hNMDakZ.png"
  },
  4: {
    id: 4,
    label: "Resolve",
    alias:["resolve, res"],
    icon: "https://i.imgur.com/d6GFTzt.png"
  },
  5: {
    id: 5,
    label: "Reveal",
    alias: ["rev", "reveal"],
    icon: "https://i.imgur.com/EVEFfXg.png"
  },
  7: {
    id: 7,
    label: "Neighbor",
    alias: ["nei", "neighbor"],
    icon: "https://i.imgur.com/motsSAf.png"
  },
  8: {
    id: 8,
    label: "Library",
    alias: ["lib", "library"],
    icon: "https://i.imgur.com/TVJbT0x.png"
  }
}

export const GetIcon = (id) => {
  return icons[id];
}
