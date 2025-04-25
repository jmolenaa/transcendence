so npx is just a way of running things without having to download specific packages
we use it for running nodemon which allows us not to download nodemon itself and just have it on our system temporarily and then deleted after

So the "type": "module"; thingie should be used to tell Node that our project is module based, not base don CommonJS, which is the old way of doing things
This makes sure thing slike import work and Node doesnt complain about them

run npx depcheck to see which dependencies are unused