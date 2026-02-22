const CLOUDINARY_CONFIG = {
    cloudName: 'djog7dxrl',
    uploadPreset: 'lecetuug',
};

/**
 * Generates an optimized Cloudinary URL for an image.
 * @param {string} publicId - The public ID of the image in Cloudinary.
 * @param {Object} options - Transformation options.
 * @returns {string} - The optimized image URL.
 */
function getCloudinaryUrl(publicId, options = {}) {
    const { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = options;

    let transformations = `f_${format},q_${quality}`;
    if (width) transformations += `,w_${width}`;
    if (height) transformations += `,h_${height}`;
    if (crop) transformations += `,c_${crop}`;

    return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transformations}/${publicId}`;
}

// Export if using modules, otherwise it's global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLOUDINARY_CONFIG, getCloudinaryUrl };
}
