#!/usr/bin/env python3
"""Write a real page file for every address on the site, for search engines
and shared links. Run it after changing site-text.js or adding a project:

  python3 tools/build.py

The site itself still runs from site.js; each page written here is index.html
with that page's own title, description, share picture and a plain copy of
its words and images (what a search engine reads before any script runs).
It writes:
  illustration/ brand/ science/ animation/ about/  one folder per page, each
      with an index.html (these folders are rebuilt from scratch every run —
      don't keep anything else in them)
  index.html     only the part between <!--seo--> and <!--/seo--> is updated
  404.html       any address without a page: runs the site, which shows it
                 if it can (e.g. a project added since the last build)
  sitemap.xml, robots.txt
  images/share/  a .jpg of each page's share picture (some apps won't show .webp)
The site's data is read by running site.js's data part with macOS's built-in
JavaScript (osascript), so nothing needs installing — except Pillow for the
share pictures (pip install pillow); without it pages share their .webp.
"""
import html, json, os, re, shutil, subprocess, sys, tempfile
from urllib.parse import quote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MARK = "/* === end of the site's data: tools/build.py reads site.js up to here === */"
PAGE_DIRS = ['illustration', 'brand', 'science', 'animation', 'about']

def read(p): return open(os.path.join(ROOT, p), encoding='utf-8').read()

# ---------- 1. the site's data, via JavaScriptCore -------------------------
DUMP = r'''
(function(){
  const pages = [];
  const catPages = [];
  const imgsOf = (item)=>{
    const out = [], add = p=> p && typeof p === 'string' && !out.includes(p) && out.push(p);
    add(item.img); (item.images || []).forEach(i=> add(i.img));
    const cs = item.caseStudy || {};
    if(typeof cs.hero === 'string') add(cs.hero);
    const walk = list=> (list || []).forEach(s=>{
      if(s.type === 'band') walk(s.sections);
      (s.items || []).forEach(i=> Array.isArray(i) ? add(i[0]) : add(i.img));
    });
    walk(cs.sections);
    return out;
  };
  const textOf = (item)=>{
    const cs = item.caseStudy || {};
    const paras = [].concat(cs.intro || item.d || []);
    const walk = list=> (list || []).forEach(s=>{
      if(s.type === 'band') walk(s.sections);
      if(s.type === 'statement' && s.text) paras.push(s.text);
    });
    walk(cs.sections);
    return paras.map(plain);
  };
  pages.push(Object.assign(pageMeta(null), {kind:'home'}));
  pages.push(Object.assign(pageMeta('about'), {kind:'about', h1: ABOUT_TEXT.bioTitle || 'Bio',
    paras: [ABOUT_TEXT.lead].concat(ABOUT_TEXT.text).filter(Boolean).map(plain),
    lists: [[ABOUT_TEXT.services, ABOUT_TEXT.service], [ABOUT_TEXT.exhibitions, ABOUT_TEXT.exhibition],
            [ABOUT_TEXT.talks, ABOUT_TEXT.talk], [ABOUT_TEXT.teachings, ABOUT_TEXT.teaching]].map(([h, l])=> [plain(h), l.map(plain)]),
    images: [[ABOUT.photo, SITE.name + ', illustrator and designer']]}));
  HEADLINE_CATS.forEach(cat=>{
    const c = CATS[cat];
    const all = c.items.concat(c.editorial || []);
    const hasPages = c.layout !== 'list';
    pages.push(Object.assign(pageMeta(cat), {kind:'category', cat, h1: c.name,
      paras: [c.description, c.heDescription].filter(Boolean),
      links: all.map(it=> ({t: flatTitle(it.t), he: it.he || '', d: it.d ? plain(it.d) : '',
        path: hasPages ? `${cat}/${it.slug}/` : '', img: it.img || '', alt: it.img ? altText(cat, it).replace(/&quot;/g, '"') : ''}))}));
    if(!hasPages) return;
    all.forEach(it=>{
      const base = {cat, catName: c.name, catPath: cat + '/', slug: it.slug, h1: flatTitle(it.t), he: it.he || ''};
      pages.push(Object.assign(pageMeta(cat, it), base, {kind:'project', paras: textOf(it),
        images: imgsOf(it).map(p=> [p, altText(cat, it).replace(/&quot;/g, '"')])}));
      const cs = it.caseStudy;
      if(cs && cs.series) cs.series.forEach(s=> s.symbols.forEach(sym=>{
        const sub = slugify(sym.n);
        pages.push(Object.assign(pageMeta(cat, it, sub), base, {kind:'symbol', h1: sym.n, parent: flatTitle(it.t),
          parentPath: `${cat}/${it.slug}/`, paras: [s.name + '. ' + plain(s.statement)],
          images: [[symUrl(cat, it.slug, sym.f), `${sym.n}, ${flatTitle(it.t)} by ${SITE.name}`]]}));
      }));
    });
  });
  return JSON.stringify({site: SITE, pages});
})()
'''

