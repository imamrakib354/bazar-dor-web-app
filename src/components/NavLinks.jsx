import Link from "next/link";

const NavLinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories = await res.json();

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="w-full border-y border-gray-200 bg-[#F8FAF9]"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-4 py-3 sm:gap-7 sm:py-4 lg:gap-8">

        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-xs font-medium text-[#1F2937] transition-colors hover:text-[#05893E] sm:text-sm"
          >
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        ))}

      </div>
    </nav>
  );
};

export default NavLinks;
