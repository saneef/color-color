# color × color

[![Netlify Status](https://api.netlify.com/api/v1/badges/42aa179f-b564-4251-85be-4bbfdfd501e5/deploy-status)](https://app.netlify.com/sites/color-color/deploys)

Color-color is a tool to generate color shades. Supports [Okhsl](https://bottosson.github.io/posts/colorpicker/), [HSLuv](https://www.hsluv.org) and HSL color spaces. You can generate more than one set of shades, and compare side by side. Bring in your reference colors to tune-in the color schemes.

[Designing accessible color systems](https://stripe.com/au/blog/accessible-color-systems) article by Stripe, and [Colorbox](https://www.colorbox.io) by Lyft Design inspired us.

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Credits

- Entypo pictograms by Daniel Bruce — [www.entypo.com](http://www.entypo.com/)
