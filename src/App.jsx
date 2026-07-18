import { useState, useEffect } from 'react'
import './index.css'

// Initial Mock Data
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'Vintage 1969 Mustang Mach 1',
    category: 'Car',
    image: '/image1.jpeg',
    currentBid: 45000,
    highestBidder: 'Alex J.',
    endTime: new Date(Date.now() + 3600000).toISOString(),
    status: 'live',
    vendorId: 'v1',
    bidHistory: [
      { id: 101, bidder: 'Alex J.', amount: 45000, time: new Date(Date.now() - 500000).toISOString() },
      { id: 102, bidder: 'Marcus', amount: 42000, time: new Date(Date.now() - 1500000).toISOString() }
    ]
  },
  {
    id: 2,
    title: 'Mid-Century Modern Lounge Chair',
    category: 'Furniture',
    image: 'https://picsum.photos/seed/furn1/800/600',
    currentBid: 1200,
    highestBidder: 'Sarah M.',
    endTime: new Date(Date.now() + 150000).toISOString(),
    status: 'live',
    vendorId: 'v1',
    bidHistory: [
      { id: 103, bidder: 'Sarah M.', amount: 1200, time: new Date(Date.now() - 10000).toISOString() }
    ]
  },
  {
    id: 3,
    title: 'Abstract Oil Painting - "Ocean Breeze"',
    category: 'Painting',
    image: 'https://picsum.photos/seed/paint1/800/600',
    currentBid: 8500,
    highestBidder: 'David K.',
    endTime: new Date(Date.now() - 10000).toISOString(),
    status: 'ended',
    vendorId: 'v2',
    bidHistory: []
  },
  {
    id: 4,
    title: 'Rolex Submariner Date',
    category: 'Watch',
    image: 'https://picsum.photos/seed/watch1/800/600',
    currentBid: 12500,
    highestBidder: 'James Bond',
    endTime: new Date(Date.now() + 7200000).toISOString(),
    status: 'live',
    vendorId: 'v2',
    bidHistory: []
  },
  {
    id: 5,
    title: 'Classic 1950s Aston Martin',
    category: 'Car',
    image: 'https://picsum.photos/seed/car2/800/600',
    currentBid: 125000,
    highestBidder: 'No bids yet',
    endTime: new Date(Date.now() + 86400000).toISOString(),
    status: 'live',
    vendorId: 'v1',
    bidHistory: []
  },
  {
    id: 6,
    title: 'Minimalist Wooden Desk',
    category: 'Furniture',
    image: 'https://picsum.photos/seed/furn2/800/600',
    currentBid: 450,
    highestBidder: 'Emma W.',
    endTime: new Date(Date.now() + 450000).toISOString(),
    status: 'live',
    vendorId: 'v2',
    bidHistory: []
  },
  {
    id: 7,
    title: 'Contemporary Canvas Art',
    category: 'Painting',
    image: 'https://picsum.photos/seed/paint2/800/600',
    currentBid: 3200,
    highestBidder: 'No bids yet',
    endTime: new Date(Date.now() + 10800000).toISOString(),
    status: 'live',
    vendorId: 'v1',
    bidHistory: []
  },
  {
    id: 8,
    title: 'Omega Speedmaster Professional',
    category: 'Watch',
    image: 'https://picsum.photos/seed/watch2/800/600',
    currentBid: 5600,
    highestBidder: 'Astronaut',
    endTime: new Date(Date.now() + 360000).toISOString(),
    status: 'live',
    vendorId: 'v2',
    bidHistory: []
  },
  {
    id: 9,
    title: 'Antique Gold Pocket Watch',
    category: 'Watch',
    image: 'https://picsum.photos/seed/watch3/800/600',
    currentBid: 2100,
    highestBidder: 'No bids yet',
    endTime: new Date(Date.now() + 5000000).toISOString(),
    status: 'live',
    vendorId: 'v1',
    bidHistory: []
  },
  {
    id: 10,
    title: 'Luxury Modern Velvet Sofa',
    category: 'Furniture',
    image: 'https://picsum.photos/seed/furn3/800/600',
    currentBid: 1850,
    highestBidder: 'Michael T.',
    endTime: new Date(Date.now() + 2000000).toISOString(),
    status: 'live',
    vendorId: 'v2',
    bidHistory: []
  },
  {
    id: 11,
    title: 'Vibrant Pop Art Portrait',
    category: 'Painting',
    image: 'https://picsum.photos/seed/paint3/800/600',
    currentBid: 4200,
    highestBidder: 'No bids yet',
    endTime: new Date(Date.now() + 8000000).toISOString(),
    status: 'live',
    vendorId: 'v1',
    bidHistory: []
  },
  {
    id: 12,
    title: '2024 Porsche 911 GT3 RS',
    category: 'Car',
    image: 'https://picsum.photos/seed/car3/800/600',
    currentBid: 245000,
    highestBidder: 'Racer X',
    endTime: new Date(Date.now() + 15000000).toISOString(),
    status: 'live',
    vendorId: 'v2',
    bidHistory: []
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('auth'); // start at auth
  const [user, setUser] = useState(null); // { name, role: 'vendor' | 'customer', id }
  const [theme, setTheme] = useState('dark');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const navigateTo = (page, product = null) => {
    if (!user && page !== 'auth') return setCurrentPage('auth');
    setCurrentPage(page);
    if (product !== undefined) setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  const handleLogin = (role) => {
    setUser({ 
      name: role === 'vendor' ? 'Premium Auctions Inc.' : 'Hammad (Customer)', 
      role, 
      id: role === 'vendor' ? 'v1' : 'c1' 
    });
    setCurrentPage('home');
    addToast(`Logged in as ${role === 'vendor' ? 'Vendor' : 'Customer'}`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('auth');
    addToast('Logged out successfully', 'success');
  };

  return (
    <div className="app-wrapper">
      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.message}
          </div>
        ))}
      </div>

      {user && (
        <nav>
          <div className="container nav-content">
            <a href="#" className="logo" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Auctify</a>
            <div className="nav-links">
              <button className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} onClick={() => navigateTo('home')}>Browse</button>
              {user.role === 'vendor' && (
                <button className={`nav-link ${currentPage === 'vendor' ? 'active' : ''}`} onClick={() => navigateTo('vendor')}>Dashboard</button>
              )}
              <button className="nav-link" onClick={toggleTheme}>
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </button>
              <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }} onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </nav>
      )}

      <main className="container" style={{ padding: '2rem 1.5rem', minHeight: 'calc(100vh - 80px)' }}>
        {!user && currentPage === 'auth' && <Auth onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />}
        {user && currentPage === 'home' && <Home products={products} navigateTo={navigateTo} />}
        {user && currentPage === 'product' && <ProductDetails product={selectedProduct} products={products} setProducts={setProducts} user={user} addToast={addToast} />}
        {user && currentPage === 'vendor' && <VendorDashboard products={products} setProducts={setProducts} navigateTo={navigateTo} user={user} addToast={addToast} />}
      </main>
    </div>
  )
}

