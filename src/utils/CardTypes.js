import { SportsKabaddi, MenuBook, Person, RecordVoiceOver, LocationCity, Brightness4 } from '@material-ui/icons';
import colors from '../config/colors';

export const cardTypes = {
  minion: {
    id: "minion",
    label: "Champion Follower",
    iconComponent: SportsKabaddi,
    statsInfo: {
      hasAttributes: true
    },
    heightRatio: 1.4,
    typeColor: colors.keyword,
    priority: 5,
  },
  basic: {
    id: "basic",
    label: "Follower",
    iconComponent: SportsKabaddi,
    statsInfo: {
      hasAttributes: true
    },
    heightRatio: 1.4,
    typeColor: colors.keyword,
    priority: 6,
  },
  spell: {
    id: "spell",
    label: "Intervention",
    iconComponent: MenuBook,
    statsInfo: {
    },
    heightRatio: 1.4,
    typeColor: colors.library,
    priority: 3,
  },
  curse: {
    id: "curse",
    label: "Curse",
    iconComponent: MenuBook,
    statsInfo: {
    },
    heightRatio: 1,
    typeColor: colors.apocalypsis,
    priority: 2,
  },
  blessing: {
    id: "blessing",
    label: "Blessing",
    iconComponent: MenuBook,
    statsInfo: {
    },
    heightRatio: 1,
    typeColor: colors.reveal,
    priority: 1,
  },
  quest: {
    id: "quest",
    label: "Quest",
    iconComponent: LocationCity,
    statsInfo: {
      hasAttributes: true,
    },
    heightRatio: 1.4,
    typeColor: colors.quest,
    priority: 4,
  },
  epicQuest: {
    id: "epicQuest",
    label: "Final Quest",
    iconComponent: LocationCity,
    statsInfo: {
      hasAttributes: true,
    },
    heightRatio: 1.4,
    typeColor: colors.quest,
    priority: 4.5,
  },
  villain: {
    id: "villain",
    label: "God",
    iconComponent: Person,
    statsInfo: {
    },
    heightRatio: 1.4,// 0.715,
    typeColor: colors.villain,
    priority: 10,
  },
}

export const GetTypeData = (type="minion") => cardTypes[type];