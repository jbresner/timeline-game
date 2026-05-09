// ─────────────────────────────────────────────────────────────────────────────
// data.js — Timeline event deck
//
// HOW TO ADD EVENTS:
//   1. Find the right category section below (or add a new one)
//   2. Copy any existing entry as a template
//   3. Fill in: t (title), y (year), d (description), e (emoji), c (category)
//   4. Use negative numbers for BC years (e.g. y: -44 for 44 BC)
//
// CATEGORIES (c field) — for future filtering/sorting:
//   "science"       — discoveries, inventions, medicine, space
//   "technology"    — computers, internet, devices, engineering
//   "history"       — wars, politics, empires, revolutions
//   "culture"       — art, literature, music, sport, exploration
//   "nature"        — geology, biology, natural events
// ─────────────────────────────────────────────────────────────────────────────

const DECK = [

  // ── SCIENCE ───────────────────────────────────────────────────────────────

  { t: "Penicillin discovered",               y: 1928,  d: "Alexander Fleming's breakthrough",            e: "🔬", c: "science" },
  { t: "DNA double helix discovered",         y: 1953,  d: "Watson and Crick's landmark paper",           e: "🧬", c: "science" },
  { t: "Darwin's Origin of Species",          y: 1859,  d: "Theory of natural selection published",       e: "🦋", c: "science" },
  { t: "Einstein's theory of relativity",     y: 1905,  d: "E=mc² changes physics forever",               e: "🧠", c: "science" },
  { t: "Galileo confirms Earth orbits Sun",   y: 1610,  d: "Telescope observations upend the cosmos",     e: "🔭", c: "science" },
  { t: "Newton publishes Principia",          y: 1687,  d: "Laws of motion and gravity defined",          e: "🍎", c: "science" },
  { t: "Marie Curie wins Nobel Prize",        y: 1903,  d: "First woman to win the Nobel Prize",          e: "⚗️", c: "science" },
  { t: "First human heart transplant",        y: 1967,  d: "Dr. Barnard operates in Cape Town",           e: "❤️", c: "science" },
  { t: "First antibiotic used clinically",    y: 1942,  d: "Penicillin saves soldiers in WWII",           e: "💊", c: "science" },
  { t: "Germ theory proposed",                y: 1861,  d: "Pasteur links microbes to disease",           e: "🦠", c: "science" },
  { t: "Human genome sequenced",              y: 2003,  d: "Full map of human DNA completed",             e: "🔬", c: "science" },
  { t: "Theory of evolution accepted",        y: 1860,  d: "Scientific community embraces Darwin",        e: "🐒", c: "science" },
  { t: "Oxygen discovered",                   y: 1774,  d: "Priestley isolates oxygen gas",               e: "💨", c: "science" },
  { t: "Gravitational waves detected",        y: 2015,  d: "LIGO confirms Einstein's prediction",         e: "🌊", c: "science" },
  { t: "Black hole photographed",             y: 2019,  d: "First image of a black hole captured",        e: "🕳️", c: "science" },
  { t: "Smallpox vaccine developed",          y: 1796,  d: "Jenner creates first modern vaccine",         e: "💉", c: "science" },
  { t: "X-rays discovered",                   y: 1895,  d: "Röntgen reveals invisible radiation",         e: "🫁", c: "science" },
  { t: "Theory of plate tectonics accepted",  y: 1965,  d: "Continental drift becomes mainstream science",e: "🌍", c: "science" },
  { t: "Rosetta Stone deciphered",            y: 1822,  d: "Champollion unlocks Egyptian hieroglyphs",    e: "📿", c: "science" },
  { t: "Hubble proves other galaxies exist",  y: 1924,  d: "Universe revealed to be far larger",          e: "🌌", c: "science" },

  // ── TECHNOLOGY ────────────────────────────────────────────────────────────

  { t: "Printing press invented",             y: 1440,  d: "Gutenberg's movable type press",              e: "📖", c: "technology" },
  { t: "First steam locomotive",              y: 1804,  d: "Trevithick's engine runs on rails",           e: "🚂", c: "technology" },
  { t: "Edison opens power station",          y: 1882,  d: "Pearl Street Station lights New York",        e: "💡", c: "technology" },
  { t: "First transatlantic flight",          y: 1927,  d: "Lindbergh flies New York to Paris",           e: "✈️", c: "technology" },
  { t: "World Wide Web created",              y: 1991,  d: "Tim Berners-Lee launches the web",            e: "🌐", c: "technology" },
  { t: "First email sent",                    y: 1971,  d: "Ray Tomlinson's network message",             e: "📧", c: "technology" },
  { t: "First iPhone released",               y: 2007,  d: "Apple launches the smartphone era",           e: "📱", c: "technology" },
  { t: "Google founded",                      y: 1998,  d: "Brin and Page launch the search engine",      e: "🔍", c: "technology" },
  { t: "ENIAC computer built",                y: 1945,  d: "First general-purpose electronic computer",   e: "🖥️", c: "technology" },
  { t: "First computer bug found",            y: 1947,  d: "Grace Hopper finds a moth in a relay",        e: "🐛", c: "technology" },
  { t: "Netflix founded",                     y: 1997,  d: "DVD-by-mail startup launches",                e: "🎬", c: "technology" },
  { t: "First telephone call",                y: 1876,  d: "Bell speaks to Watson by wire",               e: "📞", c: "technology" },
  { t: "First television broadcast",          y: 1936,  d: "BBC launches public TV service",              e: "📺", c: "technology" },
  { t: "Ford Model T introduced",             y: 1908,  d: "Affordable car for the masses",               e: "🚗", c: "technology" },
  { t: "First photograph taken",              y: 1826,  d: "Niépce captures a permanent image",           e: "📷", c: "technology" },
  { t: "Wright Brothers first flight",        y: 1903,  d: "12 seconds of flight at Kitty Hawk",          e: "🛩️", c: "technology" },
  { t: "Transistor invented",                 y: 1947,  d: "Bell Labs creates the modern transistor",     e: "⚡", c: "technology" },
  { t: "Internet goes public",                y: 1993,  d: "Mosaic browser opens the web to everyone",    e: "🌐", c: "technology" },
  { t: "GPS made available to civilians",     y: 1983,  d: "Reagan opens military GPS to public use",     e: "📡", c: "technology" },
  { t: "ChatGPT launched",                    y: 2022,  d: "OpenAI releases its conversational AI",       e: "🤖", c: "technology" },

  // ── HISTORY ───────────────────────────────────────────────────────────────

  { t: "Magna Carta signed",                  y: 1215,  d: "English barons limit royal power",            e: "📜", c: "history" },
  { t: "Columbus reaches the Americas",       y: 1492,  d: "Voyage permanently changes world history",    e: "⛵", c: "history" },
  { t: "French Revolution begins",            y: 1789,  d: "Storming of the Bastille",                    e: "⚔️", c: "history" },
  { t: "American Declaration of Independence",y: 1776,  d: "Thirteen colonies break from Britain",        e: "🦅", c: "history" },
  { t: "Napoleon defeated at Waterloo",       y: 1815,  d: "The French Emperor's final battle",           e: "⚔️", c: "history" },
  { t: "Berlin Wall falls",                   y: 1989,  d: "Reunification of Germany begins",             e: "🧱", c: "history" },
  { t: "Soviet Union collapses",              y: 1991,  d: "Cold War era ends officially",                e: "🗺️", c: "history" },
  { t: "Atomic bomb dropped on Hiroshima",    y: 1945,  d: "WWII's devastating turning point",            e: "💥", c: "history" },
  { t: "Black Death peaks in Europe",         y: 1349,  d: "Plague kills one-third of Europe",            e: "☠️", c: "history" },
  { t: "Women get the vote in the US",        y: 1920,  d: "19th Amendment ratified",                     e: "🗳️", c: "history" },
  { t: "The Titanic sinks",                   y: 1912,  d: "Ocean liner strikes an iceberg",              e: "🚢", c: "history" },
  { t: "World War I begins",                  y: 1914,  d: "Assassination of Archduke Franz Ferdinand",   e: "🪖", c: "history" },
  { t: "World War II ends",                   y: 1945,  d: "Japan surrenders; global conflict concludes", e: "🕊️", c: "history" },
  { t: "Martin Luther King Jr. assassinated", y: 1968,  d: "Civil rights leader shot in Memphis",         e: "✊", c: "history" },
  { t: "9/11 attacks",                        y: 2001,  d: "Terrorist attacks on US soil",                e: "🗽", c: "history" },
  { t: "Great Wall of China completed",       y: 1644,  d: "Final Ming dynasty sections finished",        e: "🏯", c: "history" },
  { t: "Roman Empire falls",                  y: 476,   d: "Western Rome collapses to invaders",          e: "🏛️", c: "history" },
  { t: "Julius Caesar assassinated",          y: -44,   d: "Senators kill Caesar on the Ides of March",   e: "🗡️", c: "history" },
  { t: "Pyramids of Giza built",              y: -2560, d: "Ancient wonder constructed at Giza",          e: "🔺", c: "history" },
  { t: "Gutenberg Bible printed",             y: 1455,  d: "First major book printed in Europe",          e: "📚", c: "history" },

  // ── CULTURE ───────────────────────────────────────────────────────────────

  { t: "Shakespeare born",                    y: 1564,  d: "The Bard arrives in Stratford-upon-Avon",     e: "🎭", c: "culture" },
  { t: "Eiffel Tower opens",                  y: 1889,  d: "Paris gets its iconic iron tower",            e: "🗼", c: "culture" },
  { t: "First modern Olympic Games",          y: 1896,  d: "Athens hosts the revived Games",              e: "🏅", c: "culture" },
  { t: "Mona Lisa painted",                   y: 1503,  d: "Da Vinci begins his most famous work",        e: "🖼️", c: "culture" },
  { t: "Beethoven's 9th Symphony premiered",  y: 1824,  d: "Deaf composer unveils his final symphony",    e: "🎼", c: "culture" },
  { t: "The Beatles release Abbey Road",      y: 1969,  d: "Their final studio album becomes iconic",     e: "🎵", c: "culture" },
  { t: "First Super Bowl played",             y: 1967,  d: "Green Bay Packers beat Kansas City Chiefs",   e: "🏈", c: "culture" },
  { t: "Disney World opens",                  y: 1971,  d: "Florida theme park opens to the public",      e: "🏰", c: "culture" },
  { t: "Michelangelo completes Sistine Chapel",y: 1512, d: "Four years of ceiling work finished",         e: "🎨", c: "culture" },
  { t: "First feature film released",         y: 1906,  d: "The Story of the Kelly Gang premieres",       e: "🎞️", c: "culture" },
  { t: "Mount Everest first climbed",         y: 1953,  d: "Hillary and Tenzing reach the summit",        e: "🏔️", c: "culture" },
  { t: "First modern novel published",        y: 1605,  d: "Cervantes publishes Don Quixote",             e: "📕", c: "culture" },
  { t: "Woodstock festival",                  y: 1969,  d: "Half a million gather for music and peace",   e: "🎸", c: "culture" },
  { t: "FIFA World Cup first held",           y: 1930,  d: "Uruguay hosts and wins inaugural tournament", e: "⚽", c: "culture" },
  { t: "Statue of Liberty dedicated",         y: 1886,  d: "France's gift to America unveiled",          e: "🗽", c: "culture" },
  { t: "Homer writes the Iliad",              y: -750,  d: "Epic poem of the Trojan War composed",        e: "📜", c: "culture" },
  { t: "First radio broadcast",               y: 1906,  d: "Fessenden transmits voice over airwaves",     e: "📻", c: "culture" },
  { t: "Instagram launched",                  y: 2010,  d: "Photo-sharing app changes social media",      e: "📸", c: "culture" },
  { t: "Rosetta Stone found",                 y: 1799,  d: "Key to deciphering ancient Egypt discovered", e: "🪨", c: "culture" },
  { t: "First crossword puzzle published",    y: 1913,  d: "NYT puzzle pioneer Arthur Wynne's invention", e: "📰", c: "culture" },

  // ── NATURE ────────────────────────────────────────────────────────────────

  { t: "Moon landing",                        y: 1969,  d: "Apollo 11 lands on the lunar surface",       e: "🌕", c: "nature"  },
  { t: "First human in space",                y: 1961,  d: "Yuri Gagarin orbits Earth",                  e: "🚀", c: "nature"  },
  { t: "Pompeii destroyed by Vesuvius",       y: 79,    d: "Volcano buries Roman city in ash",            e: "🌋", c: "nature"  },
  { t: "San Francisco earthquake",            y: 1906,  d: "Magnitude 7.9 quake devastates the city",    e: "🌁", c: "nature"  },
  { t: "Chernobyl disaster",                  y: 1986,  d: "Nuclear reactor explodes in Ukraine",         e: "☢️", c: "nature"  },
  { t: "Amazon rainforest identified",        y: 1542,  d: "Spanish explorer Orellana navigates Amazon", e: "🌿", c: "nature"  },
  { t: "Dinosaurs go extinct",                y: -66000000, d: "Asteroid impact ends the Cretaceous era", e: "🦕", c: "nature" },
  { t: "Mount St. Helens erupts",             y: 1980,  d: "Massive eruption reshapes Washington state", e: "🌋", c: "nature"  },
  { t: "Indian Ocean tsunami",                y: 2004,  d: "9.1 earthquake triggers catastrophic waves",  e: "🌊", c: "nature"  },
  { t: "Halley's Comet observed",             y: 1682,  d: "Halley predicts the comet's return",         e: "☄️", c: "nature"  },

];
