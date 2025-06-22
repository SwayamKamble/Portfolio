// Simple lightbox functionality for project images
function createLightbox() {
  // Create lightbox elements if they don't exist
  if (!document.getElementById('image-lightbox')) {
    const lightbox = document.createElement('div');
    lightbox.id = 'image-lightbox';
    lightbox.className = 'lightbox';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-img';
    
    lightboxContent.appendChild(closeBtn);
    lightboxContent.appendChild(lightboxImage);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    // Add event listeners
    closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  // Make images clickable
  const projectImages = document.querySelectorAll('.project-image, .image-gallery img, .side-by-side-images img, .grid-images img, .sys_arc, .indoor_node, .oudoor_node, .actuation_node, .om2m, .dashboard, .web_page, .in_out_temp, .in_out_humi, .rain, .temp_humi, .s_l_image1, .s_l_image2, .check');
  
  projectImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const lightbox = document.getElementById('image-lightbox');
      const lightboxImg = document.querySelector('.lightbox-img');
      
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', createLightbox);
