from PyPDF2 import PdfReader
import re

reader = PdfReader(r'D:\Syaeful\WIbawa 2026\Proposal cuan.in.pdf')

with open(r'd:\Syaeful\WIbawa 2026\cuanin\proposal_text.txt', 'w', encoding='utf-8') as f:
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        # Clean up the excessive whitespace
        text = re.sub(r'\n\s*\n', '\n', text)
        text = re.sub(r'\s+', ' ', text)
        text = text.strip()
        f.write(f'\n=== PAGE {i+1} ===\n{text}\n')

print("Done! Saved to proposal_text.txt")
