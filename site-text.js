/* ============================================================
   SITE TEXT — every word on the site is edited here.
   Change the text after a colon and save; the site picks it up.

   How it's laid out
     # nav, # homepage, # general  — site-wide text
     # illustration / # brand / # science / # animation — a category
     ## eko   — one project (the name after ## is its web address,
                don't change it; change "title:" instead)

   Each line is   label: text
     keep the label and the colon, change only the text after them.
     One line per entry, however long (let your editor wrap it).
     Lines starting with // are notes and are ignored.

   Homepage headline
     [square brackets] — the four hover words, in order: illustration,
                         brand, science, animation (icon is added after)
     {d} line break on desktop only
     {s} line break on tablet + mobile only
     {b} line break everywhere

   Grid cards
     description: …              the text on the category grid card
     card title: …               a different name on the card than on the page

   Card sizes on the category grids (Illustration, Editorial, Science)
     grid columns: 9             how many columns that grid has
     columns: 3                  how many columns a card spans
     start column: 5             which column it starts in, 1 = leftmost
                                 (leave empty or write auto to let it go
                                 wherever there is room)
     Cards are placed in the order they appear here; each drops to the
     highest free spot in its columns.

   Project pages
     intro: …                    the text next to the project name; each
                                 intro: line is one paragraph
     statement 1, statement 2 …  the big centred lines, in page order
     caption <image file>: …     the caption under that image (a missing
                                 image has a name instead, e.g. caption talk)

   Anywhere in paragraphs and captions
     [words](https://…)  a link      [words]()  underlined, no link yet
     *words*             italic      **words**  bold
                         always italic: names of publications, exhibitions,
                         clients and umbrella projects — *Calcalist*,
                         *Nature*, *eko*, *Ron Milo*, *Anthropomass*
                         (only the name: "*eko* explainer")
     {b}                 line break

   The only character you can't use is the backtick ( ` ).
   ============================================================ */
