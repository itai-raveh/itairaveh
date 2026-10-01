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

   Phones and tablets (optional, per project)
     tablet grid columns: 2      (a category) tablets show that grid in 2
                                 equal columns instead
     tablet columns: 3           card width on tablets, out of 6 columns
     tablet start column: 4      where it starts on tablets (1-6)
                                 (normally 2 → 2, 3 → 3, 4 or more → 6)
     focus: 30% 20%              where a cropped card keeps its picture:
                                 30% across from the left, 20% down from
                                 the top (also: top, bottom, left, right)
     mobile crop: none           show the whole image on phones (normally
                                 cropped only past 4:5 tall or 4:3 wide)

   Search engines and shared links
     # general: browser tab title, site description, hebrew name,
     hebrew description, site address (where the site lives, ending
     in /), share image (the picture shown when the homepage is shared)
     each category: description / hebrew description (for search results)
     each project: hebrew title: …  its name in Hebrew, for Hebrew search
     After changing these, run  python3 tools/build.py  (see README).

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
headline: Creating smart, detailed{s} [illustration projects],{b} building [brand illustration{s} languages],{d} visualizing{s} [science communication{s}], and{d} providing [art{s} direction for animation].

# general
browser tab title: Itai Raveh | איתי רווה — Illustrator and designer
site description: Itai Raveh is an illustrator and graphic designer based in Tel Aviv, creating illustration projects, brand illustration languages, science communication and art direction for animation.
hebrew name: איתי רווה
hebrew description: איתי רווה, מאייר ומעצב גרפי מתל אביב: איור, שפות איור למותגים, איור ותקשורת מדע, ובימוי אמנותי לאנימציה.
site address: https://itairaveh.com/
share image: images/share-src/home-damascus-gate.webp
projects heading: Projects
editorial heading: Editorial and publications
read more link: Read more about this project
back link: Back to
close button: close

# illustration
name: Illustration projects
description: Illustration projects by Itai Raveh: editorial illustration for Calcalist, Globes, Einayim and Adam Tsair magazines, books, posters, exhibitions and personal projects.
hebrew description: פרויקטי איור של איתי רווה: איור עיתונות לכלכליסט, גלובס ומגזין עיניים, ספרים, כרזות, תערוכות ופרויקטים אישיים.
grid columns: 9
editorial grid columns: 9
// on tablets the projects grid is 2 columns, every card half the width
// (Editorial keeps sizes that follow the desktop ones)
tablet grid columns: 2

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
jerusalem-uganda-01: Uganda
jerusalem-damascus-gate-02: Damascus Gate
jerusalem-moment-cafe-03: Moment Café
jerusalem-jaffa-gate-04: Jaffa Gate
jerusalem-nachalat-shivaa-05: Nachalat Shivaa
jerusalem-ussishkin-street-06: Ussishkin Street
jerusalem-machneyuda-07: Machneyuda
jerusalem-nachlaot-08: Nachlaot
jerusalem-keren-hayesod-09: Keren Hayesod
jerusalem-jaffa-road-10: Jaffa Road
jerusalem-kikar-hachatolot-11: Kikar Hachatolot
jerusalem-jewish-quarter-12: Jewish Quarter
jerusalem-ymca-13: YMCA
jerusalem-museum-of-natural-history-14: Museum of Natural History
jerusalem-armon-hanatziv-15: Armon Hanatziv
series tel-aviv: Tel Aviv
statement tel-aviv: In Tel Aviv, symbols carry the city’s restless self-invention, secular, sunlit and always half-built.
tel-aviv-dubnov-garden-16: Dubnov Garden
tel-aviv-yafo-17: Yafo
tel-aviv-kikar-malchei-yisrael-18: Kikar Malchei Yisrael
tel-aviv-har-sinai-19: Har Sinai
tel-aviv-bialik-street-20: Bialik Street
tel-aviv-gan-meir-21: Gan Meir
tel-aviv-new-central-station-22: New Central Station
tel-aviv-salame-23: Salame
tel-aviv-hayarkon-park-24: Hayarkon Park
tel-aviv-the-tzadik-of-allenby-25: The Tzadik of Allenby
tel-aviv-neve-tzedek-26: Neve Tzedek
tel-aviv-dizengoff-27: Dizengoff
tel-aviv-neue-jaffa-28: Neue Jaffa
tel-aviv-rothschild-boulevard-29: Rothschild Boulevard
tel-aviv-abu-kabir-30: Abu Kabir
series haifa: Haifa
statement haifa: In Haifa, symbols grow out of the mountain and the port, industrial, layered and green.
haifa-hadar-carmel-31: Hadar Carmel
haifa-bat-galim-32: Bat Galim
haifa-carmel-beach-promenade-33: Carmel Beach Promenade
haifa-haatzmaut-street-34: Ha'Atzmaut Street
haifa-wadi-nisnas-35: Wadi Nisnas
haifa-haneviim-street-36: HaNevi'im Street
haifa-romema-37: Romema
haifa-stella-maris-38: Stella Maris
haifa-merkaz-hacarmel-39: Merkaz HaCarmel
haifa-haifa-port-40: Haifa Port
haifa-city-of-workers-41: City of Workers
haifa-kishon-estuary-42: Kishon Estuary
haifa-herzl-street-43: Herzl Street
haifa-train-station-44: Train Station
haifa-masada-45: Masada

