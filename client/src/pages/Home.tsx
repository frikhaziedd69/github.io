import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
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
  MessageCircle,
  Facebook,
  Instagram
} from "lucide-react";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { normalizeArabicNumerals } from "@/lib/utils";

// Assets
import heroBg from "@assets/IMG_5241_1766236580283.jpeg";

// Gallery Images - Split into Artwork and Workshop sections
const myDigitalArtwork = [
  { src: "/images/portfolio-character-1.jpg", title: "portfolio.enlarge" },
  { src: "/images/portfolio-character-2.png", title: "portfolio.enlarge" },
  { src: "/images/portfolio-character-3.png", title: "portfolio.enlarge" },
];

const mySketches = [
  { src: "/images/sketch-paper-1.jpg", title: "portfolio.enlarge" },
  { src: "/images/sketch-paper-2.jpg", title: "portfolio.enlarge" },
  { src: "/images/sketch-paper-3.jpg", title: "portfolio.enlarge" },
];

const workshopPhotos = [
  { src: "/images/classroom-1.jpg", title: "portfolio.enlarge" },
  { src: "/images/classroom-2.jpg", title: "portfolio.enlarge" },
  { src: "/images/classroom-3.jpg", title: "portfolio.enlarge" },
  { src: "/images/students-working.jpg", title: "portfolio.enlarge" },
  { src: "/images/students-certificates.jpg", title: "portfolio.enlarge" },
  { src: "/images/student-work-panels-1.jpg", title: "portfolio.enlarge" },
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const createInquiry = useCreateInquiry();
  const isRtl = i18n.language === "ar";

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
    // Normalize phone number to ensure English numerals
    const normalizedData = {
      ...data,
      phone: normalizeArabicNumerals(data.phone),
    };

    // Send email via EmailJS
    emailjs.send(
      "service_1zsak8o",
      "template_2fvf1un",
      {
        name: normalizedData.name,
        phone_number: normalizedData.phone,
        country: normalizedData.country,
        message: normalizedData.message,
      },
      "lwYdfyBH1QlfP17WS"
    ).then(
      () => console.log("Email sent successfully"),
      (error) => console.error("EmailJS Error:", error)
    );

    createInquiry.mutate(normalizedData, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className={`min-h-screen bg-background font-sans ${isRtl ? "font-arabic" : ""}`} dir={isRtl ? "rtl" : "ltr"}>
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
            className={`max-w-3xl text-white ${isRtl ? "text-right" : "text-left"}`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {t("hero.badge")}
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 tracking-tight">
              {t("hero.title")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                {t("hero.title_span")}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed max-w-2xl font-light">
              {t("hero.desc")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center text-sm md:text-base text-purple-200 mb-10">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> {t("hero.exp")}</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> {t("hero.intl")}</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> {t("hero.support")}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="px-8 py-4 rounded-xl bg-white text-purple-900 font-bold text-lg hover:bg-purple-50 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group"
              >
                {t("hero.cta_start")}
                <ArrowRight className={`w-5 h-5 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
              </a>
              <a
                href="#portfolio"
                className="px-8 py-4 rounded-xl bg-transparent border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center"
              >
                {t("hero.cta_portfolio")}
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
            title={t("methodology.title")}
            subtitle={t("methodology.subtitle")}
            alignment="center"
          />

          <p className="text-center max-w-2xl mx-auto text-lg text-muted-foreground mb-16">
            {t("methodology.desc")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: t("methodology.fundamentals"),
                desc: t("methodology.fundamentals_desc")
              },
              {
                icon: Palette,
                title: t("methodology.character"),
                desc: t("methodology.character_desc")
              },
              {
                icon: PenTool,
                title: t("methodology.storytelling"),
                desc: t("methodology.storytelling_desc")
              },
              {
                icon: Sparkles,
                title: t("methodology.advanced"),
                desc: t("methodology.advanced_desc")
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
          {/* Section 1: Portfolio Digital */}
          <div className="mb-20">
            <SectionHeading
              title={t("portfolio.digital_title")}
              subtitle={t("portfolio.digital_subtitle")}
              alignment={isRtl ? "right" : "left"}
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
                    alt={t(img.title)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white/80 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {t("portfolio.enlarge")}
                    </p>
                  </div>
                  <div className={`absolute top-4 ${isRtl ? "left-4" : "right-4"} bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm`}>
                    <Expand className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sketches Subsection */}
            <div className="border-t pt-12">
              <h3 className="text-2xl font-display font-bold mb-2 text-purple-900">{t("portfolio.sketches_title")}</h3>
              <p className="text-muted-foreground mb-8">{t("portfolio.sketches_subtitle")}</p>
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
                      alt={t(img.title)}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <p className="text-white/80 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {t("portfolio.enlarge")}
                      </p>
                    </div>
                    <div className={`absolute top-4 ${isRtl ? "left-4" : "right-4"} bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm`}>
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
              title={t("portfolio.workshop_title")}
              subtitle={t("portfolio.workshop_subtitle")}
              alignment={isRtl ? "right" : "left"}
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
                    alt={t(img.title)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white/80 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {t("portfolio.enlarge")}
                    </p>
                  </div>
                  <div className={`absolute top-4 ${isRtl ? "left-4" : "right-4"} bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm`}>
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
          <button className={`absolute top-6 ${isRtl ? "left-6" : "right-6"} text-white/70 hover:text-white transition-colors`}>
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
            title={t("services.title")}
            subtitle={t("services.subtitle")}
            light={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: t("services.beginner"),
                price: i18n.language === 'ar' ? "$24 / ساعتين" : "$24 / 2 hours",
                features: ["services.features.anatomy", "services.features.proportions", "services.features.2hours"],
                ideal: t("services.ideal.beginner")
              },
              {
                title: t("services.intermediate"),
                price: i18n.language === 'ar' ? "$79 / الشهر" : "$79 / Month",
                features: ["services.features.perspective", "services.features.clothing", "services.features.posing", "services.features.assignments_2h"],
                ideal: t("services.ideal.intermediate"),
                highlight: true
              },
              {
                title: t("services.advanced"),
                price: i18n.language === 'ar' ? "$149 / الشهر" : "$149 / Month",
                features: ["services.features.portfolio", "services.features.storyboarding", "services.features.inking", "services.features.assignments_2h"],
                ideal: t("services.ideal.advanced")
              }
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className={`rounded-2xl p-8 flex flex-col h-full relative ${plan.highlight
                  ? "bg-purple-100 text-foreground shadow-2xl scale-105 border-4 border-purple-400"
                  : "bg-purple-700 backdrop-blur-md border border-purple-600 text-white hover:bg-purple-600"
                  }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {t("services.popular")}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? "text-purple-900" : "text-white"}`}>{plan.title}</h3>
                  <p className={`text-lg font-bold mb-2 ${plan.highlight ? "text-purple-700" : "text-purple-100"}`}>{plan.price}</p>
                  <p className={`text-sm ${plan.highlight ? "text-purple-600" : "text-purple-200"}`}>
                    {t("services.ideal")}: {plan.ideal}
                  </p>
                </div>

                <div className="flex-grow space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${plan.highlight ? "text-purple-700" : "text-purple-300"}`} />
                      <span className={`text-sm font-medium ${plan.highlight ? "text-purple-900" : "text-white"}`}>{t(feature)}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all ${plan.highlight
                    ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/30"
                    : "bg-white/20 hover:bg-white/30 text-white"
                    }`}
                >
                  {t("services.inquire")}
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <Globe className="w-8 h-8 mx-auto mb-2 text-purple-200" />
              <h4 className="font-bold">{t("services.intl")}</h4>
              <p className="text-sm text-purple-200">{t("services.intl_desc")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <Video className="w-8 h-8 mx-auto mb-2 text-purple-200" />
              <h4 className="font-bold">{t("services.online")}</h4>
              <p className="text-sm text-purple-200">{t("services.online_desc")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <Clock className="w-8 h-8 mx-auto mb-2 text-purple-200" />
              <h4 className="font-bold">{t("services.flexible")}</h4>
              <p className="text-sm text-purple-200">{t("services.flexible_desc")}</p>
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
                  <h3 className="text-3xl font-display font-bold mb-6">{t("contact.title")}</h3>
                  <p className="text-purple-100 mb-8 leading-relaxed">
                    {t("contact.desc")}
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <ArrowRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
                      </div>
                      <div>
                        <p className="text-sm text-purple-200">{t("contact.form_email")}</p>
                        <p className="font-medium">contact@mangaarttn.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-purple-200">{t("contact.whatsapp")}</p>
                        {/* force LTR so numbers render correctly in RTL layout */}
                        <p className="font-medium" dir="ltr">+21623774404</p>
                      </div>
                    </div>
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
                      <label className="text-sm font-semibold text-foreground">{t("contact.form_name")}</label>
                      <input
                        {...form.register("name")}
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder={t("contact.form_name")}
                      />
                      {form.formState.errors.name && (
                        <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">{t("contact.form_email")}</label>
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
                      <label className="text-sm font-semibold text-foreground">{t("contact.form_phone")}</label>
                      <input
                        {...form.register("phone")}
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="+21623774404" dir="ltr"
                        onChange={(e) => {
                          const normalized = normalizeArabicNumerals(e.target.value);
                          form.setValue("phone", normalized);
                        }}
                      />
                      {form.formState.errors.phone && (
                        <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">{t("contact.form_country")}</label>
                      <input
                        {...form.register("country")}
                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="e.g. Tunisia (GMT+1)"
                      />
                      {form.formState.errors.country && (
                        <p className="text-xs text-destructive">{form.formState.errors.country.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">{t("contact.form_message")}</label>
                    <textarea
                      {...form.register("message")}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder={t("contact.form_message")}
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
                        <Loader2 className="w-5 h-5 animate-spin" /> {t("contact.form_sending")}
                      </>
                    ) : (
                      t("contact.form_send")
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
            <p className="text-lg font-semibold">{t("social.follow")}</p>
            <div className="flex gap-6">
              <a
                href="https://wa.me/21623774404"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
                title="WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/people/Manga-Art/61561385984895/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
                title="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/manga_art_tunis"
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

          <div className={`text-sm text-muted-foreground ${isRtl ? "text-center md:text-left" : "text-center md:text-right"}`}>
            <p>&copy; {new Date().getFullYear()} Manga Art Teacher. {t("footer.rights")}</p>
            <div className={`flex gap-4 justify-center mt-2 ${isRtl ? "md:justify-start" : "md:justify-end"}`}>
              <a href="#" className="hover:text-primary transition-colors">{t("footer.privacy")}</a>
              <a href="#" className="hover:text-primary transition-colors">{t("footer.terms")}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}