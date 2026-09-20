'use client';

import { FormEvent, useEffect, useState } from 'react';

type Investment = {
  id: string;
  name: string;
  fullName: string | null;
  slug: string;
  tagline: string | null;
  bio: string | null;
  location: string | null;
  status: string;
  isFeatured: boolean;
  isTrending: boolean;
  customEmail: string | null;
  customWhatsapp: string | null;
  customWebsite: string | null;
  updatedAt: string;
  media?: Array<{
    id: string;
    url: string;
    isPrimary: boolean;
    sortOrder: number;
  }>;
};

type FormData = {
  name: string;
  fullName: string;
  slug: string;
  tagline: string;
  bio: string;
  location: string;
  status: 'DRAFT' | 'PUBLISHED';
  isFeatured: boolean;
  isTrending: boolean;
  customEmail: string;
  customWhatsapp: string;
  customWebsite: string;
};

const emptyForm: FormData = {
  name: '',
  fullName: '',
  slug: '',
  tagline: '',
  bio: '',
  location: '',
  status: 'DRAFT',
  isFeatured: false,
  isTrending: false,
  customEmail: '',
  customWhatsapp: '',
  customWebsite: '',
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function InvestmentManager() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function loadInvestments() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/investment', {
        method: 'GET',
        cache: 'no-store',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load investments.');
      }

      setInvestments(Array.isArray(data.investments) ? data.investments : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load investments.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInvestments();
  }, []);

  function updateField<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function startEdit(investment: Investment) {
    setEditingId(investment.id);

    setForm({
      name: investment.name || '',
      fullName: investment.fullName || '',
      slug: investment.slug || '',
      tagline: investment.tagline || '',
      bio: investment.bio || '',
      location: investment.location || '',
      status:
        investment.status === 'PUBLISHED'
          ? 'PUBLISHED'
          : 'DRAFT',
      isFeatured: investment.isFeatured,
      isTrending: investment.isTrending,
      customEmail: investment.customEmail || '',
      customWhatsapp: investment.customWhatsapp || '',
      customWebsite: investment.customWebsite || '',
    });

    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
    setSuccess('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError('');
    setSuccess('');

    const name = form.name.trim();
    const slug = slugify(form.slug.trim() || name);

    if (!name) {
      setError('Investment name is required.');
      setSaving(false);
      return;
    }

    if (!slug) {
      setError('A valid investment slug is required.');
      setSaving(false);
      return;
    }

    try {
      if (editingId) {
        const response = await fetch(
          `/api/admin/investment/${editingId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              fullName: form.fullName.trim() || null,
              tagline: form.tagline.trim() || null,
              bio: form.bio.trim() || null,
              location: form.location.trim() || null,
              status: form.status,
              isFeatured: form.isFeatured,
              isTrending: form.isTrending,
              customEmail: form.customEmail.trim() || null,
              customWhatsapp: form.customWhatsapp.trim() || null,
              customWebsite: form.customWebsite.trim() || null,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || 'Failed to update investment.'
          );
        }

        setSuccess('Investment updated successfully.');
      } else {
        const response = await fetch('/api/admin/investment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            slug,
            status: form.status,
            bio: form.bio.trim() || null,
            location: form.location.trim() || null,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || 'Failed to create investment.'
          );
        }

        setSuccess('Investment created successfully.');
      }

      setEditingId(null);
      setForm(emptyForm);
      await loadInvestments();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong.'
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(investment: Investment) {
    setError('');
    setSuccess('');

    const nextStatus =
      investment.status === 'PUBLISHED'
        ? 'DRAFT'
        : 'PUBLISHED';

    try {
      const response = await fetch(
        `/api/admin/investment/${investment.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to change investment status.'
        );
      }

      setSuccess(
        nextStatus === 'PUBLISHED'
          ? 'Investment published.'
          : 'Investment moved to draft.'
      );

      await loadInvestments();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to change investment status.'
      );
    }
  }

  async function archiveInvestment(investment: Investment) {
    const confirmed = window.confirm(
      `Archive "${investment.name}"? This will remove it from the active investment list.`
    );

    if (!confirmed) return;

    setDeletingId(investment.id);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `/api/admin/investment/${investment.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        let message = 'Failed to archive investment.';

        try {
          const data = await response.json();
          message = data.error || message;
        } catch {
          // Response may be empty for a successful DELETE.
        }

        throw new Error(message);
      }

      if (editingId === investment.id) {
        setEditingId(null);
        setForm(emptyForm);
      }

      setSuccess('Investment archived successfully.');
      await loadInvestments();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to archive investment.'
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {editingId
                ? 'Edit investment'
                : 'Create investment'}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {editingId
                ? 'Update the investment profile and publication settings.'
                : 'Add a new investment profile to your platform.'}
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel editing
            </button>
          )}
        </div>

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="investment-name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Investment name *
              </label>

              <input
                id="investment-name"
                type="text"
                value={form.name}
                onChange={(event) => {
                  const value = event.target.value;

                  setForm((current) => ({
                    ...current,
                    name: value,
                    slug:
                      editingId || current.slug
                        ? current.slug
                        : slugify(value),
                  }));
                }}
                placeholder="e.g. Green Energy Fund"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label
                htmlFor="investment-full-name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full name
              </label>

              <input
                id="investment-full-name"
                type="text"
                value={form.fullName}
                onChange={(event) =>
                  updateField('fullName', event.target.value)
                }
                placeholder="Legal or expanded investment name"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label
                htmlFor="investment-slug"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Slug
              </label>

              <input
                id="investment-slug"
                type="text"
                value={form.slug}
                onChange={(event) =>
                  updateField(
                    'slug',
                    slugify(event.target.value)
                  )
                }
                placeholder="green-energy-fund"
                disabled={Boolean(editingId)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100 disabled:text-slate-500"
              />

              {editingId && (
                <p className="mt-1 text-xs text-slate-500">
                  Slugs cannot be changed while editing.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="investment-location"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Location
              </label>

              <input
                id="investment-location"
                type="text"
                value={form.location}
                onChange={(event) =>
                  updateField(
                    'location',
                    event.target.value
                  )
                }
                placeholder="e.g. Nairobi, Kenya"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="investment-tagline"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Tagline
            </label>

            <input
              id="investment-tagline"
              type="text"
              value={form.tagline}
              onChange={(event) =>
                updateField(
                  'tagline',
                  event.target.value
                )
              }
              placeholder="Short description displayed with the investment"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="investment-bio"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description
            </label>

            <textarea
              id="investment-bio"
              value={form.bio}
              onChange={(event) =>
                updateField('bio', event.target.value)
              }
              placeholder="Describe the investment opportunity..."
              rows={6}
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label
                htmlFor="investment-status"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Status
              </label>

              <select
                id="investment-status"
                value={form.status}
                onChange={(event) =>
                  updateField(
                    'status',
                    event.target.value as
                      | 'DRAFT'
                      | 'PUBLISHED'
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">
                  Published
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="investment-email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Contact email
              </label>

              <input
                id="investment-email"
                type="email"
                value={form.customEmail}
                onChange={(event) =>
                  updateField(
                    'customEmail',
                    event.target.value
                  )
                }
                placeholder="contact@example.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label
                htmlFor="investment-whatsapp"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                WhatsApp
              </label>

              <input
                id="investment-whatsapp"
                type="text"
                value={form.customWhatsapp}
                onChange={(event) =>
                  updateField(
                    'customWhatsapp',
                    event.target.value
                  )
                }
                placeholder="+254..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="investment-website"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Website
            </label>

            <input
              id="investment-website"
              type="url"
              value={form.customWebsite}
              onChange={(event) =>
                updateField(
                  'customWebsite',
                  event.target.value
                )
              }
              placeholder="https://example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(event) =>
                  updateField(
                    'isFeatured',
                    event.target.checked
                  )
                }
                className="h-4 w-4 rounded border-slate-300"
              />

              <span className="text-sm font-semibold text-slate-700">
                Featured investment
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={form.isTrending}
                onChange={(event) =>
                  updateField(
                    'isTrending',
                    event.target.checked
                  )
                }
                className="h-4 w-4 rounded border-slate-300"
              />

              <span className="text-sm font-semibold text-slate-700">
                Trending investment
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? 'Saving...'
                : editingId
                  ? 'Save changes'
                  : 'Create investment'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                disabled={saving}
                className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Investments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage existing investment profiles.
            </p>
          </div>

          <button
            type="button"
            onClick={startCreate}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            + New investment
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-slate-500">
            Loading investments...
          </div>
        ) : investments.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 px-6 py-12 text-center">
            <p className="font-semibold text-slate-700">
              No investments found.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Create your first investment using the form above.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <div className="divide-y divide-slate-200">
              {investments.map((investment) => (
                <article
                  key={investment.id}
                  className="p-5 transition hover:bg-slate-50"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-lg font-bold text-slate-900">
                          {investment.name}
                        </h3>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                            investment.status ===
                            'PUBLISHED'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {investment.status}
                        </span>

                        {investment.isFeatured && (
                          <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                            Featured
                          </span>
                        )}

                        {investment.isTrending && (
                          <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-bold text-purple-700">
                            Trending
                          </span>
                        )}
                      </div>

                      {investment.tagline && (
                        <p className="mt-1 text-sm text-slate-600">
                          {investment.tagline}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500">
                        <span>
                          Slug: {investment.slug}
                        </span>

                        {investment.location && (
                          <span>
                            Location:{' '}
                            {investment.location}
                          </span>
                        )}

                        <span>
                          Updated:{' '}
                          {new Date(
                            investment.updatedAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          startEdit(investment)
                        }
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          toggleStatus(investment)
                        }
                        className="rounded-lg border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                      >
                        {investment.status ===
                        'PUBLISHED'
                          ? 'Unpublish'
                          : 'Publish'}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          archiveInvestment(
                            investment
                          )
                        }
                        disabled={
                          deletingId ===
                          investment.id
                        }
                        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === investment.id
                          ? 'Archiving...'
                          : 'Archive'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}