# Makeup My Mind — CLAUDE.md

## What We're Building
Mobile-first beauty product tracker. User photos their vanity → app detects products → user rates them (skip/fine/must) → shares link with friends for their verdict. Prototype only: no real backend, hardcoded data, browser state.

**Vercel deploy → shareable link for friend validation.**

---

## Tech Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS
- No database. No auth. State: React useState only.
- Fonts: Fraunces (display/italic) + Inter Tight (sans) via Google Fonts
- Deploy: Vercel (auto from GitHub)

---

## Screens & Flow

```
Login → Camera (mock scan) → Products (rate) → Share → Friend View
                                   ↓
                              Library Tab (4 sub-views)
```

### Screen 1 — Login
- Italic serif headline: "What Are You Wearing?"
- Subtitle: "Snap your vanity. Decide what stays, what goes, what to try."
- Email + password underline fields (no box, just border-bottom)
- "Sign in" pill CTA → goes to Camera
- Apple / Google SSO buttons (decorative)
- "New here? Create account" footer link (decorative)

### Screen 2 — Camera / Scan
- Headline: "Lay your bag out. *Good lighting, please.*"
- Viewfinder box (dashed border): shows corner brackets when idle
- "Take photo" button → triggers 2s mock scan animation
- Scan animation: colored product silhouettes + detection boxes + scan line + "DETECTED 8 PRODUCTS" status bar
- "Upload from library" secondary button (decorative)
- After scan complete → auto-navigate to Products

### Screen 3 — Products (core screen)
- Header: "What Are You *Wearing?*" + scan date
- Progress bar: X/16 rated · N must · N fine · N skip
- Products grouped by section (Skincare, Primer, Base, Eyes, Lips, Cheeks, Eyebrows, Hair)
- Sections collapse/expand; empty sections faded + non-interactive
- Each product card: SVG bottle visual | brand (allcaps tiny) | product name | shade dot + shade name | price | [skip][fine][must] pill buttons
- Rating states: must = accent color + glow, skip = 42% opacity card, fine = muted
- "Share my picks →" sticky bottom CTA

### Screen 4 — Share
- User's unique link: `wya.ren/[handle]`
- Stats: N must · N fine · N skip
- "Copy link" + share icons (Twitter, Instagram, iMessage)
- QR code placeholder block
- Preview of top 4 must-have products

### Screen 5 — Friend View (received link)
- "What *Emma's* wearing" header with avatar initial
- Quote bubble: "Here's what I'm wearing today — tell me which ones I should keep ✨"
- Must-haves section first, then everything else
- Each card shows Emma's rating badge + friend's own [skip][fine][must] buttons
- "Send Emma my verdict" accent CTA

### Library (Tab Bar)
4 tabs: People | Products | Arsenal | Shopping

**People tab**: Friends list + Influencers (Linktree imports). Each person card: avatar initial, gradient bg, name, note, mini product strip. "+ Paste a Linktree URL" dashed button at bottom. Linktree sheet: URL input → fake 1.4s fetch → preview products → "Save to my circle."

**Products tab**: All products aggregated across your circle. Filter by section. Each card shows who has it + their ratings as colored dots.

**Arsenal tab**: Your own rated products. Filter by must/fine/skip. Counts banner at top.

**Shopping tab**: Skip-rated products shown as "try this instead" with alternative suggestions.

---

## Design System

### Colors — use "rose" theme as default
```
bg:         #FBF6F2   (warm off-white)
surface:    #FFFFFF
cardBg:     #F7F0EA
ink:        #2B1F1C   (near-black warm)
inkMuted:   #7A6B63
inkFaint:   #B8A89F
accent:     #D97A7A   (dusty rose)
accentSoft: #F5D9D4
accentDeep: #A8484C
positive:   #6B8E5C
line:       #EADFD6
```

