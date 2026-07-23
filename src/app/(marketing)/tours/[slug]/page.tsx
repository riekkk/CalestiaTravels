import type { Metadata } from "next";
import { adminGetTourPackageBySlug } from "@/lib/admin-tour-lookup";
import { TourDetailClient } from "@/components/tours/tour-detail-client";
import { tourHeroImage } from "@/lib/tour-utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = await adminGetTourPackageBySlug(slug);
  if (!tour) return { title: "Tour Package" };
  const description = tour.tagline || `${tour.title}, a Calestia Travel and Tours package.`;
  const heroImage = tourHeroImage(tour) ?? "/images/logo.png";
  return {
    title: tour.title,
    description,
    alternates: { canonical: `/tours/${slug}` },
    openGraph: { title: tour.title, description, images: [{ url: heroImage }] },
    twitter: { title: tour.title, description, images: [heroImage] },
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  return <TourDetailClient slug={slug} />;
}
