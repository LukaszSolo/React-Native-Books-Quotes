## Learning React Native App 1 - Book Notes reader

**BookReader** is an app that loads specifically json formatted files and displays them in easy to read format.

**Time Spent** 15 hours

## Motivation

The goal was to move my book notes into mobile format plus learn React Native. The json file format is not optimal for generic use but it's based on the format of the notes I have currently.

## Notes

* Goal: do it quick, do it dirty. The client wants to see RN MVP, how quick we can show him something of reasonable quality? Skipped: error handling, testing, polishing UI.

* First two or three hours were spent solving issues between UI libraries and latest (couple of months old) RN. Typical.

* The goal was to use pure React Native plus eventual UI library. At the end I used 2 UI libs and 1 React Navigation util

* There is some monkey patching between UI libs and React Native lib `https://github.com/shoutem/ui/issues/328`

* Bigges grip with RN for such app is that it doesn't allow to easily add dynamic files. Everything has to be `require`d or it won't work

* The code is still ad-hoc mess of learning different plugins, I hope to improve it in 2nd app. Keep it in this format for historical purposes.

* Time consuming tasks: generate assets, install dependencies, sort issues with dependecises

* Things to do differently for next app:
 * only one UI lib
 * Redux
 * sample tests

## License

* Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

Copyright [2017] [Lukasz Soluch]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.