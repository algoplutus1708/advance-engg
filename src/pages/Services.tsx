import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cog, CircuitBoard, CheckCircle } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import imwTechnology from "@/assets/imw-technology.jpg";

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
  "Comprehensive pre-handover validation",
  "Elimination of import bottlenecks",
  "Meeting stringent compliance deadlines",
];

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
            <AnimatedSection delay={0.2}>
              <div className="relative">
                {/* Technical Schematic Placeholder */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-square bg-gradient-to-br from-surface to-surface/50 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl shadow-foreground/5"
                >
                  <div className="relative z-10 text-center p-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 mx-auto mb-6 rounded-full bg-background flex items-center justify-center shadow-xl"
                    >
                      <Cog className="w-16 h-16 text-foreground" />
                    </motion.div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                      IMW Technical Schematic
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      Precision Engineered Wheelset
                    </p>
                  </div>
                  {/* Decorative circles */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 border border-foreground/5 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-16 border border-foreground/10 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-24 border border-foreground/5 rounded-full"
                  />
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
                <div className="mt-10 grid grid-cols-2 gap-4">
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