// the process section at the end of the page
statement 1: The process
caption process-wall.webp: Sketches of the entirety of symbols hanged on the studio's wall
caption process-sketch-1.webp: Different sketches
statement 2: A research booklet accompanied the project and was used as a reference to the visual and conceptual world from which the symbols were created.

## weizmann-institute-2026-calendar
title: Weizmann Institute 2026 calendar
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
title: Welcome to Tivon
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

## summer-garden
title: Summer garden
columns: 2
start column: auto

// editorial and publications

## future-of-medicine-calcalist
title: Future of medicine | *Calcalist*
columns: 3
start column: 1

## the-ai-vortex-calcalist
title: The AI vortex | *Calcalist*
// in the top row, where Our digital mirror was
columns: 3
start column: 4

## nordic-myths-adam-tsair-magazine
title: Nordic Myths | *Adam Tsair Magazine*
columns: 3
start column: 7

## work-in-post-covid-times-globes
title: Work in post COVID times | *Globes*
columns: 3
start column: 7

## the-estonian-sting-calcalist
title: The Estonian Sting | *Calcalist*
columns: 3
start column: 1

## crypto-conservatives-calcalist
title: Crypto conservatives | *Calcalist*
columns: 3
start column: 1

## sex
title: Sexual instruction book
columns: 3
start column: 1
description: Illustrations for *Love In The 21st Century*, a sexual education book by sexologist Dr. Daniel Drai.
intro: Illustrations for *Love In The 21st Century*, a sexual education book by sexologist Dr. Daniel Drai.
caption sex-2.webp: Understanding women's sexuality
caption sex-3.webp: Gender roles and growing up
caption sex-4.webp: Differences emerging upon entering the teenage years
caption sex-5.webp: The man child
caption sex-6.webp: A lover's fight
caption sex-7.webp: Figuring it out
statement 1: The illustrations are done with a pen brush, conveying a human and accessible touch to a very human, yet potentially embarrassing, subject
statement 2: Every aspect of human sexuality is considered in the book, including less talked-about subjects such as sexuality during pregnancy

## archimedes-and-the-crown-einayim-magazine
title: Archimedes and the crown | *Einayim Magazine*
columns: 3
start column: 4

## the-tales-of-rabbi-nachman-of-breslev-einayim-magazine
title: The Tales of Rabbi Nachman of Breslev | *Einayim Magazine*
columns: 3
start column: 1

## remote-therapy-calcalist
title: Remote therapy | *Calcalist*
columns: 3
start column: 1

## lonely-scientists-einayim-magazine
title: Lonely scientists | *Einayim Magazine*
columns: 3
start column: 4
tablet columns: 3
tablet start column: 4

## what-my-father-never-told-me
title: What my father never told me
columns: 3
start column: 4

## geula-cohen-true-legends-book
title: Geula Cohen | *True Legends* book
columns: 2
start column: 4
tablet columns: 2
tablet start column: 1

## where-does-salt-comes-from-einayim-magazine
title: Where does salt come from? | *Einayim Magazine*
columns: 3
start column: 7

## the-beach-adam-tsair-magazine
title: The Beach | *Adam Tsair Magazine*
columns: 3
start column: 7

## election-for-children-einayim-magazine
title: Election for children | *Einayim Magazine*
columns: 3
start column: 7

## sun-riddle-einayim-magazine
title: Sun riddle | *Einayim Magazine*
columns: 2
start column: 6
tablet columns: 3
tablet start column: 1

## einayim-magazine-huzpa
title: Chuzpa! | *Einayim Magazine*
columns: 2
start column: 8
tablet columns: 2
tablet start column: 3

# brand
name: Branded illustration language
description: Brand illustration languages by Itai Raveh for eko, Island, Kaltura, Benny Goren, the Moshal Scholarship Program and Help One Billion.
hebrew description: שפות איור למותגים מאת איתי רווה, עבור eko, Island, Kaltura, Benny Goren, Moshal ו-Help One Billion.

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
description: Illustrations for *Benny Goren*, a leading math textbook publishing house
intro: Illustrations for *Benny Goren*’s new website, a leading (in almost mythic proportions) math textbook publishing house. The illustration language is aiming to show the brand’s audience: young and sophisticated teachers, riding bikes and using iPads for teaching.
intro: Brand design: [Three bears studio]()
caption 1.webp: Miniature worlds
caption 2.webp: Accessible teachers
caption 3.webp: Working together
caption 4.webp: Connection
caption 5.webp: Aspirations
caption 6.webp: Close up to the inner world of the teacher
statement 1: The illustration language enables the student to encounter the already mythological brand in a new and fresh perspective

