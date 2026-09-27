#!/usr/bin/env python3
"""Shrink the site's images for the web. Safe to run again after adding images.

  python3 tools/optimize_images.py            (needs Pillow: pip install pillow)

What it does, under images/:
  - every .png / .jpg / .jpeg becomes a .webp (transparency kept), at most
    2400px wide; the original is deleted (keep a copy elsewhere first) and
    every reference to it in index.html, site.js and site-text.js is switched
    to the new name
  - an existing .webp wider than 2400px, or very heavy, is re-encoded smaller
  - every image wider than 1350px also gets a 1200px copy (enough for a phone screen), <name>.md.webp,
    which phones and small grid cards load instead of the full one
  - writes images/sizes.js: each image's width and height (the grids size
    their cards from it) and the width of its .md copy (0 = none)
GIFs, videos and images/share (tools/build.py's) are left alone.
"""
import json, os, re, sys
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES = os.path.join(ROOT, 'images')
MAX_W, MD_W, MD_FROM = 2400, 1200, 1350
QUALITY = 90  # high enough to keep the grain and print texture of the artwork
TEXT_FILES = ['index.html', 'site.js', 'site-text.js']
# images/share holds tools/build.py's .jpg share pictures, which stay .jpg
SKIP = lambda d: os.path.relpath(d, IMAGES).split(os.sep)[0] == 'share'

def has_alpha(im):
    if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
        a = im.convert('RGBA').getchannel('A')
        return a.getextrema()[0] < 255
    return False

def prepared(path):
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    im = im.convert('RGBA' if has_alpha(im) else 'RGB')
    if im.width > MAX_W:
        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
    return im

def save_webp(im, out, try_lossless=False):
    im.save(out, 'WEBP', quality=QUALITY, method=6)
    if try_lossless:  # flat artwork (most PNGs): exact copy, unless that's much bigger
        tmp = out + '.tmp'
        im.save(tmp, 'WEBP', lossless=True, method=6)
        if os.path.getsize(tmp) <= 1.5 * os.path.getsize(out): os.replace(tmp, out)
        else: os.remove(tmp)

def main():
    renamed = {}  # old file name -> new, per folder-relative path
    before = after = 0
    for dirpath, _, files in os.walk(IMAGES):
        if SKIP(dirpath): continue
        for f in sorted(files):
            p = os.path.join(dirpath, f)
            stem, ext = os.path.splitext(f)
            ext = ext.lower()
            if ext in ('.png', '.jpg', '.jpeg'):
                out = os.path.join(dirpath, stem + '.webp')
                if os.path.exists(out): print('skip, exists:', out); continue
                b = os.path.getsize(p)
                save_webp(prepared(p), out, try_lossless=(ext == '.png'))
                before += b; after += os.path.getsize(out)
                os.remove(p)
                renamed[os.path.relpath(p, ROOT)] = os.path.relpath(out, ROOT)
            elif ext == '.webp' and not stem.endswith('.md'):
                im = Image.open(p)
                b = os.path.getsize(p)
                if im.width > MAX_W or b > .3 * im.width * im.height and b > 150_000:
                    tmp = p + '.new.webp'
                    save_webp(prepared(p), tmp)
                    if im.width > MAX_W or os.path.getsize(tmp) < b * .8:
                        before += b; after += os.path.getsize(tmp); os.replace(tmp, p)
                    else: os.remove(tmp)

    # .md copies + the size list
    sizes = {}
    for dirpath, _, files in os.walk(IMAGES):
        if SKIP(dirpath): continue
        for f in sorted(files):
            stem, ext = os.path.splitext(f)
            if ext.lower() not in ('.webp', '.gif') or stem.endswith('.md'): continue
            p = os.path.join(dirpath, f)
            im = Image.open(p)
            w, h = im.size
            md = 0
            if ext.lower() == '.webp' and w > MD_FROM and not getattr(im, 'is_animated', False):
                mdp = os.path.join(dirpath, stem + '.md.webp')
                if not os.path.exists(mdp) or os.path.getmtime(mdp) < os.path.getmtime(p):
                    save_webp(prepared(p).resize((MD_W, round(h * MD_W / w)), Image.LANCZOS), mdp)
                md = MD_W
            sizes[os.path.relpath(p, ROOT)] = [w, h, md]
    with open(os.path.join(IMAGES, 'sizes.js'), 'w') as fh:
        fh.write('// written by tools/optimize_images.py: [width, height, width of its .md.webp copy or 0]\n')
        fh.write('window.IMG_SIZES = {\n' + ',\n'.join(json.dumps(k, ensure_ascii=False) + ':' + json.dumps(v) for k, v in sizes.items()) + '\n};\n')

    # switch references to the converted files. Names are matched by their
    # last path part only where that is unambiguous in its folder, which also
    # covers bare names (collage parts, captions, galleryRange extensions)
    if renamed:
        for tf in TEXT_FILES:
            path = os.path.join(ROOT, tf)
            if not os.path.exists(path): continue
            src = open(path, encoding='utf-8').read()
            new = re.sub(r'\.(png|jpe?g)(?=[\'"`:])', '.webp', src, flags=re.I)
            new = re.sub(r"(galleryRange\([^)]*?,\s*)'(png|jpe?g)'", r"\1'webp'", new)
            if new != src:
                open(path, 'w', encoding='utf-8').write(new)
                print('updated references in', tf)
    print(f'converted {len(renamed)} files; {before/1e6:.1f} MB -> {after/1e6:.1f} MB on the files touched')

if __name__ == '__main__':
    main()
