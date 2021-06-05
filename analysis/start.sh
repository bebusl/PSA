#!/bin/bash

dockerize -wait tcp://kafka:9092 -timeout 20s

echo "Start Analysis Worker"

python worker.py