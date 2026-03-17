import { useEffect, useRef, useState } from "react";

export const Home = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const [activeFilter, setActiveFilter] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  const heroSlides = [
    { label: "New Season", title: ["Dress for the", "Moment,", "Not Forever."], sub: "Couture Gala Collection — SS 2026", cta: "Explore Collection", bg: "linear-gradient(135deg, #0d0d0d 0%, #1a1208 40%, #0d0d0d 100%)", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", tag: "Bridal & Gala" },
    { label: "Trending Now", title: ["Luxury Without", "The Lifetime", "Commitment."], sub: "Designer Lehengas & Gowns", cta: "Rent Today", bg: "linear-gradient(135deg, #0d0d0d 0%, #100d10 40%, #0d0d0d 100%)", imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80", tag: "Women's Edit" },
    { label: "Sustainable Fashion", title: ["Wear it Once,", "Return it,", "Love it Always."], sub: "Premium Men's Suiting & Sherwanis", cta: "Browse Men's", bg: "linear-gradient(135deg, #0d0d0d 0%, #090f0c 40%, #0d0d0d 100%)", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", tag: "Men's Edit" },
  ];

  const collections = [
    { id: 1, title: "Bridal Couture", count: "142 Pieces", tag: "Most Loved", tagColor: "#c8aa6e", size: "large", imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=700&q=80", desc: "Lehengas, Sarees & Gowns for your big day" },
    { id: 2, title: "Gala & Evening", count: "98 Pieces", tag: "New In", tagColor: "#8aab9a", size: "medium", imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80", desc: "Floor-length gowns for every grand occasion" },
    { id: 3, title: "Men's Sherwani", count: "76 Pieces", tag: "Bestseller", tagColor: "#b8a090", size: "medium", imageUrl: "https://images.unsplash.com/photo-1580518337843-f959e992563b?w=700&q=80", desc: "Regal sherwanis & bandhgalas for every ceremony" },
    { id: 4, title: "Indo-Western", count: "114 Pieces", tag: "Trending", tagColor: "#c8aa6e", size: "small", imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&q=80", desc: "Fusion silhouettes for the modern occasion" },
    { id: 5, title: "Cocktail & Party", count: "88 Pieces", tag: "", tagColor: "#c8aa6e", size: "small", imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=80", desc: "Statement mini & midi dresses" },
    { id: 6, title: "Festive Sarees", count: "203 Pieces", tag: "Editor's Pick", tagColor: "#c8d4e8", size: "small", imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=700&q=80", desc: "Banarasi, Kanjivaram & designer drapes" },
  ];

  const filters = ["All", "Women", "Men", "Bridal", "Festive", "Party"];

  const trendingPieces = [
    { id: 1, name: "Crimson Silk Lehenga", designer: "Sabyasachi", category: "Bridal", price: 2499, originalPrice: 45000, duration: "3 days", rentCount: 87, rating: 4.9, reviews: 124, badge: "Most Rented", badgeColor: "#c8aa6e", imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80", sizes: ["XS","S","M","L"], tags: ["Women","Bridal"] },
    { id: 2, name: "Ivory Organza Gown", designer: "Manish Malhotra", category: "Gala", price: 1899, originalPrice: 38000, duration: "3 days", rentCount: 62, rating: 4.8, reviews: 98, badge: "New In", badgeColor: "#8aab9a", imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", sizes: ["S","M","L","XL"], tags: ["Women","Party"] },
    { id: 3, name: "Royal Blue Sherwani", designer: "Tarun Tahiliani", category: "Men's", price: 1499, originalPrice: 28000, duration: "3 days", rentCount: 54, rating: 4.7, reviews: 76, badge: "Bestseller", badgeColor: "#b8a090", imageUrl: "https://images.unsplash.com/photo-1580518337843-f959e992563b?w=600&q=80", sizes: ["S","M","L","XL","XXL"], tags: ["Men"] },
    { id: 4, name: "Emerald Anarkali", designer: "Ritu Kumar", category: "Festive", price: 999, originalPrice: 18000, duration: "3 days", rentCount: 43, rating: 4.9, reviews: 61, badge: "Trending", badgeColor: "#c8aa6e", imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80", sizes: ["XS","S","M"], tags: ["Women","Festive"] },
    { id: 5, name: "Blush Sequin Saree", designer: "Falguni Shane Peacock", category: "Party", price: 1299, originalPrice: 24000, duration: "3 days", rentCount: 39, rating: 4.8, reviews: 55, badge: "Editor's Pick", badgeColor: "#c8d4e8", imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80", sizes: ["Free Size"], tags: ["Women","Party"] },
    { id: 6, name: "Midnight Velvet Bandhgala", designer: "Rohit Bal", category: "Men's", price: 1799, originalPrice: 32000, duration: "3 days", rentCount: 31, rating: 4.6, reviews: 44, badge: "", badgeColor: "", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", sizes: ["M","L","XL"], tags: ["Men"] },
    { id: 7, name: "Gold Tissue Lehenga", designer: "Anita Dongre", category: "Bridal", price: 2999, originalPrice: 52000, duration: "3 days", rentCount: 28, rating: 5.0, reviews: 38, badge: "Luxury Pick", badgeColor: "#c8aa6e", imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80", sizes: ["XS","S","M","L"], tags: ["Women","Bridal"] },
    { id: 8, name: "Sage Green Co-ord Set", designer: "Masaba Gupta", category: "Party", price: 799, originalPrice: 14000, duration: "3 days", rentCount: 71, rating: 4.7, reviews: 89, badge: "Fan Favourite", badgeColor: "#8aab9a", imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80", sizes: ["XS","S","M","L","XL"], tags: ["Women","Party"] },
  ];

  const filteredPieces = activeFilter === "All" ? trendingPieces : trendingPieces.filter(p => p.tags.includes(activeFilter));
  const VISIBLE = 4;
  const CARD_GAP = 20;
  const maxIndex = Math.max(0, filteredPieces.length - VISIBLE);

  useEffect(() => {
    intervalRef.current = setInterval(() => setActiveSlide(p => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goToSlide = (i) => {
    setActiveSlide(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setActiveSlide(p => (p + 1) % heroSlides.length), 5000);
  };

  const toggleWishlist = (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const slide = heroSlides[activeSlide];

  // Calculate pixel offset for carousel
  const getCarouselOffset = () => {
    if (!carouselRef.current) return 0;
    const trackWrap = carouselRef.current.querySelector('.carousel-track-wrap');
    if (!trackWrap) return 0;
    const containerWidth = trackWrap.offsetWidth;
    const cardWidth = (containerWidth - (VISIBLE - 1) * CARD_GAP) / VISIBLE;
    return carouselIndex * (cardWidth + CARD_GAP);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0d0d0d; font-family: 'Jost', sans-serif; overflow-x: hidden; color: #f5f0e8; }

        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 200; }
        .top-strip { background: linear-gradient(90deg, #c8aa6e, #e8d5a3, #c8aa6e); text-align: center; padding: 7px; font-size: 10px; letter-spacing: 3px; color: #0d0d0d; font-weight: 500; text-transform: uppercase; }
        .main-nav { display: flex; align-items: center; justify-content: space-between; padding: 0 48px; height: 76px; gap: 28px; background: rgba(13,13,13,0.88); backdrop-filter: blur(24px); border-bottom: 1px solid rgba(200,170,110,0.12); }
        .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .logo-mark { width: 36px; height: 36px; border: 1.5px solid #c8aa6e; display: flex; align-items: center; justify-content: center; transform: rotate(45deg); transition: background 0.3s; }
        .logo-mark:hover { background: rgba(200,170,110,0.1); }
        .logo-mark-inner { transform: rotate(-45deg); font-family: 'Cormorant Garamond', serif; font-size: 17px; color: #c8aa6e; font-weight: 600; }
        .logo-text { display: flex; flex-direction: column; line-height: 1; }
        .logo-name { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 600; color: #f5f0e8; letter-spacing: 6px; text-transform: uppercase; }
        .logo-tagline { font-size: 9px; letter-spacing: 3px; color: #c8aa6e; text-transform: uppercase; font-weight: 300; }
        .nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
        .nav-links a { text-decoration: none; color: rgba(245,240,232,0.55); font-size: 10.5px; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 400; transition: color 0.2s; position: relative; padding-bottom: 2px; }
        .nav-links a::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #c8aa6e; transition: width 0.3s; }
        .nav-links a:hover { color: #c8aa6e; }
        .nav-links a:hover::after { width: 100%; }
        .search-container { flex: 1; max-width: 380px; }
        .search-wrapper { display: flex; align-items: center; border: 1px solid rgba(200,170,110,0.2); border-radius: 2px; background: rgba(255,255,255,0.02); transition: all 0.3s; }
        .search-wrapper.focused { border-color: #c8aa6e; background: rgba(200,170,110,0.04); box-shadow: 0 0 20px rgba(200,170,110,0.08); }
        .search-input { flex: 1; background: transparent; border: none; outline: none; padding: 11px 14px; color: #f5f0e8; font-family: 'Jost', sans-serif; font-size: 12px; font-weight: 300; letter-spacing: 1px; }
        .search-input::placeholder { color: rgba(200,170,110,0.35); letter-spacing: 1.5px; font-size: 10px; text-transform: uppercase; }
        .search-btn { background: transparent; border: none; padding: 11px 14px; cursor: pointer; color: rgba(200,170,110,0.5); transition: color 0.2s; display: flex; }
        .search-btn:hover { color: #c8aa6e; }
        .nav-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
        .nav-icon-btn { background: transparent; border: none; cursor: pointer; padding: 9px; color: rgba(245,240,232,0.65); border-radius: 2px; transition: all 0.2s; display: flex; align-items: center; position: relative; }
        .nav-icon-btn:hover { color: #c8aa6e; background: rgba(200,170,110,0.05); }
        .cart-badge { position: absolute; top: 4px; right: 4px; width: 16px; height: 16px; background: #c8aa6e; color: #0d0d0d; border-radius: 50%; font-size: 9px; font-weight: 600; display: flex; align-items: center; justify-content: center; }
        .ndivider { width: 1px; height: 18px; background: rgba(200,170,110,0.18); margin: 0 2px; }
        .btn-rent { background: transparent; border: 1px solid #c8aa6e; color: #c8aa6e; padding: 8px 20px; font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; cursor: pointer; border-radius: 1px; transition: all 0.3s; }
        .btn-rent:hover { background: #c8aa6e; color: #0d0d0d; }
        .sub-nav { border-top: 1px solid rgba(200,170,110,0.07); display: flex; justify-content: center; gap: 40px; padding: 10px 48px; background: rgba(13,13,13,0.9); backdrop-filter: blur(24px); }
        .sub-nav a { text-decoration: none; color: rgba(245,240,232,0.4); font-size: 9.5px; letter-spacing: 2px; text-transform: uppercase; transition: color 0.2s; }
        .sub-nav a:hover { color: #c8aa6e; }

        .hero { position: relative; height: 100vh; min-height: 700px; overflow: hidden; display: flex; align-items: center; }
        .hero-bg { position: absolute; inset: 0; transition: background 1.2s; z-index: 0; }
        .hero-grain { position: absolute; inset: 0; z-index: 1; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); opacity: 0.4; }
        .hero-image-panel { position: absolute; top: 0; right: 0; width: 52%; height: 100%; z-index: 2; overflow: hidden; }
        .hero-image-panel::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, #0d0d0d 0%, transparent 35%); z-index: 3; }
        .hero-image-panel::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 60%, rgba(13,13,13,0.7) 100%); z-index: 3; }
        .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; transition: opacity 0.8s, transform 6s; transform: scale(1.06); filter: brightness(0.75) contrast(1.1); }
        .hero-img.visible { opacity: 1; transform: scale(1); }
        .hero-img.hidden { opacity: 0; transform: scale(1.06); }
        .hero-divider { position: absolute; top: 0; left: 48%; width: 120px; height: 100%; background: linear-gradient(90deg, #0d0d0d, transparent); z-index: 4; transform: skewX(-4deg); transform-origin: bottom left; }
        .hero-content { position: relative; z-index: 10; padding: 0 48px; max-width: 600px; padding-top: 140px; }
        .hero-label { display: inline-flex; align-items: center; gap: 12px; margin-bottom: 28px; opacity: 0; transform: translateY(20px); animation: fadeUp 0.7s 0.2s forwards; }
        .hero-label-line { width: 40px; height: 1px; background: #c8aa6e; }
        .hero-label-text { font-size: 10px; letter-spacing: 4px; color: #c8aa6e; text-transform: uppercase; }
        .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(52px, 6.5vw, 88px); font-weight: 300; line-height: 1.05; color: #f5f0e8; letter-spacing: 1px; margin-bottom: 28px; }
        .hero-title span { display: block; opacity: 0; transform: translateY(30px); }
        .hero-title span:nth-child(1) { animation: fadeUp 0.8s 0.3s forwards; }
        .hero-title span:nth-child(2) { font-style: italic; color: #c8aa6e; animation: fadeUp 0.8s 0.45s forwards; }
        .hero-title span:nth-child(3) { animation: fadeUp 0.8s 0.6s forwards; }
        .hero-sub { font-size: 11px; letter-spacing: 3px; color: rgba(245,240,232,0.45); text-transform: uppercase; font-weight: 300; margin-bottom: 48px; opacity: 0; transform: translateY(16px); animation: fadeUp 0.8s 0.75s forwards; }
        .hero-ctas { display: flex; align-items: center; gap: 24px; opacity: 0; transform: translateY(16px); animation: fadeUp 0.8s 0.9s forwards; }
        .cta-primary { background: #c8aa6e; color: #0d0d0d; border: none; padding: 16px 40px; font-family: 'Jost', sans-serif; font-size: 10.5px; letter-spacing: 3px; text-transform: uppercase; cursor: pointer; font-weight: 500; transition: all 0.3s; position: relative; overflow: hidden; }
        .cta-primary::before { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.15); transform: translateX(-100%); transition: transform 0.4s; }
        .cta-primary:hover::before { transform: translateX(0); }
        .cta-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(200,170,110,0.3); }
        .cta-secondary { background: transparent; border: none; color: rgba(245,240,232,0.6); font-family: 'Jost', sans-serif; font-size: 10.5px; letter-spacing: 2.5px; text-transform: uppercase; cursor: pointer; font-weight: 300; display: flex; align-items: center; gap: 10px; transition: color 0.2s; padding: 0; }
        .cta-secondary-arrow { width: 30px; height: 1px; background: rgba(245,240,232,0.4); position: relative; transition: all 0.3s; }
        .cta-secondary-arrow::after { content: ''; position: absolute; right: 0; top: -3px; width: 6px; height: 6px; border-right: 1px solid rgba(245,240,232,0.4); border-top: 1px solid rgba(245,240,232,0.4); transform: rotate(45deg); transition: all 0.3s; }
        .cta-secondary:hover { color: #f5f0e8; }
        .cta-secondary:hover .cta-secondary-arrow { width: 44px; background: #f5f0e8; }
        .cta-secondary:hover .cta-secondary-arrow::after { border-color: #f5f0e8; }
        .hero-stats { position: absolute; bottom: 56px; left: 48px; display: flex; gap: 48px; z-index: 10; opacity: 0; animation: fadeUp 0.8s 1.1s forwards; }
        .stat { display: flex; flex-direction: column; gap: 4px; }
        .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 400; color: #f5f0e8; line-height: 1; }
        .stat-label { font-size: 9px; letter-spacing: 2.5px; color: rgba(245,240,232,0.35); text-transform: uppercase; }
        .stat-divider { width: 1px; height: 48px; background: rgba(200,170,110,0.15); align-self: center; }
        .hero-tag { position: absolute; right: 52px; bottom: 56px; z-index: 10; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; opacity: 0; animation: fadeUp 0.8s 1.2s forwards; }
        .hero-tag-label { font-size: 9px; letter-spacing: 3px; color: rgba(245,240,232,0.3); text-transform: uppercase; }
        .hero-tag-value { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: #c8aa6e; letter-spacing: 2px; }
        .hero-dots { position: absolute; right: 52px; top: 50%; transform: translateY(-50%); z-index: 10; display: flex; flex-direction: column; gap: 12px; }
        .dot { width: 2px; height: 24px; background: rgba(200,170,110,0.2); cursor: pointer; border: none; padding: 0; position: relative; overflow: hidden; }
        .dot-fill { position: absolute; bottom: 0; left: 0; right: 0; background: #c8aa6e; height: 0%; }
        .dot.active .dot-fill { height: 100%; transition: height 5s linear; }
        .scroll-hint { position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0; animation: fadeUp 1s 1.4s forwards; }
        .scroll-hint-text { font-size: 8.5px; letter-spacing: 3px; color: rgba(245,240,232,0.25); text-transform: uppercase; }
        .scroll-mouse { width: 20px; height: 32px; border: 1px solid rgba(245,240,232,0.15); border-radius: 10px; display: flex; justify-content: center; padding-top: 6px; }
        .scroll-wheel { width: 2px; height: 6px; background: rgba(200,170,110,0.5); border-radius: 1px; animation: scrollDown 2s infinite; }

        .collections-section { background: #0d0d0d; padding: 120px 48px; position: relative; overflow: hidden; }
        .collections-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(200,170,110,0.3), transparent); }
        .collections-section::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, rgba(200,170,110,0.04) 0%, transparent 70%); pointer-events: none; }
        .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 64px; position: relative; z-index: 1; }
        .section-label { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
        .section-label-line { width: 48px; height: 1px; background: #c8aa6e; }
        .section-label-text { font-size: 10px; letter-spacing: 4px; color: #c8aa6e; text-transform: uppercase; font-weight: 400; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4vw, 56px); font-weight: 300; color: #f5f0e8; line-height: 1.1; letter-spacing: 1px; }
        .section-title em { font-style: italic; color: #c8aa6e; }
        .section-view-all { display: flex; align-items: center; gap: 12px; background: transparent; border: 1px solid rgba(200,170,110,0.3); color: rgba(245,240,232,0.6); padding: 12px 28px; font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; cursor: pointer; transition: all 0.3s; flex-shrink: 0; margin-bottom: 6px; }
        .section-view-all:hover { border-color: #c8aa6e; color: #c8aa6e; background: rgba(200,170,110,0.04); }
        .collections-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; position: relative; z-index: 1; }
        .coll-card { position: relative; overflow: hidden; cursor: pointer; background: #111; }
        .coll-card-1 { grid-column: span 5; grid-row: span 2; aspect-ratio: 3/4; }
        .coll-card-2 { grid-column: span 4; aspect-ratio: 4/3; }
        .coll-card-3 { grid-column: span 3; aspect-ratio: 4/3; }
        .coll-card-4 { grid-column: span 4; aspect-ratio: 4/3; }
        .coll-card-5 { grid-column: span 4; aspect-ratio: 4/3; }
        .coll-card-6 { grid-column: span 4; aspect-ratio: 4/3; }
        .coll-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s; filter: brightness(0.65) contrast(1.05); }
        .coll-card:hover .coll-img { transform: scale(1.06); filter: brightness(0.5) contrast(1.1); }
        .coll-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 30%, rgba(13,13,13,0.9) 100%); transition: opacity 0.4s; }
        .coll-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 28px 24px; z-index: 2; }
        .coll-tag { display: inline-block; font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; padding: 4px 10px; border-radius: 1px; margin-bottom: 12px; font-weight: 500; border: 1px solid; }
        .coll-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; color: #f5f0e8; line-height: 1.1; margin-bottom: 6px; }
        .coll-card-1 .coll-title { font-size: 34px; }
        .coll-desc { font-size: 11px; color: rgba(245,240,232,0.45); font-weight: 300; margin-bottom: 16px; max-height: 0; overflow: hidden; transition: max-height 0.4s, opacity 0.3s; opacity: 0; }
        .coll-card:hover .coll-desc { max-height: 40px; opacity: 1; }
        .coll-footer { display: flex; align-items: center; justify-content: space-between; }
        .coll-count { font-size: 10px; letter-spacing: 2px; color: rgba(245,240,232,0.35); text-transform: uppercase; }
        .coll-arrow { width: 32px; height: 32px; border: 1px solid rgba(200,170,110,0.3); display: flex; align-items: center; justify-content: center; color: rgba(200,170,110,0.5); transition: all 0.3s; transform: translateX(-8px); opacity: 0; }
        .coll-card:hover .coll-arrow { transform: translateX(0); opacity: 1; border-color: #c8aa6e; color: #c8aa6e; }
        .collections-banner { margin-top: 16px; border: 1px solid rgba(200,170,110,0.1); padding: 28px 40px; display: flex; align-items: center; justify-content: space-between; background: rgba(200,170,110,0.02); position: relative; z-index: 1; transition: all 0.3s; cursor: pointer; }
        .collections-banner:hover { background: rgba(200,170,110,0.05); border-color: rgba(200,170,110,0.25); }
        .banner-left { display: flex; align-items: center; gap: 24px; }
        .banner-icon { width: 48px; height: 48px; border: 1px solid rgba(200,170,110,0.3); display: flex; align-items: center; justify-content: center; color: #c8aa6e; transform: rotate(45deg); }
        .banner-icon svg { transform: rotate(-45deg); }
        .banner-text { display: flex; flex-direction: column; gap: 4px; }
        .banner-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: #f5f0e8; letter-spacing: 1px; }
        .banner-sub { font-size: 10px; letter-spacing: 2px; color: rgba(245,240,232,0.35); text-transform: uppercase; }
        .banner-right { display: flex; align-items: center; gap: 32px; }
        .banner-stat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .banner-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #c8aa6e; font-weight: 300; }
        .banner-stat-label { font-size: 9px; letter-spacing: 2px; color: rgba(245,240,232,0.3); text-transform: uppercase; }
        .banner-vdivider { width: 1px; height: 40px; background: rgba(200,170,110,0.15); }
        .banner-cta { background: #c8aa6e; color: #0d0d0d; border: none; padding: 13px 32px; font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; cursor: pointer; font-weight: 500; transition: all 0.3s; }
        .banner-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(200,170,110,0.25); }

        .trending-section { background: #0a0a0a; padding: 120px 48px; position: relative; overflow: hidden; }
        .trending-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(200,170,110,0.3), transparent); }
        .trending-section::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 50%, rgba(200,170,110,0.03) 0%, transparent 60%); pointer-events: none; }
        .trending-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; position: relative; z-index: 1; }
        .filter-row { display: flex; gap: 8px; margin-bottom: 40px; position: relative; z-index: 1; flex-wrap: wrap; }
        .filter-pill { background: transparent; border: 1px solid rgba(200,170,110,0.2); color: rgba(245,240,232,0.45); padding: 8px 20px; font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.25s; border-radius: 1px; }
        .filter-pill:hover { border-color: rgba(200,170,110,0.5); color: rgba(245,240,232,0.8); }
        .filter-pill.active { background: #c8aa6e; border-color: #c8aa6e; color: #0d0d0d; font-weight: 500; }
        .carousel-outer { position: relative; z-index: 1; }
        .carousel-track-wrap { overflow: hidden; }
        .carousel-track { display: flex; gap: 20px; transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94); will-change: transform; }
        .piece-card { flex: 0 0 calc(25% - 15px); min-width: 0; background: #111; border: 1px solid rgba(200,170,110,0.08); position: relative; cursor: pointer; transition: border-color 0.3s, transform 0.3s; }
        .piece-card:hover { border-color: rgba(200,170,110,0.25); transform: translateY(-4px); }
        .piece-img-wrap { position: relative; overflow: hidden; aspect-ratio: 3/4; background: #161616; }
        .piece-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s; filter: brightness(0.85); }
        .piece-card:hover .piece-img { transform: scale(1.05); filter: brightness(0.7); }
        .piece-badge { position: absolute; top: 14px; left: 14px; z-index: 2; font-size: 8.5px; letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; border: 1px solid; font-weight: 500; backdrop-filter: blur(8px); }
        .wish-btn { position: absolute; top: 12px; right: 12px; z-index: 2; width: 34px; height: 34px; background: rgba(13,13,13,0.7); border: 1px solid rgba(200,170,110,0.2); display: flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(8px); transition: all 0.2s; opacity: 0; transform: translateY(-4px); }
        .piece-card:hover .wish-btn { opacity: 1; transform: translateY(0); }
        .wish-btn.active { background: rgba(200,170,110,0.15); border-color: #c8aa6e; }
        .wish-btn svg { transition: fill 0.2s; }
        .rent-bar { position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; padding: 10px 14px; background: linear-gradient(180deg, transparent, rgba(13,13,13,0.85)); display: flex; align-items: center; gap: 6px; opacity: 0; transition: opacity 0.3s; }
        .piece-card:hover .rent-bar { opacity: 1; }
        .rent-dot { width: 5px; height: 5px; border-radius: 50%; background: #c8aa6e; }
        .rent-text { font-size: 9.5px; letter-spacing: 1px; color: rgba(245,240,232,0.7); }
        .piece-body { padding: 18px 16px 20px; }
        .piece-designer { font-size: 9px; letter-spacing: 2.5px; color: #c8aa6e; text-transform: uppercase; margin-bottom: 6px; }
        .piece-name { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 400; color: #f5f0e8; line-height: 1.2; margin-bottom: 10px; }
        .piece-rating { display: flex; align-items: center; gap: 6px; margin-bottom: 14px; }
        .stars { display: flex; gap: 2px; }
        .star { color: #c8aa6e; font-size: 11px; }
        .star.half { opacity: 0.4; }
        .rating-count { font-size: 10px; color: rgba(245,240,232,0.3); letter-spacing: 0.5px; }
        .piece-sizes { display: flex; gap: 5px; margin-bottom: 16px; flex-wrap: wrap; }
        .size-chip { font-size: 9px; letter-spacing: 1px; color: rgba(245,240,232,0.4); border: 1px solid rgba(245,240,232,0.1); padding: 3px 7px; text-transform: uppercase; }
        .piece-price-row { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid rgba(200,170,110,0.08); }
        .piece-price-left { display: flex; flex-direction: column; gap: 2px; }
        .price-main { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: #f5f0e8; line-height: 1; }
        .price-sub { font-size: 9px; letter-spacing: 1.5px; color: rgba(245,240,232,0.3); text-transform: uppercase; }
        .price-original { font-size: 10px; color: rgba(245,240,232,0.2); text-decoration: line-through; letter-spacing: 0.5px; margin-top: 2px; }
        .piece-rent-btn { background: transparent; border: 1px solid rgba(200,170,110,0.35); color: #c8aa6e; padding: 9px 16px; font-family: 'Jost', sans-serif; font-size: 9.5px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.25s; }
        .piece-rent-btn:hover { background: #c8aa6e; color: #0d0d0d; border-color: #c8aa6e; }
        .carousel-nav { display: flex; gap: 10px; align-items: center; }
        .carousel-arrow { width: 44px; height: 44px; border: 1px solid rgba(200,170,110,0.25); background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; color: rgba(200,170,110,0.6); transition: all 0.25s; }
        .carousel-arrow:hover:not(:disabled) { border-color: #c8aa6e; color: #c8aa6e; background: rgba(200,170,110,0.06); }
        .carousel-arrow:disabled { opacity: 0.2; cursor: default; }
        .urgency-strip { margin-top: 48px; border: 1px solid rgba(200,170,110,0.1); padding: 20px 32px; display: flex; align-items: center; justify-content: space-between; background: rgba(200,170,110,0.02); position: relative; z-index: 1; }
        .urgency-left { display: flex; align-items: center; gap: 16px; }
        .urgency-pulse { width: 8px; height: 8px; border-radius: 50%; background: #c8aa6e; position: relative; }
        .urgency-pulse::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid rgba(200,170,110,0.4); animation: pulse 2s infinite; }
        .urgency-text { font-size: 11px; letter-spacing: 1.5px; color: rgba(245,240,232,0.5); }
        .urgency-text strong { color: #c8aa6e; font-weight: 500; }
        .urgency-cta { background: transparent; border: none; color: rgba(245,240,232,0.45); font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: color 0.2s; }
        .urgency-cta:hover { color: #c8aa6e; }

        @keyframes scrollDown { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(8px); opacity: 0; } }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0; } }

        @media (max-width: 1100px) { .piece-card { flex: 0 0 calc(33.33% - 14px); } }
        @media (max-width: 768px) {
          .main-nav { padding: 0 20px; }
          .nav-links { display: none; }
          .search-container { max-width: 150px; }
          .sub-nav { gap: 14px; padding: 10px 20px; flex-wrap: wrap; }
          .hero-content { padding: 0 20px; padding-top: 160px; }
          .hero-image-panel { width: 100%; opacity: 0.15; }
          .hero-stats { left: 20px; gap: 24px; }
          .hero-tag { right: 20px; }
          .hero-dots { right: 14px; }
          .hero-title { font-size: 42px; }
          .collections-section, .trending-section { padding: 80px 20px; }
          .section-header { flex-direction: column; align-items: flex-start; gap: 20px; }
          .trending-header { flex-direction: column; align-items: flex-start; gap: 20px; }
          .collections-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
          .coll-card-1,.coll-card-2,.coll-card-3,.coll-card-4,.coll-card-5,.coll-card-6 { grid-column: span 1; aspect-ratio: 3/4; }
          .piece-card { flex: 0 0 calc(50% - 10px); }
          .collections-banner, .urgency-strip { flex-direction: column; gap: 16px; align-items: flex-start; }
          .banner-right { flex-wrap: wrap; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="top-strip">Complimentary delivery on rentals above ₹2000 &nbsp;·&nbsp; New arrivals: Couture Gala Collection</div>
        <div className="main-nav">
          <a href="#" className="logo">
            <div className="logo-mark"><span className="logo-mark-inner">C</span></div>
            <div className="logo-text">
              <span className="logo-name">Cloto</span>
              <span className="logo-tagline">Luxury Cloth Rental</span>
            </div>
          </a>
          <ul className="nav-links">
            <li><a href="#">Women</a></li>
            <li><a href="#">Men</a></li>
            <li><a href="#">Bridal</a></li>
            <li><a href="#">Editorial</a></li>
          </ul>
          <div className="search-container">
            <div className={`search-wrapper ${searchFocused ? "focused" : ""}`}>
              <input type="text" placeholder="Search designers, styles…" className="search-input"
                onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} />
              <button className="search-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </button>
            </div>
          </div>
          <div className="nav-actions">
            <button className="nav-icon-btn">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <div className="ndivider" />
            <button className="nav-icon-btn">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
            <div className="ndivider" />
            <button className="nav-icon-btn" onClick={() => setCartCount(c => c + 1)}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <div className="ndivider" />
            <button className="btn-rent">Rent Now</button>
          </div>
        </div>
        <div className="sub-nav">
          {["New Arrivals","Gowns","Lehengas","Suits","Accessories","Designers","How It Works","Occasions"].map(item => (
            <a key={item} href="#">{item}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" style={{ background: slide.bg }} />
        <div className="hero-grain" />
        <div className="hero-image-panel">
          {heroSlides.map((s, i) => (
            <img key={i} src={s.imageUrl} alt=""
              className={`hero-img ${i === activeSlide ? "visible" : "hidden"}`}
              style={{ position: i === 0 ? "relative" : "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ))}
        </div>
        <div className="hero-divider" />
        <div className="hero-content" key={activeSlide}>
          <div className="hero-label">
            <span className="hero-label-line" />
            <span className="hero-label-text">{slide.label}</span>
          </div>
          <h1 className="hero-title">
            {slide.title.map((l, i) => <span key={i}>{l}</span>)}
          </h1>
          <p className="hero-sub">{slide.sub}</p>
          <div className="hero-ctas">
            <button className="cta-primary">{slide.cta}</button>
            <button className="cta-secondary">
              <span className="cta-secondary-arrow" />
              How it works
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">500+</span><span className="stat-label">Designers</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">12K</span><span className="stat-label">Pieces</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">3 Days</span><span className="stat-label">Min Rental</span></div>
        </div>
        <div className="hero-tag">
          <span className="hero-tag-label">Currently Featuring</span>
          <span className="hero-tag-value">{slide.tag}</span>
        </div>
        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`dot ${i === activeSlide ? "active" : ""}`} onClick={() => goToSlide(i)}>
              <span className="dot-fill" />
            </button>
          ))}
        </div>
        <div className="scroll-hint">
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
          <span className="scroll-hint-text">Scroll</span>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="collections-section">
        <div className="section-header">
          <div>
            <div className="section-label"><span className="section-label-line" /><span className="section-label-text">Curated For You</span></div>
            <h2 className="section-title">Shop by <em>Collection</em></h2>
          </div>
          <button className="section-view-all">
            View All Collections
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div className="collections-grid">
          {collections.map((c, idx) => (
            <div key={c.id} className={`coll-card coll-card-${idx + 1}`}>
              <img src={c.imageUrl} alt={c.title} className="coll-img" />
              <div className="coll-overlay" />
              <div className="coll-content">
                {c.tag && (
                  <span className="coll-tag" style={{ color: c.tagColor, borderColor: `${c.tagColor}50`, background: `${c.tagColor}12` }}>
                    {c.tag}
                  </span>
                )}
                <div className="coll-title">{c.title}</div>
                <div className="coll-desc">{c.desc}</div>
                <div className="coll-footer">
                  <span className="coll-count">{c.count}</span>
                  <div className="coll-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="collections-banner">
          <div className="banner-left">
            <div className="banner-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>
            </div>
            <div className="banner-text">
              <span className="banner-title">Explore All 721 Pieces</span>
              <span className="banner-sub">From 500+ designers · Updated weekly</span>
            </div>
          </div>
          <div className="banner-right">
            <div className="banner-stat"><span className="banner-stat-num">₹499</span><span className="banner-stat-label">Starts From</span></div>
            <div className="banner-vdivider" />
            <div className="banner-stat"><span className="banner-stat-num">4.9★</span><span className="banner-stat-label">Avg Rating</span></div>
            <div className="banner-vdivider" />
            <div className="banner-stat"><span className="banner-stat-num">48hr</span><span className="banner-stat-label">Fast Delivery</span></div>
            <div className="banner-vdivider" />
            <button className="banner-cta">Browse All</button>
          </div>
        </div>
      </section>

      {/* TRENDING PIECES */}
      <section className="trending-section">
        <div className="trending-header">
          <div>
            <div className="section-label"><span className="section-label-line" /><span className="section-label-text">What's Hot Right Now</span></div>
            <h2 className="section-title">Trending <em>This Week</em></h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px" }}>
            <div className="carousel-nav">
              <button className="carousel-arrow" disabled={carouselIndex === 0}
                onClick={() => setCarouselIndex(i => Math.max(0, i - 1))}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
              <button className="carousel-arrow" disabled={carouselIndex >= maxIndex}
                onClick={() => setCarouselIndex(i => Math.min(maxIndex, i + 1))}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
            <button className="section-view-all" style={{ marginBottom: 0 }}>
              View All Pieces
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <div className="filter-row">
          {filters.map(f => (
            <button key={f} className={`filter-pill ${activeFilter === f ? "active" : ""}`}
              onClick={() => { setActiveFilter(f); setCarouselIndex(0); }}>
              {f}
            </button>
          ))}
        </div>

        <div className="carousel-outer" ref={carouselRef}>
          <div className="carousel-track-wrap">
            <div
              className="carousel-track"
              style={{ transform: `translateX(calc(-${carouselIndex} * (25% + 5px)))` }}
            >
              {filteredPieces.map(piece => (
                <div key={piece.id} className="piece-card"
                  onMouseEnter={() => setHoveredCard(piece.id)}
                  onMouseLeave={() => setHoveredCard(null)}>
                  <div className="piece-img-wrap">
                    <img src={piece.imageUrl} alt={piece.name} className="piece-img" />
                    {piece.badge && (
                      <span className="piece-badge" style={{ color: piece.badgeColor, borderColor: `${piece.badgeColor}50`, background: `${piece.badgeColor}15` }}>
                        {piece.badge}
                      </span>
                    )}
                    <button className={`wish-btn ${wishlist.includes(piece.id) ? "active" : ""}`}
                      onClick={() => toggleWishlist(piece.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24"
                        fill={wishlist.includes(piece.id) ? "#c8aa6e" : "none"}
                        stroke={wishlist.includes(piece.id) ? "#c8aa6e" : "rgba(245,240,232,0.7)"}
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                    <div className="rent-bar">
                      <div className="rent-dot" />
                      <span className="rent-text">Rented <strong style={{ color: "#c8aa6e" }}>{piece.rentCount}</strong> times this month</span>
                    </div>
                  </div>
                  <div className="piece-body">
                    <div className="piece-designer">{piece.designer}</div>
                    <div className="piece-name">{piece.name}</div>
                    <div className="piece-rating">
                      <div className="stars">
                        {[1,2,3,4,5].map(s => (
                          <span key={s} className={`star ${s <= Math.floor(piece.rating) ? "" : "half"}`}>★</span>
                        ))}
                      </div>
                      <span className="rating-count">{piece.rating} ({piece.reviews})</span>
                    </div>
                    <div className="piece-sizes">
                      {piece.sizes.map(s => <span key={s} className="size-chip">{s}</span>)}
                    </div>
                    <div className="piece-price-row">
                      <div className="piece-price-left">
                        <span className="price-main">₹{piece.price.toLocaleString()}</span>
                        <span className="price-sub">/ {piece.duration}</span>
                        <span className="price-original">MRP ₹{piece.originalPrice.toLocaleString()}</span>
                      </div>
                      <button className="piece-rent-btn" onClick={() => setCartCount(c => c + 1)}>Rent</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="urgency-strip">
          <div className="urgency-left">
            <div className="urgency-pulse" />
            <span className="urgency-text">
              <strong>24 people</strong> are browsing pieces right now · <strong>3 pieces</strong> added to wishlist in the last hour
            </span>
          </div>
          <button className="urgency-cta">
            See What's Available
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>
    </>
  );
};

