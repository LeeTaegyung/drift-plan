import { uploadImage } from '@/entities/image/api/image.api';

export const uploadScheduleImage = async (
  file: File,
  userId: string,
  tripId: string
) => {
  const fileExtension = file.name.split('.').pop() || 'webp';
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
  const filePath = `${userId}/${tripId}/${fileName}`;

  return await uploadImage({ file, filePath });
};
