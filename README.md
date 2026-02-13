# 🌑 Dark Luxury Portfolio - Digital Craftsmen

A premium, dark-themed portfolio website featuring advanced GSAP animations, Lenis smooth scrolling, and a sophisticated full-screen burger menu system.

## ✨ Key Features

### Design & Aesthetics
- 🎨 **Dark Luxury Theme** - Deep blacks with cyan/indigo accents
- 🌌 **Aurora Background** - Subtle mesh gradient with noise texture overlay
- ✨ **Text Glow Hover** - Moving gradient effect on headings
- 💎 **Premium Cards** - Solid luxury cards, not excessive glassmorphism
- 🎭 **Noise Texture** - Professional film grain overlay (5% opacity)

### Advanced Animations
- 🚀 **GSAP + ScrollTrigger** - Sophisticated scroll-based animations
- 🌊 **Lenis Smooth Scroll** - Buttery smooth scrolling experience
- 📍 **Section Pinning** - Services section pins while cards stack
- 🎯 **Parallax Effects** - Mouse-tracking and scroll parallax
- 🔄 **Infinite Marquee** - Auto-scrolling tech stack showcase

### Navigation
- 🍔 **Universal Burger Menu** - Same for mobile AND desktop
- 📱 **Full-Screen Overlay** - Immersive navigation experience
- 🎬 **GSAP Menu Animations** - Staggered link reveals, rotating close button
- 🌐 **Multi-language** - English, Russian, Uzbek support

### Unique Interactions
- 👁️ **Focus Hover Effect** - Hovering team member dims others
- 📚 **Stacking Cards** - Services cards stack on top while scrolling
- 🎨 **Gradient Text Clips** - Animated gradient text fills on hover
- ⚡ **Micro-interactions** - Buttons, cards, and elements respond beautifully

## 🛠️ Tech Stack

- **React** 18.2.0
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** 3.4.0 - Utility-first styling
- **GSAP** 3.12.5 - Professional animation library
- **Lenis** 1.0.42 - Smooth scroll by Studio Freight
- **i18next** - Internationalization
- **Lucide React** - Beautiful icons

## 📦 Installation

```bash
# Navigate to project
cd portfolio-dark-luxury

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Color Palette

```css
Dark Backgrounds:
- Primary: #050505
- Lighter: #0a0a0a
- Card: #0f0f0f

Accent Colors:
- Cyan: #00d9ff
- Indigo: #4f46e5
- Purple: #8b5cf6
- Pink: #ec4899
```

## 📁 Project Structure

```
portfolio-dark/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Navbar.jsx           # Navigation bar with burger trigger
│   │   │   └── MenuOverlay.jsx      # Full-screen animated menu
│   │   ├── Hero.jsx                 # Hero section with text reveals
│   │   ├── Services.jsx             # Pinned section with stacking cards
│   │   ├── Technology.jsx           # Infinite marquee showcase
│   │   ├── Team.jsx                 # Team grid with focus effect
│   │   └── Footer.jsx               # Large CTA footer
│   ├── App.jsx                      # Lenis integration
│   ├── main.jsx                     # Entry point
│   ├── index.css                    # Global styles + animations
│   └── i18n.js                      # Translations
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🎯 Key Animations Explained

### Hero Section
- Text lines reveal from bottom with 3D rotation
- Staggered entrance animations
- Mouse parallax on decorative elements
- Stats grid fade-in

### Services Section
- **ScrollTrigger Pin** - Section stays fixed while scrolling
- **Stacking Effect** - Cards stack on top of each other
- Previous cards scale down and fade as new ones appear
- Gradient progress bars

### Technology Section
- Infinite horizontal marquee (40s duration)
- Seamless loop using duplicated array
- Gradient fade overlays on edges

### Team Section
- **Focus Hover** - Hovering one card dims all others
- GSAP-powered opacity and scale changes
- Social links appear on image hover

### Menu Overlay
- Full-screen dark gradient background
- Staggered link animations from bottom
- Close button rotates with spring physics
- Social links fade in last

## 🌍 Language Support

Switch between languages using the globe icon in the navbar:
- 🇬🇧 English (EN)
- 🇷🇺 Russian (RU)
- 🇺🇿 Uzbek (UZ)

Edit translations in `src/i18n.js`.

## 🎨 Customization Guide

### Change Accent Colors
Edit `tailwind.config.js`:
```js
accent: {
  cyan: '#00d9ff',
  indigo: '#4f46e5',
  // Add your colors
}
```

### Adjust Smooth Scroll
In `src/App.jsx`, modify Lenis settings:
```js
const lenis = new Lenis({
  duration: 1.2,        // Lower = faster
  easing: (t) => ...,   // Custom easing
});
```

### Disable Noise Texture
In `src/index.css`, comment out:
```css
body::before {
  /* ... noise texture ... */
}
```

### Modify Aurora Effect
Edit `src/index.css` `.aurora-background::before` gradient stops.

## 🚀 Performance Optimizations

- ✅ Lenis integrated with GSAP ticker for smooth 60fps
- ✅ ScrollTrigger refreshed on Lenis scroll
- ✅ Images lazy-loaded
- ✅ CSS-based noise texture (no image file)
- ✅ Tailwind purges unused styles in production
- ✅ Vite's code splitting and tree-shaking

## 📱 Mobile Responsive

- Burger menu works same on mobile and desktop
- Fluid typography using `clamp()`
- Touch-optimized hover states
- Horizontal scroll prevention (`overflow-x: hidden`)
- Mobile-safe spacing and padding

## 🎭 Special Effects

### Text Glow Hover
```css
.text-glow-hover:hover {
  background: linear-gradient(90deg, #00d9ff, #4f46e5, #8b5cf6, #00d9ff);
  background-clip: text;
  animation: gradient-shift 3s ease infinite;
}
```

### Luxury Card Hover
```css
.luxury-card:hover {
  border-color: rgba(0, 217, 255, 0.3);
  box-shadow: 0 20px 60px rgba(0, 217, 255, 0.1);
  transform: translateY(-4px);
}
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT License - Feel free to use for your projects!

## 🤝 Contributing

This is a portfolio template. Fork it, customize it, make it yours!

## 💡 Tips

1. **First Load** - Wait for fonts to load (Google Fonts)
2. **Smooth Scroll** - Works best on mouse/trackpad, disabled on touch by default
3. **Menu** - Clicking links auto-closes menu and smooth scrolls to section
4. **Language** - Persists in browser, doesn't refresh page

---

**Built with 🖤 by Digital Craftsmen**
# Partfolio
