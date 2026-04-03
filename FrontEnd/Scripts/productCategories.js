import {
  PRODUCT_CATEGORY_OPTIONS,
  getEnumByValue,
  normalizeEnumValue,
} from './enumMappings.js';

function normalizeProductCategory(category) {
  return (
    getEnumByValue(PRODUCT_CATEGORY_OPTIONS, category)?.getDescription() ?? ''
  );
}

function serializeProductCategory(category) {
  const value = normalizeEnumValue(category, PRODUCT_CATEGORY_OPTIONS);
  if (typeof value === 'number') {
    return value;
  }

  if (category == null || category === '') {
    return category;
  }

  throw new Error(`Categoria de produto inválida: ${category}`);
}

function getProductCategoryImage(category, nome = '') {
  const normalizedName = String(nome || '')
    .trim()
    .toLowerCase();
  if (normalizedName === 'big sb') return '../Imgs/images/items/bigSB.png';
  if (normalizedName === 'big sb bacon')
    return '../Imgs/images/items/bigSBbacon.png';
  if (normalizedName === 'big sb cheddar')
    return '../Imgs/images/items/bigSBCheddar.png';
  if (normalizedName === 'classic sb')
    return '../Imgs/images/items/cheeseClassic.png';

  return (
    getEnumByValue(PRODUCT_CATEGORY_OPTIONS, category)?.getImage() ??
    PRODUCT_CATEGORY_OPTIONS[3].getImage()
  );
}

export {
  PRODUCT_CATEGORY_OPTIONS,
  getProductCategoryImage,
  normalizeProductCategory,
  serializeProductCategory,
};