window.SITE_TEXT = String.raw`
# nav
logo: Itai Raveh
illustration: Illustration
brand: Brands
science: Science
animation: Animation
instagram: Instagram
bio: Bio

# homepage
headline: Creating smart, detailed{s} [illustrations projects],{b} building [brand illustration{s} languages],{d} visualizing{s} [science communication{s}], and{d} providing [art{s} direction for animation].

# general
browser tab title: Itai Raveh — recreation
projects heading: Projects
editorial heading: Editorial and publications
read more link: Read more about this project
back link: Back to
close button: close

# illustration
name: Illustration projects
grid columns: 9
editorial grid columns: 9

## gibberish
title: Gibberish
columns: 2
start column: 1

## sublet
title: Sublet
columns: 2
start column: 3

## city-symbol
title: City Symbol: Street level Coat Of Arms
columns: 3
start column: 5
description: A series of 45 symbols, portraying the various mythologies embedded in the urban landscape.
intro: A series of 45 symbols, portraying the various mythologies embedded in the urban landscape. The project contains 3 series containing 15 symbols for three different cities: Tel Aviv, Haifa and Jerusalem.
note: Undergraduate project in the visual communication department in Shenkar College of Engineering, Design and Art.
series jerusalem: Jerusalem
statement jerusalem: In Jerusalem, symbols are a reminder of the violence which holds this city together. The color red was used to emphasize this atmosphere.
sym-1-01: YMCA
sym-1-02: Mahane Yehuda
sym-1-03: Museum of Natural History
sym-1-04: Damascus Gate
sym-1-05: Ussishkin Street
sym-2-01: Jewish Quarter
sym-2-02: Nachalat Shivaa
sym-2-03: Kikar Hachatolot
sym-2-04: Rechov Ussishkin
sym-2-05: Moment Café
sym-3-01: Agada
sym-3-02: Machneyuda
sym-3-03: Nachlaot
sym-3-04: Keren Hayesod
sym-3-05: Shtetl Bamidbar
series tel-aviv: Tel Aviv
statement tel-aviv: In Tel Aviv, symbols carry the city’s restless self-invention, secular, sunlit and always half-built.
sym-1-06: Dizengoff
sym-1-07: Bialik Street
sym-1-08: New Central Station
sym-1-09: Rothschild Boulevard
sym-1-10: Hayarkon Park
sym-2-06: Yafo
sym-2-07: Kikar Rabin
sym-2-08: Kerem HaTeimanim
sym-2-09: Har Sinai
sym-2-10: Salame
sym-3-06: Montefiore
sym-3-07: Neve Tzedek
sym-3-08: Abu Kabir
sym-3-09: Neue Jaffa
sym-3-10: Gan Meir
series haifa: Haifa
statement haifa: In Haifa, symbols grow out of the mountain and the port, industrial, layered and green.
sym-1-11: Haifa Port
sym-1-12: Bat Galim
sym-1-13: Herzl Street
sym-1-14: Romema
sym-1-15: Train Station
sym-2-11: Haifa
sym-2-12: Kababir
sym-2-13: Beit Galim
sym-2-14: Hadar Carmel
sym-2-15: Merkaz
sym-3-11: Wadi Nisnas
sym-3-12: Stella Maris
sym-3-13: Rechov HaNeviim
sym-3-14: Masada
sym-3-15: Shfech HaKishon

## weizmann-institute-2026-calendar
title: Weizmann institute 2026 calendar
columns: 2
start column: 8

## the-boys
title: "The Boys"
columns: 2
start column: 1

## the-calling
title: The Calling
columns: 2
start column: 8

## herzl-eretz-israel-museum
title: Herzl | *Eretz Israel Museum*
columns: 3
start column: 3
description: Part of an exhibition, a series of illustrations following the journey of a postcard from Palestine to Austria.

## in-the-garden
title: In the garden
columns: 2
start column: 6

## welcome-to-tivon
title: Welcome to tivon
columns: 2
start column: 8

## heimat
title: Heimat
columns: 2
start column: 1

## saint-clara-film-poster
title: Saint Clara film poster
columns: 2
start column: 6

## the-springs-of-ein-qiniyye
title: The springs of Ein Qiniyye
columns: 3
start column: 3
description: A series of illustrations drawn from the folk tales surrounding the waters of one Druze village.

## tarot-card
title: Tarot Card
columns: 2
start column: 1
description: Justice

## memento-mori
title: Memento Mori
columns: 4
start column: 6
description: While the world is in turmoil, the random death of some leaders in history serves as a kind reminder on the strange moves of history.

## poriah
title: Poriah
columns: 3
start column: 3

## the-road-begins-in-capernaum
title: The Road Begins In Capernaum
columns: 2
start column: 1

## parents-against-child-arrests
title: Parents Against Child Arrests
columns: 2
start column: 6

## passover
title: Passover
columns: 2
start column: 8

## justice
title: Justice
columns: 2
start column: 3

## runs-in-the-family
title: Runs in the family
columns: 2
start column: 5

## jerusalem-snow
title: Jerusalem snow
columns: 3
start column: 7

## valentine-kuli-alma-club
title: Valentine | *Kuli Alma Club*
columns: 2
start column: 1

// editorial and publications

## future-of-medicine-calcalist
title: Future of medicine | *Calcalist*
columns: 3
start column: 1

## our-digital-mirror-calcalist
title: Our digital mirror | *Calcalist*
columns: 3
start column: 4

## nordic-myths-adam-tsair-magazine
title: Nordic Myths | *Adam Tsair Magazine*
columns: 3
start column: 7

## work-in-post-covid-times-globes
title: Work in post COVID times | *Globes*
columns: 3
start column: 4

## the-estonian-sting-calcalist
title: The Estonian Sting | *Calcalist*
columns: 3
start column: 7

## remote-therapy-calcalist
title: Remote therapy | *Calcalist*
columns: 3
start column: 1

## sex
title: Sex education book
columns: 3
start column: 4
description: Illustrations for *Love In The 21st Century*, a sexual education book by sexologist Dr. Daniel Drai.
intro: Illustrations for *Love In The 21st Century*, a sexual education book by sexologist Dr. Daniel Drai.

## archimedes-and-the-crown-einayim-magazine
title: Archimedes and the crown | *Einayim Magazine*
columns: 3
start column: 7

## the-tales-of-rabbi-nachman-of-breslev-einayim-magazine
title: The Tales of Rabbi Nachman of Breslev | *Einayim Magazine*
columns: 3
start column: 1

## crypto-conservatives-calcalist
title: Crypto conservatives | *Calcalist*
columns: 3
start column: 4

## the-beach-adam-tsair-magazine
title: The Beach | *Adam Tsair Magazine*
columns: 3
start column: 7

## election-for-children-einayim-magazine
title: Election for children | *Einayim Magazine*
columns: 3
start column: 4

## where-does-salt-comes-from-einayim-magazine
title: Where does salt comes from? | *Einayim Magazine*
columns: 3
start column: 1

## what-my-father-never-told-me
title: What my father never told me
columns: 3
start column: 3

## geula-cohen-true-legends-book
title: Geula Cohen | *True Legends* book
columns: 2
start column: 6

## einayim-magazine-huzpa
title: Chuzpa! | *Einayim Magazine*
columns: 2
start column: 1

# brand
name: Branded illustration language

## eko
title: eko engineering
// description = the text on the Brands grid card; intro = the text on the project page
description: The illustration language created for *Eko Engineering* is a harmonious blend of hand-drawn whimsy, smart and human-centric charm.
intro: Illustration language created for *Eko Engineering* blending hand-drawn whimsy lines with heavy tech centred concepts. The human nature of the language helps bring to the front the company's working culture of a "flat organization," promoting a direct and open line of communication between employees and leadership.
caption 1.webp: Mutual work
caption 2.webp: The flat organization
caption 3.webp: Working together
caption 4.webp: Different opinions
caption 5.webp: Tests
caption 6.webp: The flow of work
statement 1: The illustrations found prominent use on the company's blog, annual reports showcasing yearly figures, collaborative projects with partners, and more.
caption 7.webp: Custom player
caption 8.webp: Developing custom plug ins
caption 9.webp: Crash testing
statement 2: Merchandise and apparel for *eko Engineering*, embodying the brand's identity and working culture
caption 10.webp: Sweatshirt
caption 11.webp: Sweatshirt design

## island
title: Island.io
description: Illustration language for the *Island.io* product and web application. *Island*’s illustration system is based on the concept of a Zen garden in a metaphorical sense.
intro: Illustration language for the *Island.io* product and web application. *Island*’s illustration system is based on the concept of a Zen garden in a metaphorical sense: A perfect, serene place, where everything is exactly the way it needs to be. The illustrations make use of empty space, elements of tension and minimalism, to create an atmosphere of lightness, clarity and serenity.
intro: Design team lead: Tami Oz Sinai
caption user-selection: **User selection screen:**{b}The coffee cups represent different users, each with their individual style and setting. Which cup will you choose today?
caption login: The island browser is a haven hidden behind a protected gate.{b}The login screen will give you a peek inside the garden.
statement 1: The concept is of a Zen garden: A perfect, serene place, where everything is exactly the way it needs to be.
caption screen-frozen: Screen frozen
statement 2: Every aspect of the typical office has been translated into the realm of the Zen Garden.
caption user-disconnected: User disconnected
statement 3: At the conclusion of the project, the brand team received a comprehensive instruction manual for working with and further developing the illustration system

## benny-goren
title: Benny Goren
description: Illustrations for *Benny Goren*’s, a leading math textbook publishing house
intro: Illustrations for *Benny Goren*’s new website, a leading (in almost mythic proportions) math textbook publishing. The illustration language is aiming to show the brand’s audience: young and sophisticated teachers, riding bikes and using iPads for teaching.
intro: Brand design: [Three bears studio]()
caption 1.webp: Miniature worlds
caption 2.webp: Accessible teachers
caption 3.webp: Working together
caption 4.webp: Connection
caption 5.webp: Aspirations
caption 6.webp: Close up to the inner world of the teacher
statement 1: The illustration language enables the student to encounter the already mythological brand in a new and fresh perspective

## kaltura
title: Kaltura
description: Illustration system of 100+ elements for *Kaltura*, a global leader in enterprise video technology, Built as a modular framework
statement 1: The illustration system is composed of 100+ illustrations, created around a unified logic and separated into different scenes.
statement 2: Addressing different color palettes and utilizing a distinctive character styling, the illustration system provides a seamless representation of *Kaltura*’s brand values.
statement 3: The graphic logic is based on a composition of shapes derived from the *Kaltura* logo, which have been rearranged to create an entire world

## moshal
title: Moshal Scholarship Program Branding
card title: MOSHAL Scholarship Program
description: Illustrated branding concept designed to accompany scholars throughout their educational journey
intro: The illustrated branding concept for the *Moshal Scholarship Program* was designed to accompany scholars throughout their educational journey in South Africa. The visual identity would have evolved alongside students from high school through university and into their alumni phase, while maintaining cohesion.
intro: Although this project was never realized, the collaborative work with tomorrow.io under Assaf Cohen's creative direction explored inclusive representations respecting South Africa's diverse population.
statement 1: Early childhood illustrations featured wide-eyed youngsters with arms outstretched toward books and stars—capturing that first magical spark of learning and possibility.
statement 2: University scholars were illustrated with open, thankful expressions, balancing textbooks while reaching toward the sky—conveying determination filled with optimism.
statement 3: Alumni visuals showed mentors with warm, encouraging smiles, looking forward with their students—representing the full circle of hope and gratitude.
caption 12.webp: Sketches

## help-one-billion
title: Help One Billion
description: Product illustrations for a job searching website for the post covid era
intro: Bring your dog to work, adoption assistance, medical packages and other perks: a series of spot illustrations for *HelpOneBillion*: a job searching website for the post covid era, with new perspectives on what people are looking for when searching for a job.
intro: Brand design by Tami Oz Sinai
caption 1.jpg: Bring you dog to work
caption 2.jpg: Remote working
statement 1: Each illustration is meant to convey the essence of the job perk in a fresh approach. The project never launched, but the illustration language was already fully realized.
caption 3.jpg: Job offers that allows adoption aid
caption 4.jpg: Flexible schedule
caption 5.jpg: Fun working environment
statement 2: The illustration language utilizes brand colors to create tension between spots and lines
caption 6.jpg: Medical packages
caption 7.png: Some initial sketches

# science
name: Science communication
grid columns: 9

## watertowers-of-israel
title: Watertowers of israel
columns: 4
start column: 1

## anthropomass
title: Anthropomass.org
card title: Anthropomass
columns: 5
start column: 5
description: Web essay accompanying the publication of the groundbreaking paper proving that the amount of man-made stuff on earth has suppressed the amount of all living things.
intro: An web based graphic essay accompanying the publication of the groundbreaking paper "Global human-made mass exceeds all living biomass" by *Ron Milo*’s lab of the Department of Plant and Environmental Sciences in the *Weizmann Institue of Science*.
intro: The paper, published december 2020 in *Nature* journal, proves that the amount of man-made stuff on earth has suppressed the amount of all living things.
intro: Full project: [anthropomass.org](https://anthropomass.org)
caption 1.webp: Natural material mass: the Biomass. Warm, organic colors evoking a sense of familiarity and connection to the living world.
caption 2.webp: Human made mass: The Anthropomass. A yellow-gray palette symbolizing industry, alienation, and the built environment.
caption talk: A talk I gave on the project @ISVIS22 data visualization conference
caption 3.webp: Figures were inspired by the ISOTYPE graphic language developed by Otto Neurath and Gerd Arntz, a pictogram system designed to represent entire groups
caption 4.webp: Textures scanned from different materials were incorporated to enhance the organic feel of each group. Natural texture for the biomass, industrial for the anthropomass
caption 5.gif: The project's core concept: two masses compared side by side, tracing how their balance shifted over time.
statement 1: The mission was to translate a complex scientific concept into clear, concise, and engaging communication.
statement 2: Arranging the different materials into categories based on their shapes and colors allowed for visual comparisons to be made.
statement 3: The visual language has been inspired by Otto Neurath and Gerd Arntz's ISOTYPE infographic language

## biomass-of-mammals-ron-milo
title: Biomass of mammals | *Weizmann Institue, Ron Milo's lab*
columns: 4
start column: 1

## space-omelette
title: Cosmic Heat: Frying an Egg on the Hottest Worlds
card title: Space Omelette
columns: 2
start column: 5
description: A playful infographic exploring the scenarios of cooking an egg on the surface of different stars
intro: A playful infographic created for the *Weizmann Institute*, exploring the scenarios of cooking an egg on the surface of different stars. Inspired by Dr. Naama Hallakoun's discovery of a "Jupiter" hotter than the Sun, this piece visualizes extreme temperatures in a relatable way
// the layout had eko's statement here — replace with this project's own line
statement 1: The illustrations found prominent use on the company's blog, annual reports showcasing yearly figures, collaborative projects with partners, and more.

## cell-replacement-by-the-numbers-ron-milo
title: Cell replacement by the Numbers | *Weizmann Institue, Ron Milo's lab*
columns: 3
start column: 7

## a-sea-of-cows-ron-milo
title: A sea of cows | *Weizmann Institue, Ron Milo's lab*
columns: 3
start column: 4

## specialization-of-antigen-presenting-cells-ranit-kedmi
title: Specialization of antigen-presenting cells | *Weizmann Institue, Ranit Kedmi*
columns: 3
start column: 1

## meet-your-digital-twin-eran-segal
title: Meet your digital twin | *Weizmann Institue, Eran Segal*
columns: 3
start column: 7

## cryptochrome-discovery-jonathan-gressel
title: Cryptochrome Discovery | *Weizmann Institue, Jonathan Gressel*
columns: 3
start column: 1

## balance-of-anthropomass-and-biomass
title: Balance of anthropomass and Biomass | *Weizmann Institue, Ron Milo's lab*
columns: 2
start column: 4

## trem2-targeted-car-therapy-ido-amit
title: TREM2-targeted CAR therapy | *Weizmann Institue, Ido Amit*
columns: 3
start column: 6

## shift-in-mammel-biomass-lior-greenspoone
title: Shift in mammel biomass | *Weizmann Institue, Lior Greenspoone*
columns: 3
start column: 1

# animation
name: Art direction for animation

## a-new-solution-to-streaming-technology-eko-explainer
title: A new solution to streaming technology | *eko* explainer
description: An explainer on how *eko*'s streaming technology works, and what makes it different

## the-problem-with-advertising-eko-explainer
title: The problem with advertising | *eko* explainer
description: A short intro for *eko*'s pitch deck, framing the war for attention and why advertising is struggling to keep up.

## the-art-of-storytelling-eko-explainer
title: The art of storytelling | *eko* explainer
description: A set of short loops for an internal presentation, each capturing a core idea: storytelling, choice, balance, the human experience

## aleinu-submarines
title: Every nation is a submarine | *Aleinu*: Animated explainer
description: *Aleinu* is a political movement rethinking civic values. The explainer uses the metaphor of nations as submarines, each finding its own way to happiness

## the-problem-with-e-commerce-eko-explainer
title: The problem with e-commerce | *eko* explainer
description: An explainer on how e-commerce became dominated by a single player, and what that means for everyone else

## on-the-revolutions
title: On the Revolutions
description: A personal piece made for an exhibition: cycles of life at different scales. Seasons, growth, war, creativity. Always turning

# about
// the Bio page. A label repeated = one more line in that list.
lead: Itai is an illustrator and graphic designer based in Tel Aviv.
text: Trained in both visual communication and history studies, his work is driven by curiosity to the world around him: its systems, symbols, and the quiet logic holding it together.
text: Itai's visual language is expressive, witty, and emotionally direct. It draws inspiration from the symbolic gestures of medieval illustration as much as from the reductive logic of mid-century modernist graphics.

services: Services
service: Illustration
service: Visual language
service: Art direction
service: Infographic
service: Science Communication
service: Animation
service: Branding & Identity
service: Marketing design

exhibitions: Exhibitions
exhibition: *Anthropomass*, Holon Design Museum, 2026
exhibition: *Worth the wait*, Eretz Israel Museum, 2025
exhibition: *Dressed to Protest*, Haachim and Con, 2023
exhibition: *Things I Saw From My Window*, Edmond de Rothschild Center, 2022
exhibition: *Without Words*, Musrara Mix Fest Jerusalem, 2022
exhibition: *Water Affair*, Center for Digital Art Holon, 2022
exhibition: *City Emblems*, Abraham Hostel, 2020, solo exhibition
exhibition: *Kronit - Mural art*, Center for Digital Art Holon, 2019
exhibition: *Depth*, a Shenkar college annual exhibition, 2018
exhibition: *Illustration Week* children's book show, 2017
exhibition: *Medium is the Message*, Tel Aviv illustration week, 2017

talks: Talks
talk: *From Me to You*, Eretz Israel Museum, 2026 ([interview](https://www.eretzmuseum.org.il/post/%d7%9e%d7%9e%d7%a0%d7%99-%d7%90%d7%9c%d7%99%d7%9a-%d7%a9%d7%99%d7%97%d7%94-%d7%a2%d7%9d-%d7%94%d7%9e%d7%90%d7%99%d7%99%d7%a8-%d7%95%d7%94%d7%9e%d7%a2%d7%a6%d7%91-%d7%90%d7%99%d7%aa%d7%99-%d7%a8%d7%95/))
talk: *Anthropomass*, ISVIS 2022, Israeli data visualization conference, Shenkar
talk: *Proportions*, Shenkar Visual Communication, 2021, talk with Prof. *Ron Milo* on the *Anthropomass* research
talk: *Water Affair panel*, Center for Digital Art Holon, 2021

teachings: Teachings
teaching: *Illustration for digital screens, senior studio course*, Shenkar, Visual Communication department.

contact: Contact
// email: add your address as a line like this (remove the // to show it)
// contact line: [name@mail.com](mailto:name@mail.com)
contact line: [Instagram](https://www.instagram.com/itairaveh/)
contact line: [LinkedIn](https://www.linkedin.com/in/itai-raveh-28935045/)

clients: Selected Clients
`;
