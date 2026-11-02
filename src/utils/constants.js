export const COLORS = {
  deepOcean: '#031B35',
  oceanBlue: '#075985',
  aqua: '#06B6D4',
  cyan: '#67E8F9',
  seaGreen: '#0F766E',
  white: '#F8FAFC',
  lightBlue: '#E0F2FE',
  darkOcean: '#011627',
};

export const FISH_SPECIES = [
  {
    id: 'clownfish',
    name: 'Clownfish',
    scientificName: 'Amphiprion ocellaris',
    description: 'Bright orange with white bands, lives in symbiosis with sea anemones.',
    habitat: 'Coral Reefs',
    depth: '1-15m',
    size: '8-11 cm',
    color: '#FF6B35',
  },
  {
    id: 'blue-tang',
    name: 'Blue Tang',
    scientificName: 'Paracanthurus hepatus',
    description: 'Vibrant blue body with black palette design and yellow tail.',
    habitat: 'Coral Reefs',
    depth: '2-40m',
    size: '12-25 cm',
    color: '#0077BE',
  },
  {
    id: 'manta-ray',
    name: 'Manta Ray',
    scientificName: 'Mobula birostris',
    description: 'Gentle giant with wingspan up to 7 meters, filter feeder.',
    habitat: 'Open Ocean',
    depth: '0-1000m',
    size: '4-7 m',
    color: '#4A4A4A',
  },
  {
    id: 'sea-turtle',
    name: 'Green Sea Turtle',
    scientificName: 'Chelonia mydas',
    description: 'Ancient mariners that navigate across oceans using Earth magnetic field.',
    habitat: 'Coastal Waters',
    depth: '0-100m',
    size: '1-1.5 m',
    color: '#2E8B57',
  },
  {
    id: 'lionfish',
    name: 'Lionfish',
    scientificName: 'Pterois volitans',
    description: 'Venomous spines with striking red and white zebra-like stripes.',
    habitat: 'Coral Reefs',
    depth: '1-75m',
    size: '30-35 cm',
    color: '#DC143C',
  },
  {
    id: 'mandarinfish',
    name: 'Mandarinfish',
    scientificName: 'Synchiropus splendidus',
    description: 'One of the most colorful fish with psychedelic blue and orange patterns.',
    habitat: 'Coral Reefs',
    depth: '1-18m',
    size: '6-7 cm',
    color: '#00FFFF',
  },
];

export const ECOSYSTEMS = [
  {
    id: 'coral-reefs',
    title: 'Coral Reefs',
    description: 'Rainforests of the sea, hosting 25% of all marine species in less than 1% of ocean area.',
    icon: '🪸',
    color: '#FF6B6B',
    depth: '0-60m',
    biodiversity: 'Very High',
  },
  {
    id: 'kelp-forests',
    title: 'Kelp Forests',
    description: 'Underwater towers of giant algae providing shelter and food for diverse marine life.',
    icon: '🌿',
    color: '#4ECDC4',
    depth: '10-30m',
    biodiversity: 'High',
  },
  {
    id: 'open-ocean',
    title: 'Open Ocean',
    description: 'Vast pelagic zone where migratory giants roam and microscopic life drives global cycles.',
    icon: '🌊',
    color: '#06B6D4',
    depth: '0-11000m',
    biodiversity: 'Moderate',
  },
  {
    id: 'deep-sea',
    title: 'Deep Sea',
    description: 'Mysterious abyss with bioluminescent creatures adapted to extreme pressure and darkness.',
    icon: '🔦',
    color: '#6366F1',
    depth: '200-11000m',
    biodiversity: 'Unique',
  },
  {
    id: 'mangroves',
    title: 'Mangrove Forests',
    description: 'Coastal guardians where roots create nurseries for juvenile fish and protect shorelines.',
    icon: '🌳',
    color: '#10B981',
    depth: '0-10m',
    biodiversity: 'High',
  },
  {
    id: 'seagrass',
    title: 'Seagrass Meadows',
    description: 'Underwater prairies that store carbon 35x faster than rainforests and feed dugongs.',
    icon: '🌱',
    color: '#84CC16',
    depth: '1-50m',
    biodiversity: 'High',
  },
];

export const STATISTICS = [
  { label: 'Oceans Covered', value: '71%', suffix: '%' },
  { label: 'Known Species', value: '240K', suffix: '+' },
  { label: 'Coral Reefs Lost', value: '50%', suffix: '%' },
  { label: 'Marine Protected', value: '8%', suffix: '%' },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Dr. Sylvia Earle',
    role: 'Marine Biologist & Explorer',
    quote: 'The ocean is the blue heart of the planet. We must protect it as if our lives depend on it — because they do.',
    avatar: 'SE',
  },
  {
    id: 2,
    name: 'Jacques Cousteau',
    role: 'Oceanographer & Filmmaker',
    quote: 'The sea, once it casts its spell, holds one in its net of wonder forever.',
    avatar: 'JC',
  },
  {
    id: 3,
    name: 'Dr. Enric Sala',
    role: 'National Geographic Explorer',
    quote: 'Marine reserves are not just about protecting fish. They are about protecting our future.',
    avatar: 'ES',
  },
  {
    id: 4,
    name: 'Asha de Vos',
    role: 'Marine Biologist',
    quote: 'Every second breath you take comes from the ocean. Protecting it is not optional, it is essential.',
    avatar: 'AV',
  },
];

export const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#exploration', label: 'Exploration' },
  { href: '#marine-life', label: 'Marine Life' },
  { href: '#ecosystems', label: 'Ecosystems' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#conservation', label: 'Conservation' },
];

export const FOOTER_LINKS = {
  explore: [
    { label: 'Ocean Exploration', href: '#exploration' },
    { label: 'Marine Species', href: '#marine-life' },
    { label: 'Ecosystems', href: '#ecosystems' },
    { label: 'Photo Gallery', href: '#gallery' },
  ],
  learn: [
    { label: 'Conservation', href: '#conservation' },
    { label: 'Research', href: '#' },
    { label: 'Education', href: '#' },
    { label: 'Documentaries', href: '#' },
  ],
  support: [
    { label: 'Donate', href: '#' },
    { label: 'Volunteer', href: '#' },
    { label: 'Adopt a Reef', href: '#' },
    { label: 'Corporate Partners', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Accessibility', href: '#' },
  ],
};