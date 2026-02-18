import { useState, useEffect, useRef } from "react";

const C = {
  forest: "#1B4332",
  green: "#2D6A4F",
  greenLight: "#40916C",
  mint: "#D8F3DC",
  coral: "#F4845F",
  coralDark: "#E0734F",
  warmBg: "#FDFAF5",
  cream: "#FFF9F0",
  gold: "#F4C542",
  text: "#2D3436",
  textLight: "#5D6B6F",
  white: "#FFFFFF",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
      ...style,
    }}>{children}</div>
  );
}

function FeatureCard({ emoji, title, desc, delay }) {
  return (
    <FadeIn delay={delay} style={{ flex: "1 1 260px", maxWidth: 340 }}>
      <div style={{
        background: C.white, borderRadius: 20, padding: "36px 28px",
        boxShadow: "0 4px 24px rgba(27,67,50,0.06)",
        border: "1px solid rgba(27,67,50,0.06)",
        height: "100%",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(27,67,50,0.12)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(27,67,50,0.06)"; }}
      >
        <div style={{ fontSize: 40, marginBottom: 16 }}>{emoji}</div>
        <h3 style={{ fontSize: 19, fontWeight: 700, color: C.forest, marginBottom: 10, fontFamily: "'DM Serif Display', Georgia, serif" }}>{title}</h3>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: C.textLight, margin: 0 }}>{desc}</p>
      </div>
    </FadeIn>
  );
}

