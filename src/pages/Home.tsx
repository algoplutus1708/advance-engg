import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Train, Shield, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

// Original Asset
import vandeBharatHero from "@/assets/vande-bharat-hero.jpg";

// New Numeric Project Images
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";

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
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
        {title}
      </h3>
      <p className="text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

// Carousel data - Using numeric images 1-5
const carouselSlides = [
  {
    image: img1,
    title: "Surface Preparation",
    subtitle: "Final stage of wheelset surface prep complete",
  },
  {
    image: img3,
    title: "Strain Gauge Marking",
    subtitle: "Precision marking process in progress",
  },
  {
    image: img2,
    title: "Technical Validation",
    subtitle: "Ensuring surface integrity before installation",
  },
  {
    image: img4,
    title: "Gauge Installation",
    subtitle: "Preparing for sensor mounting",
  },
  {
    image: img5,
    title: "IMW Project Status",
    subtitle: "Live view from the engineering floor",
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
      className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-surface"
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
            src={carouselSlides[currentSlide].image}
            alt={carouselSlides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {carouselSlides.map((_, index) => (
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
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Title Overlay */}
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
            {carouselSlides[currentSlide].subtitle}
          </p>
          <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold">
            {carouselSlides[currentSlide].title}
          </h3>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <Layout>
      {/* Hero Section - Full Screen with Static Image */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src={vandeBharatHero}
            alt="Vande Bharat Express - Indian Railways"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </motion.div>

        {/* Hero Content - Centered */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-[88px] font-bold text-white leading-[1.02] tracking-tight"
          >
            Passionate about
            <br />
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Precision Technology
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-8 text-xl md:text-2xl text-white/80 font-light tracking-wide"
          >
            The premier partner for Indian Railways and RDSO.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Link
              to="/services"
              className="inline-flex items-center justify-center mt-10 px-8 py-4 bg-white text-black rounded-full font-medium text-base transition-all duration-300 hover:bg-white/90 hover:scale-105"
            >
              Explore Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2.5 bg-white/70 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Section 2: The Mission (Make in India) */}
      <section className="py-32 md:py-40 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground font-light">
              Under the guidance of Prime Minister Of India, we are proud
              to drive the <span className="font-semibold">Make in India</span> initiative.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-10 text-xl md:text-2xl leading-relaxed text-muted-foreground">
              Advance Engineering Company is the only Indian company accredited by
              RDSO to collaborate on{" "}
              <span className="text-foreground font-medium">
                Instrumented Measuring Wheelsets (IMW)
              </span>.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <Link
              to="/about"
              className="inline-flex items-center justify-center mt-14 px-10 py-5 bg-foreground text-background rounded-full font-medium text-lg transition-all duration-300 hover:opacity-85 hover:scale-105 hover:shadow-xl hover:shadow-foreground/10"
            >
              Learn More
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Divider */}
      <div className="container-wide">
        <div className="h-px bg-border" />
      </div>

      {/* Image Carousel Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-wide">
          <AnimatedSection className="text-center mb-12">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              Our Work
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
              Engineering Excellence
            </h2>
          </AnimatedSection>

          <ImageCarousel />
        </div>
      </section>

      {/* Divider */}
      <div className="container-wide">
        <div className="h-px bg-border" />
      </div>

      {/* Section 3: Feature Grid */}
      <section className="py-32 md:py-40 bg-background">
        <div className="container-wide">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              Why Choose Us
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
              Built for Excellence
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Shield}
              title="RDSO Certified"
              description="The premier R&D Wing and technical advisor of Indian Railways, ensuring the highest standards."
              delay={0.1}
            />
            <FeatureCard
              icon={Train}
              title="Made in India"
              description="Proudly manufacturing precision testing equipment domestically, reducing dependencies."
              delay={0.2}
            />
            <FeatureCard
              icon={Zap}
              title="Future Ready"
              description="Ensuring a strong future business outlook through strategic innovation and partnerships."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Large Quote Section */}
      <section className="py-32 md:py-40 bg-surface">
        <div className="container-tight text-center">
          <AnimatedSection>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight tracking-tight">
              "Challenging the status quo to craft a new legacy for India's transport sector."
            </blockquote>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-10 text-muted-foreground text-lg">
              — Mrs. Srabanti Ghosh, Founder
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-40 bg-foreground text-background">
        <div className="container-tight text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
              Ready to Partner?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-8 text-xl text-background/70 max-w-2xl mx-auto leading-relaxed">
              Join the Make in India movement. Accelerate your transport projects with
              India's premier testing partner.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center mt-12 px-10 py-5 bg-background text-foreground rounded-full font-medium text-lg transition-all duration-300 hover:bg-background/90 hover:scale-105"
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