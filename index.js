module.exports = function (shortcut, options) {

  if (!options) options = {asSymbols: false, hyphensToPlus: true}
  if (typeof options === 'string') options = {platform: options, asSymbols: false, hyphensToPlus: true}

  if(options.hyphensToPlus) {
    shortcut = shortcut.replace(/-/g, '+')
  }
  
  shortcut = shortcut
    .replace(/\s/g, '')
    .replace(/option/i, 'Alt')
    .replace(/(commandorcontrol|cmdorctrl|ctrl|command)/i, 'CommandOrControl')
    .split('+')
    .map(part => part[0].toUpperCase() + part.slice(1))
    .join('+')

  switch (options.platform) {
    case 'darwin':
      if(!options.asSymbols) {
        return shortcut.replace('CommandOrControl', 'Command')
      }
      else {
        shortcut = shortcut.replace('CommandOrControl', '⌘');
        shortcut = shortcut.replace('Alt', '⎇');
        return shortcut = shortcut.replace('Control', '^');
      }
    case 'linux':
    case 'freebsd':
    case 'sunos':
    case 'win32':
      return shortcut.replace('CommandOrControl', 'Control')
    default:
      return shortcut
  }
}
