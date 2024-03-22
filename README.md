# barracks scanner
rebuilding this program of mine as a Rust + Typescript webapp

## i'm doing this for several reasons ...
... but mainly, my commander asked me when i could demo it, and i told him to give me 6 weeks, so i need to accelerate development
<br/> <br/>
also this will let me to target different platforms with ease in case the laptop we use at the CQ desk changes
<br/> <br/>
and this is just going to simplify maintenance on the program drastically. i might have started with Windows SDK to learn more about it, but now that i know what a shitshow it is in terms of documentation and tooling, i think i'll start with a more modern approach like this in the future

## demos
<img src="https://github.com/seredomi/barracks-scanner/assets/100106089/2ca2c5b5-5ea3-43af-b8d8-01f9f842ae4e" alt="idle" width="400"/>
<img src="https://github.com/seredomi/barracks-scanner/assets/100106089/08eba6c2-834b-4b8f-9055-a771f72f3033" alt="lost focus" width="400"/>
<img src="https://github.com/seredomi/barracks-scanner/assets/100106089/2b68e1de-6b8b-4c5c-97b6-50b3b92a515c" alt="authorized" width="400"/>
<img src="https://github.com/seredomi/barracks-scanner/assets/100106089/e543f51b-8769-428c-867a-065d7bb4369e" alt="inauthorized" width="400"/>

## tools
- Frontend:
  - Typescript + React + Vite
  - IBM's Carbon Design System
- Backend:
  - Rust + Tauri
  - Sqlite
## roadmap
### general ui
- [x] navigation
- [x] switch to tauri
- [x] custom carbon-like title bar
- [x] program icon
 - [-] fix font issue - fonts render, but webview console error messages persist
 - [ ] replicate normal window shadow
### scanning
- [x] handle scan input
- [x] status
- [x] query database
- [x] return results
  - [x] serialize Person
  - [ ] format results
  - [ ] button to add if not found?
### personnel
- [ ] display all
- [ ] filter / search
- [ ] create
- [ ] edit
- [ ] delete
### scan history
### settings
