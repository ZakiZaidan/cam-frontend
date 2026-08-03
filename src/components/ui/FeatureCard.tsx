import Image from "next/image";

interface FeatureCardProps {
  number?: string;
  eyebrow?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function FeatureCard({
  number = "04.",
  eyebrow = "Skill and Talent Development",
  title = "プロフェッショナル育成のための\n制度と環境の充実",
  description,
  imageSrc,
  imageAlt = "",
}: FeatureCardProps) {
  return (
    <div className="w-full max-w-[420px] rounded-3xl bg-white shadow-2xl block overflow-hidden">
      {/* Image with padding around it */}
      <div className="p-4 pb-0 w-full">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8 pt-6 block">
        {/* Badge + eyebrow */}
        <div className="mb-2 flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
            {number}
          </span>
          <span className="text-base font-medium text-gray-900">
            {eyebrow}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-1.5 whitespace-pre-line text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-tight text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}
