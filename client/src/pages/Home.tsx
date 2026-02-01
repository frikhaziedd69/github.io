import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Video, 
  Globe, 
  Clock, 
  Palette, 
  BookOpen, 
  PenTool, 
  Sparkles,
  Loader2,
  Expand,
  X,
  Linkedin,
  Facebook,
  Instagram
} from "lucide-react";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";

// Assets
import heroBg from "@assets/IMG_5241_1766236580283.jpeg";

// Gallery Images - Split into Artwork and Workshop sections
const myDigitalArtwork = [
  { src: "/images/portfolio-character-1.jpg", title: "Character Design" },
  { src: "/images/portfolio-character-2.png", title: "Digital Coloring" },
  { src: "/images/portfolio-character-3.png", title: "Action Poses" },
];

const mySketches = [
  { src: "/images/sketch-paper-1.jpg", title: "Paper Sketches - Composition" },
  { src: "/images/sketch-paper-2.jpg", title: "Paper Sketches - Dynamic Poses" },
  { src: "/images/sketch-paper-3.jpg", title: "Paper Sketches - Panel Work" },
];

const workshopPhotos = [
  { src: "/images/classroom-1.jpg", title: "Workshop Session" },
  { src: "/images/classroom-2.jpg", title: "Student Feedback" },
  { src: "/images/classroom-3.jpg", title: "Live Teaching" },
  { src: "/images/students-working.jpg", title: "Students at Work" },
  { src: "/images/students-certificates.jpg", title: "Student Success" },
  { src: "/images/student-work-panels-1.jpg", title: "Student Work Review" },
];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const createInquiry = useCreateInquiry();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    createInquiry.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Manga Art Studio" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 to-purple-900/40 backdrop-blur-[2px]" />
          {/* Halftone Pattern Overlay */}
          <div className="absolute inset-0 bg-halftone from-white/5 to-transparent opacity-20" />
        </div>

        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl text-white"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Accepting New Students for 2026
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 tracking-tight">
              Master Manga Art with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                Personalized Guidance
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed max-w-2xl font-light">
              Transform your sketches into professional artwork through my step-by-step 1-on-1 mentorship program tailored to your unique style.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center text-sm md:text-base text-purple-200 mb-10">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> 3+ Years Teaching Experience</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> International Students Welcomed</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> English & Arabic Support</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact"
                className="px-8 py-4 rounded-xl bg-white text-purple-900 font-bold text-lg hover:bg-purple-50 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#portfolio"
                className="px-8 py-4 rounded-xl bg-transparent border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center"
              >
                View Student Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEACHING METHODOLOGY */}
      <section id="methodology" className="py-24 bg-secondary/30 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading 
            title="My Teaching Philosophy" 
            subtitle="The Path to Mastery"
            alignment="center"
          />

          <p className="text-center max-w-2xl mx-auto text-lg text-muted-foreground mb-16">
            I believe every artist has a unique magic hand. My role isn't just to teach you how to draw, but to help you discover and refine your personal style through structured, supportive guidance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: BookOpen, 
                title: "Fundamentals", 
                desc: "Anatomy, perspective, and composition basics that form the backbone of all great art." 
              },
              { 
                icon: Palette, 
                title: "Character Design", 
                desc: "Creating memorable characters with distinct personalities through shape language and costume." 
              },
              { 
                icon: PenTool, 
                title: "Storytelling", 
                desc: "Visual narrative techniques, paneling flow, and pacing to make your manga readable and exciting." 
              },
              { 
                icon: Sparkles, 
                title: "Advanced Tech", 
                desc: "Inking, screening, and digital tools to give your work that professional polished finish." 
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section 1: My Digital Artwork */}
          <div className="mb-20">
            <SectionHeading 
              title="My Digital Artwork" 
              subtitle="Original Works"
              alignment="left"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {myDigitalArtwork.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl bg-gray-100 manga-panel"
                  onClick={() => setSelectedImage(img.src)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.title}
                    </h3>
                    <p className="text-white/80 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      Click to enlarge
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <Expand className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sketches Subsection */}
            <div className="border-t pt-12">
              <h3 className="text-2xl font-display font-bold mb-2 text-purple-900">My Sketches on Paper</h3>
              <p className="text-muted-foreground mb-8">Hand-drawn sketches that show my artistic process</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mySketches.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl bg-gray-100 manga-panel"
                    onClick={() => setSelectedImage(img.src)}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {img.title}
                      </h3>
                      <p className="text-white/80 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        Click to enlarge
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <Expand className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Workshop Photos */}
          <div className="border-t pt-12">
            <SectionHeading 
              title="Workshop Sessions" 
              subtitle="Teaching in Action"
              alignment="left"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshopPhotos.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl bg-gray-100 manga-panel"
                  onClick={() => setSelectedImage(img.src)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.title}
                    </h3>
                    <p className="text-white/80 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      Click to enlarge
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <Expand className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
            <X className="w-10 h-10" />
          </button>
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={selectedImage}
            alt="Gallery Fullscreen"
            className="max-h-[90vh] max-w-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      {/* SERVICES & PRICING */}
      <section id="services" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Abstract shapes in background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full" />
           <div className="absolute bottom-20 right-20 w-96 h-96 border-4 border-white rotate-45" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading 
            title="Choose Your Path" 
            subtitle="Curriculum Options"
            light={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Beginner",
                price: "$24 / 2 hours",
                features: ["Basic Anatomy", "Face Proportions", "Line Art Basics", "2 Hours Session"],
                ideal: "Just starting out"
              },
              {
                title: "Intermediate",
                price: "$79 / Month",
                features: ["Perspective & Backgrounds", "Clothing & Folds", "Dynamic Posing", "Weekly Assignments: 2 hours / Session"],
                ideal: "Building skills",
                highlight: true
              },
              {
                title: "Advanced",
                price: "$149 / Month",
                features: ["Portfolio Development", "Storyboarding", "Professional Inking", "Weekly Assignments: 2 hours / Session"],
                ideal: "Career focused"
              }
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className={`rounded-2xl p-8 flex flex-col h-full relative ${
                  plan.highlight 
                    ? "bg-purple-100 text-foreground shadow-2xl scale-105 border-4 border-purple-400" 
                    : "bg-purple-700 backdrop-blur-md border border-purple-600 text-white hover:bg-purple-600"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? "text-purple-900" : "text-white"}`}>{plan.title}</h3>
                  <p className={`text-lg font-bold mb-2 ${plan.highlight ? "text-purple-700" : "text-purple-100"}`}>{plan.price}</p>
                  <p className={`text-sm ${plan.highlight ? "text-purple-600" : "text-purple-200"}`}>
                    Ideal for: {plan.ideal}
                  </p>
                </div>
                
                <div className="flex-grow space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${plan.highlight ? "text-purple-700" : "text-purple-300"}`} />
                      <span className={`text-sm font-medium ${plan.highlight ? "text-purple-900" : "text-white"}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <a 
                  href="#contact"
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all ${
                    plan.highlight
                      ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/30"
                      : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
                >
                  Inquire Now
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <Globe className="w-8 h-8 mx-auto mb-2 text-purple-200" />
              <h4 className="font-bold">International Friendly</h4>
              <p className="text-sm text-purple-200">Time zone accommodations available</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <Video className="w-8 h-8 mx-auto mb-2 text-purple-200" />
              <h4 className="font-bold">Online Classes</h4>
              <p className="text-sm text-purple-200">Live 1-on-1 via Zoom or Google Meet</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <Clock className="w-8 h-8 mx-auto mb-2 text-purple-200" />
              <h4 className="font-bold">Flexible Scheduling</h4>
              <p className="text-sm text-purple-200">Sessions that fit your life</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-xl overflow-hidden border border-border">
            <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
              {/* Info Sidebar */}
              <div className="bg-primary p-10 text-white lg:col-span-2 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-display font-bold mb-6">Let's Draw Together</h3>
                  <p className="text-purple-100 mb-8 leading-relaxed">
                    Ready to take your art to the next level? Fill out the form and I'll get back to you within 24 hours.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-purple-200">Email</p>
                        <p className="font-medium">contact@mangaart.com</p>
                      </div>
                    </div>
                    {/* Add more contact info here if needed */}
                  </div>
                </div>
                
                <div className="mt-10 lg:mt-0">
                  <div className="w-full h-32 bg-white/10 rounded-xl relative overflow-hidden p-6 flex items-center justify-center">
                    <p className="font-display font-bold text-xl italic opacity-80">"Art is not what you see, but what you make others see."</p>
                  </div>
                </div>
              </div>

              {/* Form Area */}
              <div className="p-10 lg:col-span-3 bg-white">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Name</label>
                      <input
                        {...form.register("name")}
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Your name"
                      />
                      {form.formState.errors.name && (
                        <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Email</label>
                      <input
                        {...form.register("email")}
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="you@example.com"
                      />
                      {form.formState.errors.email && (
                        <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Phone Number</label>
                      <input
                        {...form.register("phone")}
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Country & Timezone</label>
                      <input
                        {...form.register("country")}
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="e.g. USA (EST)"
                      />
                      {form.formState.errors.country && (
                        <p className="text-xs text-destructive">{form.formState.errors.country.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Message</label>
                    <textarea
                      {...form.register("message")}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Tell me about your art goals..."
                    />
                    {form.formState.errors.message && (
                      <p className="text-xs text-destructive">{form.formState.errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={createInquiry.isPending}
                    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {createInquiry.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                      </>
                    ) : (
                      "Send Inquiry"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA SECTION */}
      <section className="bg-purple-900 text-white py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <p className="text-lg font-semibold">Follow My Journey</p>
            <div className="flex gap-6">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
                title="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
                title="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-border py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <span className="font-display font-bold text-xl tracking-tight">
              Manga Art<span className="text-primary">.</span>
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Manga Art Teacher. All rights reserved.</p>
            <div className="flex gap-4 justify-center md:justify-end mt-2">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
