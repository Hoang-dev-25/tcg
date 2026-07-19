import { Reveal } from "@/components/landing/reveal";

/** Tiêu đề section đồng bộ: kicker cam gạch + heading navy + mô tả. */
export function SectionHead({
  kicker,
  title,
  sub,
}: {
  kicker?: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="mb-10 grid justify-items-center gap-2.5 text-center">
      {kicker ? (
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brick-500">
          {kicker}
        </span>
      ) : null}
      <h2 className="text-3xl font-bold leading-tight text-brand-900 sm:text-4xl">{title}</h2>
      {sub ? <p className="max-w-2xl text-base text-slate-600 sm:text-lg">{sub}</p> : null}
    </Reveal>
  );
}
