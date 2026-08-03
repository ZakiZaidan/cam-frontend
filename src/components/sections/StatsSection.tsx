"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
      {count}
      <span className="text-red-600">{suffix}</span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="container-cam">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <Card
              key={stat.label}
              className="text-center border-slate-200 bg-white shadow-xs rounded-2xl p-2"
            >
              <CardContent className="p-6">
                <span className="text-[10px] font-mono font-extrabold text-red-600 uppercase tracking-widest block mb-2">
                  METRIC 0{i + 1}
                </span>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-xs text-slate-600 font-bold uppercase tracking-wider">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
