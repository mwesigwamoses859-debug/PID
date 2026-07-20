import { MetricItem, CoreValue, PartnerItem, PolicyItem, OrgNode, Programme } from './types';

export const ORG_INFO = {
  name: 'Plan Integral Development',
  acronym: 'PID',
  tagline: 'Sport. Empowerment. Impact.',
  subTagline: 'Transforming lives through the power of sport',
  registrationNo: 'INDR177427311NB',
  actNo: 'CAP 109',
  establishedYear: '2010',
  address: 'Plot 1420 Ntensibe Road, Kitintale, Kampala, Uganda',
  poBox: 'P.O. Box 132061 Kampala',
  email: 'info@piduganda.org',
  phone: '0776526344',
  aboutBrief: 'Plan Integral Development (PID) is a registered Ugandan NGO established in 2010. We leverage sports-for-development, educational grants, vocational training, and climate-smart agriculture to empower youth, women, and refugees. PID operates with strict transparency and compliance to foster sustainable local growth.',
  mission: 'To harness the power of sport to unite, empower, and transform lives across Uganda.',
  vision: 'A society where everyone has equal access to knowledge, health, economic opportunities, and a safe environment.',
  strategy: 'PID utilizes sports as a neutral entry point to build trust and social integration. We then establish structured pathways—scholastic support, vocational skills, micro-savings, and sustainable agriculture—to foster long-term community self-reliance.'
};

export const CORE_VALUES: CoreValue[] = [
  {
    name: 'Accountability',
    tagline: 'Transparent Stewardship',
    description: 'We maintain open, fully audited finances and operations to earn and keep community trust.',
    iconName: 'Receipt'
  },
  {
    name: 'Integrity',
    tagline: 'Ethics First',
    description: 'We operate with complete honesty, impartiality, and strict compliance with national guidelines.',
    iconName: 'Shield'
  },
  {
    name: 'Equality',
    tagline: 'Inclusive Play',
    description: 'We ensure girls, boys, and marginalized groups enjoy equal access to sports, grants, and training.',
    iconName: 'Users'
  },
  {
    name: 'Respect',
    tagline: 'Human Dignity',
    description: 'We value every individual, promoting safe environments and positive child protection practices.',
    iconName: 'Heart'
  },
  {
    name: 'Collaboration',
    tagline: 'Stronger Together',
    description: 'We work closely with local councils, ministries, and district leaders to ensure lasting change.',
    iconName: 'Users'
  }
];

export const METRICS: MetricItem[] = [
  {
    id: 'youth_engaged',
    value: '1,000,000+',
    numericValue: 1000000,
    label: 'Youth Engaged',
    description: 'Active participants empowered through sport clinics and local community forums.',
    iconName: 'Users'
  },
  {
    id: 'scholarships',
    value: '300',
    numericValue: 300,
    label: 'Scholarships Awarded',
    description: 'Academic sponsorships supporting vulnerable children and young leaders in school.',
    iconName: 'GraduationCap'
  },
  {
    id: 'coaches_trained',
    value: '200',
    numericValue: 200,
    label: 'Coaches Trained',
    description: 'Certified instructors trained in youth leadership, coaching, and safeguarding.',
    iconName: 'Award'
  },
  {
    id: 'schools_supported',
    value: '40',
    numericValue: 40,
    label: 'Schools Supported',
    description: 'Partner schools equipped with athletic gear, sanitization kits, and resources.',
    iconName: 'School'
  },
  {
    id: 'active_districts',
    value: '5+',
    numericValue: 5,
    label: 'Active Districts',
    description: 'Sustained operations across urban settlements and remote refugee regions.',
    iconName: 'MapPin'
  },
  {
    id: 'policy_briefs',
    value: '2',
    numericValue: 2,
    label: 'Policy Briefs',
    description: 'Formal policy documents submitted to government channels to champion youth integration.',
    iconName: 'FileText'
  }
];

export const PARTNERS_BRIEF = 'PID partners with government agencies and athletic alliances to deliver compliant, high-impact, and sustainable community initiatives across Uganda.';

