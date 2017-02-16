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

