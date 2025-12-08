import { CLOUD_NAME } from "./constants";

function getCDNUrl(publicId: string, maxWidth: number) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${maxWidth},c_limit/${publicId}`;
}

export { getCDNUrl };
