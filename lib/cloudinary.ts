export const CLOUDINARY_CONFIG = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'djog7dxrl',
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'lecetuug',
};

export function getCloudinaryUrl(publicId: string, options: any = {}) {
    const { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = options;

    let transformations = `f_${format},q_${quality}`;
    if (width) transformations += `,w_${width}`;
    if (height) transformations += `,h_${height}`;
    if (crop) transformations += `,c_${crop}`;

    return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transformations}/${publicId}`;
}
