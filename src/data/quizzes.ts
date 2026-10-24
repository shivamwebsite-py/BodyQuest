import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1-8: Organ Functions
  {
    id: 'q1',
    question: 'Which organ is responsible for pumping blood through the circulatory system?',
    options: ['Lungs', 'Heart', 'Kidneys', 'Liver'],
    correctIndex: 1,
    explanation: 'The heart is a muscular organ that pumps deoxygenated blood to the lungs and oxygen-rich blood throughout the body.',
    category: 'Organ Functions',
    difficulty: 'beginner',
    organOrSystemRef: 'heart'
  },
  {
    id: 'q2',
    question: 'Where does the primary chemical digestion and nutrient absorption of food take place?',
    options: ['Stomach', 'Small Intestine', 'Esophagus', 'Large Intestine'],
    correctIndex: 1,
    explanation: 'While the stomach begins digestion, the small intestine is where the majority of digestive enzymes complete digestion and villi absorb nutrients.',
    category: 'Organ Functions',
    difficulty: 'beginner',
    organOrSystemRef: 'intestines'
  },
  {
    id: 'q3',
    question: 'Which organ synthesizes bile to help digest dietary fats?',
    options: ['Pancreas', 'Liver', 'Gallbladder', 'Spleen'],
    correctIndex: 1,
    explanation: 'The liver continuously synthesizes bile. The gallbladder stores and concentrates it until fatty food enters the duodenum.',
    category: 'Organ Functions',
    difficulty: 'beginner',
    organOrSystemRef: 'liver'
  },
  {
    id: 'q4',
    question: 'What is the primary role of the alveoli in the respiratory system?',
    options: ['Warming incoming air', 'Producing mucus', 'Gas exchange between air and blood', 'Vocal sound generation'],
    correctIndex: 2,
    explanation: 'Alveoli are microscopic elastic air sacs where oxygen diffuses across thin capillaries into red blood cells and CO2 is expelled.',
    category: 'Organ Functions',
    difficulty: 'explorer',
    organOrSystemRef: 'lungs'
  },
  {
    id: 'q5',
    question: 'Which organ serves as the body\'s master filtration plant, regulating water, salts, and removing urea?',
    options: ['Kidneys', 'Bladder', 'Liver', 'Adrenal glands'],
    correctIndex: 0,
    explanation: 'The kidneys process about 180 liters of blood plasma daily, eliminating urea and waste while reclaiming 99% of filtered water.',
    category: 'Organ Functions',
    difficulty: 'beginner',
    organOrSystemRef: 'kidneys'
  },
  {
    id: 'q6',
    question: 'What role does the stomach\'s hydrochloric acid (HCl) primarily serve?',
    options: ['Cooling food', 'Activating pepsin and killing ingested bacteria', 'Absorbing fats', 'Neutralizing bile'],
    correctIndex: 1,
    explanation: 'Hydrochloric acid maintains a gastric pH between 1.5 and 3.5, which kills pathogens and activates pepsinogen into pepsin to digest proteins.',
    category: 'Organ Functions',
    difficulty: 'explorer',
    organOrSystemRef: 'stomach'
  },
  {
    id: 'q7',
    question: 'Which organ contains the highest concentration of neurons outside the brain, often called the "second brain"?',
    options: ['Heart', 'Enteric nervous system in the gut', 'Lungs', 'Skin'],
    correctIndex: 1,
    explanation: 'The enteric nervous system embedded in gastrointestinal walls contains over 500 million neurons and produces 90% of the body\'s serotonin.',
    category: 'Organ Functions',
    difficulty: 'expert',
    organOrSystemRef: 'intestines'
  },
  {
    id: 'q8',
    question: 'Which organ possesses the unique biological capability to regenerate its tissue mass back to normal after surgical removal?',
    options: ['Heart', 'Brain', 'Liver', 'Kidney'],
    correctIndex: 2,
    explanation: 'Hepatocytes in the liver retain an extraordinary ability to proliferate, allowing the liver to fully regenerate even if up to 70% is removed.',
    category: 'Organ Functions',
    difficulty: 'explorer',
    organOrSystemRef: 'liver'
  },

  // 9-16: Basic Anatomy
  {
    id: 'q9',
    question: 'How many bones does a typical adult human skeleton contain?',
    options: ['106', '206', '306', '412'],
    correctIndex: 1,
    explanation: 'Adult humans have 206 bones. Infants are born with ~270 bones, many of which fuse together during childhood growth.',
    category: 'Basic Anatomy',
    difficulty: 'beginner',
    organOrSystemRef: 'skeletal'
  },
  {
    id: 'q10',
    question: 'What is the longest and strongest bone in the human body?',
    options: ['Humerus', 'Tibia', 'Femur', 'Sternum'],
    correctIndex: 2,
    explanation: 'The femur (thigh bone) is the longest and strongest bone, capable of supporting up to 30 times an individual’s body weight.',
    category: 'Basic Anatomy',
    difficulty: 'beginner',
    organOrSystemRef: 'skeletal'
  },
  {
    id: 'q11',
    question: 'Where is the smallest bone in the human body located?',
    options: ['In the pinky finger', 'In the middle ear', 'In the nose', 'In the big toe'],
    correctIndex: 1,
    explanation: 'The stapes (stirrup) in the middle ear is the smallest bone, measuring only about 3 millimeters in length.',
    category: 'Basic Anatomy',
    difficulty: 'explorer',
    organOrSystemRef: 'skeletal'
  },
  {
    id: 'q12',
    question: 'Why is the left human lung slightly smaller than the right lung?',
    options: ['To provide room for the spleen', 'To accommodate the cardiac notch for the heart', 'Because of the stomach\'s acidity', 'Left lungs receive less blood'],
    correctIndex: 1,
    explanation: 'The left lung has a depression called the cardiac notch where the heart rests, giving the left lung 2 lobes compared to 3 on the right.',
    category: 'Basic Anatomy',
    difficulty: 'explorer',
    organOrSystemRef: 'lungs'
  },
  {
    id: 'q13',
    question: 'What is the anatomical name for the voice box?',
    options: ['Pharynx', 'Larynx', 'Trachea', 'Epiglottis'],
    correctIndex: 1,
    explanation: 'The larynx connects the pharynx to the trachea and contains the vocal cords responsible for pitch and voice modulation.',
    category: 'Basic Anatomy',
    difficulty: 'explorer',
    organOrSystemRef: 'respiratory'
  },
  {
    id: 'q14',
    question: 'Which fluid cushions the brain and spinal cord within the skull and vertebral canal?',
    options: ['Synovial fluid', 'Cerebrospinal fluid (CSF)', 'Lymphatic fluid', 'Amniotic fluid'],
    correctIndex: 1,
    explanation: 'Cerebrospinal fluid provides buoyancy and mechanical shock absorption, effectively reducing the net weight of the brain on the skull base.',
    category: 'Basic Anatomy',
    difficulty: 'explorer',
    organOrSystemRef: 'brain'
  },
  {
    id: 'q15',
    question: 'Which microscopic filtering units are found in the millions inside human kidneys?',
    options: ['Nephrons', 'Neurons', 'Villi', 'Myofibrils'],
    correctIndex: 0,
    explanation: 'Nephrons are the functional structural units of the kidneys; each kidney contains approximately 1 million nephrons.',
    category: 'Basic Anatomy',
    difficulty: 'beginner',
    organOrSystemRef: 'kidneys'
  },
  {
    id: 'q16',
    question: 'Which muscular partition separates the thoracic cavity from the abdominal cavity and drives inhalation?',
    options: ['Intercostal fascia', 'Diaphragm', 'Peritoneum', 'Pericardium'],
    correctIndex: 1,
    explanation: 'When the dome-shaped diaphragm contracts downward, it increases thoracic volume, dropping pressure and drawing air into the lungs.',
    category: 'Basic Anatomy',
    difficulty: 'beginner',
    organOrSystemRef: 'respiratory'
  },

  // 17-24: Body Systems
  {
    id: 'q17',
    question: 'Which body system is primarily responsible for hormone production and long-term metabolic regulation?',
    options: ['Immune System', 'Endocrine System', 'Muscular System', 'Integumentary System'],
    correctIndex: 1,
    explanation: 'The endocrine system uses glands (pituitary, thyroid, adrenals, pancreas) to secrete hormones into the bloodstream to regulate physiology.',
    category: 'Body Systems',
    difficulty: 'beginner',
    organOrSystemRef: 'endocrine'
  },
  {
    id: 'q18',
    question: 'What is the largest organ of the human body, serving as the front line of the integumentary system?',
    options: ['Liver', 'Skin', 'Large Intestine', 'Brain'],
    correctIndex: 1,
    explanation: 'The skin is the body\'s largest organ by both surface area (1.5-2 m²) and weight (roughly 16% of body mass).',
    category: 'Body Systems',
    difficulty: 'beginner',
    organOrSystemRef: 'integumentary'
  },
  {
    id: 'q19',
    question: 'Which branch of the autonomic nervous system is nicknamed the "fight or flight" system?',
    options: ['Parasympathetic nervous system', 'Sympathetic nervous system', 'Enteric nervous system', 'Somatic nervous system'],
    correctIndex: 1,
    explanation: 'The sympathetic division accelerates heart rate, dilates airways, and releases adrenaline during perceived stress or danger.',
    category: 'Body Systems',
    difficulty: 'explorer',
    organOrSystemRef: 'nervous'
  },
  {
    id: 'q20',
    question: 'Which specialized white blood cells mature in the thymus and play a central role in cell-mediated adaptive immunity?',
    options: ['B-cells', 'T-cells (T-lymphocytes)', 'Neutrophils', 'Erythrocytes'],
    correctIndex: 1,
    explanation: 'T-lymphocytes (T-cells) originate in bone marrow but migrate to the thymus gland to mature and undergo immune selection.',
    category: 'Body Systems',
    difficulty: 'explorer',
    organOrSystemRef: 'immune'
  },
  {
    id: 'q21',
    question: 'Which mineral is predominantly stored in the human skeletal system, comprising 99% of the body\'s supply?',
    options: ['Iron', 'Calcium', 'Potassium', 'Sodium'],
    correctIndex: 1,
    explanation: 'Bones serve as the primary mineral reservoir for calcium, vital for muscle contraction, nerve transmission, and blood coagulation.',
    category: 'Body Systems',
    difficulty: 'beginner',
    organOrSystemRef: 'skeletal'
  },
  {
    id: 'q22',
    question: 'Which hormone, produced by beta cells in the pancreas, lowers blood glucose levels by facilitating cellular uptake?',
    options: ['Glucagon', 'Insulin', 'Cortisol', 'Thyroxine'],
    correctIndex: 1,
    explanation: 'Insulin signals muscle, adipose, and liver cells to absorb glucose from the bloodstream, storing it as glycogen or fat.',
    category: 'Body Systems',
    difficulty: 'explorer',
    organOrSystemRef: 'endocrine'
  },
  {
    id: 'q23',
    question: 'What is the function of the lymphatic system beyond immune cell transportation?',
    options: ['Generating digestive bile', 'Returning excess interstitial tissue fluid to the blood', 'Regulating body temperature via sweat', 'Filtering inhaled smoke'],
    correctIndex: 1,
    explanation: 'Lymphatic vessels drain excess fluid leaking from capillaries into tissues, filtering it through lymph nodes before re-entering systemic circulation.',
    category: 'Body Systems',
    difficulty: 'explorer',
    organOrSystemRef: 'immune'
  },
  {
    id: 'q24',
    question: 'Which three types of muscle tissue exist within the human muscular system?',
    options: [
      'Skeletal, smooth, and cardiac',
      'Voluntary, elastic, and cartilaginous',
      'Ligamentous, tendinous, and motor',
      'Fast, slow, and medium'
    ],
    correctIndex: 0,
    explanation: 'Skeletal muscles enable voluntary movement, smooth muscles line internal organs/vessels involuntarily, and cardiac muscle powers the heart.',
    category: 'Body Systems',
    difficulty: 'beginner',
    organOrSystemRef: 'muscular'
  },

  // 25-30: Human Biology
  {
    id: 'q25',
    question: 'What is the iron-containing oxygen-transport protein found inside red blood cells?',
    options: ['Myoglobin', 'Hemoglobin', 'Albumin', 'Keratin'],
    correctIndex: 1,
    explanation: 'Hemoglobin binds up to four oxygen molecules in pulmonary capillaries and unloads them in metabolically active body tissues.',
    category: 'Human Biology',
    difficulty: 'beginner',
    organOrSystemRef: 'cardiovascular'
  },
  {
    id: 'q26',
    question: 'What is the primary cellular energy currency produced during cellular respiration?',
    options: ['DNA', 'ATP (Adenosine Triphosphate)', 'Glucose', 'Enzyme Q10'],
    correctIndex: 1,
    explanation: 'Mitochondria synthesize ATP from glucose and oxygen; hydrolysis of ATP releases free energy powering cellular processes.',
    category: 'Human Biology',
    difficulty: 'beginner'
  },
  {
    id: 'q27',
    question: 'What is the typical average lifespan of a mature human red blood cell (erythrocyte)?',
    options: ['About 24 hours', 'About 7 days', 'About 120 days', 'Several years'],
    correctIndex: 2,
    explanation: 'Red blood cells circulate for roughly 120 days before becoming aged and rigid, after which they are dismantled by macrophages in the spleen and liver.',
    category: 'Human Biology',
    difficulty: 'explorer'
  },
  {
    id: 'q28',
    question: 'How do electrical impulses jump rapidly between nodes of Ranvier along a myelinated axon?',
    options: ['Passive osmosis', 'Saltatory conduction', 'Capillary action', 'Thermal expansion'],
    correctIndex: 1,
    explanation: 'Myelin sheaths insulate the axon, causing action potentials to skip from one node to the next in a process called saltatory conduction, greatly increasing speed.',
    category: 'Human Biology',
    difficulty: 'expert',
    organOrSystemRef: 'nervous'
  },
  {
    id: 'q29',
    question: 'Which substance lines the inside of alveoli to reduce surface tension and prevent lung collapse on exhalation?',
    options: ['Mucus', 'Pulmonary surfactant', 'Saliva', 'Pleural lymph'],
    correctIndex: 1,
    explanation: 'Type II alveolar cells secrete pulmonary surfactant, a lipid-protein mixture that prevents alveolar collapse during expiration.',
    category: 'Human Biology',
    difficulty: 'expert',
    organOrSystemRef: 'lungs'
  },
  {
    id: 'q30',
    question: 'Which blood vessels carry oxygenated blood under high pressure away from the heart?',
    options: ['Veins', 'Arteries', 'Venules', 'Lymphatics'],
    correctIndex: 1,
    explanation: 'Arteries have thick, elastic muscular walls designed to withstand high pressure as they convey blood away from cardiac ventricles.',
    category: 'Human Biology',
    difficulty: 'beginner',
    organOrSystemRef: 'cardiovascular'
  },

  // 31-36: Scientific Facts
  {
    id: 'q31',
    question: 'Roughly what percentage of your total daily resting oxygen and energy does your brain consume?',
    options: ['About 2%', 'About 10%', 'About 20%', 'Over 60%'],
    correctIndex: 2,
    explanation: 'Even though the brain accounts for only ~2% of total body mass, it consumes approximately 20% of resting metabolic energy.',
    category: 'Scientific Facts',
    difficulty: 'beginner',
    organOrSystemRef: 'brain'
  },
  {
    id: 'q32',
    question: 'If all the blood vessels in an adult human were unraveled and laid end to end, roughly how long would they stretch?',
    options: ['About 500 feet', 'About 5 miles', 'About 60,000 miles', 'Over 1,000,000 miles'],
    correctIndex: 2,
    explanation: 'Thanks to millions of microscopic capillaries, the human circulatory system spans over 60,000 miles (100,000 km)—enough to circle the Earth twice!',
    category: 'Scientific Facts',
    difficulty: 'explorer',
    organOrSystemRef: 'cardiovascular'
  },
  {
    id: 'q33',
    question: 'How fast can a human sneeze propel droplets of air and moisture?',
    options: ['Up to 10 mph', 'Up to 30 mph', 'Up to 100 mph (160 km/h)', 'Over 300 mph'],
    correctIndex: 2,
    explanation: 'Sneezes can expel air, saliva, and particulate matter at velocities up to 100 miles per hour, protecting the upper respiratory tract from irritants.',
    category: 'Scientific Facts',
    difficulty: 'explorer'
  },
  {
    id: 'q34',
    question: 'What is the strongest muscle in the human body based on its weight and biting force?',
    options: ['Gluteus maximus', 'Tongue', 'Masseter', 'Biceps brachii'],
    correctIndex: 2,
    explanation: 'The masseter (jaw muscle) can exert a biting force exceeding 200 pounds (90 kg) on the molars, making it the strongest relative to its size.',
    category: 'Scientific Facts',
    difficulty: 'explorer',
    organOrSystemRef: 'muscular'
  },
  {
    id: 'q35',
    question: 'About how many dead skin cells does an average human shed every single minute?',
    options: ['50 to 100', '1,000 to 2,000', '30,000 to 40,000', 'Over 1,000,000'],
    correctIndex: 2,
    explanation: 'The epidermis continuously sloughs off approximately 30,000 to 40,000 keratinized cells per minute, completely renewing skin every month.',
    category: 'Scientific Facts',
    difficulty: 'expert',
    organOrSystemRef: 'integumentary'
  },
  {
    id: 'q36',
    question: 'How much total fluid do the kidneys filter each day in a typical adult?',
    options: ['About 5 liters', 'About 25 liters', 'About 180 liters (47 gallons)', 'Over 1,000 liters'],
    correctIndex: 2,
    explanation: 'Nephrons filter roughly 180 liters of blood plasma daily, reabsorbing over 99% of essential water and salts and creating ~1.5 liters of urine.',
    category: 'Scientific Facts',
    difficulty: 'expert',
    organOrSystemRef: 'kidneys'
  }
];
