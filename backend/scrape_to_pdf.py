import os
from playwright.sync_api import sync_playwright
from dotenv import load_dotenv
import google.generativeai as genai
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

LINKS = [
    "https://en.wikipedia.org/wiki/Battle_of_Adwa",
    "https://ethiopiancrown.org/the-battle-of-adwa",
]

OUTPUT_PATH = "data/adwa_scraped.pdf"


def scrape_links(links):
    texts = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        for link in links:
            print(f"Scraping: {link}")
            page.goto(link, timeout=60000)

            # Extract visible text from body
            content = page.inner_text("body")
            texts.append(content)

        browser.close()

    return "\n\n".join(texts)



def structure_text(raw_text):
    model = genai.GenerativeModel("gemini-2.5-flash")

    prompt = f"""
    Convert the following raw web text into a clean,
    well-structured document about the Battle of Adwa.
    Use headings, sections, and remove noise.

    TEXT:
    {raw_text[:20000]}
    """

    response = model.generate_content(prompt)
    return response.text



def write_pdf(text, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)

    c = canvas.Canvas(path, pagesize=letter)
    width, height = letter

    y = height - 40
    for line in text.split("\n"):
        c.drawString(40, y, line[:100])
        y -= 14

        if y < 40:
            c.showPage()
            y = height - 40

    c.save()



if __name__ == "__main__":
    raw = scrape_links(LINKS)
    structured = structure_text(raw)
    write_pdf(structured, OUTPUT_PATH)

    print(f"Saved PDF → {OUTPUT_PATH}")