def site_data():
    js = read('site.js')
    if MARK not in js: sys.exit('site.js: end-of-data marker missing')
    prog = ('var window = {}; var __el = {querySelector:function(){return null;}}; var document = {title:"", querySelector:function(){return __el;},'
            ' querySelectorAll:function(){return [__el, __el];}};\n'
            + read('site-text.js') + '\n' + js[:js.index(MARK)] + '\n' + DUMP)
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as f:
        f.write(prog); tmp = f.name
    try:
        out = subprocess.run(['osascript', '-l', 'JavaScript', tmp], capture_output=True, text=True)
    finally:
        os.remove(tmp)
    if out.returncode: sys.exit('reading the site data failed:\n' + out.stderr)
    return json.loads(out.stdout)

# ---------- 2. share pictures -----------------------------------------------
def share_jpg(path):
    """images/share/<name>.jpg, 1200px wide, for apps that don't show .webp"""
    try:
        from PIL import Image
    except ImportError:
        return path
    src = os.path.join(ROOT, path)
    if not os.path.exists(src): return path
    name = re.sub(r'[^a-z0-9]+', '-', os.path.splitext(path[len('images/'):])[0].lower()).strip('-') + '.jpg'
    out = os.path.join(ROOT, 'images', 'share', name)
    if not os.path.exists(out) or os.path.getmtime(out) < os.path.getmtime(src):
        os.makedirs(os.path.dirname(out), exist_ok=True)
        im = Image.open(src)
        im.seek(0)
        im = im.convert('RGBA')
        bgc = Image.new('RGBA', im.size, (255, 255, 255, 255)); bgc.alpha_composite(im); im = bgc.convert('RGB')
        if im.width > 1200: im = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
        im.save(out, 'JPEG', quality=82, optimize=True, progressive=True)
    return 'images/share/' + name

# ---------- 3. the pages ---------------------------------------------------
e = lambda s: html.escape(str(s or ''), quote=True)
def url_of(site_url, path): return site_url + quote(path, safe='/')

def head_html(page, site, share):
    u = site['url']
    canon = url_of(u, page['path'])
    img = url_of(u, share) if share else ''
    person = {'@type': 'Person', '@id': u + '#itai', 'name': site['name'], 'alternateName': site['he'],
              'url': u, 'jobTitle': ['Illustrator', 'Graphic designer', 'Art director'],
              'address': {'@type': 'PostalAddress', 'addressLocality': 'Tel Aviv', 'addressCountry': 'IL'},
              'knowsLanguage': ['en', 'he'], 'sameAs': ['https://www.instagram.com/itairaveh/'],
              'image': url_of(u, 'images/about/portrait.webp')}
    graph = [person]
    if page['kind'] == 'home':
        graph.append({'@type': 'WebSite', '@id': u + '#site', 'url': u, 'name': site['name'],
                      'alternateName': site['he'], 'inLanguage': 'en', 'publisher': {'@id': u + '#itai'}})
    if page['kind'] in ('project', 'symbol'):
        graph.append({'@type': 'CreativeWork', 'name': page['h1'], **({'alternateName': page['he']} if page.get('he') else {}),
                      'description': page['description'], 'url': canon, 'image': img,
                      'creator': {'@id': u + '#itai'}, 'genre': page['catName']})
        crumbs = [('Itai Raveh', u), (page['catName'], url_of(u, page['catPath']))]
        if page['kind'] == 'symbol': crumbs.append((page['parent'], url_of(u, page['parentPath'])))
        crumbs.append((page['h1'], canon))
        graph.append({'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': l} for i, (n, l) in enumerate(crumbs)]})
    ld = json.dumps({'@context': 'https://schema.org', '@graph': graph}, ensure_ascii=False).replace('</', '<\\/')
    return '\n'.join([
        f'<title>{e(page["title"])}</title>',
        f'<meta name="description" content="{e(page["description"])}">',
        f'<link rel="canonical" href="{e(canon)}">',
        '<meta property="og:type" content="' + ('website' if page['kind'] == 'home' else 'article') + '">',
        f'<meta property="og:site_name" content="{e(site["name"])}">',
        f'<meta property="og:title" content="{e(page["title"])}">',
        f'<meta property="og:description" content="{e(page["description"])}">',
        f'<meta property="og:url" content="{e(canon)}">',
        *([f'<meta property="og:image" content="{e(img)}">'] if img else []),
        '<meta property="og:locale" content="en_US">',
        '<meta name="twitter:card" content="summary_large_image">',
        f'<script type="application/ld+json">{ld}</script>',
    ])

