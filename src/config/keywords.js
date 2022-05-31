import { cardTypes } from "../utils/CardTypes";
import colors from "./colors";
import { GetIcon } from "./icons";

export const keywords = {
  might: {
    id: "might",
    label: "Might",
    alias: ["might","mig"],
    color: colors.might,
    icon: "https://i.imgur.com/xlG4vY4.png"// GetIcon(0).icon
  },
  temple: {
    id: "temple",
    label: "Temple",
    alias: ["tem", "temple"],
    color: colors.geyser,
    icon: "https://i.imgur.com/FOdFbBf.png"
  },
  neighbor: {
    id: "neighbor",
    label: "Follower",
    alias: ["fol","follower"],
    color: colors.keyword,
    icon: "https://i.imgur.com/LZvF0js.png"
  },
  neighbors: {
    id: "neighbors",
    label: "Followers",
    alias: ["fols","followers"],
    color: colors.keyword,
    icon: "https://i.imgur.com/LZvF0js.png"
  },
  favor: {
    id: "favor",
    label: "Favor",
    alias: ["fav","favor"],
    color: colors.minion,
    icon: GetIcon(3).icon
  },
  blessing: {
    id: "blessing",
    label: "Blessing",
    alias: ["ble","blessing"],
    color: colors.reveal,
    icon: "https://i.imgur.com/oKieTZ1.png"
  },
  blessings: {
    id: "blessings",
    label: "Blessings",
    alias: ["bles","blessings"],
    color: colors.reveal,
    icon: "https://i.imgur.com/oKieTZ1.png"
  },
  curse: {
    id: "curse",
    label: "Curse",
    alias: ["cur","curse"],
    color: colors.apocalypsis,
    icon: "https://i.imgur.com/ifrETw2.png"
  },
  curses: {
    id: "blessings",
    label: "Curses",
    alias: ["curs","curses"],
    color: colors.apocalypsis,
    icon: "https://i.imgur.com/ifrETw2.png"
  },
  destory: {
    id: "destroy",
    label: "Destroy",
    alias: ["des", "destroy"],
    color: colors.destroy,
    icon: "https://i.imgur.com/GvlPaLy.png"
  },
  destoryed: {
    id: "destroyed",
    label: "Destroyed",
    alias: ["desd", "destroyed"],
    color: colors.destroy,
    icon: "https://i.imgur.com/GvlPaLy.png"
  },
  destory: {
    id: "destroy",
    label: "Destroy",
    alias: ["des", "destroy"],
    color: colors.destroy,
    icon: "https://i.imgur.com/GvlPaLy.png"
  },
  sacrifice: {
    id: "sacrifice",
    label: "Sacrifice",
    alias: ["sac", "sacrifice"],
    color: colors.destroy,
    icon: GetIcon(0).icon
  },
  sacrificed: {
    id: "sacrificed",
    label: "Sacrificed",
    alias: ["sacd", "sacrificed"],
    color: colors.destroy,
    icon: GetIcon(0).icon
  },
  library: {
    id: "library",
    label: "Library",
    alias: ["lib", "library"],
    color: cardTypes.spell.typeColor,
    icon: GetIcon(8).icon
  },
  spell: {
    id: "spell",
    label: "Spell",
    alias: ["spe", "spell"],
    color: cardTypes.spell.typeColor,
  },
  threat: {
    id: "threat",
    label: "Threat Level",
    alias: ["thr", "threat"],
    color: colors.power,
  },
}

export const GetKeyword = (id) => {
  return keywords[id];
}