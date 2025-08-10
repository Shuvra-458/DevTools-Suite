# DevTools Suite 🛠️

A Django REST-based backend providing handy developer utilities such as:
- 🔗 **URL Shortener**
- 📦 **Base64 Encoder/Decoder**
- 🧾 **Hashing Functions** (MD5, SHA1, SHA256, SHA512, etc.)
- 📷 **QR Code Generator**

---

## 🚀 Features

### 1. URL Shortener
Create short URLs and retrieve the original.
- **POST** `/shorten/create/` → Create a short link
- **GET** `/shorten/<short_code>/` → Redirect or fetch the original URL

### 2. Base64 Tool
Encode and decode text or files.
- **POST** `/base64/encode/`
- **POST** `/base64/decode/`

### 3. Hashing Functions
Generate hashes using various algorithms.
- **POST** `/hash/generate/` → Pass text and select algorithm

### 4. QR Code Generator
Generate QR codes from text or URLs.
- **POST** `/qrcode/` → Returns a `.png` QR code

---

## 🛠️ Tech Stack
- **Backend**: Django 5 + Django REST Framework
- **Database**: MySQL (configurable)
- **Other**: python-qrcode, Pillow, dotenv, CORS headers

---

## 📦 Installation

```bash
# 1. Clone repo
git clone https://github.com/<your-username>/devtools_suite.git
cd devtools_suite

# 2. Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Setup .env file
cp .env.example .env
# Fill in your DB credentials and secret key

# 5. Run migrations
python manage.py migrate

# 6. Start development server
python manage.py runserver
