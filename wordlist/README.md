# wordlist generator

To create the wordlist, do something like the following:

1. Download the ordbank from [here][download-url]
1. Unzip the payload and put it in the `wordlist/` folder
1. Run `yarn wordlist/generate`

If it doesn't work, look at the errors & the source and figure it out.
I'll revisit this with clearer instructions in the future.

[download-url]: https://www.nb.no/sprakbanken/ressurskatalog/oai-nb-no-sbr-5/

## Notes

As of right now, the app expects these to be gzip-encoded.
However, I haven't updated the generation script to do this automatically yet, so you'll have to do it yourself.