def body_html(page, site):
    """a plain copy of the page's words and links, replaced by the site's own
    rendering as soon as its script runs (no images: a browser would download
    them twice — search engines get those from the sitemap)"""
    k = page['kind']
    he = lambda s: f' <span lang="he" dir="rtl">{e(s)}</span>' if s else ''
    if k == 'category':
        items = ''.join(
            f'<li>{"<a href=" + chr(34) + e(l["path"]) + chr(34) + ">" if l["path"] else ""}'
            f'<strong>{e(l["t"])}</strong>{he(l["he"])}'
            f'{"</a>" if l["path"] else ""}{" <span>" + e(l["d"]) + "</span>" if l["d"] else ""}</li>'
            for l in page['links'])
        return ('gridPage', f'<h1>{e(page["h1"])}</h1>' + ''.join(f'<p>{e(p)}</p>' for p in page['paras']) + f'<ul>{items}</ul>')
    if k in ('project', 'symbol', 'about'):
        out = f'<h1>{e(page["h1"])}{he(page.get("he"))}</h1>'
        if k == 'symbol': out += f'<p><a href="{e(page["parentPath"])}">{e(page["parent"])}</a></p>'
        out += ''.join(f'<p>{e(p)}</p>' for p in page['paras'])
        for h, lines in page.get('lists', []):
            if lines: out += f'<h2>{e(h)}</h2><ul>' + ''.join(f'<li>{e(l)}</li>' for l in lines) + '</ul>'
        if k != 'about': out += f'<p><a href="{e(page["catPath"])}">{e(page["catName"])}</a></p>'
        return ('casePage', out)
    return None

def fill(shell, page, site, share, base):
    s = re.sub(r'<!--seo-->.*?<!--/seo-->', lambda m: '<!--seo-->\n' + head_html(page, site, share) + '\n<!--/seo-->', shell, flags=re.S)
    s = s.replace('<base href="./">', f'<base href="{base}">')
    body = body_html(page, site)
    if body:
        sid, content = body
        s = s.replace(f'id="{sid}"></section>', f'id="{sid}">{content}</section>')
        # not the homepage: keep its headline hidden until the site takes over
        s = s.replace('<section class="hero" id="hero">', '<section class="hero" id="hero" style="display:none">')
    return s

def main():
    data = site_data()
    site, pages = data['site'], data['pages']
    if not site.get('url'): sys.exit('site-text.js: set "site address:" under # general')
    shell = read('index.html')
    if '<!--seo-->' not in shell: sys.exit('index.html: <!--seo--> markers missing')
    # the folders are all generated: start clean
    for d in PAGE_DIRS:
        shutil.rmtree(os.path.join(ROOT, d), ignore_errors=True)
    urls = []
    for page in pages:
        share = share_jpg(page['image']) if page.get('image') else ''
        depth = page['path'].count('/')
        out = fill(shell, page, site, share, './' if depth == 0 else '../' * depth)
        if page['kind'] == 'home':
            open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(out)
        else:
            d = os.path.join(ROOT, page['path'])
            os.makedirs(d, exist_ok=True)
            open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(out)
        urls.append((url_of(site['url'], page['path']), [url_of(site['url'], p) for p, _ in page.get('images', [])]
                     or ([url_of(site['url'], page['image'])] if page.get('image') else [])))
    # 404: the site, rooted absolutely (the address can be any depth), not indexed
    root_path = re.sub(r'^https?://[^/]+', '', site['url'])
    nf = fill(shell, {'kind': '404', 'path': '', 'title': site['title'], 'description': site['description']}, site, '', root_path)
    nf = nf.replace('<!--/seo-->', '<meta name="robots" content="noindex">\n<!--/seo-->')
    open(os.path.join(ROOT, '404.html'), 'w', encoding='utf-8').write(nf)
    # sitemap + robots
    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">']
    for loc, imgs in urls:
        sm.append(f'  <url><loc>{e(loc)}</loc>' + ''.join(f'<image:image><image:loc>{e(i)}</image:loc></image:image>' for i in imgs[:1000]) + '</url>')
    sm.append('</urlset>')
    open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8').write('\n'.join(sm) + '\n')
    open(os.path.join(ROOT, 'robots.txt'), 'w').write(f'User-agent: *\nAllow: /\n\nSitemap: {site["url"]}sitemap.xml\n')
    print(f'{len(pages)} pages written for {site["url"]}')

if __name__ == '__main__':
    main()
