export interface ScienceFact {
  id: string;
  headline: string;
  fact: string;
  detail: string;
  organOrSystem: string;
  source: string;
}

export const SCIENCE_FACTS: ScienceFact[] = [
  {
    id: 'f1',
    headline: 'The Electric Mind',
    fact: 'Your brain produces enough electricity while awake to illuminate a low-wattage LED bulb.',
    detail: 'Biochemical electrical gradients across 86 billion neurons generate roughly 12 to 25 watts of electrical power continuously.',
    organOrSystem: 'Brain & Nervous System',
    source: 'NIH / National Institute of Neurological Disorders'
  },
  {
    id: 'f2',
    headline: 'Continuous Lifeline',
    fact: 'Your heart beats over 100,000 times a day and pumps 2,000 gallons of blood.',
    detail: 'Over an average lifetime, this muscular marvel contracts more than 2.5 billion times without a single second of rest.',
    organOrSystem: 'Heart & Cardiovascular System',
    source: 'American Heart Association / MedlinePlus'
  },
  {
    id: 'f3',
    headline: 'Tennis Court In Your Chest',
    fact: 'If flattened out, the interior gas exchange surface of your lungs would cover half a tennis court.',
    detail: 'Between 300 and 500 million microscopic alveoli create an astonishing 70 to 100 square meters of contact surface for oxygen diffusion.',
    organOrSystem: 'Lungs & Respiratory System',
    source: 'National Heart, Lung, and Blood Institute (NHLBI)'
  },
  {
    id: 'f4',
    headline: 'The Master Recycler',
    fact: 'Your liver can regrow to full size even if two-thirds of it has been removed.',
    detail: 'Hepatocyte cells can enter rapid mitotic division upon sensing reduced organ mass, restoring complete metabolic volume.',
    organOrSystem: 'Liver & Digestive System',
    source: 'National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)'
  },
  {
    id: 'f5',
    headline: 'Acid Proof Shield',
    fact: 'Stomach acid is strong enough to dissolve zinc, yet your stomach protects itself completely.',
    detail: 'A dense alkaline mucus barrier infused with bicarbonate ions is constantly secreted and regenerated every 3 to 4 days.',
    organOrSystem: 'Stomach & Gastrointestinal System',
    source: 'MedlinePlus Medical Encyclopedia'
  },
  {
    id: 'f6',
    headline: 'Precision Nano-Filters',
    fact: 'Your kidneys filter your entire circulating blood volume more than 30 times every single day.',
    detail: 'Approximately 2 million microscopic nephrons filter 180 liters of fluid, selectively reabsorbing 99% of essential nutrients.',
    organOrSystem: 'Kidneys & Urinary System',
    source: 'National Kidney Foundation / NIH'
  },
  {
    id: 'f7',
    headline: 'Your Second Brain',
    fact: 'Roughly 90% of the body’s serotonin is synthesized inside your digestive intestines.',
    detail: 'The enteric nervous system contains over 500 million neurons lining the gut wall, profoundly communicating with the brain via the vagus nerve.',
    organOrSystem: 'Intestines & Microbiome',
    source: 'National Institute of General Medical Sciences (NIGMS)'
  }
];

/** Deterministic fact based on current local date */
export function getDailyScienceFact(date: Date = new Date()): ScienceFact {
  const dayOfYear = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
      24 /
      60 /
      60 /
      1000
  );
  const index = Math.abs(dayOfYear) % SCIENCE_FACTS.length;
  return SCIENCE_FACTS[index];
}
