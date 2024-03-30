# barracks scanner
rebuilding this program of mine as a webapp

## i'm doing this for several reasons ...
... but mainly, my commander asked me when i could demo it, and i told him to give me 6 weeks, so i need to accelerate development
<br/> <br/>
also this will let me to target different platforms with ease in case the laptop we use at the CQ desk changes
<br/> <br/>
and this is just going to simplify maintenance on the program drastically. i might have started with Windows SDK to learn more about it, but now that i know what a shitshow it is in terms of documentation and tooling, i think i'll start with a more modern approach like this in the future

## tools
- frontend:
  - Typescript + React + Vite
  - IBM's Carbon Design System
- backend:
  - Rust + Tauri
  - Sqlite

## demos
<img src="https://github.com/seredomi/barracks-scanner/assets/100106089/2ca2c5b5-5ea3-43af-b8d8-01f9f842ae4e" alt="idle" width="400"/>
<img src="https://github.com/seredomi/barracks-scanner/assets/100106089/08eba6c2-834b-4b8f-9055-a771f72f3033" alt="lost focus" width="400"/>
<img src="https://github.com/seredomi/barracks-scanner/assets/100106089/2b68e1de-6b8b-4c5c-97b6-50b3b92a515c" alt="authorized" width="400"/>
<img src="https://github.com/seredomi/barracks-scanner/assets/100106089/e543f51b-8769-428c-867a-065d7bb4369e" alt="inauthorized" width="400"/>

## roadmap
### general ui
- [x] navigation
- [x] switch to tauri
- [x] custom carbon-like title bar
- [x] program icon
 - [x] fix font issue
 - [ ] replicate normal window shadow
### scanning
- [x] handle scan input
- [x] status
- [x] query database
- [x] return results
  - [x] serialize Person
  - [ ] format results better (diff component needed?)
  - [ ] button to add if not found?
### personnel
- [x] display all
  - [x] fix issue with persistent details button highlights
- [x] search
- [ ] create
- [x] edit
  - [x] input validation
  - [ ] wait for formalizeData() to finish before saving storing changes
  - [ ] date
- [ ] delete
- [ ] sort?
- [ ] filter?
### scan history
### settings
## other notes
### sqlite file
i manually moved a copy of `barracks.db` to the build directory `./src-tauri/target/release/` <br/>
however, I'm sure this could be remedied by a premake script or implementation of a variable database filepath <br/>
the schema i used is:
```
CREATE TABLE logs (id TEXT, date DATE, time TIME);
CREATE TABLE personnel(
  id TEXT PRIMARY KEY,
  rank TEXT CHECK(rank IN('PVT','PV2','PFC','SPC','CPL','SGT','SSG','SFC','MSG','1SG','SGM','CSM','SMA','WO1','CW2','CW3','CW4','CW5','1LT','2LT','CPT','MAJ','LTC','COL','BG','MG','LTG','GEN','GA','CTR','CIV','')),
  lastName TEXT,
  firstName TEXT,
  room TEXT,
  groupName TEXT CHECK(groupName IN('Resident','Rotational Unit','COC','Guest','Hotel Divarty')),
  leaveDate DATE);
```
