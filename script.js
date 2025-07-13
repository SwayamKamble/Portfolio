// Copy URL to clipboard functionality
function copyToClipboard() {
    const url = 'https://swayamkamble.me';
    
    // Modern browsers
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
            showCopySuccess();
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopy(url);
        });
    } else {
        // Fallback for older browsers
        fallbackCopy(url);
    }
}

// Fallback copy method
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        showCopyError();
    } finally {
        document.body.removeChild(textArea);
    }
}

// Show success message
function showCopySuccess() {
    const message = document.createElement('div');
    message.className = 'copy-success';
    message.textContent = 'URL copied to clipboard!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Show error message
function showCopyError() {
    const message = document.createElement('div');
    message.className = 'copy-success';
    message.style.background = 'linear-gradient(45deg, #dc2626, #ef4444)';
    message.textContent = 'Failed to copy URL';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Handle QR code image loading
document.addEventListener('DOMContentLoaded', function() {
    const qrCode = document.getElementById('qrCode');
    const qrFallback = document.getElementById('qrFallback');
    
    if (qrCode) {
        qrCode.onerror = function() {
            qrCode.style.display = 'none';
            qrFallback.style.display = 'flex';
        };
        
        qrCode.onload = function() {
            qrFallback.style.display = 'none';
        };
    }
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on load
    const elements = document.querySelectorAll('.left-section > *');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
    });
    
    // Add CSS animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});
