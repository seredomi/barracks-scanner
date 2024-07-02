# barracks scanner
desktop application that allows building security to manage a local database of authorized personnel, scan ID cards, and view scanning history
<br/>
[here](https://youtu.be/LOH57WzeF-o?si=sBYoFxBO9eM3q8WE) is a video demonstrating its capabilities

## tools
### frontend
  - Typescript + React + Vite (fast development, great documentation)
  - IBM's Carbon Design System (looks clean, professional, and modern. also lots of componenets and icons)
### backend
  - Rust + Tauri (secure and performant, target alternate platforms easily if need arises)
  - Sqlite (database is hosted locally)

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
- [x] backend query
- [x] display all
  - [x] fix issue with persistent details button highlights
- [x] search
- [x] create
- [x] edit
  - [x] input validation
  - [x] wait for formalizeData() to finish before saving storing changes
  - [x] date
  - [ ] handle apostrophes
- [x] delete
- [ ] sort?
- [ ] filter?
### scan history
- [x] backend query
- [x] display all
- [x] search
- [x] date range
- [ ] view personnel details from this window
- [ ] sort?
### misc.
- [ ] settings?
  - [ ] change building number
  - [ ] change groups
  - [ ] add ranks
  - [ ] download database file
  - [ ] upload dadtabase file
  - [ ] manual expired personnel purge
- [x] ensure prepare statements in database.rs
- [ ] old entry purging
- [ ] caching for performance?
      
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
