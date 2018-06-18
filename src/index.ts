/*
  Copyright 2018 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/**
 * We use this `main` file to initialize the app for a couple of reasons.
 * 1. Using Webpack, cannot reach exported method to start application.
 * 2. Because of issue above, makes testing more difficult when mocks are needed.
 */
import app from "./Application";

export default app.init();
