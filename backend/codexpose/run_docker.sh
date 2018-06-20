#!/bin/sh

IMAGE_NAME="compile_code"
OUTPUT_FILE="display_output.txt"
FILE="file_handle.py"
sudo docker build -t $IMAGE_NAME .
sudo docker run --rm compile_code python /src/$FILE > $OUTPUT_FILE
sudo docker rmi -f $(sudo docker images $IMAGE_NAME -q)

if [ $? -eq 0 ]; then
    echo "Docker execution success"
else
    echo "Docker execution failed"
fi