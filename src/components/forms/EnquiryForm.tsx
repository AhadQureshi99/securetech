"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowButton } from "@/components/brand/ArrowButton";
import { Pip } from "@/components/brand/Pip";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { EASE } from "@/lib/motion";

export type FieldSpec = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: readonly string[];
  half?: boolean;
};

type Errors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(fields: readonly FieldSpec[], data: FormData): Errors {
  const errors: Errors = {};

  for (const field of fields) {
    const value = String(data.get(field.name) ?? "").trim();

    if (field.required && !value) {
      errors[field.name] = "This field is required.";
      continue;
    }
    if (!value) continue;

    if (field.type === "email" && !EMAIL.test(value)) {
      errors[field.name] = "Enter a valid email address.";
    }
    if (field.type === "tel" && value.replace(/\D/g, "").length < 7) {
      errors[field.name] = "Enter a valid phone number.";
    }
  }

  return errors;
}

/**
 * Validation lives in React state rather than the DOM, so a value pasted or
 * autofilled without an `input` event can never leave a stale red field
 * behind — every submit recomputes the whole error set from scratch.
 *
 * NOTE: no endpoint is wired. Point `onSubmit` at the real handler, or give
 * the <form> an `action`, before going live.
 */
export function EnquiryForm({
  fields,
  submitLabel,
  successTitle,
  successBody,
  note,
}: {
  fields: readonly FieldSpec[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  note?: string;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(fields, data);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setSent(true);
    form.reset();
  }

  return (
    <div>
      <AnimatePresence>
        {sent ? (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE.expo }}
            className="mb-7 flex items-start gap-3.5 rounded-md border border-verify-300 bg-verify-50 p-[clamp(1.25rem,2vw,1.625rem)]"
          >
            <Pip className="mt-2" />
            <div>
              <strong className="mb-1 block font-semibold text-ink-900">
                {successTitle}
              </strong>
              <p className="text-sm text-ink-700">{successBody}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <form onSubmit={handleSubmit} noValidate className="grid gap-[clamp(1rem,1.8vw,1.375rem)]">
        <div className="grid gap-[clamp(1rem,1.8vw,1.375rem)] sm:grid-cols-2">
          {fields
            .filter((f) => f.half)
            .map((field) => (
              <FormControl
                key={field.name}
                field={field}
                error={errors[field.name]}
                onChange={() =>
                  setErrors((prev) => {
                    if (!prev[field.name]) return prev;
                    const next = { ...prev };
                    delete next[field.name];
                    return next;
                  })
                }
              />
            ))}
        </div>

        {fields
          .filter((f) => !f.half)
          .map((field) => (
            <FormControl
              key={field.name}
              field={field}
              error={errors[field.name]}
              onChange={() =>
                setErrors((prev) => {
                  if (!prev[field.name]) return prev;
                  const next = { ...prev };
                  delete next[field.name];
                  return next;
                })
              }
            />
          ))}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <ArrowButton type="submit" disabled={sending} magnetic={false}>
            {sending ? "Sending…" : submitLabel}
          </ArrowButton>
          {note ? <p className="text-[0.8125rem] text-ink-500">{note}</p> : null}
        </div>
      </form>
    </div>
  );
}

function FormControl({
  field,
  error,
  onChange,
}: {
  field: FieldSpec;
  error?: string;
  onChange: () => void;
}) {
  const id = `f-${field.name}`;
  const invalid = Boolean(error);
  const shared = {
    id,
    name: field.name,
    "aria-invalid": invalid,
    "aria-describedby": invalid ? `${id}-error` : undefined,
    onChange,
  };

  return (
    <Field label={field.label} id={id} error={error}>
      {field.type === "textarea" ? (
        <Textarea {...shared} placeholder={field.placeholder} />
      ) : field.type === "select" ? (
        <Select {...shared} defaultValue={field.options?.[0]}>
          {field.options?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Select>
      ) : (
        <Input {...shared} type={field.type ?? "text"} placeholder={field.placeholder} />
      )}
    </Field>
  );
}
