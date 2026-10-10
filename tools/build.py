from pathlib import Path
import json
import html
import shutil
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
URL='https://playstate-outdoor-sports.biswas-jayita2011.chatgpt.site'
products=json.loads((ROOT/'src/products.json').read_text())
cards=[]
for i,p in enumerate(products):
    cols,rows=(2,2) if p['sheet']=='support' else (4,3)
    x=(p['image']%cols)*100/(cols-1)
    y=(p['image']//cols)*100/(rows-1)
    name=html.escape(p['name'])
    price='₹'+format(p['price'],',')
    cards.append(f'''<article class="product-card" data-product="{p['id']}"{' hidden' if i>=8 else ''}>
        <div class="product-image-wrap"><div class="product-sprite {'support' if p['sheet']=='support' else ''}" style="--pos-x:{x}%;--pos-y:{y}%" role="img" aria-label="{html.escape(p['category'])}"></div><span class="product-tag">{p['tag']}</span><button class="quick-view" data-detail="{p['id']}" aria-label="View {name} details"><svg class="icon" aria-hidden="true"><use href="#icon-arrow"/></svg></button></div>
        <div class="product-bottom"><div class="product-text"><span class="product-sport">{p['sport']}</span><h3 class="product-title"><button data-detail="{p['id']}">{name}</button></h3><p class="product-price">{price}<span>guide price</span></p></div><div class="product-actions"><button class="add-kit" data-add="{p['id']}" aria-label="Add {name} to your kit"><svg class="icon" aria-hidden="true"><use href="#icon-plus"/></svg></button></div></div>
      </article>''')

schema={'@context':'https://schema.org','@graph':[
  {'@type':'Organization','@id':URL+'/#organization','name':'PLAYSTATE','url':URL+'/', 'logo':URL+'/assets/mark.svg','description':'An outdoor sports equipment store concept for the love of the game.'},
  {'@type':'WebSite','@id':URL+'/#website','name':'PLAYSTATE','url':URL+'/', 'publisher':{'@id':URL+'/#organization'},'inLanguage':'en-IN'},
  {'@type':'ItemList','name':'PLAYSTATE outdoor sports essentials concept collection','numberOfItems':len(products),'itemListElement':[{'@type':'ListItem','position':i+1,'name':p['name'],'description':p['description']} for i,p in enumerate(products)]}
]}
template=(ROOT/'src/index.html').read_text()
template=template.replace('®','↗').replace('__SITE_URL__',URL).replace('__PRODUCT_CARDS__','\n'.join(cards)).replace('__PRODUCT_DATA__',json.dumps(products,ensure_ascii=False).replace('</','<\\/'))
# Keep FAQ structured content exactly aligned with the visible buying guide.
from html.parser import HTMLParser
class GuideParser(HTMLParser):
    def __init__(self):super().__init__();self.in_detail=False;self.in_summary=False;self.in_p=False;self.q='';self.a='';self.faq=[]
    def handle_starttag(self,tag,attrs):
        if tag=='details':self.in_detail=True;self.q='';self.a=''
        elif self.in_detail and tag=='summary':self.in_summary=True
        elif self.in_detail and tag=='p':self.in_p=True
    def handle_endtag(self,tag):
        if tag=='summary':self.in_summary=False
        elif tag=='p':self.in_p=False
        elif tag=='details':self.faq.append({'@type':'Question','name':self.q.strip(),'acceptedAnswer':{'@type':'Answer','text':self.a.strip()}});self.in_detail=False
    def handle_data(self,data):
        if self.in_summary:self.q+=data
        elif self.in_p and self.in_detail:self.a+=data
parser=GuideParser();parser.feed(template)
schema['@graph'].append({'@type':'FAQPage','mainEntity':parser.faq})
template=template.replace('__SEO_SCHEMA__',json.dumps(schema,ensure_ascii=False).replace('</','<\\/'))
(ROOT/'dist/index.html').write_text(template)
for f in ['style.css','app.js','core.mjs']:shutil.copy2(ROOT/'src'/f,ROOT/'dist'/f)
manifest=json.loads((ROOT/'.openai/hosting.json').read_text())
manifest['static']={'directory':'dist'}
(ROOT/'.openai/hosting.json').write_text(json.dumps(manifest,indent=2)+'\n')
(ROOT/'dist/robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {URL}/sitemap.xml\n')
xml=f'''<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>{URL}/</loc></url></urlset>\n'''
(ROOT/'dist/sitemap.xml').write_text(xml)
ET.fromstring(xml)
print(f'Built PLAYSTATE: 7 sections, {len(products)} products, {len(parser.faq)} guide questions.')
