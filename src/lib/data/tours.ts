import type { TourPackage } from "@/lib/types";

export const tourPackages: TourPackage[] = [
  {
    slug: "dumaguete-siquijor",
    status: "available",
    category: "domestic",
    title: "Dumaguete & Siquijor Getaway",
    destinationLabel: "Dumaguete & Siquijor",
    eyebrow: "4 Days • 3 Nights",
    tagline:
      "Escape to the City of Gentle People and the Island of Fire with Calestia Travel & Tours.",
    price: 13500,
    priceUnit: "per person",
    paxRange: "10–13 Pax",
    departure: "Manila",
    duration: "4 Days • 3 Nights",
    quickInfo: [
      { label: "Destination", value: "Dumaguete & Siquijor", icon: "map-pin" },
      { label: "Duration", value: "4 Days • 3 Nights", icon: "clock" },
      { label: "Group Size", value: "10–13 Guests", icon: "users" },
      { label: "Departure", value: "Manila", icon: "plane" },
    ],
    highlights: [
      "Roundtrip Airfare Included",
      "Private Air-conditioned Van",
      "Roundtrip Fast Ferry",
      "Forest Camp",
      "Pulangbato Falls",
      "Cambugahay Falls",
      "Paliton Beach",
      "Salagdoong Beach",
      "Secret Beach",
      "Kawayan Holiday Resort",
      "Pitogo Cliff",
      "Dumaguete City Tour",
    ],
    overview:
      "Calestia's Dumaguete & Siquijor Getaway pairs the laid-back charm of the City of Gentle People with the mystical island trails of Siquijor. Over four days you'll wander waterfalls, ride the fast ferry between provinces, and unwind on some of the Visayas' quietest beaches — all handled by a dedicated tour coordinator from arrival to send-off.",
    itinerary: [
      {
        day: 1,
        title: "Dumaguete",
        subtitle: "Arrival & City Introduction",
        activities: [
          "Arrival at Dumaguete Airport",
          "Forest Camp",
          "Monkey Feeding",
          "Mango Ranch",
          "Dumaguete Boulevard",
          "Dinner at Sans Rival",
          "Overnight at Flying Fish Boutique Hostel",
        ],
      },
      {
        day: 2,
        title: "Dumaguete → Siquijor",
        subtitle: "Falls, Ferry & the Island of Fire",
        activities: [
          "Sulfur Vents",
          "Pulangbato Falls",
          "Ferry to Siquijor",
          "Cambugahay Falls",
          "Pitogo Cliff",
          "Overnight in San Juan",
        ],
      },
      {
        day: 3,
        title: "Siquijor Adventure",
        subtitle: "Beaches & Free Time",
        activities: [
          "Kawayan Holiday Resort",
          "Salagdoong Beach",
          "Secret Beach",
          "Free Time",
          "Dinner in San Juan",
        ],
      },
      {
        day: 4,
        title: "Island Exploration",
        subtitle: "Heritage Sites & Send-off",
        activities: [
          "Paliton Beach",
          "Lazi Church & Convent",
          "Old Enchanted Balete Tree",
          "Sambulawan Underground River",
          "Ferry back to Dumaguete",
          "Dinner at Lantaw",
          "Pasalubong at Sans Rival",
          "Flight back to Manila",
        ],
      },
    ],
    inclusions: [
      "Roundtrip Airfare",
      "Hotel Accommodation",
      "Roundtrip Ferry",
      "Private Van Rental",
      "Driver & Fuel",
      "Entrance Fees",
      "Tour Coordinator",
    ],
    exclusions: [
      "Meals",
      "Personal Expenses",
      "Optional Activities (ATV, Rentals, etc.)",
      "Tips & Gratuities",
    ],
    gallery: [
      { slug: "forest-camp", label: "Forest Camp" },
      { slug: "mango-ranch", label: "Mango Ranch" },
      { slug: "pulangbato-falls", label: "Pulangbato Falls" },
      { slug: "dumaguete-boulevard", label: "Dumaguete Boulevard" },
      { slug: "sans-rival", label: "Sans Rival" },
      { slug: "cambugahay-falls", label: "Cambugahay Falls" },
      { slug: "kawayan-holiday-resort", label: "Kawayan Holiday Resort" },
      { slug: "salagdoong-beach", label: "Salagdoong Beach" },
      { slug: "secret-beach", label: "Secret Beach" },
      { slug: "paliton-beach", label: "Paliton Beach" },
      { slug: "pitogo-cliff", label: "Pitogo Cliff" },
      { slug: "lazi-church", label: "Lazi Church" },
      { slug: "balete-tree", label: "Balete Tree" },
      { slug: "sambulawan-cave", label: "Sambulawan Cave" },
    ],
    faqs: [
      {
        question: "Is airfare included?",
        answer:
          "Yes — roundtrip airfare from Manila is included in the ₱13,500 package price.",
      },
      {
        question: "What meals are included?",
        answer:
          "Meals are not included, so you're free to explore Dumaguete and Siquijor's local food spots at your own pace. Your tour coordinator is happy to recommend great places along the way.",
      },
      {
        question: "What should I bring?",
        answer:
          "Comfortable clothing, swimwear, sunscreen, a reusable water bottle, and cash for meals and personal expenses. A dry bag is handy for the waterfalls and island stops.",
      },
      {
        question: "Is this beginner-friendly?",
        answer:
          "Yes. The itinerary is paced for travelers of all experience levels, with a comfortable mix of sightseeing and light outdoor activity.",
      },
      {
        question: "Are entrance fees included?",
        answer:
          "Yes, entrance fees for the destinations listed in the itinerary are included in your package.",
      },
      {
        question: "Can I pay in installments?",
        answer:
          "Flexible payment terms may be available for group bookings — message our team directly to discuss a payment plan before confirming your slot.",
      },
    ],
  },
  {
    slug: "bohol",
    status: "coming-soon",
    category: "domestic",
    title: "Bohol Countryside & Island Escape",
    destinationLabel: "Bohol",
    eyebrow: "Coming Soon",
    tagline:
      "Chocolate Hills, tarsiers, and island-hopping — Calestia's Bohol itinerary is currently being finalized.",
    price: 0,
    priceUnit: "per person",
    paxRange: "TBA",
    departure: "Manila",
    duration: "TBA",
    quickInfo: [
      { label: "Destination", value: "Bohol", icon: "map-pin" },
      { label: "Duration", value: "Coming Soon", icon: "clock" },
      { label: "Group Size", value: "TBA", icon: "users" },
      { label: "Departure", value: "Manila", icon: "plane" },
    ],
    highlights: [],
    overview:
      "We're putting together a full Bohol itinerary — Chocolate Hills, the tarsier sanctuary, Loboc River, and island-hopping around Panglao. Reach out and we'll notify you as soon as it's ready to book.",
    itinerary: [],
    inclusions: [],
    exclusions: [],
    gallery: [],
    faqs: [],
  },
  {
    slug: "cebu",
    status: "coming-soon",
    category: "domestic",
    title: "Cebu Island Adventure",
    destinationLabel: "Cebu",
    eyebrow: "Coming Soon",
    tagline:
      "Waterfalls, whale sharks, and heritage sites — Calestia's Cebu itinerary is currently being finalized.",
    price: 0,
    priceUnit: "per person",
    paxRange: "TBA",
    departure: "Manila",
    duration: "TBA",
    quickInfo: [
      { label: "Destination", value: "Cebu", icon: "map-pin" },
      { label: "Duration", value: "Coming Soon", icon: "clock" },
      { label: "Group Size", value: "TBA", icon: "users" },
      { label: "Departure", value: "Manila", icon: "plane" },
    ],
    highlights: [],
    overview:
      "We're finalizing a full Cebu itinerary covering Kawasan Falls, Oslob, Moalboal, and the historic sites of Cebu City. Reach out and we'll notify you as soon as it's ready to book.",
    itinerary: [],
    inclusions: [],
    exclusions: [],
    gallery: [],
    faqs: [],
  },
];

export function getTourBySlug(slug: string) {
  return tourPackages.find((tour) => tour.slug === slug);
}

export function getAvailableTours() {
  return tourPackages.filter((tour) => tour.status === "available");
}
