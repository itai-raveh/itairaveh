/* ---------------------------------------------------------
   DATA — this whole site is driven from this one object.
   Add a project by adding one entry here, nothing else.

   Each project:
     slug   — used in the URL (#/category/slug), auto-built
              from the title if you don't set one
     img    — cover image; images: [...] adds a gallery (hover-cycles on
              the card, arrows/click in the preview lightbox)
     caseStudy — adds a "Read more" long-form page (#/category/slug)
     c, g   — placeholder color + emoji, used until the project has an img
--------------------------------------------------------- */

function symUrl(cat, projectSlug, file){
  // illustration's images live under illustration-projects/illustration-editorial,
  // not a flat images/illustration/ folder
  const base = cat === 'illustration' ? 'illustration-projects' : cat;
  return `images/${base}/${projectSlug}/${file}.webp`;
}

function slugify(s){
  return s.toLowerCase().replace(/['"]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

/* uploaded filenames are arbitrary (spaces, parens, Hebrew) — encode each
   path segment so they resolve correctly as a URL regardless */
function encodeImgPath(path){
  return path.split('/').map(encodeURIComponent).join('/');
}

/* builds a {cover, then -2, -3, ...} gallery array for a project folder
   that follows the {slug}-cover.ext / {slug}-N.ext naming convention */
function galleryRange(dir, slug, ext, count){
  const arr = [{img:`${dir}/${slug}-cover.${ext}`}];
  for(let i = 2; i <= count; i++) arr.push({img:`${dir}/${slug}-${i}.${ext}`});
  return arr;
}

/* cut-out figures on a coloured band: size is the band in the reference
   PDF's pixels, each item [file, x, y, width] in those same pixels */
function collage(dir, bg, size, items, variants){
  const paths = list=> list.map(([f, ...pos])=> [dir + '/' + f, ...pos]);
  const c = {type:'collage', bg, size, items: paths(items)};
  Object.entries(variants || {}).forEach(([k, v])=> c[k] = {size:v.size, items:paths(v.items)});
  return c;
}

/* Any object with c/g (color+glyph) can instead carry img:'url' and it
   will render as a real photo/illustration, cover-fit, no code changes
   needed elsewhere. Leave img unset to keep using placeholder color+emoji. */
function bg(obj){
  return obj.img
    ? `background-image:url('${obj.img}'); background-size:cover; background-position:center;`
    : `background:${obj.c || '#eee'};`;
}
function glyphHTML(obj){
  return obj.img ? '' : (obj.g || '');
}

const CATS = {
  illustration: {
    name: 'Illustration projects', // full name; the nav's short one is in its markup
    // homepage hover images, in HERO_FILL order (see HERO_LAYOUTS)
    hero: [
      'images/homepage/illustration/illustration-25.webp',
      'images/homepage/illustration/illustration-19.webp',
      'images/illustration-projects/saint-clara-film-poster/saint-clara-film-poster-cover.webp',
      'images/homepage/illustration/illustration-22.webp',
      'images/homepage/illustration/illustration-20.webp',
      'images/homepage/illustration/illustration-26.webp',
      'images/illustration-projects/the-boys/the-boys-cover.webp',
      'images/homepage/illustration/illustration-23.webp',
      'images/homepage/illustration/illustration-21.webp',
      'images/illustration-projects/heimat/heimat-cover.webp',
    ],
    items: [
      {t:'Gibberish', type:'simple', c:'#e6ddc9', g:'🏺', col:0,
        img:'images/illustration-projects/gibberish/gibberish-cover.webp'},
      {t:'Sublet', type:'simple', c:'#101010', g:'🏙️', col:2,
        img:'images/illustration-projects/sublet/sublet-cover.webp'},
      {t:'City Symbol: Street level Coat Of Arms', type:'case', span:3, col:4, mobilePriority:0.5,
        slug:'city-symbol',
        img:'images/illustration-projects/city-symbol/city-symbol-1-cover.webp',
        d:'A series of 45 symbols, portraying the various mythologies embedded in the urban landscape.',
        caseStudy:{
          intro:'A series of 45 symbols, portraying the various mythologies embedded in the urban landscape. The project contains 3 series containing 15 symbols for three different cities: Tel Aviv, Haifa and Jerusalem.',
          note:'Undergraduate project in the visual communication department in Shenkar College of Engineering, Design and Art.',
          series:[
            {
              key:'jerusalem', name:'Jerusalem', accent:'#e1233c',
              statement:'In Jerusalem, symbols are a reminder of the violence which holds this city together. The color red was used to emphasize this atmosphere.',
              symbols:[
                {n:'YMCA', f:'sym-1-01'},
                {n:'Mahane Yehuda', f:'sym-1-02'},
                {n:'Museum of Natural History', f:'sym-1-03'},
                {n:'Damascus Gate', f:'sym-1-04'},
                {n:'Ussishkin Street', f:'sym-1-05'},
                {n:'Jewish Quarter', f:'sym-2-01'},
                {n:'Nachalat Shivaa', f:'sym-2-02'},
                {n:'Kikar Hachatolot', f:'sym-2-03'},
                {n:'Rechov Ussishkin', f:'sym-2-04'},
                {n:'Moment Café', f:'sym-2-05'},
                {n:'Agada', f:'sym-3-01'},
                {n:'Machneyuda', f:'sym-3-02'},
                {n:'Nachlaot', f:'sym-3-03'},
                {n:'Keren Hayesod', f:'sym-3-04'},
                {n:'Shtetl Bamidbar', f:'sym-3-05'}
              ]
            },
            {
              key:'tel-aviv', name:'Tel Aviv', accent:'#29a4e0',
              statement:'In Tel Aviv, symbols carry the city’s restless self-invention, secular, sunlit and always half-built.',
              symbols:[
                {n:'Dizengoff', f:'sym-1-06'},
                {n:'Bialik Street', f:'sym-1-07'},
                {n:'New Central Station', f:'sym-1-08'},
                {n:'Rothschild Boulevard', f:'sym-1-09'},
                {n:'Hayarkon Park', f:'sym-1-10'},
                {n:'Yafo', f:'sym-2-06'},
                {n:'Kikar Rabin', f:'sym-2-07'},
                {n:'Kerem HaTeimanim', f:'sym-2-08'},
                {n:'Har Sinai', f:'sym-2-09'},
                {n:'Salame', f:'sym-2-10'},
                {n:'Montefiore', f:'sym-3-06'},
                {n:'Neve Tzedek', f:'sym-3-07'},
                {n:'Abu Kabir', f:'sym-3-08'},
                {n:'Neue Jaffa', f:'sym-3-09'},
                {n:'Gan Meir', f:'sym-3-10'}
              ]
            },
            {
              key:'haifa', name:'Haifa', accent:'#1fae70',
              statement:'In Haifa, symbols grow out of the mountain and the port, industrial, layered and green.',
              symbols:[
                {n:'Haifa Port', f:'sym-1-11'},
                {n:'Bat Galim', f:'sym-1-12'},
                {n:'Herzl Street', f:'sym-1-13'},
                {n:'Romema', f:'sym-1-14'},
                {n:'Train Station', f:'sym-1-15'},
                {n:'Haifa', f:'sym-2-11'},
                {n:'Kababir', f:'sym-2-12'},
                {n:'Beit Galim', f:'sym-2-13'},
                {n:'Hadar Carmel', f:'sym-2-14'},
                {n:'Merkaz', f:'sym-2-15'},
                {n:'Wadi Nisnas', f:'sym-3-11'},
                {n:'Stella Maris', f:'sym-3-12'},
                {n:'Rechov HaNeviim', f:'sym-3-13'},
                {n:'Masada', f:'sym-3-14'},
                {n:'Shfech HaKishon', f:'sym-3-15'}
              ]
            }
          ]
        }},
      {t:'Weizmann institute 2026 calendar', type:'simple', c:'#2e59a8', g:'🗓️', col:7,
        img:'images/illustration-projects/weizmann-institute-2026-calendar/weizmann-institute-2026-calendar-cover.webp'},
      {t:'"The Boys"', type:'simple', c:'#e07d78', g:'👦', col:0,
        img:'images/illustration-projects/the-boys/the-boys-cover.webp'},
      {t:'The Calling', type:'simple', c:'#d9d9d9', g:'✨', col:7,
        img:'images/illustration-projects/the-calling/the-calling-cover.webp'},
      {t:'Herzl | Eretz Israel Museum', type:'simple', c:'#f2d9ad', g:'🎩', span:3, col:2,
        img:'images/illustration-projects/herzl-eretz-israel-museum/herzl-eretz-israel-museum-cover.webp',
        images: galleryRange('images/illustration-projects/herzl-eretz-israel-museum', 'herzl-eretz-israel-museum', 'webp', 16),
        d:'Part of an exhibition, a series of illustrations following the journey of a postcard from Palestine to Austria.'},
      {t:'In the garden', type:'simple', c:'#d6ff3d', g:'🫚', col:5,
        img:'images/illustration-projects/in-the-garden/in-the-garden-cover.webp'},
      {t:'Welcome to tivon', type:'simple', c:'#e8a24a', g:'🌳', col:7,
        img:'images/illustration-projects/welcome-to-tivon/welcome-to-tivon-cover.webp'},
      {t:'Heimat', type:'simple', c:'#e6e6e6', g:'🏢', col:0,
        img:'images/illustration-projects/heimat/heimat-cover.webp'},
      {t:'Saint Clara film poster', type:'simple', c:'#c9a6c2', g:'🎬', col:5,
        img:'images/illustration-projects/saint-clara-film-poster/saint-clara-film-poster-cover.webp'},
      {t:'The springs of Ein Qiniyye', type:'simple', c:'#2e6f8e', g:'💧', span:3, col:2, stack:true,
        img:'images/illustration-projects/the-springs-of-ein-qiniyye/the-springs-of-ein-qiniyye-cover.webp',
        images:[
          {img:'images/illustration-projects/the-springs-of-ein-qiniyye/the-springs-of-ein-qiniyye-cover.webp'},
          {img:'images/illustration-projects/the-springs-of-ein-qiniyye/the-springs-of-ein-qiniyye-2.webp'},
          {img:'images/illustration-projects/the-springs-of-ein-qiniyye/the-springs-of-ein-qiniyye-3.webp'}
        ],
        d:'A series of illustrations drawn from the folk tales surrounding the waters of one Druze village.'},
      {t:'Tarot Card', type:'simple', c:'#3a2a4a', g:'🔮', col:0,
        img:'images/illustration-projects/tarot-card/tarot-card-cover.webp',
        d:'Justice'},
      {t:'Memento Mori', type:'simple', c:'#1a1a1a', g:'💀', span:4, col:5,
        img:'images/illustration-projects/memento-mori/memento-mori-cover.webp',
        images: galleryRange('images/illustration-projects/memento-mori', 'memento-mori', 'webp', 6),
        d:'While the world is in turmoil, the random death of some leaders in history serves as a kind reminder on the strange moves of history.'},
      {t:'Poriah', type:'simple', c:'#1e5f6e', g:'🌊', span:3, col:2,
        img:'images/illustration-projects/poriah/poriah-cover.webp'},
      {t:'The Road Begins In Capernaum', type:'simple', c:'#3a6b8a', g:'⛵', col:0,
        img:'images/illustration-projects/the-road-begins-in-capernaum/the-road-begins-in-capernaum-cover.webp',
        images:[
          {img:'images/illustration-projects/the-road-begins-in-capernaum/the-road-begins-in-capernaum-cover.webp'},
          {img:'images/illustration-projects/the-road-begins-in-capernaum/the-road-begins-in-capernaum-2.webp'},
          {img:'images/illustration-projects/the-road-begins-in-capernaum/the-road-begins-in-capernaum-3.webp'},
          {img:'images/illustration-projects/the-road-begins-in-capernaum/the-road-begins-in-capernaum-4.webp'},
          {img:'images/illustration-projects/the-road-begins-in-capernaum/the-road-begins-in-capernaum-5.webp'},
          {img:'images/illustration-projects/the-road-begins-in-capernaum/the-road-begins-in-capernaum-6.webp'},
          {img:'images/illustration-projects/the-road-begins-in-capernaum/the-road-begins-in-capernaum-7.webp'}
        ]},
      {t:'Parents Against Child Arrests', type:'simple', c:'#111111', g:'✊', col:5,
        img:'images/illustration-projects/parents-against-child-arrests/parents-against-child-arrests-cover.webp'},
      {t:'Passover', type:'simple', c:'#8a2e3a', g:'🍷', col:7,
        img:'images/illustration-projects/passover/passover-cover.webp'},
      {t:'Justice', type:'simple', c:'#111111', g:'⚖️', span:2, col:2,
        img:'images/illustration-projects/justice/justice-cover.webp'},
      {t:'Runs in the family', type:'simple', c:'#e8a24a', g:'👪', col:4,
        img:'images/illustration-projects/runs-in-the-family/runs-in-the-family-cover.gif'},
      {t:'Jerusalem snow', type:'simple', c:'#eef2f5', g:'❄️', span:3, col:6,
        img:'images/illustration-projects/jerusalem-snow/jerusalem-snow-cover.webp',
        images: galleryRange('images/illustration-projects/jerusalem-snow', 'jerusalem-snow', 'webp', 8)},
      {t:'Valentine | Kuli Alma Club', type:'simple', c:'#e2436b', g:'💌', col:0,
        img:'images/illustration-projects/kuli-alma-club-valentine/kuli-alma-club-valentine-cover.webp',
        images: galleryRange('images/illustration-projects/kuli-alma-club-valentine', 'kuli-alma-club-valentine', 'webp', 2)},
      {t:'Summer garden', type:'simple', c:'#2f7a3d', g:'', slug:'summer-garden',
        img:'images/illustration-projects/summer-garden/summer-garden-cover.webp'},
    ],
    editorialTracks:11, // the editorial layout is an 11-track grid
    // order and span/col follow the Editorial layout
    editorial: [
      {t:'Future of medicine | Calcalist', type:'simple', c:'#005edb', g:'', span:3, col:0,
        img:'images/illustration-editorial/calcalist-future-of-medicine/calcalist-future-of-medicine-cover.webp'},
      {t:'Our digital mirror | Calcalist', type:'simple', c:'#dcdcdc', g:'🪞', span:2, col:3,
        img:'images/illustration-editorial/calcalist-our-digital-mirror/calcalist-our-digital-mirror-cover.webp'},
      {t:'Nordic Myths | Adam Tsair Magazine', type:'simple', c:'#3a4a6b', g:'🐺', span:4, col:7, cardRatio:1, crop:true, // square, cropped
        img:'images/illustration-editorial/adam-tsair-magazine-nordic-myths/adam-tsair-magazine-nordic-myths-cover.webp',
        images: galleryRange('images/illustration-editorial/adam-tsair-magazine-nordic-myths', 'adam-tsair-magazine-nordic-myths', 'webp', 7)},
      {t:'Work in post COVID times | Globes', type:'simple', c:'#565656', g:'', span:2, col:5,
        img:'images/illustration-editorial/globes-work-in-post-covid-times/globes-work-in-post-covid-times-cover.webp'},
      {t:'Sex education book', type:'case', slug:'sex', c:'#8a2e5a', g:'📕', span:4, col:3,
        img:'images/illustration-editorial/sex/gallery/1.webp',
        images:[
          {img:'images/illustration-editorial/sex/gallery/1.webp'},
          {img:'images/illustration-editorial/sex/gallery/2.webp'},
          {img:'images/illustration-editorial/sex/sex-2.webp'},
          {img:'images/illustration-editorial/sex/gallery/4.webp'},
          {img:'images/illustration-editorial/sex/gallery/5.webp'},
          {img:'images/illustration-editorial/sex/gallery/6.webp'},
          {img:'images/illustration-editorial/sex/gallery/7.webp'},
          {img:'images/illustration-editorial/sex/gallery/8.webp'}
        ],
        d:'Illustrations for "Love In The 21st Century", a sexual education book by sexologist Dr. Daniel Drai.',
        // the card and its preview use the gallery; the page shows the full set
        caseStudy:{intro:'Illustrations for "Love In The 21st Century", a sexual education book by sexologist Dr. Daniel Drai.',
          sections:[{type:'media', items:[
          {img:'images/illustration-editorial/sex/sex-cover.webp'},
          {img:'images/illustration-editorial/sex/sex-2.webp'},
          {img:'images/illustration-editorial/sex/sex-3.webp'},
          {img:'images/illustration-editorial/sex/sex-4.webp'},
          {img:'images/illustration-editorial/sex/sex-5.webp'},
          {img:'images/illustration-editorial/sex/sex-6.webp'},
          {img:'images/illustration-editorial/sex/sex-7.webp'},
          {img:'images/illustration-editorial/sex/sex-8.webp'},
          {img:'images/illustration-editorial/sex/sex-9.webp'},
          {img:'images/illustration-editorial/sex/sex-10.webp'},
          {img:'images/illustration-editorial/sex/sex-11.webp'},
          {img:'images/illustration-editorial/sex/sex-12.webp'},
          {img:'images/illustration-editorial/sex/sex-13.webp'}
          ]}]}},
      {t:'The Estonian Sting | Calcalist', type:'simple', c:'#efefef', g:'', span:4, col:7,
        img:'images/illustration-editorial/calcalist-the-estonian-sting/calcalist-the-estonian-sting-cover.webp'},
      // image not in its folder yet
      {t:'Remote therapy | Calcalist', type:'simple', c:'#cfe0e8', g:'', span:3, col:0,
        img:'images/illustration-editorial/calcalist-remote-therapy/calcalist-remote-therapy-cover.webp'},
      {t:'The Beach | Adam Tsair Magazine', type:'simple', c:'#e8d9b0', g:'🏖️', span:4, col:3,
        img:'images/illustration-editorial/adam-tsair-magazine-the-beach/adam-tsair-magazine-the-beach-cover.webp',
        images: galleryRange('images/illustration-editorial/adam-tsair-magazine-the-beach', 'adam-tsair-magazine-the-beach', 'webp', 11)},
      {t:'Archimedes and the crown | Einayim Magazine', type:'simple', c:'#d4af37', g:'👑', span:4, col:7,
        img:'images/illustration-editorial/einayim-magazine-archimedes-and-the-crown/einayim-magazine-archimedes-and-the-crown-cover.webp',
        images: galleryRange('images/illustration-editorial/einayim-magazine-archimedes-and-the-crown', 'einayim-magazine-archimedes-and-the-crown', 'webp', 4)},
      {t:'The Tales of Rabbi Nachman of Breslev | Einayim Magazine', type:'simple', c:'#e6e6e6', g:'📖', span:3, col:0,
        img:'images/illustration-editorial/einayim-magazine-the-tales-of-rabbi-nachman-of-breslev/einayim-magazine-the-tales-of-rabbi-nachman-of-breslev-cover.webp',
        images: galleryRange('images/illustration-editorial/einayim-magazine-the-tales-of-rabbi-nachman-of-breslev', 'einayim-magazine-the-tales-of-rabbi-nachman-of-breslev', 'webp', 9)},
      {t:'Geula Cohen | True Legends book', type:'simple', c:'#2e5a3a', g:'📗', span:2, col:5,
        img:'images/illustration-editorial/geula-cohen-true-legends-book/geula-cohen-true-legends-book-cover.webp'},
      {t:'Where does salt comes from? | Einayim Magazine', type:'simple', c:'#ffffff', g:'', span:4, col:0,
        img:'images/illustration-editorial/einayim-magazine-where-does-salt-comes-from/einayim-magazine-where-does-salt-comes-from-cover.webp'},
      {t:'Crypto conservatives | Calcalist', type:'simple', c:'#ffffff', g:'', span:2, col:3,
        img:'images/illustration-editorial/calcalist-crypto-conservatives/calcalist-crypto-conservatives-cover.webp'},
      {t:'Chuzpa! | Einayim Magazine', type:'simple', c:'#e6e6e6', g:'📰', span:2, col:0,
        slug:'einayim-magazine-huzpa',
        img:'images/illustration-editorial/einayim-magazine-huzpa/einayim-magazine-huzpa-cover.webp',
        images:[{img:'images/illustration-editorial/einayim-magazine-huzpa/einayim-magazine-huzpa-cover.webp'}, {img:'images/illustration-editorial/einayim-magazine-huzpa/einayim-magazine-huzpa-2.webp'}, {img:'images/illustration-editorial/einayim-magazine-huzpa/einayim-magazine-huzpa-3.webp'}, {img:'images/illustration-editorial/einayim-magazine-huzpa/einayim-magazine-huzpa-4.webp'}, {img:'images/illustration-editorial/einayim-magazine-huzpa/einayim-magazine-huzpa-5.webp'}]},
      {t:'What my father never told me', type:'simple', c:'#dcdcdc', g:'👨', span:4, col:7,
        img:'images/illustration-editorial/what-my-father-never-told-me/what-my-father-never-told-me-cover.webp',
        images: galleryRange('images/illustration-editorial/what-my-father-never-told-me', 'what-my-father-never-told-me', 'webp', 4)},
      {t:'Election for children | Einayim Magazine', type:'simple', c:'#3a6b8a', g:'🗳️', span:3, col:7,
        img:'images/illustration-editorial/einayim-magazine-election-for-children/einayim-magazine-election-for-children-cover.webp',
        images: galleryRange('images/illustration-editorial/einayim-magazine-election-for-children', 'einayim-magazine-election-for-children', 'webp', 3)},
      {t:'The AI vortex | Calcalist', type:'simple', c:'#5aa9d6', g:'', span:3, slug:'the-ai-vortex-calcalist',
        img:'images/illustration-editorial/calcalist-the-ai-vortex/calcalist-the-ai-vortex-cover.webp'},
      {t:'Sun riddle | Einayim Magazine', type:'simple', c:'#f3e9a8', g:'', span:3, slug:'sun-riddle-einayim-magazine',
        img:'images/illustration-editorial/einayim-magazine-sun-riddle/einayim-magazine-sun-riddle-cover.webp'},
      {t:'Lonely scientists | Einayim Magazine', type:'simple', c:'#b9a6cf', g:'', span:3, slug:'lonely-scientists-einayim-magazine', cardRatio:1, // square, cropped
        img:'images/illustration-editorial/einayim-magazine-lonely-scientists/einayim-magazine-lonely-scientists-cover.webp',
        images: galleryRange('images/illustration-editorial/einayim-magazine-lonely-scientists', 'einayim-magazine-lonely-scientists', 'webp', 5)},
    ]
  },
  brand: {
    name: 'Branded illustration language',
    // desktop hover, placed in Figma: [file, x, y, w, h, in front of text, mirrored, rotation°]
    // in the 1920 desktop frame (same coordinates as HERO_LAYOUTS.desktop)
    heroDesktop: [
      ['images/homepage/brand/brand-12.webp', -17.0, -86.7, 694.0, 592.0, 0, 0, 0.0],
      ['images/homepage/brand/brand-15.webp', 789.0, 13.3, 455.0, 347.0, 0, 0, 0.0],
      ['images/homepage/brand/brand-16.webp', 119.0, 689.3, 547.0, 608.0, 1, 0, 0.0],
      ['images/homepage/brand/brand-13.webp', 874.0, 829.3, 171.0, 144.0, 1, 0, 0.0],
      ['images/homepage/brand/brand-17.webp', 1419.0, 319.3, 525.0, 526.0, 1, 0, 0.0],
      ['images/homepage/brand/brand-18.webp', 978.0, 652.3, 704.0, 703.0, 1, 0, 0.0],
      ['images/homepage/brand/brand-14.webp', 1330.0, 96.3, 333.3, 208.4, 1, 0, 0.0],
    ],
    heroFit:'area',
    // two columns, images whole inside their card, wider gaps, no heading — from the Brands layout
    tracks:2, defaultSpan:1, heading:false, gaps:[20, 44],
    readMore:true, // each card gets a link to its project page
    // homepage hover images, in HERO_FILL order (see HERO_LAYOUTS)
    hero: [
      'images/homepage/brand/brand-16.webp',
      'images/homepage/brand/brand-13.webp',
      'images/homepage/brand/brand-17.webp',
      'images/homepage/brand/brand-12.webp',
      'images/homepage/brand/brand-18.webp',
      'images/homepage/brand/brand-15.webp',
      'images/homepage/brand/brand-14.webp',
    ],
    items: [
      {t:'eko engineering', type:'case', slug:'eko', c:'#e2434f', g:'🛠️', cardRatio:1.5, fit:'contain',
        d:'The illustration language created for Eko Engineering is a harmonious blend of hand-drawn whimsy, smart and human-centric charm.',
        img:'images/brand/eko/gallery/1.webp',
        images:[{img:'images/brand/eko/gallery/1.webp'}, {img:'images/brand/eko/gallery/2.webp'}, {img:'images/brand/eko/gallery/3.webp'}, {img:'images/brand/eko/gallery/4.webp'}, {img:'images/brand/eko/gallery/5.webp'}, {img:'images/brand/eko/gallery/6.webp'}, {img:'images/brand/eko/gallery/7.webp'}],
        caseStudy:{
          hero:'images/brand/eko/header.webp',
          intro:'The illustration language created for Eko Engineering is a harmonious blend of hand-drawn whimsy, smart and human-centric charm. The human nature of the language helps bring to the forefront the company\'s working culture of a "flat organization," promoting a direct and open line of communication between employees and leadership.',
          sections:[
            {type:'media', items:[
              {img:'images/brand/eko/1.webp', caption:'Mutual work'},
              {img:'images/brand/eko/2.webp', caption:'The flat organization'},
              {img:'images/brand/eko/3.webp', caption:'Working together'},
              {img:'images/brand/eko/4.webp', caption:'Different opinions'},
              {img:'images/brand/eko/5.webp', caption:'Tests'},
              {img:'images/brand/eko/6.webp', caption:'The flow of work'}
            ]},
            {type:'statement', text:'The illustrations found prominent use on the company\'s blog, annual reports showcasing yearly figures, collaborative projects with partners, and more.'},
            {type:'media', full:true, items:[
              {img:'images/brand/eko/7.webp', caption:'Custom player'},
              {img:'images/brand/eko/8.webp', caption:'Developing custom plug ins'},
              {img:'images/brand/eko/9.webp', caption:'Crash testing'}
            ]},
            {type:'statement', text:'Merchandise and apparel for eko Engineering, embodying the brand\'s identity and working culture'},
            {type:'media', items:[
              {img:'images/brand/eko/10.webp', caption:'Sweatshirt'},
              {img:'images/brand/eko/11.webp', caption:'Sweatshirt design'}
            ]},
            {type:'media', full:true, items:[
              {img:'images/brand/eko/12.webp'}
            ]}
          ]
        }},
      // Island's animations: compressed copies in images/brand/island/video
      // (the transparent WebMs flattened onto their box colour)
      {t:'Island.io', type:'case', slug:'island', c:'#f2ede8', g:'🧘',
        d:'Illustration language for the Island.io product and web application. Island’s illustration system is based on the concept of a Zen garden in a metaphorical sense.',
        img:'images/brand/island/gallery/1.webp', cardRatio:1.5, fit:'contain',
        images:[{img:'images/brand/island/gallery/1.webp'}, {img:'images/brand/island/gallery/2.webp'}, {img:'images/brand/island/gallery/3.webp'}, {img:'images/brand/island/gallery/4.webp'}, {img:'images/brand/island/gallery/5.webp'}, {img:'images/brand/island/gallery/6.webp'}, {img:'images/brand/island/gallery/7.webp'}, {img:'images/brand/island/gallery/8.webp'}],
        caseStudy:{
          hero:{video:'images/brand/island/video/hero', bg:'#fdfdfd', ratio:2.35},
          sections:[
            // more white between the pieces than the other pages (top = space above)
            {type:'media', cols:1, span:8, items:[{id:'user-selection', video:'images/brand/island/video/user-selection', bg:'#fbf9f7', ratio:2.13}]},
            {type:'media', cols:1, span:8, top:120, items:[{id:'login', video:'images/brand/island/video/login', bg:'#0f472f', ratio:1.889}]},
            {type:'statement'},
            {type:'media', cols:1, span:8, items:[{id:'screen-frozen', video:'images/brand/island/video/screen-frozen', bg:'#fbf9f7', ratio:1.99}]},
            {type:'statement'},
            // the scattered objects, across the whole grid
            {type:'media', cols:3, span:9, ratio:1.2, gap:'80px 40px', items:[4,5,6,7,8,9].map(n=>({img:`images/brand/island/${n}.webp`}))},
            {type:'media', cols:1, span:8, top:160, items:[{id:'user-disconnected', video:'images/brand/island/video/user-disconnected', bg:'#0f472f', ratio:2.19}]},
            {type:'media', cols:1, span:8, top:160, items:[{img:'images/brand/island/10.webp'}]},
            {type:'media', cols:3, span:9, top:160, gap:'40px 40px', items:[11,12,13].map(n=>({img:`images/brand/island/${n}.webp`}))},
            {type:'statement'},
            {type:'media', span:9, gap:'40px 40px', items:[{img:'images/brand/island/14.webp'}, {img:'images/brand/island/15.webp'}]},
            {type:'band', bg:'#f2ede8', sections:[
              {type:'media', cols:1, span:5, items:[{img:'images/brand/island/16.webp'}]},
            ]},
          ]
        }},
      {t:'Benny Goren', type:'case', slug:'benny-goren', c:'#f7e2e1', g:'📐',
        img:'images/brand/benny-goren/gallery/1.webp', cardRatio:1.47, fit:'contain',
        images:[{img:'images/brand/benny-goren/gallery/1.webp'}, {img:'images/brand/benny-goren/gallery/2.webp'}, {img:'images/brand/benny-goren/gallery/3.webp'}, {img:'images/brand/benny-goren/gallery/4.webp'}, {img:'images/brand/benny-goren/gallery/5.webp'}, {img:'images/brand/benny-goren/gallery/6.webp'}],
        caseStudy:{
          hero:'images/brand/benny-goren/header.webp', heroRatio:2.3, heroAlign:'center bottom',
          sections:[
            {type:'media', items:[
              {img:'images/brand/benny-goren/1.webp'},
              {img:'images/brand/benny-goren/2.webp'},
              {img:'images/brand/benny-goren/3.webp'},
              {img:'images/brand/benny-goren/4.webp'},
              {img:'images/brand/benny-goren/5.webp'},
              {img:'images/brand/benny-goren/6.webp'},
            ]},
            {type:'statement'},
            {type:'media', cols:1, span:8, items:[
              {img:'images/brand/benny-goren/7.webp'},
              {img:'images/brand/benny-goren/8.webp'},
            ]},
          ]
        }},
      // text for the four below (description, intro, statements, captions) lives only in site-text.js
      {t:'Kaltura', type:'case', slug:'kaltura', c:'#0370fa', g:'▶️',
        img:'images/brand/kaltura/gallery/1.webp', cardRatio:1.47, fit:'contain',
        images:[{img:'images/brand/kaltura/gallery/1.webp'}, {img:'images/brand/kaltura/gallery/2.webp'}, {img:'images/brand/kaltura/gallery/3.webp'}, {img:'images/brand/kaltura/gallery/4.webp'}, {img:'images/brand/kaltura/gallery/5.webp'}, {img:'images/brand/kaltura/gallery/6.webp'}, {img:'images/brand/kaltura/gallery/7.webp'}],
        caseStudy:{
          hero:'images/brand/kaltura/header.webp', heroRatio:1.654, noIntro:true,
          sections:[
            {type:'statement'},
            {type:'media', span:8, items:[1,2,3,4,5,6].map(n=>({img:`images/brand/kaltura/${n}.webp`}))},
            {type:'statement'},
            {type:'media', cols:1, span:5, items:[{img:'images/brand/kaltura/7.webp'}]},
            {type:'media', cols:1, span:7, ratio:1.92, fill:true, items:[{img:'images/brand/kaltura/8.webp'}, {img:'images/brand/kaltura/9.webp'}]},
            {type:'media', cols:1, span:8, items:[{img:'images/brand/kaltura/10.webp'}]},
            {type:'statement'},
            {type:'media', cols:1, span:8, items:[{img:'images/brand/kaltura/11.webp'}]},
            {type:'media', span:8, items:[{img:'images/brand/kaltura/12.webp'}, {img:'images/brand/kaltura/13.webp'}]},
            {type:'media', cols:1, span:7, items:[{img:'images/brand/kaltura/14.webp'}, {img:'images/brand/kaltura/15.webp'}]},
          ]
        }},
      {t:'Moshal Scholarship Program Branding', type:'case', slug:'moshal', c:'#313e87', g:'🎓',
        img:'images/brand/moshal/11.webp', cardRatio:1.365, fit:'contain',
        images:[{img:'images/brand/moshal/11.webp'}, ...[{img:'images/brand/moshal/gallery/1.webp'}, {img:'images/brand/moshal/gallery/2.webp'}, {img:'images/brand/moshal/gallery/3.webp'}, {img:'images/brand/moshal/gallery/4.webp'}, {img:'images/brand/moshal/gallery/5.webp'}]],
        caseStudy:{
          // four figures as in the PDF; tablet keeps 1-3, mobile 1 and 3
          hero: collage('images/brand/moshal', '#323e81', [1762, 715], [
            ['header-1.webp', 95, 104, 502], ['header-2.webp', 486, 120, 556],
            ['header-3.webp', 908, 119, 409], ['header-4.webp', 1291, 132, 467],
          ], {
            tablet:{size:[1450, 715], items:[['header-1.webp', 75, 104, 502], ['header-2.webp', 555, 120, 556], ['header-3.webp', 1035, 119, 409]]},
            mobile:{size:[1000, 700], items:[['header-1.webp', 70, 60, 502], ['header-3.webp', 570, 75, 409]]},
          }),
          sections:[
            // the PDF's arrangement at 85%, with more room below
            collage('images/brand/moshal', '#8c89ce', [1762, 1140], [
              ['2.webp', 225, 73, 405], ['3.webp', 544, 158, 468], ['1.webp', 1009, 127, 555],
              ['4.webp', 204, 407, 403], ['5.webp', 799, 504, 461],
            ]),
            {type:'statement'},
            // the scholars: 9 (waving, with books) top left, as in the PDF, with
            // blue room above the highest figures and under the lowest
            collage('images/brand/moshal', '#323e81', [1762, 1520], [
              ['9.webp', -60, 130, 640], ['7.webp', 1158, 175, 653], ['8.webp', 455, 456, 653], ['6.webp', 16, 680, 483], ['10.webp', 953, 770, 653],
            ]),
            {type:'statement'},
            {type:'band', bg:'#313e87', sections:[
              {type:'media', cols:1, span:7, items:[{img:'images/brand/moshal/11.webp'}]},
            ]},
            {type:'statement'},
            {type:'media', cols:1, span:7, center:true, items:[{img:'images/brand/moshal/12.webp'}]},
            {type:'media', cols:1, span:8, items:[
              {img:'images/brand/moshal/13.webp'}, {img:'images/brand/moshal/14.webp'},
              {img:'images/brand/moshal/15.webp'},
            ]},
          ]
        }},
      {t:'Help One Billion', type:'case', slug:'help-one-billion', c:'#f19ad7', g:'🐶',
        img:'images/brand/help-one-billion/5.webp', cardRatio:1.365, fit:'contain',
        images:[{img:'images/brand/help-one-billion/5.webp'}, {img:'images/brand/help-one-billion/gallery/2.webp'}, {img:'images/brand/help-one-billion/gallery/3.webp'}, {img:'images/brand/help-one-billion/6.webp'}, {img:'images/brand/help-one-billion/gallery/5.webp'}, {img:'images/brand/help-one-billion/gallery/6.webp'}],
        caseStudy:{
          hero:'images/brand/help-one-billion/header.webp', heroRatio:2.73, heroAlign:'center bottom',
          sections:[
            {type:'media', cols:1, span:8, items:[{img:'images/brand/help-one-billion/1.webp'}, {img:'images/brand/help-one-billion/2.webp'}]},
            {type:'statement'},
            {type:'media', cols:1, span:8, items:[{img:'images/brand/help-one-billion/3.webp'}, {img:'images/brand/help-one-billion/4.webp'}, {img:'images/brand/help-one-billion/5.webp'}]},
            {type:'statement'},
            {type:'media', cols:1, span:8, items:[{img:'images/brand/help-one-billion/6.webp'}, {img:'images/brand/help-one-billion/7.webp'}]},
          ]
        }},
    ]
  },
  science: {
    name: 'Science communication',
    // desktop hover, placed in Figma: [file, x, y, w, h, in front of text, mirrored, rotation°]
    // in the 1920 desktop frame (same coordinates as HERO_LAYOUTS.desktop)
    heroDesktop: [
      ['images/homepage/science/science-36.webp', -60.0, 45.0, 561.0, 349.0, 0, 0, 0.0],
      ['images/homepage/science/science-28.webp', 1263.0, 105.0, 344.7, 152.0, 0, 1, 0.0],
      ['images/homepage/science/science-1.webp', 960.0, 211.0, 270.0, 148.0, 0, 0, 0.0],
      ['images/homepage/science/science-32.webp', 1481.0, 577.0, 344.7, 344.7, 0, 0, 0.0],
      ['images/homepage/science/science-30.webp', 1499.0, 69.0, 360.0, 300.0, 0, 1, 0.0],
      ['images/homepage/science/science-34.webp', 1698.0, 429.0, 307.0, 943.0, 0, 0, 0.0],
      ['images/homepage/science/science-29.webp', 1350.0, 257.0, 169.0, 118.0, 0, 1, 0.0],
      ['images/homepage/science/science-31.webp', 447.0, 871.0, 362.0, 361.0, 0, 0, 0.0],
      ['images/homepage/science/science-33.webp', 936.0, 116.0, 113.0, 65.0, 0, 0, 0.0],
      ['images/homepage/science/science-35.webp', 168.0, 800.0, 112.9, 333.0, 0, 0, 0.0],
      ['images/homepage/science/science-37.webp', 1095.0, 871.0, 640.0, 425.0, 0, 0, 0.0],
      ['images/homepage/science/science-40.webp', 824.0, 257.0, 78.0, 77.0, 0, 0, 0.0],
      ['images/homepage/science/science-39.webp', 724.0, 310.0, 100.0, 85.0, 0, 0, 0.0],
      ['images/homepage/science/science-38.webp', 827.0, 759.0, 225.0, 181.0, 0, 0, 0.0],
    ],
    heading:false,
    // homepage hover images, in HERO_FILL order (see HERO_LAYOUTS)
    hero: [
      'images/homepage/science/science-30.webp',
      'images/homepage/science/science-34.webp',
      'images/homepage/science/science-29.webp',
      'images/homepage/science/science-32.webp',
      'images/homepage/science/science-31.webp',
      'images/homepage/science/science-36.webp',
      'images/homepage/science/science-33.webp',
      'images/homepage/science/science-28.webp',
      'images/homepage/science/science-1.webp',
      'images/homepage/science/science-35.webp',
    ],
    items: [
      // order and span/col follow the Science layout (9 tracks)
      {t:'Watertowers of israel', type:'simple', c:'#0f2d50', g:'', span:4, col:0,
        img:'images/science/watertowers-of-israel/watertowers-of-israel-cover.webp', images:[{img:'images/science/watertowers-of-israel/watertowers-of-israel-cover.webp'}, {img:'images/science/watertowers-of-israel/watertowers-of-israel-2.webp'}, {img:'images/science/watertowers-of-israel/watertowers-of-israel-3.webp'}, {img:'images/science/watertowers-of-israel/watertowers-of-israel-4.webp'}, {img:'images/science/watertowers-of-israel/watertowers-of-israel-5.webp'}, {img:'images/science/watertowers-of-israel/watertowers-of-israel-6.webp'}, {img:'images/science/watertowers-of-israel/watertowers-of-israel-7.webp'}, {img:'images/science/watertowers-of-israel/watertowers-of-israel-8.webp'}]},
      // intro, statements and captions live only in site-text.js
      {t:'Anthropomass', type:'case', slug:'anthropomass', c:'#ead5ba', g:'🌍', span:5, col:4,
        d:'Web essay accompanying the publication of the groundbreaking paper proving that the amount of man-made stuff on earth has surpassed the amount of all living things.',
        // the animated cover: a video (padded to the page top's 2.42 in its
        // own colour — a card crops the padding away), img = its poster
        img:'images/science/anthropomass/video/header.webp', video:'images/science/anthropomass/video/header', cardRatio:1.522,
        caseStudy:{
          hero:{video:'images/science/anthropomass/video/header', bg:'#ecd3b6', ratio:2.416},
          sections:[
            {type:'media', items:[{img:'images/science/anthropomass/1.webp'}, {img:'images/science/anthropomass/2.webp'}]},
            {type:'band', bg:'#d9d9d9', top:100, sections:[
              {type:'media', cols:1, span:6, center:true, large:true, items:[{id:'talk', youtube:'yTsacQcwxFU', ratio:16/9}]},
            ]},
            {type:'media', ratio:1.779, top:100, items:[{img:'images/science/anthropomass/3.webp'}, {img:'images/science/anthropomass/4.webp'}]},
            {type:'media', cols:1, span:6, top:100, items:[{id:'5', video:'images/science/anthropomass/video/5', ratio:1.779}]},
            {type:'band', bg:'#ead5ba', flush:true, top:100, sections:[
              {type:'statement', italic:true},
              {type:'media', cols:1, span:4, ratio:1.48, crop:true, pos:'top', items:[{img:'images/science/anthropomass/6.webp'}]},
            ]},
            {type:'media', cols:1, span:5, top:100, items:[{img:'images/science/anthropomass/7.webp'}]},
            {type:'statement'},
            {type:'media', cols:1, span:8, items:[{img:'images/science/anthropomass/8.webp'}]},
            {type:'band', bg:'#dcdcdc', top:100, sections:[
              {type:'statement'},
              {type:'media', row:true, span:8, items:[
                {img:'images/science/anthropomass/9.webp', ratio:0.655},
                {img:'images/science/anthropomass/10.webp', ratio:0.716},
                {img:'images/science/anthropomass/11.webp', ratio:1.506},
              ]},
            ]},
            {type:'band', bg:'#ead5ba', top:100, sections:[
              {type:'media', cols:1, span:8, items:[{img:'images/science/anthropomass/12.webp'}]},
            ]},
          ]
        }},
      {t:'Biomass of mammals | Ron Milo', type:'simple', c:'#ffffff', g:'', span:4, col:0,
        img:'images/science/biomass-of-mammals/biomass-of-mammals-cover.webp', images:[{img:'images/science/biomass-of-mammals/biomass-of-mammals-cover.webp'}, {img:'images/science/biomass-of-mammals/biomass-of-mammals-2.webp'}, {img:'images/science/biomass-of-mammals/biomass-of-mammals-3.webp'}, {img:'images/science/biomass-of-mammals/biomass-of-mammals-4.webp'}, {img:'images/science/biomass-of-mammals/biomass-of-mammals-5.webp'}, {img:'images/science/biomass-of-mammals/biomass-of-mammals-6.webp'}, {img:'images/science/biomass-of-mammals/biomass-of-mammals-7.webp'}]},
      // the stars page; its card is titled "Space Omelette" (card title in site-text.js)
      {t:'Cosmic Heat: Frying an Egg on the Hottest Worlds', type:'case', slug:'space-omelette', c:'#262626', g:'', span:2, col:4,
        img:'images/science/space-omelette/gallery/1.webp', images:[{img:'images/science/space-omelette/gallery/1.webp'}, {img:'images/science/space-omelette/gallery/2.webp'}, {img:'images/science/space-omelette/gallery/3.webp'}, {img:'images/science/space-omelette/gallery/4.webp'}, {img:'images/science/space-omelette/gallery/5.webp'}, {img:'images/science/space-omelette/gallery/6.webp'}],
        caseStudy:{
          hero:'images/science/space-omelette/header.webp', heroRatio:2.476, heroCrop:true,
          sections:[
            {type:'band', bg:'#dedccf', sections:[
              {type:'media', cols:1, span:8, items:[{img:'images/science/space-omelette/1.webp'}]},
            ]},
            {type:'statement'},
            {type:'media', cols:1, bleed:true, items:[{img:'images/science/space-omelette/2.webp'}]},
          ]
        }},
      {t:'Cell replacement by the Numbers | Ron Milo', type:'simple', c:'#f8ddd4', g:'', span:3, col:6,
        vimeo:'1166912331', ratio:1},
      {t:'A sea of cows | Ron Milo', type:'simple', c:'#f5f5f5', g:'', span:3, col:3,
        img:'images/science/a-sea-of-cows/a-sea-of-cows-cover.webp'},
      {t:'Specialization of antigen-presenting cells | Ranit Kedmi', type:'simple', c:'#ffffff', g:'', span:3, col:0,
        img:'images/science/antigen-presenting-cells/antigen-presenting-cells-cover.webp'},
      {t:'Meet your digital twin | Eran Segal', type:'simple', c:'#ffefdb', g:'', span:3, col:6,
        img:'images/science/digital-twin/digital-twin-cover.webp'},
      {t:'Cryptochrome Discovery | Jonathan Gressel', type:'simple', c:'#f5f5f5', g:'', span:3, col:0,
        img:'images/science/cryptochrome-discovery/cryptochrome-discovery-cover.webp'},
      {t:'Balance of anthropomass and Biomass', type:'simple', c:'#10956c', g:'', span:2, col:3,
        img:'images/science/balance-of-anthropomass-and-biomass/balance-of-anthropomass-and-biomass-cover.webp'},
      {t:'TREM2-targeted CAR therapy | Ido Amit', type:'simple', c:'#ffffff', g:'', span:3, col:5,
        img:'images/science/trem2-car-therapy/trem2-car-therapy-cover.webp'},
      {t:'Shift in mammal biomass | Lior Greenspoon', slug:'shift-in-mammal-biomass-lior-greenspoon', type:'simple', c:'#ffffff', g:'', span:3, col:0,
        img:'images/science/shift-in-mammal-biomass/shift-in-mammal-biomass-cover.webp'},
    ]
  },
  animation: {
    name: 'Art direction for animation',
    // desktop hover, placed in Figma: [file, x, y, w, h, in front of text, mirrored, rotation°]
    // in the 1920 desktop frame (same coordinates as HERO_LAYOUTS.desktop)
    heroDesktop: [
      ['images/homepage/animation/animation-5.webp', 807.3, 75.7, 421.0, 299.0, 0, 0, 0.0],
      ['images/homepage/animation/animation-1.webp', -31.7, 762.7, 565.3, 402.7, 1, 1, 0.0],
      ['images/homepage/animation/animation-2.webp', 4.7, -16.5, 622.8, 657.6, 1, 0, -29.03],
      ['images/homepage/animation/animation-4.webp', 1338.3, 148.7, 666.0, 474.0, 1, 1, 0.0],
      ['images/homepage/animation/animation-3.webp', 857.3, 772.7, 961.0, 403.0, 1, 0, 0.0],
    ],
    heroFit:'area',
    // homepage hover images, in HERO_FILL order (see HERO_LAYOUTS)
    hero: [
      'images/homepage/animation/animation-1.webp',
      'images/homepage/animation/animation-2.webp',
      'images/homepage/animation/animation-4.webp',
      'images/homepage/animation/animation-5.webp',
      'images/homepage/animation/animation-3.webp',
    ],
    layout:'list', // one centred column of films, from the Animation layout
    // text lives in site-text.js
    items: [
      {t:"A new solution to streaming technology | eko explainer", type:'simple', c:'#3a5bd9', g:'',
        slug:'a-new-solution-to-streaming-technology-eko-explainer', vimeo:'435668440', ratio:16/9},
      {t:'The problem with advertising | eko explainer', type:'simple', c:'#2e3440', g:'', vimeo:'463755957', ratio:16/9},
      {t:'The art of storytelling | eko explainer', type:'simple', c:'#222', g:'', ratio:0.889, cols:3,
        vimeos:['637160984', '637160541', '637161970', '637161724', '637161480', '637161228']},
      {t:'Every nation is a submarine | "Aleinu": Animated explainer', type:'simple', c:'#000', g:'', slug:'aleinu-submarines', vimeo:'1153473786', ratio:16/9},
      {t:'The problem with e-commerce | eko explainer', type:'simple', c:'#f0c64a', g:'', vimeo:'463732433', ratio:16/9},
      {t:'On the Revolutions', type:'simple', c:'#f2a53a', g:'', vimeo:'824623122', ratio:0.5625, width:28.6},
    ]
  }
};

// auto-assign slugs
Object.values(CATS).forEach(cat=>{
  cat.items.forEach(item=> item.slug = item.slug || slugify(item.t));
  if(cat.editorial) cat.editorial.forEach(item=> item.slug = item.slug || slugify(item.t));
});

/* ---------------------------------------------------------
   SITE TEXT — site-text.js holds every word on the site and
   overrides the text written in CATS / the markup here (which
   stays only as a fallback if that file is missing). Applied
   after slugs are fixed, so retitling a project never changes
   its URL. See the top of site-text.js for the format.
--------------------------------------------------------- */
const UI_TEXT = {
  projects:'Projects', editorial:'Editorial and publications',
  readMore:'Read more about this project', backTo:'Back to', close:'close',
};
// the About page's words; its lists and paragraphs are filled from the
// "# about" part of site-text.js (a label repeated = one more line)
const ABOUT_TEXT = {
  lead:'', text:[],
  services:'Services', service:[],
  exhibitions:'Exhibitions', exhibition:[],
  talks:'Talks', talk:[],
  teachings:'Teachings', teaching:[],
  contact:'Contact', 'contact line':[],
  clients:'Selected Clients',
};
const HEADLINE_CATS = ['illustration', 'brand', 'science', 'animation'];
const CAT_ICONS = {
  illustration:'images/homepage/icons/illustration.webp',
  brand:'images/homepage/icons/brand.webp',
  science:'images/homepage/icons/science.webp',
  animation:'images/homepage/icons/animation.webp',
};

function headlineHTML(src){
  let n = 0;
  return '<span class="baseline-probe"></span>' + src
    .replace(/\[([^\]]+)\]/g, (m, words)=>{
      const cat = HEADLINE_CATS[n++];
      return `<span class="cat" data-cat="${cat}">${words} <img class="cat-icon" src="${CAT_ICONS[cat]}" alt=""></span>`;
    })
    .replace(/\{d\}/g, '<br class="d">').replace(/\{s\}/g, '<br class="s">').replace(/\{b\}/g, '<br>');
}

// text without the markup, for alt text and other plain places
function plain(s){ return String(s).replace(/\*+/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\{b\}/g, ' '); }

function findItem(cat, slug){
  if(!CATS[cat]) return null;
  const all = CATS[cat].items.concat(CATS[cat].editorial || []);
  return all.find(i=> i.slug === slug) || null;
}

/* every symbol across a case study, flattened, for deep-link lookup */
function findSymbol(item, subSlug){
  const cs = item && item.caseStudy;
  if(!cs || !cs.series) return null;
  for(const s of cs.series){
    const hit = s.symbols.find(sym => slugify(sym.n) === subSlug);
    if(hit) return {...hit, series: s};
  }
  return null;
}

/* the Bio page's portrait and client logos (its words are in site-text.js) */
const ABOUT = {
  photo: 'images/about/portrait.webp',
  // from the Bio design (Figma, 1440 frame): each logo is an SVG cut to its
  // cell — all cells the same height, the logo placed inside as designed —
  // with the cell's width in that frame, its name, and 'break' where the
  // desktop row ends (tablets and phones just wrap)
  clients: [
    ['logo-weizmann.svg', 132.7, 'Weizmann Institute of Science'],
    ['logo-tau.svg', 77.4, 'Tel Aviv University'],
    ['logo-huji.svg', 119.5, 'The Hebrew University of Jerusalem'],
    ['logo-caltech.svg', 110.6, 'Caltech'],
    ['logo-nif.svg', 75.2, 'New Israel Fund', 'break'],
    ['logo-nli.svg', 132.7, 'The National Library of Israel'],
    ['logo-muza.svg', 65.3, 'MUZA Eretz Israel Museum'],
    ['logo-monday.svg', 132.7, 'monday.com'],
    ['logo-kaltura.svg', 132.7, 'Kaltura'],
    ['logo-design-museum-holon.svg', 132.7, 'Design Museum Holon', 'break', 3.4], // a little more room before it, as in the design
    ['logo-island.svg', 113.9, 'Island'],
    ['logo-eko.svg', 70.8, 'eko'],
    ['logo-calcalist.svg', 132.7, 'Calcalist'],
    ['logo-haaretz.svg', 111.7, 'Haaretz'],
    ['logo-globes.svg', 111.7, 'Globes'],
  ],
};

/* ---------------------------------------------------------
   PAGE TITLES AND DESCRIPTIONS — what a browser tab, a search
   result and a shared link show for each page. The words come
   from the "# general" part of site-text.js and each project's
   title/description; tools/build.py writes the same into every
   page's file for search engines.
--------------------------------------------------------- */
const SITE = {
  name:'Itai Raveh', he:'איתי רווה',
  title:'Itai Raveh | איתי רווה — Illustrator and designer',
  description:'', heDescription:'', url:'',
  shareImage:'',
};
// the kind of work, for image descriptions: "…, illustration by Itai Raveh"
const CAT_WORK = {illustration:'illustration', brand:'brand illustration', science:'science illustration', animation:'animation'};

function shorten(s, n){
  s = plain(s).replace(/\s+/g, ' ').trim();
  if(s.length <= n) return s;
  return s.slice(0, s.lastIndexOf(' ', n - 1)).replace(/[,;:.\s]+$/, '') + '…';
}
// "Name | Publication" → "Name, Publication" (for alt text and titles)
function flatTitle(t){ return plain(t).replace(/\s*\|\s*/g, ', '); }
function altText(cat, item, caption){
  return ((caption ? plain(caption) + ' — ' : '') + flatTitle(item.t) + ', ' + (CAT_WORK[cat] || 'work') + ' by ' + SITE.name).replace(/"/g, '&quot;');
}

// {path, title, description, image} for a page; sub = a symbol's slug
function pageMeta(cat, item, sub){
  const he = SITE.he ? ' | ' + SITE.he : '';
  const both = (en, heb)=> [en, heb].filter(Boolean).join(' ');
  if(!cat) return {path:'', title:SITE.title, description:both(SITE.description, SITE.heDescription), image:SITE.shareImage};
  if(cat === 'about') return {path:'about/', title:`${ABOUT_TEXT.bioTitle || 'Bio'} — ${SITE.name}${he}`,
    description: both(shorten([ABOUT_TEXT.lead].concat(ABOUT_TEXT.text).join(' '), 300), SITE.heDescription), image:ABOUT.photo};
  const c = CATS[cat];
  if(!item){
    const first = c.items.find(i=> i.img);
    return {path:cat + '/', title:`${c.name} — ${SITE.name}${he}`,
      description: both(c.description || `${c.name} by ${SITE.name}.`, c.heDescription), image: c.shareImage || (first && first.img) || SITE.shareImage};
  }
  const cs = item.caseStudy || {};
  const text = item.d || [].concat(cs.intro || [])[0] || `${flatTitle(item.t)}, ${CAT_WORK[cat] || 'work'} by ${SITE.name}.`;
  const sym = sub && findSymbol(item, sub);
  const name = flatTitle(item.t) + (item.he ? ' | ' + item.he : '');
  if(sym) return {path:`${cat}/${item.slug}/${sub}/`, title:`${sym.n} — ${name} — ${SITE.name}`,
    description:`${sym.n}, ${sym.series.name}. ${shorten(text, 200)}`, image:symUrl(cat, item.slug, sym.f)};
  return {path:`${cat}/${item.slug}/`, title:`${name} — ${SITE.name}`, description: shorten(text, 300),
    image: item.img || (cs.hero && typeof cs.hero === 'string' ? cs.hero : '') || SITE.shareImage};
}

function applySiteText(src){
  const general = {
    'browser tab title': v=> SITE.title = document.title = v,
    'site description': v=> SITE.description = v,
    'hebrew name': v=> SITE.he = v,
    'hebrew description': v=> SITE.heDescription = v,
    'site address': v=> SITE.url = v.replace(/\/?$/, '/'),
    'share image': v=> SITE.shareImage = v,
    'projects heading': v=> UI_TEXT.projects = v,
    'editorial heading': v=> UI_TEXT.editorial = v,
    'read more link': v=> UI_TEXT.readMore = v,
    'back link': v=> UI_TEXT.backTo = v,
    'close button': v=> UI_TEXT.close = v,
  };
  const navLinkEl = k=> document.querySelector(`.nav-links li[data-cat="${k}"]`);
  const navRight = document.querySelectorAll('.nav-right a');
  const nav = {
    logo: v=> document.querySelector('.logo').textContent = v,
    instagram: v=> navRight[0].textContent = v,
    bio: v=> navRight[1].textContent = ABOUT_TEXT.bioTitle = v,
  };
  HEADLINE_CATS.forEach(k=> nav[k] = v=> (navLinkEl(k).querySelector('a') || navLinkEl(k)).textContent = v);

  const flatSections = list=> (list || []).flatMap(s=> s.type === 'band' ? flatSections(s.sections) : [s]);
  const fileText = new Map(); // item → which of intro/description the file set
  const order = [];           // projects in the order the file lists them
  let section = null, item = null;
  src.split('\n').forEach(raw=>{
    const line = raw.trim();
    if(!line || line.startsWith('//')) return;
    let m;
    if((m = line.match(/^##\s+(.+)$/))){ item = CATS[section] ? findItem(section, m[1].trim()) : null; if(item) order.push(item); return; }
    if((m = line.match(/^#\s+(.+)$/))){ section = m[1].trim().toLowerCase(); item = null; return; }
    const colon = line.indexOf(':');
    if(colon < 0) return;
    const key = line.slice(0, colon).trim(), val = line.slice(colon + 1).trim();
    const k = key.toLowerCase();

    if(section === 'nav'){ if(nav[k]) nav[k](val); return; }
    if(section === 'homepage'){ if(k === 'headline') document.querySelector('.lead').innerHTML = headlineHTML(val); return; }
    if(section === 'general'){ if(general[k]) general[k](val); return; }
    if(section === 'about'){
      if(Array.isArray(ABOUT_TEXT[k])){ if(val) ABOUT_TEXT[k].push(val); }
      else if(k in ABOUT_TEXT) ABOUT_TEXT[k] = val;
      return;
    }
    if(!CATS[section]) return;
    if(!item){
      if(k === 'name') CATS[section].name = val;
      else if(k === 'grid columns') CATS[section].tracks = +val;
      else if(k === 'editorial grid columns') CATS[section].editorialTracks = +val;
      else if(k === 'tablet grid columns') CATS[section].tabletTracks = +val;
      else if(k === 'description') CATS[section].description = val;
      else if(k === 'hebrew description') CATS[section].heDescription = val;
      else if(k === 'share image') CATS[section].shareImage = val;
      return;
    }

    const cs = item.caseStudy;
    const seen = fileText.get(item) || {};
    fileText.set(item, seen);
    if(k === 'title') item.t = val;
    else if(k === 'card title') item.cardT = val;
    // card size on the category grid: how many columns wide, and which
    // column it starts in (1 = leftmost; blank or "auto" = wherever fits)
    else if(k === 'columns'){ if(+val > 0) item.span = +val; }
    else if(k === 'tablet columns'){ if(+val > 0) item.tspan = +val; }
    else if(k === 'tablet start column'){ if(+val > 0) item.tcol = +val - 1; }
    // where a cropped card keeps its picture: "30% 20%" = 30% across, 20% down
    else if(k === 'focus'){ if(/^[\w\s%.-]+$/.test(val)) item.focus = val; }
    else if(k === 'mobile crop') item.mobileCrop = val.toLowerCase();
    else if(k === 'hebrew title') item.he = val;
    else if(k === 'start column'){ if(!val || val.toLowerCase() === 'auto') delete item.col; else if(+val > 0) item.col = +val - 1; }
    else if(k === 'description'){ item.d = val; seen.description = true; }
    else if(k === 'note'){ if(cs && 'note' in cs) cs.note = val; else item.note = val; }
    else if(k === 'intro'){
      // each intro: line is one paragraph
      if(cs){ cs.intro = seen.intro ? [].concat(cs.intro, val) : [val]; seen.intro = true; }
    }
    else if(cs && (m = key.match(/^statement\s+(\d+)$/i))){
      const st = flatSections(cs.sections).filter(s=> s.type === 'statement')[m[1] - 1];
      if(st) st.text = val;
    }
    else if(cs && (m = key.match(/^caption\s+(.+)$/i))){
      flatSections(cs.sections).forEach(s=> (s.items || []).forEach(it=>{
        if((it.id || (it.img || '').split('/').pop()) === m[1]) it.caption = val;
      }));
    }
    else if(cs && cs.series && (m = key.match(/^(series|statement)\s+(.+)$/i))){
      const s = cs.series.find(s=> s.key === m[2]);
      if(s){ if(m[1].toLowerCase() === 'series') s.name = val; else s.statement = val; }
    }
    else if(cs && cs.series){
      cs.series.forEach(s=> s.symbols.forEach(sym=>{ if(sym.f === key) sym.n = val; }));
    }
  });
  // grid order follows the file: listed projects in file order, anything
  // the file doesn't list keeps its place after them
  const rank = new Map(order.map((it, i)=> [it, i]));
  const byFile = list=> list && list.sort((a, b)=> (rank.has(a) ? rank.get(a) : 1e9) - (rank.has(b) ? rank.get(b) : 1e9));
  Object.values(CATS).forEach(c=>{ byFile(c.items); byFile(c.editorial); });
  // a project whose file entry gives a description but no intro uses the
  // description as its page text too
  fileText.forEach((seen, it)=>{
    if(seen.description && !seen.intro && it.caseStudy && !it.caseStudy.series) it.caseStudy.intro = it.d;
  });
}
if(window.SITE_TEXT) applySiteText(window.SITE_TEXT);

/* === end of the site's data: tools/build.py reads site.js up to here === */


// every image's real width/height, from images/sizes.js (written by
// tools/optimize_images.py) — the masonry sizes each card to its own image
// from this, so layout is exact on first paint, no reflow-in
const IMG_SIZES = window.IMG_SIZES || {};
const IMG_RATIO = Object.fromEntries(Object.entries(IMG_SIZES).map(([k, [w, h]])=> [k, w / h]));

// src + srcset for an image: a .md.webp copy (1200px) is offered where one
// exists, so phones and small cards don't download the full-size file.
// sizes = roughly how wide it shows (CSS), e.g. '(max-width:600px) 100vw, 25vw'
function srcsetOf(path){
  const s = IMG_SIZES[path];
  if(!s || !s[2]) return '';
  return `${encodeImgPath(path.replace(/\.webp$/, '.md.webp'))} ${s[2]}w, ${encodeImgPath(path)} ${s[0]}w`;
}
function imgSrc(path, sizes){
  const set = srcsetOf(path);
  return `src="${encodeImgPath(path)}"` + (set ? ` srcset="${set}" sizes="${sizes || '100vw'}"` : '');
}
// the same on an existing <img> (its sizes attribute stays)
function setImg(el, path){
  const set = srcsetOf(path);
  if(set) el.srcset = set; else el.removeAttribute('srcset');
  el.src = encodeImgPath(path);
}

/* ---------------------------------------------------------
   ELEMENTS + STATE
--------------------------------------------------------- */
const scatterBack  = document.getElementById('scatterBack');
const scatterFront = document.getElementById('scatterFront');
const gridPage    = document.getElementById('gridPage');
const hero        = document.getElementById('hero');
const navLinks    = document.querySelectorAll('.nav-links li');
const casePage    = document.getElementById('casePage');
const bioLink     = document.getElementById('bioLink');

let currentCat = null;

/* Homepage hover images. One layout per breakpoint, measured off the Figma
   frames: desktop from "new homepage 4/desktop hover.svg" (1920 wide),
   tablet and mobile from "new homepage 3" (768 / 375 wide). Each slot is
   [x, y, w, h, front] in that frame's px; front=1 draws it over the
   headline, as the frame does.
   Every category shares the same slots. Its `hero` image list fills them
   in HERO_FILL order, which spreads a short list across the frame instead
   of bunching it into the first few slots — illustration's list is
   written in that order so each image lands in the slot it has in the
   design. Slot 9 only exists on desktop (the small frames drop Heimat).
   An image is fitted inside its slot (background-size:contain), so a
   category whose images have other proportions still works.
   Positions scale with viewport width like the frame does (tablet at 85%,
   around the centre), and are anchored to the headline's first baseline,
   not the top of the screen — so a window taller or shorter than the
   frame keeps the same image-to-text relationship. */
const HERO_FILL = [0, 2, 3, 6, 1, 8, 4, 5, 7, 9];
const HERO_LAYOUTS = {
  desktop: {frameW:1920, baseline:471.831, scale:1, slots:[
    [28, -122, 398, 572, 1], [674, -15, 486, 486, 1], [1635, -104, 212, 454, 1],
    [77, 709, 354, 507, 1], [809, 801, 215, 323, 1],
    [1268, 531, 344.69, 459.459, 0], [1643, 549, 344.69, 459.459, 0],
    [1274, 962, 344.69, 459.459, 0], [1632, 990, 335, 458, 0],
    [1219, -4, 221, 333, 1],
  ]},
  tablet: {frameW:768, baseline:329.47, scale:.85, slots:[
    [-199, -226, 398, 572, 0], [199, -96, 486, 486, 0], [609, -226, 212, 454, 0],
    [-100, 712, 250.476, 359, 0], [254, 822, 93, 139, 0],
    [469, 664, 210.873, 281.087, 0], [698.417, 675.012, 210.873, 281.087, 0],
    [472.671, 927.676, 210.873, 281.087, 0], [691.687, 944.877, 204.998, 280.123, 0],
  ]},
  mobile: {frameW:375, baseline:279.38, scale:1, slots:[
    [-59, -46, 177.027, 254.111, 0], [103, 124, 216.037, 216.037, 1], [299, 0, 94.3328, 201.611, 1],
    [-71, 549, 141.661, 203.039, 1], [134, 476, 41.2664, 61.8996, 1],
    [189, 523, 132.667, 176.84, 1], [333.333, 529.928, 132.667, 176.84, 1],
    [191.31, 688.887, 132.667, 176.84, 1], [329.1, 699.709, 128.97, 176.234, 1],
  ]},
};

/* heroFit:'area' (Brands, Animation): their images are mostly landscape
   while the slots, drawn for the illustrations, are mostly portrait — fitted
   inside a slot they came out small. Instead each image covers the same
   area as its slot, in its own proportions, centred on the slot. */
const heroSwatches = [];
Object.entries(CATS).forEach(([key, cat]) => {
  const desk = new Map((cat.heroDesktop || []).map((d, i)=> [d[0], [...d.slice(1), i]]));
  const files = cat.hero.concat([...desk.keys()].filter(f=> !cat.hero.includes(f)));
  files.forEach((src, k) => {
    const el = document.createElement('div');
    el.className = 'swatch cat-' + key;
    el.style.backgroundImage = `url('${encodeImgPath(src)}')`;
    // a category with its own desktop layout shows only those images on desktop
    const sw = {el, k, fit: cat.heroFit, ratio: 0, desk: desk.get(src), hasDesk: desk.size > 0};
    // proportions are read once the homepage is shown (measureHero), so
    // other pages don't download the hover images
    if(cat.heroFit === 'area') sw.src = src;
    heroSwatches.push(sw);
  });
});

function measureHero(){
  heroSwatches.forEach(sw=>{
    if(!sw.src || sw.measuring) return;
    sw.measuring = true;
    const im = new Image();
    im.onload = ()=>{ sw.ratio = im.naturalWidth / im.naturalHeight; layoutHero(); };
    im.src = encodeImgPath(sw.src);
  });
}

const baselineProbe = document.querySelector('.baseline-probe');
function layoutHero(){
  if(!hero.offsetParent) return; // hero is display:none — nothing to measure against
  const vw = window.innerWidth; // breakpoints match the CSS media queries
  const L = vw <= 600 ? HERO_LAYOUTS.mobile : vw <= 1024 ? HERO_LAYOUTS.tablet : HERO_LAYOUTS.desktop;
  const s = vw / L.frameW * L.scale;
  const base = baselineProbe.getBoundingClientRect().top - hero.getBoundingClientRect().top;
  heroSwatches.forEach(({el, k, fit, ratio, desk, hasDesk})=>{
    if(L === HERO_LAYOUTS.desktop && hasDesk){
      el.hidden = !desk;
      el.style.transform = '';
      if(!desk) return;
      const [x, y, w, h, front, flip, rot] = desk;
      el.dataset.z = desk[7]; // Figma layer order
      Object.assign(el.style, {
        left: vw / 2 + (x - L.frameW / 2) * s + 'px', top: base + (y - L.baseline) * s + 'px',
        width: w * s + 'px', height: h * s + 'px',
        transform: [flip ? 'scaleX(-1)' : '', rot ? `rotate(${rot}deg)` : ''].join(' ').trim(),
      });
      const layer = front ? scatterFront : scatterBack;
      if(el.parentNode !== layer) layer.appendChild(el);
      return;
    }
    el.style.transform = '';
    delete el.dataset.z;
    const slot = L.slots[HERO_FILL[k]];
    el.hidden = !slot;
    if(!slot) return;
    let [x, y, w, h, front] = slot;
    if(fit === 'area' && ratio){
      const cx = x + w / 2, cy = y + h / 2, area = w * h;
      w = Math.sqrt(area * ratio); h = Math.sqrt(area / ratio);
      x = cx - w / 2; y = cy - h / 2;
    }
    Object.assign(el.style, {
      left: vw / 2 + (x - L.frameW / 2) * s + 'px', top: base + (y - L.baseline) * s + 'px',
      width: w * s + 'px', height: h * s + 'px',
    });
    const layer = front ? scatterFront : scatterBack;
    if(el.parentNode !== layer) layer.appendChild(el);
  });
  // overlapping images stack in their Figma layer order
  [scatterBack, scatterFront].forEach(layer=>
    [...layer.children].filter(el=> el.dataset.z !== undefined)
      .sort((a, b)=> a.dataset.z - b.dataset.z).forEach(el=> layer.appendChild(el)));
}
window.addEventListener('resize', layoutHero);

const catEls = document.querySelectorAll('.lead .cat');
function setActiveCat(cat){
  if(cat) layoutHero(); // the hero may have been hidden, or fonts not loaded, at the last layout
  catEls.forEach(c => c.classList.toggle('on-' + c.dataset.cat, c.dataset.cat === cat));
  heroSwatches.forEach(({el}) => el.classList.toggle('active', el.classList.contains('cat-' + cat)));
}
/* Mouse: hover shows a category's scatter, click goes there. Touch has no
   hover (and fires an emulated mouseenter right before click, which would
   otherwise show + navigate in one tap), so there the first tap shows it,
   a second tap on the same word goes there, and tapping anywhere else
   hides it. */
const canHover = window.matchMedia('(hover: hover)');
let tappedCat = null;
catEls.forEach(el=>{
  const cat = el.dataset.cat;
  el.addEventListener('mouseenter', ()=>{ if(canHover.matches) setActiveCat(cat); });
  el.addEventListener('mouseleave', ()=>{ if(canHover.matches) setActiveCat(null); });
  el.addEventListener('click', e=>{
    if(!canHover.matches && tappedCat !== cat){
      e.stopPropagation();
      tappedCat = cat;
      setActiveCat(cat);
      return;
    }
    tappedCat = null;
    setActiveCat(null);
    go(cat + '/');
  });
});
document.addEventListener('click', e=>{
  if(tappedCat && !e.target.closest('.lead .cat')){ tappedCat = null; setActiveCat(null); }
});

// the nav's categories and the logo are plain links, run by the link router below

// tablet/mobile nav: burger opens a full-screen menu (categories +
// Instagram/Bio, see the max-width:1024px nav rules); any click inside it — a category,
// Instagram, Bio, or the burger itself again — closes it back up
const navEl = document.getElementById('nav');
const navBurger = document.getElementById('navBurger');
navBurger.addEventListener('click', ()=>{
  const open = navEl.classList.toggle('menu-open');
  navBurger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navEl.querySelectorAll('.nav-links li, .nav-right a').forEach(el=>{
  el.addEventListener('click', ()=>{
    navEl.classList.remove('menu-open');
    navBurger.setAttribute('aria-expanded', 'false');
  });
});

/* ---------------------------------------------------------
   ROUTER — URL design, and why it is shaped this way.

   Real addresses (no #), one per page, each also a real file that
   tools/build.py writes (so search engines index every project and
   a shared link opens straight on it):
     illustration/                 a category grid
     illustration/city-symbol/     a project's page — the canonical URL
     illustration/city-symbol/ymca/  one symbol inside it
     about/                        the bio
   The popup is a PREVIEW of a project over the grid you were on, with
   its own restorable URL so back closes it and a refresh reopens it:
     illustration/?preview=city-symbol
   Paths are relative to the site's root, which <base href> marks (the
   site can live in a sub-folder, e.g. user.github.io/itairaveh/).
   Old #/… links still work: they're turned into the address.
--------------------------------------------------------- */
const ROOT_PATH = new URL('.', document.baseURI).pathname;

function parseLocation(){
  let path = decodeURI(location.pathname);
  if(path.startsWith(ROOT_PATH)) path = path.slice(ROOT_PATH.length);
  path = path.replace(/(^|\/)index\.html$/, '');
  const [cat, slug, sub] = path.split('/').filter(Boolean);
  const params = new URLSearchParams(location.search);
  return {
    cat: cat || null,
    slug: slug || null,
    sub: sub || null,
    preview: params.get('preview'),
    previewImg: params.get('i')
  };
}

// target: a path from the root, e.g. 'illustration/' or '' for home
function go(target, replace){
  const url = ROOT_PATH + target;
  if(location.pathname + location.search !== url){
    history[replace ? 'replaceState' : 'pushState'](null, '', url);
  }
  route(true);
}

// the tab title, search description and canonical address for where we are
function setPageMeta(){
  const {cat, slug, sub} = parseLocation();
  const known = cat === 'about' || !!CATS[cat];
  const item = known && slug ? findItem(cat, slug) : null;
  const m = pageMeta(known ? cat : null, item, item ? sub : null);
  document.title = m.title;
  const set = (sel, make, attr, val)=>{
    let el = document.head.querySelector(sel);
    if(!el){ el = document.createElement(make[0]); Object.assign(el, make[1]); document.head.appendChild(el); }
    el.setAttribute(attr, val);
  };
  set('meta[name="description"]', ['meta', {name:'description'}], 'content', m.description);
  set('link[rel="canonical"]', ['link', {rel:'canonical'}], 'href', location.origin + ROOT_PATH + m.path);
}

// an old #/illustration?preview=x link → illustration/?preview=x
if(location.hash.startsWith('#/')){
  const [p, q] = location.hash.slice(2).split('?');
  history.replaceState(null, '', ROOT_PATH + (p ? p.replace(/\/?$/, '/') : '') + (q ? '?' + q : ''));
}

// nav = a click or back/forward (not the first load): fade the new section in
function route(nav){
  showRoute();
  setPageMeta();
  if(nav) fadeSection(); else lastTopLevel = parseLocation().cat;
}

function showRoute(){
  const {cat, slug, sub, preview, previewImg} = parseLocation();
  stopAllCardGalleries();
  // any navigation closes the tablet/mobile menu — links (Bio) go through
  // the link router, which stops the click before the menu's own handler
  navEl.classList.remove('menu-open');
  navBurger.setAttribute('aria-expanded', 'false');

  // home
  if(!cat){
    bioLink.classList.remove('dim');
    closeLightbox();
    casePage.classList.remove('show');
    gridPage.classList.remove('show');
    hero.style.display = 'flex';
    measureHero();
    navLinks.forEach(l=>l.classList.remove('dim'));
    return;
  }
  bioLink.classList.toggle('dim', cat === 'about');
  if(cat === 'about'){
    closeLightbox();
    hero.style.display = 'none';
    gridPage.classList.remove('show');
    if(casePage.dataset.slug !== 'about'){
      renderAbout();
      casePage.dataset.slug = 'about';
      window.scrollTo(0,0);
    }
    casePage.classList.add('show');
    navLinks.forEach(l=>l.classList.remove('dim'));
    return;
  }
  if(!CATS[cat]){ go('', true); return; } // an address the site doesn't have

  const item = slug ? findItem(cat, slug) : null;

  // canonical project page
  if(item){
    hero.style.display = 'none';
    gridPage.classList.remove('show');
    if(casePage.dataset.slug !== item.slug){
      renderCasePage(cat, item);
      casePage.dataset.slug = item.slug;
      window.scrollTo(0,0);
    }
    casePage.classList.add('show');
    navLinks.forEach(l=> l.classList.toggle('dim', l.dataset.cat !== cat));

    // deep-linked single symbol
    const sym = sub ? findSymbol(item, sub) : null;
    if(sym) openLightbox(cat, item, sym);
    else closeLightbox();
    return;
  }

  // category grid, optionally with a preview popup over it
  casePage.classList.remove('show');
  casePage.dataset.slug = '';
  closeLightbox();
  hero.style.display = 'none';
  if(currentCat !== cat){
    renderGrid(cat);
    currentCat = cat;
  }
  gridPage.classList.add('show');
  // .grid-page was display:none until the line above, so the masonry
  // measured 0-width if computed inside renderGrid — lay out now instead
  gridPage.querySelectorAll('.grid').forEach(layoutMasonry);
  navLinks.forEach(l=> l.classList.toggle('dim', l.dataset.cat !== cat));

  const previewItem = preview ? findItem(cat, preview) : null;
  if(previewItem) openProjectLightbox(cat, previewItem, previewImg ? +previewImg : 0);
  else closeLightbox();
}

/* ---------------------------------------------------------
   In-page link handling.

   In a normal browser, cards and symbols carry a real href, so
   right-click > "Open in new tab" and middle-click both work.

   Inside a sandboxed preview (this file shown in an iframe), any
   href navigation is caught by the host and turns into an
   "open external link" prompt. So when we detect we are framed,
   we render the target as data-href instead and drive the router
   ourselves. Deployed on your own domain, hrefs come back.
--------------------------------------------------------- */
const FRAMED = (()=>{ try { return window.self !== window.top; } catch(e){ return true; } })();

function linkAttr(target){
  return FRAMED ? `data-href="${target}"` : `href="${target}"`;
}
// a grid card: its href is the project's own page (what a new tab or a
// search engine follows), a plain click opens the preview over the grid
function cardLinkAttr(cat, item, previewTarget){
  if(FRAMED) return `data-href="${previewTarget}"`;
  const page = CATS[cat].layout === 'list' ? previewTarget : `${cat}/${item.slug}/`;
  return `href="${page}" data-go="${previewTarget}"`;
}

// set right before navigating to a grid card's preview, consumed once by
// openProjectLightbox to fly the clicked thumbnail into place instead of
// the lightbox just appearing — the classic FLIP technique: record the
// image's on-screen rect here (First), let the lightbox lay out normally
// at its real size (Last), then in openProjectLightbox invert that delta
// into a transform and animate it back to identity.
let pendingFlight = null;

document.addEventListener('click', (e)=>{
  // buttons (thumb-nav arrows, lightbox nav/close) sit inside a card's
  // <a> for layout reasons but have their own click handlers — without
  // this check the capture-phase router below hijacks their clicks into
  // a navigation before the button's own listener ever runs
  if(e.target.closest('button')) return;
  // the site's own links only: not ones opening a new tab, mail, or another site
  const a = e.target.closest('a[href]:not([target]), [data-href]');
  if(!a) return;
  const raw = a.getAttribute('data-go') || a.getAttribute('data-href') || a.getAttribute('href') || '';
  if(/^([a-z]+:|\/\/)/i.test(raw)) return;
  if(e.metaKey || e.ctrlKey || e.shiftKey) return; // let new-tab through
  e.preventDefault();
  e.stopPropagation();
  const target = raw.replace(/^#\/?/, '').replace(/^\.\//, '');
  if(target.includes('?preview=')){
    const srcEl = a.querySelector('img, .fill-img, .fill-block');
    pendingFlight = srcEl ? {rect: srcEl.getBoundingClientRect()} : null;
  } else {
    pendingFlight = null;
  }
  go(target);
}, true); // capture phase, ahead of any host handler

window.addEventListener('popstate', ()=> route(true));

/* fade the newly-entered top-level section in from white on cross-section
   navigation (home <-> category, category <-> category) — replaces the
   old black overlay, which dipped to opaque black and back instead of
   revealing cleanly, and was still mid-dip while the grid underneath was
   itself still blurred-up/loading, reading as a flash. Any lightbox the
   same navigation opens (e.g. a grid landing on ?preview=) already fades
   in on its own via .lb-panel's transition, at a matching duration, so
   page and project appear together without extra sync code here.
   Same-section navigation (opening a preview/symbol on a page you're
   already on) isn't touched — this only fires on a genuine new entrance. */
let lastTopLevel = null;
function fadeSection(){
  const {cat} = parseLocation();
  if(cat !== lastTopLevel){
    const target = !cat ? hero : (casePage.classList.contains('show') ? casePage : gridPage);
    target.style.transition = 'none';
    target.style.opacity = '0';
    requestAnimationFrame(()=> requestAnimationFrame(()=>{
      target.style.transition = 'opacity .45s cubic-bezier(.16,1,.3,1)';
      target.style.opacity = '1';
    }));
  }
  lastTopLevel = cat;
}

/* ---------------------------------------------------------
   GRID — a real masonry, packed in JS by layoutMasonry() below (see
   .grid/.card rules for why CSS Grid alone can't do this). Each card
   carries the aspect ratio of its own cover image, read once from
   IMG_RATIO. `item.span` is a track count out of the 9-track desktop
   grid (2 = normal, 3/4 = featured); layoutMasonry scales it down
   proportionally at narrower track counts.
--------------------------------------------------------- */
// "Name | Publication" → name bold, the part after the bar regular
function titleHTML(t){
  const i = t.indexOf('|');
  return i < 0 ? `<strong>${rich(t)}</strong>` : `<strong>${rich(t.slice(0, i).trim())}</strong> | ${rich(t.slice(i + 1).trim())}`;
}

// Vimeo in background mode: autoplays muted and looped, no controls. The
// button over it opens the full player (controls; starts muted, sound on
// from its own volume control) in the lightbox.
function vimeoLoopHTML(id, ratio){
  return `<div class="vid-box" style="aspect-ratio:${ratio}">
    <iframe src="https://player.vimeo.com/video/${id}?background=1&dnt=1" loading="lazy" allow="autoplay; fullscreen" title="video"></iframe>
    <button class="vid-open" type="button" data-vimeo="${id}" data-ratio="${ratio}" aria-label="Play"><span></span></button>
  </div>`;
}

// title, then the description under it — the same on every grid
function captionHTML(cat, item, target){
  // Brands: a link to the project's page under the description
  const more = CATS[cat].readMore && item.caseStudy && !FRAMED
    ? `<a class="card-more" href="${cat}/${item.slug}/">${UI_TEXT.readMore}</a>` : '';
  return `
      <div class="card-caption">
        <div class="card-title">${target ? `<a ${target}>${titleHTML(item.cardT || item.t)}</a>` : titleHTML(item.cardT || item.t)}</div>
        ${item.d ? `<p class="card-desc">${rich(item.d)}</p>` : ''}
        ${more}
      </div>`;
}

/* How a card sizes itself at each width:
     desktop — `span` of the grid's tracks (site-text "columns")
     tablet  — a 6-track grid (Brands keeps its 2): 2 columns → 2 of 6,
               3 → 3 (half), 4 or more → the full width, or the card's
               own "tablet columns"
     phone   — one column; the card keeps its image's proportions within
               4:5 (tall) to 4:3 (wide), cropping only past those, around
               the image's "focus" point; "mobile crop: none" shows it whole */
// a card that shows its image whole inside a set shape (Brands) uses the
// copy tools/build.py padded to that shape in the image's own colours
// (<name>.card.webp), so it fills the card seamlessly
function cardImg(item, path){
  if(item.fit !== 'contain' || !path) return path;
  const c = path.replace(/\.webp$/, '.card.webp');
  return IMG_SIZES[c] ? c : path;
}

function tabletSpan(span){ return span >= 4 ? 6 : Math.max(2, span); }
const MOBILE_RATIO = [4/5, 4/3];

// a looping, muted video (path without extension, as in mediaItemHTML) filling its box
function loopVideoHTML(path, cls){
  const v = encodeImgPath(path);
  return `<video class="${cls}" autoplay muted loop playsinline poster="${v}.webp">
      <source src="${v}.av1.mp4" type='video/mp4; codecs="av01.0.09M.08"'>
      <source src="${v}.mp4" type="video/mp4">
    </video>`;
}

function cardHTML(cat, item, i, defaultSpan, tracks, ttracks){
  const cardTarget = cat + '/?preview=' + item.slug;
  const hasImg = !!item.img;
  const ratio = item.cardRatio || (hasImg && IMG_RATIO[item.img]) || item.ratio || 1.3;
  const mRatio = item.mobileCrop === 'none' || item.vimeo ? ratio : Math.min(MOBILE_RATIO[1], Math.max(MOBILE_RATIO[0], ratio));
  const span = item.span || defaultSpan || 2, full = tracks || 9;
  // roughly how wide the card shows, so the browser picks the small or full image
  const tabletPct = ttracks === 2 ? 50 : Math.round((item.tspan || tabletSpan(span)) / 6 * 100);
  const sizes = full > 2
    ? `(max-width:520px) 100vw, (max-width:960px) ${tabletPct}vw, ${Math.round(span / full * 100)}vw`
    : `(max-width:520px) 100vw, 50vw`;
  // the first cards on the page load straight away, the rest as they scroll in
  const load = i < 4 ? `loading="eager"${i < 2 ? ' fetchpriority="high"' : ''}` : 'loading="lazy"';
  const focus = item.focus ? ` style="object-position:${item.focus}"` : '';
  const alt = altText(cat, item);
  // a gallery, or a card of its own set shape, shows each image whole inside
  // the card, on white, rather than cropped to the card's shape (unless the
  // project asks for the crop, like Nordic Myths)
  const whole = !item.crop && !item.video && ((item.images && item.images.length > 1) || item.cardRatio);
  // Brands: its padded copies already have the card's shape, so they fill it
  const padded = item.fit === 'contain' && cardImg(item, item.img) !== item.img;
  // a stacked card (springs of Ein Qiniyye) has no single hover-cycle
  // thumb — each of its images is its own link, opening the lightbox at
  // that specific image, instead of all three funneling into the same
  // (always-first) preview
  const thumbHTML = item.vimeo
    ? `<div class="card-thumb loaded-now" style="--mr:${mRatio}">${vimeoLoopHTML(item.vimeo, ratio)}</div>`
    : item.stack && item.images
    ? `<div class="card-thumb card-thumb-stack">${item.images.map((im, imgIdx) =>
        `<a ${cardLinkAttr(cat, item, cardTarget + '&i=' + imgIdx)}><img ${imgSrc(im.img, sizes)} alt="${alt}" ${load} decoding="async" style="aspect-ratio:${IMG_RATIO[im.img] || 1.3}"></a>`
      ).join('')}</div>`
    : `<a class="card-thumb-link" ${cardLinkAttr(cat, item, cardTarget)}>
        <div class="card-thumb${padded ? '' : item.fit === 'contain' ? ' contain' : whole ? ' whole' : ''}" style="aspect-ratio:${ratio}; --mr:${mRatio}">
          ${item.video
            ? loopVideoHTML(item.video, 'fill-img')
            : hasImg
            ? `<img class="fill-img" ${imgSrc(cardImg(item, item.img), sizes)} alt="${alt}" ${load} decoding="async"${focus}>`
            : `<div class="fill-block" style="${bg(item)}"></div><div class="glyph">${glyphHTML(item)}</div>`}
        </div>
      </a>`;
  const mobilePriority = item.mobilePriority !== undefined ? item.mobilePriority : i;
  const colAttr = item.col !== undefined ? ` data-col="${item.col}"` : '';
  const tspanAttr = (item.tspan ? ` data-tspan="${item.tspan}"` : '') + (item.tcol !== undefined ? ` data-tcol="${item.tcol}"` : '');
  return `
    <div class="card" data-i="${i}" data-span="${span}" data-mp="${mobilePriority}"${colAttr}${tspanAttr}>
      ${thumbHTML}
      ${captionHTML(cat, item, item.vimeo ? null : cardLinkAttr(cat, item, cardTarget))}
    </div>`;
}

// tracks = the desktop track count of this grid (9 for most, 11 for
// Illustration's editorial section, 2 for Brands — each measured off its
// own layout); items can carry span/col in those tracks
function gridHTML(cat, items, indexOffset, tracks, defaultSpan, gaps, tabletTracks){
  const [colGap, rowGap] = gaps || [14, GRID_ROW_GAP];
  return `<div class="grid" data-tracks="${tracks || 9}"${tabletTracks ? ` data-ttracks="${tabletTracks}"` : ''} data-colgap="${colGap}" data-rowgap="${rowGap}">${items.map((it,i)=>cardHTML(cat,it,indexOffset+i,defaultSpan,tracks,tabletTracks)).join('')}</div>`;
}

// an image shown whole inside a card of another shape: the space around
// it takes its own corner colour (white where the corner is transparent)
function paintBehind(img, box){
  try{
    const c = document.createElement('canvas');
    c.width = c.height = 1;
    const ctx = c.getContext('2d');
    // a few pixels in: some exports carry a stray 1px edge
    const k = Math.max(4, Math.round(img.naturalWidth * .006));
    ctx.drawImage(img, k, k, 1, 1, 0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    box.style.background = a < 128 ? '#fff' : `rgb(${r},${g},${b})`;
  }catch(e){}
}

/* Packs a grid's cards into the shortest available track(s), like
   Pinterest/Masonry — each card keeps its own real height, so a card next
   to a much taller neighbor still continues right after its own content
   instead of waiting for the tall one (a row-aligned layout was tried and
   reverted: forcing every card in a "row" to share one top, sized to the
   tallest member, left huge dead space under shorter cards whenever a
   tall outlier like the Springs stacked triptych shared their row).
   A card can carry a designer-assigned data-col (desktop only) to fix
   its horizontal position — layoutMasonry still auto-stacks it vertically
   below whatever's already in that column, it just skips the "shortest
   column" search. Recomputed on render and on resize (debounced), since
   it depends on measured pixel widths. */
const GRID_ROW_GAP = 18; // vertical space after a card's caption, before the next card in that track (horizontal colGap stays 14, unrelated to this)
function layoutMasonry(gridEl){
  const cards = Array.from(gridEl.children).filter(el => el.classList.contains('card'));
  if(!cards.length){ gridEl.style.height = ''; return; }
  const w = gridEl.clientWidth;
  const full = +gridEl.dataset.tracks || 9;
  // desktop: the grid's own tracks; tablet: 6 (see tabletSpan), or the
  // grid's own tablet count (site-text "tablet grid columns", e.g. 2 =
  // every card half the width); phone: 1
  const tabletTracks = full > 2 ? (+gridEl.dataset.ttracks || 6) : full;
  const trackCount = w >= 901 ? full : w >= 521 ? tabletTracks : 1;
  const colGap = +gridEl.dataset.colgap || 14;
  const rowGap = +gridEl.dataset.rowgap || GRID_ROW_GAP;
  const trackW = (w - colGap * (trackCount - 1)) / trackCount;
  const spanOf = card => trackCount === 1 ? 1
    : trackCount === full ? Math.min(full, Math.max(1, +card.dataset.span || 2))
    : trackCount === 6 ? Math.min(6, +card.dataset.tspan || tabletSpan(+card.dataset.span || 2))
    : 1;

  cards.forEach(card=>{
    const span = spanOf(card);
    card.style.width = (trackW * span + colGap * (span - 1)) + 'px';
  });

  // mobile is a single column, so stacking order IS reading order — most
  // cards keep their normal (DOM/data) order, but a project can carry a
  // mobilePriority to jump the queue (e.g. City Symbol wants to sit right
  // after the first project on mobile, even though the desktop masonry
  // — which doesn't care about order, only column height — places it
  // elsewhere)
  const orderedCards = trackCount === 1
    ? [...cards].sort((a, b) => parseFloat(a.dataset.mp) - parseFloat(b.dataset.mp))
    : cards;

  const colHeights = new Array(trackCount).fill(0);
  orderedCards.forEach(card=>{
    const span = spanOf(card);
    const explicitCol = trackCount === full && full > 2 && card.dataset.col !== undefined ? +card.dataset.col
      : trackCount === 6 && card.dataset.tcol !== undefined ? +card.dataset.tcol : null;
    let bestCol = 0, bestTop = Infinity;
    if(explicitCol !== null){
      bestCol = Math.min(explicitCol, trackCount - span); // never past the right edge
      bestTop = Math.max(...colHeights.slice(bestCol, bestCol + span));
    } else {
      for(let c = 0; c <= trackCount - span; c++){
        const top = Math.max(...colHeights.slice(c, c + span));
        if(top < bestTop){ bestTop = top; bestCol = c; }
      }
    }
    card.style.left = (bestCol * (trackW + colGap)) + 'px';
    card.style.top = bestTop + 'px';
    const newHeight = bestTop + card.offsetHeight + rowGap;
    for(let c = bestCol; c < bestCol + span; c++) colHeights[c] = newHeight;
  });
  gridEl.style.height = (Math.max(...colHeights) - rowGap) + 'px';
}

/* Animation: one centred column of films (layout decoded from its
   reference). An item is {vimeo, ratio} or, for a set of loops,
   {vimeos:[...], ratio, cols}; width = its share of the page width. */
function animListHTML(cat, items){
  return `<div class="anim-list">${items.map(item=>`
    <div class="anim-item" style="--w:${item.width || 70.6}%">
      ${item.vimeos
        ? `<div class="anim-set" style="--cols:${item.cols || 3}">${item.vimeos.map(id=> vimeoLoopHTML(id, item.ratio)).join('')}</div>`
        : vimeoLoopHTML(item.vimeo, item.ratio)}
      ${captionHTML(cat, item, null)}
    </div>`).join('')}</div>`;
}

let masonryResizeTimer;
window.addEventListener('resize', ()=>{
  clearTimeout(masonryResizeTimer);
  masonryResizeTimer = setTimeout(()=>{
    if(gridPage.classList.contains('show')) gridPage.querySelectorAll('.grid').forEach(layoutMasonry);
  }, 120);
});

function renderGrid(cat){
  const data = CATS[cat];
  if(data.layout === 'list'){
    gridPage.innerHTML = animListHTML(cat, data.items);
    return;
  }
  let html = `
    <h1 class="sr-only">${data.name}</h1>
    ${data.heading === false ? '' : `<div class="breadcrumb">${UI_TEXT.projects}</div>`}
    ${gridHTML(cat, data.items, 0, data.tracks, data.defaultSpan, data.gaps, data.tabletTracks)}
  `;
  // optional labeled subsection, e.g. Illustration → Editorial and publications
  if(data.editorial && data.editorial.length){
    html += `
      <div class="breadcrumb" style="margin-top:64px">${UI_TEXT.editorial}</div>
      ${gridHTML(cat, data.editorial, data.items.length, data.editorialTracks)}
    `;
  }
  gridPage.innerHTML = html;
  // not laid out here: .grid-page is still display:none at this point,
  // so it would measure 0 width — route() lays it out once shown
  gridPage.querySelectorAll('.card-thumb').forEach((thumb,i)=>{
    setTimeout(()=> thumb.classList.add('loaded'), 150 + i*70 + Math.random()*200);
  });
  gridPage.querySelectorAll('.card-thumb.contain .fill-img').forEach(img=>{
    if(img.complete) paintBehind(img, img.parentNode); else img.addEventListener('load', ()=> paintBehind(img, img.parentNode), {once:true});
  });
  wireCardGalleries(cat);
}

/* ---------------------------------------------------------
   CARD GALLERIES — a card with more than one image plays through
   them by itself in a slow crossfade (arrows on hover step by hand).
   Cards start at different moments so they don't all change at
   once, and a card only plays while it's on screen, its grid is the
   page being shown and no preview is open over it.
--------------------------------------------------------- */
const GALLERY_FADE = 1200;  // ms, the crossfade
const GALLERY_HOLD = 2600;  // ms each image stays fully shown
const REDUCED_MOTION = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
// kept so route() can call it; galleries now pause and resume by themselves
function stopAllCardGalleries(){}

function wireCardGalleries(cat){
  const data = CATS[cat];
  const all = data.items.concat(data.editorial || []);
  let n = 0; // galleries so far, for the staggered starts
  const io = typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(es=> es.forEach(e=> e.target._inView = e.isIntersecting), {threshold:.25})
    : null;
  gridPage.querySelectorAll('.card').forEach(card=>{
    const item = all[+card.dataset.i];
    if(!item || item.stack || !item.images || item.images.length < 2) return;
    const thumb = card.querySelector('.card-thumb');
    const fillImg = thumb && thumb.querySelector('.fill-img');
    if(!fillImg || fillImg.tagName !== 'IMG') return;
    const imgs = item.images.map(im => cardImg(item, im.img));
    // two stacked images (.fill-img is position:absolute/inset:0): one fades
    // out while the other fades in, so the thumb is never empty mid-change
    const fillImg2 = fillImg.cloneNode();
    fillImg2.style.opacity = '0';
    fillImg2.loading = 'eager';
    fillImg.after(fillImg2);
    [fillImg, fillImg2].forEach(el=> el.style.transition = `opacity ${GALLERY_FADE}ms ease-in-out`);
    let front = fillImg, back = fillImg2;
    let idx = 0, timer = null, seq = 0;
    // the crossfade starts only once the incoming image has loaded, so a
    // not-yet-downloaded one never fades in blank
    const show = (to, done) => {
      idx = (to + imgs.length) % imgs.length;
      const mine = ++seq; // a newer step (an arrow click) wins over a slower one
      const reveal = () => {
        back.onload = back.onerror = null;
        if(mine !== seq) return;
        if(thumb.classList.contains('contain')) paintBehind(back, thumb);
        back.style.opacity = '1';
        front.style.opacity = '0';
        [front, back] = [back, front];
        if(done) done();
      };
      back.onload = back.onerror = null;
      setImg(back, imgs[idx]);
      if(back.complete && back.naturalWidth) reveal();
      else back.onload = back.onerror = reveal;
    };
    const playing = () => card.isConnected && gridPage.classList.contains('show')
      && !lightbox.classList.contains('show') && !document.hidden && (!io || card._inView);
    const schedule = ms => { clearTimeout(timer); timer = setTimeout(tick, ms); };
    // a little randomness on every wait, so cards drift apart instead of
    // changing in step
    const hold = ()=> GALLERY_FADE + GALLERY_HOLD + Math.random() * 1200;
    let paused = false;
    function tick(){
      if(!card.isConnected) return; // the grid was replaced
      if(!playing()){ paused = true; return schedule(700); }
      // coming back on screen: wait a random moment first, so the cards
      // that appear together don't all change together
      if(paused){ paused = false; return schedule(600 + Math.random() * 3000); }
      show(idx + 1, ()=> schedule(hold()));
    }
    // first change after the hold, then spread out: each card a little
    // later than the one before, with some randomness. Not at all for
    // visitors whose device asks for reduced motion (the arrows still work)
    if(!REDUCED_MOTION) schedule(GALLERY_HOLD + (n++ * 1300) % 5200 + Math.random() * 900);
    if(io) io.observe(card);

    const prevBtn = document.createElement('button');
    prevBtn.className = 'thumb-nav prev'; prevBtn.type = 'button';
    prevBtn.setAttribute('aria-label', 'Previous image'); prevBtn.textContent = '‹';
    const nextBtn = document.createElement('button');
    nextBtn.className = 'thumb-nav next'; nextBtn.type = 'button';
    nextBtn.setAttribute('aria-label', 'Next image'); nextBtn.textContent = '›';
    thumb.append(prevBtn, nextBtn);
    // stepping by hand restarts the wait, so the chosen image gets its full hold
    const byHand = step => e => { e.preventDefault(); e.stopPropagation(); clearTimeout(timer); show(idx + step, ()=> schedule(hold() + GALLERY_HOLD)); };
    prevBtn.addEventListener('click', byHand(-1));
    nextBtn.addEventListener('click', byHand(1));
  });
}

/* ---------------------------------------------------------
   LIGHTBOX (general) — the generic project preview: image + text
   floating directly on the light scrim, no card (see .lb-panel
   comment). "close" sits at the top of the text column; click-outside
   or Escape also dismiss it.
--------------------------------------------------------- */
function openProjectLightbox(cat, item, startIdx){
  const images = item.images && item.images.length ? item.images : [{img:item.img, video:item.video, c:item.c, g:item.g}];
  let idx = (startIdx > 0 && startIdx < images.length) ? startIdx : 0;
  const frameHTML = im => im.video ? loopVideoHTML(im.video, '').replace('<video ', `<video style="--r:${item.cardRatio || 1.5}" `)
    : im.img
    ? `<img ${imgSrc(im.img, '(max-width:600px) 100vw, 60vw')} alt="${altText(cat, item)}">`
    : `<div class="fill-block" style="${bg(im)}; aspect-ratio:1/1;">${glyphHTML(im)}</div>`;

  // shell is built once — only the media crossfades (see .lb-media-layer);
  // text doesn't change between images in the same gallery, so it isn't
  // touched, and nothing about the panel gets thrown away and rebuilt
  // just to change frames the way it used to
  lightbox.innerHTML = `
    <div class="lb-panel">
      <div class="lb-project-media${images.length > 1 ? ' has-multi' : ''}">
        <div class="lb-media-layer lb-media-a">${frameHTML(images[idx])}</div>
        <div class="lb-media-layer lb-media-b" style="opacity:0"></div>
        ${images.length > 1 ? `
          <button class="lb-panel-nav prev" aria-label="Previous image">‹</button>
          <button class="lb-panel-nav next" aria-label="Next image">›</button>
        ` : ''}
      </div>
      <div class="lb-project-text">
        <button class="lb-project-close" aria-label="Close">${UI_TEXT.close}</button>
        <div class="lb-project-body">
          <div class="lb-project-title">${rich(item.t)}</div>
          ${item.d ? `<p class="lb-project-desc">${rich(item.d)}</p>` : ''}
          ${item.note ? `<p class="lb-project-note">${item.note}</p>` : ''}
          ${item.caseStudy ? `<a class="lb-project-link" ${linkAttr(cat + '/' + item.slug + '/')}>${UI_TEXT.readMore}</a>` : ''}
        </div>
      </div>
    </div>
  `;
  let front = lightbox.querySelector('.lb-media-a');
  let back = lightbox.querySelector('.lb-media-b');
  // one frame for the whole gallery, so stepping through images of
  // different shapes doesn't make the preview (and the text beside it)
  // jump; each image is centred inside it, and a small one is enlarged to
  // fill it (at most 2×)
  const media = lightbox.querySelector('.lb-project-media');
  const fitFrame = ()=>{
    const vw = window.innerWidth, vh = window.innerHeight;
    if(vw < 700){ media.classList.remove('boxed'); media.style.width = media.style.height = ''; return; }
    const maxW = Math.min(vw * .74, vw * .95 - 280 - 32), maxH = vh * .94;
    // the frame follows the gallery's landscape and square images; a tall
    // image is shrunk to fit inside it rather than making it taller
    const shapes = images.map(im=>{
      const s = im.img && IMG_SIZES[im.img];
      return {r: im.video ? (item.cardRatio || 1.5) : s ? s[0] / s[1] : 1, nat: s && s[0]};
    });
    const wide = shapes.filter(x=> x.r >= 1);
    let W = 0, H = 0;
    (wide.length ? wide : shapes).forEach(({r, nat})=>{
      let w = Math.min(maxW, maxH * r);
      if(nat) w = Math.min(w, nat * 2);
      W = Math.max(W, w); H = Math.max(H, w / r);
    });
    media.classList.add('boxed');
    media.style.width = Math.round(W) + 'px';
    media.style.height = Math.round(H) + 'px';
  };
  fitFrame();
  lightbox._fit = fitFrame;
  // same load-gating as the grid thumb's crossfade (see wireCardGalleries):
  // reveal only once the incoming image has actually decoded, so a
  // not-yet-cached image never shows as a blank/grey frame mid-crossfade
  let goSeq = 0;
  const step = n => {
    idx = (n + images.length) % images.length;
    const seq = ++goSeq; // a slower, superseded image mustn't swap the layers when it finally loads
    const reveal = () => {
      if(seq !== goSeq) return;
      back.style.opacity = '1';
      front.style.opacity = '0';
      [front, back] = [back, front];
    };
    back.innerHTML = frameHTML(images[idx]);
    const incoming = back.querySelector('img');
    if(incoming && !incoming.complete) incoming.onload = reveal;
    else reveal();
  };
  lightbox.querySelector('.lb-project-close').addEventListener('click', e=>{ e.stopPropagation(); go(cat + '/'); });
  if(images.length > 1){
    lightbox.querySelector('.prev').addEventListener('click', e=>{ e.stopPropagation(); step(idx - 1); });
    lightbox.querySelector('.next').addEventListener('click', e=>{ e.stopPropagation(); step(idx + 1); });
    // clicking the image itself (not just the small arrows) advances too
    lightbox.querySelector('.lb-project-media').addEventListener('click', e=>{
      if(e.target.closest('.lb-panel-nav')) return;
      e.stopPropagation();
      step(idx + 1);
    });
  }

  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
  lightbox.onclick = (e)=>{ if(e.target === lightbox) go(cat + '/'); };
  setLightboxKeys(e=>{ if(e.key === 'Escape') go(cat + '/'); });

  // FLIP: the clicked grid thumbnail's on-screen rect (captured by the
  // click handler before navigating) becomes the animation's start —
  // invert the delta between it and the image's real lightbox position
  // into a transform, then release it so it animates back to identity,
  // i.e. the image visibly flies from its grid spot into the lightbox
  // instead of the lightbox just appearing over it.
  const flight = pendingFlight;
  pendingFlight = null;
  const flyEl = flight && front.firstElementChild;
  if(flyEl){
    requestAnimationFrame(()=>{
      const finalRect = flyEl.getBoundingClientRect();
      if(!finalRect.width || !finalRect.height) return;
      const dx = flight.rect.left - finalRect.left;
      const dy = flight.rect.top - finalRect.top;
      const sx = flight.rect.width / finalRect.width;
      const sy = flight.rect.height / finalRect.height;
      flyEl.style.transformOrigin = 'top left';
      flyEl.style.transition = 'none';
      flyEl.style.transform = `translate(${dx}px,${dy}px) scale(${sx},${sy})`;
      flyEl.getBoundingClientRect(); // force reflow before re-enabling the transition
      requestAnimationFrame(()=>{
        flyEl.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
        flyEl.style.transform = 'none';
        flyEl.addEventListener('transitionend', ()=>{ flyEl.style.transition = ''; flyEl.style.transformOrigin = ''; }, {once:true});
      });
    });
  }
}

/* ---------------------------------------------------------
   PROJECT PAGE (#/category/slug) — one template for every inner
   page: optional hero, intro (name + paragraphs), then the
   caseStudy's sections in order. A project without sections gets
   its images as a single media grid. City Symbol keeps its own
   series layout.
     caseStudy.hero      — top image under the nav, a collage(), or
                           {video | placeholder:'#colour', ratio, id, bg?}
     caseStudy.heroRatio — give the hero its own proportions (image
                           kept whole inside, filled with its edge
                           colour); heroAlign positions it ('center bottom')
     caseStudy.noIntro   — the hero already carries the name and text
     caseStudy.sections  — in page order:
       {type:'media', cols?, span?, ratio?, crop?, pos?, row?, center?,
        large?, items:[{img | video | placeholder:'#colour', id?, ratio?}]}
          cols 2 by default (1 = stacked), span = how many of the 9
          tracks it's centred on (9 for 2 columns, 7 for 1), ratio =
          fixed box (image or video fitted — fill: pad with its edge colour —
          or cropped with crop), row = one
          equal-height row, top = extra space above (px), id = caption
          key for a placeholder
       {type:'statement', italic?}
       {type:'band', bg, flush?, sections:[...]} — full-bleed colour
       collage(...) — cut-outs placed on a coloured band
   All text (intro, statements, captions) comes from site-text.js.
--------------------------------------------------------- */
function backLinkHTML(cat){
  return `<a class="case-back" data-back="${cat}">← ${UI_TEXT.backTo} ${CATS[cat].name}</a>`;
}

// [text](url) → link (no url: underlined text only), **text** → bold,
// *text* → italic, {b} → line break
function rich(s){
  return String(s)
    .replace(/\[([^\]]+)\]\(([^)]*)\)/g, (m, text, url)=> url
      ? `<a class="rich-link" href="${url}" target="_blank" rel="noopener">${text}</a>`
      : `<span class="rich-link">${text}</span>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\{b\}/g, '<br>');
}

function collageHTML(c){
  const one = (size, items, cls)=>{
    const [W, H] = size;
    return `<div class="case-collage${cls}" style="--ratio:${W}/${H}; background:${c.bg}">${
      items.map(([src, x, y, w])=> `<img src="${encodeImgPath(src)}" alt="" style="left:${x / W * 100}%; top:${y / H * 100}%; width:${w / W * 100}%">`).join('')
    }</div>`;
  };
  // optional own arrangement for tablet / mobile (c.tablet / c.mobile)
  if(!c.tablet && !c.mobile) return one(c.size, c.items, '');
  const t = c.tablet || c, m = c.mobile || t;
  return one(c.size, c.items, ' v-desk') + one(t.size, t.items, ' v-tab') + one(m.size, m.items, ' v-mob');
}

function mediaItemHTML(m, sec, alt){
  const r = m.ratio || sec.ratio;
  if(m.placeholder) return `<div class="m-box placeholder" style="--r:${r}; background:${m.placeholder}"><span>${m.id || ''}</span></div>`;
  if(m.youtube) return `<div class="m-box embed" style="--r:${r || 16/9}"><iframe src="https://www.youtube-nocookie.com/embed/${m.youtube}?rel=0" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="video"></iframe></div>`;
  if(m.vimeo) return vimeoLoopHTML(m.vimeo, r || 16/9);
  // video: path without extension — <name>.av1.mp4 (small, used where the
  // browser can play AV1), <name>.mp4 (H.264, everywhere else), <name>.webp
  // (poster); bg = the box colour shown until it loads
  if(m.video){
    const v = encodeImgPath(m.video);
    return `<div class="m-box video" style="--r:${r}${m.bg ? `; background:${m.bg}` : ''}"><video autoplay muted loop playsinline poster="${v}.webp">
      <source src="${v}.av1.mp4" type='video/mp4; codecs="av01.0.09M.08"'>
      <source src="${v}.mp4" type="video/mp4">
    </video></div>`;
  }
  // how wide it shows: its share of the page's 9 tracks, or all of a phone
  const cols = sec.cols || (sec.full ? 1 : 2);
  const sizes = sec.bleed ? '100vw' : `(max-width:600px) 100vw, ${Math.round((sec.span || (cols === 1 ? 7 : 9)) / 9 * 100 / (sec.row ? sec.items.length : cols))}vw`;
  const img = `<img ${imgSrc(m.img, sizes)} alt="${m.caption ? plain(m.caption).replace(/"/g, '&quot;') + ' — ' : ''}${alt}" loading="lazy" decoding="async">`;
  if(!r || sec.row) return img;
  return `<div class="m-box${sec.crop ? ' crop' : ''}${sec.fill ? ' fill' : ''}" style="--r:${r}${sec.pos ? `; --pos:${sec.pos}` : ''}">${img}</div>`;
}

function mediaGridHTML(sec, alt){
  const cols = sec.cols || (sec.full ? 1 : 2);
  const span = sec.span || (cols === 1 ? 7 : 9);
  const cls = ['case-media-grid', sec.row && 'row', sec.center && 'center', sec.large && 'large', sec.bleed && 'bleed'].filter(Boolean).join(' ');
  return `
    <div class="${cls}" style="--cols:${cols}; --span:${span}${sec.top ? `; margin-top:${sec.top}px` : ''}${sec.gap ? `; gap:${sec.gap}` : ''}">
      ${sec.items.map(m=>`
        <figure${sec.row ? ` style="--r:${m.ratio}"` : ''}>
          ${mediaItemHTML(m, sec, alt)}
          ${m.caption ? `<figcaption>${rich(m.caption)}</figcaption>` : ''}
        </figure>
      `).join('')}
    </div>`;
}

function sectionsHTML(sections, alt){
  return sections.map(sec=>{
    const top = sec.top ? ` style="margin-top:${sec.top}px"` : '';
    if(sec.type === 'statement') return sec.text ? `<div class="case-statement${sec.italic ? ' italic' : ''}"${top}><p>${rich(sec.text)}</p></div>` : '';
    if(sec.type === 'band') return `<div class="case-band${sec.flush ? ' flush' : ''}" style="background:${sec.bg}${sec.top ? `; margin-top:${sec.top}px` : ''}">${sectionsHTML(sec.sections, alt)}</div>`;
    if(sec.type === 'collage') return `<div${top}>${collageHTML(sec)}</div>`;
    return mediaGridHTML(sec, alt);
  }).join('');
}

function heroHTML(cs, alt){
  const h = cs && cs.hero;
  if(!h) return '';
  if(h.type === 'collage') return `<div class="case-hero-img collage" style="background:${h.bg}">${collageHTML(h)}</div>`;
  if(h.placeholder || h.video) return `<div class="case-hero-img collage" style="background:${h.placeholder || h.bg || '#fff'}">${mediaItemHTML(h, {}, alt)}</div>`;
  const fixed = cs.heroRatio ? ` fixed${cs.heroCrop ? ' crop' : ''}" style="--ratio:${cs.heroRatio}; --align:${cs.heroAlign || 'center'}` : '';
  return `<div class="case-hero-img${fixed}"><img ${imgSrc(h, '100vw')} alt="${alt}" fetchpriority="high"></div>`;
}

function renderCasePage(cat, item){
  const cs = item.caseStudy;

  if(cs && cs.series){
    casePage.innerHTML = `
      <div class="case-top">
        <h1 class="case-h1">${rich(item.t)}</h1>
        <div class="case-intro-cols">
          <p>${cs.intro}</p>
          ${cs.note ? `<p class="case-note">${cs.note}</p>` : ''}
        </div>
      </div>
      ${cs.series.map(s=>`
        <section class="series" data-series="${s.key}">
          <p class="series-statement">${s.statement}</p>
          <div class="series-grid">
            ${s.symbols.map((sym,i)=>`
              <a class="sym" ${linkAttr(cat + '/' + item.slug + '/' + slugify(sym.n) + '/')} style="transition-delay:${i*28}ms">
                <div class="sym-img" style="background-image:url('${symUrl(cat, item.slug, sym.f)}')"></div>
                <div class="sym-name">${sym.n}</div>
              </a>
            `).join('')}
          </div>
        </section>
      `).join('')}
    `;
  } else {
    const gallery = (item.images && item.images.length) ? item.images : (item.img ? [{img:item.img}] : []);
    const sections = (cs && cs.sections) || (gallery.length ? [{type:'media', items:gallery}] : []);
    const intro = [].concat((cs && cs.intro) || item.d || []);
    casePage.innerHTML = `
      ${heroHTML(cs, altText(cat, item))}
      ${cs && cs.noIntro ? `<h1 class="sr-only">${plain(item.t)}</h1>` : `
      <div class="case-intro">
        <h1>${rich(item.t)}</h1>
        ${intro.length ? `<div class="case-intro-text">${intro.map(p=>`<p>${rich(p)}</p>`).join('')}</div>` : ''}
      </div>`}
      ${sectionsHTML(sections, altText(cat, item))}
    `;
    const pageImgs = [...casePage.querySelectorAll('.case-media-grid img')];
    pageImgs.forEach((img, i)=> img.addEventListener('click', ()=> openImageLightbox(pageImgs.map(im=> im.src), i)));

    // space around an image that doesn't fill its box (the hero's tablet/mobile
    // top, fixed-ratio heroes, fill sections) takes the image's own corner colour
    casePage.querySelectorAll('.case-hero-img:not(.collage) img, .m-box.fill img').forEach(el=>{
      const fill = ()=> paintBehind(el, el.parentNode);
      if(el.complete) fill(); else el.addEventListener('load', fill, {once:true});
    });
  }

  // the way back sits at the end of the page, after the work — the nav
  // already covers getting around from the top
  casePage.insertAdjacentHTML('beforeend', `<div class="case-foot">${backLinkHTML(cat)}</div>`);
  casePage.querySelector('[data-back]').addEventListener('click', ()=>{
    go(cat + '/');
  });

  // reveal symbols on scroll
  if(typeof IntersectionObserver !== 'undefined'){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    casePage.querySelectorAll('.sym, .series-statement').forEach(el=> io.observe(el));
  } else {
    casePage.querySelectorAll('.sym, .series-statement').forEach(el=> el.classList.add('in'));
  }
}

/* ---------------------------------------------------------
   ABOUT (#/about) — layout decoded from about.pdf. Words come
   from the "# about" part of site-text.js; the portrait and client
   logos are set here.
--------------------------------------------------------- */

function renderAbout(){
  const T = ABOUT_TEXT;
  const list = (heading, lines)=> `<h2>${heading}</h2><ul>${lines.map(l=>`<li>${rich(l)}</li>`).join('')}</ul>`;
  casePage.innerHTML = `
    <div class="about">
      <div class="about-photo">${ABOUT.photo
        ? `<img src="${encodeImgPath(ABOUT.photo)}" alt="${SITE.name}, illustrator and designer">`
        : `<div class="m-box placeholder" style="--r:1; background:#e6e6e6"><span>portrait</span></div>`}</div>
      <div class="about-main">
        ${T.lead ? `<p class="about-lead">${rich(T.lead)}</p>` : ''}
        ${T.text.map(p=>`<p>${rich(p)}</p>`).join('')}
        <div class="about-cols">
          <div>${list(T.services, T.service)}</div>
          <div>${list(T.exhibitions, T.exhibition)}</div>
          <div>${list(T.talks, T.talk)}${list(T.teachings, T.teaching)}</div>
          <div>${list(T.contact, T['contact line'])}</div>
        </div>
      </div>
      <div class="about-clients">
        <h2>${T.clients}</h2>
        <div class="about-logos">${(()=>{
          return ABOUT.clients.map(([f, w, name, brk, extra])=>`<img src="${encodeImgPath('images/about/clients/' + f)}" alt="${name}" loading="lazy" style="--pw:${w}${extra ? `; margin-left:calc(${extra} * var(--u))` : ''}">${brk ? '<span class="logo-break"></span>' : ''}`).join('');
        })()}</div>
      </div>
    </div>
  `;
}

/* a film, full player (sound, controls), in the lightbox — opened from
   any looping Vimeo preview's button. Not in the URL, like the image view. */
function openVideoLightbox(id, ratio){
  lightbox.innerHTML = `
    <button class="lb-close" aria-label="Close">${UI_TEXT.close}</button>
    <div class="lb-video" style="--r:${ratio}">
      <iframe src="https://player.vimeo.com/video/${id}?autoplay=1&muted=1&dnt=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="video"></iframe>
    </div>`;
  lightbox.onclick = e=>{ if(!e.target.closest('iframe')) closeVideo(); };
  const closeVideo = ()=>{ lightbox.innerHTML = ''; closeLightbox(); };
  setLightboxKeys(e=>{ if(e.key === 'Escape') closeVideo(); });
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
}
document.addEventListener('click', e=>{
  const b = e.target.closest('.vid-open');
  if(b) openVideoLightbox(b.dataset.vimeo, b.dataset.ratio);
});

/* full-screen view of a project page's images: image only, arrows/keys
   step through the page's images, a click anywhere or Escape closes.
   Not in the URL — it's a zoom, the page itself stays the link. */
function openImageLightbox(srcs, start){
  let idx = start;
  const multi = srcs.length > 1;
  lightbox.innerHTML = `
    ${multi ? `
      <button class="lb-nav prev" aria-label="Previous image">‹</button>
      <button class="lb-nav next" aria-label="Next image">›</button>` : ''}
    <img class="lb-full" alt="">
  `;
  const img = lightbox.querySelector('.lb-full');
  const step = n => { idx = (n + srcs.length) % srcs.length; img.src = srcs[idx]; };
  step(idx);
  if(multi){
    lightbox.querySelector('.prev').onclick = e=>{ e.stopPropagation(); step(idx - 1); };
    lightbox.querySelector('.next').onclick = e=>{ e.stopPropagation(); step(idx + 1); };
  }
  lightbox.onclick = closeLightbox;
  setLightboxKeys(e=>{
    if(e.key === 'Escape') closeLightbox();
    if(multi && e.key === 'ArrowLeft') step(idx - 1);
    if(multi && e.key === 'ArrowRight') step(idx + 1);
  });
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
}

/* ---------------------------------------------------------
   LIGHTBOX — one symbol, deep-linked.
   #/illustration/city-symbol/ymca
   Arrow keys move between symbols and the URL follows, so any
   symbol you are looking at is always the URL you can share.
--------------------------------------------------------- */
const lightbox = document.getElementById('lightbox');

function flatSymbols(item){
  const out = [];
  (item.caseStudy.series||[]).forEach(s=> s.symbols.forEach(sym=> out.push({...sym, series:s})));
  return out;
}

function openLightbox(cat, item, sym){
  const all = flatSymbols(item);
  const idx = all.findIndex(s=> slugify(s.n) === slugify(sym.n));
  const prev = all[(idx-1+all.length)%all.length];
  const next = all[(idx+1)%all.length];

  lightbox.innerHTML = `
    <button class="lb-close" aria-label="Close">${UI_TEXT.close}</button>
    <button class="lb-nav prev" aria-label="Previous">‹</button>
    <button class="lb-nav next" aria-label="Next">›</button>
    <figure class="lb-figure">
      <img src="${symUrl(cat, item.slug, sym.f)}" alt="${sym.n}, ${flatTitle(item.t)} by ${SITE.name}">
      <figcaption>
        <strong>${sym.n}</strong>
        <span style="color:${sym.series.accent}">${sym.series.name}</span>
      </figcaption>
    </figure>
  `;
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';

  const base = cat + '/' + item.slug + '/';
  lightbox.querySelector('.lb-close').onclick = ()=> go(base);
  lightbox.querySelector('.prev').onclick = ()=> go(base + slugify(prev.n) + '/');
  lightbox.querySelector('.next').onclick = ()=> go(base + slugify(next.n) + '/');
  lightbox.onclick = (e)=>{ if(e.target === lightbox) go(base); };

  setLightboxKeys(e=>{
    if(e.key === 'Escape') go(base);
    if(e.key === 'ArrowLeft') go(base + slugify(prev.n) + '/');
    if(e.key === 'ArrowRight') go(base + slugify(next.n) + '/');
  });
}

// one keydown handler at a time: stepping from symbol to symbol reopens
// the lightbox without closing it, and each open used to add another
// listener on top of the last, so every key press ran all of them
function setLightboxKeys(fn){
  if(lightbox._keys) document.removeEventListener('keydown', lightbox._keys);
  lightbox._keys = fn;
  if(fn) document.addEventListener('keydown', fn);
}

window.addEventListener('resize', ()=>{ if(lightbox.classList.contains('show') && lightbox._fit) lightbox._fit(); });

function closeLightbox(){
  lightbox._fit = null;
  lightbox.classList.remove('show');
  setLightboxKeys(null);
  document.body.style.overflow = '';
}

/* ---------------------------------------------------------
   SMOOTH (INERTIA) SCROLL
   This is the part CSS alone can't do: the page keeps drifting
   a little after you stop scrolling, instead of stopping dead.
   Lenis intercepts the wheel/touch input and eases the scroll
   position toward it every frame. Everything above still works
   completely normally without this, it's a feel layer only.
--------------------------------------------------------- */

route();
// fonts and late images can change caption heights: lay the grids out again
function relayoutGrids(){ if(gridPage.classList.contains('show')) gridPage.querySelectorAll('.grid').forEach(layoutMasonry); }
window.addEventListener('load', relayoutGrids);
if(document.fonts) document.fonts.ready.then(relayoutGrids);