// ----------------------------------------------------
// AUTHENTICATION COMPONENT
// ----------------------------------------------------
function Auth({ onLogin, theme, toggleTheme }) {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        <button className="btn btn-outline" onClick={toggleTheme}>{theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</button>
      </div>
      <h1 className="logo" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>Auctify</h1>
      <div className="glass-card" style={{ padding: '3rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Welcome Back</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Choose your role to continue to the portfolio demo.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={() => onLogin('customer')} style={{ width: '100%', padding: '1rem' }}>
            Login as Customer
          </button>
          <button className="btn btn-outline" onClick={() => onLogin('vendor')} style={{ width: '100%', padding: '1rem' }}>
            Login as Vendor
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// HOME COMPONENT (Search & Filter)
// ----------------------------------------------------
function Home({ products, navigateTo }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Car', 'Furniture', 'Painting'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <h2>Live Auctions</h2>
          
          <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '400px' }}>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search products..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`btn ${category === cat ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: '999px', padding: '0.4rem 1.2rem' }}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          No products found matching your criteria.
        </div>
      ) : (
        <div className="grid-3">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={() => navigateTo('product', product)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// PRODUCT CARD COMPONENT
// ----------------------------------------------------
function ProductCard({ product, onClick }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isEnded, setIsEnded] = useState(product.status === 'ended');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(product.endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft('Auction Ended');
        setIsEnded(true);
      } else {
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [product.endTime]);

  return (
    <div className="glass-card" onClick={onClick} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.title} className="product-image" />
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
           {isEnded ? <span className="badge badge-ended">Ended</span> : <span className="badge badge-live">Live</span>}
        </div>
      </div>
      <div className="product-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{product.category}</div>
        <h3 className="product-title">{product.title}</h3>
        
        <div className="product-meta" style={{ marginTop: 'auto' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Current Bid</div>
            <div className="bid-amount">${product.currentBid.toLocaleString()}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Time Left</div>
            <div className={`timer ${isEnded ? 'timer-ended' : 'timer-critical'}`}>{timeLeft}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PRODUCT DETAILS COMPONENT (With Bid History)
// ----------------------------------------------------
function ProductDetails({ product, products, setProducts, user, addToast }) {
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [isEnded, setIsEnded] = useState(product.status === 'ended');

  const currentProduct = products.find(p => p.id === product.id);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(currentProduct.endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft('Auction Ended');
        if (!isEnded) {
          setIsEnded(true);
          if (currentProduct.status !== 'ended') {
            setProducts(prev => prev.map(p => p.id === currentProduct.id ? { ...p, status: 'ended' } : p));
            if (currentProduct.highestBidder === user.name) {
              addToast(`You won ${currentProduct.title}!`, 'success');
            } else {
              addToast(`Auction for ${currentProduct.title} ended.`, 'success');
            }
          }
        }
      } else {
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [currentProduct.endTime, currentProduct.status, setProducts, currentProduct.id, isEnded, user.name, currentProduct.title, currentProduct.highestBidder, addToast]);

  const handleBid = (e) => {
    e.preventDefault();
    const amount = Number(bidAmount);
    if (isNaN(amount) || amount <= currentProduct.currentBid) {
      addToast(`Bid must be higher than $${currentProduct.currentBid.toLocaleString()}`, 'error');
      return;
    }
    
    // Add to bid history
    const newBidHistory = [
      { id: Date.now(), bidder: user.name, amount: amount, time: new Date().toISOString() },
      ...(currentProduct.bidHistory || [])
    ];

    setProducts(prev => prev.map(p => p.id === currentProduct.id ? { 
      ...p, 
      currentBid: amount, 
      highestBidder: user.name,
      bidHistory: newBidHistory
    } : p));
    
    setBidAmount('');
    addToast('Bid placed successfully!', 'success');
  };

  if (!currentProduct) return <div>Product not found.</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        <div className="glass-card" style={{ position: 'sticky', top: '100px' }}>
           <img src={currentProduct.image} alt={currentProduct.title} style={{ width: '100%', display: 'block', maxHeight: '600px', objectFit: 'cover' }} />
        </div>
        
        <div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <span className="badge">{currentProduct.category}</span>
            {isEnded ? <span className="badge badge-ended">Ended</span> : <span className="badge badge-live">Live</span>}
          </div>
          
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>{currentProduct.title}</h1>
          
          <div className="glass" style={{ padding: '2rem', borderRadius: '12px', marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
              <div>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Current Highest Bid</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent)' }}>${currentProduct.currentBid.toLocaleString()}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--success)', marginTop: '0.5rem' }}>by {currentProduct.highestBidder}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Time Remaining</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: isEnded ? 'var(--danger)' : 'var(--text-primary)' }}>{timeLeft}</div>
              </div>
            </div>

            {isEnded ? (
              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '8px' }}>
                <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Auction Winner!</h3>
                <p>This item was won by <strong>{currentProduct.highestBidder}</strong> for ${currentProduct.currentBid.toLocaleString()}.</p>
              </div>
            ) : user.role === 'vendor' ? (
              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', color: 'var(--text-secondary)' }}>
                Vendors cannot place bids.
              </div>
            ) : (
              <form onSubmit={handleBid}>
                <div className="input-group">
                  <label className="input-label">Place Your Bid</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontWeight: '600' }}>$</span>
                    <input 
                      type="number" 
                      className="input-field" 
                      style={{ paddingLeft: '2rem', fontSize: '1.25rem', fontWeight: 'bold' }} 
                      placeholder={`${currentProduct.currentBid + 1}`}
                      value={bidAmount}
                      onChange={e => setBidAmount(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Place Bid Now</button>
              </form>
            )}
          </div>

          {/* Bid History Section */}
          <div className="glass" style={{ padding: '2rem', borderRadius: '12px', marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Bid History</h3>
            {currentProduct.bidHistory && currentProduct.bidHistory.length > 0 ? (
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {currentProduct.bidHistory.map((bid) => {
                  const date = new Date(bid.time);
                  return (
                    <div key={bid.id} className="bid-history-item">
                      <div>
                        <strong>{bid.bidder}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                        </div>
                      </div>
                      <div style={{ fontWeight: '700', color: 'var(--accent)' }}>
                        ${bid.amount.toLocaleString()}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No bids placed yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// VENDOR DASHBOARD (Stats & Add Product)
// ----------------------------------------------------
function VendorDashboard({ products, setProducts, navigateTo, user, addToast }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Car');
  const [image, setImage] = useState('');
  const [startBid, setStartBid] = useState('');
  const [durationHours, setDurationHours] = useState('24');

  // Filter vendor's products
  const vendorProducts = products.filter(p => p.vendorId === user.id);
  
  // Analytics
  const totalListings = vendorProducts.length;
  const activeListings = vendorProducts.filter(p => p.status === 'live').length;
  const totalRevenue = vendorProducts.filter(p => p.status === 'ended' && p.bidHistory.length > 0).reduce((sum, p) => sum + p.currentBid, 0);
  const totalBids = vendorProducts.reduce((sum, p) => sum + (p.bidHistory ? p.bidHistory.length : 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      title,
      category,
      image: image || 'https://picsum.photos/seed/random/800/600',
      currentBid: Number(startBid),
      highestBidder: 'No bids yet',
      endTime: new Date(Date.now() + Number(durationHours) * 60 * 60 * 1000).toISOString(),
      status: 'live',
      vendorId: user.id,
      bidHistory: []
    };

    setProducts(prev => [newProduct, ...prev]);
    addToast('Item listed successfully!', 'success');
    navigateTo('home');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Analytics</h2>
        
        <div className="stat-card">
          <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Total Revenue</div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>${totalRevenue.toLocaleString()}</div>
        </div>
        
        <div className="stat-card">
          <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Active Auctions</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>{activeListings}</div>
        </div>

        <div className="stat-card">
          <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Total Bids Received</div>
          <div className="stat-value">{totalBids}</div>
        </div>
      </div>
      
      <div>
        <h2 style={{ marginBottom: '2rem' }}>List a New Item</h2>
        <div className="glass" style={{ padding: '2.5rem', borderRadius: '12px' }}>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Product Title</label>
              <input required type="text" className="input-field" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. 2024 Porsche 911" />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="input-group">
                <label className="input-label">Category</label>
                <select className="input-field" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="Car">Car</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Painting">Painting</option>
                  <option value="Watch">Watch</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Starting Bid ($)</label>
                <input required type="number" className="input-field" value={startBid} onChange={e => setStartBid(e.target.value)} placeholder="0" min="0" />
              </div>
            </div>
            
            <div className="input-group">
              <label className="input-label">Image URL (Optional)</label>
              <input type="text" className="input-field" value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." />
            </div>

            <div className="input-group">
              <label className="input-label">Auction Duration (Hours)</label>
              <input required type="number" className="input-field" value={durationHours} onChange={e => setDurationHours(e.target.value)} min="1" max="168" />
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Create Auction Listing</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
