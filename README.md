business-elements-client-js
===========================

[![License](https://img.shields.io/:license-Apache%202-red.svg)](http://www.apache.org/licenses/LICENSE-2.0.txt)
[![Build Status](https://travis-ci.org/Product-Foundry/business-elements-client-js.svg?branch=master)](https://travis-ci.org/Product-Foundry/business-elements-client-js)

A JavaScript HTTP Client for the [Business Elements](https://api.business-elements.com) API.

## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)

---

## Installation

In nodejs:

```
$ npm install business-elements --save
```

Then (ES6):

```js
import BusinessElementsClient from "business-elements";
```

Or (ES5):

```js
var BusinessElementsClient = require("business-elements").default;
```

Note that this HTTP client can be transparently used server side or in a regular browser page.

## Usage

A client instance is created using the `BusinessElementsClient` constructor, passing it the remote Business Elements server root URL:

```js
const client = new BusinessElementsClient("https://api.business-elements.com");
```

## Global usage

It is also possible to load the client from a global variable:

```js
var client = new BusinessElementsClient.default("https://api.business-elements.com");
```
