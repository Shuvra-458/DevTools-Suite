# DevTools Suite 🛠️

A Django REST backend providing handy developer utilities:
- 🔗 **URL Shortener**
- 📦 **Base64 Encoder / Decoder**
- 🧾 **Hashing Functions** (MD5, SHA1, SHA256, SHA3, BLAKE, CRC32, etc.)
- 📷 **QR Code Generator**
- 🆔 **ID Generator** (UUID4, random strings)
- 🔐 **JWT Encoder / Decoder**

---

## 🚀 Features & Endpoints

> Base path = `http://127.0.0.1:8000/` (dev)

### 1. URL Shortener
- **Create short URL**  
  `POST /shorten/create/`  
  Body: `{ "original_url": "https://example.com" }`  
- **Get original URL**  
  `GET /shorten/<short_code>/`  

### 2. Base64 Tool
- **Encode**  
  `POST /base64/encode/`  
  Body: `{ "text": "Hello" }`
- **Decode**  
  `POST /base64/decode/`  
  Body: `{ "text": "SGVsbG8=" }`

### 3. Hashing Functions
- **Generate hash**  
  `POST /hash/create/`  
  Body: `{ "text": "hello", "algorithm": "sha256" }`
- **List supported algorithms**  
  `GET /hash/list/`  
  (Includes hashlib.algorithms_available + `crc32`)

### 4. QR Code Generator
- **Generate QR (returns PNG image)**  
  `POST /qrcode/create/`  
  Body: `{ "data": "https://example.com" }`  
  Response: `image/png` binary (direct image)

### 5. ID Generator (idgen)
- **Generate UUID4**  
  `GET /idgen/uuid/`  
  Response: `{ "uuid": "..." }`
- **Generate random alphanumeric string**  
  `GET /idgen/random-string/?length=12`  
  Response: `{ "random_string": "..." }`

### 6. JWT Tool (jwttool)
- **Encode JWT**  
  `POST /jwt/encode/`  
  Body example:
  ```json
  {
    "payload": { "user_id": 123, "role": "admin" },
    "secret": "mysecret",        // optional; defaults to SECRET_KEY
    "exp_minutes": 60            // optional
  }
