export interface MenuItem {
  name: string;
  description: string;
  category: "Zestaw";
  pieceCount: number;
  price: number;
  tags: string[];
}

export interface QuickQuery {
  text: string;
  value: string;
}

export const menuData: MenuItem[] = [
  {
    name: "FUSION SUSHI SET",
    description: "10 grill gold, 10 mango ebi ten, 10 ebi special gold, 10 geisha, 10 tama tuńczyk, 5 otaru",
    category: "Zestaw",
    pieceCount: 55,
    price: 224.00,
    tags: ["mieszane", "pieczone", "surowe", "zestaw", "premium"]
  },
  {
    name: "PARTY SUSHI SET",
    description: "8 hosomaki awokado, 3 nigiri łosoś, 3 nigiri tuńczyk, 10 california philadelphia łosoś pieczony, 10 spider, 10 kegon, 10 grill gold, 10 tama łosoś, 10 mango ebi ten, 10 futomaki pieczony halibut, 6 gunkan krabowa",
    category: "Zestaw",
    pieceCount: 99,
    price: 299.00,
    tags: ["mieszane", "pieczone", "surowe", "zestaw", "duży", "party"]
  },
  {
    name: "FUGU SUSHI SET",
    description: "6 hoso łosoś, 3 nigiri łosoś, 3 nigiri tuńczyk, 10 ura łosoś pieczony, 5 futo krewetka w tempurze, 10 kegon, 10 grill gold, 10 tama łosoś, 10 mango ebi ten, 6 hoso rzepa marynowana, 10 futo pieczony halibut, 6 gunkan sałatka krabowa",
    category: "Zestaw",
    pieceCount: 89,
    price: 335.00,
    tags: ["mieszane", "pieczone", "tempura", "surowe", "zestaw", "premium"]
  },
  {
    name: "FAMILY SUSHI SET",
    description: "5 gold classic, 5 tama krewetka, 8 hoso łosoś, 8 hoso ogórek, 8 hoso oshinko, 9 nigiri mix, 10 california łosoś pieczony, 10 grill gold, 10 mango ebi, 10 geisha, 10 tama łosoś, 10 futo kalmar, 10 futo łosoś",
    category: "Zestaw",
    pieceCount: 113,
    price: 335.00,
    tags: ["mieszane", "rodzinny", "pieczone", "surowe", "zestaw", "duży"]
  },
  {
    name: "TOKYO SUSHI SET",
    description: "5 uramaki krewetka w tempurze, 5 uramaki łosoś pieczony, 5 pieczony węgorz, 5 futomaki pieczony tuńczyk, 5 futomaki kaczka, 6 hosomaki pieczony łosoś, 3 nigiri łosoś, 3 nigiri tuńczyk, 3 nigiri ryba maślana, 1 nigiri krewetka",
    category: "Zestaw",
    pieceCount: 41,
    price: 190.00,
    tags: ["mieszane", "pieczone", "surowe", "zestaw", "premium"]
  },
  {
    name: "OSAKA SUSHI SET",
    description: "10 uramaki łosoś pieczony, 6 hosomaki łosoś, 4 nigiri łosoś, 10 gold classic, 4 gunkan sałatka krabowa",
    category: "Zestaw",
    pieceCount: 34,
    price: 125.00,
    tags: ["pieczone", "łosoś", "zestaw"]
  },
  {
    name: "RAW SALMON SUSHI SET",
    description: "4 nigiri łosoś, 6 hosomaki łosoś, 4 gunkan sałatka krabowa, 10 salmon tartar maki, 10 california łosoś",
    category: "Zestaw",
    pieceCount: 34,
    price: 128.00,
    tags: ["surowe", "łosoś", "zestaw"]
  },
  {
    name: "HIROSHIMA SUSHI SET",
    description: "5 futomaki pieczony halibut, 5 mango ebi ten, 5 futomaki pieczona krewetka, 5 uramaki pieczony łosoś, 5 uramaki kalmar w tempurze, 5 futomaki pieczony tuńczyk",
    category: "Zestaw",
    pieceCount: 30,
    price: 139.00,
    tags: ["pieczone", "tempura", "zestaw"]
  },
  {
    name: "HAKODANE SUSHI SET",
    description: "6 hosomaki ogórek, 6 hosomaki łosoś, 6 hosomaki tuńczyk, 10 uramaki paluszek krabowy, 10 futoclassic",
    category: "Zestaw",
    pieceCount: 38,
    price: 91.00,
    tags: ["mieszane", "surowe", "zestaw", "klasyczne"]
  },
  {
    name: "BONSAI SUSHI SET",
    description: "mix małych rolek",
    category: "Zestaw",
    pieceCount: 12,
    price: 51.00,
    tags: ["małe", "zestaw"]
  },
  {
    name: "ZESTAW VEGE SMALL",
    description: "3 nigiri omlet, 6 hosomaki mango, 6 hosomaki ogórek, 5 california maki vege",
    category: "Zestaw",
    pieceCount: 20,
    price: 85.00,
    tags: ["wege", "wegetariańskie", "zestaw"]
  }
];

export const quickQueries: QuickQuery[] = [
  { text: "20 osób, mix rolek", value: "dla 20 osób" },
  { text: "15 osób, 5 wegetarian", value: "dla 15 osób, 5 wege" },
  { text: "10 osób, bez surowej ryby", value: "dla 10 osób, bez surowej" },
  { text: "30 osób, impreza firmowa", value: "dla 30 osób" }
];