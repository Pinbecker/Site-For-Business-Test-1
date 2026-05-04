import { useState } from 'react';
import type { Content, ImageAsset, ServiceItem, SiteProject, Testimonial } from '@/types/project';
import { Field } from '../components/Field';
import { SectionShell } from '../components/SectionShell';
import { ImageDropzone } from '../components/ImageDropzone';
import { newServiceItem, newTestimonial } from '../defaults';

interface Props {
  project: SiteProject;
  update: (patch: Partial<Content>) => void;
}

export function ContentSection({ project, update }: Props) {
  const c = project.content;

  const updateService = (id: string, patch: Partial<ServiceItem>) => {
    update({ services: c.services.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
  };
  const removeService = (id: string) => update({ services: c.services.filter((s) => s.id !== id) });
  const addService = () => update({ services: [...c.services, newServiceItem()] });

  const updateTestimonial = (id: string, patch: Partial<Testimonial>) => {
    update({ testimonials: c.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)) });
  };
  const removeTestimonial = (id: string) =>
    update({ testimonials: c.testimonials.filter((t) => t.id !== id) });
  const addTestimonial = () => update({ testimonials: [...c.testimonials, newTestimonial()] });

  return (
    <>
      <SectionShell title="About" description="A paragraph or two about the business — keep it warm and specific.">
        <Field label="About section" htmlFor="content-about">
          <textarea
            id="content-about"
            className="field-input min-h-[120px]"
            value={c.about}
            onChange={(e) => update({ about: e.target.value })}
            rows={6}
          />
        </Field>
      </SectionShell>

      <SectionShell title="Services / offerings" description="Repeatable list. Keep names short and descriptions punchy.">
        <div className="space-y-3">
          {c.services.map((s, i) => (
            <div key={s.id} className="rounded-lg bg-ink-50/60 p-3 ring-1 ring-ink-100">
              <div className="mb-2 flex items-center justify-between">
                <span className="pill">Service {i + 1}</span>
                <button
                  type="button"
                  className="text-xs text-rose-600 hover:underline"
                  onClick={() => removeService(s.id)}
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="field-input"
                  placeholder="Name"
                  value={s.name}
                  onChange={(e) => updateService(s.id, { name: e.target.value })}
                />
                <input
                  className="field-input"
                  placeholder="Price (optional)"
                  value={s.price}
                  onChange={(e) => updateService(s.id, { price: e.target.value })}
                />
                <textarea
                  className="field-input sm:col-span-2"
                  placeholder="Short description"
                  value={s.description}
                  onChange={(e) => updateService(s.id, { description: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
          ))}
          <button type="button" className="btn-secondary" onClick={addService}>
            + Add service
          </button>
        </div>
      </SectionShell>

      <SectionShell title="Gallery" description="Drag images in to upload. Drag tiles to reorder.">
        <ImageDropzone
          onAdded={(assets) => update({ gallery: [...c.gallery, ...assets] })}
          hint="JPG, PNG, WebP, or SVG. We add WebP conversion hints to the export."
        />
        <GalleryGrid
          gallery={c.gallery}
          onReorder={(next) => update({ gallery: next })}
          onUpdateAlt={(id, alt) =>
            update({
              gallery: c.gallery.map((g) => (g.id === id ? { ...g, alt } : g)),
            })
          }
          onRemove={(id) => update({ gallery: c.gallery.filter((g) => g.id !== id) })}
        />
      </SectionShell>

      <SectionShell title="Testimonials" description="Real quotes from real customers — keep them concise.">
        <div className="space-y-3">
          {c.testimonials.map((t, i) => (
            <div key={t.id} className="rounded-lg bg-ink-50/60 p-3 ring-1 ring-ink-100">
              <div className="mb-2 flex items-center justify-between">
                <span className="pill">Testimonial {i + 1}</span>
                <button
                  type="button"
                  className="text-xs text-rose-600 hover:underline"
                  onClick={() => removeTestimonial(t.id)}
                >
                  Remove
                </button>
              </div>
              <textarea
                className="field-input mb-2"
                placeholder="Quote"
                value={t.quote}
                onChange={(e) => updateTestimonial(t.id, { quote: e.target.value })}
                rows={2}
              />
              <input
                className="field-input"
                placeholder="Customer name"
                value={t.customerName}
                onChange={(e) => updateTestimonial(t.id, { customerName: e.target.value })}
              />
            </div>
          ))}
          <button type="button" className="btn-secondary" onClick={addTestimonial}>
            + Add testimonial
          </button>
        </div>
      </SectionShell>

      <SectionShell title="Social media" description="Optional. Leave blank to hide a network from the site.">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Instagram URL" htmlFor="social-ig">
            <input
              id="social-ig"
              className="field-input"
              value={c.social.instagram}
              onChange={(e) => update({ social: { ...c.social, instagram: e.target.value } })}
              placeholder="https://instagram.com/…"
            />
          </Field>
          <Field label="Facebook URL" htmlFor="social-fb">
            <input
              id="social-fb"
              className="field-input"
              value={c.social.facebook}
              onChange={(e) => update({ social: { ...c.social, facebook: e.target.value } })}
              placeholder="https://facebook.com/…"
            />
          </Field>
          <Field label="TikTok URL" htmlFor="social-tt">
            <input
              id="social-tt"
              className="field-input"
              value={c.social.tiktok}
              onChange={(e) => update({ social: { ...c.social, tiktok: e.target.value } })}
              placeholder="https://tiktok.com/@…"
            />
          </Field>
        </div>
      </SectionShell>
    </>
  );
}

interface GalleryGridProps {
  gallery: ImageAsset[];
  onReorder: (next: ImageAsset[]) => void;
  onUpdateAlt: (id: string, alt: string) => void;
  onRemove: (id: string) => void;
}

function GalleryGrid({ gallery, onReorder, onUpdateAlt, onRemove }: GalleryGridProps) {
  const [dragId, setDragId] = useState<string | null>(null);

  if (!gallery.length) return null;

  const move = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    const next = gallery.slice();
    const sourceIdx = next.findIndex((g) => g.id === sourceId);
    const targetIdx = next.findIndex((g) => g.id === targetId);
    if (sourceIdx < 0 || targetIdx < 0) return;
    const [item] = next.splice(sourceIdx, 1);
    if (!item) return;
    next.splice(targetIdx, 0, item);
    onReorder(next);
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {gallery.map((g) => (
        <div
          key={g.id}
          draggable
          onDragStart={() => setDragId(g.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (dragId) move(dragId, g.id);
            setDragId(null);
          }}
          onDragEnd={() => setDragId(null)}
          className={`group relative overflow-hidden rounded-lg bg-ink-100 ring-1 ring-ink-200 ${
            dragId === g.id ? 'opacity-50' : ''
          }`}
        >
          <img src={g.dataUrl} alt={g.alt} className="aspect-square w-full object-cover" />
          <div className="space-y-1 p-2">
            <input
              className="w-full rounded border-0 bg-white px-2 py-1 text-xs ring-1 ring-inset ring-ink-200 focus:ring-2 focus:ring-inset focus:ring-accent-500"
              value={g.alt}
              onChange={(e) => onUpdateAlt(g.id, e.target.value)}
              placeholder="Alt text"
              aria-label={`Alt text for ${g.filename}`}
            />
            <div className="flex items-center justify-between text-xs text-ink-500">
              <span className="truncate" title={g.filename}>
                {g.filename}
              </span>
              <button type="button" className="text-rose-600 hover:underline" onClick={() => onRemove(g.id)}>
                Remove
              </button>
            </div>
          </div>
          <span className="pointer-events-none absolute left-2 top-2 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-medium text-white">
            ⠿ drag
          </span>
        </div>
      ))}
    </div>
  );
}
