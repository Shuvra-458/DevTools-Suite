// API Base URL - Update this to match your Django backend
const API_BASE_URL = 'https://devtools-suite.onrender.com/';

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const toolPanels = document.querySelectorAll('.tool-panel');

// Navigation functionality
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const toolName = item.dataset.tool;
        switchTool(toolName);
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

function switchTool(toolName) {
    toolPanels.forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(toolName).classList.add('active');
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.getElementById('toast-container').appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Copy to clipboard functionality
function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage);
    }).catch(() => {
        showToast('Failed to copy to clipboard', 'error');
    });
}

// URL Shortener functionality
document.getElementById('shorten-btn').addEventListener('click', async () => {
    const originalUrl = document.getElementById('original-url').value.trim();
    
    if (!originalUrl) {
        showToast('Please enter a URL', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/shorten/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ original_url: originalUrl })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            const shortUrl = `${window.location.origin}/short/${data.short_code}`;
            document.getElementById('short-url').value = shortUrl;
            document.getElementById('url-result').style.display = 'block';
            showToast('URL shortened successfully!');
        } else {
            showToast(data.error || 'Failed to shorten URL', 'error');
        }
    } catch (error) {
        showToast('Network error occurred', 'error');
    }
});

document.getElementById('decode-btn').addEventListener('click', async () => {
    const shortCode = document.getElementById('short-code').value.trim();
    
    if (!shortCode) {
        showToast('Please enter a short code', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/shorten/${shortCode}/`);
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('decoded-url').value = data.original_url;
            document.getElementById('decode-result').style.display = 'block';
            showToast('URL decoded successfully!');
        } else {
            showToast(data.error || 'Failed to decode URL', 'error');
        }
    } catch (error) {
        showToast('Network error occurred', 'error');
    }
});

// Copy buttons for URL shortener
document.getElementById('copy-url').addEventListener('click', () => {
    const shortUrl = document.getElementById('short-url').value;
    copyToClipboard(shortUrl, 'Short URL copied!');
});

document.getElementById('copy-decoded').addEventListener('click', () => {
    const decodedUrl = document.getElementById('decoded-url').value;
    copyToClipboard(decodedUrl, 'Original URL copied!');
});

// Base64 functionality
document.getElementById('encode-btn').addEventListener('click', async () => {
    const text = document.getElementById('encode-input').value;
    
    if (!text) {
        showToast('Please enter text to encode', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/base64/encode/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('encode-output').value = data.encoded;
            showToast('Text encoded successfully!');
        } else {
            showToast(data.error || 'Failed to encode text', 'error');
        }
    } catch (error) {
        showToast('Network error occurred', 'error');
    }
});

document.getElementById('decode-base64-btn').addEventListener('click', async () => {
    const text = document.getElementById('decode-input').value;
    
    if (!text) {
        showToast('Please enter Base64 text to decode', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/base64/decode/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('decode-output').value = data.decoded;
            showToast('Base64 decoded successfully!');
        } else {
            showToast(data.error || 'Failed to decode Base64', 'error');
        }
    } catch (error) {
        showToast('Network error occurred', 'error');
    }
});

// Hash Generator functionality
document.getElementById('generate-hash-btn').addEventListener('click', async () => {
    const text = document.getElementById('hash-input').value;
    const algorithm = document.getElementById('hash-algorithm').value;
    
    if (!text) {
        showToast('Please enter text to hash', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/hashgen/generate-hash/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, algorithm })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('hash-output').value = data.hash;
            document.getElementById('hash-result').style.display = 'block';
            showToast(`${algorithm.toUpperCase()} hash generated!`);
        } else {
            showToast(data.error || 'Failed to generate hash', 'error');
        }
    } catch (error) {
        showToast('Network error occurred', 'error');
    }
});

document.getElementById('copy-hash').addEventListener('click', () => {
    const hash = document.getElementById('hash-output').value;
    copyToClipboard(hash, 'Hash copied!');
});

// QR Code Generator functionality
document.getElementById('generate-qr-btn').addEventListener('click', async () => {
    const data = document.getElementById('qr-input').value;
    
    if (!data) {
        showToast('Please enter data for QR code', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/qrcode/generate/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });
        
        if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            
            const qrImage = document.getElementById('qr-image');
            qrImage.src = imageUrl;
            qrImage.dataset.blob = imageUrl;
            
            document.getElementById('qr-result').style.display = 'block';
            showToast('QR code generated successfully!');
        } else {
            const data = await response.json();
            showToast(data.error || 'Failed to generate QR code', 'error');
        }
    } catch (error) {
        showToast('Network error occurred', 'error');
    }
});

document.getElementById('download-qr').addEventListener('click', () => {
    const qrImage = document.getElementById('qr-image');
    const imageUrl = qrImage.dataset.blob;
    
    if (imageUrl) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'qrcode.png';
        link.click();
        showToast('QR code downloaded!');
    }
});

// ID Generator functionality
document.getElementById('generate-uuid-btn').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/idgen/uuid/`);
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('uuid-output').value = data.uuid;
            showToast('UUID generated!');
        } else {
            showToast('Failed to generate UUID', 'error');
        }
    } catch (error) {
        showToast('Network error occurred', 'error');
    }
});

