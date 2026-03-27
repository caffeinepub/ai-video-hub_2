import { Badge } from "@/components/ui/badge";
import type { Video } from "@/data/videos";
import { Clock, Eye, Play } from "lucide-react";
import { motion } from "motion/react";

interface VideoCardProps {
  video: Video;
  index?: number;
  onClick: (video: Video) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Motivational: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Facts: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Earning: "bg-green-500/20 text-green-300 border-green-500/30",
  Technology: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Lifestyle: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

export function VideoCard({ video, index = 0, onClick }: VideoCardProps) {
  const thumbUrl = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group cursor-pointer"
      onClick={() => onClick(video)}
      data-ocid={`videos.item.${index + 1}`}
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-card card-glow transition-all duration-300 group-hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-glow">
              <Play className="w-6 h-6 text-primary-foreground fill-current ml-0.5" />
            </div>
          </div>
          {/* Duration badge */}
          <span className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm text-foreground text-xs px-2 py-0.5 rounded-md font-medium">
            {video.duration}
          </span>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge
              variant="outline"
              className={`text-xs shrink-0 ${CATEGORY_COLORS[video.category] ?? ""}`}
            >
              {video.category}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="w-3 h-3" />
              {video.views}
            </span>
          </div>
          <h3 className="font-display font-semibold text-foreground line-clamp-2 text-sm leading-snug group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
            {video.description}
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{video.duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
