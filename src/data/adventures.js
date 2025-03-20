// adventures.js - Zentrale Datenquelle für alle Abenteuer/Reisen

// Format für ein Adventure-Objekt
/*
  {
    id: 'unique-id',               // Einmalige ID für diese Reise
    title: 'Titel der Reise',      // Haupttitel
    subtitle: 'Untertitel',        // Kurzbeschreibung
    startDate: '2025-05-25',       // Startdatum im ISO-Format
    endDate: '2025-05-30',         // Enddatum im ISO-Format
    distance: 630,                 // Distanz in km
    countries: ['Deutschland', 'Belgien', 'Frankreich'],  // Bereiste Länder
    participants: ['Martin', 'Rafael'],  // Teilnehmer
    route: {                       // Routeninformationen
      start: 'Mainz',
      end: 'Calais',
      stages: [
        { day: 1, start: 'Mainz', end: 'Koblenz', distance: 100, highlights: ['Rhein'] },
        // weitere Etappen...
      ]
    },
    equipment: {
      // Equipment-Daten
      martin: { ... },
      rafael: { ... },
      shared: [ ... ]
    },
    gallery: {
      // Bilder und Videos
      images: [ ... ]
    },
    about: {
      // Beschreibung und Details zum Projekt
      description: '...',
      projectGoals: '...'
    }
  }
*/

// Die aktuelle/aktive Reise
export const currentAdventureId = "ram-calais-2025";

