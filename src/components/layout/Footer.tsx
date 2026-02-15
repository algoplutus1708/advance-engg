import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Footer() {
  return (
    <>
      {/* Careers Banner */}
      <section className="py-24 md:py-32 bg-surface overflow-hidden">
        <div className="container-tight text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Driven by a higher purpose?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="mt-2 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-muted-foreground">
              Join us.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <motion.a
              href="mailto:hr@advanceng.in"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center mt-12 px-10 py-5 rounded-full bg-foreground text-background font-medium text-lg transition-colors hover:bg-foreground/90"
            >
              Send your CV to hr@advanceng.in
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.a>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-20 md:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Column 1: Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <span className="text-5xl md:text-6xl font-bold tracking-tighter">
                Ae
              </span>
              <p className="mt-4 text-background/50 text-sm">
                Advance Engineering Company
              </p>
              <p className="mt-2 text-background/40 text-xs">
                Passionate about Precision Technology
              </p>
            </motion.div>

            {/* Column 2: Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <h4 className="font-medium mb-4 text-background/50 text-xs uppercase tracking-widest">
                Address
              </h4>
              <p className="text-background/80 leading-relaxed">
                6/41 Netaji Nagar,
                <br />
                Near Netaji Nagar Women's College,
                <br />
                Kolkata - 700091
              </p>
            </motion.div>

            {/* Column 3: Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <h4 className="font-medium mb-4 text-background/50 text-xs uppercase tracking-widest">
                Contact
              </h4>
              <div className="space-y-3 text-background/80">
                <p>
                  <motion.a
                    href="mailto:info@advanceng.in"
                    whileHover={{ x: 4 }}
                    className="inline-block hover:text-background transition-colors"
                  >
                    info@advanceng.in
                  </motion.a>
                </p>
                <p>
                  <motion.a
                    href="tel:+913345180382"
                    whileHover={{ x: 4 }}
                    className="inline-block hover:text-background transition-colors"
                  >
                    033 451 80382
                  </motion.a>
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            viewport={{ once: true }}
            className="mt-20 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-background/40">
              © {new Date().getFullYear()} Advance Engineering Company
            </p>
            <p className="text-sm text-background/40">Make in India Initiative</p>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
