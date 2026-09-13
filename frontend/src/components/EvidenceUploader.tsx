import { useCallback, useState } from "react";
import { UploadCloud, FileText, Image as ImageIcon, Video, File, X, CheckCircle2 } from "lucide-react";

export interface UploadedEvidence {
  id: string;
  name: string;
  type: "photo" | "video" | "pdf" | "document";
  sizeLabel: string;
}

function inferType(name: string): UploadedEvidence["type"] {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "photo";
  if (["mp4", "mov", "avi"].includes(ext)) return "video";
  if (ext === "pdf") return "pdf";
  return "document";
}

const iconFor = { photo: ImageIcon, video: Video, pdf: FileText, document: File };

export function EvidenceUploader({ files, onChange }: { files: UploadedEvidence[]; onChange: (f: UploadedEvidence[]) => void }) {
  const [dragging, setDragging] = useState(false);

  const addFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      const next: UploadedEvidence[] = Array.from(list).map((f) => ({
        id: `${f.name}-${f.size}-${Date.now()}`,
        name: f.name,
        type: inferType(f.name),
        sizeLabel: f.size > 1024 * 1024 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(f.size / 1024))} KB`,
      }));
      onChange([...files, ...next]);
    },
    [files, onChange]
  );

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl2 border-2 border-dashed px-6 py-10 text-center transition " +
          (dragging ? "border-royal-500 bg-royal-50 dark:bg-royal-500/10" : "border-slate-300 hover:border-royal-400 dark:border-white/15")
        }
      >
        <UploadCloud size={28} className="text-royal-600" />
        <div className="font-medium text-slate-700 dark:text-slate-200">Drag and drop evidence, or click to browse</div>
        <div className="text-xs text-slate-400 dark:text-slate-500">Photos, videos, PDFs or documents</div>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
          accept="image/*,video/*,.pdf,.doc,.docx"
        />
      </label>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f) => {
            const Icon = iconFor[f.type];
            return (
              <div key={f.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-royal-50 p-2 text-royal-600 dark:bg-royal-500/10 dark:text-royal-400">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-100">{f.name}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">{f.sizeLabel}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-emerald2-600 dark:text-emerald2-500">
                    <CheckCircle2 size={13} /> Verified
                  </span>
                  <button
                    onClick={() => onChange(files.filter((x) => x.id !== f.id))}
                    className="text-slate-400 hover:text-crimson-500"
                    aria-label={`Remove ${f.name}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
