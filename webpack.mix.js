/*
|--------------------------------------------------------------------------
| Mix Asset Management
|--------------------------------------------------------------------------
|
*/

const mix = require('laravel-mix')

mix.js('./radiox.js', 'dist/radiox.min.js')
mix.css('./radiox.css', 'dist/radiox.min.css')