// Alle verfügbaren Reisen
export const adventures = [
  {
    id: "ram-calais-2025",
    title: "RAMAdventure: Mainz nach Calais",
    subtitle: "630km Tour durch Deutschland, Belgien und Frankreich",
    startDate: "2025-05-25",
    endDate: "2025-05-30",
    distance: 630,
    countries: ["Deutschland", "Belgien", "Frankreich"],
    participants: ["Martin", "Rafael"],
    status: "upcoming", // 'upcoming', 'active', 'completed'
    route: {
      start: "Mainz",
      end: "Calais",
      description:
        "Eine abwechslungsreiche 630km-Route durch drei Länder, die uns von Mainz über Belgien bis nach Calais führt.",
      totalElevationUp: 7250, // Gesamte Höhenmeter bergauf
      totalElevationDown: 7680, // Gesamte Höhenmeter bergab
      accommodationInfo: {
        title: "Übernachtungen",
        description:
          "Wir werden hauptsächlich zelten, aber auch nach günstigen Unterkünften Ausschau halten. Falls das Wetter nicht mitspielt, haben wir einen Plan B mit Hostels entlang der Strecke.",
      },
      foodInfo: {
        title: "Verpflegung",
        description:
          "Wir werden unterwegs einkaufen und selbst kochen. In größeren Ortschaften planen wir, lokale Spezialitäten zu probieren.",
      },
      stages: [
        {
          day: 1,
          date: "2025-05-25",
          start: "Mainz",
          end: "Koblenz",
          distance: 95,
          elevation: 850,
          highlights: ["Rheintal", "Loreley"],
          description:
            "Unsere Tour startet in Mainz und folgt dem Rhein über das UNESCO Welterbe Mittelrheintal bis nach Koblenz.",
        },
        {
          day: 2,
          date: "2025-05-26",
          start: "Koblenz",
          end: "Bonn",
          distance: 65,
          elevation: 950,
          highlights: ["Siebengebirge", "Drachenfels"],
          description:
            "Die zweite Etappe führt uns weiter entlang des Rheins durch malerische Landschaften bis nach Bonn.",
        },
        {
          day: 3,
          date: "2025-05-27",
          start: "Bonn",
          end: "Aachen",
          distance: 110,
          elevation: 800,
          highlights: ["Eifel", "Dreiländereck"],
          description:
            "Wir verlassen den Rhein und fahren westlich Richtung Aachen und dem Dreiländereck.",
        },
        {
          day: 4,
          date: "2025-05-28",
          start: "Aachen",
          end: "Brüssel",
          distance: 140,
          elevation: 600,
          highlights: ["Ardennen", "Brüssel"],
          description:
            "Die längste Etappe führt uns durch die Ardennen bis in die belgische Hauptstadt Brüssel.",
        },
        {
          day: 5,
          date: "2025-05-29",
          start: "Brüssel",
          end: "Lille",
          distance: 120,
          elevation: 800,
          highlights: ["Flandern", "Französische Grenze"],
          description:
            "Von Brüssel geht es durch das flämische Tiefland bis nach Lille in Frankreich.",
        },
        {
          day: 6,
          date: "2025-05-30",
          start: "Lille",
          end: "Calais",
          distance: 100,
          elevation: 1000,
          highlights: ["Französische Küste", "Ärmelkanal"],
          description:
            "Die finale Etappe bringt uns zur Küste nach Calais mit Blick auf den Ärmelkanal.",
        },
      ],
    },
    about: {
      description:
        "Wir sind zwei Freunde, die sich der Herausforderung stellen, 630 km mit dem Fahrrad zurückzulegen. Unsere Reise wird uns durch malerische Landschaften führen und wir werden viele Abenteuer erleben!",
      projectGoals:
        "Unser Ziel ist es, die 630 km in etwa einer Woche zu schaffen. Dabei werden wir zelten, kochen und alle Erfahrungen hier teilen.",
    },
  },
  // Zweites Dummy-Adventure
  {
    id: "alpen-tour-2024",
    title: "Alpen-Überquerung",
    subtitle: "450km Tour durch die Alpen von München nach Venedig",
    startDate: "2024-07-10",
    endDate: "2024-07-17",
    distance: 450,
    countries: ["Deutschland", "Österreich", "Italien"],
    participants: ["Martin", "Rafael", "Emma"],
    status: "completed", // 'upcoming', 'active', 'completed'
    route: {
      start: "München",
      end: "Venedig",
      description:
        "Eine spektakuläre Alpen-Überquerung mit atemberaubenden Berglandschaften, über 10.000 Höhenmetern und unvergesslichen Pässen.",
      totalElevationUp: 10500, // Gesamte Höhenmeter bergauf
      totalElevationDown: 11200, // Gesamte Höhenmeter bergab
      accommodationInfo: {
        title: "Übernachtungen",
        description:
          "Wir übernachten in Berghütten und kleinen Pensionen entlang der Route. In den Tälern haben wir einige gemütliche Gasthöfe ausgewählt.",
      },
      foodInfo: {
        title: "Verpflegung",
        description:
          "Frühstück und Abendessen in den Unterkünften, tagsüber Verpflegung aus lokalen Delikatessen-Geschäften und Bergrestaurants.",
      },
      stages: [
        {
          day: 1,
          date: "2024-07-10",
          start: "München",
          end: "Bad Tölz",
          distance: 60,
          elevation: 650,
          highlights: ["Isar-Radweg", "Voralpenland"],
          description:
            "Startschuss in München und gemütlicher Einstieg durch das bayerische Voralpenland bis nach Bad Tölz.",
        },
        {
          day: 2,
          date: "2024-07-11",
          start: "Bad Tölz",
          end: "Achensee",
          distance: 70,
          elevation: 1450,
          highlights: ["Sylvensteinsee", "Karwendelgebirge"],
          description:
            "Die ersten größeren Anstiege erwarten uns auf dem Weg zum wunderschönen Achensee in Tirol.",
        },
        {
          day: 3,
          date: "2024-07-12",
          start: "Achensee",
          end: "Innsbruck",
          distance: 65,
          elevation: 950,
          highlights: ["Inn-Tal", "Nordkette"],
          description:
            "Abfahrt ins Inn-Tal und weiter nach Innsbruck mit seinem beeindruckenden Bergpanorama.",
        },
        {
          day: 4,
          date: "2024-07-13",
          start: "Innsbruck",
          end: "Sterzing",
          distance: 75,
          elevation: 1800,
          highlights: ["Brennerpass", "Wipptal"],
          description:
            "Die Königsetappe über den historischen Brennerpass nach Italien.",
        },
        {
          day: 5,
          date: "2024-07-14",
          start: "Sterzing",
          end: "Brixen",
          distance: 45,
          elevation: 950,
          highlights: ["Eisack-Tal", "Pustertal"],
          description:
            "Ein vergleichsweise entspannter Tag durch das malerische Eisack-Tal.",
        },
        {
          day: 6,
          date: "2024-07-15",
          start: "Brixen",
          end: "Cortina d'Ampezzo",
          distance: 80,
          elevation: 2200,
          highlights: ["Dolomiten", "Tre Cime"],
          description:
            "Die herausforderndste Etappe durch die majestätischen Dolomiten mit mehreren anspruchsvollen Pässen.",
        },
        {
          day: 7,
          date: "2024-07-16",
          start: "Cortina d'Ampezzo",
          end: "Belluno",
          distance: 55,
          elevation: 1100,
          highlights: ["Cadore-Tal", "Piave-Tal"],
          description:
            "Bergab geht es durch spektakuläre Schluchten Richtung Po-Ebene.",
        },
        {
          day: 8,
          date: "2024-07-17",
          start: "Belluno",
          end: "Venedig",
          distance: 100,
          elevation: 400,
          highlights: ["Venetische Ebene", "Lagune von Venedig"],
          description:
            "Die Schlussetappe führt durch die Venetische Ebene bis zur berühmten Lagunenstadt Venedig.",
        },
      ]
    },
    about: {
      description:
        "Diese Tour führt uns über die Alpen von München nach Venedig. Eine unvergessliche Reise durch drei Länder mit atemberaubenden Berglandschaften und kulturellen Highlights.",
      projectGoals:
        "Wir nehmen die Herausforderung an, die Alpen mit dem Fahrrad zu überqueren und dabei über 10.000 Höhenmeter zu bewältigen. Ein unvergessliches Abenteuer erwartet uns!",
    },
  }
];

