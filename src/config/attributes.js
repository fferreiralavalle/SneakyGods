export const crystals = {
  Combat: {
    id: "Combat",
    label: "Combat",
    icon: "https://i.imgur.com/xlG4vY4.png"
  },
  Favor: {
    id: "Favor",
    label: "Favor",
    icon: "https://i.imgur.com/hNMDakZ.png"
  },
  Resolve: {
    id: "Resolve",
    label: "Resolve",
    icon: "https://i.imgur.com/EVEFfXg.png"
  }
}

export const GetAttribute = (id) => {
  return crystals[id];
}
