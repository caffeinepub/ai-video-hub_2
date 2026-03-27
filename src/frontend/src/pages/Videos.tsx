import { VideoCard } from "@/components/VideoCard";
import { VideoModal } from "@/components/VideoModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CATEGORIES, videos as initialVideos } from "@/data/videos";
import type { Video, VideoCategory } from "@/data/videos";
import { Link2, Search, Upload, X, Youtube } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function Videos() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>("All");
  const [search, setSearch] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [allVideos, setAllVideos] = useState<Video[]>(initialVideos);
  const [embedOpen, setEmbedOpen] = useState(false);
  const [embedUrl, setEmbedUrl] = useState("");
  const [embedTitle, setEmbedTitle] = useState("");

  const filtered = allVideos.filter((v) => {
    const matchCat = activeCategory === "All" || v.category === activeCategory;
    const matchSearch =
      !search ||
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function extractYoutubeId(url: string): string | null {
    const re =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(re);
    if (match) return match[1];
    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();
    return null;
  }

  function handleEmbedSubmit() {
    const ytId = extractYoutubeId(embedUrl);
    if (!ytId) {
      toast.error("Invalid YouTube URL or ID. Please check and try again.");
      return;
    }
    const newVideo: Video = {
      id: Date.now().toString(),
      youtubeId: ytId,
      title: embedTitle || "Embedded Video",
      description: "User-added video.",
      category: "Motivational",
      duration: "—",
      views: "—",
    };
    setAllVideos((prev) => [newVideo, ...prev]);
    setEmbedUrl("");
    setEmbedTitle("");
    setEmbedOpen(false);
    toast.success("Video added successfully!");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <Badge className="mb-3 bg-primary/10 text-primary border-primary/30">
          Library
        </Badge>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-foreground">
              Video <span className="gradient-text">Library</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Browse our curated collection of AI-selected videos
            </p>
          </div>
          <Dialog open={embedOpen} onOpenChange={setEmbedOpen}>
            <DialogTrigger asChild>
              <Button
                className="gradient-bg text-primary-foreground font-semibold gap-2 shadow-glow"
                data-ocid="videos.open_modal_button"
              >
                <Youtube className="w-4 h-4" />
                Embed YouTube
              </Button>
            </DialogTrigger>
            <DialogContent
              className="bg-card border-border"
              data-ocid="videos.dialog"
            >
              <DialogHeader>
                <DialogTitle className="font-display font-bold text-foreground">
                  Add YouTube Video
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div>
                  <Label
                    htmlFor="embed-title"
                    className="text-sm text-muted-foreground"
                  >
                    Title
                  </Label>
                  <Input
                    id="embed-title"
                    placeholder="Enter video title..."
                    value={embedTitle}
                    onChange={(e) => setEmbedTitle(e.target.value)}
                    className="mt-1 bg-background border-border"
                    data-ocid="videos.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="embed-url"
                    className="text-sm text-muted-foreground"
                  >
                    YouTube URL or Video ID
                  </Label>
                  <div className="relative mt-1">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="embed-url"
                      placeholder="https://youtube.com/watch?v=... or video ID"
                      value={embedUrl}
                      onChange={(e) => setEmbedUrl(e.target.value)}
                      className="pl-9 bg-background border-border"
                      data-ocid="videos.input"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setEmbedOpen(false)}
                    data-ocid="videos.cancel_button"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="gradient-bg text-primary-foreground font-semibold"
                    onClick={handleEmbedSubmit}
                    data-ocid="videos.submit_button"
                  >
                    Add Video
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border"
            data-ocid="videos.search_input"
          />
          {search && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setSearch("")}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <Tabs
          value={activeCategory}
          onValueChange={(v) => setActiveCategory(v as VideoCategory)}
        >
          <TabsList className="bg-card border border-border flex flex-wrap h-auto gap-1 p-1">
            {CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="data-[state=active]:gradient-bg data-[state=active]:text-primary-foreground rounded-md text-sm"
                data-ocid="videos.tab"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Showing{" "}
        <span className="text-foreground font-medium">{filtered.length}</span>{" "}
        videos
        {activeCategory !== "All" && ` in ${activeCategory}`}
        {search && ` matching "${search}"`}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-24" data-ocid="videos.empty_state">
          <div className="w-16 h-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-display font-bold text-xl text-foreground mb-2">
            No videos found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or selecting a different category.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((video, i) => (
            <VideoCard
              key={video.id}
              video={video}
              index={i}
              onClick={setSelectedVideo}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 rounded-2xl border-2 border-dashed border-border p-10 text-center"
        data-ocid="videos.dropzone"
      >
        <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4">
          <Upload className="w-7 h-7 text-primary-foreground" />
        </div>
        <h3 className="font-display font-bold text-xl text-foreground mb-2">
          Upload Your Own Video
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-4">
          Share your own motivational or educational videos. Upload files or
          paste YouTube links.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant="outline"
            className="gap-2 border-border"
            onClick={() =>
              toast.info("File upload coming soon — use YouTube embed for now!")
            }
            data-ocid="videos.upload_button"
          >
            <Upload className="w-4 h-4" />
            Upload File
          </Button>
          <Button
            className="gap-2 gradient-bg text-primary-foreground"
            onClick={() => setEmbedOpen(true)}
            data-ocid="videos.primary_button"
          >
            <Youtube className="w-4 h-4" />
            Embed YouTube
          </Button>
        </div>
      </motion.div>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
