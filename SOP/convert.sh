#!/bin/sh

# Give error if finished folder already exists else make it.

if [ -d "finished" ]; then
	echo "Error : The folder exists already. Are you sure what you are doing ?"
else
	mkdir finished
fi

for filename in $(pwd)/*
do
	ffmpeg2theora -v 6 -a 5 $filename && mv $filename finished/ > /dev/null &
done;
