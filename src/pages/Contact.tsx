import { useRef, useState } from "react";
import { Phone, Mail, MapPin, ArrowRight, Send, CheckCircle } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// UPDATED: Your new Google Apps Script URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxBOdbn3muxofeiFzV-yUUa07UEcBI58iTIppjU_UyZJkV2QhA6d7LXidiLXKEZ158U/exec"; 

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

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "033 451 80382",
    href: "tel:03345180382",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@advanceng.in",
    href: "mailto:info@advanceng.in",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "6/41 Netaji Nagar, Near Netaji Nagar Women's College, Kolkata - 700091",
    href: "https://maps.app.goo.gl/euZ4nbrgVPZWqo8L7",
  },
];

export default function Contact() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!GOOGLE_SCRIPT_URL) {
      toast({
        title: "Configuration Error",
        description: "Google Script URL is missing. Please update Contact.tsx.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Use URLSearchParams for better compatibility with Google Apps Script
      const params = new URLSearchParams();
      params.append("name", formData.name);
      params.append("email", formData.email);
      params.append("phone", formData.phone);
      params.append("company", formData.company);
      params.append("subject", formData.subject);
      params.append("message", formData.message);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: params,
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setIsSubmitted(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24-48 business hours.",
      });

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
        });
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission failed",
        description: "There was an error sending your message. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Contact Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-5xl md:text-6xl lg:text-[80px] font-bold text-foreground leading-[1.02] tracking-tight"
          >
            Get in
            <br />
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-8 text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto"
          >
            Ready to discuss your railway testing needs? We're here to help
            accelerate your transport projects.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="bg-background rounded-3xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
                  Send us a message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you shortly.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      Thank you!
                    </h3>
                    <p className="text-muted-foreground">
                      Your message has been sent successfully.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                          Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          className="h-12 rounded-xl bg-surface border-border focus:border-foreground transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          className="h-12 rounded-xl bg-surface border-border focus:border-foreground transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-foreground">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 12345 67890"
                          className="h-12 rounded-xl bg-surface border-border focus:border-foreground transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium text-foreground">
                          Company
                        </label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your company"
                          className="h-12 rounded-xl bg-surface border-border focus:border-foreground transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="How can we help?"
                        className="h-12 rounded-xl bg-surface border-border focus:border-foreground transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project or inquiry..."
                        rows={5}
                        className="rounded-xl bg-surface border-border focus:border-foreground transition-colors resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 rounded-xl bg-foreground text-background hover:bg-foreground/90 text-lg font-medium transition-all duration-300 hover:scale-[1.02]"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <div className="space-y-6">
              <AnimatedSection delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
                  Contact Information
                </h2>
              </AnimatedSection>

              {contactInfo.map((info, index) => {
                const ref = useRef(null);
                const isInView = useInView(ref, { once: true, margin: "-50px" });

                return (
                  <motion.a
                    ref={ref}
                    key={info.label}
                    href={info.href}
                    target={info.label === "Address" ? "_blank" : undefined}
                    rel={info.label === "Address" ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, x: 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                    whileHover={{ x: 8 }}
                    className="group flex items-start gap-5 bg-background rounded-2xl p-6 cursor-pointer transition-shadow duration-300 hover:shadow-xl hover:shadow-foreground/5"
                  >
                    <div className="w-14 h-14 shrink-0 bg-surface rounded-xl flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{info.label}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}

              <AnimatedSection delay={0.4}>
                <div className="mt-8 p-8 bg-background rounded-2xl">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
                    Business Hours
                  </p>
                  <p className="text-foreground font-medium">Monday - Saturday</p>
                  <p className="text-muted-foreground">9:00 AM - 6:00 PM IST</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <AnimatedSection>
        <section className="w-full h-[400px] md:h-[500px] bg-muted overflow-hidden">
          {/* Iframe Updated with the provided share link */}
          <iframe
            src="https://maps.app.goo.gl/euZ4nbrgVPZWqo8L7"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Advance Engineering Location"
            className="grayscale hover:grayscale-0 transition-all duration-700"
          />
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <section className="py-28 md:py-36 bg-foreground text-background">
        <div className="container-tight text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Ready to Get Started?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-xl text-background/70 max-w-2xl mx-auto leading-relaxed">
              For technical consulting, partnership opportunities, or to discuss
              how we can support your railway testing requirements, our team is here to help.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <motion.a
              href="mailto:info@advanceng.in"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center mt-12 px-10 py-5 rounded-full bg-background text-foreground font-medium text-lg transition-colors hover:bg-background/90"
            >
              Email Us Directly
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.a>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}