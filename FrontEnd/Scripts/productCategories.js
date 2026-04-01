const PRODUCT_CATEGORY_LABELS = [
  "Acompanhamento",
  "Bebida",
  "Combo",
  "Lanche",
];

const PRODUCT_CATEGORY_IMAGES = {
  Acompanhamento: "../Imgs/images/eachCategory/acompanhamento.jpg",
  Bebida: "../Imgs/images/eachCategory/bebida.jpg",
  Combo: "../Imgs/images/eachCategory/combo.jpg",
  Lanche: "../Imgs/images/eachCategory/lanche.jpg",
};

const PRODUCT_CATEGORY_LOOKUP = new Map(
  PRODUCT_CATEGORY_LABELS.map((label, value) => [
    label.toUpperCase(),
    { label, value },
  ]),
);

function normalizeProductCategory(category) {
  if (category == null || category === "") {
    return "";
  }

  if (typeof category === "number" && PRODUCT_CATEGORY_LABELS[category]) {
    return PRODUCT_CATEGORY_LABELS[category];
  }

  const numericCategory = Number(category);
  if (
    Number.isInteger(numericCategory) &&
    PRODUCT_CATEGORY_LABELS[numericCategory]
  ) {
    return PRODUCT_CATEGORY_LABELS[numericCategory];
  }

  const normalizedCategory = String(category).trim().toUpperCase();
  return PRODUCT_CATEGORY_LOOKUP.get(normalizedCategory)?.label ?? String(category).trim();
}

function serializeProductCategory(category) {
  if (category == null || category === "") {
    return category;
  }

  if (typeof category === "number" && PRODUCT_CATEGORY_LABELS[category]) {
    return category;
  }

  const numericCategory = Number(category);
  if (
    Number.isInteger(numericCategory) &&
    PRODUCT_CATEGORY_LABELS[numericCategory]
  ) {
    return numericCategory;
  }

  const normalizedCategory = String(category).trim().toUpperCase();
  const entry = PRODUCT_CATEGORY_LOOKUP.get(normalizedCategory);
  if (entry) {
    return entry.value;
  }

  throw new Error(`Categoria de produto inválida: ${category}`);
}

function getProductCategoryImage(category, nome = "") {
  const normalizedName = String(nome || "").trim().toLowerCase();
  if (normalizedName === "big sb") return "../Imgs/images/items/bigSB";
  if (normalizedName === "big sb bacon")
    return "../Imgs/images/items/bigSBbacon";
  if (normalizedName === "big sb cheddar")
    return "../Imgs/images/items/bigSBCheddar";
  if (normalizedName === "classic sb")
    return "../Imgs/images/items/cheeseClassic";

  const normalizedCategory = normalizeProductCategory(category);
  return PRODUCT_CATEGORY_IMAGES[normalizedCategory] ?? PRODUCT_CATEGORY_IMAGES.Lanche;
}

export {
  getProductCategoryImage,
  normalizeProductCategory,
  serializeProductCategory,
};
