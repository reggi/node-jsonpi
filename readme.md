# Capturing

Mozilla released a new way to load things onto a page using this neat hack [Capturing – Improving Performance of the Adaptive Web](https://hacks.mozilla.org/2013/03/capturing-improving-performance-of-the-adaptive-web/?utm_source=blog&utm_medium=hackernews&utm_campaign=capturing)

# JSONPI

_JSON - padding - include_

I am looking to create a way for raw HTML file to be included within another page via javascript. The truth is that ever server-side technology has a way to bring in another set of code, variables, views, ect. and use it in a set document.

_Here's a list of server-side technologies that have this functionality_

* [PHP include](http://php.net/manual/en/function.include.php)
* [PHP require](http://www.php.net/manual/en/function.require.php)
* [Ruby partials](http://api.rubyonrails.org/v2.3.8/classes/ActionView/Partials.html)
* [Node require](http://nodejs.org/api/modules.html#modules_module_require_id)

I found this stackoverflow post [Use JSONP to load an html page](http://stackoverflow.com/questions/7531823/use-jsonp-to-load-an-html-page).

There are many potential issues with this practice.

The `JSONP` `dataType` is necessary to bring in files from and to different domain names. Which I believe is a key feature of importing HTML. Using `JSONP` means a couple of things, we have to be sending and receiving `JSON` documents. We will have to past-in `HTML` into `JSON` or we can have `HTML` inserted dynamically with Node.js.

Here's how this could work potentially:

    http://api.holstee.com/include.json?href=http%3A%2F%2Fcdn.shopify.com%2Fheader.html

We can pass in the `GET` param `href` which is a URL that we can crawl for `HTML`. The `HTML` will be inserted into a `JSON`.

Alternative, we can make a `node.js` command (global module) that can take the file argument and turn it into JSON no matter what the file type is.

    header.html

With the command we can do this.

    jsonpi --input ./header.html --callback holstee > ./header.json

We could also use this to turn any file into JSON.

    jsonpi --input ./people.txt --callback holstee > ./header.json

This is a very simple module to make all you have to do is take the `--input` path and get that file's contents push it into a JSON object and wrap it in a function called `--callback`. Then log the result to `stout`. 

Install `jsonpi` via npm.

    npm install jsonpi

Embed `header.html` into a `json` file, outputs to `stout`.

    jsonpi --input ./header.html

Write `stout` to file `header.json`.

    jsonpi --input ./header.html > header.json
