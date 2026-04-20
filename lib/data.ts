export type Rating = 'skip' | 'fine' | 'must'
export type SkinType = 'oily' | 'combo' | 'dry' | 'normal'

export const SKIN_CONCERNS = [
  'Dry patches',
  'Acne prone',
  'Eczema',
  'Texture',
  'Hyperpigmentation',
  'Redness',
  'Fine lines',
  'Sensitivity',
  'Oiliness',
  'Dark circles',
]

export type BottleType =
  | 'lipstick'
  | 'tall'
  | 'compact'
  | 'dropper'
  | 'wand'
  | 'jar'
  | 'mascara'
  | 'click-pen'
  | 'spray'
  | 'squeeze-tube'
  | 'balm-stick'

export type SectionKey =
  | 'skincare'
  | 'primer'
  | 'base'
  | 'eyes'
  | 'lips'
  | 'cheeks'
  | 'eyebrows'
  | 'hair'

export interface Product {
  id: string
  brand: string
  name: string
  shade: string | null
  section: SectionKey
  shadeHex: string | null
  price: string
  bottle: BottleType
  bottleColor: string
}

export interface Person {
  id: string
  name: string
  handle: string
  type: 'friend' | 'influencer'
  note: string
  avatarGradient: [string, string]
  avatarColor: string
  products: string[]
  musts: string[]
}

export interface SectionMeta {
  key: SectionKey
  label: string
}

export const SECTIONS: SectionMeta[] = [
  { key: 'skincare',  label: 'Skincare'  },
  { key: 'primer',   label: 'Primer'    },
  { key: 'base',     label: 'Base'      },
  { key: 'eyes',     label: 'Eyes'      },
  { key: 'lips',     label: 'Lips'      },
  { key: 'cheeks',   label: 'Cheeks'    },
  { key: 'eyebrows', label: 'Eyebrows'  },
  { key: 'hair',     label: 'Hair'      },
]

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    brand: 'Rare Beauty',
    name: 'Soft Pinch Liquid Blush',
    shade: 'Joy',
    section: 'cheeks',
    shadeHex: '#E56B7A',
    price: '$23',
    bottle: 'dropper',
    bottleColor: '#E8B4B8',
  },
  {
    id: 'p2',
    brand: 'Charlotte Tilbury',
    name: 'Pillow Talk Lipstick',
    shade: 'Original',
    section: 'lips',
    shadeHex: '#C08878',
    price: '$38',
    bottle: 'lipstick',
    bottleColor: '#C8A0A0',
  },
  {
    id: 'p3',
    brand: 'Dior',
    name: 'Forever Skin Glow Foundation',
    shade: '2N Neutral',
    section: 'base',
    shadeHex: '#DAB29A',
    price: '$56',
    bottle: 'tall',
    bottleColor: '#E8D4C4',
  },
  {
    id: 'p4',
    brand: 'NARS',
    name: 'Orgasm Blush',
    shade: 'Orgasm',
    section: 'cheeks',
    shadeHex: '#D69A86',
    price: '$34',
    bottle: 'compact',
    bottleColor: '#1C1C1C',
  },
  {
    id: 'p5',
    brand: 'Fenty Beauty',
    name: 'Gloss Bomb Lip Luminizer',
    shade: 'Fenty Glow',
    section: 'lips',
    shadeHex: '#C8857D',
    price: '$22',
    bottle: 'wand',
    bottleColor: '#F0B8A8',
  },
  {
    id: 'p6',
    brand: 'Laneige',
    name: 'Lip Sleeping Mask',
    shade: 'Berry',
    section: 'lips',
    shadeHex: '#A44B5C',
    price: '$24',
    bottle: 'jar',
    bottleColor: '#D4A0B0',
  },
  {
    id: 'p7',
    brand: 'Glossier',
    name: 'Boy Brow',
    shade: 'Brown',
    section: 'eyebrows',
    shadeHex: '#6B4A3A',
    price: '$18',
    bottle: 'mascara',
    bottleColor: '#F0E8D8',
  },
  {
    id: 'p8',
    brand: 'YSL',
    name: 'Touche Éclat Highlighter',
    shade: 'No.2 Ivory',
    section: 'base',
    shadeHex: '#F0D4B8',
    price: '$42',
    bottle: 'click-pen',
    bottleColor: '#C8A020',
  },
  {
    id: 'p9',
    brand: 'Urban Decay',
    name: 'All Nighter Setting Spray',
    shade: null,
    section: 'base',
    shadeHex: null,
    price: '$35',
    bottle: 'spray',
    bottleColor: '#2C2C2C',
  },
  {
    id: 'p10',
    brand: 'Maybelline',
    name: 'Lash Sensational Mascara',
    shade: 'Very Black',
    section: 'eyes',
    shadeHex: '#0A0A0A',
    price: '$11',
    bottle: 'mascara',
    bottleColor: '#C41E3A',
  },
  {
    id: 'p11',
    brand: 'Tower 28',
    name: 'BeachPlease Lip + Cheek',
    shade: 'Power Hour',
    section: 'cheeks',
    shadeHex: '#E88A8F',
    price: '$22',
    bottle: 'jar',
    bottleColor: '#F5C8A0',
  },
  {
    id: 'p12',
    brand: 'Merit',
    name: 'Signature Lip Matte',
    shade: 'Cabernet',
    section: 'lips',
    shadeHex: '#732234',
    price: '$24',
    bottle: 'lipstick',
    bottleColor: '#8A7060',
  },
  {
    id: 'p13',
    brand: 'Kosas',
    name: 'Revealer Concealer',
    shade: 'Tone 4.5',
    section: 'base',
    shadeHex: '#D9AE8A',
    price: '$30',
    bottle: 'wand',
    bottleColor: '#E8D8C0',
  },
  {
    id: 'p14',
    brand: 'Rhode',
    name: 'Peptide Lip Treatment',
    shade: 'Watermelon Slice',
    section: 'lips',
    shadeHex: '#E8708A',
    price: '$16',
    bottle: 'squeeze-tube',
    bottleColor: '#F5E8E0',
  },
  {
    id: 'p15',
    brand: 'Saie',
    name: 'Dew Balm',
    shade: 'Mauve',
    section: 'cheeks',
    shadeHex: '#B56B7C',
    price: '$26',
    bottle: 'balm-stick',
    bottleColor: '#E8C8D0',
  },
  {
    id: 'p16',
    brand: 'Patrick Ta',
    name: 'Major Glow Highlighter',
    shade: "She's Golden",
    section: 'base',
    shadeHex: '#E8C88A',
    price: '$38',
    bottle: 'compact',
    bottleColor: '#C8A850',
  },
]

