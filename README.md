# barracks scanner v2
![demo](https://github.com/seredomi/barracks-scanner/assets/100106089/4e9a5150-616c-4a47-b062-a8ae44f5fcaa)

## i'm doing this for several reasons ...
... but mainly, my commander asked me when i could demo it, and i told him to give me 6 weeks, so i need to accelerate development
<br/> <br/>
also this will let me to target different platforms with ease in case the laptop we use at the CQ desk changes
<br/> <br/>
and this is just going to simplify maintenance on the program drastically. i might have started with Windows SDK to learn more about it, but now that i know what a shitshow it is in terms of documentation and tooling, i think i'll start with a more modern approach like this in the future
## tools
- tauri 
- react for - IBM's carbon design system bc good looks
- sqlite since it only needs a local db
## roadmap
- [ ] ui
  - [x] navigation
  - [x] switch to tauri
  - [ ] custom carbon-like title bar
  - [ ] program icon
- [ ] scanning
  - [x] handle scan input
  - [ ] status
  - [ ] query database
  - [ ] return results
- [ ] personnel
  - [ ] display all
  - [ ] filter / search
  - [ ] create
  - [ ] edit
  - [ ] delete
- [ ] scan history
- [ ] settings
