import * as path from 'path';

export const getVideoPath = (videoName: string) => {
  const videoLocation = path.join(__dirname, '/../../sample-video', videoName);
  return videoLocation;
};
