/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// a place for hacks

;(function(){

var version = navigator.appVersion.match(/^.*Chrome\/(\d+)\..*$/)
if (!version) return

version = parseInt(version[1])
if (version <= 26) return

setTimeout(fixToolbarItem, 1000)

function fixToolbarItem() {
    var toolbarItems = document.querySelectorAll(".toolbar-item.toggleable")

    for (var i=0; i<toolbarItems.length; i++) {
        var style = toolbarItems[i].style
        if (style.display != "none") {
            toolbarItems[i].style.display = "inline-block"
        }
    }
}

})();


document.addEventListener('mousedown', function(e) {
  if(e.button === 1) {
    e.preventDefault();
    return false;
  }
});
