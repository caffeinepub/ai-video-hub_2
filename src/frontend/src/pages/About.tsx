import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle2, Target, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const TEAM = [
  {
    name: "Aryan Mehta",
    role: "AI Curator & Founder",
    avatar: "AM",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Sofia Chen",
    role: "Content Strategist",
    avatar: "SC",
    color: "from-blue-500 to-purple-500",
  },
  {
    name: "Marcus Reid",
    role: "Video Producer",
    avatar: "MR",
    color: "from-purple-500 to-pink-500",
  },
];

const VALUES = [
  {
    icon: Brain,
    title: "AI-Driven Curation",
    desc: "Every video is hand-picked and AI-analyzed for maximum impact and quality.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: Target,
    title: "Purpose-Focused",
    desc: "Three pillars — Motivate, Educate, and Earn — guide every piece of content.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Users,
    title: "Community First",
    desc: "A growing community of driven individuals supporting each other's growth.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Zap,
    title: "Always Evolving",
    desc: "New videos added daily. The AI never stops finding your next big insight.",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
];

const MILESTONES = [
  "2022 — Founded with a vision to democratize self-improvement content",
  "2023 — Reached 500K monthly viewers",
  "2024 — Launched AI curation engine with personalized recommendations",
  "2025 — 2.4M monthly viewers across 150 countries",
];

export function About() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative py-24 hero-glow">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
              Our Story
            </Badge>
            <h1 className="font-display font-extrabold text-5xl lg:text-6xl text-foreground mb-6">
              Built for the <span className="gradient-text">Driven</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              AI VideoHub was born from a simple belief: the right video at the
              right moment can change your life. We combine AI technology with
              human curation to bring you content that truly matters.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground">
              What We <span className="gradient-text">Stand For</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border p-6 ${val.bg} card-glow transition-all duration-300`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${val.bg} border flex items-center justify-center mb-4`}
                >
                  <val.icon className={`w-6 h-6 ${val.color}`} />
                </div>
                <h3
                  className={`font-display font-bold text-lg ${val.color} mb-2`}
                >
                  {val.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-3 bg-accent/10 text-accent border-accent/30">
                Mission
              </Badge>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-4">
                Empowering Millions to
                <span className="gradient-text"> Think, Grow & Earn</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe knowledge is the greatest investment. Our AI-powered
                platform sources the world's best educational and motivational
                content so you can grow without wasting time on mediocre videos.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From Arnold Schwarzenegger's timeless wisdom to cutting-edge AI
                earning strategies — every video we feature is chosen to help
                you build a better life.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display font-bold text-xl text-foreground mb-6">
                Our Journey
              </h3>
              <div className="space-y-4">
                {MILESTONES.map((m) => (
                  <div key={m} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{m}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground">
              The Team Behind <span className="gradient-text">AI VideoHub</span>
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center w-48"
              >
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-3 text-white font-display font-bold text-xl shadow-glow`}
                >
                  {member.avatar}
                </div>
                <p className="font-display font-semibold text-foreground">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
