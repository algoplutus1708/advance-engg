import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cog, CircuitBoard, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import imwTechnology from "@/assets/imw-technology.jpg";

// New Numeric Project Images
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg"; // Imported the new image

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

const capabilities = [
  "Custom-engineered testing equipment",
  "Surface preparation final stage complete",
  "Strain gauges marking started",
  "Elimination of import bottlenecks",
  "Meeting stringent compliance deadlines",
];

const serviceSlides = [
  {
    image: img1,
    title: "Surface Prep: Stage 1",
    subtitle: "Cleaned and prepped wheelset surface",
  },
  {
    image: img3,
    title: "Marking Process",
    subtitle: "Precision layout for strain gauges",
  },
  {
    image: img2,
    title: "Surface Inspection",
    subtitle: "Quality check before sensor application",
  },
  {
    image: img4,
    title: "Sensor Placement",
    subtitle: "Aligning gauges for optimal data collection",
  },
  {
    image: img5,
    title: "Lab Operations",
    subtitle: "Ongoing testing and calibration",
  },
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-surface shadow-2xl shadow-black/5"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="absolute inset-0"
        >
          <img
            src={serviceSlides[currentSlide].image}
            alt={serviceSlides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {serviceSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "w-8 bg-white" 
                : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-12 md:bottom-16 left-6 md:left-10 z-20"
        >
          <p className="text-white/70 text-xs md:text-sm uppercase tracking-widest mb-1">
            {serviceSlides[currentSlide].subtitle}
          </p>
          <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold">
            {serviceSlides[currentSlide].title}
          </h3>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <Layout>
      {/* Hero Section - Massive Gradient Title */}
      <section ref={heroRef} className="pt-36 pb-24 md:pt-48 md:pb-32 bg-background overflow-hidden">
        <motion.div style={{ y: heroY }} className="container-tight text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6"
          >
            Our Core Service
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-[88px] font-bold tracking-tight leading-[0.95] bg-gradient-to-b from-muted-foreground via-foreground to-foreground bg-clip-text text-transparent"
          >
            Instrumented
            <br />
            Measuring
            <br />
            Wheelsets
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-10 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            Precision testing technology for India's transport revolution.
          </motion.p>
        </motion.div>
      </section>

      {/* Carousel Section */}
      <section className="py-20 md:py-28 bg-surface/50">
        <div className="container-wide">
          <AnimatedSection className="mb-10 text-center">
             <h3 className="text-3xl font-semibold mb-2">Live Status</h3>
             <p className="text-muted-foreground">Current project milestones and operations</p>
          </AnimatedSection>
          <ImageCarousel />
        </div>
      </section>

      {/* Section 1: The Void - White Background */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <AnimatedSection>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
                  The Challenge
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  The Void in
                  <br />
                  Transport
                </h2>
              </AnimatedSection>
              <div className="mt-10 space-y-6">
                <AnimatedSection delay={0.2}>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Addressing the critical lack of specialized testing apparatus
                    in India. The transport sector has long suffered from a
                    significant gap in validation capabilities.
                  </p>
                </AnimatedSection>
                <AnimatedSection delay={0.3}>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Eliminating the dependency on European firms and logistical
                    delays that result in punishing project penalties, complex
                    customs procedures, and missed compliance deadlines.
                  </p>
                </AnimatedSection>
              </div>
            </div>
            
            {/* Replaced Placeholder with Image 6.jpg */}
            <AnimatedSection delay={0.2}>
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-square bg-surface rounded-3xl overflow-hidden shadow-2xl shadow-foreground/5 relative group"
                >
                  <img 
                    src={img6} 
                    alt="IMW Technical Schematic" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-sm font-medium text-white/90 uppercase tracking-widest">
                      IMW Technical Schematic
                    </p>
                    <p className="text-xs text-white/60 mt-2">
                      Precision Engineered Wheelset
                    </p>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Section 2: The Solution - Light Grey Background */}
      <section className="py-28 md:py-36 bg-surface">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                src={imwTechnology}
                alt="IMW Technology"
                className="rounded-3xl w-full shadow-2xl shadow-foreground/5"
              />
            </AnimatedSection>
            <div className="order-1 lg:order-2">
              <AnimatedSection>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
                  The Solution
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Domestic
                  <br />
                  Innovation
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
                  We provide timely, custom-engineered testing equipment
                  manufactured domestically, eliminating import bottlenecks for
                  multinational corporations.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {capabilities.map((capability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-foreground flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{capability}</span>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
                <div className="mt-10 flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center"
                  >
                    <CircuitBoard className="w-7 h-7 text-background" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-foreground">Made in India</p>
                    <p className="text-sm text-muted-foreground">
                      Custom-engineered solutions
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* RDSO Partnership */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container-tight text-center">
          <AnimatedSection>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">
              Government Partnership
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              RDSO Collaboration
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Research, Designs & Standards Organisation (RDSO), the premier R&D
              Wing and technical advisor of Indian Railways.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-14 bg-surface rounded-3xl p-10 md:p-14"
            >
              <blockquote className="text-2xl md:text-3xl font-light text-foreground leading-relaxed">
                "Advance Engineering Company is the{" "}
                <span className="font-semibold">only Indian company</span> with the
                necessary credentials chosen by RDSO to collaborate with Indian
                Railways on IMW testing."
              </blockquote>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 md:py-36 bg-foreground text-background">
        <div className="container-tight text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Partner With Us
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-8 text-xl text-background/70 max-w-xl mx-auto leading-relaxed">
              Eliminate import bottlenecks and accelerate your transport projects
              with India's premier testing partner.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center mt-12 px-10 py-5 rounded-full bg-background text-foreground font-medium text-lg transition-all duration-300 hover:bg-background/90 hover:scale-105"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}