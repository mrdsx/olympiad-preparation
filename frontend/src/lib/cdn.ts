import { CLOUD_NAME } from "./constants";

function getCloudinaryUrl(publicId: string, maxWidth: number) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${maxWidth},c_limit/${publicId}`;
}

export { getCloudinaryUrl };
