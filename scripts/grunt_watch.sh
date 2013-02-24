#!/bin/bash

# does grunt watch outputs to gruntlog.txt and any abort/error/done to notify

grunt watch | tee gruntlog.txt | grep "Aborted\|ERROR\|Done" | while read LINE; do notify-send "$LINE"; done