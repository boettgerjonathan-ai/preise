// Hotels that are not on booking.com: fixed list prices from their own website.
// Margarethenbad: http://www.margarethenbad.at (Preisliste + Preise Apartments), checked 2026-10-13.
// Edit here when their price list changes.
window.STATIC_HOTELS = [
  {
    key: 'margarethenbad',
    name: 'Margarethenbad',
    place: 'Lainach',
    source: 'Preisliste margarethenbad.at, Stand 13.10.2026',
    // returns prices for 2 adults, 1 night, incl. service fee/Ortstaxe
    price(dateIso) {
      const d = new Date(dateIso + 'T12:00:00');
      const m = d.getMonth() + 1, day = d.getDate();
      const xmas = (m === 12 && day >= 22) || (m === 1 && day <= 6);
      const high = m === 2 || m === 7 || m === 8;
      const season = xmas ? 2 : high ? 1 : 0;
      const perPerson = [65, 75, 90][season];
      return {
        // double room with breakfast: per person, +25 % for stays under 4 nights, + € 5.70 p.P. service fee
        dz: Math.round(2 * perPerson * 1.25 + 2 * 5.7),
        // apartments without meals, per night for 2 people, + € 5.50 p.P. service fee; final cleaning € 75 once
        aptS: [70, 95, 115][season] + 11,
        aptM: [90, 130, 145][season] + 11,
        cleaning: 75,
      };
    },
  },
];
