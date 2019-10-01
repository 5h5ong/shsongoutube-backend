import * as fs from 'fs';
import * as path from 'path';

export const getVideo = (videoName: string) => {
  const videoLocation = path.join(__dirname, '/../../sample-video', videoName);
  return videoLocation;
  const videoBuffer = fs.readFileSync(videoLocation);
  // change arraybuffer -> For use in Blob
  const videoArraybuffer = Uint8Array.from(videoBuffer).buffer;
  return videoArraybuffer;
};