function ComparisonRow({ us, them, label, idx }) {
  return (
    <FadeIn delay={idx * 0.08}>
      <div style={{
        display: "flex", alignItems: "center", padding: "14px 0",
        borderBottom: "1px solid rgba(27,67,50,0.08)",
      }}>
        <div style={{ flex: "1 1 50%", fontSize: 15, color: C.text, fontWeight: 500, paddingRight: 16 }}>{label}</div>
        <div style={{ flex: "0 0 80px", textAlign: "center", fontSize: 20 }}>{us ? "✅" : "—"}</div>
        <div style={{ flex: "0 0 80px", textAlign: "center", fontSize: 20, opacity: 0.4 }}>{them ? "✅" : "—"}</div>
      </div>
    </FadeIn>
  );
}

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const MAILCHIMP_URL = "http://eepurl.com/jzHuS-/";

  const handleSubmit = () => {
    if (email.includes("@") && email.includes(".")) {
      setSubmitted(true);
      setEmail("");
      // Small delay so user sees confirmation, then redirect to Mailchimp
      setTimeout(() => {
        window.open(MAILCHIMP_URL, "_blank");
      }, 800);
    }
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      color: C.text,
      background: C.warmBg,
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Serif+Display&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${C.mint}; color: ${C.forest}; }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        input::placeholder { color: #A0AEA5; }
      `}</style>

      {/* ===== NAV ===== */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(253,250,245,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(27,67,50,0.06)",
        padding: "0 32px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>✦</span>
          <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, fontWeight: 400, color: C.forest }}>Khanya</span>
          <span style={{ fontSize: 11, color: C.textLight, fontStyle: "italic", marginLeft: 2 }}>light</span>
        </div>
        <button
          onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            background: C.coral, color: C.white, border: "none",
            padding: "10px 24px", borderRadius: 50, fontSize: 14, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = C.coralDark}
          onMouseLeave={e => e.currentTarget.style.background = C.coral}
        >Get Early Access</button>
      </nav>

      {/* ===== HERO ===== */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "100px 32px 60px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.mint}44, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,133,95,0.08), transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 60 }}>
          <div style={{ flex: "1 1 480px" }}>
            <FadeIn>
              <div style={{
                display: "inline-block", background: C.mint, color: C.forest,
                padding: "6px 16px", borderRadius: 50, fontSize: 13, fontWeight: 600,
                marginBottom: 24, letterSpacing: 0.5,
              }}>
                ✦ Launching 2026 — Join the Waitlist
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(36px, 5vw, 56px)",
                lineHeight: 1.12,
                color: C.forest,
                marginBottom: 20,
              }}>
                Teach your child how<br />
                <span style={{ color: C.coral }}>AI works</span> — through play.
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: C.textLight, maxWidth: 520, marginBottom: 12 }}>
                Khanya is a screen-light app that gives parents personalized,
                hands-on activities grounded in Montessori & Reggio Emilia.
                Your child builds real skills. You learn why they matter.
              </p>
              <p style={{ fontSize: 14, color: C.greenLight, fontStyle: "italic", marginBottom: 32 }}>
                Khanya means "light" in Xhosa — because every child deserves to shine.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div id="signup" style={{ display: "flex", gap: 10, flexWrap: "wrap", maxWidth: 460 }}>
                {!submitted ? (
                  <>
                    <input
                      type="email" value={email} onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSubmit()}
                      placeholder="Enter your email"
                      style={{
                        flex: "1 1 240px", padding: "14px 20px",
                        borderRadius: 50, border: `2px solid ${C.mint}`,
                        fontSize: 15, fontFamily: "inherit", outline: "none",
                        background: C.white,
                        transition: "border-color 0.2s",
                      }}
                      onFocus={e => e.target.style.borderColor = C.green}
                      onBlur={e => e.target.style.borderColor = C.mint}
                    />
                    <button onClick={handleSubmit} style={{
                      background: C.coral, color: C.white, border: "none",
                      padding: "14px 32px", borderRadius: 50, fontSize: 15, fontWeight: 600,
                      cursor: "pointer", fontFamily: "inherit",
                      transition: "background 0.2s, transform 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = C.coralDark; e.currentTarget.style.transform = "scale(1.03)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = C.coral; e.currentTarget.style.transform = "scale(1)"; }}
                    >Join Waitlist →</button>
                  </>
                ) : (
                  <div style={{
                    background: C.mint, color: C.forest, padding: "14px 28px",
                    borderRadius: 50, fontSize: 15, fontWeight: 600,
                    animation: "pulse 0.5s ease",
                  }}>
                    ✨ You're on the list! We'll be in touch soon.
                  </div>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p style={{ fontSize: 13, color: "#AAA", marginTop: 12 }}>Free for early supporters. No spam, ever.</p>
            </FadeIn>
          </div>

          {/* Hero visual — floating activity cards */}
          <FadeIn delay={0.3} style={{ flex: "1 1 340px", display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 320, height: 380 }}>
              {[
                { emoji: "🎨", title: "Color Sorting", tag: "Classification", bg: "#D8F3DC", top: 0, left: 20, rot: -3, delay: "0s" },
                { emoji: "🍃", title: "Nature Walk", tag: "Data Collection", bg: "#FFE8E0", top: 80, left: 100, rot: 2, delay: "0.5s" },
                { emoji: "🧩", title: "Pattern Blocks", tag: "Sequencing", bg: "#E8DEFF", top: 180, left: 40, rot: -1, delay: "1s" },
              ].map((card, i) => (
                <div key={i} style={{
                  position: "absolute", top: card.top, left: card.left,
                  background: C.white, borderRadius: 18, padding: "20px 22px",
                  width: 200, boxShadow: "0 8px 32px rgba(27,67,50,0.10)",
                  transform: `rotate(${card.rot}deg)`,
                  animation: `float 4s ${card.delay} ease-in-out infinite`,
                  border: "1px solid rgba(27,67,50,0.05)",
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, background: card.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, marginBottom: 10,
                  }}>{card.emoji}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.forest, marginBottom: 4 }}>{card.title}</div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, color: C.green, background: C.mint,
                    padding: "3px 10px", borderRadius: 6, display: "inline-block",
                  }}>AI: {card.tag}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section style={{ padding: "80px 32px", background: C.white }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, color: C.forest, marginBottom: 20 }}>
              Parents are stuck between two bad options.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: C.textLight, maxWidth: 640, margin: "0 auto" }}>
              Screen-heavy apps that entertain but don't educate meaningfully.
              Or Pinterest boards full of ideas with no personalization, no structure, and
              no explanation of why any of it matters for your child's development. Meanwhile,
              AI is reshaping the world your child will grow up in — and most parents have no idea
              how to prepare them.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={{ padding: "80px 32px", background: C.warmBg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, color: C.forest, marginBottom: 12 }}>
                What makes Khanya different
              </h2>
              <p style={{ fontSize: 16, color: C.textLight }}>An AI-powered companion that grows with your family.</p>
            </div>
          </FadeIn>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
            <FeatureCard emoji="🤖" title="AI-Personalized Activities" desc="Daily recommendations tailored to your child's age, interests, and developmental stage. Powered by the same AI technology shaping the future." delay={0.1} />
            <FeatureCard emoji="📚" title="You Learn Too" desc="Every activity explains why it matters. Optional deep-dive tracks teach you Montessori basics, child development, and AI literacy — at your pace." delay={0.2} />
            <FeatureCard emoji="📵" title="Screen-Light by Design" desc="The app is for you. The activities happen in the real world — with blocks, leaves, crayons, and conversations. No kid screen time required." delay={0.3} />
            <FeatureCard emoji="🧠" title="Hidden AI Concepts" desc="When your child sorts by color, they're doing classification. When they spot patterns, that's pattern recognition. They're learning how AI works — through play." delay={0.4} />
            <FeatureCard emoji="📊" title="Track Real Progress" desc="See what your child has explored, where they shine, and what to try next. One tap to log. AI generates monthly insight reports." delay={0.5} />
            <FeatureCard emoji="🛡️" title="AI Ethics Built In" desc="Age-appropriate lessons on fairness, privacy, and trust woven into activities — so your child grows up as a thoughtful AI citizen." delay={0.6} />
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ padding: "80px 32px", background: C.white }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, color: C.forest, marginBottom: 48, textAlign: "center" }}>
              How it works
            </h2>
          </FadeIn>
          {[
            { num: "01", title: "Tell us about your child", desc: "Name, age, and a few interests. Takes 30 seconds." },
            { num: "02", title: "Get personalized activities", desc: "Three daily recommendations matched to your child's developmental stage, tagged with AI concepts." },
            { num: "03", title: "Play, learn, repeat", desc: "Do the activity together. Tap 'Done.' The AI adapts to what your child loves and suggests what's next." },
            { num: "04", title: "Watch them (and you) grow", desc: "Track progress over time. Read the 'Why This Matters' cards. Dive into parent learning tracks when you're ready." },
          ].map((step, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 36 }}>
                <div style={{
                  flexShrink: 0, width: 52, height: 52, borderRadius: "50%",
                  background: i === 2 ? C.coral : C.mint,
                  color: i === 2 ? C.white : C.forest,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20,
                }}>{step.num}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: C.forest, marginBottom: 4 }}>{step.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: C.textLight, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== COMPARISON ===== */}
      <section style={{ padding: "80px 32px", background: C.cream }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 32, color: C.forest, marginBottom: 32, textAlign: "center" }}>
              Khanya vs. Everything Else
            </h2>
          </FadeIn>
          <div style={{ display: "flex", padding: "0 0 12px", borderBottom: `2px solid ${C.forest}`, marginBottom: 8 }}>
            <div style={{ flex: "1 1 50%" }} />
            <div style={{ flex: "0 0 80px", textAlign: "center", fontSize: 13, fontWeight: 700, color: C.forest }}>Khanya</div>
            <div style={{ flex: "0 0 80px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#AAA" }}>Others</div>
          </div>
          {[
            { label: "Personalized daily activities", us: true, them: true },
            { label: "Screen-light / hands-on play", us: true, them: false },
            { label: "AI concept education for kids", us: true, them: false },
            { label: "Parent education tracks", us: true, them: false },
            { label: "AI ethics & safety woven in", us: true, them: false },
            { label: "LLM-powered chat assistant", us: true, them: false },
            { label: "Montessori + Reggio Emilia", us: true, them: true },
            { label: "Progress tracking", us: true, them: true },
          ].map((row, i) => <ComparisonRow key={i} {...row} idx={i} />)}
        </div>
      </section>

      {/* ===== AGE TIERS ===== */}
      <section style={{ padding: "80px 32px", background: C.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, color: C.forest, marginBottom: 12, textAlign: "center" }}>
              Grows with your child
            </h2>
            <p style={{ fontSize: 16, color: C.textLight, textAlign: "center", marginBottom: 40 }}>From first sensory experiences to real AI conversations.</p>
          </FadeIn>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            {[
              { age: "0-1", label: "Sensory Explorer", desc: "Cause and effect, input/output basics", color: "#FFE0E0" },
              { age: "1-3", label: "Little Sorter", desc: "Classification, early data collection", color: "#D8F3DC" },
              { age: "3-6", label: "Pattern Spotter", desc: "Sequencing, prediction, fairness", color: "#E8DEFF" },
              { age: "6-8", label: "AI Bridge", desc: "Naming processes, logic games, bias", color: "#FFF3CC" },
              { age: "8+", label: "Young Thinker", desc: "Computational thinking, guided AI tools", color: "#DCEEFB" },
            ].map((tier, i) => (
              <FadeIn key={i} delay={i * 0.1} style={{ flex: "1 1 150px", maxWidth: 180 }}>
                <div style={{
                  background: tier.color, borderRadius: 16, padding: "24px 18px",
                  textAlign: "center", height: "100%",
                }}>
                  <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: C.forest, marginBottom: 4 }}>{tier.age}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.forest, marginBottom: 8 }}>{tier.label}</div>
                  <div style={{ fontSize: 12, color: C.textLight, lineHeight: 1.5 }}>{tier.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MANIFESTO SECTION ===== */}
      <section style={{ padding: "100px 32px", background: C.forest, position: "relative", overflow: "hidden" }}>
        {/* Subtle radial glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(216,243,220,0.08), transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <FadeIn>
            <p style={{ fontSize: 14, letterSpacing: 3, color: C.coral, textTransform: "uppercase", fontWeight: 600, marginBottom: 32 }}>
              Our Philosophy
            </p>

            <h2 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 48px)", color: C.white, marginBottom: 12, lineHeight: 1.15,
            }}>
              Khanya
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", fontStyle: "italic", marginBottom: 40, letterSpacing: 0.5 }}>
              A Xhosa word meaning "light."
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", marginBottom: 48 }}>
              {["Light to guide.", "Light to protect.", "Light to grow."].map((line, i) => (
                <p key={i} style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 20, color: C.mint, margin: 0, whiteSpace: "nowrap",
                }}>{line}</p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.15)", margin: "0 auto 40px" }} />

            <p style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(255,255,255,0.75)", marginBottom: 24 }}>
              We believe technology should not overwhelm childhood — it should illuminate it.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(255,255,255,0.75)", marginBottom: 24 }}>
              Khanya was created for conscious parents who want their children
              guided by intelligence, not shaped by algorithms.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(255,255,255,0.75)" }}>
              Here, AI becomes a gentle light — supporting curiosity, growth, and
              protection in a rapidly changing world.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section style={{
        padding: "80px 32px",
        background: `linear-gradient(160deg, ${C.forest}, ${C.green})`,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
            <h2 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 36, color: C.white, marginBottom: 16,
            }}>
              Ready to raise an AI-literate child?
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 32, lineHeight: 1.7 }}>
              Join the waitlist and be first to know when Khanya launches.
              Early supporters get free premium access.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {!submitted ? (
                <>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                    placeholder="Enter your email"
                    style={{
                      flex: "1 1 240px", maxWidth: 300, padding: "14px 20px",
                      borderRadius: 50, border: "2px solid rgba(255,255,255,0.3)",
                      fontSize: 15, fontFamily: "inherit", outline: "none",
                      background: "rgba(255,255,255,0.1)", color: C.white,
                    }}
                  />
                  <button onClick={handleSubmit} style={{
                    background: C.coral, color: C.white, border: "none",
                    padding: "14px 32px", borderRadius: 50, fontSize: 15, fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit",
                  }}>Join Waitlist →</button>
                </>
              ) : (
                <div style={{ background: "rgba(255,255,255,0.15)", color: C.white, padding: "14px 28px", borderRadius: 50, fontSize: 15, fontWeight: 600 }}>
                  ✨ You're on the list! We'll be in touch soon.
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ padding: "32px", background: C.forest, textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
          © 2026 Khanya. Bringing light to how children learn AI, one activity at a time.
        </p>
      </footer>
    </div>
  );
}
