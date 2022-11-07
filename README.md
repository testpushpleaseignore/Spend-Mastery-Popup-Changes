# Introduction
The following changes are made to the "Spend Mastery Pool XP" popup screen:
* Group masteries by game release, which would be the Base Game and the Throne Of The Herald releases
* masteries themselves now scroll, so that you can still see the buttons at the top of the window when scrolling
 
*I am planning on adding additional changes to this window, but reach out to me in the linked GitHub page for any suggestions that you may have.*

# Prerequisites
Requires [Node.js](https://nodejs.org/en/)

# Use
1. Fork and clone repository.
2. Run `npm install`
3. Update `package.json`'s `name` property to match your mod.
4. Update `manifest.json`'s `namespace` property.
5. Run `npm run build` to build.
6. Upload the generated `.zip` file in the `dist` folder to mod.io.

# Important Notes/Caveats
* Don't use `loadModule` to import modules. Use ES6 `import` instead.
* Image files that you want to bundle with your mod **must** be in the `img` folder and be imported somewhere in the code.
* The `img` folder cannot have subdirectories.
* As mentioned above, the minification and uglification of code makes debugging error messages a bit more tedious.
