// Enhanced space background animation with realistic galaxies and shooting stars

class SpaceBackground {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.comets = [];
    this.galaxies = [];
    this.shootingStars = [];
    this.astronaut = {
      x: 0,
      y: 0,
      size: 40,
      angle: 0,
      speed: 0.5,
      orbit: 150,
      centerX: 0,
      centerY: 0,
      img: new Image()
    };
    
    this.init();
  }
  
  init() {
    // Set up canvas
    this.canvas.id = 'space-background';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    document.body.prepend(this.canvas);
    
    // Set canvas size
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    
    // Create stars
    this.createStars(200);
    
    // Create comets
    this.createComets(3);
    
    // Create galaxies
    this.createGalaxies(3);
    
    // Set up astronaut
    this.astronaut.img.src = 'images/astronaut.png';
    this.astronaut.centerX = window.innerWidth * 0.8;
    this.astronaut.centerY = window.innerHeight * 0.7;
    
    // Start animation
    this.animate();
    
    // Periodically create shooting stars
    setInterval(() => {
      if (Math.random() < 0.3 && this.shootingStars.length < 5) {
        this.createShootingStar();
      }
    }, 1000);
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createStars(count) {
    this.stars = [];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.9 ? this.getRandomStarColor() : '#FFFFFF'
      });
    }
  }
  
  getRandomStarColor() {
    const colors = ['#FFFFFF', '#F8F7FF', '#CAE9FF', '#FFF8E7', '#FFE9C8', '#FFDAB9'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  createComets(count) {
    this.comets = [];
    for (let i = 0; i < count; i++) {
      this.comets.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        length: Math.random() * 100 + 50,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 2 + 1,
        width: Math.random() * 2 + 1,
        active: false,
        countdown: Math.floor(Math.random() * 300) + 100
      });
    }
  }
  
  createShootingStar() {
    // Random position at top of screen
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * (this.canvas.height * 0.5);
    
    // Random angle pointing downward
    const angle = (Math.PI / 4) + (Math.random() * (Math.PI / 2));
    
    // Create shooting star
    this.shootingStars.push({
      x,
      y,
      trailPoints: [{x, y}], // Start with initial position
      angle,
      speed: 5 + Math.random() * 10,
      size: 2 + Math.random() * 2,
      brightness: 0.7 + Math.random() * 0.3,
      trailLength: 15 + Math.random() * 25,
      alive: true
    });
  }
  
  createGalaxies(count) {
    this.galaxies = [];
    
    // More varied colors for realistic galaxies
    const coreColors = [
      'rgba(106, 13, 173, 0.5)', // Purple
      'rgba(147, 112, 219, 0.5)', // Medium purple
      'rgba(70, 10, 100, 0.5)',  // Dark purple
      'rgba(50, 20, 150, 0.5)',  // Blue-purple
      'rgba(200, 50, 200, 0.4)'  // Pink-purple
    ];
    
    const dustColors = [
      'rgba(106, 13, 173, 0.1)',
      'rgba(147, 112, 219, 0.1)',
      'rgba(75, 0, 130, 0.1)',
      'rgba(180, 100, 200, 0.1)',
      'rgba(50, 30, 100, 0.1)'
    ];
    
    for (let i = 0; i < count; i++) {
      this.galaxies.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 300 + 200,
        rotation: Math.random() * Math.PI * 2,
        coreColor: coreColors[Math.floor(Math.random() * coreColors.length)],
        dustColor: dustColors[Math.floor(Math.random() * dustColors.length)],
        rotationSpeed: (Math.random() * 0.0003) + 0.0001,
        spiralFactor: 0.2 + Math.random() * 0.3,
        arms: 2 + Math.floor(Math.random() * 3) * 2, // 2, 4, or 6 arms
        ellipticity: 0.5 + Math.random() * 0.3 // How elliptical the galaxy is (1 = circle)
      });
    }
  }
  
  drawStars() {
    this.ctx.save();
    for (const star of this.stars) {
      // Update twinkle
      star.twinklePhase += star.twinkleSpeed;
      const opacity = star.opacity * (0.7 + 0.3 * Math.sin(star.twinklePhase));
      
      // Draw star
      this.ctx.fillStyle = star.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.restore();
  }
  
  drawComets() {
    this.ctx.save();
    for (const comet of this.comets) {
      // Update comet
      if (comet.active) {
        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;
        
        // Check if comet is out of canvas
        if (comet.x < -comet.length || comet.x > this.canvas.width + comet.length ||
            comet.y < -comet.length || comet.y > this.canvas.height + comet.length) {
          comet.active = false;
          comet.countdown = Math.floor(Math.random() * 300) + 100;
        }
      } else {
        comet.countdown--;
        if (comet.countdown <= 0) {
          // Reset comet
          if (Math.random() < 0.5) {
            // Start from edge
            if (Math.random() < 0.5) {
              // Left or right
              comet.x = Math.random() < 0.5 ? 0 : this.canvas.width;
              comet.y = Math.random() * this.canvas.height;
              comet.angle = comet.x === 0 ? 
                Math.random() * Math.PI / 2 - Math.PI / 4 : 
                Math.random() * Math.PI / 2 + Math.PI * 3/4;
            } else {
              // Top or bottom
              comet.x = Math.random() * this.canvas.width;
              comet.y = Math.random() < 0.5 ? 0 : this.canvas.height;
              comet.angle = comet.y === 0 ? 
                Math.random() * Math.PI / 2 + Math.PI / 4 : 
                Math.random() * Math.PI / 2 - Math.PI * 3/4;
            }
          } else {
            // Random position
            comet.x = Math.random() * this.canvas.width;
            comet.y = Math.random() * this.canvas.height;
            comet.angle = Math.random() * Math.PI * 2;
          }
          
          comet.active = true;
          comet.length = Math.random() * 100 + 50;
          comet.speed = Math.random() * 2 + 1;
          comet.width = Math.random() * 2 + 1;
        }
      }
      
      // Draw comet
      if (comet.active) {
        const gradient = this.ctx.createLinearGradient(
          comet.x, comet.y,
          comet.x - Math.cos(comet.angle) * comet.length,
          comet.y - Math.sin(comet.angle) * comet.length
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.3, 'rgba(180, 180, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(147, 112, 219, 0)');
        
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = comet.width;
        this.ctx.beginPath();
        this.ctx.moveTo(comet.x, comet.y);
        this.ctx.lineTo(
          comet.x - Math.cos(comet.angle) * comet.length,
          comet.y - Math.sin(comet.angle) * comet.length
        );
        this.ctx.stroke();
      }
    }
    this.ctx.restore();
  }
  
  drawGalaxies() {
    this.ctx.save();
    for (const galaxy of this.galaxies) {
      // Update rotation
      galaxy.rotation += galaxy.rotationSpeed;
      
      // Draw galaxy
      this.ctx.translate(galaxy.x, galaxy.y);
      this.ctx.rotate(galaxy.rotation);
      
      // Draw dust (spiral arms)
      this.ctx.save();
      const dustGradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, galaxy.size);
      dustGradient.addColorStop(0, galaxy.dustColor.replace('0.1)', '0.3)'));
      dustGradient.addColorStop(0.3, galaxy.dustColor.replace('0.1)', '0.2)'));
      dustGradient.addColorStop(0.7, galaxy.dustColor);
      dustGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      this.ctx.fillStyle = dustGradient;
      
      // Draw spiral arms
      for (let i = 0; i < galaxy.arms; i++) {
        const angleOffset = (Math.PI * 2 / galaxy.arms) * i;
        this.ctx.save();
        this.ctx.rotate(angleOffset);
        
        this.ctx.beginPath();
        
        // Draw spiral arm using parametric equations
        for (let t = 0; t < 5; t += 0.1) {
          const radius = galaxy.size * 0.1 * (1 + galaxy.spiralFactor * t);
          const angle = t * 1.5;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle) * galaxy.ellipticity;
          
          if (t === 0) {
            this.ctx.moveTo(x, y);
          } else {
            this.ctx.lineTo(x, y);
          }
        }
        
        this.ctx.lineWidth = galaxy.size * 0.15;
        this.ctx.strokeStyle = galaxy.dustColor.replace('0.1)', '0.15)');
        this.ctx.stroke();
        
        this.ctx.restore();
      }
      
      // Draw galaxy core
      const coreGradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, galaxy.size * 0.3);
      coreGradient.addColorStop(0, galaxy.coreColor);
      coreGradient.addColorStop(0.6, galaxy.coreColor.replace('0.5)', '0.3)'));
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      this.ctx.fillStyle = coreGradient;
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, galaxy.size * 0.25, galaxy.size * 0.25 * galaxy.ellipticity, 0, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Add some random stars in the galaxy
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * galaxy.size * 0.6;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance * galaxy.ellipticity;
        const size = Math.random() * 1.5 + 0.5;
        
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      this.ctx.restore();
      
      // Reset transformations
      this.ctx.resetTransform();
    }
    this.ctx.restore();
  }
  
  drawShootingStars() {
    // For each shooting star
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const star = this.shootingStars[i];
      
      // Update position
      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;
      
      // Add current position to trail
      star.trailPoints.push({x: star.x, y: star.y});
      
      // Limit trail length
      if (star.trailPoints.length > star.trailLength) {
        star.trailPoints.shift();
      }
      
      // Check if shooting star is out of bounds
      if (star.x < 0 || star.x > this.canvas.width || 
          star.y < 0 || star.y > this.canvas.height) {
        star.alive = false;
      }
      
      // Draw shooting star
      if (star.alive) {
        this.ctx.save();
        
        // Draw trail
        if (star.trailPoints.length > 1) {
          // Create gradient for trail
          const gradient = this.ctx.createLinearGradient(
            star.trailPoints[0].x, star.trailPoints[0].y,
            star.x, star.y
          );
          
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
          gradient.addColorStop(0.4, `rgba(180, 180, 255, ${star.brightness * 0.3})`);
          gradient.addColorStop(0.8, `rgba(220, 220, 255, ${star.brightness * 0.6})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${star.brightness})`);
          
          this.ctx.beginPath();
          this.ctx.moveTo(star.trailPoints[0].x, star.trailPoints[0].y);
          
          for (let i = 1; i < star.trailPoints.length; i++) {
            this.ctx.lineTo(star.trailPoints[i].x, star.trailPoints[i].y);
          }
          
          this.ctx.strokeStyle = gradient;
          this.ctx.lineWidth = star.size;
          this.ctx.lineCap = 'round';
          this.ctx.stroke();
        }
        
        // Draw the star point
        this.ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add glow effect
        const glow = this.ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
        glow.addColorStop(0, `rgba(255, 255, 255, ${star.brightness * 0.8})`);
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        this.ctx.fillStyle = glow;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
      } else {
        // Remove dead shooting stars
        this.shootingStars.splice(i, 1);
      }
    }
  }
  
  drawAstronaut() {
    if (!this.astronaut.img.complete) return;
    
    this.ctx.save();
    
    // Update astronaut position
    this.astronaut.angle += 0.01;
    this.astronaut.x = this.astronaut.centerX + Math.cos(this.astronaut.angle) * this.astronaut.orbit;
    this.astronaut.y = this.astronaut.centerY + Math.sin(this.astronaut.angle) * this.astronaut.orbit * 0.5;
    
    // Add slight floating motion
    const floatOffset = Math.sin(this.astronaut.angle * 2) * 5;
    
    // Draw astronaut
    this.ctx.translate(this.astronaut.x, this.astronaut.y + floatOffset);
    this.ctx.rotate(Math.sin(this.astronaut.angle) * 0.2);
    this.ctx.drawImage(
      this.astronaut.img, 
      -this.astronaut.size / 2, 
      -this.astronaut.size / 2, 
      this.astronaut.size, 
      this.astronaut.size
    );
    
    this.ctx.restore();
  }
  
  animate() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw space elements
    this.drawGalaxies();
    this.drawStars();
    this.drawComets();
    this.drawShootingStars();
    this.drawAstronaut();
    
    // Continue animation
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize space background when the page loads
window.addEventListener('load', () => {
  new SpaceBackground();
});
