import React, { useState, useEffect, useRef } from "react";
import {
  Shield, Lock, Mail, Eye, EyeOff, Check,
  AlertTriangle, ArrowRight, ArrowLeft, Activity,
  Sparkles, Key, Radio, RefreshCw, Smartphone
} from "lucide-react";

const C = {
  bg:       "#030712",
  surface:  "#0A1324",
  elevated: "#0F1C33",
  cyan:     "#35E0DF",
  cyanDark: "#108887",
  text:     "#F4F7FA",
  muted:    "#8E9FB8",
  border:   "rgba(53, 224, 223, 0.18)",
  borderSubtle: "rgba(255, 255, 255, 0.07)",
  error:    "#f87171",
};

interface LoginPageProps {
  onLogin: (user: { name: string; email: string; role: string }) => void;
}

import SynapseEmblem from "./components/brand/SynapseEmblem";
import NeuralBackground from "./components/visual/NeuralBackground";

export default function LoginPage({ onLogin }: LoginPageProps) {
  // Step: "credentials" or "otp"
  const [step, setStep] = useState<"credentials" | "otp">("credentials");

  // Credentials State
  const [email, setEmail] = useState("ahmed.admin@synapsemed.edu");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP State (6 Digits)
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [otpCountdown, setOtpCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Status State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotModal, setForgotModal] = useState(false);

  // Countdown timer effect for OTP resend
  useEffect(() => {
    let timer: any;
    if (step === "otp" && otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    } else if (otpCountdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, otpCountdown]);

  // Step 1: Submit Credentials
  function handleCredentialsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please specify both administrator work email and access key.");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      setOtpCountdown(45);
      setCanResend(false);
      // Auto focus the first slot of OTP after transitioning
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 150);
    }, 450);
  }

  // Handle individual OTP slot changes
  function handleOtpChange(index: number, value: string) {
    const cleanVal = value.replace(/\D/g, ""); // Digits only

    if (cleanVal.length > 1) {
      // User pasted multiple digits into this box
      handleOtpPaste(cleanVal);
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal;
    setOtpDigits(newDigits);
    setError(null);

    // Auto advance focus
    if (cleanVal && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  }

  // Handle Backspace navigation
  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  }

  // Handle Pasting a 6-digit code
  function handleOtpPaste(pastedData: string) {
    const digitsOnly = pastedData.replace(/\D/g, "").slice(0, 6);
    if (!digitsOnly) return;

    const newDigits = ["", "", "", "", "", ""];
    for (let i = 0; i < digitsOnly.length; i++) {
      newDigits[i] = digitsOnly[i];
    }
    setOtpDigits(newDigits);
    setError(null);

    const nextIndex = Math.min(digitsOnly.length, 5);
    otpInputsRef.current[nextIndex]?.focus();
  }

  // Step 2: Submit OTP
  function handleOtpSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const fullCode = otpDigits.join("");
    if (fullCode.length < 6) {
      setError("Please enter the complete 6-digit security OTP code.");
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      onLogin({
        name: email.toLowerCase().includes("mostafa") ? "Dr. Mostafa Omar" : "Ahmed Admin",
        email: email,
        role: email.toLowerCase().includes("mostafa") ? "Academic Director" : "Super Admin",
      });
    }, 600);
  }

  // Quick fill OTP code for testing
  function handleQuickFillOtp(code = "592814") {
    handleOtpPaste(code);
    setError(null);
  }

  // Resend OTP
  function handleResendOtp() {
    if (!canResend) return;
    setCanResend(false);
    setOtpCountdown(45);
    setResendSuccess(true);
    setError(null);
    setTimeout(() => setResendSuccess(false), 3000);
  }

  // Quick fill credentials
  function handleQuickFill(role: "super" | "director") {
    if (role === "super") {
      setEmail("ahmed.admin@synapsemed.edu");
      setPassword("SynapseRoot@2026");
    } else {
      setEmail("mostafa.omar@synapsemed.edu");
      setPassword("DeanAcademic@2026");
    }
    setError(null);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse 90% 60% at 50% -10%, rgba(53,224,223,0.18) 0%, ${C.bg} 80%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "'Montserrat', sans-serif",
      color: C.text,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Living Interactive Neural Background */}
      <NeuralBackground />

      {/* Subtle top metadata */}
      <div style={{
        position: "absolute",
        top: 24,
        left: 28,
        fontSize: 10,
        color: "rgba(142, 159, 184, 0.35)",
        letterSpacing: "0.2em",
        zIndex: 2,
        userSelect: "none",
      }}>
        SYSTEM NODE // SYNAPSE.DRM.V3.4
      </div>

      <div style={{
        position: "absolute",
        top: 24,
        right: 28,
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11,
        color: "rgba(142, 159, 184, 0.6)",
        zIndex: 2,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
        <span>SECURE GATEWAY ENCRYPTED</span>
      </div>

      {/* Main Glassmorphic Identity Portal */}
      <div style={{
        width: "100%",
        maxWidth: 480,
        position: "relative",
        zIndex: 10,
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          {/* Animated Synapse Emblem */}
          <div style={{ display: "inline-block", marginBottom: 12 }}>
            <SynapseEmblem size={88} />
          </div>

          {/* S Y N A P S E   M E D */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <span style={{
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "0.32em",
              color: "#FFFFFF",
              textTransform: "uppercase",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              paddingLeft: "0.32em",
            }}>
              SYNAPSE
            </span>
            <span style={{
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "0.32em",
              color: C.cyan,
              textTransform: "uppercase",
              textShadow: "0 0 16px rgba(53,224,223,0.5)",
            }}>
              MED
            </span>
          </div>

          {/* Tagline: LEARN · CONNECT · HEAL */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginTop: 8,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.3em",
            color: "rgba(244,247,250,0.7)",
            textTransform: "uppercase",
          }}>
            <span>LEARN</span>
            <span style={{ color: C.cyan, fontSize: 8 }}>●</span>
            <span>CONNECT</span>
            <span style={{ color: C.cyan, fontSize: 8 }}>●</span>
            <span>HEAL</span>
          </div>

          {/* Step Pill Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 14,
            padding: "4px 14px",
            borderRadius: 20,
            background: "rgba(53,224,223,0.09)",
            border: `1px solid rgba(53,224,223,0.28)`,
            boxShadow: "0 0 12px rgba(53,224,223,0.12)",
          }}>
            {step === "credentials" ? (
              <>
                <Activity size={12} style={{ color: C.cyan }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", color: C.cyan, textTransform: "uppercase" }}>
                  Administrator Console Gateway
                </span>
              </>
            ) : (
              <>
                <Shield size={12} style={{ color: C.cyan }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", color: C.cyan, textTransform: "uppercase" }}>
                  Two-Factor Authentication (2FA OTP)
                </span>
              </>
            )}
          </div>
        </div>

        {/* Portal Card */}
        <div style={{
          background: "linear-gradient(180deg, rgba(15, 28, 51, 0.8) 0%, rgba(10, 19, 36, 0.92) 100%)",
          backdropFilter: "blur(24px)",
          border: `1px solid ${C.border}`,
          borderRadius: 20,
          padding: "32px 28px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)",
          position: "relative",
        }}>

          {error && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 8,
              background: "rgba(248,113,113,0.12)",
              border: "1px solid rgba(248,113,113,0.3)",
              color: C.error,
              fontSize: 12,
              marginBottom: 20,
            }}>
              <AlertTriangle size={15} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* STEP 1: CREDENTIALS (EMAIL & PASSWORD)                         */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {step === "credentials" && (
            <form onSubmit={handleCredentialsSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Email Field */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6 }}>
                  Official Administrator Email
                </label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <Mail size={16} style={{ position: "absolute", insetInlineStart: 14, color: C.muted, pointerEvents: "none" }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@synapsemed.edu"
                    style={{
                      width: "100%",
                      height: 44,
                      background: "rgba(7, 15, 30, 0.75)",
                      border: `1px solid ${C.borderSubtle}`,
                      borderRadius: 9,
                      paddingInlineStart: 40,
                      paddingInlineEnd: 12,
                      fontSize: 13,
                      color: C.text,
                      outline: "none",
                      fontFamily: "inherit",
                      transition: "all 0.18s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = C.cyan;
                      e.target.style.boxShadow = "0 0 0 3px rgba(53,224,223,0.18)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = C.borderSubtle;
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>
                    Password / Keycard
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModal(true)}
                    style={{ background: "transparent", border: "none", color: C.cyan, fontSize: 11, fontWeight: 600, cursor: "pointer", padding: 0 }}
                  >
                    Key Recovery?
                  </button>
                </div>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <Lock size={16} style={{ position: "absolute", insetInlineStart: 14, color: C.muted, pointerEvents: "none" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    style={{
                      width: "100%",
                      height: 44,
                      background: "rgba(7, 15, 30, 0.75)",
                      border: `1px solid ${C.borderSubtle}`,
                      borderRadius: 9,
                      paddingInlineStart: 40,
                      paddingInlineEnd: 42,
                      fontSize: 13,
                      color: C.text,
                      outline: "none",
                      fontFamily: "inherit",
                      transition: "all 0.18s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = C.cyan;
                      e.target.style.boxShadow = "0 0 0 3px rgba(53,224,223,0.18)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = C.borderSubtle;
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      insetInlineEnd: 12,
                      background: "transparent",
                      border: "none",
                      color: C.muted,
                      cursor: "pointer",
                      padding: 4,
                      display: "flex",
                    }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & 2FA Info */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: -2 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 12, color: C.muted }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: C.cyan, cursor: "pointer", width: 14, height: 14 }}
                  />
                  Remember this workstation
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#4ade80" }}>
                  <Check size={12} />
                  <span>2FA Enforced</span>
                </div>
              </div>

              {/* Next Step CTA */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  height: 46,
                  borderRadius: 9,
                  border: "none",
                  background: loading ? "rgba(53,224,223,0.5)" : `linear-gradient(135deg, ${C.cyan} 0%, #1ab8b7 100%)`,
                  color: "#030712",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.18s ease",
                  boxShadow: "0 6px 22px rgba(53,224,223,0.32)",
                  marginTop: 6,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 8px 28px rgba(53,224,223,0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 22px rgba(53,224,223,0.32)";
                }}
              >
                {loading ? (
                  <>
                    <div style={{ width: 16, height: 16, border: "2px solid #030712", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to 2FA Verification</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* Quick-Fill Credentials */}
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${C.borderSubtle}` }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(142,159,184,0.7)", marginBottom: 10, textAlign: "center", textTransform: "uppercase" }}>
                  ⚡ QUICK TEST CREDENTIALS
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => handleQuickFill("super")}
                    style={{
                      padding: "8px 8px",
                      borderRadius: 8,
                      border: `1px solid ${C.borderSubtle}`,
                      background: "rgba(7, 15, 30, 0.6)",
                      color: C.text,
                      fontSize: 11.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.15s ease",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = C.cyan;
                      e.currentTarget.style.background = "rgba(53,224,223,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = C.borderSubtle;
                      e.currentTarget.style.background = "rgba(7, 15, 30, 0.6)";
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>Ahmed Admin</span>
                    <span style={{ fontSize: 10, color: C.cyan }}>Super Admin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickFill("director")}
                    style={{
                      padding: "8px 8px",
                      borderRadius: 8,
                      border: `1px solid ${C.borderSubtle}`,
                      background: "rgba(7, 15, 30, 0.6)",
                      color: C.text,
                      fontSize: 11.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.15s ease",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = C.cyan;
                      e.currentTarget.style.background = "rgba(53,224,223,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = C.borderSubtle;
                      e.currentTarget.style.background = "rgba(7, 15, 30, 0.6)";
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>Dr. Mostafa Omar</span>
                    <span style={{ fontSize: 10, color: C.cyan }}>Academic Director</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* STEP 2: 2FA / OTP VERIFICATION (6 DIGIT BOXES)                */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {step === "otp" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              
              {/* Back to Step 1 & Target Account Info */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <button
                  type="button"
                  onClick={() => { setStep("credentials"); setError(null); }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "transparent",
                    border: "none",
                    color: C.muted,
                    fontSize: 12,
                    cursor: "pointer",
                    padding: 0,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.cyan)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
                >
                  <ArrowLeft size={14} />
                  <span>Back to Login</span>
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#4ade80" }}>
                  <Smartphone size={12} />
                  <span>OTP Sent</span>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>
                  Enter 6-Digit Security Code
                </h3>
                <p style={{ fontSize: 12.5, color: C.muted, margin: 0, lineHeight: 1.5 }}>
                  A one-time verification code has been dispatched to:
                  <br />
                  <span style={{ color: C.cyan, fontWeight: 600 }}>{email}</span>
                </p>
              </div>

              {/* Success Notification for Resend */}
              {resendSuccess && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ade80", fontSize: 12, fontWeight: 600 }}>
                  <Check size={14} />
                  <span>New security code dispatched to your email.</span>
                </div>
              )}

              {/* 6-Slot OTP Input Grid */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputsRef.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={(e) => {
                      e.preventDefault();
                      handleOtpPaste(e.clipboardData.getData("text"));
                    }}
                    style={{
                      width: 54,
                      height: 58,
                      background: "rgba(7, 15, 30, 0.85)",
                      border: `1.5px solid ${digit ? C.cyan : C.borderSubtle}`,
                      borderRadius: 10,
                      textAlign: "center",
                      fontSize: 24,
                      fontWeight: 800,
                      color: C.cyan,
                      outline: "none",
                      fontFamily: "monospace",
                      transition: "all 0.15s ease",
                      boxShadow: digit ? "0 0 12px rgba(53,224,223,0.2)" : "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = C.cyan;
                      e.target.style.boxShadow = "0 0 16px rgba(53,224,223,0.3)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = digit ? C.cyan : C.borderSubtle;
                      e.target.style.boxShadow = digit ? "0 0 12px rgba(53,224,223,0.2)" : "none";
                    }}
                  />
                ))}
              </div>

              {/* Resend Timer & Quick Fill */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      background: "transparent",
                      border: "none",
                      color: C.cyan,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <RefreshCw size={12} />
                    <span>Resend Security Code</span>
                  </button>
                ) : (
                  <span style={{ color: C.muted }}>
                    Resend code in <strong style={{ color: C.text }}>{otpCountdown}s</strong>
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => handleQuickFillOtp("592814")}
                  style={{
                    background: "rgba(53,224,223,0.08)",
                    border: `1px solid rgba(53,224,223,0.25)`,
                    borderRadius: 6,
                    padding: "4px 8px",
                    color: C.cyan,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  ⚡ Quick Fill (592814)
                </button>
              </div>

              {/* Confirm OTP CTA */}
              <button
                type="button"
                onClick={() => handleOtpSubmit()}
                disabled={loading}
                style={{
                  width: "100%",
                  height: 46,
                  borderRadius: 9,
                  border: "none",
                  background: loading ? "rgba(53,224,223,0.5)" : `linear-gradient(135deg, ${C.cyan} 0%, #1ab8b7 100%)`,
                  color: "#030712",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.18s ease",
                  boxShadow: "0 6px 22px rgba(53,224,223,0.32)",
                  marginTop: 4,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 8px 28px rgba(53,224,223,0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 22px rgba(53,224,223,0.32)";
                }}
              >
                {loading ? (
                  <>
                    <div style={{ width: 16, height: 16, border: "2px solid #030712", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    <span>Authorizing Session Token...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Launch Admin Console</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

            </div>
          )}

        </div>

        {/* Security Footer */}
        <div style={{ textAlign: "center", marginTop: 18 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(142,159,184,0.55)", fontSize: 11 }}>
            <Shield size={12} />
            <span>Synapse Med Hardware DRM · Session Token Validated by Central Auth Vault</span>
          </div>
        </div>
      </div>

      {/* Forgot Key Modal */}
      {forgotModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(3,7,18,0.88)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          zIndex: 100,
        }}>
          <div style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: 28,
            maxWidth: 420,
            width: "100%",
            boxShadow: "0 24px 64px rgba(0,0,0,0.8)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.cyan, marginBottom: 14 }}>
              <Key size={22} />
              <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>Admin Key Recovery Protocol</div>
            </div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 20 }}>
              Administrative password resets require dual-key cryptographic approval from the Academic Dean or Infrastructure Director. Please contact emergency platform operations at <code style={{ color: C.cyan, background: C.elevated, padding: "3px 7px", borderRadius: 4, fontSize: 12 }}>ops@synapsemed.edu</code>.
            </p>
            <button
              onClick={() => setForgotModal(false)}
              style={{
                width: "100%",
                padding: "10px 0",
                background: C.cyan,
                border: "none",
                borderRadius: 8,
                color: "#030712",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes synapseAura {
          0% { transform: scale(0.95); opacity: 0.6; }
          100% { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
