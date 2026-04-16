import Layout from "@/components/Layout";
import { Mail, MapPin, Clock, Linkedin, Instagram, Youtube, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_9n9sljm";
const TEMPLATE_ID = "template_qaq0dab";
const PUBLIC_KEY = "lChiT2XlVtxMpOnZW";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.trim().replace(/[\s\-()]/g, ""))) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        username: form.name.trim(),
        userEmail: form.email.trim(),
        phoneNumber: form.phone.trim(),
        userMessage: form.message.trim(),
        time: new Date().toLocaleString(),
      }, PUBLIC_KEY);
      toast({ title: "Message sent!", description: "Thank you for reaching out. I'll get back to you soon." });
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : typeof error === "object" && error !== null && "text" in error ? String((error as { text: string }).text) : "Unknown error";
      console.error("EmailJS error:", errMsg);
      toast({ title: "Failed to send", description: errMsg.includes("Gmail_API") ? "Email service authentication issue. Please contact the site admin." : "Something went wrong. Please try again later.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-2.5 rounded-sm bg-background border text-foreground font-body text-sm focus:outline-none focus:ring-2 transition-colors ${
      errors[field] ? "border-destructive focus:ring-destructive/50" : "border-input focus:ring-accent"
    }`;

  return (
    <Layout>
      <section className="page-section">
        <div className="container mx-auto">
          <div className="mb-12">
            <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Reach Out</span>
            <h1 className="section-title mt-2">Contact Me</h1>
            <p className="section-subtitle">For precise academic discussions—be it chapters, concepts, or strategy—reach out with intent.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Info */}
            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email", value: "amitroopani@gmail.com" },
                { icon: MapPin, label: "Location", value: "Surat, Gujarat, India" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="bg-secondary p-3 rounded-lg">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{item.label}</h3>
                    <p className="text-muted-foreground font-body text-sm mt-1">{item.value}</p>
                  </div>
                </div>
              ))}

              {/* Social Media Links */}
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-3">Connect With Me</h3>
                <div className="flex items-center gap-3">
                  <a href="https://www.linkedin.com/in/amit-roopani-440284270?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="bg-secondary p-3 rounded-lg hover:bg-accent/20 transition-colors group">
                    <Linkedin className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="https://www.instagram.com/amit.roopani?igsh=MXdmN2pvb3V3aXY1Mg==" target="_blank" rel="noopener noreferrer" className="bg-secondary p-3 rounded-lg hover:bg-accent/20 transition-colors group">
                    <Instagram className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-secondary p-3 rounded-lg hover:bg-accent/20 transition-colors group">
                    <Youtube className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-5" noValidate>
              <div>
                <label className="text-sm font-body font-semibold text-foreground block mb-1.5">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: undefined }); }}
                  className={inputClass("name")}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-destructive text-xs font-body mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-body font-semibold text-foreground block mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: undefined }); }}
                  className={inputClass("email")}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-destructive text-xs font-body mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm font-body font-semibold text-foreground block mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => { setForm({ ...form, phone: e.target.value }); if (errors.phone) setErrors({ ...errors, phone: undefined }); }}
                  className={inputClass("phone")}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-destructive text-xs font-body mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.phone}</p>}
              </div>
              <div>
                <label className="text-sm font-body font-semibold text-foreground block mb-1.5">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => { setForm({ ...form, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: undefined }); }}
                  className={`${inputClass("message")} resize-none`}
                  placeholder="Write your message here..."
                />
                {errors.message && <p className="text-destructive text-xs font-body mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-primary text-primary-foreground py-3 rounded-sm font-body font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
