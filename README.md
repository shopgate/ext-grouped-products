# Shopgate Connect - Grouped Products Extension

[![GitHub license](http://dmlc.github.io/img/apache2.svg)](LICENSE)
[![Build Status](https://travis-ci.org/shopgate/ext-grouped-products.svg?branch=master)](https://travis-ci.org/shopgate/ext-grouped-products)
[![Coverage Status](https://coveralls.io/repos/github/shopgate/ext-grouped-products/badge.svg?branch=master)](https://coveralls.io/github/shopgate/ext-grouped-products?branch=master)

Extension will enable grouped products display and functionality to products details page

## Configuration
Add the grouped-products extension to your Shopgate Connect deployment config.

```
(...)
  {
    "id": "@shopgate/grouped-products",
    "version": "2.0.1"
  }
(...)
```

Set the following values in your Shopgate Connect Admin:
* maxQuantityPickerEntries - (number) Maximum value in range allowed to be added to cart
  * (default) is 50

## Example config
```
{
  "maxQuantityPickerEntries": 50
}
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) file for more information.

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) file for more information.

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

This extension is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.
