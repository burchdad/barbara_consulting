"""Build the public SEWP information PDF from the shared web content.

Requires reportlab and pypdf. Set SEWP_FONT_DIR to a directory containing
arial.ttf and arialbd.ttf (defaults to the Windows Fonts directory).
Tagged output is not a claim of PDF/UA or Section 508 conformance.
"""
from pathlib import Path
from collections import defaultdict
from html import escape
import json
import os
import re
import shutil

from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Flowable, PageBreak
from pypdf import PdfReader, PdfWriter
from pypdf.generic import DictionaryObject as D, ArrayObject as A, NameObject as N, NumberObject as I, TextStringObject as T, BooleanObject as B

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'lib/content/sewp.json').read_text(encoding='utf-8'))
OUTPUT = ROOT / 'output/pdf/sewp-vi.pdf'
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
TMP = ROOT / 'tmp/pdfs'
TMP.mkdir(parents=True, exist_ok=True)
font_dir = Path(os.environ.get('SEWP_FONT_DIR', 'C:/Windows/Fonts'))
pdfmetrics.registerFont(TTFont('Arial', str(font_dir / 'arial.ttf')))
pdfmetrics.registerFont(TTFont('Arial-Bold', str(font_dir / 'arialbd.ttf')))
pdfmetrics.registerFontFamily('Arial', normal='Arial', bold='Arial-Bold')
styles = {
    'H1': ParagraphStyle('title', fontName='Arial-Bold', fontSize=24, leading=29, textColor=HexColor('#19194e'), spaceAfter=17),
    'H2': ParagraphStyle('heading', fontName='Arial-Bold', fontSize=15, leading=19, textColor=HexColor('#19194e'), spaceBefore=12, spaceAfter=9, keepWithNext=True),
    'H3': ParagraphStyle('subheading', fontName='Arial-Bold', fontSize=11, leading=15, textColor=HexColor('#19194e'), spaceBefore=9, spaceAfter=5, keepWithNext=True),
    'P': ParagraphStyle('body', fontName='Arial', fontSize=10, leading=14, textColor=HexColor('#272727'), spaceAfter=8),
    'Link': ParagraphStyle('link', fontName='Arial', fontSize=10, leading=14, textColor=HexColor('#16566a'), spaceAfter=6),
}
records = []
page_ids = defaultdict(int)

class TaggedParagraph(Paragraph):
    def __init__(self, text, style, role='P', list_item=None, **kwargs):
        super().__init__(text, style, **kwargs)
        self.role = role
        self.list_item = list_item

    def split(self, availWidth, availHeight):
        parts = super().split(availWidth, availHeight)
        for part in parts:
            part.role = self.role
            part.list_item = self.list_item
        return parts

    def draw(self):
        page = self.canv.getPageNumber() - 1
        mcid = page_ids[page]
        page_ids[page] += 1
        records.append((page, mcid, self.role, self.list_item))
        self.canv.addLiteral(f'/{self.role} <</MCID {mcid}>> BDC')
        super().draw()
        self.canv.addLiteral('EMC')

class TaggedListItem(Flowable):
    """Keep a numbered label and body together, each with its own marked content."""
    def __init__(self, number, text, list_id):
        super().__init__()
        key = (list_id, number)
        self.label = TaggedParagraph(f'{number}.', styles['P'], 'Lbl', key)
        self.body = TaggedParagraph(escape(text), styles['P'], 'LBody', key)
        self.spaceAfter = 8

    def wrap(self, availWidth, availHeight):
        self.label_height = self.label.wrap(18, availHeight)[1]
        self.body_height = self.body.wrap(availWidth - 18, availHeight)[1]
        self.width, self.height = availWidth, max(self.label_height, self.body_height)
        return self.width, self.height

    def draw(self):
        self.label.drawOn(self.canv, 0, self.height - self.label_height)
        self.body.drawOn(self.canv, 18, self.height - self.body_height)

story = []
def para(text, role='P', markup=False):
    story.append(TaggedParagraph(text if markup else escape(text), styles[role], role))

def link(label, url):
    para(f'<link href="{escape(url, quote=True)}" color="#16566a"><u>{escape(label)}</u></link>', 'Link', True)

def footer(canvas, doc):
    canvas.setTitle('NASA SEWP VI | Gray Matters Technology Services')
    canvas.setAuthor('Gray Matters Technology Services, LLC')
    canvas.addLiteral('/Artifact BMC')
    canvas.setFillColor(HexColor('#ffdf00'))
    canvas.rect(42, 748, 528, 6, stroke=0, fill=1)
    canvas.setFont('Arial', 8)
    canvas.setFillColor(HexColor('#444444'))
    canvas.drawString(42, 25, 'Gray Matters Technology Services, LLC | NASA SEWP VI')
    canvas.drawRightString(570, 25, f'{doc.page}')
    canvas.addLiteral('EMC')

