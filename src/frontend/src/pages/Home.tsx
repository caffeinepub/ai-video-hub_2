import { VideoCard } from "@/components/VideoCard";
import { VideoModal } from "@/components/VideoModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { videos } from "@/data/videos";
import type { Video } from "@/data/videos";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  DollarSign,
  Play,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const STATS = [
  { label: "Videos Published", value: "500+", icon: Play },
  { label: "Monthly Viewers", value: "2.4M", icon: TrendingUp },
  { label: "Categories", value: "5", icon: BookOpen },
  { label: "Avg. Earnings Boost", value: "340%", icon: DollarSign },
];

const CATEGORY_INFO = [
  {
    title: "Motivational",
    description:
      "Fuel your drive with speeches from the world's greatest minds.",
    icon: Sparkles,
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    title: "Facts & Science",
    description:
      "Expand your knowledge with mind-blowing facts and discoveries.",
    icon: BookOpen,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    title: "Earning & Wealth",
    description:
      "Learn proven strategies to build income and financial freedom.",
    icon: DollarSign,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

export function Home() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const featuredVideos = videos.filter((v) => v.featured).slice(0, 4);
  const heroVideo = videos[0];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center hero-glow">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(/assets/generated/hero-bg.dim_1920x600.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/30 gap-1">
                <Sparkles className="w-3 h-3" />
                AI-Powered Video Curation
              </Badge>
              <h1 className="font-display font-extrabold text-5xl lg:text-7xl leading-tight mb-6">
                <span className="text-foreground">Ignite Your</span> <br />
                <span className="gradient-text">Potential</span>
                <br />
                <span className="text-foreground">with AI Videos</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
                Curated motivational speeches, mind-blowing facts, and proven
                earning strategies — all powered by AI to help you grow.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/videos">
                  <Button
                    size="lg"
                    className="gradient-bg text-primary-foreground font-bold text-base shadow-glow-lg hover:opacity-90 gap-2"
                    data-ocid="home.primary_button"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    Start Watching
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border text-muted-foreground hover:text-foreground gap-2"
                    data-ocid="home.secondary_button"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-2">
                <div className="flex">
                  {STAR_KEYS.map((k) => (
                    <Star
                      key={k}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Loved by 2M+ viewers worldwide
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <button
                type="button"
                className="relative w-full rounded-2xl overflow-hidden gradient-border cursor-pointer group text-left"
                onClick={() => setSelectedVideo(heroVideo)}
                data-ocid="home.canvas_target"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.15 200), oklch(0.60 0.18 260), oklch(0.60 0.22 300))",
                    padding: "2px",
                    borderRadius: "1rem",
                  }}
                />
                <div className="relative rounded-2xl overflow-hidden m-[2px]">
                  <img
                    src={`https://img.youtube.com/vi/${heroVideo.youtubeId}/maxresdefault.jpg`}
                    alt={heroVideo.title}
                    className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center shadow-glow-lg animate-pulse-glow">
                      <Play className="w-9 h-9 text-primary-foreground fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background">
                    <Badge className="mb-1 bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                      {heroVideo.category}
                    </Badge>
                    <p className="font-display font-bold text-foreground text-sm line-clamp-2">
                      {heroVideo.title}
                    </p>
                  </div>
                </div>
              </button>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-3 shadow-glow"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Trending Now
                    </p>
                    <p className="font-display font-bold text-sm text-foreground">
                      +340% Views
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <p className="font-display font-extrabold text-3xl gradient-text">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-20" data-ocid="home.section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <Badge className="mb-2 bg-primary/10 text-primary border-primary/30">
                Featured
              </Badge>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground">
                Top Picks This Week
              </h2>
            </div>
            <Link
              to="/videos"
              className="hidden md:flex items-center gap-1 text-sm text-primary hover:underline font-medium"
              data-ocid="home.link"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredVideos.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                index={i}
                onClick={setSelectedVideo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge className="mb-2 bg-accent/10 text-accent border-accent/30">
              Explore
            </Badge>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground">
              What Do You Want Today?
            </h2>
            <p className="text-muted-foreground mt-2">
              Choose your path to growth
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORY_INFO.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to="/videos">
                  <div
                    className={`rounded-2xl border p-6 ${cat.bg} card-glow transition-all duration-300 hover:-translate-y-1 group`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${cat.bg} border flex items-center justify-center mb-4`}
                    >
                      <cat.icon className={`w-6 h-6 ${cat.color}`} />
                    </div>
                    <h3
                      className={`font-display font-bold text-xl ${cat.color} mb-2`}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                    <div
                      className={`mt-4 flex items-center gap-1 text-sm ${cat.color} font-medium group-hover:gap-2 transition-all`}
                    >
                      Browse Videos <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border border-border"
          >
            <div className="gradient-bg absolute inset-0 opacity-10" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.60 0.18 260 / 0.2), transparent 70%)",
              }}
            />
            <div className="relative p-12 text-center">
              <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-foreground mb-4">
                Ready to Level Up?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Join millions who use AI VideoHub to get inspired, learn faster,
                and earn smarter.
              </p>
              <Link to="/videos">
                <Button
                  size="lg"
                  className="gradient-bg text-primary-foreground font-bold text-lg px-10 shadow-glow-lg hover:opacity-90"
                  data-ocid="home.primary_button"
                >
                  Explore All Videos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
