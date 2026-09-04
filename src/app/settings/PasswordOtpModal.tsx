import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, Check } from "lucide-react";

const C = {
  bg:       "#030712",
  surface:  "#0A1324",
  elevated: "#0F1C33",
  cyan:     "#35E0DF",
  text:     "#F4F7FA",
  muted:    "#8E9FB8",
  border:   "rgba(53, 224, 223, 0.18)",
};

interface PasswordOtpModalProps {
  isOpen: boolean;
  adminEmail: string;
  onClose: () => void;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

export default function PasswordOtpModal({
  isOpen,
  adminEmail,
  onClose,
  onSuccess,
  onError,
}: PasswordOtpModalProps) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCountdown(45);
      setCanResend(false);
      setDigits(["", "", "", "", "", ""]);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: any;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  if (!isOpen) return null;

  const handleOtpChange = (index: number, val: string) => {
    const clean = val.replace(/\D/g, "");
    if (clean.length > 1) {
      handleOtpPaste(clean);
      return;
    }
    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    if (clean && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (pasted: string) => {
    const cleanDigits = pasted.replace(/\D/g, "").slice(0, 6);
    if (!cleanDigits) return;
    const next = ["", "", "", "", "", ""];
    for (let i = 0; i < cleanDigits.length; i++) next[i] = cleanDigits[i];
    setDigits(next);
    const nextIdx = Math.min(cleanDigits.length, 5);
    inputRefs.current[nextIdx]?.focus();
  };

  const handleConfirm = () => {
    const code = digits.join("");
    if (code.length < 6) {
      onError("Please enter the complete 6-digit 2FA authorization code.");
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSuccess();
    }, 600);
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(3,7,18,0.85)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      zIndex: 150,
    }}>
      <div style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "28px 26px",
        maxWidth: 440,
        width: "100%",
        boxShadow: "0 24px 64px rgba(0,0,0,0.8)",
        position: "relative",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.cyan, marginBottom: 12 }}>
          <ShieldCheck size={24} />
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>2FA Security Authorization</div>
            <div style={{ fontSize: 11, color: C.cyan, fontWeight: 600 }}>PASSWORD ROTATION PROTOCOL</div>
          </div>
        </div>

        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, margin: "0 0 20px" }}>
          A 6-digit time-based OTP code has been dispatched to:
          <br />
          <strong style={{ color: C.text }}>{adminEmail}</strong>
        </p>

        {/* 6-slot OTP Input */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 16 }}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !digits[i] && i > 0) {
                  inputRefs.current[i - 1]?.focus();
                }
              }}
              onPaste={(e) => {
                e.preventDefault();
                handleOtpPaste(e.clipboardData.getData("text"));
              }}
              style={{
                width: 50,
                height: 52,
                background: C.elevated,
                border: `1.5px solid ${digit ? C.cyan : C.border}`,
                borderRadius: 8,
                textAlign: "center",
                fontSize: 22,
                fontWeight: 800,
                color: C.cyan,
                outline: "none",
                fontFamily: "monospace",
                boxShadow: digit ? "0 0 10px rgba(53,224,223,0.25)" : "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = C.cyan)}
              onBlur={(e) => (e.target.style.borderColor = digit ? C.cyan : C.border)}
            />
          ))}
        </div>

        {/* Quick Fill & Resend Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, marginBottom: 20 }}>
          {canResend ? (
            <button
              type="button"
              onClick={() => {
                setCanResend(false);
                setCountdown(45);
              }}
              style={{ background: "transparent", border: "none", color: C.cyan, fontSize: 11.5, fontWeight: 600, cursor: "pointer", padding: 0 }}
            >
              Resend OTP Code
            </button>
          ) : (
            <span style={{ color: C.muted, fontSize: 11.5 }}>
              Resend in <strong style={{ color: C.text }}>{countdown}s</strong>
            </span>
          )}

          <button
            type="button"
            onClick={() => handleOtpPaste("592814")}
            style={{
              background: "rgba(53,224,223,0.08)",
              border: `1px solid rgba(53,224,223,0.25)`,
              borderRadius: 6,
              padding: "3px 8px",
              color: C.cyan,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ⚡ Quick Fill (592814)
          </button>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              height: 42,
              background: "transparent",
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              color: C.muted,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isVerifying}
            onClick={handleConfirm}
            style={{
              flex: 2,
              height: 42,
              background: isVerifying ? "rgba(53,224,223,0.5)" : C.cyan,
              border: "none",
              borderRadius: 8,
              color: "#050C1A",
              fontSize: 13,
              fontWeight: 700,
              cursor: isVerifying ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            {isVerifying ? (
              <span>Verifying 2FA Token...</span>
            ) : (
              <>
                <Check size={14} />
                <span>Verify & Apply Password</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
