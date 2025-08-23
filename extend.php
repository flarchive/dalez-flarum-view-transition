<?php

/*
 * This file is part of dalez/flarum-view-transition.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace dalez\transition;

use Flarum\Extend;
use Flarum\Frontend\Document;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->content(function (Document $document) {
            // For original code please see /js/src/forum/stub.js
            $document->head[] = "<script>(()=>{if(!document.startViewTransition)return;window.rAF=requestAnimationFrame;window.requestAnimationFrame=(f)=>{const t = 'utils/fluent_internal_transition_controller';if(!flarum||!flarum.core||!flarum.core.compat||!flarum.core.compat[t]||typeof flarum.core.compat[t]!='function'){window.rAF(f);return}flarum.core.compat[t](f)}})();</script>";
        }),
];
