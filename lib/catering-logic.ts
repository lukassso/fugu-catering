import { menuData, type MenuItem } from '@/data/catering';

export interface ParsedQuery {
  totalPeople: number;
  adults: number;
  children: number;
  vegetarians: number;
  preferences: string[];
}

export function parseQuery(query: string): ParsedQuery {
  query = query.toLowerCase();
  const result: ParsedQuery = {
    totalPeople: 0,
    adults: 0,
    children: 0,
    vegetarians: 0,
    preferences: []
  };

  const peopleMatch = query.match(/(\d+)\s*(osób|osob|gości|gosci|ludzi|osoby|osobę|osobe)/i);
  if (peopleMatch) {
    result.totalPeople = parseInt(peopleMatch[1]);
  }

  const vegeMatch = query.match(/(\d+)\s*(wege|wegetarian|wegetariańskich|wegetarianska|wegetariańska)/i);
  if (vegeMatch) {
    result.vegetarians = parseInt(vegeMatch[1]);
  } else if (query.includes('wege') || query.includes('wegetarian')) {
    result.preferences.push('wege');
  }

  const childrenMatch = query.match(/(\d+)\s*(dziec|maluch|kid)/i);
  if (childrenMatch) {
    result.children = parseInt(childrenMatch[1]);
  }

  result.adults = result.totalPeople - result.vegetarians - result.children;
  if (result.adults < 0) result.adults = 0;

  if (query.includes('pieczon') || query.includes('grill') || query.includes('bez surowej') || query.includes('nie surowe')) {
    result.preferences.push('pieczone');
  }
  if (query.includes('tempura') || query.includes('smażon')) {
    result.preferences.push('tempura');
  }
  if (query.includes('surowe') && !query.includes('bez surowej')) {
    result.preferences.push('surowe');
  }
  if (query.includes('mix') || query.includes('mieszane')) {
    result.preferences.push('mieszane');
  }

  return result;
}

