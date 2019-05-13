# Frontend

To make the example more usable and presentable, let's serve one of the RealWorld.io's frontend implementations on https://pyramid-realworld.herokuapp.com/.

I chose [Elm](https://github.com/rtfeldman/elm-spa-example), since that's what I am familiar with, but it doesn't really matter. Any frontend should work since they all use the same API spec.

### Preparation

1. `$ git clone https://github.com/rtfeldman/elm-spa-example && cd elm-spa-example`
1. Replace `https://conduit.productionready.io` with an empty string in `EndPoint.elm`.
1. `$ elm make src/Main.elm --output elm.js --optimize`
1. Copy `elm.js` and `index.html` into this folder.
