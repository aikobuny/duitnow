import requests

x = requests.get('https://qr.tngdigital.com.my/m/281011055256647177190439575')

with open('preview.html', 'w', encoding='utf-8') as f:
    f.write(x.text)