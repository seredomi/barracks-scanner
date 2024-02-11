# barracks scanner v2
remaking barracks scanner as a webapp
## i'm doing this for several reasons ...
... but mainly, my commander asked me when i could demo it, and i told him to give me 6 weeks, so i need to accelerate development
<br/> <br/>
additionally, this will allow me to target different platforms with ease in case the laptop we use at the CQ desk changes
<br/> <br/>
also this is just going to simplify maintenance on the program drastically. i might have started with Windows SDK to learn more about it, but now that i know what a shitshow it is in terms of documentation and implementation, i think i'll start with a more modern approach like this in the future
## tools
- electron for easy deployment
- react for fast building
- IBM's carbon design system bc good looks
- sqlite since it only needs a local db
## roadmap
- [x] navigation ui
- [x] detect scans
- [ ] query database with scan
- [ ] scan ui
- [ ] pull personnel from db
- [ ] filter / search personnel
- [ ] create new personnel
- [ ] edit personnel
- [ ] pull scan history from db
- [ ] filter / search history
- [ ] settings
