import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

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
              Get In Touch
            </Badge>
            <h1 className="font-display font-extrabold text-5xl lg:text-6xl text-foreground mb-4">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Have a question, collaboration idea, or just want to say hi? We'd
              love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-display font-bold text-2xl text-foreground">
                Contact Information
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@aivideohub.ai",
                    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
                  },
                  {
                    icon: MapPin,
                    label: "Based In",
                    value: "Global — Online First",
                    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                  },
                  {
                    icon: MessageSquare,
                    label: "Response Time",
                    value: "Within 24 hours",
                    color:
                      "text-purple-400 bg-purple-500/10 border-purple-500/20",
                  },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl border ${color} flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${color.split(" ")[0]}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium text-foreground">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-card border border-border p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Want to collaborate, suggest a video, or inquire about
                  partnerships? Drop us a message — we read every one.
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl bg-card border border-border p-12 text-center"
                    data-ocid="contact.success_state"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      Thanks for reaching out. We'll get back to you within 24
                      hours.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          subject: "",
                          message: "",
                        });
                      }}
                    >
                      Send Another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="rounded-2xl bg-card border border-border p-8 space-y-5"
                    data-ocid="contact.modal"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-sm text-muted-foreground"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className="mt-1 bg-background border-border"
                          data-ocid="contact.input"
                        />
                        {errors.name && (
                          <p
                            className="text-xs text-destructive mt-1"
                            data-ocid="contact.error_state"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-sm text-muted-foreground"
                        >
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          className="mt-1 bg-background border-border"
                          data-ocid="contact.input"
                        />
                        {errors.email && (
                          <p
                            className="text-xs text-destructive mt-1"
                            data-ocid="contact.error_state"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="subject"
                        className="text-sm text-muted-foreground"
                      >
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        value={form.subject}
                        onChange={(e) =>
                          handleChange("subject", e.target.value)
                        }
                        className="mt-1 bg-background border-border"
                        data-ocid="contact.input"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="message"
                        className="text-sm text-muted-foreground"
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us what's on your mind..."
                        value={form.message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        rows={5}
                        className="mt-1 bg-background border-border resize-none"
                        data-ocid="contact.textarea"
                      />
                      {errors.message && (
                        <p
                          className="text-xs text-destructive mt-1"
                          data-ocid="contact.error_state"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full gradient-bg text-primary-foreground font-semibold gap-2 shadow-glow"
                      disabled={loading}
                      data-ocid="contact.submit_button"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
