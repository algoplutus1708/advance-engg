import { useRef } from "react";
import { Link } from "react-router-dom";
import { Users, Train, Building2, ArrowRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import engineeringLab from "@/assets/engineering-lab.jpg";

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

const teamCredentials = [
  {
    icon: Users,
    number: "01",
    title: "Alumni from IIT-KGP",
    description: "World-class engineers from India's premier technical institution.",
  },
  {
    icon: Train,
    number: "02",
    title: "Experts from Indian Railways",
    description: "Decades of railway engineering and operations experience.",
  },
  {
    icon: Building2,
    number: "03",
    title: "Veterans from Alstom & Siemens",
    description: "Global expertise from leading transport technology companies.",
  },
];

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <Layout>
      {/* Header Section */}
      <section ref={heroRef} className="pt-36 pb-24 md:pt-48 md:pb-36 bg-background overflow-hidden">
        <motion.div style={{ y: heroY }} className="max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6"
          >
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-5xl md:text-6xl lg:text-[80px] font-bold text-foreground leading-[1.02] tracking-tight"
          >
            Challenging the
            <br />
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Status Quo.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-8 text-xl md:text-2xl text-muted-foreground font-light"
          >
            We interrupt old ideas to craft a new legacy for India.
          </motion.p>
        </motion.div>
      </section>

      {/* The Founder Story - Split Layout */}
      <section className="py-28 md:py-36 bg-surface">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo - Left */}
            <AnimatedSection>
              <div className="relative group">
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  src={engineeringLab}
                  alt="Advance Engineering Company"
                  className="w-full rounded-3xl shadow-2xl shadow-foreground/5"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </AnimatedSection>

            {/* Text - Right */}
            <div className="lg:pl-8">
              <AnimatedSection delay={0.1}>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">
                  Our Story
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <h2 className="text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-8">
                  A Vision for India's Future
                </h2>
              </AnimatedSection>
              <div className="space-y-6">
                <AnimatedSection delay={0.3}>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Founded by{" "}
                    <span className="text-foreground font-medium">
                      Mrs. Srabanti Ghosh
                    </span>{" "}
                    in 2020. A visionary entrepreneur from a distinguished business
                    family, she emphasizes forward-thinking strategies that position
                    India at the forefront of precision engineering.
                  </p>
                </AnimatedSection>
                <AnimatedSection delay={0.4}>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Her leadership demonstrates that modern Indian companies are
                    talented, capable, and prove their mettle in various fields of
                    the industry.
                  </p>
                </AnimatedSection>
                <AnimatedSection delay={0.5}>
                  <div className="pt-8 border-t border-border/50">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      <span className="text-foreground font-medium">
                        Mr. Tirthankar Ghosh
                      </span>{" "}
                      provides invaluable technical insight with his engineering
                      background, guiding the company's precision engineering
                      operations.
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Team - Grid Layout */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container-wide">
          {/* Section Header */}
          <div className="max-w-2xl mb-20">
            <AnimatedSection>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
                Our People
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
                Reputations are
                <br />
                always earned.
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="mt-6 text-xl text-muted-foreground">
                That's what makes our people so important.
              </p>
            </AnimatedSection>
          </div>

          {/* Credentials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {teamCredentials.map((credential, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, margin: "-50px" });

              return (
                <motion.div
                  ref={ref}
                  key={credential.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-surface rounded-3xl p-10 cursor-pointer transition-shadow duration-500 hover:shadow-2xl hover:shadow-foreground/5"
                >
                  {/* Bold Number */}
                  <span className="text-6xl font-bold bg-gradient-to-b from-foreground/20 to-foreground/5 bg-clip-text text-transparent">
                    {credential.number}
                  </span>

                  {/* Icon */}
                  <div className="mt-6 mb-6">
                    <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                      <credential.icon className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    {credential.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {credential.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-28 md:py-36 bg-foreground text-background">
        <div className="container-tight text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
              Join Our Mission
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-8 text-xl text-background/70 max-w-2xl mx-auto leading-relaxed">
              If you are driven by a higher purpose and want to do something for the
              country whilst achieving your goals, this is the perfect place for you.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <Link
              to="/careers"
              className="inline-flex items-center justify-center mt-12 px-10 py-5 bg-background text-foreground rounded-full font-medium text-lg transition-all duration-300 hover:bg-background/90 hover:scale-105"
            >
              View Careers
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