para('NASA SEWP VI', 'H1')
para('Gray Matters Technology Services, LLC | Category C', 'H2')
para('WOSB / SDVOSB Certified | CMMI Level 3 Dev & ISO 9001 Certified')
para('Understanding the NASA SEWP VI contract', 'H2')
for text in DATA['overview']:
    para(text)
para('GMTS contract information', 'H2')
para(DATA['multiAward'])
for label, value in [
    ('SEWP VI contract number', DATA['contractNumber']), ('Awarded category', 'C'),
    ('Contract type', 'Multiple-award GWAC'), ('Period of performance', 'Nov 2026 - Oct 2036'),
    ('SEWP surcharge', '0.34%'), ('UEI', 'DRJDASA3SJJ3')
]:
    para(f'<b>{label}:</b> {value}', markup=True)
para('Category C service offerings', 'H2')
for text in [
    'Custom software development, database services, and Digital Modernization.',
    'Infrastructure and operations: network services, telecommunications, and help desk.',
    'Cybersecurity systems, cloud support, and innovative emerging technology services.',
    'Data processing, analytics, and AI-enabled solutions.',
    'IT consulting, program and project management, and digital multimedia.',
    'Technical communications and specialized training.'
]:
    para(text)

story.append(PageBreak())
para('Quotes, support, and order issues', 'H2')
for item in DATA['support']:
    para(item['title'], 'H3')
    para(item['text'])
para('SEWP VI sales and support contacts', 'H2')
for c in DATA['contacts']:
    para(c['name'] + ' | ' + c['role'], 'H3')
    link(c['email'], 'mailto:' + c['email'])
    link(c['phone'], 'tel:' + c['tel'])
para('Ordering guide and resources', 'H2')
para('The ordering guide includes the SEWP overview, fair opportunity, sales and support contacts, scope categories, and ordering process.')
link('Read the SEWP VI ordering guide', 'https://www.graymatterstech.com/sewp-ordering-guide')
link('Gray Matters Technology Services home page', 'https://www.graymatterstech.com/')
para('How to contact SEWP', 'H3')
para('SEWP PMO hours: Monday-Friday, 7:30 AM-6 PM ET')
link('help@sewp.nasa.gov', 'mailto:help@sewp.nasa.gov')
link('Customer Help Desk: (301) 286-1478', 'tel:+13012861478')
link('NASA SEWP home page', 'https://www.sewp.nasa.gov/')

story.append(PageBreak())
para('A.1.13 Fair opportunity and requests for quotes', 'H2')
for item_index, item in enumerate(DATA['fairOpportunity']):
    if isinstance(item['text'], list):
        for index, text in enumerate(item['text'], 1):
            story.append(TaggedListItem(index, text, item_index))
    else:
        para(item['text'])

raw = TMP / 'sewp-vi-untagged.pdf'
SimpleDocTemplate(str(raw), pagesize=(612, 792), leftMargin=42, rightMargin=42,
                  topMargin=48, bottomMargin=45).build(story, onFirstPage=footer, onLaterPages=footer)
writer = PdfWriter(clone_from=raw)
tree = D({N('/Type'): N('/StructTreeRoot')})
tree_ref = writer._add_object(tree)
document = D({N('/Type'): N('/StructElem'), N('/S'): N('/Document'), N('/P'): tree_ref, N('/K'): A()})
document_ref = writer._add_object(document)
tree[N('/K')] = document_ref
parents = defaultdict(list)
link_elements = defaultdict(list)
lists = {}
list_items = {}
for page_index, mcid, role, list_item in records:
    page = writer.pages[page_index]
    parent_ref = document_ref
    if list_item is not None:
        list_id, number = list_item
        if list_id not in lists:
            group = D({N('/Type'): N('/StructElem'), N('/S'): N('/L'), N('/P'): document_ref,
                       N('/K'): A(), N('/A'): D({N('/O'): N('/List'), N('/ListNumbering'): N('/Decimal')})})
            lists[list_id] = writer._add_object(group)
            document[N('/K')].append(lists[list_id])
        if list_item not in list_items:
            entry = D({N('/Type'): N('/StructElem'), N('/S'): N('/LI'), N('/P'): lists[list_id], N('/K'): A()})
            list_items[list_item] = writer._add_object(entry)
            lists[list_id].get_object()[N('/K')].append(list_items[list_item])
        parent_ref = list_items[list_item]
    element = D({N('/Type'): N('/StructElem'), N('/S'): N('/'+role), N('/P'): parent_ref,
                 N('/Pg'): page.indirect_reference, N('/K'): I(mcid)})
    ref = writer._add_object(element)
    parent_ref.get_object()[N('/K')].append(ref)
    parents[page_index].append(ref)
    if role == 'Link':
        link_elements[page_index].append(ref)
