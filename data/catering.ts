export interface MenuItem {
  name: string;
  description: string;
  category: "Zestaw";
  pieceCount: number;
  price: number;
  tags: string[];
  image?: string;
  link?: string;
}

export interface QuickQuery {
  text: string;
  value: string;
}

export const menuData: MenuItem[] = [
  {
    name: "BONSAI SUSHI SET",
    description: "8 hosomaki ogórek, 3 nigiri łosoś, 2 nigiri tuńczyk, 1 nigiri krewetka, 15 ml sosu sojowego, wasabi, imbir",
    category: "Zestaw",
    pieceCount: 16,
    price: 54.00,
    tags: ["małe", "zestaw", "mieszane"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/dbac2dba-54d2-11ef-9141-525400080621/5/huge/_com.apple.pasteboard.cg1oyb.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=dbac2dba-54d2-11ef-9141-525400080621"
  },
  {
    name: "SAKE SUSHI SET",
    description: "2 nigiri łosoś, 8 hoso łosoś, 5 california gold classic, 15 ml sosu sojowego, wasabi, imbir",
    category: "Zestaw",
    pieceCount: 15,
    price: 59.00,
    tags: ["małe", "zestaw", "łosoś", "surowe"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/e0c6046e-54d2-11ef-9141-525400080621/5/huge/_com.apple.pasteboard.hcojea.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=e0c6046e-54d2-11ef-9141-525400080621"
  },
  {
    name: "SALMON GRILL SUSHI SET",
    description: "10 Futomaki pieczony łosoś, 8 Hosomaki pieczony łosoś, 30 ml sos sojowy, pałeczki",
    category: "Zestaw",
    pieceCount: 18,
    price: 59.00,
    tags: ["małe", "zestaw", "pieczone", "łosoś"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/2248076d-7517-11ef-9141-525400080621/4/huge/obrazek-heif.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=2248076d-7517-11ef-9141-525400080621"
  },
  {
    name: "SALMON SUSHI SET",
    description: "2 nigiri łosoś, 8 hoso łosoś, 5 california łosoś, 5 futomaki gold salmon, 30 ml sosu sojowego, 1 lub 2 pary pałeczek",
    category: "Zestaw",
    pieceCount: 20,
    price: 85.00,
    tags: ["zestaw", "łosoś", "mieszane"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/e57a5b35-54d2-11ef-9141-525400080621/4/huge/img_0305.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=e57a5b35-54d2-11ef-9141-525400080621"
  },
  {
    name: "GRILL MIX SUSHI SET",
    description: "5 futo łosoś pieczony, 8 hoso pieczony łosoś, 10 california krewetka w tempurze, 30 ml sosu sojowego, 1 lub 2 pary pałeczek",
    category: "Zestaw",
    pieceCount: 25,
    price: 94.00,
    tags: ["zestaw", "pieczone", "tempura", "mieszane"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/ea25bb08-54d2-11ef-9141-525400080621/4/huge/obrazek-heif.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=ea25bb08-54d2-11ef-9141-525400080621"
  },
  {
    name: "GRILL MIX DUET SET",
    description: "5 futo łosoś pieczony, 5 california łosoś pieczony, 10 ura krewetka w tempurze, 6 hoso pieczony łosoś, 6 hoso ogórek, 45 ml sos sojowy, wasabi, imbir",
    category: "Zestaw",
    pieceCount: 32,
    price: 139.00,
    tags: ["zestaw", "pieczone", "tempura", "mieszane"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/ee7165a0-54d2-11ef-9141-525400080621/5/huge/obrazek-heif.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=ee7165a0-54d2-11ef-9141-525400080621"
  },
  {
    name: "NIGIRI GRILL SUSHI SET",
    description: "3 nigiri opiekany łosoś, 3 nigiri opiekana maślana, 3 nigiri węgorz, 3 nigiri omlet, 3 krewetka w tempurze",
    category: "Zestaw",
    pieceCount: 15,
    price: 85.00,
    tags: ["małe", "zestaw", "pieczone", "premium"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/f4794d10-54d2-11ef-9141-525400080621/3/huge/img_0101.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=f4794d10-54d2-11ef-9141-525400080621"
  },
  {
    name: "NIGIRI SUSHI SET",
    description: "2 nigiri łosoś, 2 nigiri tuńczyk, 2 nigiri krewetka, 2 nigiri ryba maślana, 2 nigiri łosoś z tuńczykiem, 2 nigiri halibut, 1 sashimi łosoś, 1 sashimi tuńczyk, 1 sashimi maślana",
    category: "Zestaw",
    pieceCount: 15,
    price: 113.00,
    tags: ["małe", "zestaw", "surowe", "premium"],
    link: "https://www.fugu-sushi.pl/menu?pid=0a101a92-54d3-11ef-9141-525400080621"
  },
  {
    name: "HAKODATE SUSHI SET",
    description: "8 hosomaki ogórek, 8 hososmaki łosoś, 8 hososmaki tuńczyk, 10 california paluszek krabowy, 10 futomaki classic",
    category: "Zestaw",
    pieceCount: 44,
    price: 146.00,
    tags: ["zestaw", "surowe", "mieszane", "klasyczne"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/92f9c1f5-3899-11f0-9141-525400080621/2/huge/feb181f3-3aed-4174-9ff9-efe19d68ba35.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=92f9c1f5-3899-11f0-9141-525400080621"
  },
  {
    name: "HIROSHIMA SUSHI SET",
    description: "5 futomaki pieczony halibut, 5 futomaki pieczona krewetka, 5 futomaki kalmar w tempurze, 5 futomaki pieczony tuńczyk, 5 california gold mango ebi ten, 5 california maki łosoś pieczony, 45ml sos sojowy Kikkoman, imbir różowy, wasabi. Zestaw cały pieczony zawierający różne ryby: halibut, krewetkę w tempurze, kalmar, tuńczyk i łosoś pieczony. Każda rolka polana sosem słodkim",
    category: "Zestaw",
    pieceCount: 30,
    price: 165.00,
    tags: ["zestaw", "pieczone", "tempura", "premium"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/f9956547-54d2-11ef-9141-525400080621/4/huge/img_0124.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=f9956547-54d2-11ef-9141-525400080621"
  },
  {
    name: "OSAKA SUSHI SET",
    description: "10 california maki łosoś pieczony, 10 california gold classic, 8 hosomaki łosoś, 4 nigiri łosoś, 4 gunkan sałatka krabowa",
    category: "Zestaw",
    pieceCount: 36,
    price: 169.00,
    tags: ["zestaw", "mieszane", "łosoś"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/fd0b59f7-54d2-11ef-9141-525400080621/4/huge/img_0135.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=fd0b59f7-54d2-11ef-9141-525400080621"
  },
  {
    name: "KIN SUSHI SET",
    description: "5 grill gold, 5 mango ebi ten, 5 philadelphia futo łosoś, 5 tama tuńczyk, 1 nigiri łosoś, 1 nigiri tuńczyk, 2 gunkan sałatka krabowa",
    category: "Zestaw",
    pieceCount: 24,
    price: 146.00,
    tags: ["zestaw", "mieszane", "premium"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/015cec95-54d3-11ef-9141-525400080621/3/huge/8e21352a-d12b-4e98-aa13-b8cda3db2adf.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=015cec95-54d3-11ef-9141-525400080621"
  },
  {
    name: "RAW SALMON SUSHI SET",
    description: "4 nigiri łosoś surowy, 8 hoso łosoś surowy, 4 gunkan sałatka krabowa, 10 tartar maki łosoś surowy, 10 california maki łosoś surowy, 3x pałeczki (dopisz w komentarzu ile potrzeba), 45 ml sos sojowy Kikkoman",
    category: "Zestaw",
    pieceCount: 36,
    price: 169.00,
    tags: ["zestaw", "surowe", "łosoś"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/0501abd2-54d3-11ef-9141-525400080621/3/huge/55b1761d-79c2-431c-97bc-1534f9d9241e.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=0501abd2-54d3-11ef-9141-525400080621"
  },
  {
    name: "TOKYO SUSHI SET",
    description: "5 california maki krewetka w tempurze, 5 california maki łosoś pieczony, 5 futomaki pieczony węgorz, 5 futomaki pieczony tuńczyk, 5 futomaki kaczka, 6 hosomaki pieczony łosoś, 3 nigiri łosoś, 3 nigiri tuńczyk, 3 nigiri ryba maślana, 1 nigiri krewetka",
    category: "Zestaw",
    pieceCount: 41,
    price: 219.00,
    tags: ["zestaw", "mieszane", "pieczone", "premium"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/0fbb9f10-54d3-11ef-9141-525400080621/3/huge/60e7b38f-0364-493b-90e7-5fd313a77934.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=0fbb9f10-54d3-11ef-9141-525400080621"
  },
  {
    name: "FUSION SUSHI SET",
    description: "10 grill gold, 10 mango ebi ten, 10 ebi special gold, 10 geisha, 10 tama tuńczyk, 5 otaru",
    category: "Zestaw",
    pieceCount: 55,
    price: 299.00,
    tags: ["zestaw", "mieszane", "premium", "duży"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/ad32f598-54d3-11ef-9141-525400080621/3/huge/786f1db2-cb53-416c-9063-24708b2c33bc.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=ad32f598-54d3-11ef-9141-525400080621"
  },
  {
    name: "PARTY SUSHI SET",
    description: "8 hoso awokado, 8 hoso pieczony łosoś, 8 hoso łosoś, 10 california gold rainbow, 10 california maki łosoś pieczony, 10 futomaki gold tuńczyk gold, 10 tama łosoś, 10 mango ebi ten, 10 futo kalmar w tempurze, 10 futo pieczony halibut, 5 california gold fashion",
    category: "Zestaw",
    pieceCount: 99,
    price: 399.00,
    tags: ["zestaw", "mieszane", "party", "duży"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/b129ce06-54d3-11ef-9141-525400080621/2/huge/m15_11zon.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=b129ce06-54d3-11ef-9141-525400080621"
  },
  {
    name: "FUGU SUSHI SET",
    description: "3 nigiri łosoś, 3 nigiri tuńczyk, 5 futomaki krewetka w tempurze, 6 gunkan sałatka krabowa, 6 hosomaki łosoś surowy, 6 hosomaki rzepa marynowana, 10 california maki łosoś pieczony, 10 california gold kegon, 10 california gold grill gold, 10 tama maki łosoś, 10 california gold mango ebi ten, 10 futo pieczony halibut",
    category: "Zestaw",
    pieceCount: 89,
    price: 445.00,
    tags: ["zestaw", "mieszane", "premium", "duży"],
    link: "https://www.fugu-sushi.pl/menu?pid=b5be75f6-54d3-11ef-9141-525400080621"
  },
  {
    name: "FAMILY SUSHI SET",
    description: "5 gold classic, 5 tama krewetka, 8 hoso łosoś, 8 hoso ogórek, 8 hoso oshinko, 9 nigiri mix (łosoś 3, tuńczyk 3, maślana 3), 10 california łosoś pieczony, 10 grill gold, 10 mango ebi, 10 geisha, 10 tama losos, 10 futo kalmar, 10 futo łosoś",
    category: "Zestaw",
    pieceCount: 113,
    price: 499.00,
    tags: ["zestaw", "rodzinny", "duży", "mieszane"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/bec676d2-54d3-11ef-9141-525400080621/2/huge/m17_11zon.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=bec676d2-54d3-11ef-9141-525400080621"
  },
  {
    name: "ZESTAW VEGE SMALL",
    description: "3 nigiri omlet, 6 hosomaki mango, 6 hosomaki ogórek, 5 california maki vege",
    category: "Zestaw",
    pieceCount: 20,
    price: 59.00,
    tags: ["zestaw", "wege", "małe"],
    link: "https://www.fugu-sushi.pl/menu?pid=7149e6cb-54d5-11ef-9141-525400080621"
  },
  {
    name: "ZESTAW VEGE MEDIUM",
    description: "10 california maki vege, 5 california maki vege w tempurze, 6 hososmaki awokado, 3 gunkan sałatka wakame goma, 2 nigiri omlet",
    category: "Zestaw",
    pieceCount: 26,
    price: 99.00,
    tags: ["zestaw", "wege"],
    image: "https://cs.cdn-upm.com/product-images/1bfc9f16-4db0-11ef-9141-525400080621/75b586f8-54d5-11ef-9141-525400080621/2/huge/q1_11zon.webp",
    link: "https://www.fugu-sushi.pl/menu?pid=75b586f8-54d5-11ef-9141-525400080621"
  },
  {
    name: "ZESTAW VEGE LARGE",
    description: "10 california maki vege w tempurze, 5 california maki vege, 6 hososmaki rzepa marynowana, 6 hosomaki tykwa, 6 gyozy vege",
    category: "Zestaw",
    pieceCount: 33,
    price: 73.00,
    tags: ["zestaw", "wege"],
    link: "https://www.fugu-sushi.pl/menu?pid=799b1820-54d5-11ef-9141-525400080621"
  }
];

export const quickQueries: QuickQuery[] = [
  { text: "20 osób, mix rolek", value: "dla 20 osób" },
  { text: "15 osób, 5 wegetarian", value: "dla 15 osób, 5 wege" },
  { text: "10 osób, bez surowej ryby", value: "dla 10 osób, bez surowej" },
  { text: "30 osób, impreza firmowa", value: "dla 30 osób" }
];