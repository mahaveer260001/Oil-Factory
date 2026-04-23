# Pure Oil Co. - Premium Cooking Oil Landing Page

A high-fidelity, fully animated, and responsive landing page for a premium cooking oil brand built with React, Framer Motion, and modern CSS.

## 🎨 Features

- **Premium Animations**: Smooth scroll triggers, parallax effects, staggered card animations
- **Framer Motion Integration**: All animations are powered by Framer Motion for smooth, performant effects
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Performance Optimized**: Lazy loading, efficient animations, smooth scrolling
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support
- **Modern Tech Stack**: React 18, Vite, Framer Motion

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx           # Full-screen hero with floating bottle & parallax
│   ├── Features.jsx       # 4 feature cards with hover animations
│   ├── ProductShowcase.jsx # Horizontal scroll product gallery
│   ├── Story.jsx          # Brand story with split layout
│   ├── Testimonials.jsx   # Customer testimonials carousel
│   ├── CTA.jsx            # Call-to-action section
│   └── Footer.jsx         # Footer with animated links
├── styles/
│   ├── Hero.css
│   ├── Features.css
│   ├── ProductShowcase.css
│   ├── Story.css
│   ├── Testimonials.css
│   ├── CTA.css
│   └── Footer.css
├── App.jsx                # Main component orchestrating all sections
├── App.css                # Global styles & CSS variables
└── main.jsx               # React entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to project directory:
```bash
cd d:\Gourav\Clients\Mahaveer
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000` automatically.

## 🎬 Animation Highlights

### Hero Section
- Animated floating oil bottle with scaling and rotation
- Parallax effect on scroll (bottle moves at 50% of scroll speed)
- Smooth entrance animations for text with staggered delays
- Scroll-down indicator with continuous bounce animation

### Features Section
- Staggered card entrance animations
- Individual card lift effect on hover
- Icon scaling and rotation on hover
- Animated bottom border reveal

### Product Showcase
- Horizontal scroll gallery with fade gradients
- Product cards scale and lift on hover with shadow effects
- Smooth carousel-like navigation
- Responsive scroll hint animation

### Story Section
- Text entrance from left with scale and opacity
- Image entrance from right with 3D rotation effect
- Bullet list items animate sequentially on scroll
- Gradient background animation

### Testimonials
- Smooth slide-in/out transitions between testimonials
- Star rating animation
- Carousel navigation with smooth transitions
- Indicator dots with active state highlighting

### CTA Section
- Gradient background animation
- Button with shimmer effect on hover
- Staggered badge animations
- Scale and lift effects

### Footer
- Staggered column animations
- Link hover effects with underline animation
- Social icon scaling and rotation
- Divider line animation on scroll

## 🎨 Color Palette

- **Primary Gold**: `#F4D03F`
- **Dark Gold**: `#D4AF37`
- **Light Gold**: `#FFF9E6`
- **Dark Text**: `#1a1a1a`
- **Green Accent**: `#10B981` (for checkmarks)

## 📦 Build for Production

```bash
npm run build
```

Optimized build output will be in the `dist/` directory.

## 🔍 Key Technologies

- **React 18**: Latest React features and hooks
- **Vite**: Ultra-fast build tool
- **Framer Motion**: Industry-leading animation library
- **CSS3**: Modern CSS features (Grid, Flexbox, Variables)
- **Intersection Observer API**: Efficient scroll-based animations

## 📱 Responsive Breakpoints

- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: Below 768px

## ✨ Code Quality

- Clean, modular component structure
- Well-commented animation logic
- CSS custom properties for consistency
- Responsive design patterns
- Performance optimized animations

## 🚀 Performance Notes

- All animations use GPU-accelerated transforms
- Intersection Observer for lazy animation triggering
- Efficient re-render optimization with React hooks
- Minimal bundle size with tree-shaking support

## 📝 License

Created for demonstration purposes.

## 👨‍💻 Author

Built with ❤️ for premium branding and user experience.
