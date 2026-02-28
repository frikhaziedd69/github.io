import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  alignment?: "left" | "center" | "right";
  light?: boolean;
}

export function SectionHeading({ title, subtitle, alignment = "center", light = false }: SectionHeadingProps) {
  const alignClass = alignment === "center"
    ? "text-center"
    : alignment === "right"
      ? "text-right"
      : "text-left";

  return (
    <div className={`mb-12 ${alignClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className={`inline-block py-1 px-3 rounded-full text-xs font-bold tracking-wider uppercase mb-3 ${light ? "bg-white/10 text-white border border-white/20" : "bg-primary/10 text-primary border border-primary/20"
          }`}>
          {subtitle}
        </span>
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold ${light ? "text-white" : "text-foreground"
          }`}>
          {title}
        </h2>

        {/* Decorative underline/speed line */}
        <div className={`mt-4 h-1 w-24 rounded-full ${alignment === "center"
            ? "mx-auto bg-gradient-to-r from-primary to-transparent"
            : alignment === "right"
              ? "ml-auto bg-gradient-to-l from-primary to-transparent"
              : "bg-gradient-to-r from-primary to-transparent"
          }`} />
      </motion.div>
    </div>
  );
}
