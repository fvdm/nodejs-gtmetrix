### 1.3.0 (2018-03-06)

##### Documentation Changes

* **readme:**
  *  Add output examples ([a6f65647](https://github.com/fvdm/nodejs-gtmetrix/commit/a6f656472070c3dc21d340d7c2f3478b27cd9bf1))
  *  Callback arg is no longer required ([b20aa309](https://github.com/fvdm/nodejs-gtmetrix/commit/b20aa30925fa0ec0c8f6c9cdb4e94a73f32516bb))
  *  Minor edits ([0a1af5f0](https://github.com/fvdm/nodejs-gtmetrix/commit/0a1af5f0586398a39c800602f2f7567e77ae4a0c))
  *  Better parsable syntax ([3ace947d](https://github.com/fvdm/nodejs-gtmetrix/commit/3ace947d10aead442b25c09da0f37ef01fa98248))
  *  Removed result from example ([6e858c13](https://github.com/fvdm/nodejs-gtmetrix/commit/6e858c13ea5939d540bd3a0b7462e2b003d23f3f))
  *  Full code example ([545b7021](https://github.com/fvdm/nodejs-gtmetrix/commit/545b7021f86c7f9173a75af77414e252b6339b6d))

##### New Features

* **interface:**  Promisified all methods ([54a74b59](https://github.com/fvdm/nodejs-gtmetrix/commit/54a74b59052c514dbf4b008f1eefae2f2ac8e1f3))

##### Refactors

* **interface:**  Switched to es6-promisify ([4dfae869](https://github.com/fvdm/nodejs-gtmetrix/commit/4dfae869d147977959cbd3690529fa3ba6c58b1c))
* **package:**  Minimum node version 8.0.0 ([ad64bb9a](https://github.com/fvdm/nodejs-gtmetrix/commit/ad64bb9a6744d9b4447096678628cf2a7ac2881d))

##### Code Style Changes

* **syntax:**  Only set doRequest of httpreq ([f24606f6](https://github.com/fvdm/nodejs-gtmetrix/commit/f24606f64ba1d954ca6115e66a463394d130e4b3))

#### 1.2.7 (2018-03-02)

##### Bug Fixes

* **config:**  parseInt timeout and defaults ([db336a14](https://github.com/fvdm/nodejs-gtmetrix/commit/db336a142f4b582da931f45fb5f96ab6346138b0))

#### 1.2.6 (2018-03-01)

##### Documentation Changes

* **badges:**  Moved Greenkeeper to the badges ([e07b9f99](https://github.com/fvdm/nodejs-gtmetrix/commit/e07b9f99dfae648f47e1d10337e104572b88de4d))

##### Bug Fixes

* **account:**  Account.status typo ([30619c8a](https://github.com/fvdm/nodejs-gtmetrix/commit/30619c8ac3e48b232fa4971c76c05e5c16704bfb))
* **response:**  Missing references ([0930b8a8](https://github.com/fvdm/nodejs-gtmetrix/commit/0930b8a8aeb739bdd9e3bc7d961b62906904c046))
* **pollingCallback:**
  *  Stop polling when error ([af3ccb0d](https://github.com/fvdm/nodejs-gtmetrix/commit/af3ccb0d12a01d063a2633ad6acfc8149ecbcc37))
  *  Syntax typo ([bc1434c6](https://github.com/fvdm/nodejs-gtmetrix/commit/bc1434c627b5a971ba7fc034db29679c6b2f987c))
  *  Enforce type string on error ([#14](https://github.com/fvdm/nodejs-gtmetrix/pull/14)) ([678bd227](https://github.com/fvdm/nodejs-gtmetrix/commit/678bd227ae7aefa82ac76bc86f27b12098417083))
* **polling:**  Check err.error before match ([#14](https://github.com/fvdm/nodejs-gtmetrix/pull/14)) ([6fe16d0c](https://github.com/fvdm/nodejs-gtmetrix/commit/6fe16d0ca13b6f110a98862361f32b1d66f5eb59))

##### Refactors

* **main:**  Cleaner interface statements ([91e06140](https://github.com/fvdm/nodejs-gtmetrix/commit/91e06140373d590524c15db0425a3f093055afdb))
* **testGet:**  Reduced complexity ([6e1b2738](https://github.com/fvdm/nodejs-gtmetrix/commit/6e1b2738a268ba94d4788cfbb3c4a8f4b262de84))
* **pollingCallback:**
  *  Reduced complexity ([c4bf94b2](https://github.com/fvdm/nodejs-gtmetrix/commit/c4bf94b22ab8b7408e6216c2264d341863d10a70))
  *  Rewrite response handling ([ad2bc570](https://github.com/fvdm/nodejs-gtmetrix/commit/ad2bc570297387a91f5dcb0dc049641483fca979))
  *  Clean up redundancy ([9de29973](https://github.com/fvdm/nodejs-gtmetrix/commit/9de29973915b9e1fb30ca76ad335f1022628115e))

##### Tests

* **main:**
  *  Fixed bad ref ([bafaf5c2](https://github.com/fvdm/nodejs-gtmetrix/commit/bafaf5c250a1c1c47df630628096dc449d589e65))
  *  Fixed bad test var ([00059abe](https://github.com/fvdm/nodejs-gtmetrix/commit/00059abe91be356b0089035d06c2ada31dc57214))
  *  Add Interface test ([34209410](https://github.com/fvdm/nodejs-gtmetrix/commit/342094104466db7984343f3a2aef724c3ff141a2))
* **package:**  Change dev deps to dotest ([cd347553](https://github.com/fvdm/nodejs-gtmetrix/commit/cd347553e8ef185c66b0c8a71423973a06f66790))
* **config:**  Update Travis CI node versions ([32073c21](https://github.com/fvdm/nodejs-gtmetrix/commit/32073c21eb1b3e10f735e471f025c7711a63a8ad))

#### 1.2.5 (2017-09-09)

##### Chores

* **repo:** Removed package-lock.json ([fef5aa2a](https://github.com/fvdm/nodejs-gtmetrix/commit/fef5aa2ac202e32e2948ed562365a4f5cdd1c271))

#### 1.2.4 (2017-7-8)

##### Chores

* **repo:** Added package-lock.json ([194a2651](https://github.com/fvdm/nodejs-gtmetrix/commit/194a2651bf8972cbc85f2fc0cab54d998a160f20))
* **package:**
  * Clean up description and keywords ([7bdcf6da](https://github.com/fvdm/nodejs-gtmetrix/commit/7bdcf6dadf49867e46f1e5ec80cd6f76b136dcfe))
  * Updated dependencies ([c9539360](https://github.com/fvdm/nodejs-gtmetrix/commit/c95393604fe0a5e4b855b7ec7ce18158e1d0d59e))
  * update eslint to version 3.19.0 (#13) ([840d95d9](https://github.com/fvdm/nodejs-gtmetrix/commit/840d95d9968e8f6841c9fce8d5f0ef3dc173f9c6))
  * update coveralls to version 2.13.0 (#12) ([e58acb3a](https://github.com/fvdm/nodejs-gtmetrix/commit/e58acb3a275750c1f39e9aaae4c93fd2a01ac0df))
  * Update dotest dev dep ([ebf48a19](https://github.com/fvdm/nodejs-gtmetrix/commit/ebf48a19d26892103ba105f6d28ec2c228c7dd2d))
  * Update dev deps ([52a28531](https://github.com/fvdm/nodejs-gtmetrix/commit/52a28531c801f64c2dc2b42188328da4bcf9d937))

##### Documentation Changes

* **readme:**
  * Minor clean up ([e78ae317](https://github.com/fvdm/nodejs-gtmetrix/commit/e78ae31716481a28911c86ba365775ed84c1d9fd))
  * Add coffee button to Author ([e9c4194a](https://github.com/fvdm/nodejs-gtmetrix/commit/e9c4194ae4496809c8dc2cd4b65aa59ca89739df))

##### Bug Fixes

* **testGet:** Get resource with polling failed ([bb909295](https://github.com/fvdm/nodejs-gtmetrix/commit/bb909295afe122360992d5c7e1d1c9b4a0fc90af))

##### Refactors

* **testGet:** Prevent extra request on polling ([c5d9d5f3](https://github.com/fvdm/nodejs-gtmetrix/commit/c5d9d5f3c51b4b13f225a0e20ee47e4d513b5f91))

##### Code Style Changes

* **code:** Use ES6 arrow functions ([dc84c68b](https://github.com/fvdm/nodejs-gtmetrix/commit/dc84c68bdde80c01d4dacce88a8953020ff4236e))
* **comments:** Clean up JSDoc comments ([94badba7](https://github.com/fvdm/nodejs-gtmetrix/commit/94badba73973f1ca163075007d3d1fbb656cd386))

##### Tests

* **main:** Improved test coverage ([0270034e](https://github.com/fvdm/nodejs-gtmetrix/commit/0270034eb6624cbe3a3b73dd7c2af5fba98e9132))
* **config:** Add node v8 to Travis CI ([76489631](https://github.com/fvdm/nodejs-gtmetrix/commit/764896311816772fcd1ef79bf1f65a6413ac995b))

#### 1.2.3 (2017-3-23)

##### Chores

* **package:** Update deps ([a86dd718](https://github.com/fvdm/nodejs-gtmetrix/commit/a86dd718547e97241bec05392838be52ef22ff52))

##### Documentation Changes

* **readme:**
  * Add resources table ([e4e013f4](https://github.com/fvdm/nodejs-gtmetrix/commit/e4e013f4fb0310b715690316b9e9be48a8d222ba))
  * Removed encoding from resource code ([24a8826a](https://github.com/fvdm/nodejs-gtmetrix/commit/24a8826a340e19493d128b5a962c6e079a84deef))

##### Bug Fixes

* **testGet:** Improved resource handling ([380cc790](https://github.com/fvdm/nodejs-gtmetrix/commit/380cc7907473218f5c2f3bd98ed2d715718d217b))

#### 1.2.2 (2017-2-16)

##### Tests

* **fix:** Fix test.get data.state check ([49b20bfd](https://github.com/fvdm/nodejs-gtmetrix/commit/49b20bfdd6ca9cd80034300e2528999c6d929a2c))

#### 1.2.1 (2017-2-16)

##### Chores

* **develop:** Add .editorconfig file ([b9f433b7](https://github.com/fvdm/nodejs-gtmetrix/commit/b9f433b7cac2b55e274a1adb02fb13e6f1975e8e))
* **package:** Update dev dep ([6015cbed](https://github.com/fvdm/nodejs-gtmetrix/commit/6015cbed15bafba6abb17900ecb5a6485632c5af))

##### Bug Fixes

* **test.get:** Fix binary-mode on more resources ([e3817e23](https://github.com/fvdm/nodejs-gtmetrix/commit/e3817e23de41d0cce7db5ba868cb0ff510a69d06))

##### Refactors

* **test.get:** Cleaner loop condition ([3291bf6c](https://github.com/fvdm/nodejs-gtmetrix/commit/3291bf6c8588cd32563723a0e85a184af9d86cd9))

##### Tests

* **config:**
  * Update eslint config to ES6 ([b1506a97](https://github.com/fvdm/nodejs-gtmetrix/commit/b1506a974bd87ffd45a174d48f716c5820debb44))
  * bitHound max 500 lines ([8ddd3b7b](https://github.com/fvdm/nodejs-gtmetrix/commit/8ddd3b7b19213ee479a6cf36792cdc10dbc9e6a5))
* **main:** Add API error test with polling ([3af45111](https://github.com/fvdm/nodejs-gtmetrix/commit/3af45111eba00829cd6e8ef2c8355aee68d2fdc1))
* **fix:** Don’t overwrite cache with data ([3460c768](https://github.com/fvdm/nodejs-gtmetrix/commit/3460c768a756db76deefb5c25bc57322ce4bebcc))

### 1.2.0 (2017-2-16)

##### Documentation Changes

* **readme:** Add test.get polling argument #9 ([52887ff6](https://github.com/fvdm/nodejs-gtmetrix/commit/52887ff62e37271249bded78447cdff8d1c848ca))

##### New Features

* **test.get:** Add auto polling argument ([8eed2378](https://github.com/fvdm/nodejs-gtmetrix/commit/8eed23787a6e4597d98ac6981f24e26f4844f32c))

##### Tests

* **style:** Use dotest test() function ([634beb54](https://github.com/fvdm/nodejs-gtmetrix/commit/634beb54ee693bd2a954a64eab6db4f73c416272))
* **fix:** Fixed browser.get data.id type ([9d163261](https://github.com/fvdm/nodejs-gtmetrix/commit/9d1632610d69d506ba11e02b2b99a4c13f640b95))
* **main:** Add polling test ([8af63f88](https://github.com/fvdm/nodejs-gtmetrix/commit/8af63f88f25f07577d7fca7635deafb0bbab5955))

#### 1.1.5 (2017-2-16)

##### Documentation Changes

* **badges:** Fix typo in repo name ([aea0385b](https://github.com/fvdm/nodejs-gtmetrix/commit/aea0385b4d86c5eb960dee7140c42a6c20aad0ac))

#### 1.1.4 (2017-2-16)

##### Documentation Changes

* **badges:**
  * Fix wrong copy/paste ([47b9c630](https://github.com/fvdm/nodejs-gtmetrix/commit/47b9c6302fcfa3e5e7255cdf2cbbd75b999dac16))
  * Fix coverage status branch ([f6ef03f1](https://github.com/fvdm/nodejs-gtmetrix/commit/f6ef03f1083c56c30bc4211dbfa0941269385f71))

#### 1.1.3 (2017-2-16)

##### Refactors

* **apiRequest:** Timeout must not be replaced ([06e0ed79](https://github.com/fvdm/nodejs-gtmetrix/commit/06e0ed79dd2e11f3b90122feff6594fadbc223f7))
* **apiResponse:** No default for props.method ([051fa477](https://github.com/fvdm/nodejs-gtmetrix/commit/051fa4772e44561387f22f245e85eca97425532a))
* **errors:** Moved cb errors to doError() ([72c26638](https://github.com/fvdm/nodejs-gtmetrix/commit/72c26638ac29be52777bb7ab10c4cac8fd51c6fc))

##### Tests

* **main:** Added test Error request failed ([74cfa98a](https://github.com/fvdm/nodejs-gtmetrix/commit/74cfa98ab0c898c3218ab58a6857c089ee2fa063))

#### 1.1.2 (2017-2-16)

##### Chores

* **develop:**
  * Added bitHound config ([07b12fdf](https://github.com/fvdm/nodejs-gtmetrix/commit/07b12fdfd3876ae5634b63604f63852519e5a321))
  * ESLint config for ES6, minor edit ([befbb042](https://github.com/fvdm/nodejs-gtmetrix/commit/befbb042a3049035b45729bd41e790212287dabc))
  * Added _history files to gitignore ([3d336191](https://github.com/fvdm/nodejs-gtmetrix/commit/3d336191a33546ab5d48264a88cc71ed7fa87775))
* **package:**
  * Minor clean up ([c9fece0d](https://github.com/fvdm/nodejs-gtmetrix/commit/c9fece0de8a434fa1d1b4e96904fa1182c9df261))
  * Update httpreq dep ([63c0bc58](https://github.com/fvdm/nodejs-gtmetrix/commit/63c0bc58368ddd01068a24399435b0940c9990af))
  * Replaced test runner and dev deps by dotest ([bf02723b](https://github.com/fvdm/nodejs-gtmetrix/commit/bf02723bfc523ab6e00d95ccbe2af28064b64610))
  * update eslint to version 3.0.0 ([72cddc5d](https://github.com/fvdm/nodejs-gtmetrix/commit/72cddc5de3153aa7d4d0138944db593ead7341b5))
  * update eslint to version 2.5.0 ([014b20ac](https://github.com/fvdm/nodejs-gtmetrix/commit/014b20acf34a72ebe314e8260db2e6263590a837))

##### Documentation Changes

* **badges:**
  * Added code quality status ([4ade2453](https://github.com/fvdm/nodejs-gtmetrix/commit/4ade24539766396aee900f2a1efefbceb6dd22ae))
  * Added coverage status ([4beec872](https://github.com/fvdm/nodejs-gtmetrix/commit/4beec872415b8ba0cca8ea9a118fca54b776e651))
  * Replaced Gemnasium with bitHound ([a0d88bc2](https://github.com/fvdm/nodejs-gtmetrix/commit/a0d88bc295311c438012b89a6f16fefe85589b32))
  * Add Gemnasium dependencies status ([48fd8ee0](https://github.com/fvdm/nodejs-gtmetrix/commit/48fd8ee0462661bce296e35574319908a4ae6844))
  * Add npm version for changelog ([54e5449a](https://github.com/fvdm/nodejs-gtmetrix/commit/54e5449a314f6a09e630215a43664e4538f62d37))
* **readme:** Reduced author footnote ([2cb1bc44](https://github.com/fvdm/nodejs-gtmetrix/commit/2cb1bc443f6f968ccdf5e68ecdf859913ef322a6))

##### Other Changes

* **undefined:**
  * always run both test commands ([befba658](https://github.com/fvdm/nodejs-gtmetrix/commit/befba6586ddfd5e899772b26ed8fdd0e611ddabb))
  * minimum dotest v1.5.0 ([d30bbbbd](https://github.com/fvdm/nodejs-gtmetrix/commit/d30bbbbdc41a842821f751e57b291498bd1058e8))
  * dev dep eslint 2.5.0 is broken ([78e87ac5](https://github.com/fvdm/nodejs-gtmetrix/commit/78e87ac55681b862afc2f8d7221fc0ba1b298822))

##### Refactors

* **main:** Rewrite to cleaner code style ([2494004b](https://github.com/fvdm/nodejs-gtmetrix/commit/2494004b2c340719e57c1700f7b497a2c84d6ea8))
* **package:** Minimum supported node v4.0 ([665aeb7b](https://github.com/fvdm/nodejs-gtmetrix/commit/665aeb7b2f192d6731dd525096ac16ecb1e51985))

##### Tests

* **config:**
  * Update Travis node versions ([c467c098](https://github.com/fvdm/nodejs-gtmetrix/commit/c467c098214c34be1e7e86805fae0a6003155aa6))
  * Use dynamic node versions on Travis CI ([53ada208](https://github.com/fvdm/nodejs-gtmetrix/commit/53ada2089b2e4f9f6404ad01d3a477833559e1cd))
* **lint:** Update eslint to ES6 ([902b1878](https://github.com/fvdm/nodejs-gtmetrix/commit/902b1878b26522551924aa2395b9be4ade64f4f0))
* **undefined:**
  * add node v6 to Travis config ([7b36f34c](https://github.com/fvdm/nodejs-gtmetrix/commit/7b36f34c986c3f18a7d9a9655d23bd5f056d7a62))
  * wait one second between requests ([ae9c9043](https://github.com/fvdm/nodejs-gtmetrix/commit/ae9c9043551383e4d7c532a351c0f6383eb452b5))
  * don't fail on incomplete response data ([d712e048](https://github.com/fvdm/nodejs-gtmetrix/commit/d712e048d8696b391f3d139c345cfecccc248b20))

