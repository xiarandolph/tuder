import requests, json
from bs4 import BeautifulSoup

url = "https://sis.rpi.edu/reg/zs201901.htm"
r = requests.get(url)

html = r.text

soup = BeautifulSoup(html, 'html.parser')

a = soup.find_all('tr')

courses = set()

for item in a:
	b = item.find_all('td')

	if len(b) > 1:
		txt = b[0].text[7:16].strip() + " " + b[1].text.strip()
		txt = txt.lower()
		courses.add(txt)


courses = list(courses)

with open("out.json", "w+") as f:
	out = {"courses": courses}
	json.dump(out, f)
