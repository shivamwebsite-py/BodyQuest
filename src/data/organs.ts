import { Organ } from '../types';

export const ORGANS: Organ[] = [
  {
    id: 'brain',
    name: 'Brain',
    scientificName: 'Encephalon',
    systemId: 'nervous',
    systemName: 'Nervous System',
    location: 'Cranial cavity inside the skull, protected by the cranium and meninges',
    primaryFunctions: [
      'Processes sensory inputs from vision, hearing, touch, taste, and smell',
      'Coordinates voluntary skeletal movement and involuntary autonomic reflexes',
      'Governs cognition, memory, language, emotional regulation, and decision making',
      'Regulates homeostatic processes including circadian rhythms and sleep cycles'
    ],
    whyItMatters:
      'The human brain is the command center of the nervous system. Although it accounts for only about 2% of total body weight, it consumes roughly 20% of the body\'s oxygen and glucose at rest.',
    facts: [
      'The human brain contains approximately 86 billion neurons, linked by over 100 trillion synaptic connections.',
      'Information travels along nerve fibers at speeds up to 268 miles per hour (430 km/h).',
      'Your brain produces enough electrical energy while awake to power a low-wattage LED light bulb (about 12 to 25 watts).',
      'Neuroplasticity allows the brain to physically rewire its pathways throughout life in response to learning and environmental experience.'
    ],
    markerCoords: {
      x: 200,
      y: 82,
      connectorX: 110,
      connectorY: 75
    },
    color: '#a855f7', // purple
    accentGlow: 'rgba(168, 85, 247, 0.4)',
    knowledgeCheck: {
      question: 'Approximately what percentage of the body\'s resting energy does the human brain consume?',
      options: ['About 5%', 'About 20%', 'About 50%', 'Less than 1%'],
      correctIndex: 1,
      explanation: 'Despite making up only ~2% of body mass, the brain requires roughly 20% of circulating blood glucose and oxygen to power billions of active neurons.'
    }
  },
  {
    id: 'lungs',
    name: 'Lungs',
    scientificName: 'Pulmones',
    systemId: 'respiratory',
    systemName: 'Respiratory System',
    location: 'Thoracic cavity flanking the mediastinum, protected by the ribs and resting on the diaphragm',
    primaryFunctions: [
      'Exchanges oxygen from inhaled air into pulmonary capillary blood',
      'Removes carbon dioxide (metabolic waste) from blood into exhaled air',
      'Assists in regulating systemic blood pH via carbonic acid / bicarbonate buffer equilibrium',
      'Filters small blood clots and protects against airborne pathogens through cilia and mucus'
    ],
    whyItMatters:
      'Every breath fuels cellular respiration throughout your entire body. Without oxygen, brain cells begin to suffer irreversible damage within just 4 to 6 minutes.',
    facts: [
      'Your lungs contain between 300 and 500 million microscopic air sacs called alveoli.',
      'If flattened out, the total alveolar surface area for gas exchange would span 70 to 100 square meters—roughly half a tennis court!',
      'Your left lung is slightly smaller than your right lung to accommodate the cardiac notch where the heart rests.',
      'The average person at rest takes about 12 to 20 breaths per minute, moving roughly 11,000 liters of air each day.'
    ],
    markerCoords: {
      x: 200,
      y: 195,
      connectorX: 290,
      connectorY: 185
    },
    color: '#06b6d4', // cyan
    accentGlow: 'rgba(6, 182, 212, 0.4)',
    knowledgeCheck: {
      question: 'What microscopic structures in the lungs provide the vast surface area for gas exchange?',
      options: ['Bronchioles', 'Alveoli', 'Pleura', 'Tracheal rings'],
      correctIndex: 1,
      explanation: 'Alveoli are tiny elastic sacs surrounded by capillaries where oxygen diffuses into the bloodstream and carbon dioxide is released.'
    }
  },
  {
    id: 'heart',
    name: 'Heart',
    scientificName: 'Cor',
    systemId: 'cardiovascular',
    systemName: 'Cardiovascular System',
    location: 'Middle mediastinum of the chest, tilted slightly leftward behind the breastbone (sternum)',
    primaryFunctions: [
      'Pumps deoxygenated blood through the pulmonary circuit to the lungs',
      'Pumps oxygen- and nutrient-rich blood through the systemic circuit to all tissues',
      'Maintains systemic arterial blood pressure required for organ perfusion',
      'Produces cardiac hormones such as atrial natriuretic peptide (ANP) to balance fluids'
    ],
    whyItMatters:
      'Your heart beats uninterrupted over 100,000 times each day, propelling blood through a network of vessels spanning more than 60,000 miles (100,000 km) throughout your body.',
    facts: [
      'A healthy adult heart pumps about 2,000 gallons (7,500 liters) of blood every single day.',
      'The heart possesses its own intrinsic electrical conduction system (SA node), allowing it to continue beating even if severed from the nervous system, as long as it has oxygen.',
      'Over an average lifetime, the human heart will contract more than 2.5 billion times without stopping.',
      'The thump-thump sound of a heartbeat is made by the rhythmic snapping shut of cardiac valves (mitral/tricuspid and aortic/pulmonary valves).'
    ],
    markerCoords: {
      x: 215,
      y: 225,
      connectorX: 105,
      connectorY: 220
    },
    color: '#f43f5e', // rose/red
    accentGlow: 'rgba(244, 63, 94, 0.45)',
    knowledgeCheck: {
      question: 'What creates the characteristic "lub-dub" sound of a human heartbeat?',
      options: [
        'Blood rushing through veins',
        'Muscle fibers stretching',
        'The snapping shut of cardiac valves',
        'Electrical sparks from the pacemaker'
      ],
      correctIndex: 2,
      explanation: 'The sounds are caused by blood turbulence when the atrioventricular valves close ("lub") followed by the semilunar valves closing ("dub").'
    }
  },
  {
    id: 'liver',
    name: 'Liver',
    scientificName: 'Hepar',
    systemId: 'digestive',
    systemName: 'Digestive & Metabolic System',
    location: 'Upper right quadrant of the abdominal cavity, directly underneath the diaphragm and above the stomach',
    primaryFunctions: [
      'Synthesizes bile to emulsify and absorb dietary fats in the small intestine',
      'Detoxifies metabolic byproducts, drugs, environmental toxins, and alcohol',
      'Stores glucose as glycogen, vitamins (A, D, E, K, B12), and iron',
      'Synthesizes vital plasma proteins including albumin and blood clotting factors'
    ],
    whyItMatters:
      'The liver is the body\'s heaviest internal organ (weighing about 3 pounds / 1.4 kg) and master biochemical laboratory, executing more than 500 distinct vital chemical operations simultaneously.',
    facts: [
      'The liver is the only visceral organ capable of true natural regeneration; it can regrow to full size even after 70% surgical removal.',
      'At any given moment, the liver holds about 13% of your body\'s total blood volume.',
      'It receives a dual blood supply: oxygenated blood via the hepatic artery and nutrient-rich venous blood directly from digestive organs via the portal vein.',
      'It breaks down old red blood cells, recycling iron and converting heme into bilirubin for excretion.'
    ],
    markerCoords: {
      x: 180,
      y: 280,
      connectorX: 100,
      connectorY: 280
    },
    color: '#f59e0b', // amber
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    knowledgeCheck: {
      question: 'Which unique biological capability does the liver possess compared to most human internal organs?',
      options: [
        'It can regenerate lost tissue back to full mass',
        'It functions without any blood supply',
        'It creates its own oxygen molecules',
        'It has zero nerve endings throughout its tissue'
      ],
      correctIndex: 0,
      explanation: 'The liver has an exceptional capacity for cellular regeneration, allowing hepatocytes to replicate and restore lost tissue mass.'
    }
  },
  {
    id: 'stomach',
    name: 'Stomach',
    scientificName: 'Gaster / Ventriculus',
    systemId: 'digestive',
    systemName: 'Digestive System',
    location: 'Upper left quadrant of the abdominal cavity, continuous with the esophagus above and duodenum below',
    primaryFunctions: [
      'Mechanically churns ingested food into a semi-fluid slurry called chyme',
      'Secretes hydrochloric acid (HCl) to sterilize microbes and create an acidic environment',
      'Releases pepsinogen, activated into pepsin to initiate protein digestion',
      'Secretes intrinsic factor, essential for vitamin B12 absorption downstream'
    ],
    whyItMatters:
      'The stomach provides chemical protection against pathogens swallowed with food while breaking down dietary proteins into peptides before passing them to the intestines.',
    facts: [
      'Stomach acid has a pH between 1.5 and 3.5—acidic enough to dissolve certain metals, such as zinc.',
      'To prevent autodigestion, epithelial goblet cells continuously coat the stomach lining with bicarbonate-rich mucus that regenerates every few days.',
      'An empty adult stomach has a volume of around 50 milliliters, but it can expand to hold up to 1 to 2 liters of food and liquid.',
      'Stomach rumbling (borborygmi) occurs when peristaltic waves move gas and fluids through an empty gastrointestinal tract.'
    ],
    markerCoords: {
      x: 220,
      y: 295,
      connectorX: 295,
      connectorY: 295
    },
    color: '#10b981', // emerald
    accentGlow: 'rgba(16, 185, 129, 0.4)',
    knowledgeCheck: {
      question: 'How does the stomach protect its own muscular walls from its powerful digestive acid?',
      options: [
        'By maintaining an alkaline pH at all times',
        'With a thick, continuously regenerated mucus barrier',
        'By freezing the acid between meals',
        'Using keratinized fingernail-like scales'
      ],
      correctIndex: 1,
      explanation: 'Specialized mucous cells produce a protective layer of alkaline mucus that shields the stomach lining from hydrochloric acid and pepsin.'
    }
  },
  {
    id: 'kidneys',
    name: 'Kidneys',
    scientificName: 'Renes',
    systemId: 'urinary',
    systemName: 'Urinary System',
    location: 'Retroperitoneal on posterior abdominal wall, flanking the spine between vertebrae T12 and L3',
    primaryFunctions: [
      'Filters metabolic waste (urea, creatinine, uric acid) from circulating blood plasma',
      'Maintains delicate fluid balance and electrolyte concentrations (Na+, K+, Cl-, Ca2+)',
      'Regulates long-term arterial blood pressure through the renin-angiotensin system',
      'Secretes erythropoietin (EPO) to stimulate bone marrow red blood cell production'
    ],
    whyItMatters:
      'Your pair of bean-shaped kidneys acts as the ultimate filtration and purification plant. Without functioning kidneys, toxic metabolic waste and excess fluid rapidly accumulate to life-threatening levels.',
    facts: [
      'Each kidney contains roughly 1 million microscopic filtering units called nephrons.',
      'Together, your kidneys filter about 180 liters (47 gallons) of fluid daily, but reabsorb 99% of it, releasing only ~1.5 liters as urine.',
      'The right kidney sits slightly lower than the left kidney to make room for the liver directly above it.',
      'The kidneys receive roughly 20 to 25% of the total cardiac output from the heart at all times.'
    ],
    markerCoords: {
      x: 175,
      y: 335,
      connectorX: 95,
      connectorY: 345
    },
    color: '#0ea5e9', // sky/blue
    accentGlow: 'rgba(14, 165, 233, 0.4)',
    knowledgeCheck: {
      question: 'What is the functional microscopic filtering unit of the human kidney called?',
      options: ['Neuron', 'Nephron', 'Alveolus', 'Hepatocyte'],
      correctIndex: 1,
      explanation: 'Each kidney contains around 1 million nephrons, each consisting of a glomerulus that filters plasma and a renal tubule that reclaims essential solutes.'
    }
  },
  {
    id: 'intestines',
    name: 'Intestines',
    scientificName: 'Intestina',
    systemId: 'digestive',
    systemName: 'Digestive System',
    location: 'Lower abdominal and pelvic cavity, framed peripherally by the colon',
    primaryFunctions: [
      'Absorbs amino acids, sugars, fatty acids, vitamins, and minerals via villi (small intestine)',
      'Reabsorbs water, electrolytes, and consolidates indigestible fiber into solid feces (large intestine)',
      'Houses trillions of commensal bacteria (gut microbiome) that ferment fiber and produce vitamin K',
      'Serves as an immune bastion, with gut-associated lymphoid tissue (GALT) producing defense antibodies'
    ],
    whyItMatters:
      'Spanning over 20 feet in length, your intestines absorb the nutrients that sustain cellular life. The gut is also called your "second brain" because the enteric nervous system contains over 500 million neurons and produces 90% of your body\'s serotonin.',
    facts: [
      'The small intestine is about 20 feet (6 meters) long, while the thicker large intestine (colon) is about 5 feet (1.5 meters).',
      'The inner surface of the small intestine is covered in microscopic folds, villi, and microvilli, expanding its absorptive surface area to ~30 square meters.',
      'Your gut microbiome contains more than 100 trillion bacterial cells—comparable in count to your own human cells!',
      'Roughly 90% of the neurotransmitter serotonin, which influences mood and digestion, is synthesized in your gastrointestinal tract.'
    ],
    markerCoords: {
      x: 200,
      y: 380,
      connectorX: 295,
      connectorY: 390
    },
    color: '#ec4899', // pink
    accentGlow: 'rgba(236, 72, 153, 0.4)',
    knowledgeCheck: {
      question: 'Where is approximately 90% of the body\'s mood-regulating neurotransmitter serotonin synthesized?',
      options: ['In the cerebral cortex', 'In the gastrointestinal tract', 'In the spleen', 'In the kidneys'],
      correctIndex: 1,
      explanation: 'Enterochromaffin cells in the intestinal mucosa synthesize roughly 90% of the human body\'s serotonin to regulate gastrointestinal motility and signaling.'
    }
  }
];
