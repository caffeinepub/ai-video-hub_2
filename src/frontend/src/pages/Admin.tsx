import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CATEGORIES, videos as initialVideos } from "@/data/videos";
import type { Video, VideoCategory } from "@/data/videos";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  Clock,
  Eye,
  LogIn,
  LogOut,
  PlusCircle,
  Shield,
  Trash2,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function Admin() {
  const { login, clear, isLoggingIn, isLoginError, isLoginSuccess, identity } =
    useInternetIdentity();
  const isLoggedIn = isLoginSuccess && !!identity;

  const [videoList, setVideoList] = useState<Video[]>(initialVideos);
  const [form, setForm] = useState({
    title: "",
    youtubeId: "",
    category: "Motivational" as Exclude<VideoCategory, "All">,
    duration: "",
    description: "",
  });
  const [formError, setFormError] = useState("");

  function handleAdd() {
    if (!form.title.trim() || !form.youtubeId.trim()) {
      setFormError("Title and YouTube ID are required.");
      return;
    }
    const newVideo: Video = {
      id: Date.now().toString(),
      ...form,
      views: "0",
    };
    setVideoList((prev) => [newVideo, ...prev]);
    setForm({
      title: "",
      youtubeId: "",
      category: "Motivational",
      duration: "",
      description: "",
    });
    setFormError("");
    toast.success("Video added successfully!");
  }

  function handleDelete(id: string) {
    setVideoList((prev) => prev.filter((v) => v.id !== id));
    toast.success("Video removed.");
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md w-full"
        >
          <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6 shadow-glow-lg">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-display font-extrabold text-4xl text-foreground mb-3">
            Admin <span className="gradient-text">Access</span>
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            This area is restricted to administrators. Sign in with your
            Internet Identity to manage videos.
          </p>
          <Button
            size="lg"
            className="gradient-bg text-primary-foreground font-bold px-10 shadow-glow gap-2 hover:opacity-90"
            onClick={() => login()}
            disabled={isLoggingIn}
            data-ocid="admin.primary_button"
          >
            {isLoggingIn ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="w-5 h-5" />
                Sign In to Admin
              </span>
            )}
          </Button>
          {isLoginError && (
            <p
              className="mt-4 text-sm text-destructive"
              data-ocid="admin.error_state"
            >
              Login failed. Please try again.
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <Badge className="mb-2 bg-green-500/20 text-green-300 border-green-500/30 gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Admin Mode
          </Badge>
          <h1 className="font-display font-extrabold text-4xl text-foreground">
            Video <span className="gradient-text">Manager</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Logged in as:{" "}
            <span className="text-foreground font-mono text-xs">
              {identity.getPrincipal().toString().slice(0, 20)}…
            </span>
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 border-border text-muted-foreground hover:text-foreground"
          onClick={() => clear()}
          data-ocid="admin.secondary_button"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="rounded-2xl bg-card border border-border p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <PlusCircle className="w-4 h-4 text-primary-foreground" />
              </div>
              <h2 className="font-display font-bold text-lg text-foreground">
                Add New Video
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">
                  Video Title *
                </Label>
                <Input
                  placeholder="Enter title..."
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className="mt-1 bg-background border-border"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">
                  YouTube Video ID *
                </Label>
                <div className="relative mt-1">
                  <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="e.g. dQw4w9WgXcQ"
                    value={form.youtubeId}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, youtubeId: e.target.value }))
                    }
                    className="pl-9 bg-background border-border"
                    data-ocid="admin.input"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">
                  Category
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm((p) => ({
                      ...p,
                      category: v as Exclude<VideoCategory, "All">,
                    }))
                  }
                >
                  <SelectTrigger
                    className="mt-1 bg-background border-border"
                    data-ocid="admin.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">
                  Duration
                </Label>
                <Input
                  placeholder="e.g. 10:23"
                  value={form.duration}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, duration: e.target.value }))
                  }
                  className="mt-1 bg-background border-border"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">
                  Description
                </Label>
                <Input
                  placeholder="Short description..."
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="mt-1 bg-background border-border"
                  data-ocid="admin.input"
                />
              </div>

              {formError && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="admin.error_state"
                >
                  {formError}
                </p>
              )}

              <Button
                className="w-full gradient-bg text-primary-foreground font-semibold gap-2"
                onClick={handleAdd}
                data-ocid="admin.submit_button"
              >
                <PlusCircle className="w-4 h-4" />
                Add Video
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display font-bold text-lg text-foreground">
                Video Library
              </h2>
              <Badge className="bg-secondary text-muted-foreground">
                {videoList.length} videos
              </Badge>
            </div>
            <div className="overflow-x-auto">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">
                      Title
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Category
                    </TableHead>
                    <TableHead className="text-muted-foreground hidden sm:table-cell">
                      <Clock className="w-3.5 h-3.5" />
                    </TableHead>
                    <TableHead className="text-muted-foreground hidden sm:table-cell">
                      <Eye className="w-3.5 h-3.5" />
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videoList.map((v, i) => (
                    <TableRow
                      key={v.id}
                      className="border-border hover:bg-secondary/50"
                      data-ocid={`admin.row.${i + 1}`}
                    >
                      <TableCell className="font-medium text-foreground text-sm max-w-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://img.youtube.com/vi/${v.youtubeId}/default.jpg`}
                            alt=""
                            className="w-10 h-7 rounded object-cover shrink-0"
                          />
                          <span className="line-clamp-1">{v.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {v.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs hidden sm:table-cell">
                        {v.duration}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs hidden sm:table-cell">
                        {v.views}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                          onClick={() => handleDelete(v.id)}
                          data-ocid={`admin.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