export const PARTNERS: PartnerItem[] = [
  {
    name: 'Kampala City Council Authority (KCCA)',
    category: 'Local Government Authority',
    description: 'Collaborates on sports structures, community welfare, and urban slum empowerment programs.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/2/23/Kampala_Capital_City_Authority_Logo.png'
  },
  {
    name: 'Uganda Ministry of Gender, Labour and Social Development',
    category: 'National Government Ministry',
    description: 'Provides youth development standards, community empowerment oversight, and operational alignments.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Coat_of_arms_of_Uganda.svg'
  },
  {
    name: 'Uganda NGO Bureau',
    category: 'Regulatory Body',
    description: 'Oversight organ ensuring complete policy compliance, transparent reporting, and strict standards of accountability.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Coat_of_arms_of_Uganda.svg'
  },
  {
    name: 'Butebo District Local Government',
    category: 'Local District Authority',
    description: 'Integrates local resources, facilitates community outreach, and hosts local sports-for-development clinics.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Coat_of_arms_of_Uganda.svg'
  },
  {
    name: 'Uganda Sports for Development Partnership',
    category: 'Development Alliance',
    description: 'Unites agencies utilizing athletic engagement as a vehicle for sustainable, pro-youth local policies.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sport_ball_isometric_icon.svg/512px-Sport_ball_isometric_icon.svg.png'
  },
  {
    name: 'Uganda Korfball Association',
    category: 'National Athletic Association',
    description: 'Promotes gender equality in sport through co-ed korfball training, leagues, and skill development.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Korfbal_pictogram.svg/512px-Korfbal_pictogram.svg.png'
  }
];

export const ORGANIZATIONAL_STRUCTURE: OrgNode = {
  title: 'Board of Directors',
  subtitle: 'Governance & Strategy',
  description: 'Provides independent oversight, ensuring regulatory compliance, financial audit standards, and strategic direction.',
  level: 'board',
  children: [
    {
      title: 'Kampala Secretariat',
      subtitle: 'Headquarters & Operations',
      description: 'Coordinates national operations, financial controls, fundraising, and partnership MoUs.',
      level: 'secretariat',
      children: [
        {
          title: 'Urban Slum Hubs',
          subtitle: 'Kitintale & Surrounds',
          description: 'Manages youth clinics, microfinance savings clubs, and sports programs.',
          level: 'district'
        },
        {
          title: 'Eastern Region Hubs',
          subtitle: 'Mbale & Butebo Districts',
          description: 'Coordinates tree planting, school support, and sustainable agriculture.',
          level: 'district'
        },
        {
          title: 'Refugee Integration Hubs',
          subtitle: 'Displaced Group Assimilation',
          description: 'Runs sports events, conflict resolution, and trauma-informed training.',
          level: 'district'
        }
      ]
    }
  ]
};

export const SYSTEMS_POLICIES: PolicyItem[] = [
  {
    title: 'Child Safeguarding Policy',
    code: 'PID-POL-01',
    description: 'Enforces zero-tolerance for abuse, background checks for all personnel, and clear reporting protocols during all youth operations.',
    scope: 'All staff, volunteers, coaches, and teachers.',
    iconName: 'ShieldAlert'
  },
  {
    title: 'Financial Accountability Act',
    code: 'PID-POL-02',
    description: 'Mandates dual-signature authorization, regular external audits, and open ledger records for our project sponsors.',
    scope: 'All operations and secretariats.',
    iconName: 'Receipt'
  },
  {
    title: 'Gender Equality & Social Inclusion',
    code: 'PID-POL-03',
    description: 'Ensures equal representation of girls and marginalized groups across athletic camps, grants, and vocational training.',
    scope: 'Embedded across all programs and hiring.',
    iconName: 'Users'
  },
  {
    title: 'Environmental Protection Guideline',
    code: 'PID-POL-04',
    description: 'Integrates ecological care into sports programs, steering community teams in tree planting and waste reduction.',
    scope: 'All school partnerships and sports forums.',
    iconName: 'Leaf'
  },
  {
    title: 'Anti-Corruption & Whistleblower Policy',
    code: 'PID-POL-05',
    description: 'Provides safe, confidential channels for staff, partners, and beneficiaries to report suspected non-compliance without fear of reprisal.',
    scope: 'Protects the integrity of all operations.',
    iconName: 'FileText'
  }
];

