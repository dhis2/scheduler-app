## [1.1.2](https://github.com/dhis2/scheduler-app/compare/v1.1.1...v1.1.2) (2021-02-23)


### Bug Fixes

* **list:** move list state to store ([539ea77](https://github.com/dhis2/scheduler-app/commit/539ea7704ab07cb2e2c6c8fdb6bfcdb277e4bec9))
* **view-route:** use hooks instead of selectors ([89c8862](https://github.com/dhis2/scheduler-app/commit/89c8862a8a17ad1f600b735022992b0a57a1c172))

## [1.1.1](https://github.com/dhis2/scheduler-app/compare/v1.1.0...v1.1.1) (2021-02-23)


### Bug Fixes

* **system-jobs:** enforce system job permissions ([1bae8c7](https://github.com/dhis2/scheduler-app/commit/1bae8c7696df8a527e7ac3860fc95a15c6c92275))

# [1.1.0](https://github.com/dhis2/scheduler-app/compare/v1.0.0...v1.1.0) (2021-02-18)


### Bug Fixes

* **app-runtime:** deduplicate app-runtime ([47410cd](https://github.com/dhis2/scheduler-app/commit/47410cdfcde6551cdb54452e6495a6ee356132e0))
* **cron:** use i18n to retrieve locale ([aeab782](https://github.com/dhis2/scheduler-app/commit/aeab782c0f935c6e372e17ba243f07341129bfda))
* **details:** make details more independent from specific use ([96a1c72](https://github.com/dhis2/scheduler-app/commit/96a1c72b3e696d2df178fbb8781939cbf65070a7))
* **editform:** replace query with store ([25f8a27](https://github.com/dhis2/scheduler-app/commit/25f8a278c9a3c95a5df78b9e85fe00c2d18da850))
* **include-system-jobs:** improve system jobs toggle label ([a9ba272](https://github.com/dhis2/scheduler-app/commit/a9ba272bb9620ab7fa56e43375b99f62ac5eede5))
* **include-system-jobs:** use checkbox for include system jobs switch ([381a24e](https://github.com/dhis2/scheduler-app/commit/381a24e854376f4118d1663a8b8c78593eb4d47d))
* **infolink:** ensure infolink opens in new window ([90b8e6d](https://github.com/dhis2/scheduler-app/commit/90b8e6de890ed743be3e5bf34e4b1015fc133682))
* **job-form:** fix parameter header ([d664d65](https://github.com/dhis2/scheduler-app/commit/d664d65c06e799785114c76001e75417cf76503d))
* **jobs-toggle-label:** use better toggle description ([6947d6a](https://github.com/dhis2/scheduler-app/commit/6947d6ae6d6ec8c484b054b29964983b7048c787))
* **loading:** render spinners without text when loading ([3f0f1fc](https://github.com/dhis2/scheduler-app/commit/3f0f1fc7dc6353101cf7b0abdd142293edd0a304))
* **locale:** use context for locale ([22f28a8](https://github.com/dhis2/scheduler-app/commit/22f28a81a1747b6d759ca8d5c58eca6e48a6d107))
* **prop-types:** destructure prop-types for readability ([1756c7c](https://github.com/dhis2/scheduler-app/commit/1756c7c7c4bdf7986b7c591f5295431fc1802a52))
* **prop-types:** update prop-types ([f8138bc](https://github.com/dhis2/scheduler-app/commit/f8138bce94873806de52496204c706d60e9c32f0))
* **translations:** add translations for skip table types ([e10f318](https://github.com/dhis2/scheduler-app/commit/e10f31885dbbcb2e326e32beb28c5e29180cff25))
* **unauthorized:** show noticebox for unauthorized users ([c75df2c](https://github.com/dhis2/scheduler-app/commit/c75df2c296258b2e791c97119e0e04e433ec7407))
* **update-job-hook:** use put for job configuration update ([bc884e2](https://github.com/dhis2/scheduler-app/commit/bc884e2ef0ae9f2f8eccb4829f3dce88a64391e0))
* **useeffect:** cleanup subscriber ([3c223ad](https://github.com/dhis2/scheduler-app/commit/3c223ad99b92791e87bc9b364dcb75a5bdc1b8d4))
* add translations ([9eb6105](https://github.com/dhis2/scheduler-app/commit/9eb610595465524e3ce86f5077d3d8c7cd179e60))
* fix continuous execution and cron expression dynamic ([76d216f](https://github.com/dhis2/scheduler-app/commit/76d216fb20824763eeff8b7e119870d8bd26100e))
* fix dependencies ([7499696](https://github.com/dhis2/scheduler-app/commit/7499696538049b35e44af23a40b6c357dce1c7b1))
* fix prop types ([99e6a16](https://github.com/dhis2/scheduler-app/commit/99e6a161bcac34bf35ab46c851d9d7f0bb211565))
* import upstream scheduling type changes ([32420ac](https://github.com/dhis2/scheduler-app/commit/32420ac81f98681338281ec83cdfa9b7d58581aa))
* remove unnecessary export ([be6ce03](https://github.com/dhis2/scheduler-app/commit/be6ce037d52b11826d813b9c2c468f0f5fe7afc7))
* render spinner correctly ([65a6b67](https://github.com/dhis2/scheduler-app/commit/65a6b6768d1c02ad7c9357b476a7fae2204564c4))


### Features

* **info:** add info link for job listing ([f5dd103](https://github.com/dhis2/scheduler-app/commit/f5dd103845b734709e5a0735c40b9d5184d3e009))
* add job edit page ([aa51d10](https://github.com/dhis2/scheduler-app/commit/aa51d10a150cee5e409162108a326a735f5715ec))


### Reverts

* remove css-variables component for the moment ([dc6f16f](https://github.com/dhis2/scheduler-app/commit/dc6f16f6c2d168b5f4722067c74a76fb3ef9ef10))

# 1.0.0 (2020-12-01)


### Bug Fixes

* add translations for new job types ([#25](https://github.com/dhis2/scheduler-app/issues/25)) ([404b04c](https://github.com/dhis2/scheduler-app/commit/404b04cf2a67bf8ac412e03bc5841c4e3a10f38f))
* only throw job run error if there are error reports ([f3d468a](https://github.com/dhis2/scheduler-app/commit/f3d468ac15acc6e9be99cb90109e15d0feb9d761))
* revert to old translation strategy ([a795c21](https://github.com/dhis2/scheduler-app/commit/a795c2148c361e9958971fba22d5319ab9b42c4a))
* update headerbar to latest and greatest ([#31](https://github.com/dhis2/scheduler-app/issues/31)) ([293a52c](https://github.com/dhis2/scheduler-app/commit/293a52c3c8875b1a15009037847d5c0c7d7d6377))
* use human readable cron label strings ([a64a151](https://github.com/dhis2/scheduler-app/commit/a64a151845c9cf8909ad38996ae9ea9a6d57c498))


### Features

* **scheduling types:** support both cron and delay scheduling types ([e14ccd8](https://github.com/dhis2/scheduler-app/commit/e14ccd8541cbee6769dbd645cd9b9a49fcfac9e5))