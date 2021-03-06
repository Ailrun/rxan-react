# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.3] - 2018-02-10

### Fixed
- Fix semver of RxJS to support v6

## [1.1.2] - 2018-01-30

### Added
- TypeScript type supports

## [1.1.1] - 2018-01-30

### Added
- Now, withRxan has new config options.
    - config.autoStartAt
    - config.stopBeforeAutoStart

### Fixed
- Observable passed to withRxan is unsubscribed when component is unmounted.

### Misc
- Fix typo in deprecated warning message

## [1.1.0] - 2018-01-30

### Added
- Now, withRxan has new config option.
    - config.mapAnimationToProps

### Changed
- Following config options for withRxan is now deprecated.
    - config.valuePropName
    - config.startPropName
    - config.stopPropName

### Fixed
- Now starting animation and stopping animation does not rerender component meaninglessly.

## [1.0.0] - 2018-01-27

### Added
- withRxan
    - config.valuePropName
    - config.startPropName
    - config.stopPropName

[Unreleased]: https://github.com/Ailrun/rxan-react
[1.1.3]: https://github.com/Ailrun/rxan-react/tree/v1.1.3
[1.1.2]: https://github.com/Ailrun/rxan-react/tree/v1.1.2
[1.1.1]: https://github.com/Ailrun/rxan-react/tree/v1.1.1
[1.1.0]: https://github.com/Ailrun/rxan-react/tree/v1.1.0
[1.0.0]: https://github.com/Ailrun/rxan-react/tree/v1.0.0
