/*
 *  This file is part of dalez/flarum-view-transition
 *
 *  Copyright (c) 2025 DaleZ.
 *
 *  For detailed copyright and license information, please view the
 *  LICENSE-SCRIPT file that was distributed with this source code.
 */

import cachePool from "./cachePool";

let pool = cachePool.pool = [];

function markFirstCriticalElements() {
    /**
     * @type {HTMLElement}
     */
    const clicked = cachePool.click_event.target;
    
    // clear the event pool

    cachePool.click_event = null;

    try {
        const transitionItem = clicked.closest("placeholder");
        if (!transitionItem) return;
        cachePool.beforeElement = transitionItem;
        transitionItem.style.viewTransitionName = 'keyItem';
    } catch (error) {
        console.warn(`Seems like the selector is invalid. More info: ${error}`);
    }
}

function markSecondCriticalElements() {
    try {
        const transitionItem = document.querySelector("placeholder");
        if (!transitionItem) return;

        // the before element may still keeps in dom tree
        // and it can't stay with the after element.
        // since it've been captured, we removes its name here.

        cachePool.beforeElement.style.viewTransitionName = '';

        // add the name for the after element.

        transitionItem.style.viewTransitionName = 'keyItem';
    } catch (error) {
        console.warn(`Seems like the selector is invalid. More info: ${error}`);
    }
}

export default function controller(func) {
    // Is this condition still necessary?
    if (cachePool.calling == 'processing') {
        pool.push(func);
        return;
    }
    if (cachePool.calling == 'true') {
        cachePool.calling = 'processing';
        // markFirstCriticalElements();
        const view = document.startViewTransition(() => {
            func();
            // markSecondCriticalElements();
        });
        view.updateCallbackDone.then(()=>{
            cachePool.calling = 'false';
            let i;
            while (typeof (i = pool.shift()) !== "undefined") {
                window.rAF(i);
            }
        });
        return;
    }

    // Browser's back navigation will broke our whole logic.
    // Do the special for it.

    window.rAF(func);
}