const classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;

export function parseSelector (selector: string) {
  let tagName: string | void;
  let id = '';
  const classes: Array<string> = [];

  const tagParts = selector.split(classIdSplit);

  let part: string | void;
  let type;

  for (let i = 0; i < tagParts.length; i++) {
    part = tagParts[i];

    if (!part)
      continue;

    type = part.charAt(0);

    if (!tagName) {
      tagName = part;
    } else if (type === '.') {
      classes.push(part.substring(1, part.length));
    } else if (type === '#') {
      id = part.substring(1, part.length);
    }
  }

  return {
    tagName: tagName as string,
    id,
    className: classes.join(' '),
  };
}
