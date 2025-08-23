/*
 *  This file is part of dalez/flarum-view-transition
 *
 *  Copyright (c) 2025 DaleZ.
 *
 *  For detailed copyright and license information, please view the
 *  LICENSE-SCRIPT file that was distributed with this source code.
 */

import app from 'flarum/forum/app';
import { compat } from '@flarum/core/forum';
import controller from "./transitionController";
import register from './grabEvent';
import hookMithril from './hookMithril';

app.initializers.add('dalez-view-transition', () => {
    if (!document.startViewTransition) return;
    register();
    hookMithril();
    Object.assign(compat, { 'utils/fluent_internal_transition_controller': controller });
    window.requestAnimationFrame = window.rAF;
});