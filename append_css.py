import os
filepath = r'c:\Users\birkan.seren\Desktop\air-team\style.css'
with open(filepath, 'r', encoding='utf-8') as f:
    css = f.read()

new_css = '''
/* ==============================
   PRODUCT DETAIL PAGE STYLES (BENTO GRID)
   ============================== */

.product-detail-page .detail-hero {
  padding: 180px 0 80px 0;
  background: linear-gradient(135deg, #18191c 0%, #2f343b 100%);
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.hero-bg-gradient {
  position: absolute;
  top: 0; right: 0; bottom: 0; width: 60%;
  background: radial-gradient(circle at 80% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}
.breadcrumb a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.3s ease;
}
.breadcrumb a:hover {
  color: var(--primary);
}
.breadcrumb i {
  font-size: 0.7rem;
}
.breadcrumb .active {
  color: var(--white);
  font-weight: 500;
}

.hero-titles .super-tag {
  display: inline-block;
  background: rgba(220, 38, 38, 0.15);
  color: var(--primary);
  padding: 0.35rem 0.85rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}
.hero-titles h1 {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  margin: 0;
  color: var(--white);
  text-transform: uppercase;
}

/* Tabs */
.product-tabs-wrapper {
  margin-top: -30px;
  margin-bottom: 3rem;
  position: relative;
  z-index: 10;
}

.model-switcher {
  display: inline-flex;
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.05);
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}

.model-tab {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.model-tab:hover {
  color: var(--white);
}

.model-tab.active {
  background: var(--primary);
  color: var(--white);
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
}

/* Tab contents */
.model-content {
  display: none;
  animation: fadeIn 0.5s ease forwards;
}

.model-content.active {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto auto;
  gap: 1.5rem;
}

.bento-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.bento-item:hover {
  transform: translateY(-2px);
  border-color: rgba(220, 38, 38, 0.5);
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.bento-image-box {
  grid-column: span 2;
  grid-row: span 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.bento-img-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.bento-img-wrapper img {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8));
  transition: transform 0.5s ease;
}

.bento-image-box:hover .bento-img-wrapper img {
  transform: scale(1.05);
}

.bento-cta {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
.bento-cta .btn { width: 100%; justify-content: center; }

.bento-desc-box {
  grid-column: span 2;
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
}

.bento-desc-box h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--white);
}

.bento-desc-box p {
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 1.05rem;
  margin-bottom: 1rem;
}

.bento-feature {
  grid-column: span 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.feature-icon {
  width: 60px; height: 60px;
  background: rgba(220, 38, 38, 0.1);
  color: var(--primary);
  border-radius: 50%;
  border: 1px solid rgba(220, 38, 38, 0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.bento-feature:hover .feature-icon {
  background: var(--primary);
  color: var(--white);
  transform: translateY(-5px);
}

.bento-feature h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--white);
}
.bento-feature p {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
}

.bento-specs {
  grid-column: span 4;
  display: flex;
  justify-content: space-around;
  background: rgba(220, 38, 38, 0.05);
  border: 1px solid rgba(220, 38, 38, 0.15);
}

.spec-highlight {
  text-align: center;
}

.spec-highlight h3 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary);
  margin: 0 0 0.5rem 0;
  line-height: 1;
}

.spec-highlight span {
  font-size: 0.9rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 991px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
  }
  .bento-image-box, .bento-desc-box, .bento-specs {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .hero-titles h1 {
    font-size: 2.8rem;
  }
  .bento-grid {
    grid-template-columns: 1fr;
  }
  .bento-image-box, .bento-desc-box, .bento-specs, .bento-feature {
    grid-column: span 1;
  }
  .bento-specs {
    flex-direction: column;
    gap: 2rem;
  }
}
'''
if "PRODUCT DETAIL PAGE STYLES" not in css:
    with open(filepath, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("CSS updated successfully")
else:
    print("CSS already contains detail page styles")