// Skopiuj tutaj całą funkcję `generateRecommendation`
export function generateRecommendation(parsedQuery: ParsedQuery): string {
   const { totalPeople, adults, children, vegetarians, preferences } = parsedQuery;
  
  if (totalPeople === 0) {
    return 'Proszę podać liczbę osób, dla których mam przygotować rekomendację! 😊\n\nPrzykład: "Dla 20 osób, mix rolek"';
  }

  const regularAdults = adults;
  const piecesForAdults = regularAdults * 11;
  const piecesForChildren = children * 7;
  const piecesForVegetarians = vegetarians * 11;
  const totalPiecesNeeded = piecesForAdults + piecesForChildren + piecesForVegetarians;

  let recommendation = `🍣 REKOMENDACJA DLA ${totalPeople} OSÓB\n\n`;
  
  let details = [];
  if (regularAdults > 0) details.push(`${regularAdults} dorosłych`);
  if (vegetarians > 0) details.push(`${vegetarians} wegetarian`);
  if (children > 0) details.push(`${children} dzieci`);
  recommendation += details.join(' • ') + '\n\n';

  recommendation += `Szacuję, że będzie Państwu potrzebne około ${totalPiecesNeeded} sztuk sushi. Oto moja propozycja:\n\n`;

  let selectedSets = [];
  let totalPieces = 0;
  let totalCost = 0;

  if (vegetarians > 0) {
    const vegeSet = menuData.find(item => item.name === 'ZESTAW VEGE SMALL') as MenuItem;
    const vegeSetsNeeded = Math.ceil(piecesForVegetarians / 20);
    selectedSets.push({
      item: vegeSet,
      quantity: vegeSetsNeeded,
      reason: `dla ${vegetarians} osób wegetariańskich`
    });
    totalPieces += vegeSet.pieceCount * vegeSetsNeeded;
    if (vegeSet.price) totalCost += vegeSet.price * vegeSetsNeeded;
  }

  const piecesRemaining = totalPiecesNeeded - totalPieces;
  
  if (preferences.includes('pieczone') || preferences.includes('tempura')) {
    const cookedSets = menuData.filter(item => 
      item.category === 'Zestaw' && 
      item.tags && 
      (item.tags.includes('pieczone') || item.tags.includes('tempura')) &&
      item.pieceCount > 30
    ).sort((a, b) => b.pieceCount - a.pieceCount);
    
    if (cookedSets.length > 0 && piecesRemaining > 0) {
      const mainSet = cookedSets[0];
      const quantity = Math.ceil(piecesRemaining / mainSet.pieceCount);
      selectedSets.push({
        item: mainSet,
        quantity: quantity,
        reason: 'bogaty w rolki pieczone i w tempurze'
      });
      totalPieces += mainSet.pieceCount * quantity;
      if (mainSet.price) totalCost += mainSet.price * quantity;
    }
  } else {
    const largeSets = menuData.filter(item => 
      item.category === 'Zestaw' && 
      item.pieceCount >= 89 &&
      item.tags && 
      item.tags.includes('zestaw')
    ).sort((a, b) => b.pieceCount - a.pieceCount);

    if (totalPeople >= 25 && largeSets.length > 0) {
      selectedSets.push({
        item: largeSets[0],
        quantity: 1,
        reason: 'duży zestaw z różnorodnością rolek'
      });
      totalPieces += largeSets[0].pieceCount;
      if (largeSets[0].price) totalCost += largeSets[0].price;

      if (largeSets.length > 1 && totalPieces < piecesRemaining) {
        selectedSets.push({
          item: largeSets[1],
          quantity: 1,
          reason: 'drugi duży zestaw dla większej różnorodności'
        });
        totalPieces += largeSets[1].pieceCount;
        if (largeSets[1].price) totalCost += largeSets[1].price;
      }
    } else if (totalPeople >= 15 && largeSets.length > 0) {
      const partySet = menuData.find(item => item.name === 'PARTY SUSHI SET');
      if (partySet) {
        selectedSets.push({
          item: partySet,
          quantity: 1,
          reason: 'idealny zestaw na imprezę'
        });
        totalPieces += partySet.pieceCount;
        if (partySet.price) totalCost += partySet.price;
      }
    } else {
      const mediumSets = menuData.filter(item => 
        item.category === 'Zestaw' && 
        item.pieceCount >= 30 && 
        item.pieceCount < 89
      ).sort((a, b) => b.pieceCount - a.pieceCount);
      
      if (mediumSets.length > 0) {
        const quantity = Math.ceil(piecesRemaining / mediumSets[0].pieceCount);
        selectedSets.push({
          item: mediumSets[0],
          quantity: quantity,
          reason: 'świetny wybór dla grupy'
        });
        totalPieces += mediumSets[0].pieceCount * quantity;
        if (mediumSets[0].price) totalCost += mediumSets[0].price * quantity;
      }
    }
  }

  recommendation += 'POLECANE ZESTAWY:\n';
  selectedSets.forEach(set => {
    const priceText = set.item.price ? ` - ${(set.item.price * set.quantity).toFixed(2)} zł` : '';
    const quantityText = set.quantity > 1 ? `${set.quantity}x ` : '';
    recommendation += `• ${quantityText}${set.item.name} (${set.item.pieceCount * set.quantity} szt.)${priceText}\n  ↳ ${set.reason}\n`;
  });

  recommendation += `\n📊 PODSUMOWANIE:\n`;
  recommendation += `• Łącznie sztuk: ~${totalPieces} (ok. ${(totalPieces / totalPeople).toFixed(1)} szt./osobę)\n`;
  if (totalCost > 0) {
    recommendation += `• Szacowany koszt: ~${totalCost.toFixed(2)} zł\n`;
  }
  if (vegetarians > 0) {
    recommendation += `• Dla wegetarian: ${vegetarians * 20} sztuk w zestawach wege\n`;
  }
  if (children > 0) {
    recommendation += `• Dla dzieci: polecam proste rolki hosomaki (ogórek, mango)\n`;
  }

  recommendation += `\n💡 WSKAZÓWKA: `;
  if (totalPeople >= 20) {
    recommendation += `Dla dużych grup polecam zamówienie z 24h wyprzedzeniem. Możemy przygotować zestawy według Państwa indywidualnych potrzeb!`;
  } else {
    recommendation += `Pamiętajcie, że zawsze lepiej zamówić trochę więcej - sushi szybko znika! 😊`;
  }

  return recommendation;
}