export const CAREERS_TEXT = 'Please visit our website regularly for future opportunities and openings.';

export const INTERNSHIPS_TEXT = 'PID offers year-round internships at our Kampala secretariat. Students and graduates gain hands-on experience in finance, program coordination, and public policy. Contact info@piduganda.org for details.';

export const VOLUNTEER_TEXT = 'We welcome motivated volunteers to support our sports clinics, community workshops, and regional hubs. Explore open roles below or reach out to get started.';

export const FUNDRAISER_TEXT = 'Help sustain our youth sports, education, and health programs across Uganda. Starting a fundraising campaign with PID directly empowers vulnerable households.';

export const PROGRAMMES: Programme[] = [
  {
    id: 'sport',
    title: 'Sport & Integration',
    tagline: 'Uniting Communities & Fostering Integration',
    shortDescription: 'Using sports leagues and co-ed matches to drive social integration, gender equality, and child protection.',
    longDescription: 'We leverage sport as a neutral platform to foster social cohesion and trust. Our clinics and leagues offer safe spaces that cultivate youth leadership, build peer support networks, and promote community integration.',
    bgImage: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1516245556508-7d60d4ff0f39?auto=format&fit=crop&w=800&q=80',
    iconName: 'Dribbble',
    objectives: [
      'Establish gender-inclusive sports clubs, including co-ed Korfball.',
      'Certify local coaches in youth leadership and child safeguarding.',
      'Equip disadvantaged youth with athletic kits and secure playing spaces.'
    ],
    activities: [
      'Organizing inclusive football, korfball, and athletics tournaments.',
      'Facilitating post-match mentoring circles on life skills and health.',
      'Conducting integrated health checkups alongside sporting events.'
    ],
    outcomes: [
      'Enhanced social integration and conflict resolution among diverse groups.',
      'Improved mental well-being and discipline among participants.',
      'Active, peer-supported youth leadership networks in target communities.'
    ]
  },
  {
    id: 'education',
    title: 'Education & Grants',
    tagline: 'Equal Learning & Scholarships',
    shortDescription: 'Empowering vulnerable children and young leaders with academic sponsorships, learning materials, and school facility upgrades.',
    longDescription: 'We remove financial and structural barriers to education for vulnerable children, especially young girls. PID provides school fees, scholastic materials, and essential sanitation upgrades to ensure safe, dignified learning environments.',
    bgImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    iconName: 'GraduationCap',
    objectives: [
      'Increase school enrollment and retention rates for marginalized children.',
      'Deliver scholastic sponsorships, textbooks, and school meals.',
      'Upgrade sanitation and hygiene facilities in partner schools.'
    ],
    activities: [
      'Distributing academic supply kits and menstrual hygiene products.',
      'Administering primary and secondary tuition sponsorship grants.',
      'Organizing reading circles and peer-to-peer mentoring clubs.'
    ],
    outcomes: [
      'Decreased school dropout rates across 40+ partner schools.',
      'Improved school attendance through enhanced sanitation facilities.',
      'Increased transition rates from primary to secondary education.'
    ]
  },
  {
    id: 'health',
    title: 'Health & Wellbeing',
    tagline: 'Promoting Mental Health & Clean Water',
    shortDescription: 'Providing clean water solutions, trauma-informed mental health counseling, and mobile health services to vulnerable families.',
    longDescription: 'We strengthen community health infrastructure. PID installs biosand filters, conducts mobile medical camps, and provides professional mental health counseling to safeguard the physical and psychological well-being of youth and families.',
    bgImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80',
    iconName: 'HeartPulse',
    objectives: [
      'Expand access to safe, clean drinking water to prevent waterborne illness.',
      'Provide accessible mental health counseling and psychosocial support.',
      'Promote health, nutrition, and hygiene literacy in low-income areas.'
    ],
    activities: [
      'Constructing community boreholes and distributing water filters.',
      'Establishing wellness clubs for youth peer support and counseling.',
      'Hosting mobile clinics and distributing family hygiene kits.'
    ],
    outcomes: [
      'Reduced incidence of preventable waterborne diseases.',
      'Decreased stigma and expanded access to youth mental health support.',
      'Improved hygiene practices and health awareness among households.'
    ]
  },
  {
    id: 'livelihood',
    title: 'Livelihoods & Skills',
    tagline: 'Economic Independence & Vocations',
    shortDescription: 'Equipping youth and vulnerable women with vocational training, entrepreneurship mentorship, and micro-savings networks.',
    longDescription: 'We build economic independence for women and youth. Through certified vocational classes and Village Savings and Loan Associations (VSLA), we provide the practical skills, credit, and tools needed to launch sustainable household enterprises.',
    bgImage: 'https://images.unsplash.com/photo-1544928147-79a2bec1638f?auto=format&fit=crop&w=1200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80',
    iconName: 'TrendingUp',
    objectives: [
      'Deliver certified training in tailoring, crafts, and digital literacy.',
      'Form and support community VSLAs to provide micro-credit access.',
      'Provide startup toolkits and seed grants for family businesses.'
    ],
    activities: [
      'Conducting hands-on vocational courses with industry trainers.',
      'Teaching financial literacy, bookkeeping, and business development.',
      'Distributing sewing machines, startup kits, and micro-grants.'
    ],
    outcomes: [
      'Successful launch of active, women-led household businesses.',
      'Improved savings and financial management habits via VSLAs.',
      'Increased household incomes, reducing vulnerability to economic shocks.'
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1544928147-79a2bec1638f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'climate',
    title: 'Climate Action',
    tagline: 'Reforestation & Eco-Stewardship',
    shortDescription: 'Mobilizing youth for reforestation, plastic waste management, clean drainage, and solar energy distribution.',
    longDescription: 'We engage the next generation in climate resilience. PID coordinates reforestation, clean drainage, and eco-friendly energy programs to protect vulnerable ecosystems and combat environmental degradation.',
    bgImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    iconName: 'Leaf',
    objectives: [
      'Restore critical forest cover through native tree-planting campaigns.',
      'Mitigate flooding and waste by cleaning drainage and recycling plastics.',
      'Promote clean energy adoption with solar lights and clean cookstoves.'
    ],
    activities: [
      'Organizing tree-planting sports leagues ("goals-for-trees").',
      'Conducting community cleanup campaigns and plastic recycling drives.',
      'Establishing active eco-clubs in partner schools.'
    ],
    outcomes: [
      'Thousands of trees planted to stabilize mountain slopes.',
      'Reduced urban flood risks through clear drainage channels.',
      'Widespread eco-literacy and sustainable habits adopted by youth.'
    ]
  },
  {
    id: 'agriculture',
    title: 'Agriculture & Farming',
    tagline: 'Sustainable Farming & Food Security',
    shortDescription: 'Supporting smallholder farmers with conservation agriculture training, vertical kitchen gardens, and organic seeds.',
    longDescription: 'We advance climate-smart food security. PID trains smallholder and urban farmers in composting, vertical bag gardening, and soil preservation to maximize crop yields and secure household nutrition.',
    bgImage: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    iconName: 'Sprout',
    objectives: [
      'Improve soil health and crop yields through organic composting.',
      'Introduce space-saving vertical sack gardens for urban slum households.',
      'Equip farming cooperatives with post-harvest storage solutions.'
    ],
    activities: [
      'Setting up demonstration gardens for organic farming training.',
      'Distributing vertical bag kits and climate-resilient organic seeds.',
      'Conducting workshops on sustainable soil preservation and storage.'
    ],
    outcomes: [
      'Enhanced food security and nutrition for low-income households.',
      'Increased market revenues for rural agricultural cooperatives.',
      'Safer local soils through chemical-free composting practices.'
    ]
  }
];