## kaltura
title: Kaltura illustration system
card title: Kaltura
description: Illustration system of 100+ elements for *Kaltura*, a global leader in enterprise video technology, built as a modular framework
intro: A complete illustration system for *Kaltura*. The primary objective was to create a modular system that could be seamlessly applied to a wide range of illustrative products, including icons, marketing materials, advertising campaigns, and various other brand-related applications.
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
caption 1.webp: Bring your dog to work
caption 2.webp: Remote working
statement 1: Each illustration is meant to convey the essence of the job perk in a fresh approach. The project never launched, but the illustration language was already fully realized.
caption 3.webp: Job offers that allow adoption aid
caption 4.webp: Flexible schedule
caption 5.webp: Fun working environment
statement 2: The illustration language utilizes brand colors to create tension between spots and lines
caption 6.webp: Medical packages
caption 7.webp: Some initial sketches

# science
name: Science communication
description: Science communication by Itai Raveh: illustration, infographics and visual essays for scientists at the Weizmann Institute of Science and other research institutes, including Anthropomass with Prof. Ron Milo.
hebrew description: תקשורת מדע של איתי רווה: איור, אינפוגרפיקה ומאמרים חזותיים עבור מדענים במכון ויצמן למדע ובמוסדות מחקר נוספים, בהם Anthropomass עם פרופ׳ רון מילוא.
share image: images/share-src/science-biomass-of-mammals.webp
grid columns: 9

## watertowers-of-israel
title: Watertowers of Israel
columns: 4
start column: 1
tablet columns: 3

## anthropomass
title: Anthropomass.org
card title: Anthropomass
columns: 5
start column: 5
tablet columns: 3
description: Web essay accompanying the publication of the groundbreaking paper proving that the amount of man-made stuff on earth has surpassed the amount of all living things.
intro: A web-based graphic essay accompanying the publication of the groundbreaking paper "Global human-made mass exceeds all living biomass" by *Ron Milo*’s lab of the Department of Plant and Environmental Sciences in the *Weizmann Institute of Science*.
intro: The paper, published December 2020 in *Nature* journal, proves that the amount of man-made stuff on earth has surpassed the amount of all living things.
intro: Full project: [anthropomass.org](https://anthropomass.org)
caption 1.webp: Natural material mass: the Biomass. Warm, organic colors evoking a sense of familiarity and connection to the living world.
caption 2.webp: Human made mass: The Anthropomass. A yellow-gray palette symbolizing industry, alienation, and the built environment.
caption talk: A talk I gave on the project @ISVIS22 data visualization conference
caption 3.webp: Figures were inspired by the ISOTYPE graphic language developed by Otto Neurath and Gerd Arntz, a pictogram system designed to represent entire groups
caption 4.webp: Textures scanned from different materials were incorporated to enhance the organic feel of each group. Natural texture for the biomass, industrial for the anthropomass
caption 5: The project's core concept: two masses compared side by side, tracing how their balance shifted over time.
statement 1: The mission was to translate a complex scientific concept into clear, concise, and engaging communication.
statement 2: Arranging the different materials into categories based on their shapes and colors allowed for visual comparisons to be made.
statement 3: The visual language has been inspired by Otto Neurath and Gerd Arntz's ISOTYPE infographic language

## biomass-of-mammals-ron-milo
title: Biomass of mammals | *Weizmann Institute, Ron Milo's lab*
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
title: Cell replacement by the Numbers | *Weizmann Institute, Ron Milo's lab*
columns: 3
start column: 7

## a-sea-of-cows-ron-milo
title: A sea of cows | *Weizmann Institute, Ron Milo's lab*
columns: 3
start column: 4

## specialization-of-antigen-presenting-cells-ranit-kedmi
title: Specialization of antigen-presenting cells | *Weizmann Institute, Ranit Kedmi*
columns: 3
start column: 1

## meet-your-digital-twin-eran-segal
title: Meet your digital twin | *Weizmann Institute, Eran Segal*
columns: 3
start column: 7

## cryptochrome-discovery-jonathan-gressel
title: Cryptochrome Discovery | *Weizmann Institute, Jonathan Gressel*
columns: 3
start column: 1

## balance-of-anthropomass-and-biomass
title: Balance of anthropomass and Biomass | *Weizmann Institute, Ron Milo's lab*
columns: 2
start column: 4

## trem2-targeted-car-therapy-ido-amit
title: TREM2-targeted CAR therapy | *Weizmann Institute, Ido Amit*
columns: 4
start column: 6

## shift-in-mammal-biomass-lior-greenspoon
title: Shift in mammal biomass | *Weizmann Institute, Lior Greenspoon*
columns: 3
start column: 1

# animation
name: Art direction for animation
description: Art direction for animation by Itai Raveh: animated explainers and short films for eko, Aleinu and others.
hebrew description: בימוי אמנותי לאנימציה של איתי רווה: סרטוני הסבר מונפשים וסרטים קצרים עבור eko, עלינו ואחרים.

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
contact line: [itai.raveh@gmail.com](mailto:itai.raveh@gmail.com)
contact line: [Instagram](https://www.instagram.com/itairaveh/)
contact line: [LinkedIn](https://www.linkedin.com/in/itai-raveh-28935045/)

clients: Selected Clients
`;
