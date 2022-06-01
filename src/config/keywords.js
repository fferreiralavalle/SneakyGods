import { cardTypes } from "../utils/CardTypes";
import colors from "./colors";
import { GetIcon } from "./icons";

export const keywords = {
  might: {
    id: "might",
    label: "Might",
    alias: ["might", "mig"],
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
  temples: {
    id: "temples",
    label: "Temples",
    alias: ["tems", "temples"],
    color: colors.geyser,
    icon: "https://i.imgur.com/FOdFbBf.png"
  },
  player: {
    id: "player",
    label: "God",
    alias: ["god"],
    color: colors.player,
    icon: cardTypes.villain.icon
  },
  players: {
    id: "players",
    label: "Gods",
    alias: ["gods"],
    color: colors.player,
    icon: cardTypes.villain.icon
  },
  neighbor: {
    id: "neighbor",
    label: "Follower",
    alias: ["fol", "follower"],
    color: colors.keyword,
    icon: cardTypes.minion.icon
  },
  neighbors: {
    id: "neighbors",
    label: "Followers",
    alias: ["fols", "followers"],
    color: colors.keyword,
    icon: cardTypes.minion.icon
  },
  champion: {
    id: "champion",
    label: "Champion",
    alias: ["cfol"],
    color: colors.keyword,
    icon: cardTypes.minion.icon
  },
  champions: {
    id: "champions",
    label: "Champions",
    alias: ["cfols"],
    color: colors.keyword,
    icon: cardTypes.minion.icon
  },
  favor: {
    id: "favor",
    label: "Favor",
    alias: ["fav", "favor"],
    color: colors.minion,
    icon: GetIcon(3).icon
  },
  blessing: {
    id: "blessing",
    label: "Blessing",
    alias: ["ble", "blessing"],
    color: colors.reveal,
    icon: cardTypes.blessing.icon
  },
  blessings: {
    id: "blessings",
    label: "Blessings",
    alias: ["bles", "blessings"],
    color: colors.reveal,
    icon: cardTypes.blessing.icon
  },
  curse: {
    id: "curse",
    label: "Curse",
    alias: ["cur", "curse"],
    color: colors.apocalypsis,
    icon: cardTypes.curse.icon
  },
  curses: {
    id: "blessings",
    label: "Curses",
    alias: ["curs", "curses"],
    color: colors.apocalypsis,
    icon: cardTypes.curse.icon
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
  spell: {
    id: "spell",
    label: "Intervention",
    alias: ["int"],
    color: cardTypes.spell.typeColor,
    icon: cardTypes.spell.icon
  },
  spells: {
    id: "spells",
    label: "Interventions",
    alias: ["ints"],
    color: cardTypes.spell.typeColor,
    icon: cardTypes.spell.icon
  },
  quest: {
    id: "quest",
    label: "Quest",
    alias: ["que"],
    color: cardTypes.quest.typeColor,
    icon: cardTypes.quest.icon
  },
  quests: {
    id: "quests",
    label: "Quests",
    alias: ["ques"],
    color: cardTypes.quest.typeColor,
    icon: cardTypes.quest.icon
  },
  epicQuest: {
    id: "epicQuest",
    label: "Final Quest",
    alias: ["fquest"],
    color: cardTypes.epicQuest.typeColor,
    icon: cardTypes.epicQuest.icon
  }
}

export const GetKeyword = (id) => {
  return keywords[id];
}