import { useRef } from "react";
import { Mail, ArrowRight } from "lucide-react";
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

const values = [
  {
    title: "Higher Purpose",
    description:
      "If you are driven by a higher purpose and want to do something for the country whilst achieving your goals, this is the perfect place for you.",
  },
  {
    title: "Innovation",
    description:
      "We challenge the status quo, interrupt old ideas, and bring in innovation to craft a new legacy for India.",
  },
  {
    title: "Excellence",
    description:
      "Reputations are always earned. That's what makes our people so important—we value expertise and dedication.",
  },
  {
    title: "Collaboration",
    description:
      "Work alongside professionals from IIT-KGP, Indian Railways, Alstom, Siemens, and other renowned institutions.",
  },
];

export default function Careers() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "15%"]);
  const imageScale = useTransform(imageProgress, [0, 1], [1.1, 1]);

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="pt-36 pb-24 md:pt-48 md:pb-32 bg-background overflow-hidden">
        <motion.div style={{ y: heroY }} className="container-tight text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6"
          >
            Careers
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-5xl md:text-6xl lg:text-[80px] font-bold text-foreground leading-[1.02] tracking-tight"
          >
            Join Our
            <br />
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Mission
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-8 text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto"
          >
            Be part of India's transformation into a global manufacturing,
            design, and innovation hub.
          </motion.p>
        </motion.div>
      </section>

      {/* Full Width Image with Parallax */}
      <section ref={imageRef} className="w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <motion.img
          style={{ scale: imageScale }}
          src={engineeringLab}
          alt="Advance Engineering Team"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Values */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container-wide">
          <div className="max-w-2xl mb-20">
            <AnimatedSection>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
                Why Join Us
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                What We
                <br />
                Stand For
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="mt-6 text-xl text-muted-foreground">
                At Advance Engineering, we believe in building not just careers, but legacies.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, margin: "-50px" });

              return (
                <motion.div
                  ref={ref}
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-surface rounded-3xl p-10 cursor-pointer transition-shadow duration-500 hover:shadow-2xl hover:shadow-foreground/5"
                >
                  <span className="text-5xl font-bold bg-gradient-to-b from-foreground/20 to-foreground/5 bg-clip-text text-transparent">
                    0{index + 1}
                  </span>
                  <h3 className="text-2xl font-semibold mt-6 mb-4 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-28 md:py-36 bg-surface">
        <div className="container-tight text-center">
          <AnimatedSection>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              Open Positions
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Ready to Make an Impact?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-6 text-xl text-muted-foreground max-w-xl mx-auto">
              We're always looking for talented engineers and professionals who share our passion for precision technology.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-14 bg-background rounded-3xl p-10 md:p-14"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 mx-auto bg-surface rounded-2xl flex items-center justify-center mb-8"
              >
                <Mail className="w-10 h-10" />
              </motion.div>
              <h3 className="text-3xl font-semibold mb-4">Apply Now</h3>
              <p className="text-muted-foreground mb-10 max-w-md mx-auto text-lg">
                If you are interested in joining our team, please send your
                updated CV to our HR department.
              </p>
              <motion.a
                href="mailto:hr@advanceng.in"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-10 py-5 bg-foreground text-background rounded-full font-medium text-lg transition-colors hover:bg-foreground/90"
              >
                hr@advanceng.in
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Backgrounds */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container-tight text-center">
          <AnimatedSection>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              Our Team
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              World-Class Colleagues
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-6 text-xl text-muted-foreground max-w-xl mx-auto">
              Join a team of experienced professionals from India's most prestigious institutions and companies.
            </p>
          </AnimatedSection>

          <div className="mt-14 flex flex-wrap justify-center gap-4">
            {[
              "IIT Kharagpur",
              "Indian Railways",
              "Alstom",
              "Siemens",
              "RDSO",
            ].map((org, index) => (
              <motion.span
                key={org}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-8 py-4 bg-surface rounded-full text-base font-medium cursor-default"
              >
                {org}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
