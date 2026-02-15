import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CircuitBoard, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import imwTechnology from "@/assets/imw-technology.jpg";

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
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const serviceSlides = [
  { image: img4, title: "Precision Preparation", subtitle: "Stage 4: Surface Grinding" },
  { image: img5, title: "Sensor Mapping", subtitle: "Stage 5: Position Layout" },
  { image: img6, title: "Bridge Formation", subtitle: "Stage 6: Strain Gauge Mounting" },
  { image: img7, title: "System Assembly", subtitle: "Stage 7: Jig Mounting" },
  { image: img8, title: "Technical Validation", subtitle: "Stage 8: Final Calibration" },
];

function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % serviceSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % serviceSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + serviceSlides.length) % serviceSlides.length);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      className="relative w-full aspect-video rounded-3xl overflow-hidden bg-neutral-900 shadow-xl"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction < 0 ? "100%" : "-100%", opacity: 0 }}
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
          className="absolute inset-0"
        >
          <img src={serviceSlides[currentSlide].image} alt={serviceSlides[currentSlide].title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        </motion.div>
      </AnimatePresence>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-8 left-8 z-20">
        <p className="text-white/70 text-xs uppercase tracking-widest mb-1">{serviceSlides[currentSlide].subtitle}</p>
        <h3 className="text-white text-2xl font-semibold">{serviceSlides[currentSlide].title}</h3>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <Layout>
      <section ref={heroRef} className="pt-36 pb-24 md:pt-48 md:pb-32 bg-background overflow-hidden">
        <motion.div style={{ y: heroY }} className="container-tight text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">Our Core Service</p>
          <h1 className="text-5xl md:text-7xl lg:text-[88px] font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Instrumented Measuring Wheelsets
          </h1>
        </motion.div>
      </section>

      <section className="py-20 bg-surface/50">
        <div className="container-wide">
          <AnimatedSection className="mb-10 text-center">
             <h3 className="text-3xl font-semibold mb-2">Technical Process</h3>
          </AnimatedSection>
          <ImageCarousel />
        </div>
      </section>

      <section className="py-28 bg-background">
        <div className="container-wide grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold">Innovation in Transport</h2>
            <p className="mt-8 text-lg text-muted-foreground">Eliminating dependency on foreign firms by manufacturing precision testing apparatus domestically.</p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="rounded-3xl overflow-hidden bg-surface aspect-square shadow-xl">
              <img src={img7} alt="Technical Assembly" className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}