// Equipment-Daten in einer separaten Struktur
export const equipmentData = {
  "ram-calais-2025": {
    // Kategorien für die Equipment-Listen
    categories: {
      bags: { title: "Bikepacking-Taschen", icon: "bi-bag" },
      sleep: { title: "Schlafen & Komfort", icon: "bi-moon" },
      clothing: {
        title: "Kleidung & Wetterschutz",
        icon: "bi-thermometer-half",
      },
      cooking: { title: "Kochen & Essen", icon: "bi-fire" },
      safety: { title: "Sicherheit & Notfälle", icon: "bi-lightbulb" },
    },

    // Martins Ausrüstung
    martin: {
      profile: {
        name: "Martin",
        type: "Gravel-Abenteurer",
        description:
          "Der moderne Bikepacker mit perfekter Balance zwischen Leichtigkeit und Komfort. Auf seinem Gravelbike setzt Martin auf hochwertige Ausrüstung und durchdachte Packtaschen für maximale Effizienz.",
        tags: ["Leichtgewicht", "Qualitativ", "Durchdacht"],
        philosophy: {
          text: "Ich setze auf ein modernes Bikepacking-Setup mit einem leichten, aber komfortablen Gravelbike. Durch die Verwendung hochwertiger Ortlieb-Taschen und durchdachter Ausrüstung finde ich die perfekte Balance zwischen Gewichtsersparnis und notwendigem Komfort für lange Touren.",
          motto: "Qualität spart Gewicht und schont die Nerven.",
        },
      },
      mainEquipment: {
        bike: {
          title: "Canyon Grizl CF SLX 8 Di2 GRC",
          description:
            "Hochwertiges Carbon-Gravelbike mit elektronischer Shimano Di2 Schaltung. Perfekt für lange Strecken auf unterschiedlichen Untergründen mit optimaler Balance zwischen Geschwindigkeit und Komfort.",
          image: "/bike-placeholder.jpg",
        },
        tent: {
          title: "Starlight 1 Exp",
          description:
            "Kompaktes Einpersonenzelt optimiert für Bikepacking-Abenteuer mit ausgezeichnetem Gewichts-Raum-Verhältnis.",
          image: "/tent-placeholder.jpg",
        },
      },
      bags: [
        {
          title: "Ortlieb Frame-Pack Toptube 3L",
          description: "Rahmentasche in Dark Sand",
          icon: "bi-bag",
        },
        {
          title: "Ortlieb Fork-Pack 4.1L",
          description: "2x Gabeltaschen in Dark Sand",
          icon: "bi-bag",
        },
        {
          title: "Ortlieb Handlebar-Pack 9L",
          description: "Lenkerrolle in Dark Sand",
          icon: "bi-bag",
        },
        {
          title: "Ortlieb Seat-Pack L 16.5L",
          description: "Satteltasche in Dark Sand",
          icon: "bi-bag",
        },
        {
          title: "AGU Venture Snack-pack",
          description: "Food Pouch / Bottle Bag 1L, Reflektive Mist (2x)",
          icon: "bi-bag",
        },
      ],
      sleep: [
        {
          title: "Serac 300",
          description: "Komfortbereich bis -4°C, Extrembereich bis -20°C",
          icon: "bi-moon",
        },
        {
          title: "HIKENTURE Aufblasbares Camping Kissen",
          description: "Leichtes Reisekissen mit abnehmbarem Bezug",
          icon: "bi-hospital",
        },
      ],
      clothing: [
        {
          title: "DANISH ENDURANCE Merino Multifunktionstuch",
          description: "Vielseitiger Schlauchschal, dunkelgrün",
          icon: "bi-thermometer-half",
        },
        {
          title: "Zouwel Fahrradmützen (3 Stück)",
          description: "Winddichte Mützen zum Tragen unter dem Helm",
          icon: "bi-droplet",
        },
        {
          title: "DANISH ENDURANCE Merino Wolle Wandersocken",
          description: "3 Paar leichte Wollsocken, marineblau",
          icon: "bi-bag-check",
        },
      ],
      cooking: [
        {
          title: "Bushpeak Gaskocher",
          description:
            "Outdoor Instantboil mit Kochtopf (900ml) und Piezozündung",
          icon: "bi-fire",
        },
        {
          title: "Primus Power Gas",
          description: "Schraubbare Gaskartusche, 100g",
          icon: "bi-fuel-pump",
        },
        {
          title: "OUTXE Titanium Camping-Utensilenset",
          description: "3-teiliges Besteckset mit Etui",
          icon: "bi-cup-hot",
        },
      ],
      safety: [
        {
          title: "LE Stirnlampe LED",
          description: "Wiederaufladbar mit 5 Lichtmodi und Rotlicht",
          icon: "bi-lightbulb",
        },
        {
          title: "Pharmavoyage First Aid Pocket",
          description: "Kompaktes Erste-Hilfe-Set",
          icon: "bi-bandaid",
        },
        {
          title: "ABUS Combiflex Break 85",
          description: "Seilschloss, 85cm, Midnight Blue",
          icon: "bi-lock",
        },
        {
          title: "BasicNature Zahnputzset Elmex/Aronal",
          description: "Kompaktes Zahnpflegeset",
          icon: "bi-brush",
        },
      ],
    },

    // Rafaels Ausrüstung
    rafael: {
      profile: {
        name: "Rafael",
        type: "Gravel-Abenteurer",
        description:
          "Der moderne Bikepacker mit minimalem Gepäck und maximalem Tempo. Auf seinem Gravelbike setzt Rafael auf ultraleichte Ausrüstung und aerodynamische Packweise.",
        tags: ["Schnell", "Minimalistisch", "Modern"],
        philosophy: {
          text: "Für mich steht Geschwindigkeit und Flexibilität im Vordergrund. Jedes Gramm zählt, deshalb investiere ich in ultraleichte Premium-Ausrüstung und reduziere alles auf das Wesentliche.",
          motto: "Weniger ist mehr, schneller ist besser.",
        },
      },
      mainEquipment: {
        bike: {
          title: "Specialized Diverge",
          description:
            "Modernes Gravelbike mit Carbonrahmen und flexibler Geometrie. Perfekt für schnelle Strecken auf unterschiedlichen Untergründen.",
          image: "/bike-placeholder.jpg",
        },
        tent: {
          title: "Big Agnes Copper Spur HV UL1",
          description:
            "Ultraleichtes Einpersonenzelt mit minimalem Packmaß und schnellem Aufbau. Für Rafael zählt jedes gesparte Gramm.",
          image: "/tent-placeholder.jpg",
        },
      },
      otherEquipment: [
        {
          title: "Apidura Bikepacking Taschen",
          description: "Aerodynamisches Packsystem",
          icon: "bi-bag",
        },
        {
          title: "Therm-a-Rest NeoAir XLite",
          description: "Ultraleichte Isomatte",
          icon: "bi-moon",
        },
        {
          title: "Daunenschlafsack",
          description: "Leichter Schlafsack mit Comfort bis 0°C",
          icon: "bi-bag-check",
        },
        {
          title: "MSR PocketRocket 2",
          description: "Kompakter Gaskocher",
          icon: "bi-fire",
        },
        {
          title: "Titanium Koch-Set",
          description: "Ultraleichtes Kochgeschirr",
          icon: "bi-cup",
        },
        {
          title: "Wasserfilter",
          description: "Zum Auffüllen der Flaschen aus natürlichen Quellen",
          icon: "bi-droplet",
        },
      ],
    },

    // Gemeinsame Ausrüstung
    shared: {
      intro: {
        title: "Unsere gemeinsame Ausrüstung",
        description:
          "Einige Ausrüstungsgegenstände teilen wir uns, um Gewicht zu sparen und effizienter unterwegs zu sein.",
      },
      philosophy: {
        title: "Unsere gemeinsame Philosophie",
        text: "Obwohl wir unterschiedliche Ansätze beim Rad und persönlicher Ausrüstung haben, sind wir uns einig, dass Sicherheit und Zuverlässigkeit an erster Stelle stehen. Durch das Teilen bestimmter Ausrüstung sparen wir Gewicht und sind trotzdem für alle Eventualitäten gerüstet.",
      },
      items: [
        {
          title: "Werkzeug & Reparaturkit",
          description:
            "Umfassendes Set mit Multitool, Ersatzschläuchen, Flickzeug und Spezialwerkzeugen für alle gängigen Reparaturen unterwegs.",
          icon: "bi-tools",
        },
        {
          title: "Erste-Hilfe-Set",
          description:
            "Kompaktes aber umfangreiches Erste-Hilfe-Set mit Verbandsmaterial, Desinfektionsmitteln, Schmerzmitteln und Blasenpflaster.",
          icon: "bi-bandaid",
        },
        {
          title: "Navigation",
          description:
            "Garmin GPS mit vorbereiteten Tracks, Offline-Karten und lange Akkulaufzeit. Als Backup haben wir gedruckte Karten dabei.",
          icon: "bi-compass",
        },
        {
          title: "Powerbank",
          description:
            "20.000 mAh Powerbank zum Laden von Navigation, Smartphones und anderer elektronischer Geräte, mit mehreren Anschlüssen.",
          icon: "bi-battery-charging",
        },
        {
          title: "Kameraausrüstung",
          description:
            "Kompakte Systemkamera mit wetterfestem Gehäuse und mehreren Objektiven, um die Tour in Bildern festzuhalten.",
          icon: "bi-camera",
        },
        {
          title: "Sicherheitsausrüstung",
          description:
            "Fahrradschlösser, Warnwesten und starke Beleuchtungssets für sicheres Fahren bei schlechten Sichtverhältnissen.",
          icon: "bi-shield-check",
        },
      ],
    },
  },
  // Equipment-Daten für das zweite Adventure
  "alpen-tour-2024": {
    // Kategorien für die Equipment-Listen
    categories: {
      bags: { title: "Bikepacking-Taschen", icon: "bi-bag" },
      sleep: { title: "Schlafen & Komfort", icon: "bi-moon" },
      clothing: {
        title: "Kleidung & Wetterschutz",
        icon: "bi-thermometer-half",
      },
      cooking: { title: "Kochen & Essen", icon: "bi-fire" },
      safety: { title: "Sicherheit & Notfälle", icon: "bi-lightbulb" },
    },

    // Martins Ausrüstung
    martin: {
      profile: {
        name: "Martin",
        type: "Bergradler",
        description:
          "Der erfahrene Bergradler mit spezialisierten Komponenten für steile Anstiege und technische Abfahrten. Martin setzt auf eine ausgewogene Balance zwischen Gewicht und Stabilität.",
        tags: ["Bergfest", "Technik-Fan", "Ausdauernd"],
        philosophy: {
          text: "In den Bergen zählt jedes Gramm, aber auch die Zuverlässigkeit der Ausrüstung. Ich habe für diese Tour ein spezielles Setup mit verbesserten Berggängen und robusten Reifen zusammengestellt.",
          motto: "Der Berg ruft - und ich antworte!",
        },
      },
      mainEquipment: {
        bike: {
          title: "Scott Addict Gravel 10",
          description:
            "Leichtes Carbon-Gravelbike mit breiter Übersetzung und speziellen Berggängen für die Alpenetappen.",
          image: "/bike-placeholder.jpg",
        },
        tent: {
          title: "MSR Hubba NX",
          description:
            "Ultraleichtes Einpersonenzelt mit ausgezeichneter Stabilität bei Bergwetter.",
          image: "/tent-placeholder.jpg",
        },
      },
      bags: [
        {
          title: "Apidura Expedition Handlebar Pack",
          description: "12L Lenkertasche, wasserdicht",
          icon: "bi-bag",
        },
        {
          title: "Apidura Expedition Saddle Pack",
          description: "17L Satteltasche, wasserdicht",
          icon: "bi-bag",
        },
        {
          title: "Apidura Expedition Frame Pack",
          description: "4.5L Rahmentasche, wasserdicht",
          icon: "bi-bag",
        },
        {
          title: "Apidura Food Pouch",
          description: "0.8L Oberrohrtasche für Snacks",
          icon: "bi-bag",
        }
      ],
      sleep: [
        {
          title: "Therm-a-Rest NeoAir XLite",
          description: "Ultraleichte Isomatte mit R-Wert 4.2",
          icon: "bi-moon",
        },
        {
          title: "Western Mountaineering UltraLite",
          description: "Daunen-Schlafsack für Temperaturen bis 0°C",
          icon: "bi-hospital",
        }
      ],
      clothing: [
        {
          title: "Gore Wear C7 Gore-Tex Shakedry",
          description: "Ultraleichte Regenjacke",
          icon: "bi-umbrella",
        },
        {
          title: "Castelli Perfetto RoS",
          description: "Winddichte Radtrikotjacke",
          icon: "bi-wind",
        },
        {
          title: "Assos T.Rally Cargo Shorts",
          description: "Gepolsterte Mountainbike-Shorts mit Taschen",
          icon: "bi-bag-check",
        }
      ],
      cooking: [
        {
          title: "MSR PocketRocket Deluxe",
          description: "Leichter Gaskocher mit Piezozündung",
          icon: "bi-fire",
        },
        {
          title: "Toaks Titanium 750ml Pot",
          description: "Ultraleichter Titanium-Kochtopf",
          icon: "bi-cup",
        }
      ],
      safety: [
        {
          title: "Petzl Actik Core",
          description: "Wiederaufladbare Stirnlampe, 450 Lumen",
          icon: "bi-lightbulb",
        },
        {
          title: "Garmin inReach Mini",
          description: "Satellitengerät für Notfälle",
          icon: "bi-broadcast",
        }
      ]
    },

    // Rafaels Ausrüstung
    rafael: {
      profile: {
        name: "Rafael",
        type: "Alpen-Speedster",
        description:
          "Der Gewichtsoptimierer, der auf ultraleichtes Equipment und schnelles Vorankommen setzt, ohne auf notwendigen Komfort zu verzichten.",
        tags: ["Ultraleicht", "Minimalist", "Geschwindigkeit"],
        philosophy: {
          text: "Bei einer Alpenüberquerung kämpft man um jedes Gramm am Berg. Ich habe mein Setup auf absolute Gewichtsoptimierung ausgelegt, ohne lebenswichtige Ausrüstung zu kompromittieren.",
          motto: "Leicht und schnell erobert jeden Gipfel.",
        },
      },
      mainEquipment: {
        bike: {
          title: "Cervelo Aspero-5",
          description:
            "Ultra-leichtes Carbon-Gravelbike mit elektronischer Schaltung und optimaler Steigfähigkeit.",
          image: "/bike-placeholder.jpg",
        },
        tent: {
          title: "Zpacks Plex Solo",
          description:
            "Ultraleichtes DCF-Zelt, unter 500 Gramm mit hervorragendem Wetterschutz.",
          image: "/tent-placeholder.jpg",
        },
      },
      otherEquipment: [
        {
          title: "Revelate Designs Terrapin System",
          description: "Ultraleichtes Packset mit nur 320g",
          icon: "bi-bag",
        },
        {
          title: "Enlightened Equipment Enigma Quilt",
          description: "850FP Daunendecke, nur 480g",
          icon: "bi-moon",
        },
        {
          title: "Thermarest NeoAir Uberlite",
          description: "Leichteste Isomatte auf dem Markt, 250g",
          icon: "bi-broadcast",
        },
        {
          title: "BRS-3000T Titanium Stove",
          description: "Ultraleichter Gaskocher, 25g",
          icon: "bi-fire",
        },
        {
          title: "Leki Carbon Trail Running Poles",
          description: "Zusammenfaltbare Carbonstöcke für steile Passagen",
          icon: "bi-rulers",
        }
      ]
    },

    // Emma als zusätzliche Person
    emma: {
      profile: {
        name: "Emma",
        type: "Alpine Allrounderin",
        description:
          "Die erfahrene Alpencrosserin mit dem perfekten Gleichgewicht zwischen Komfort und Gewichtsersparnis. Emma kennt die Routen und weiß genau, was unterwegs benötigt wird.",
        tags: ["Erfahren", "Organisiert", "Vielseitig"],
        philosophy: {
          text: "Bei einer Alpenüberquerung ist Erfahrung Gold wert. Meine Ausrüstung ist auf alpine Wetterbedingungen optimiert und bietet die richtige Balance zwischen Gewicht und Funktionalität.",
          motto: "Gut vorbereitet ist halb gewonnen.",
        },
      },
      mainEquipment: {
        bike: {
          title: "Specialized Diverge Expert Carbon",
          description:
            "Vielseitiges Gravelbike mit Future Shock 2.0 Federung für ruppige Alpenwege.",
          image: "/bike-placeholder.jpg",
        },
        tent: {
          title: "Big Agnes Copper Spur HV UL2",
          description:
            "Leichtes Zweimannzelt mit hervorragendem Verhältnis von Gewicht zu Raum.",
          image: "/tent-placeholder.jpg",
        },
      },
      otherEquipment: [
        {
          title: "Ortlieb Gravel-Pack",
          description: "Wasserdichte Front-Taschen für zusätzlichen Stauraum",
          icon: "bi-bag",
        },
        {
          title: "Garmin Edge 1040 Solar",
          description: "GPS-Navigation mit Solar-Ladefunktion",
          icon: "bi-map",
        },
        {
          title: "Mountain Hardwear Ghost Whisperer",
          description: "Ultraleichte Daunenjacke für kalte Passabfahrten",
          icon: "bi-thermometer-snow",
        },
        {
          title: "Alpkit Kraku & MytiPot 900",
          description: "Kompaktes Kochset aus Titanium",
          icon: "bi-fire",
        },
        {
          title: "Patagonia Capilene Air Hoody",
          description: "Atmungsaktive Merino-Baselayer für alpine Temperaturen",
          icon: "bi-layers",
        }
      ]
    },

    // Gemeinsame Ausrüstung
    shared: {
      intro: {
        title: "Unsere gemeinsame Ausrüstung für die Alpen",
        description:
          "Bei einer Alpenüberquerung zählt jedes Gramm. Diese Ausrüstungsgegenstände teilen wir uns, um Gewicht zu sparen und trotzdem für alle Situationen gewappnet zu sein.",
      },
      philosophy: {
        title: "Unsere Alpen-Philosophie",
        text: "In den Bergen kann sich das Wetter schnell ändern. Wir setzen auf zuverlässige Ausrüstung, die auch unter widrigen Bedingungen funktioniert, und teilen uns wichtige Gegenstände, um das Gewicht zu reduzieren.",
      },
      items: [
        {
          title: "MSR Trailshot Wasserfilter",
          description:
            "Kompakter Filter für frisches Wasser aus alpinen Bächen und Seen.",
          icon: "bi-droplet",
        },
        {
          title: "Topeak Mountain Survival Gear",
          description:
            "Umfassendes Werkzeugset mit allem Nötigen für Reparaturen in der Wildnis.",
          icon: "bi-tools",
        },
        {
          title: "AlpineAid Pro",
          description:
            "Spezielles Erste-Hilfe-Set für alpinen Einsatz mit Höhenkrankheitsmedikamenten.",
          icon: "bi-bandaid",
        },
        {
          title: "Scott Alpine Pass Karten",
          description:
            "Detaillierte Wasserfeste Karten der Alpenpässe als Backup zur digitalen Navigation.",
          icon: "bi-map",
        },
        {
          title: "Black Diamond Alpine Carbon Cork",
          description:
            "Teleskopstöcke für steile Anstiege und technische Abfahrten.",
          icon: "bi-rulers",
        }
      ]
    }
  }
};

// Eine neue Funktion zum Ändern des aktuellen Abenteuers
let _currentAdventureId = currentAdventureId;

export function setCurrentAdventure(adventureId) {
  if (adventures.some(adv => adv.id === adventureId)) {
    _currentAdventureId = adventureId;
    return true;
  }
  return false;
}

export function getCurrentAdventure() {
  const adventure = adventures.find((adventure) => adventure.id === _currentAdventureId);
  return adventure || adventures[0];
}

// Hilfsfunktion zum Abrufen der Equipment-Daten für ein bestimmtes Abenteuer
export function getEquipmentForAdventure(adventureId = _currentAdventureId) {
  return equipmentData[adventureId] || {};
}
