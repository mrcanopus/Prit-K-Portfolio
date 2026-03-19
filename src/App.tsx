/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Mic2, 
  Music, 
  Radio, 
  Cpu, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  ExternalLink, 
  Volume2, 
  Layers, 
  Zap,
  Terminal,
  Headphones,
  Play,
  Pause,
  Instagram,
  Menu,
  X
} from 'lucide-react';

// --- Components ---

const SoundVisualizer = () => {
  const [bars, setBars] = useState<number[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(Array.from({ length: 40 }, () => Math.random() * 100));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end gap-1 h-32 w-full max-w-md mx-auto opacity-40">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 10 }}
          animate={{ height: `${height}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex-1 bg-emerald-500/50 rounded-t-sm"
        />
      ))}
    </div>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-2"
    >
      <div className="h-px w-12 bg-emerald-500" />
      <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase">{subtitle}</span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-display font-bold"
    >
      {title}
    </motion.h2>
  </div>
);

interface SkillCardProps {
  name: string;
  icon: any;
  key?: React.Key;
}

const SkillCard = ({ name, icon: Icon }: SkillCardProps) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass p-6 rounded-2xl flex flex-col gap-4 group transition-all hover:border-emerald-500/50"
  >
    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="font-display font-semibold text-lg">{name}</h3>
  </motion.div>
);

const ExperienceItem = ({ role, company, period, description, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="relative pl-8 pb-12 border-l border-white/10 last:pb-0"
  >
    <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
      <div>
        <h3 className="text-xl font-display font-bold text-emerald-500">{role}</h3>
        <p className="text-white/60 font-medium">{company}</p>
      </div>
      <span className="text-sm font-mono bg-white/5 px-3 py-1 rounded-full border border-white/10">
        {period}
      </span>
    </div>
    <p className="text-white/70 leading-relaxed max-w-2xl">
      {description}
    </p>
  </motion.div>
);

const PortfolioCard = ({ title, description, audioUrl, link, videoId, tracks, index, activeTrackId, loadingTrackId, onTogglePlay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`glass rounded-[2rem] group hover:border-emerald-500/30 transition-all flex flex-col h-full overflow-hidden ${videoId ? 'lg:col-span-1 p-4 max-w-[320px] mx-auto w-full' : 'lg:col-span-2 p-6'}`}
    >
      {videoId && (
        <div className="flex items-center justify-between mb-3">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
            <Instagram size={12} />
          </div>
        </div>
      )}

      {videoId ? (
        <>
          <div className="aspect-[9/16] w-full rounded-xl overflow-hidden bg-black/20 border border-white/5 mb-4">
            <iframe
              src={`https://www.instagram.com/reel/${videoId}/embed`}
              className="w-full h-full border-0"
              allowtransparency="true"
              allow="encrypted-media"
            />
          </div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-sm font-display font-bold group-hover:text-emerald-500 transition-colors uppercase tracking-wider leading-tight">{title}</h3>
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-emerald-500 transition-colors shrink-0 mt-0.5">
                <ExternalLink size={12} />
              </a>
            )}
          </div>
          <p className="text-white/50 text-xs leading-relaxed">{description}</p>
        </>
      ) : (
        <>
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Volume2 size={24} />
            </div>
          </div>
          <h3 className="text-xl font-display font-bold mb-3 group-hover:text-emerald-500 transition-colors">{title}</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-6">{description}</p>
        </>
      )}
      
      {!videoId && (
        <div className="mt-auto space-y-3">
          {tracks ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tracks.map((track: any, i: number) => {
                const trackId = `${index}-${i}`;
                const isPlaying = activeTrackId === trackId;
                const isLoading = loadingTrackId === trackId;
                
                return (
                  <div key={i} className="bg-white/5 rounded-xl p-4 flex flex-col gap-3 group/track hover:bg-white/10 transition-colors border border-white/5">
                    <span className="text-xs font-mono text-white/70 line-clamp-2 min-h-[2rem]">{track.name}</span>
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => onTogglePlay(trackId, track.url)}
                        disabled={isLoading}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${isPlaying ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white hover:bg-emerald-500 hover:text-black'} ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                          />
                        ) : isPlaying ? (
                          <Pause size={14} fill="currentColor" />
                        ) : (
                          <Play size={14} fill="currentColor" className="ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : audioUrl && (
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono text-white/70">{title}</span>
              <div className="flex items-center gap-4">
                {(() => {
                  const trackId = `${index}-0`;
                  const isPlaying = activeTrackId === trackId;
                  const isLoading = loadingTrackId === trackId;
                  
                  return (
                    <>
                      <button
                        onClick={() => onTogglePlay(trackId, audioUrl)}
                        disabled={isLoading}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0 ${isPlaying ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'} ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-2 border-current border-t-transparent rounded-full"
                          />
                        ) : isPlaying ? (
                          <Pause size={20} fill="currentColor" />
                        ) : (
                          <Play size={20} fill="currentColor" className="ml-1" />
                        )}
                      </button>
                      <div className="flex flex-col flex-grow gap-2">
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden relative">
                          <motion.div 
                            className="absolute inset-0 bg-emerald-500 origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: isPlaying ? 1 : 0 }}
                            transition={{ duration: 30, ease: "linear" }}
                          />
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

const SideNav = ({ activeIndex, onDotClick }: { activeIndex: number; onDotClick: (id: string) => void }) => {
  const sections = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'experiments', label: 'Innovation' },
    { id: 'work', label: 'Career' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 md:gap-8 items-center">
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => onDotClick(section.id)}
          className="group relative flex items-center justify-center p-1.5 md:p-2"
          aria-label={`Scroll to ${section.label}`}
        >
          {/* Label - Visible when active or on hover */}
          <span className={`absolute right-full mr-4 text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap pointer-events-none ${
            activeIndex === i 
              ? 'opacity-100 text-emerald-500 translate-x-0' 
              : 'opacity-0 group-hover:opacity-100 text-white/40 translate-x-2'
          }`}>
            {section.label}
          </span>
          
          {/* Dot */}
          <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border-2 transition-all duration-500 ${
            activeIndex === i 
              ? 'bg-emerald-500 border-emerald-500 scale-125 md:scale-150 shadow-[0_0_15px_rgba(16,185,129,0.6)]' 
              : 'border-white/20 hover:border-emerald-500/50'
          }`} />
          
          {/* Active Indicator Ring */}
          {activeIndex === i && (
            <motion.div
              layoutId="activeDot"
              className="absolute inset-0 border border-emerald-500/30 rounded-full"
              initial={false}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['about', 'skills', 'portfolio', 'experiments', 'work', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroRef = useRef(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState('experience');
  
  // Audio Playback State
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [loadingTrackId, setLoadingTrackId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = async (trackId: string, url: string) => {
    if (!audioRef.current) return;

    if (activeTrackId === trackId) {
      audioRef.current.pause();
      setActiveTrackId(null);
    } else {
      try {
        setLoadingTrackId(trackId);
        // Important: Pause and reset before changing source
        audioRef.current.pause();
        
        audioRef.current.src = url;
        audioRef.current.load();
        
        setActiveTrackId(trackId);
        
        await audioRef.current.play();
        setLoadingTrackId(null);
      } catch (e: any) {
        setLoadingTrackId(null);
        if (e.name !== 'AbortError') {
          console.error("Playback failed:", e);
          setActiveTrackId(null);
        }
      }
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement> | null, id: string) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', `#${id}`);
      setIsMobileMenuOpen(false);
    }
  };

  const skills = [
    { name: "DAW Mastery", icon: Music },
    { name: "AI in Audio", icon: Cpu },
    { name: "Sound Design", icon: Headphones },
    { name: "Radio Production", icon: Radio },
    { name: "Audio Engineering", icon: Volume2 },
    { name: "In-Studio Recording", icon: Mic2 },
  ];

  const portfolioItems = [
    {
      title: "Mahindra - Aasan Hota Toh Har Koi Kisan Hota",
      description: "Crafted an Anthem for Mahindra Tractors' Kisan Diwas campaign, honoring the grit of Indian farmers through a nationwide short film festival.",
      videoId: "DSXdmXSk-5A",
      link: "https://www.instagram.com/reel/DSXdmXSk-5A/"
    },
    {
      title: "Ram Bandhu - Swad Samman Sonic ID",
      description: "Created a Sonic ID for the collaborative initiative by 94.3 MY FM and Empire Spices to honor regional distributors and retailers.",
      videoId: "DUasupkD4FJ",
      link: "https://www.instagram.com/reel/DUasupkD4FJ/"
    },
    {
      title: "MYFM Maharashtra Revamp",
      description: "Engineered and produced nine signature musical bumpers for a comprehensive brand relaunch in the Maharashtra market, ensuring cohesive audio branding across the new programming slate.",
      tracks: [
        { name: "90s Ka Nasha", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773483227/90s_ka_Nasha_xsxifd.mp3" },
        { name: "Binge", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773483228/BINGE_hzb0r0.mp3" },
        { name: "Kahaniyo Ki Gullak", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773483229/KAHANIYO_KI_GULLAK_pzjg19.mp3" },
        { name: "Fitness Ka Funda", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773483230/FITNESS_KA_FUNDA_euqi34.mp3" },
        { name: "Super Morning", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773483231/SUPER_MORNING_eylfev.mp3" },
        { name: "Paperwala Ghanta", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773483231/PAPER_WALA_GHANTA_rpphrb.mp3" },
        { name: "Swag Marathi", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773483232/SWAG_MARATHI_uhqfvq.mp3" },
        { name: "The Evening Buzz", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773483233/THE_EVENING_BUZZ_jgp4eq.mp3" },
        { name: "The Ki and Ka Show", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773483235/THE_KI_KA_SHOW_kl2jmr.mp3" }
      ]
    },
    {
      title: "Comedy Sparklers",
      description: "Expertly crafting humorous audio 'sparklers' and engaging comedic elements that meet top-tier industry standards for broadcast and digital media.",
      tracks: [
        { name: "Dhuni Baba & Bhakt 1", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482543/DHUNI_BABA-BHAKT_S5_c4nzlq.mp3" },
        { name: "Dhuni Baba & Bhakt 2", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482545/DHUNI_BABA-BHAKT_S6_hh7qfx.mp3" },
        { name: "Dhuni Baba & Bhakt 3", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482546/DHUNI_BABA-BHAKT_S2_sqihc3.mp3" },
        { name: "Monsoon Moods 1", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482545/MONSOON_MOODS_L1_i8xwj2.mp3" },
        { name: "Monsoon Moods 2", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482545/MONSOON_MOODS_L2_yubjd2.mp3" },
        { name: "Monsoon Moods 3", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482547/MONSOON_MOODS_L4_sm2du6.mp3" },
        { name: "Aaicha Chintu 1", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482543/AAICHA_CHINTU_N2_nsvksu.mp3" },
        { name: "Aaicha Chintu 2", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482543/AAICHA_CHINTU_N1_xfpwwe.mp3" }
      ]
    },
    {
      title: "Concept Promos",
      description: "Developing premium thematic audio assets for radio, delivering conceptually driven 'Special Day' creatives that resonate with audiences through superior production quality.",
      tracks: [
        { name: "Marathi Bhasha Gaurav Din", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482572/MARATHI_BHASHA_GAURAV_DIN_d7whml.mp3" },
        { name: "World Suicide Prevention Day", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482575/WORLD_SUICIDE_PREVENTION_DAY_PROMO_f89tid.mp3" },
        { name: "World Mosquito Day", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482572/WORLD_MOSQUITO_DAY_PROMO_hn4zxw.mp3" }
      ]
    },
    {
      title: "Power Confluence - Event Theme",
      description: "Crafted an Impactful theme track for a premium awards platform by 94.3 MY FM that celebrates the visionaries and industry leaders driving Nashik’s and Chatrapati Sambhajinagar’s economic and social progress.",
      tracks: [
        { name: "Nashik Edition", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773483255/POWER_CONFLUENCE_-Nashik_apamyf.mp3" },
        { name: "Chatrapati Sambhaji Nagar Edition", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773483253/POWER_CONFLUENCE_-SHAMBHAJI_NAGAR_xhmpoa.mp3" }
      ]
    },
    {
      title: "Horror Story - Bachelors Party",
      description: "Immersive sound design and storytelling for a spine-chilling horror narrative.",
      tracks: [
        { name: "Part 1", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482596/BACHLERS_PARTY_LINK_1_sy3pab.mp3" },
        { name: "Part 2", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482811/BACHLERS_PARTY_LINK_2_dycc1j.mp3" },
        { name: "Part 3", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482635/BACHLERS_PARTY_LINK_3_ggnsjs.mp3" },
        { name: "Part 4", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482676/BACHLERS_PARTY_LINK_4_nsrlrj.mp3" },
        { name: "Part 5", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773483100/BACHLERS_PARTY_LINK_5_kvc5al.mp3" }
      ]
    },
    {
      title: "Brand Jingles",
      description: "Crafting exclusive sonic signatures and high-impact jingles for a diverse portfolio of brands, defining their unique auditory presence in the market.",
      tracks: [
        { name: "Khatod Farms", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482514/KHATOD_FARMS_urtnla.mp3" },
        { name: "Tejasvi Jewellers", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482514/TEJASVI_JEWELLERS_tgmapw.mp3" },
        { name: "Manjeet Pride", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482515/MANJEET_PRIDE_bsvhoh.mp3" },
        { name: "Bramma Valley", url: "https://res.cloudinary.com/dqzuzvslm/video/upload/v1773482514/BHRAHMA_VALLEY_dofaro.mp3" }
      ]
    }
  ];

  const experiences = [
    {
      role: "Sound Engineer",
      company: "Radio My FM - Nashik",
      period: "Nov 2023 - Present",
      description: "Producing and ideating creatives for Nashik, Mumbai, and Pune markets. Played a key role in creating musical show bumpers for 9 new shows during the Maharashtra Revamp. Integrating AI in proactive audio creatives."
    },
    {
      role: "Sound Engineer",
      company: "Radio My FM - Chatrapati Sambhajinagar",
      period: "Jun 2023 - Nov 2023",
      description: "Produced Radio Advertisements, Paul Creatives, Promos, liners, bumpers, hotkeys, and other Radio Properties. Created musical jingles and special day show promos."
    },
    {
      role: "Promo Producer | Radio DJ",
      company: "Radio Orange - Nagpur",
      period: "Jan 2022 - May 2023",
      description: "Hosted and produced a weekend show 'Tune In Party'. Produced radio advertisements, promos, and liners for ROM region including 13 cities across 8 states."
    }
  ];

  const education = [
    {
      role: "Bachelor of Computer Science",
      company: "Nagpur University",
      period: "2017 - 2020",
      description: "Foundation in computational logic and systems, providing a technical edge in the digital audio landscape."
    },
    {
      role: "Certificate in Radio Promo Production",
      company: "Art Pickle Institute - Nagpur",
      period: "2021",
      description: "Specialized training in radio-specific audio production and creative copywriting."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] selection:bg-emerald-500 selection:text-black font-sans">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 glass border-b-0 py-4 md:py-6">
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl md:text-2xl font-display font-bold tracking-tighter cursor-pointer"
            onClick={() => scrollToSection(null, 'about')}
          >
            PRIT<span className="text-emerald-500">.</span>KAMBLE
          </motion.div>
        </div>
      </nav>

      {/* Side Dot Navigation */}
      <SideNav activeIndex={activeIndex} onDotClick={(id) => scrollToSection(null, id)} />

      <main>
        {/* Hero Section */}
        <section id="about" ref={heroRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-mono text-xs uppercase tracking-widest mb-6">
                  Sonic Architect | AI Audio Engineer
                </span>
                <h1 className="text-5xl md:text-8xl font-display font-bold leading-[0.9] mb-8">
                  CRAFTING<br />
                  <span className="text-emerald-500 italic">SONIC</span><br />
                  EXPERIENCES.
                </h1>
                <p className="text-xl text-white/60 max-w-2xl mb-12 leading-relaxed">
                  Collaborative Audio Engineer leveraging 4+ years of commercial radio experience 
                  to architect immersive soundscapes. Expertly blending technical mixing mastery 
                  with AI-enhanced production to meet the evolving demands of today’s media landscape.
                </p>
              </motion.div>

              {/* Removed View Portfolio button */}
            </div>
          </div>

          {/* Decorative Visualizer */}
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-1/3 hidden lg:block pointer-events-none">
            <SoundVisualizer />
            <div className="mt-8 flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-64 h-64 rounded-full border border-emerald-500/20 flex items-center justify-center"
              >
                <div className="w-48 h-48 rounded-full border border-emerald-500/40 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Headphones size={48} className="text-emerald-500" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center py-32">
          <div className="container mx-auto px-6">
            <SectionHeading title="Technical Arsenal" subtitle="Expertise" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, i) => (
                <SkillCard key={i} name={skill.name} icon={skill.icon} />
              ))}
            </div>
            
            <div className="mt-20 py-12 border-y border-white/5 bg-white/[0.02] rounded-3xl">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { label: "Years Experience", val: "4+" },
                    { label: "Audio Creatives", val: "2000+" },
                    { label: "Markets", val: "9+" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-4xl font-display font-bold text-emerald-500 mb-1">{stat.val}</div>
                      <div className="text-xs font-mono uppercase tracking-widest text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section ref={portfolioRef} id="portfolio" className="min-h-screen flex items-center py-32 bg-white/[0.02]">
          <div className="container mx-auto px-6">
            <SectionHeading title="Auditory Landscapes" subtitle="Portfolio" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioItems.map((item, i) => (
                <PortfolioCard 
                  key={i} 
                  index={i} 
                  {...item} 
                  activeTrackId={activeTrackId}
                  loadingTrackId={loadingTrackId}
                  onTogglePlay={togglePlay}
                />
              ))}
            </div>
            <audio 
              ref={audioRef} 
              onEnded={() => setActiveTrackId(null)}
              className="hidden"
              preload="metadata"
            />
          </div>
        </section>

        {/* Experiments Section */}
        <section id="experiments" className="min-h-screen flex items-center py-32 bg-white/[0.01]">
          <div className="container mx-auto px-6">
            <SectionHeading title="Experimental Lab" subtitle="Innovation" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-[2rem] border border-white/5 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold">AI Radio Automation Tool</h3>
                    <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">[Beta Stage]</span>
                  </div>
                </div>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Building an integrated AI ecosystem to streamline the end-to-end production of radio commercials.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <span className="text-white font-bold block mb-1">Script Intelligence</span>
                      <p className="text-sm text-white/50">Analyzing copy to provide creative suggestions and tone matching.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <span className="text-white font-bold block mb-1">Automated Synthesis</span>
                      <p className="text-sm text-white/50">Generating high-fidelity voiceovers and bespoke musical scores.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Project 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass p-8 rounded-[2rem] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Radio size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-bold">In-Store Radio Architect</h3>
                </div>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Specializing in end-to-end In-Store Radio ecosystems for large-scale retail complexes and hospitality groups.
                </p>
                <div className="space-y-6 mt-auto">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 shrink-0">
                      <Layers size={18} />
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">
                      I architect bespoke sonic environments remotely, managing the entire lifecycle.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="work" className="min-h-screen flex items-center py-32 bg-white/[0.01]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20">
              <div className="lg:w-1/3">
                <SectionHeading title="Professional Journey" subtitle="Career" />
                <p className="text-white/50 mb-8 leading-relaxed">
                  From interning at Radio Orange to leading sound engineering at My FM.
                </p>
                
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
                  <button 
                    onClick={() => setActiveTab('experience')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'experience' ? 'bg-emerald-500 text-black' : 'text-white/60 hover:text-white'}`}
                  >
                    Experience
                  </button>
                  <button 
                    onClick={() => setActiveTab('education')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'education' ? 'bg-emerald-500 text-black' : 'text-white/60 hover:text-white'}`}
                  >
                    Education
                  </button>
                </div>
              </div>

              <div className="lg:w-2/3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {(activeTab === 'experience' ? experiences : education).map((item, i) => (
                      <ExperienceItem key={i} index={i} {...item} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center py-32">
          <div className="container mx-auto px-6">
            <div className="glass rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">Let's make some <span className="text-emerald-500">noise</span>.</h2>
                
                <div className="grid sm:grid-cols-3 gap-8 mb-12">
                  <div className="flex flex-col items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                      <Mail size={20} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Email</p>
                      <p className="font-medium text-sm">preetkamble777@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                      <Phone size={20} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Phone</p>
                      <p className="font-medium text-sm">+91 7083767924</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                      <MapPin size={20} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Location</p>
                      <p className="font-medium text-sm">Nagpur, Maharashtra</p>
                    </div>
                  </div>
                </div>

                <footer className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                  <p className="text-white/40 text-xs font-mono uppercase">
                    © 2026 PRIT KAMBLE
                  </p>
                  <div className="flex gap-8 text-white/40 text-xs font-mono uppercase tracking-widest">
                    <a href="https://www.linkedin.com/in/prit-kamble-20315317b" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">LinkedIn</a>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
