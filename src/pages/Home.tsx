import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Train, Shield, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

import vandeBharatHero from "@/assets/vande-bharat-hero.jpg";

// Project Images (Resized to 1920x1080)
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg";
import img7 from "@/assets/7.jpg";
import img8 from "@/assets/8.jpg";

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FeatureCard({ title, description, icon: Icon, delay }: { title: string; description: string; icon: React.ElementType; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group bg-surface rounded-3xl p-10 md:p-12 cursor-pointer transition-shadow duration-500 hover:shadow-2xl hover:shadow-foreground/5"
    >
      <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors duration-300">
        <Icon className="w-7 h-7 text-foreground" />
      </div>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{title}</h3>
      <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

const carouselSlides = [
  { image: img1, title: "Receiving Raw Wheelsets", subtitle: "Stage 1: Initial Inspection" },
  { image: img2, title: "Preparation for Sandblasting", subtitle: "Stage 2: Masking & Safety" },
  { image: img3, title: "Sandblasting Operations", subtitle: "Stage 3: Surface Cleaning" },
  { image: img4, title: "Precision Grinding", subtitle: "Stage 4: Smoothing for Sensors" },
  { image: img5, title: "Strain Gauge Marking", subtitle: "Stage 5: Position Layout" },
  { image: img6, title: "Sensor Mounting", subtitle: "Stage 6: Gauge Integration" },
  { image: img7, title: "Telemetry Integration", subtitle: "Stage 7: Jig Mounting" },
  { image: img8, title: "Final Calibration", subtitle: "Stage 8: Precision Load Testing" },
];

function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      className="relative w-full aspect-video rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction < 0 ? "100%" : "-100%", opacity: 0 }}
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 } }}
          className="absolute inset-0"
        >
          {/* object-cover ensures your 1920x1080 images fill the 16:9 container perfectly */}
          <img
            src={carouselSlides[currentSlide].image}
            alt={carouselSlides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        </motion.div>
      </AnimatePresence>

      <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-10 left-10 z-20 pointer-events-none">
        <p className="text-white/70 text-sm uppercase tracking-widest mb-2">{carouselSlides[currentSlide].subtitle}</p>
        <h3 className="text-white text-3xl md:text-4xl font-bold">{carouselSlides[currentSlide].title}</h3>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <Layout>
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={vandeBharatHero} alt="Vande Bharat Express" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-[88px] font-bold text-white leading-tight">Passionate about Precision Technology</h1>
          <p className="mt-8 text-xl text-white/80 font-light">The premier partner for Indian Railways and RDSO.</p>
          <Link to="/services" className="inline-flex items-center justify-center mt-10 px-8 py-4 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform">
            Explore Services <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container-wide">
          <AnimatedSection className="text-center mb-12">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Our Process</p>
            <h2 className="text-4xl md:text-5xl font-semibold">Engineering Excellence</h2>
          </AnimatedSection>
          <ImageCarousel />
        </div>
      </section>

      <section className="py-32 md:py-40 bg-surface">
        <div className="container-wide grid md:grid-cols-3 gap-6">
          <FeatureCard icon={Shield} title="Partner with RDSO" description="Trusted by the premier R&D wing of Indian Railways." delay={0.1} />
          <FeatureCard icon={Train} title="Make in India" description="Domestic manufacturing of high-precision telemetry." delay={0.2} />
          <FeatureCard icon={Zap} title="Future Ready" description="Innovative solutions for high-speed rail validation." delay={0.3} />
        </div>
      </section>
    </Layout>
  );
}
