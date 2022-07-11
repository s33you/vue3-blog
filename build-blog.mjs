#!/usr/bin/env zx
try{
    await $`node build/md-loader.js`
}
catch(e){
    console.error(e)
}   