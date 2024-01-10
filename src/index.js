/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

import ExhaustiveDeps from "./ExhaustiveDeps";

export const configs = {
  recommended: {
    plugins: ["react-hooks-signals"],
    rules: {
      "react-hooks-signals/exhaustive-deps-signals": "warn",
    },
  },
};

export const rules = {
  "exhaustive-deps-signals": ExhaustiveDeps,
};