export const MY_RATINGS: Record<string, Rating> = {
  p1:  'must',
  p2:  'fine',
  p3:  'must',
  p4:  'skip',
  p5:  'fine',
  p6:  'must',
  p7:  'fine',
  p8:  'must',
  p11: 'must',
  p13: 'fine',
  p14: 'must',
}

export const PEOPLE: Person[] = [
  {
    id: 'emma',
    name: 'Emma Chen',
    handle: 'emma-9f3x2',
    type: 'friend',
    note: 'dewy skin era forever',
    avatarGradient: ['#F5C2C0', '#E89090'],
    avatarColor: '#E89090',
    products: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'],
    musts: ['p1', 'p3', 'p6', 'p8'],
  },
  {
    id: 'maya',
    name: 'Maya Patel',
    handle: 'maya-2k8p1',
    type: 'friend',
    note: 'clean girl aesthetic',
    avatarGradient: ['#C0D8F5', '#8AB0E8'],
    avatarColor: '#8AB0E8',
    products: ['p2', 'p5', 'p11', 'p13', 'p14'],
    musts: ['p5', 'p14'],
  },
  {
    id: 'sofia',
    name: 'Sofia Ramirez',
    handle: 'sofia-4m7n3',
    type: 'friend',
    note: 'bold lips only',
    avatarGradient: ['#D4C0F5', '#A888E8'],
    avatarColor: '#A888E8',
    products: ['p2', 'p6', 'p12', 'p14', 'p15'],
    musts: ['p12', 'p15'],
  },
  {
    id: 'jackie',
    name: 'Jackie Aina',
    handle: 'jackieaina',
    type: 'influencer',
    note: 'makeup for all skin tones',
    avatarGradient: ['#F5D4A0', '#E8B060'],
    avatarColor: '#E8B060',
    products: ['p2', 'p3', 'p4', 'p8', 'p10', 'p16'],
    musts: ['p2', 'p3', 'p4', 'p8', 'p10', 'p16'],
  },
  {
    id: 'hailey',
    name: 'Hailey Bieber',
    handle: 'haileybieber',
    type: 'influencer',
    note: 'glazed donut everything',
    avatarGradient: ['#F5E4D0', '#E8C8A0'],
    avatarColor: '#E8C8A0',
    products: ['p3', 'p13', 'p14'],
    musts: ['p3', 'p13', 'p14'],
  },
]
