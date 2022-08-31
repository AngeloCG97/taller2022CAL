#!/usr/bin/env sh
set -e
docker build -t contract-builder:latest -f docker/builder.Dockerfile .
docker run \
    --rm \
    --mount type=bind,src="$PWD/voting",target=/workspace \
    --workdir /workspace \
    contract-builder:latest bash -c "
        mkdir -p build \
          && cd build \
          && cmake .. \
          && make -j $(nproc)
"