document.getElementById('generate-string-btn').addEventListener('click', async () => {
    const length = document.getElementById('string-length').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/idgen/random-string/?length=${length}`);
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('string-output').value = data.random_string;
            showToast('Random string generated!');
        } else {
            showToast('Failed to generate random string', 'error');
        }
    } catch (error) {
        showToast('Network error occurred', 'error');
    }
});

document.getElementById('copy-uuid').addEventListener('click', () => {
    const uuid = document.getElementById('uuid-output').value;
    copyToClipboard(uuid, 'UUID copied!');
});

document.getElementById('copy-string').addEventListener('click', () => {
    const randomString = document.getElementById('string-output').value;
    copyToClipboard(randomString, 'Random string copied!');
});

// JWT functionality
document.getElementById('encode-jwt-btn').addEventListener('click', async () => {
    const payloadText = document.getElementById('jwt-payload').value;
    const secret = document.getElementById('jwt-secret').value;
    const expMinutes = document.getElementById('jwt-expiry').value;
    
    if (!payloadText) {
        showToast('Please enter a payload', 'error');
        return;
    }
    
    try {
        const payload = JSON.parse(payloadText);
        const requestBody = { payload, exp_minutes: parseInt(expMinutes) };
        
        if (secret) {
            requestBody.secret = secret;
        }
        
        const response = await fetch(`${API_BASE_URL}/jwttool/encode/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('jwt-encoded').value = data.token;
            showToast('JWT encoded successfully!');
        } else {
            showToast(data.error || 'Failed to encode JWT', 'error');
        }
    } catch (error) {
        if (error instanceof SyntaxError) {
            showToast('Invalid JSON payload', 'error');
        } else {
            showToast('Network error occurred', 'error');
        }
    }
});

document.getElementById('decode-jwt-btn').addEventListener('click', async () => {
    const token = document.getElementById('jwt-token').value;
    const secret = document.getElementById('jwt-decode-secret').value;
    
    if (!token) {
        showToast('Please enter a JWT token', 'error');
        return;
    }
    
    try {
        const requestBody = { token };
        
        if (secret) {
            requestBody.secret = secret;
        }
        
        const response = await fetch(`${API_BASE_URL}/jwttool/decode/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('jwt-decoded').value = JSON.stringify(data.payload, null, 2);
            showToast('JWT decoded successfully!');
        } else {
            showToast(data.error || 'Failed to decode JWT', 'error');
        }
    } catch (error) {
        showToast('Network error occurred', 'error');
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Set default tool
    switchTool('url-shortener');
    
    // Add some sample data for demonstration
    document.getElementById('jwt-payload').value = JSON.stringify({
        user_id: 123,
        role: "admin",
        email: "user@example.com"
    }, null, 2);
});