### Typography
```css
--font-display: 'Fraunces', Georgia, serif;   /* headlines, italic flourishes */
--font-sans:    'Inter Tight', system-ui;      /* body, buttons, labels */
--font-mono:    'JetBrains Mono', monospace;   /* stats, codes, tags */
```

Rules:
- Headlines: Fraunces, italic on key words, tracking -0.6px, weight 400
- Section labels: Fraunces italic, 15-17px
- Body/buttons: Inter Tight
- Stat labels: JetBrains Mono, 9-10px, ALL CAPS, letter-spacing 1-1.5px
- Brand names: 9px, letter-spacing 1.5, ALL CAPS, inkMuted

### Spacing & Radius
- Phone safe area top: 62px padding-top
- Card border-radius: 14px
- CTA pill: border-radius 999px, height 54-56px
- Section padding: 20px sides, 100px bottom (tab bar clearance)
- Card padding: 10-12px

### Buttons
- Primary: `background: ink, color: surface` (or accent for friend view)
- Secondary: `border: 1px solid line, background: transparent`
- Rating pills: 3 pills side by side — skip (warm gray) / fine (light brown #C9B4A3) / must (accent)

---

## Data

### Products (16 items)
Each product: `{ id, brand, name, shade, category, section, shadeHex, price, bottle, bottleColor }`

Sections: skincare | primer | base | eyes | lips | cheeks | eyebrows | hair

Key products to hardcode:
```js
{ id:'p1',  brand:'Rare Beauty',       name:'Soft Pinch Liquid Blush',      shade:'Joy',            section:'cheeks',   shadeHex:'#E56B7A', price:'$23', bottle:'dropper'      }
{ id:'p2',  brand:'Charlotte Tilbury', name:'Pillow Talk Lipstick',         shade:'Original',       section:'lips',     shadeHex:'#C08878', price:'$38', bottle:'lipstick'     }
{ id:'p3',  brand:'Dior',              name:'Forever Skin Glow Foundation', shade:'2N Neutral',     section:'base',     shadeHex:'#DAB29A', price:'$56', bottle:'tall'         }
{ id:'p4',  brand:'Nars',              name:'Orgasm Blush',                 shade:'Orgasm',         section:'cheeks',   shadeHex:'#D69A86', price:'$34', bottle:'compact'      }
{ id:'p5',  brand:'Fenty Beauty',      name:'Gloss Bomb Lip Luminizer',     shade:'Fenty Glow',     section:'lips',     shadeHex:'#C8857D', price:'$22', bottle:'wand'         }
{ id:'p6',  brand:'Laneige',           name:'Lip Sleeping Mask',            shade:'Berry',          section:'lips',     shadeHex:'#A44B5C', price:'$24', bottle:'jar'          }
{ id:'p7',  brand:'Glossier',          name:'Boy Brow',                     shade:'Brown',          section:'eyebrows', shadeHex:'#6B4A3A', price:'$18', bottle:'mascara'      }
{ id:'p8',  brand:'YSL',               name:'Touche Éclat Highlighter',     shade:'No.2 Ivory',     section:'base',     shadeHex:'#F0D4B8', price:'$42', bottle:'click-pen'    }
{ id:'p9',  brand:'Urban Decay',       name:'All Nighter Setting Spray',    shade:null,             section:'base',     shadeHex:null,      price:'$35', bottle:'spray'        }
{ id:'p10', brand:'Maybelline',        name:'Lash Sensational Mascara',     shade:'Very Black',     section:'eyes',     shadeHex:'#0A0A0A', price:'$11', bottle:'mascara'      }
{ id:'p11', brand:'Tower 28',          name:'BeachPlease Lip + Cheek',      shade:'Power Hour',     section:'cheeks',   shadeHex:'#E88A8F', price:'$22', bottle:'jar'          }
{ id:'p12', brand:'Merit',             name:'Signature Lip Matte',          shade:'Cabernet',       section:'lips',     shadeHex:'#732234', price:'$24', bottle:'lipstick'     }
{ id:'p13', brand:'Kosas',             name:'Revealer Concealer',           shade:'Tone 4.5',       section:'base',     shadeHex:'#D9AE8A', price:'$30', bottle:'wand'         }
{ id:'p14', brand:'Rhode',             name:'Peptide Lip Treatment',        shade:'Watermelon Slice',section:'lips',    shadeHex:'#E8708A', price:'$16', bottle:'squeeze-tube' }
{ id:'p15', brand:'Saie',              name:'Dew Balm',                     shade:'Mauve',          section:'cheeks',   shadeHex:'#B56B7C', price:'$26', bottle:'balm-stick'   }
{ id:'p16', brand:'Patrick Ta',        name:'Major Glow Highlighter',       shade:"She's Golden",   section:'base',     shadeHex:'#E8C88A', price:'$38', bottle:'compact'      }
```

### People (5 people)
Friends: Emma Chen (p1-p8, musts: p1,p3,p6,p8), Maya Patel (p2,p5,p11,p13,p14), Sofia Ramirez (p2,p6,p12,p14,p15)
Influencers: Jackie Aina (p2,p3,p4,p8,p10,p16 all must), Hailey Bieber (p3,p13,p14 all must)

### Ratings
3-value enum: `'skip' | 'fine' | 'must'`
Default user ratings: `{ p1:'must', p2:'fine', p3:'must', p4:'skip', p5:'fine', p6:'must', p7:'fine', p8:'must', p11:'must', p13:'fine', p14:'must' }`

---

## Product Bottle SVGs
Render inline SVG per bottle type. Each uses a vertical gradient (lighter left edge = highlight). Types:
- `lipstick` — rectangular case + angled bullet tip
- `tall` — rectangle with dark cap + liquid fill inside
- `compact` — horizontal ellipse/clamshell, open view
- `dropper` — bulb top + glass body with liquid
- `wand` — cap + tube (concealer/gloss)
- `jar` — squat cylinder, open lid
- `mascara` — thin tall tube
- `click-pen` — narrow with pointed tip (YSL Touche Éclat)
- `spray` — wider body with nozzle
- `squeeze-tube` — tapered tube with crimp bottom
- `balm-stick` — short twist-up stick

Place SVG in a `div` with `background: cardBg`, centered, with a soft ellipse shadow underneath (blur 6px, 8px tall, 55% width).

---

## Routing (Next.js App Router)

```
/                    → LoginScreen
/scan                → CameraScreen  
/products            → ProductsScreen
/share               → ShareScreen
/friend/[handle]     → FriendScreen (public, no auth)
/library             → Library (tab bar: people | products | arsenal | shopping)
```

State flows forward via URL params or React context. No persistence needed.

---

## Animation
- Scan line: CSS `@keyframes scanline { 0%{top:0%} 100%{top:100%} }` loop 1.8s
- Detection boxes: fade in with slight scale-down, staggered 0.25s per box
- Rating pill: `transition: all 0.2s`, background + shadow appear on select
- Progress bar: `transition: width 0.4s`
- Card opacity on skip: `transition: opacity 0.25s`

---

## Build Commands
```bash
npx create-next-app@latest makeup-my-mind --typescript --tailwind --app
cd makeup-my-mind
npm install
# Add Google Fonts to app/layout.tsx: Fraunces + Inter_Tight
npm run dev    # test at localhost:3000
# Push to GitHub → connect Vercel → auto-deploy
```

---

## Key UX Rules
1. **Mobile-first**: max-width 430px container, centered on desktop with phone frame shadow
2. **No required fields**: sharing available at any point
3. **Skip = fade** the card (42% opacity), not hide it
4. **Must = glow** — `box-shadow: 0 0 0 3px accent22, 0 8px 24px accent33`
5. Friend view: show sharer's rating as colored dot badge on product image (top-left)
6. Linktree import: fake 1.4s fetch delay → show product preview → confirm to add
7. Tab bar: fixed bottom, 28px padding-bottom (iOS home indicator clearance)
