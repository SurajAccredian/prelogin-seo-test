"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Wrapper from "../Wrapper/HomePageWrapper";
import { toast } from "react-hot-toast";
import {
  CheckCircle2,
  AlertCircle,
  FileQuestion,
  Award,
  Calendar,
  Clock,
  User,
  FileText,
  Download,
  ShieldCheck,
  QrCode,
} from "lucide-react";
import workshopData from "../Assets/verification/coca-cola-participants.json";

const CocaColaVerification = () => {
  const searchParams = useSearchParams();
  const certId = searchParams.get("id");

  // Lookup participant by exact ID match (case-sensitive or trimmed)
  const participant = certId
    ? workshopData.participants.find(
        (p) => p.id.trim() === certId.trim()
      )
    : null;

  // Compute PDF download URL
  const pdfUrl =
    participant?.pdfUrl ||
    (workshopData?.pdfBaseUrl && participant?.id
      ? `${workshopData.pdfBaseUrl}${participant.id}.pdf`
      : null);

  const handleDownloadPdf = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    } else {
      toast.error("Certificate PDF download is currently unavailable.", {
        id: "pdf-unavailable-toast",
      });
    }
  };

  // State 1: Missing ID
  if (!certId) {
    return (
      <Wrapper>
        <div className="bg-slate-100/90 min-h-screen pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans flex flex-col justify-center items-center">
          <div className="w-full max-w-xl mx-auto">
            <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-5">
                <FileQuestion className="w-8 h-8 text-amber-500" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold uppercase tracking-wider mb-4">
                Missing Parameter
              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                No Certificate ID Provided
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                This verification page requires a valid certificate ID parameter in the URL.
              </p>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-left flex items-start gap-3">
                <QrCode className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  To verify an official certificate, please scan the QR code printed directly on the physical certificate issued by Accredian.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-slate-400 leading-relaxed">
              <p>Each physical certificate issued by Accredian contains a unique QR code with its certificate ID.</p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // State 2: Invalid ID (specified ID was not found in workshop records)
  if (!participant) {
    return (
      <Wrapper>
        <div className="bg-slate-100/90 min-h-screen pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans flex flex-col justify-center items-center">
          <div className="w-full max-w-xl mx-auto">
            <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-5">
                <AlertCircle className="w-8 h-8 text-rose-500" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold uppercase tracking-wider mb-4">
                Verification Unsuccessful
              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                Invalid Certificate ID
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                The certificate ID{" "}
                <code className="font-mono bg-rose-50 text-rose-700 font-semibold px-2 py-0.5 rounded border border-rose-200">
                  {certId}
                </code>{" "}
                could not be matched with any official workshop records.
              </p>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-left flex items-start gap-3">
                <QrCode className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Please verify that you have scanned the QR code accurately from the physical certificate. If you believe this is an error, contact Accredian support.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-slate-400 leading-relaxed">
              <p>Each physical certificate issued by Accredian contains a unique QR code with its certificate ID.</p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // State 3: Valid Certificate
  return (
    <Wrapper>
      <div className="bg-slate-100/90 min-h-screen pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl mx-auto">
          {/* Main Certificate Verification Card */}
          <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-6 sm:p-10 text-left relative overflow-hidden">
            
            {/* Top Verified Indicator Header */}
            <div className="flex flex-col items-start mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-bold text-xs sm:text-sm tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified certificate</span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm mt-2.5 font-medium">
                This certificate ID matches our workshop records.
              </p>
            </div>

            {/* Workshop Title */}
            <div className="border-t border-slate-100 pt-5 pb-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {workshopData.workshop}
              </h2>
            </div>

            {/* Awarded To Section */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                AWARDED TO
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                {participant.name}
              </h1>
            </div>

            {/* Information Grid: 2 Columns on Desktop, 1 Column on Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {/* Certificate ID Card */}
              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Certificate ID
                  </p>
                  <p className="text-sm sm:text-base font-bold text-slate-800 font-mono mt-0.5">
                    {participant.id}
                  </p>
                </div>
              </div>

              {/* Role Card */}
              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Role
                  </p>
                  <p className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
                    {participant.role}
                  </p>
                </div>
              </div>

              {/* Issued On Card */}
              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Issued On
                  </p>
                  <p className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
                    {workshopData.date}
                  </p>
                </div>
              </div>

              {/* Duration Card */}
              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Duration
                  </p>
                  <p className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
                    {workshopData.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Issuer Information */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">Issued by</span>
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600" />
                {workshopData.issuer}
              </span>
            </div>

            {/* Download Certificate PDF Button */}
            {pdfUrl ? (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={`${participant.id}.pdf`}
                className="w-full mt-8 py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base bg-[#1A73E8] hover:bg-[#1557B0] text-white transition-all shadow-md shadow-blue-500/20 active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer text-center"
              >
                <Download className="w-5 h-5" />
                <span>Download certificate (PDF)</span>
              </a>
            ) : (
              <button
                onClick={handleDownloadPdf}
                className="w-full mt-8 py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base bg-[#1A73E8] hover:bg-[#1557B0] text-white transition-all shadow-md shadow-blue-500/20 active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>Download certificate (PDF)</span>
              </button>
            )}
          </div>

          {/* Footer Explanation Note */}
          <div className="mt-8 text-center text-xs text-slate-400 leading-relaxed max-w-lg mx-auto">
            <p>
              Each physical certificate issued by Accredian contains a unique QR code. Scanning the QR code verifies the authenticity of the certificate against our official workshop records.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CocaColaVerification;