parent_entries = {}
annotation_key = len(writer.pages)
for index, page in enumerate(writer.pages):
    page[N('/StructParents')] = I(index)
    page[N('/Tabs')] = N('/S')
    parent_entries[index] = A(parents[index])
    annotations = page.get('/Annots', [])
    # Every link in this document has its own single-line Link structure element.
    if len(annotations) != len(link_elements[index]):
        raise ValueError('Link wrapping changed; review annotation-to-structure mapping')
    for annotation, element_ref in zip(annotations, link_elements[index]):
        element = element_ref.get_object()
        annotation.get_object()[N('/StructParent')] = I(annotation_key)
        annotation.get_object()[N('/Contents')] = T(annotation.get_object()['/A']['/URI'])
        element[N('/K')] = A([element[N('/K')], D({N('/Type'): N('/OBJR'), N('/Obj'): annotation, N('/Pg'): page.indirect_reference})])
        parent_entries[annotation_key] = element_ref
        annotation_key += 1
nums = A()
for key, value in sorted(parent_entries.items()):
    nums.extend([I(key), value])
tree[N('/ParentTree')] = writer._add_object(D({N('/Nums'): nums}))
tree[N('/ParentTreeNextKey')] = I(annotation_key)
writer.root_object[N('/StructTreeRoot')] = tree_ref
writer.root_object[N('/MarkInfo')] = D({N('/Marked'): B(True)})
writer.root_object[N('/Lang')] = T('en-US')
writer.root_object[N('/ViewerPreferences')] = D({N('/DisplayDocTitle'): B(True)})
writer.write(OUTPUT)

# Verify generated content, document metadata, link destinations and logical order.
reader = PdfReader(OUTPUT)
text = re.sub(r'\s+', ' ', ' '.join(page.extract_text() for page in reader.pages))
for required in [DATA['contractNumber'], *DATA['overview'], *(item['text'] for item in DATA['support'])]:
    assert re.sub(r'\s+', ' ', required) in text, required
for stale in ['80TECH26DXXXX', 'TBD', 'acqu325isition', 'Digal', 'Audio-Visual(ITC/AV)']:
    assert stale not in text, stale
assert reader.trailer['/Root']['/Lang'] == 'en-US'
assert reader.metadata.title
root_children = reader.trailer['/Root']['/StructTreeRoot']['/K']['/K']
tagged_lists = [child.get_object() for child in root_children if child.get_object()['/S'] == '/L']
expected_lists = [item['text'] for item in DATA['fairOpportunity'] if isinstance(item['text'], list)]
assert len(tagged_lists) == len(expected_lists)
for group, expected in zip(tagged_lists, expected_lists):
    assert group['/A']['/ListNumbering'] == '/Decimal'
    assert len(group['/K']) == len(expected)
    for entry in group['/K']:
        assert entry.get_object()['/S'] == '/LI'
        assert [child.get_object()['/S'] for child in entry.get_object()['/K']] == ['/Lbl', '/LBody']
# Each marked content ID must map to the exact leaf structure element on its page.
parent_nums = reader.trailer['/Root']['/StructTreeRoot']['/ParentTree']['/Nums']
parent_map = dict(zip(parent_nums[::2], parent_nums[1::2]))
for page_index, mcid, role, _ in records:
    element = parent_map[page_index][mcid].get_object()
    assert element['/S'] == '/' + role
    assert element['/Pg'].indirect_reference == reader.pages[page_index].indirect_reference
    kids = element['/K']
    assert (kids[0] if isinstance(kids, list) else kids) == mcid
uris = [a.get_object()['/A']['/URI'] for page in reader.pages for a in page.get('/Annots', [])]
assert 'https://www.graymatterstech.com/sewp-ordering-guide' in uris
assert not any('contractholders' in u for u in uris)
shutil.copy2(OUTPUT, ROOT / 'public/capabilities/sewp-vi.pdf')
print(f'Wrote {len(reader.pages)} pages, {len(records)} structure elements, {len(uris)} links: {OUTPUT}')
