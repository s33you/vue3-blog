#!usr/bin/zx
try{
    await $`npm run blog`
    await $`git add .`
    await $`git commit -m "blog update at ${new Date()}"`
    await $`git push`
}
catch(e){
    throw e;
}
