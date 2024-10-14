#!/bin/bash
echo "For Backend Press BE, For Frontend Press FE"
read type

if [ $type="FE" ]
then
  echo "The password is correct."
else
  echo "The password is incorrect, try again."
fi