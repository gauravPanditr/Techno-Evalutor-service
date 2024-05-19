import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utilis/constants";

export default function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
  let offset = 0;
  const output: DockerStreamOutput = { stdout: " ", stderr: " " };

  while (offset < buffer.length) {
    const typesOfStream = buffer[offset];
    offset += DOCKER_STREAM_HEADER_SIZE;
    const length = buffer.readUInt32BE(offset + 4);

    if (typesOfStream == 1) {
      output.stdout += buffer.toString("utf-8", offset, offset + length);
    } else if (typesOfStream == 2) {
      output.stdout += buffer.toString("utf-8", offset, offset + length);
    }
    
    offset += length;
  }

  return output;
}
