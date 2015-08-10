#!/bin/bash

aws s3 sync js s3://me.avp42.com/gameoflife/js
aws s3 cp index.html s3://me.avp42.com/gameoflife/
