from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import json,re
import xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
DIST=ROOT/'dist'
class Audit(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=[];self.refs=[];self.sections=Counter();self.h1=0;self.images=[];self.scripts=[];self.current=None
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if 'id' in attrs:self.ids.append(attrs['id'])
        if tag in ['header','section','footer']:self.sections[tag]+=1
        if tag=='h1':self.h1+=1
        if tag=='img':assert 'alt' in attrs;self.images.append(attrs)
        for key in ['src','href']:
            if key in attrs:self.refs.append(attrs[key])
        if tag=='script' and attrs.get('type') in ['application/json','application/ld+json']:self.current=[]
    def handle_data(self,data):
        if self.current is not None:self.current.append(data)
    def handle_endtag(self,tag):
        if tag=='script' and self.current is not None:self.scripts.append(json.loads(''.join(self.current)));self.current=None
page=(DIST/'index.html').read_text()
p=Audit();p.feed(page)
assert p.sections=={'header':1,'section':5,'footer':1},p.sections
assert p.h1==1
assert len(p.ids)==len(set(p.ids)), 'Duplicate ids'
for ref in p.refs:
    if ref.startswith('#'):assert ref[1:] in p.ids,ref
    elif ref.startswith('/'):assert (DIST/ref[1:]).exists(),ref
for asset in re.findall(r'url\([\'\"]?([^\)\'\"]+)',(DIST/'style.css').read_text()):
    if asset.startswith('/'):assert (DIST/asset[1:]).exists(),asset
assert '__PRODUCT_' not in page and '__SITE_' not in page and '__SEO_' not in page
assert len(re.findall('class="product-card"',page))==16
schema=p.scripts[0]
assert len(schema['@graph'])==4
faq=schema['@graph'][3]['mainEntity']
assert len(faq)==6
assert all(q['name'] and q['acceptedAnswer']['text'] for q in faq)
assert len(p.scripts[1])==16
ET.parse(DIST/'sitemap.xml')
assert 'Sitemap:' in (DIST/'robots.txt').read_text()
ET.parse(DIST/'assets/mark.svg')
manifest=json.loads((ROOT/'.openai/hosting.json').read_text())
assert manifest['project_id']=='appgprj_6aca4a734fe08191a949ecc6193e58a9'
assert manifest['static']['directory']=='dist'
# Detect unbalanced blocks in the plain CSS source.
css=(DIST/'style.css').read_text()
assert css.count('{')==css.count('}'), 'CSS block imbalance'
print('Passed: exactly 7 sections, 16 static product cards, headings, internal links, image accessibility, bundled assets, structured data, sitemap and hosting manifest.')
