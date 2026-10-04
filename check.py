"""Check generated language pages, local navigation and metadata."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import xml.etree.ElementTree as ET

ROOT=Path(__file__).parent/'public'
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=set(); self.links=[]; self.lang=None; self.fields=[]; self.alt=[]; self.canonical=[]; self.meta=[]; self.cards=0; self.json=[]; self.active=None
    def handle_starttag(self, tag, attributes):
        a=dict(attributes)
        if tag=='html': self.lang=a.get('lang')
        if 'id' in a:
            assert a['id'] not in self.ids, ('duplicate id',a['id'])
            self.ids.add(a['id'])
        if tag=='a': self.links.append(a.get('href',''))
        if tag=='link' and a.get('rel')=='alternate': self.alt.append(a)
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a['href'])
        if tag=='meta': self.meta.append(a)
        if tag=='input' and a.get('name')=='services': self.fields.append(a)
        if tag=='article' and a.get('class')=='service-card': self.cards+=1
        if tag=='script' and a.get('type') in ('application/json','application/ld+json'): self.active=''
    def handle_data(self,data):
        if self.active is not None: self.active+=data
    def handle_endtag(self,tag):
        if tag=='script' and self.active is not None:
            self.json.append(json.loads(self.active)); self.active=None

langs=['en','es','pt','fr','de','it']
for lang in langs:
    path=ROOT/'index.html' if lang=='en' else ROOT/lang/'index.html'
    page=Page(); page.feed(path.read_text())
    assert page.lang==lang
    assert page.cards==3 and len(page.fields)==3
    assert any(x.startswith('https://wa.me/391497073725') for x in page.links)
    assert '€' not in path.read_text() and '$' not in path.read_text()
    assert len(page.alt)==7 and len(page.canonical)==1
    assert len(page.json)==2 and page.json[0]['@type']=='Organization'
    for href in page.links:
        parsed=urlsplit(href)
        if parsed.scheme or parsed.netloc: continue
        target=(path.parent/unquote(parsed.path)).resolve() if parsed.path else path.resolve()
        if target.is_dir(): target/= 'index.html'
        assert target.exists(),('missing local link',path,href)
        if parsed.fragment:
            other=page
            if target!=path.resolve():
                other=Page(); other.feed(target.read_text())
            assert parsed.fragment in other.ids,('missing anchor',href)
    assert any(m.get('property')=='og:image' and m['content'].endswith('.png') for m in page.meta)
    print(lang+': 3 core services, WhatsApp, no prices, translated UI, valid links and metadata')
assert (ROOT/'assets/hero.webp').exists()
assert (ROOT/'assets/social-card.png').exists()
ET.parse(ROOT/'sitemap.xml')
assert len(list(ET.parse(ROOT/'sitemap.xml').getroot()))==6
print('All six pages and deployment assets passed source checks.')
