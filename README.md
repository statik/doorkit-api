doorkit-api
===========

We require caf_piface but that only installs on a linux system with spi headers available
(and appropriate kernel drivers enabled)

TODO: figure out whether SPI is really a good idea or not.

It seems like this ruby code is some of the cleanest and actually selects
the edge trigger to be truly event driven rather than polling:
https://github.com/jwhitehorn/pi_piper

I don't really like the side-loading of a binary ffi blob, but it does
simplify installation. I'd like to see the event triggering ported to
this node.js module, which seems to have well written code with tests
but currently uses a filesystem watch rather than a select()
https://npmjs.org/package/rpi-gpio
Also, update the README for rpi-gpio to reference the gpio-admin project
rather than running as root.
https://github.com/quick2wire/quick2wire-gpio-admin
