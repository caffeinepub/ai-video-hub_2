import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Video } from "@/data/videos";
import { X } from "lucide-react";

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Motivational: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Facts: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Earning: "bg-green-500/20 text-green-300 border-green-500/30",
  Technology: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Lifestyle: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

export function VideoModal({ video, onClose }: VideoModalProps) {
  return (
    <Dialog open={!!video} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-3xl w-full p-0 bg-card border-border overflow-hidden"
        data-ocid="video.modal"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          data-ocid="video.close_button"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        {video && (
          <>
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${CATEGORY_COLORS[video.category] ?? ""}`}
                >
                  {video.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {video.duration}
                </span>
                <span className="text-xs text-muted-foreground">
                  • {video.views} views
                </span>
              </div>
              <h2 className="font-display font-bold text-xl text-foreground mb-2">
                {video.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {video.description}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
