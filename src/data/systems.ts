import { BodySystem } from '../types';

export const BODY_SYSTEMS: BodySystem[] = [
  {
    id: 'nervous',
    name: 'Nervous System',
    iconName: 'Zap',
    color: '#a855f7',
    mainFunction: 'Transmits electrochemical signals to coordinate rapid body responses, process sensory information, and regulate conscious thought.',
    importantOrgans: ['Brain', 'Spinal Cord', 'Peripheral Nerves', 'Sensory Organs (Eyes, Ears)'],
    conciseExplanation:
      'The nervous system is the body’s master communication network. It collects signals from external environments and internal sensors, processes them through the brain and spinal cord, and commands instantaneous muscular and hormonal actions.',
    facts: [
      'Nerve impulses travel at speeds ranging from 1 to over 100 meters per second (up to 268 mph).',
      'The human brain contains approximately 86 billion neurons, forming over 100 trillion synaptic connections.',
      'The peripheral nervous system has two primary branches: somatic (voluntary control) and autonomic (involuntary homeostasis).'
    ],
    relatedChallenge: 'Identify how the autonomic nervous system balances "fight or flight" and "rest and digest" responses in the Quiz Arena.',
    harmony:
      'Works intimately with the endocrine system to orchestrate long-term bodily equilibrium and coordinates with the muscular system for every voluntary movement.'
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular System',
    iconName: 'Heart',
    color: '#f43f5e',
    mainFunction: 'Circulates blood to deliver oxygen, nutrients, and hormones to tissues while carrying away carbon dioxide and metabolic wastes.',
    importantOrgans: ['Heart', 'Arteries', 'Veins', 'Capillaries', 'Blood'],
    conciseExplanation:
      'Comprising a muscular pump (the heart) and a vast vascular network spanning over 60,000 miles, the cardiovascular system ensures every living cell receives continuous life-giving oxygen and fuel.',
    facts: [
      'The heart beats approximately 100,000 times daily, propelling roughly 7,500 liters of blood through the body.',
      'Capillaries are so narrow (5-10 micrometers) that red blood cells must travel through them in single file.',
      'A single drop of blood contains about 5 million red blood cells, 10,000 white blood cells, and 250,000 platelets.'
    ],
    relatedChallenge: 'Trace the path of blood as it travels from right ventricle to lungs and back to the left atrium.',
    harmony:
      'Partners with the respiratory system to acquire oxygen and dispose of carbon dioxide, and with the urinary system to filter dissolved metabolic toxins.'
  },
  {
    id: 'respiratory',
    name: 'Respiratory System',
    iconName: 'Wind',
    color: '#06b6d4',
    mainFunction: 'Facilitates gas exchange between ambient atmospheric air and circulating blood, taking in oxygen and expelling carbon dioxide.',
    importantOrgans: ['Lungs', 'Trachea', 'Bronchi', 'Diaphragm', 'Alveoli', 'Larynx'],
    conciseExplanation:
      'Through rhythmic ventilation powered primarily by the muscular diaphragm, air travels into hundreds of millions of microscopic alveoli where thin membrane barriers allow rapid passive diffusion of oxygen and carbon dioxide.',
    facts: [
      'Adult human lungs contain roughly 300 to 500 million alveoli with a combined surface area equal to half a tennis court (~70-100 m²).',
      'Breathing is governed automatically by the respiratory center in the brainstem (medulla oblongata), sensitive to blood CO2 levels.',
      'Your right lung has three anatomical lobes, while your left lung has only two to leave room for the heart.'
    ],
    relatedChallenge: 'Discover how blood pH is stabilized in real-time by varying breathing depth and frequency.',
    harmony:
      'Directly interfaces with the cardiovascular system at the alveolar capillary bed to load hemoglobin with oxygen for systemic delivery.'
  },
  {
    id: 'digestive',
    name: 'Digestive System',
    iconName: 'Utensils',
    color: '#f59e0b',
    mainFunction: 'Breaks down ingested food into absorbable molecular nutrients, absorbs water and electrolytes, and eliminates solid waste.',
    importantOrgans: ['Mouth', 'Esophagus', 'Stomach', 'Small Intestine', 'Large Intestine', 'Liver', 'Pancreas', 'Gallbladder'],
    conciseExplanation:
      'A continuous muscular tube running from mouth to anus, supported by vital accessory organs. Food undergoes mechanical mastication, acid and enzymatic hydrolysis, nutrient absorption across microvilli, and bacterial fermentation in the colon.',
    facts: [
      'The gastrointestinal tract spans roughly 25 to 30 feet (7.5 to 9 meters) in total length.',
      'The human gut microbiome consists of over 100 trillion microorganisms that synthesize essential vitamins and defend against pathogens.',
      'The stomach produces 2 to 3 liters of gastric juice daily with a pH so acidic (1.5-3.5) it could dissolve metal fasteners.'
    ],
    relatedChallenge: 'Identify which digestive enzymes break down proteins, carbohydrates, and lipids in the small intestine.',
    harmony:
      'Relies on the cardiovascular system to distribute absorbed nutrients to metabolic organs and receives regulatory commands from the enteric and central nervous systems.'
  },
  {
    id: 'urinary',
    name: 'Urinary System',
    iconName: 'Droplets',
    color: '#0ea5e9',
    mainFunction: 'Purifies circulating blood by removing soluble metabolic waste products, regulating electrolyte levels, and managing blood volume and pH.',
    importantOrgans: ['Kidneys', 'Ureters', 'Urinary Bladder', 'Urethra'],
    conciseExplanation:
      'Acting as precision chemical refineries, the kidneys process roughly 180 liters of blood plasma daily through 2 million microscopic nephrons, reabsorbing 99% of filtered water and essential solutes while discharging waste in concentrated urine.',
    facts: [
      'The kidneys receive about 20-25% of the total blood pumped by the heart at rest.',
      'The human urinary bladder is a flexible muscular pouch capable of expanding to comfortably hold 400 to 600 mL of urine.',
      'Beyond filtration, kidneys release hormones like erythropoietin to stimulate red blood cell production and renin to manage blood pressure.'
    ],
    relatedChallenge: 'Explore how nephrons selectively reabsorb glucose, sodium, and water to protect against dehydration.',
    harmony:
      'Coordinates with the cardiovascular system to maintain fluid volume and arterial blood pressure, and works with the endocrine system via antidiuretic hormone (ADH).'
  },
  {
    id: 'skeletal',
    name: 'Skeletal System',
    iconName: 'Bone',
    color: '#e2e8f0',
    mainFunction: 'Provides rigid structural scaffolding, shields delicate internal organs, anchors muscles for movement, and produces blood cells in marrow.',
    importantOrgans: ['Bones (206 in adults)', 'Cartilage', 'Ligaments', 'Bone Marrow', 'Joints'],
    conciseExplanation:
      'More than an inanimate framework, bone is dynamic, metabolically active living tissue that continually remodels through osteoblasts and osteoclasts, storing 99% of the body’s calcium and harboring hematopoietic stem cells.',
    facts: [
      'Human infants are born with around 270 bones; many fuse during growth to leave 206 distinct bones in an adult.',
      'The femur (thigh bone) is the longest, strongest bone in the body, capable of supporting up to 30 times adult body weight.',
      'The smallest bone in the human body is the stapes (stirrup) inside the middle ear, measuring just 3 millimeters across.'
    ],
    relatedChallenge: 'Learn how bone density is maintained through regular weight-bearing exercise and dietary minerals.',
    harmony:
      'Serves as levers operated by skeletal muscles, protects vital organs (cranium protects brain, ribcage protects lungs/heart), and supplies blood cells to the cardiovascular system.'
  },
  {
    id: 'muscular',
    name: 'Muscular System',
    iconName: 'Activity',
    color: '#ef4444',
    mainFunction: 'Generates contractile force for voluntary locomotion, postural stability, and involuntary pumping of internal fluids and blood.',
    importantOrgans: ['Skeletal Muscle', 'Smooth Muscle', 'Cardiac Muscle', 'Tendons'],
    conciseExplanation:
      'Composed of over 600 individual skeletal muscles along with smooth muscle lining internal organs and cardiac muscle in the heart. Muscle fibers convert adenosine triphosphate (ATP) into mechanical work through actin and myosin sliding filaments.',
    facts: [
      'Muscles make up approximately 40% of total body mass in a healthy adult.',
      'The masseter (jaw muscle) is the strongest muscle by weight, capable of exerting a bite force exceeding 200 pounds (90 kg).',
      'Muscle shivering is an involuntary thermoregulatory reflex that can increase metabolic heat production by up to 400%.'
    ],
    relatedChallenge: 'Distinguish between slow-twitch (endurance) and fast-twitch (explosive) skeletal muscle fibers.',
    harmony:
      'Anchored directly to bones via tendons to produce movement, drives venous blood return back to the heart, and powers mechanical peristalsis throughout the digestive tract.'
  },
  {
    id: 'endocrine',
    name: 'Endocrine System',
    iconName: 'Sparkles',
    color: '#8b5cf6',
    mainFunction: 'Regulates long-term developmental, metabolic, reproductive, and homeostatic processes using chemical hormones secreted directly into the bloodstream.',
    importantOrgans: ['Pituitary Gland', 'Thyroid Gland', 'Adrenal Glands', 'Pancreas', 'Hypothalamus', 'Gonads', 'Pineal Gland'],
    conciseExplanation:
      'Unlike the instantaneous electrical signals of nerves, endocrine glands release chemical messengers (hormones) that travel systemically to target cells with specific receptor proteins, governing metabolism, growth, stress response, and sleep.',
    facts: [
      'The pituitary gland, though the size of a green pea, is known as the "master gland" because it governs most other endocrine glands.',
      'The thyroid gland produces hormones (T3 and T4) that dictate the basal metabolic rate of virtually every cell in the body.',
      'The pineal gland secretes melatonin in sync with environmental darkness, regulating your sleep-wake circadian rhythm.'
    ],
    relatedChallenge: 'Discover how insulin and glucagon from the pancreas maintain healthy blood sugar equilibrium.',
    harmony:
      'Works in tandem with the nervous system via the hypothalamic-pituitary axis to synchronize whole-body homeostasis and adapt to stress.'
  },
  {
    id: 'immune',
    name: 'Immune & Lymphatic System',
    iconName: 'Shield',
    color: '#14b8a6',
    mainFunction: 'Defends against bacterial, viral, and fungal pathogens, removes abnormal and cancerous cells, and returns interstitial fluid to blood circulation.',
    importantOrgans: ['Spleen', 'Thymus', 'Lymph Nodes', 'Bone Marrow', 'Lymphatic Vessels', 'Tonsils'],
    conciseExplanation:
      'A multi-layered defense network. It encompasses innate barriers (skin, acid, phagocytes) for immediate non-specific protection, and adaptive immunity (T cells and B cells creating specific antibodies and immunological memory).',
    facts: [
      'Your body contains hundreds of lymph nodes filtering foreign particles and hosting lymphocytes that multiply when fighting infections.',
      'The thymus gland educates T-lymphocytes during childhood so they can distinguish foreign invaders from healthy self-tissue.',
      'Memory B-cells can retain the molecular blueprint of a encountered virus for decades, providing lifelong immunity after infection or vaccination.'
    ],
    relatedChallenge: 'Examine how antibodies recognize specific antigen molecular shapes like a lock and key.',
    harmony:
      'Patrols every tissue space in coordination with the cardiovascular network, while gut-associated lymphoid tissue (GALT) protects the digestive system.'
  },
  {
    id: 'integumentary',
    name: 'Integumentary System',
    iconName: 'Sun',
    color: '#fb923c',
    mainFunction: 'Serves as the body’s protective outer shield against physical trauma, pathogens, and UV radiation, while preventing dehydration and regulating temperature.',
    importantOrgans: ['Skin (Epidermis, Dermis, Hypodermis)', 'Hair', 'Nails', 'Sweat & Sebaceous Glands'],
    conciseExplanation:
      'The human skin is the body’s largest organ, covering roughly 1.5 to 2 square meters. Beyond physical defense, it houses sensory mechanoreceptors for touch, temperature, and pain, produces vitamin D from sunlight, and cools the body via sweat evaporation.',
    facts: [
      'Skin accounts for about 16% of total adult body weight and sheds roughly 30,000 to 40,000 dead skin cells every single minute.',
      'The epidermis completely renews its outer layer approximately every 28 to 30 days.',
      'Melanocyte cells in the lower epidermis synthesize melanin, an organic pigment that absorbs harmful ultraviolet (UV) radiation.'
    ],
    relatedChallenge: 'Learn how cutaneous blood vessels dilate to release heat and constrict to preserve core body temperature.',
    harmony:
      'Cooperates with the nervous system to convey rich touch and pain perception, shields the immune system from surface pathogens, and activates vitamin D for the skeletal system.'
  }
];
