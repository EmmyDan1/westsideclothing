import { Upload, X } from 'lucide-react'

export default function ImageUploader({
  label,
  multiple = false,
  uploading = false,
  previews = [],
  onUpload,
  onRemove,
}) {
  return (
    <div>
      <label className="text-white/40 text-[10px] tracking-widest uppercase block mb-2">
        {label}
      </label>

      <label className="flex items-center gap-3 border border-dashed border-white/15 px-4 py-4 cursor-pointer hover:border-white/30 transition-colors">
        <Upload className="w-4 h-4 text-white/30" />
        <span className="text-white/30 text-sm">
          {uploading ? 'Uploading...' : `Click to upload ${multiple ? '(select multiple)' : ''}`}
        </span>
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={onUpload}
          className="hidden"
        />
      </label>

      {previews.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {previews.map((url, i) => (
            <div
              key={i}
              className={`relative ${multiple ? 'w-16 h-16' : 'w-24 h-24'}`}
            >
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onRemove(i)}
                className="absolute -top-1.5 -right-1.5 bg-black border border-white/20 text-white/60 hover:text-white w-5 h-5 flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}