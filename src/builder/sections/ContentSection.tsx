import { useState } from 'react';
import type {
  AreaServed,
  Content,
  CredentialItem,
  FaqItem,
  FeatureItem,
  ImageAsset,
  ProcessStep,
  ProductItem,
  ServiceItem,
  SiteProject,
  TeamMember,
  Testimonial,
} from '@/types/project';
import { Field } from '../components/Field';
import { SectionShell } from '../components/SectionShell';
import { ImageDropzone } from '../components/ImageDropzone';
import {
  newAreaServed,
  newCredentialItem,
  newFaqItem,
  newFeatureItem,
  newProcessStep,
  newProductItem,
  newServiceItem,
  newTeamMember,
  newTestimonial,
} from '../defaults';

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

  const updateFeature = (id: string, patch: Partial<FeatureItem>) => {
    update({ features: c.features.map((item) => (item.id === id ? { ...item, ...patch } : item)) });
  };
  const removeFeature = (id: string) => update({ features: c.features.filter((item) => item.id !== id) });
  const addFeature = () => update({ features: [...c.features, newFeatureItem()] });

  const updateProcess = (id: string, patch: Partial<ProcessStep>) => {
    update({ process: c.process.map((item) => (item.id === id ? { ...item, ...patch } : item)) });
  };
  const removeProcess = (id: string) => update({ process: c.process.filter((item) => item.id !== id) });
  const addProcess = () => update({ process: [...c.process, newProcessStep()] });

  const updateProduct = (id: string, patch: Partial<ProductItem>) => {
    update({ products: c.products.map((item) => (item.id === id ? { ...item, ...patch } : item)) });
  };
  const removeProduct = (id: string) => update({ products: c.products.filter((item) => item.id !== id) });
  const addProduct = () => update({ products: [...c.products, newProductItem()] });

  const updateTestimonial = (id: string, patch: Partial<Testimonial>) => {
    update({ testimonials: c.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)) });
  };
  const removeTestimonial = (id: string) =>
    update({ testimonials: c.testimonials.filter((t) => t.id !== id) });
  const addTestimonial = () => update({ testimonials: [...c.testimonials, newTestimonial()] });

  const updateFaq = (id: string, patch: Partial<FaqItem>) => {
    update({ faqs: c.faqs.map((item) => (item.id === id ? { ...item, ...patch } : item)) });
  };
  const removeFaq = (id: string) => update({ faqs: c.faqs.filter((item) => item.id !== id) });
  const addFaq = () => update({ faqs: [...c.faqs, newFaqItem()] });

  const updateTeam = (id: string, patch: Partial<TeamMember>) => {
    update({ team: c.team.map((item) => (item.id === id ? { ...item, ...patch } : item)) });
  };
  const removeTeam = (id: string) => update({ team: c.team.filter((item) => item.id !== id) });
  const addTeam = () => update({ team: [...c.team, newTeamMember()] });

  const updateCredential = (id: string, patch: Partial<CredentialItem>) => {
    update({
      credentials: c.credentials.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    });
  };
  const removeCredential = (id: string) =>
    update({ credentials: c.credentials.filter((item) => item.id !== id) });
  const addCredential = () => update({ credentials: [...c.credentials, newCredentialItem()] });

  const updateArea = (id: string, patch: Partial<AreaServed>) => {
    update({ areasServed: c.areasServed.map((item) => (item.id === id ? { ...item, ...patch } : item)) });
  };
  const removeArea = (id: string) => update({ areasServed: c.areasServed.filter((item) => item.id !== id) });
  const addArea = () => update({ areasServed: [...c.areasServed, newAreaServed()] });

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

      <SectionShell title="Key features / reasons to choose" description="Use for benefits, differentiators, values, facilities, guarantees, or selling points.">
        <div className="space-y-3">
          {c.features.map((item, i) => (
            <div key={item.id} className="rounded-lg bg-ink-50/60 p-3 ring-1 ring-ink-100">
              <RepeaterHeader label={`Feature ${i + 1}`} onRemove={() => removeFeature(item.id)} />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="field-input"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) => updateFeature(item.id, { title: e.target.value })}
                />
                <textarea
                  className="field-input sm:col-span-2"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateFeature(item.id, { description: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
          ))}
          <button type="button" className="btn-secondary" onClick={addFeature}>
            + Add feature
          </button>
        </div>
      </SectionShell>

      <SectionShell title="Services / offerings" description="Repeatable list. Keep names short and descriptions punchy.">
        <div className="space-y-3">
          {c.services.map((s, i) => (
            <div key={s.id} className="rounded-lg bg-ink-50/60 p-3 ring-1 ring-ink-100">
              <RepeaterHeader label={`Service ${i + 1}`} onRemove={() => removeService(s.id)} />
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

      <SectionShell title="Products / packages" description="Optional. Use for menus, classes, shop items, packages, memberships, or featured products.">
        <div className="space-y-3">
          {c.products.map((item, i) => (
            <div key={item.id} className="rounded-lg bg-ink-50/60 p-3 ring-1 ring-ink-100">
              <RepeaterHeader label={`Product ${i + 1}`} onRemove={() => removeProduct(item.id)} />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="field-input"
                  placeholder="Name"
                  value={item.name}
                  onChange={(e) => updateProduct(item.id, { name: e.target.value })}
                />
                <input
                  className="field-input"
                  placeholder="Price (optional)"
                  value={item.price}
                  onChange={(e) => updateProduct(item.id, { price: e.target.value })}
                />
                <textarea
                  className="field-input sm:col-span-2"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateProduct(item.id, { description: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
          ))}
          <button type="button" className="btn-secondary" onClick={addProduct}>
            + Add product / package
          </button>
        </div>
      </SectionShell>

      <SectionShell title="Process / how it works" description="Use for booking steps, project phases, onboarding, delivery, ordering, or consultation flow.">
        <div className="space-y-3">
          {c.process.map((item, i) => (
            <div key={item.id} className="rounded-lg bg-ink-50/60 p-3 ring-1 ring-ink-100">
              <RepeaterHeader label={`Step ${i + 1}`} onRemove={() => removeProcess(item.id)} />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="field-input"
                  placeholder="Step title"
                  value={item.title}
                  onChange={(e) => updateProcess(item.id, { title: e.target.value })}
                />
                <textarea
                  className="field-input sm:col-span-2"
                  placeholder="Step description"
                  value={item.description}
                  onChange={(e) => updateProcess(item.id, { description: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
          ))}
          <button type="button" className="btn-secondary" onClick={addProcess}>
            + Add process step
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

      <SectionShell title="Team / people" description="Optional. Useful for salons, clinics, consultants, studios, trades teams, venues, and personal brands.">
        <div className="space-y-3">
          {c.team.map((member, i) => (
            <div key={member.id} className="rounded-lg bg-ink-50/60 p-3 ring-1 ring-ink-100">
              <RepeaterHeader label={`Team member ${i + 1}`} onRemove={() => removeTeam(member.id)} />
              <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
                <div className="space-y-2">
                  <div className="grid aspect-square place-items-center overflow-hidden rounded-lg bg-white ring-1 ring-ink-200">
                    {member.photo ? (
                      <img src={member.photo.dataUrl} alt={member.photo.alt} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xs text-ink-400">No photo</span>
                    )}
                  </div>
                  <ImageDropzone
                    multiple={false}
                    accept="image/png,image/jpeg,image/webp"
                    label={member.photo ? 'Replace' : 'Photo'}
                    onAdded={(assets) => {
                      const asset = assets[0];
                      if (asset) updateTeam(member.id, { photo: asset });
                    }}
                  />
                  {member.photo ? (
                    <button type="button" className="btn-ghost w-full px-2" onClick={() => updateTeam(member.id, { photo: null })}>
                      Remove photo
                    </button>
                  ) : null}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className="field-input"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => updateTeam(member.id, { name: e.target.value })}
                  />
                  <input
                    className="field-input"
                    placeholder="Role"
                    value={member.role}
                    onChange={(e) => updateTeam(member.id, { role: e.target.value })}
                  />
                  <textarea
                    className="field-input sm:col-span-2"
                    placeholder="Short bio"
                    value={member.bio}
                    onChange={(e) => updateTeam(member.id, { bio: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
          <button type="button" className="btn-secondary" onClick={addTeam}>
            + Add team member
          </button>
        </div>
      </SectionShell>

      <SectionShell title="Credentials / trust signals" description="Use for insurance, qualifications, years trading, awards, guarantees, memberships, or payment options.">
        <div className="space-y-3">
          {c.credentials.map((item, i) => (
            <div key={item.id} className="rounded-lg bg-ink-50/60 p-3 ring-1 ring-ink-100">
              <RepeaterHeader label={`Credential ${i + 1}`} onRemove={() => removeCredential(item.id)} />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="field-input"
                  placeholder="Label"
                  value={item.label}
                  onChange={(e) => updateCredential(item.id, { label: e.target.value })}
                />
                <input
                  className="field-input"
                  placeholder="Detail"
                  value={item.detail}
                  onChange={(e) => updateCredential(item.id, { detail: e.target.value })}
                />
              </div>
            </div>
          ))}
          <button type="button" className="btn-secondary" onClick={addCredential}>
            + Add credential
          </button>
        </div>
      </SectionShell>

      <SectionShell title="Areas served / locations" description="Use for service areas, neighbourhoods, delivery zones, branches, or local coverage.">
        <div className="space-y-3">
          {c.areasServed.map((item, i) => (
            <div key={item.id} className="rounded-lg bg-ink-50/60 p-3 ring-1 ring-ink-100">
              <RepeaterHeader label={`Area ${i + 1}`} onRemove={() => removeArea(item.id)} />
              <input
                className="field-input"
                placeholder="Area or location"
                value={item.name}
                onChange={(e) => updateArea(item.id, { name: e.target.value })}
              />
            </div>
          ))}
          <button type="button" className="btn-secondary" onClick={addArea}>
            + Add area
          </button>
        </div>
      </SectionShell>

      <SectionShell title="Promotion / announcement" description="Optional. Use for offers, events, seasonal messages, openings, lead magnets, or urgent notices.">
        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg bg-ink-50 p-3 text-sm font-medium text-ink-800 ring-1 ring-ink-100">
          <span>Show promotion block</span>
          <input
            type="checkbox"
            className="h-4 w-4 accent-accent-600"
            checked={c.promotion.enabled}
            onChange={(e) => update({ promotion: { ...c.promotion, enabled: e.target.checked } })}
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="field-input"
            placeholder="Eyebrow"
            value={c.promotion.eyebrow}
            onChange={(e) => update({ promotion: { ...c.promotion, eyebrow: e.target.value } })}
          />
          <input
            className="field-input"
            placeholder="Button label"
            value={c.promotion.buttonLabel}
            onChange={(e) => update({ promotion: { ...c.promotion, buttonLabel: e.target.value } })}
          />
          <input
            className="field-input sm:col-span-2"
            placeholder="Title"
            value={c.promotion.title}
            onChange={(e) => update({ promotion: { ...c.promotion, title: e.target.value } })}
          />
          <textarea
            className="field-input sm:col-span-2"
            placeholder="Description"
            value={c.promotion.description}
            onChange={(e) => update({ promotion: { ...c.promotion, description: e.target.value } })}
            rows={2}
          />
          <input
            className="field-input sm:col-span-2"
            placeholder="Button URL or anchor, e.g. #contact"
            value={c.promotion.buttonUrl}
            onChange={(e) => update({ promotion: { ...c.promotion, buttonUrl: e.target.value } })}
          />
        </div>
      </SectionShell>

      <SectionShell title="Testimonials" description="Real quotes from real customers — keep them concise.">
        <div className="space-y-3">
          {c.testimonials.map((t, i) => (
            <div key={t.id} className="rounded-lg bg-ink-50/60 p-3 ring-1 ring-ink-100">
              <RepeaterHeader label={`Testimonial ${i + 1}`} onRemove={() => removeTestimonial(t.id)} />
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

      <SectionShell title="FAQs" description="Useful for objections, logistics, policies, deposits, parking, delivery, guarantees, and booking questions.">
        <div className="space-y-3">
          {c.faqs.map((item, i) => (
            <div key={item.id} className="rounded-lg bg-ink-50/60 p-3 ring-1 ring-ink-100">
              <RepeaterHeader label={`FAQ ${i + 1}`} onRemove={() => removeFaq(item.id)} />
              <input
                className="field-input mb-2"
                placeholder="Question"
                value={item.question}
                onChange={(e) => updateFaq(item.id, { question: e.target.value })}
              />
              <textarea
                className="field-input"
                placeholder="Answer"
                value={item.answer}
                onChange={(e) => updateFaq(item.id, { answer: e.target.value })}
                rows={2}
              />
            </div>
          ))}
          <button type="button" className="btn-secondary" onClick={addFaq}>
            + Add FAQ
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

function RepeaterHeader({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <span className="pill">{label}</span>
      <button type="button" className="text-xs text-rose-600 hover:underline" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
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
