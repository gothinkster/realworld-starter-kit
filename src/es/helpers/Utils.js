// @ts-check

/**
 * avoids any escapes which then inject JavaScript
 * eg.: "https://www.gettyimagcadsaes.com/gi-resources/images/500px/983794168.jpg\"onerror=\"javascript:alert(document.cookie)"
 * see issue https://github.com/gothinkster/realworld/issues/525 for more details
 *
 * @param {string} src
 * @return {string}
 */
export const secureImageSrc = src => src ? src.replace(/".*/g, '') : src
