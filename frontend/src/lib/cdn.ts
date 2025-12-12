import { CLOUD_NAME } from "./constants";

function getCDNImageURL(publicId: string, maxWidth: number) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${maxWidth},c_limit/${publicId}`;
}

export { getCDNImageURL };
