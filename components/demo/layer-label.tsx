import { cn } from "@/lib/utils";

/** Nhãn đồng bộ cho mỗi layer: số thứ tự + tên kỹ thuật. */
export function LayerLabel({
  index,
  technique,
  className,
}: {
  index: number;
  technique: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-5 flex items-center gap-3", className)}>
      <span className="font-heading text-sm font-bold tracking-[0.35em] text-neon-cyan">
        LỚP {String(index).padStart(2, "0")}
        <span className="text-muted-foreground">/18</span>
      </span>
      <span className="h-px w-10 bg-neon-cyan/40" aria-hidden="true" />
      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {technique}
      </span>
    </div>
  );
}
