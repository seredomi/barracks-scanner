# barracks scanner
![demo](https://github.com/seredomi/barracks-scanner/assets/100106089/4e9a5150-616c-4a47-b062-a8ae44f5fcaa)
<br /> <br />
rebuilding this program of mine as a webapp

## i'm doing this for several reasons ...
... but mainly, my commander asked me when i could demo it, and i told him to give me 6 weeks, so i need to accelerate development
<br/> <br/>
also this will let me to target different platforms with ease in case the laptop we use at the CQ desk changes
<br/> <br/>
and this is just going to simplify maintenance on the program drastically. i might have started with Windows SDK to learn more about it, but now that i know what a shitshow it is in terms of documentation and tooling, i think i'll start with a more modern approach like this in the future
## tools
- Frontend:
  - Typescript + React + Vite
  - IBM's Carbon Design System
- Backend:
  - Rust + Tauri
  - Sqlite
## roadmap
- [ ] general ui
  - [x] navigation
  - [x] switch to tauri
  - [x] custom carbon-like title bar
  - [x] program icon
  - [ ] replicate normal window shadow
- [ ] scanning
  - [x] handle scan input
  - [x] status
  - [x] query database
  - [x] return results
    - [ ] serialize Person
    - [ ] format results
    - [ ] button to add if not found?
- [ ] personnel
  - [ ] display all
  - [ ] filter / search
  - [ ] create
  - [ ] edit
  - [ ] delete
- [ ] scan history
- [ ] settings
